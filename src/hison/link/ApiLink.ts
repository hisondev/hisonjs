import type { InterfaceCachingModule } from "../types";
import { customOption, hisonCore } from "../core";
import { EventEmitter } from "./EventEmitter";

export class ApiLink {
    constructor(eventEmitter: EventEmitter, cachingModule?: InterfaceCachingModule | null) {
        this._eventEmitter = eventEmitter;
        if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) {
            this._cachingModule = cachingModule;
        }
    };
    private _eventEmitter: EventEmitter;
    private _cachingModule: InterfaceCachingModule | null = null;
    private _getResultDataWrapper = (resultData: any): any => {
        let data = null;
        if(resultData && resultData.constructor === Object && resultData.DATAWRAPPER === 'TRUE'
        ) {
            data = new hisonCore.data.DataWrapper();
            for(const key of Object.keys(resultData)) {
                if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                    data.putDataModel(key, new hisonCore.data.DataModel(resultData[key]));
                } else {
                    if(key !== 'DATAWRAPPER') data.put(key, resultData[key]);
                }
            }
        } else {
            data = resultData;
        }
        return data;
    };
    private _getCachingResult = async (resourcePath: string): Promise<{ data: any; response: Response; }> => {
        if(this._cachingModule && this._cachingModule.isWebSocketConnection() === 1) {
            const result = await this._cachingModule.get(resourcePath);
            if(result && customOption.link.interceptApiResult(result.data, result.response) !== false) {
                return result;
            };
            return { data : null, response: result!.response };
        }
        return { data : null, response: new Response() };
    };
    private _getFetch = (
    methodName: string,
    requestPath: string,
    options: Record<string, any>,
    serviceCmd: string,
    requestData: any
    ): Promise<any>[] => {
        if (serviceCmd && (requestData === null || requestData === undefined)) {
            requestData = {};
        }
        if(requestData && requestData.getIsDataWrapper && requestData.getIsDataWrapper()) {
            if (serviceCmd) requestData.putString('cmd', serviceCmd);
            requestData = requestData.getSerialized();
        } else if (requestData && requestData.getIsDataModel && requestData.getIsDataModel()){
            requestData = requestData.getSerialized();
        } else if (requestData && typeof requestData === 'object'){
            if (typeof requestData === 'string') {
                try {
                    JSON.parse(requestData);
                } catch (e) {
                    requestData = JSON.stringify({ data: requestData });
                }
            } else if (Array.isArray(requestData)) {
                requestData = JSON.stringify(requestData);
            } else if (typeof requestData === 'object') {
                if (serviceCmd && requestData.constructor === Object) {
                    requestData.cmd = serviceCmd;
                }
                requestData = JSON.stringify(requestData);
            } else {
                requestData = JSON.stringify({ data: requestData });
            }
        }

        const fetchOptions: Record<string, any> = {
            method: methodName,
            headers: {'Content-Type': 'application/json'},
            body: requestData
        }

        if (options.constructor !== Object) {
            throw new Error('fetchOptions must be an object which contains key and value.');
        }

        let timeoutPromise = null;
        Object.keys(options).forEach(key => {
            if(key !== 'timeout') fetchOptions[key] = options[key];
        });

        if(options.timeout) {
            if (typeof options.timeout !== 'number' || options.timeout <= 0 || !Number.isInteger(options.timeout)) {
                throw new Error('Timeout must be a positive integer.');
            }
            timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), options.timeout));
        }

        const fecthArr: Promise<any>[] = [fetch(requestPath, fetchOptions)];
        if(timeoutPromise) fecthArr.push(timeoutPromise);
        return fecthArr;
    };
    private _request = async (methodName: string, fecthInfo: any[], cachingKey: string | null): Promise<{ data: any; response: Response; }> => {
        const result: { data: any; response: Response; } = await Promise.race(fecthInfo)
        .then((response: Response) => {
            this._eventEmitter.emit('requestCompleted_Response', response);
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json().then(data => ({ data: data, response: response }));
            } else if (contentType) {
                return response.text().then(text => ({ data: text ? text : null, response: response }));
            } else {
                return { data: null, response: response };
            }
        })
        .then(rtn => {
            const resultData = rtn.data;
            const data = this._getResultDataWrapper(resultData);
            this._eventEmitter.emit('requestCompleted_Data', { data: data, response: rtn.response });
            if(cachingKey && this._cachingModule && this._cachingModule.isWebSocketConnection() === 1) this._cachingModule.put(cachingKey, Promise.resolve({ data: data, response: rtn.response }));
            if(customOption.link.interceptApiResult(data, rtn.response) === false) return { data: null, response: rtn.response };
            switch (methodName) {
                case 'GET':
                    if(customOption.link.afterGetRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'POST':
                    if(customOption.link.afterPostRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'PUT':
                    if(customOption.link.afterPutRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'PATCH':
                    if(customOption.link.afterPatchRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'DELETE':
                    if(customOption.link.afterDeleteRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'GETURL':
                    if(customOption.link.afterGetUrlRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'POSTURL':
                    if(customOption.link.afterPostUrlRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'PUTURL':
                    if(customOption.link.afterPutUrlRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'PATCHURL':
                    if(customOption.link.afterPatchUrlRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                case 'DELETEURL':
                    if(customOption.link.afterDeleteUrlRequest({ data: data, response: rtn.response }) === false) return { data: null, response: rtn.response };
                default:
                    break;
            }
            return { data: data, response: rtn.response };
        })
        .catch(error => {
            this._eventEmitter.emit('requestError', error);
            if(customOption.link.interceptApiError(error) === false) return { data: error, response: new Response() };
            return error;
        });
        return result;
    };
    get = (resourcePath: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforeGetRequest(resourcePath, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'GET';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, resourcePath, options);
        if(this._cachingModule && this._cachingModule.hasKey(resourcePath)) return this._getCachingResult(resourcePath);
        return this._request(METHOD_NAME, this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + resourcePath, options, '', null), resourcePath);
    };
    post = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforePostRequest(requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'POST';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
        return this._request(METHOD_NAME, this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
    };
    put = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforePutRequest(requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'PUT';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
        return this._request(METHOD_NAME, this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
    };
    patch = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforePatchRequest(requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'PATCH';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
        return this._request(METHOD_NAME, this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
    };
    delete = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforeDeleteRequest(requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'DELETE';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(serviceCmd && this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
        return this._request(METHOD_NAME, this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
    };
    head = async (resourcePath: string, options: Record<string, any> = {}): Promise<Record<string, string>> => {
        const url = customOption.link.protocol + customOption.link.domain + resourcePath;
        return fetch(url, { method: 'HEAD', ...options })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HEAD request failed with status: ${response.status}`);
                }
                const headers: Record<string, any> = {};
                response.headers.forEach((value, key) => {
                    headers[key] = value;
                });
                return headers;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    };
    options = async (resourcePath: string, options: Record<string, any> = {}): Promise<string[]> => {
        const url = customOption.link.protocol + customOption.link.domain + resourcePath;
        return fetch(url, { method: 'OPTIONS', ...options })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`OPTIONS request failed with status: ${response.status}`);
                }
                const allowHeader = response.headers.get('Allow');
                if (allowHeader) {
                    return allowHeader.split(',').map(method => method.trim());
                }
                return []
            })
            .catch(error => {
                return Promise.reject(error);
            });
    };
    getURL = (url: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforeGetUrlRequest(url, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'GET';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, url, options);
        if(this._cachingModule && this._cachingModule.hasKey(url)) return this._getCachingResult(url);
        return this._request(METHOD_NAME + 'URL', this._getFetch(METHOD_NAME, url, options, '', null), url);
    };
    postURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforePostUrlRequest(url, requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'POST';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
        return this._request(METHOD_NAME + 'URL', this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
    };
    putURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforePutUrlRequest(url, requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'PUT';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
        return this._request(METHOD_NAME + 'URL', this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
    };
    patchURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforePatchUrlRequest(url, requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'PATCH';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
        return this._request(METHOD_NAME + 'URL', this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
    };
    deleteURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
        if(customOption.link.beforeDeleteUrlRequest(url, requestData, options) === false) return Promise.resolve({ data: null, response: new Response() });
        const METHOD_NAME = 'DELETE';
        this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
        if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
        return this._request(METHOD_NAME + 'URL', this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
    };
    headURL = async (url: string, options: Record<string, any> = {}): Promise<Record<string, string>> => {
        return fetch(url, { method: 'HEAD', ...options })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HEAD request failed with status: ${response.status}`);
                }
                const headers: Record<string, any> = {};
                response.headers.forEach((value, key) => {
                    headers[key] = value;
                });
                return headers;
            })
            .catch(error => {
                return Promise.reject(error);
            });
    };
    optionsURL = async (url: string, options: Record<string, any> = {}): Promise<string[]> => {
        return fetch(url, { method: 'OPTIONS', ...options })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`OPTIONS request failed with status: ${response.status}`);
                }
                const allowHeader = response.headers.get('Allow');
                if (allowHeader) {
                    return allowHeader.split(',').map(method => method.trim());
                }
                return []
            })
            .catch(error => {
                return Promise.reject(error);
            });
    };
    onEventEmit = (methodName: string, eventName: string, eventFunc: (...args: any[]) => void) => {
        if (!eventName) {
            throw new Error('Event name is required.');
        }
        if (!eventFunc) {
            throw new Error('Event function is required.');
        }
        if (typeof eventName !== 'string') {
            throw new Error('Event name must be a string.');
        }
        const requestEventName = 'requestStarted_' + methodName;
        if ([requestEventName,
             'requestCompleted_Response',
             'requestCompleted_Data',
             'requestError'].indexOf(eventName) === -1) {
            throw new Error('Invalid event name.'
            + '\nInserted event name: ' + eventName
            + '\nValid event names are:'
            + `\n${requestEventName}`
            + '\nrequestCompleted_Response'
            + '\nrequestCompleted_Data'
            + '\nrequestError'
            );
        }
        if (typeof eventFunc !== 'function') {
            throw new Error('Event function must be a function.');
        }
        this._eventEmitter.on(eventName, eventFunc);
    };
};
