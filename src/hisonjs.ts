/**
 * The hison object is a container for configuration values and methods required for using the hisondev solution.
 * It includes the following sub-objects:
 * 
 * - hison.const: Contains constants required for overall configuration.
 * - hison.data: Provides functionalities for DataWrapper and DataModel.
 * - hison.link: Offers features necessary for ApiLink.
 * - hison.caching: Includes functionalities for the caching module.
 * - hison.utils: A collection of various common utility methods.
 * 
 * The hison object is finally defined in the shield.js file through the finalDefinehison() method.
 * After its definition, it is frozen and hidden to prevent external access and modification.
 * All utils' methods have no dependency on each other.
 * When an error occurs, null is usually returned and the cause of the error is displayed on the console. This is to ensure that logic progresses continuously without errors occurring in the client for user UI/UX experience.
 * 
 * @namespace Hison
 */
interface Hison {
    utils: {};
    shield: {};
    data: {
        DataWrapper: new () => DataWrapper;
        DataModel: new () => DataModel;
    };
    link: {
        CachingModule: new () => any;
        ApiLink: new () => any;
    }
}
//====================================================================================
//utils interface, type
//====================================================================================
interface DateObject {
    y: number | null;
    M: number | null;
    d: number | null;
}
//====================================================================================
//shield interface, type
//====================================================================================

//====================================================================================
//datamodel interface, type
//====================================================================================
/**
 * Converts special values into a predefined format before they are inserted into the DataModel.
 * This function allows for custom handling of values like Date, or other special values, to ensure
 * they are stored in the DataModel in a consistent and predictable format. By default, it returns the value as is.
 *
 * @param {any} value - The value to be converted. This can be a special value like Date or any other value.
 * @returns {any} Returns the converted value.
 *
 * @example
 * // When set the hison.data.convertValue
 * hison.data.convertValue = function(value) {
 *     if (value instanceof Date) {
 *          let year = value.getFullYear();
 *          let month = value.getMonth() + 1;
 *          let day = value.getDate();
 *          let hour = value.getHours();
 *          let minute = value.getMinutes();
 *          let second = value.getSeconds();
 *          month = month < 10 ? '0' + month : month;
 *          day = day < 10 ? '0' + day : day;
 *          hour = hour < 10 ? '0' + hour : hour;
 *          minute = minute < 10 ? '0' + minute : minute;
 *          second = second < 10 ? '0' + second : second;
 *          return year + '-' + month + '-' + day + " " + hour + ":" + minute + ":" + second;
 *     }
 *     return value;
 * };
 * // Inserting a Date object into DataModel
 * const dm = newDataModel([{key:"key1",value:new Date()},{key:"key2",value:new Date()}]);
 * // The value will be in 'yyyy-MM-dd hh:mm:ss' format
 * 
 * Note: 
 * 1. Special values not processed by convertValue are stored in the DataModel as references. 
 *    Changes to the original object will also reflect in the DataModel.
 * 2. After customizing the handling of special values, ensure to return the object for all other cases.
 *    This ensures that undefined values are still stored in the DataModel.
 */
interface ConvertValue {
    (value: any): any; // return은 무조건 있어야함을 어떻게 정의? return null이든 뭐든
};
interface DataWrapper {

};
interface DataModel {

};
//====================================================================================
//link interface, type
//====================================================================================
/** hison.link.protocol is the protocol value for the URL used to call APIs in apiLink. */
type Protocol = string;
/** hison.link.domain is the domain value for the URL used to call APIs in apiLink. */
type Domain = string;
/** hison.link.controllerPath is the RequestMapping value for calling APIs in apiLink. */
type ControllerPath = string;
/** hison.link.timeout is the default value for the timeout after making an API request, measured in milliseconds. */
type Timeout = number;
/**
 * Defines the behavior to be executed before making a GET request in apiLink.
 * This function can be customized to perform actions or checks before the actual GET request is sent.
 * By default, it is set to return true, allowing the GET request to proceed.
 * Returning false from this function will prevent the GET request from being sent.
 *
 * @param {string} resourcePath - The URL address to which the GET request will be sent.
 * @param {function} callbackWorkedFunc - The callback method to be executed if the GET request succeeds.
 * @param {function} callbackErrorFunc - The callback method to be executed if the GET request fails.
 * @param {object} options - Options provided by the user for the GET request.
 * @returns {boolean} Returns true to proceed with the GET request, or false to prevent the request from being sent.
 *
 * @example
 * hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
 *     // Custom logic before sending a GET request
 *     return true; // Proceed with the GET request
 * };
 *
 * @example
 * // Preventing a GET request
 * hison.link.beforeGetRequst = function(resourcePath, callbackWorkedFunc, callbackErrorFunc, options) {
 *     // Custom logic to determine whether to proceed
 *     return false; // Prevent the GET request
 * };
 *
 * Note: This function is useful for implementing pre-request validations, logging, or any setup required before 
 * making a GET request. The function's return value controls whether the GET request should be executed.
 */
interface callbackWorked {(result: DataWrapper | undefined, response: Response): boolean | void;};
interface callbackError {(error: any/**promise에서 던지는 error는 어떤 값이든 가능하다 */): boolean | void;};
interface BeforeGetRequst {(resourcePath: string, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforePostRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforePutRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforePatchRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforeDeleteRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforeCallbackWorked extends callbackWorked {};
interface BeforeCallbackError extends callbackError {};

/**
 * The hison object is a container for configuration values and methods required for using the hisondev solution.
 * It includes the following sub-objects:
 * 
 * - hison.const: Contains constants required for overall configuration.
 * - hison.data: Provides functionalities for DataWrapper and DataModel.
 * - hison.link: Offers features necessary for ApiLink.
 * - hison.caching: Includes functionalities for the caching module.
 * - hison.utils: A collection of various common utility methods.
 * 
 * The hison object is finally defined in the shield.js file through the finalDefinehison() method.
 * After its definition, it is frozen and hidden to prevent external access and modification.
 * All utils' methods have no dependency on each other.
 * When an error occurs, null is usually returned and the cause of the error is displayed on the console. This is to ensure that logic progresses continuously without errors occurring in the client for user UI/UX experience.
 * 
 * 어떻게 사용하는지 명시
 * 
 * @namespace Hison
 */
function createHison() {
    class Option {
        utils = {
            dateFormat : 'yyyy-MM-dd',
            timeFormat : 'hh:mm:ss',
            datetimeFormat : 'yyyy-MM-dd hh:mm:ss',
            yearFormat : 'yyyy',
            monthFormat : 'M',
            monthNameFormat : 'MMMM',
            yearMonthFormat : 'yyyy-MM',
            dayFormat : 'd',
            dayOfWeekFormat : 'd',
            hourFormat : 'h',
            hourMinuteFormat : 'hh:mm',
            minuteFormat : 'm',
            secondFormat : 's',
            numberFormat : '#,##0.##',
            LESSOREQ_0X7FF_BYTE : 2,    //charCode <= 0x7FF
            LESSOREQ_0XFFFF_BYTE : 3,   //charCode <= 0xFFFF
            GREATER_0XFFFF_BYTE : 4,    //charCode > 0xFFFF
        };
        shield = {
            shieldURL : "",
            exposeIpList : ["0:0:0:0:0:0:0:1"],
            isFreeze : true,
            isPossibleGoBack : false,
            isPossibleOpenDevTool : false,
        };
        data = {
            convertValue(value: any): any {return value;},
        };
        link = {
            protocol : 'http://',
            domain : 'localhost:8081',
            controllerPath : '/hison-api-link',
            timeout : 10000,
            webSocketProtocol : 'ws://',
            webSocketEndPoint : '/hison-caching-websocket-endpoint',
            webSocketlimit : 10,
            beforeGetRequst(resourcePath: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePostRequst(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePutRequst(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePatchRequst(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforeDeleteRequst(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforeCallbackWorked(result: DataWrapper | undefined, response: Response): boolean | void {return true;},
            beforeCallbackError(error: any): boolean | void {return true;},
        };
    }
    const option = new Option();
    let _hison: Hison;

    class Hison implements Hison{
        utils = {
            //for boolean
            isAlpha(str: string): boolean {
                return /^[A-Za-z]+$/.test(str);
            },
            isAlphaNumber(str: string): boolean {
                return /^[A-Za-z0-9]+$/.test(str);
            },
            isNumber(str: string): boolean {
                return /^[0-9]+$/.test(str);
            },
            isNumberSymbols(str: string): boolean {
                return /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/.test(str);
            },
            isIncludeSymbols(str: string): boolean {
                return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
            },
            isLowerAlpha(str: string): boolean {
                return /^[a-z]+$/.test(str);
            },
            isLowerAlphaAndNumber(str: string): boolean {
                return /^[a-z0-9]+$/.test(str);
            },
            isUpperAlpha(str: string): boolean {
                return /^[A-Z]+$/.test(str);
            },
            isUpperAlphaNumber(str: string): boolean {
                return /^[A-Z0-9]+$/.test(str);
            },
            isNumeric(num: any): boolean {
                return !isNaN(num) && isFinite(num);
            },
            isInteger(num: any): boolean {
                if(!_hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num);
            },
            isPositiveInteger(num: any): boolean {
                if(!_hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num) && num > 0;
            },
            isNegativeInteger(num: any): boolean {
                if (!_hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num) && num < 0;
            },
            isArray(arr: any): boolean {
                return Array.isArray(arr) && arr.constructor === Array;
            },
            isObject(obj: any): boolean {
                return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object;
            },
            getDateObject(dateStr: string): DateObject {
                dateStr = hison.utils.getToString(dateStr);
                dateStr = dateStr.split(' ')[0];
                let year: number, month: number, day: number;
                if (dateStr.includes('-')) {
                    [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
                } else if (dateStr.includes('/')) {
                    [year, month, day] = dateStr.split('/').map(num => parseInt(num, 10));
                } else if (dateStr.length === 8) {
                    year = parseInt(dateStr.substring(0, 4), 10);
                    month = parseInt(dateStr.substring(4, 6), 10);
                    day = parseInt(dateStr.substring(6, 8), 10);
                } else {
                    return {y: null, M: null, d: null};
                }
            
                return { y: year, M: month, d: day };
            },
            isDate(date: DateObject | string): boolean {
                const dateObj: DateObject = _hison.utils.isObject(date) ? date as DateObject : _hison.utils.getDateObject(date as string);
        
                let yyyy: string = _hison.utils.getToString(dateObj.y);
                let MM: string = _hison.utils.getToString(dateObj.M);
                let dd: string = _hison.utils.getToString(dateObj.d);
        
                let result = true;
                try {
                    if(!_hison.utils.isInteger(yyyy) || !_hison.utils.isInteger(MM) || !_hison.utils.isInteger(dd)) {
                        return false;
                    }
        
                    if(!yyyy) {
                        return false;
                    }
                    if(!MM) {
                        MM = "01";
                    } else if (MM.length === 1) {
                        MM = "0" + MM;
                    }
                    if(!dd) {
                        dd = "01";
                    } else if (dd.length === 1) {
                        dd = "0" + dd;
                    }
        
                    if(_hison.utils.getToNumber(yyyy+MM+dd) < 16000101) {
                        const date = new Date(_hison.utils.getToNumber(yyyy), _hison.utils.getToNumber(MM) - 1, _hison.utils.getToNumber(dd));
                        if (date.getFullYear() !== _hison.utils.getToNumber(yyyy) || date.getMonth() !== _hison.utils.getToNumber(MM) - 1 || date.getDate() !== _hison.utils.getToNumber(dd)) {
                            return false;
                        }
                        return true;
                    }
                    else {
                        const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
                        result = dateRegex.test(dd+'-'+MM+'-'+yyyy);
                    }
                    
                } catch (err) {
                    result = false;
                }    
                return result;
            },
            getTimeObject(timeStr) {
                timeStr = _hison.utils.getToString(timeStr);
                var dateArr = timeStr.split(' ');
                timeStr = dateArr.length > 1 ? dateArr[1] : timeStr;
                var hours, minutes, seconds;
        
                if (timeStr.includes(':')) {
                    [hours, minutes, seconds] = timeStr.split(':').map(num => parseInt(num, 10));
                } else if (timeStr.length === 6) {
                    hours = parseInt(timeStr.substring(0, 2), 10);
                    minutes = parseInt(timeStr.substring(2, 4), 10);
                    seconds = parseInt(timeStr.substring(4, 6), 10);
                } else {
                    return {};
                }
            
                return { h: hours, m: minutes, s: seconds };
            },
            isTime(timeObj_or_timeStr) {
                var timeObj = _hison.utils.isObject(timeObj_or_timeStr) ? timeObj_or_timeStr : _hison.utils.getTimeObject(timeObj_or_timeStr);
        
                var hh = timeObj.h;
                var mm = timeObj.m;
                var ss = timeObj.s;
        
                if(!_hison.utils.isInteger(hh) || !_hison.utils.isInteger(mm) || !_hison.utils.isInteger(ss)) {
                    return false;
                }
                hh = parseInt(hh, 10);
                mm = parseInt(mm, 10);
                ss = parseInt(ss, 10);
        
                function isValidTimePart(time, max) {
                    return !isNaN(time) && time >= 0 && time <= max;
                }
            
                return isValidTimePart(hh, 23) && isValidTimePart(mm, 59) && isValidTimePart(ss, 59);
            },
            getDatetimeObject(datetimeStr) {
                datetimeStr = _hison.utils.getToString(datetimeStr);
                var datetimeArr = datetimeStr.split(' ');
                var dateObj = datetimeArr[0];
                var timeObj = datetimeArr.length > 1 ? datetimeArr[1] : {};
        
                console.log(Object.assign({}, _hison.utils.getDateObject(dateObj), _hison.utils.getTimeObject(timeObj)));
                return Object.assign({}, _hison.utils.getDateObject(dateObj), _hison.utils.getTimeObject(timeObj));
            },
            isDatetime(datetimeObj_or_datetimeStr) {
                var datetimeObj = _hison.utils.isObject(datetimeObj_or_datetimeStr) ? datetimeObj_or_datetimeStr : _hison.utils.getDatetimeObject(datetimeObj_or_datetimeStr);
                if(!_hison.utils.isDate(datetimeObj)) return false;
                if(!_hison.utils.isTime(datetimeObj)) return false;
                return true;
            },
            isEmail(emailStr) {
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
                return emailPattern.test(emailStr);
            },
            isURL(urlStr) {
                var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                return urlPattern.test(urlStr);
            },
            isValidMask(str, maskStr) {
                if (str.length !== maskStr.length) {
                    return false;
                }
            
                for (var i = 0; i < str.length; i++) {
                    var char = str.charAt(i);
                    var maskChar = maskStr.charAt(i);
            
                    switch (maskChar) {
                        case 'A':
                            if (char < 'A' || char > 'Z') return false;
                            break;
                        case 'a':
                            if (char < 'a' || char > 'z') return false;
                            break;
                        case '9':
                            if (isNaN(parseInt(char))) return false;
                            break;
                        default:
                            if (char !== maskChar) return false;
                    }
                }
                return true;
            },

            //for Date

            //for number

            //for string
            getNumberFormat(value: number, format?: string) {
                const oriValue = value;
                if (!_hison.utils.isNumeric(value)) {
                    throw new Error(`ER0021 Invalid number\n=>${JSON.stringify(oriValue)}`);
                }
                format = format ? format : option.utils.numberFormat;
                const regex = /^(.*?)([#0,.]+)(.*?)$/;
                const matches = format.match(regex);
        
                if (!matches) {
                    throw new Error(`ER0022 Invalid format\n=>${JSON.stringify(format)}`);
                }
        
                const prefix = matches[1];
                const numberFormat = matches[2];
                const suffix = matches[3];
                const intergerFormat = numberFormat.split('.')[0];
                const decimalFormat = numberFormat.split('.').length > 1 ? numberFormat.split('.')[1] : '';
        
                if (suffix === '%' || suffix === ' %') value = value * 100;
        
                let numStr = _hison.utils.getToString(value);
                const isNegative = numStr[0] === '-';
                numStr = isNegative ? numStr.substring(1) : numStr;
                let interger = numStr.split('.')[0];
                let decimal = numStr.split('.').length > 1 ? numStr.split('.')[1] : '';
                
                let result: string;
        
                decimal = _hison.utils.getToFloat('0.' + decimal)
                        .toLocaleString('en',{
                            minimumFractionDigits: decimalFormat.lastIndexOf('0') + 1,
                            maximumFractionDigits: decimalFormat.length
                            });
                if (decimal === '0') decimal = '';
                else decimal = decimal.substring(1);
        
                switch (intergerFormat) {
                    case "#,###":
                        if (_hison.utils.getToNumber(interger) === 0) {
                            result = decimal;
                        }
                        else {
                            interger = _hison.utils.getToFloat(interger).toLocaleString('en');
                            result = interger + decimal;
                        }
                        break;
                    case "#,##0":
                        interger = _hison.utils.getToFloat(interger).toLocaleString('en');
                        result = interger + decimal;
                        break;
                    case "#":
                        if (_hison.utils.getToNumber(interger) === 0) {
                            result = decimal;
                        }
                        else {
                            result = interger + decimal;
                        }
                        break;
                    case "0":
                        result = interger + decimal;
                        break;
                    default:
                        throw new Error(`ER0023 Invalid format\n=>${JSON.stringify(format)}`);
                }
            
                result = isNegative ? '-' + result : result;
                return prefix + result + suffix;
            },

            //for convertor
            getToNumber(val: any, impossibleValue?: number) {
                impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
                if (!_hison.utils.isNumeric(val)) {
                    return impossibleValue;
                }
                return Number(val);
            },
            getToFloat(val: any, impossibleValue?: number) {
                impossibleValue = impossibleValue === undefined ? 0 : impossibleValue;
                if (!_hison.utils.isNumeric(val)) {
                    return impossibleValue;
                }
                return parseFloat(val);
            },
            getToString(str: any, impossibleValue?: string) {
                impossibleValue = impossibleValue === undefined ? '' : impossibleValue;
                if (typeof str === 'string') {
                } else if (typeof str === 'number' || typeof str === 'boolean' || typeof str === 'bigint') {
                    str = String(str);
                } else if (typeof str === 'symbol') {
                    str = (str as Symbol).description;
                } else {
                    str = impossibleValue;
                }
                return str;
            },
            //etc
        };
        shield = {
            excute(hison: Hison) {
                const deepFreeze = function(object: any) {
                    var propNames = Object.getOwnPropertyNames(object);
                
                    propNames.forEach(function(name) {
                        var prop = object[name];
                
                        if (typeof prop == 'object' && prop !== null) {
                            deepFreeze(prop);
                        }
                    });
                    
                    return Object.freeze(object);
                };
                const shieldFuncGetIp = function(func: Function) {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = () => {
                        if (httpRequest.readyState === XMLHttpRequest.DONE) {
                            if (httpRequest.status === 200) {
                                var result = httpRequest.response;
                                func(result);
                            } else {
                                func(null);
                            }
                        }
                    };
                    httpRequest.open('get', '/ajax/getIp');
                    httpRequest.responseType = 'json';
                    httpRequest.send();
                }
                const shieldFuncCreateBlockDevMode = function() {
                    var msg = "Developer mode is not available.";
                    document.onkeydown = function(event) {
                        if (event.key === "F12") {
                            alert(msg);
                            event.preventDefault();
                            return false;
                        }
                    };
                    
                    function detectDevTool(allow?: any) {
                        if (isNaN(+allow)) allow = 100;
                        var start = +new Date();
                        debugger;
                        var end = +new Date();
                        if (isNaN(start) || isNaN(end) || end - start > allow) {
                            alert(msg);
                            document.write(msg);
                        }
                    }
                    
                    window.addEventListener('load', detectDevTool);
                    window.addEventListener('resize', detectDevTool);
                    window.addEventListener('mousemove', detectDevTool);
                    window.addEventListener('focus', detectDevTool);
                    window.addEventListener('blur', detectDevTool);
                }
                //excute
                if (option.shield.isFreeze) {
                    deepFreeze(hison);
                }
                
                if (location.href.indexOf('localhost') < 0){
                    if (option.shield.shieldURL && location.href.indexOf(option.shield.shieldURL) < 0 ){
                        return;
                    }
    
                    shieldFuncGetIp(function(response: any) {
                        var ip = response && response.ip ? response.ip : '';
                        if (ip && option.shield.exposeIpList.indexOf(ip) >= 0) {
                            return;
                        }
    
                        if (!option.shield.isPossibleGoBack) {
                            history.pushState(null, document.title, location.href);//현재 URL push
                            window.addEventListener('popstate', function() {  //뒤로가기 이벤트 등록
                                history.pushState(null, document.title, location.href); //다시 push함으로 뒤로가기 방지
                            });
                        }
                        
                        if (!option.shield.isPossibleOpenDevTool) {
                            shieldFuncCreateBlockDevMode();
                            return;
                        }
                    });
                }
            }
        };
        data = {
            /**
             * DataWrapper constructor.
             * @constructor
             * @param {Object|string} keyOrObject - Either an object with key-value pairs, or a single key if paired with a value.
             * @param {*} [value] - Value associated with the provided key. Only needed if a single key is provided.
             */
            DataWrapper : class implements DataWrapper {
                /** private함수 _로 시작 => prototype에 넣어보기!! */
            },
            /**
             * DataModel is a JavaScript object for managing and manipulating a table-like data structure.
             * It provides methods to add, remove, sort, and filter rows and columns, and to perform various operations on the data.
             *
             * @constructor
             * @param {Array|Object} ArrayOrObject - An array or object to initialize the DataModel. 
             *                                       If an array of objects is provided, each object represents a row, and the keys represent the columns.
             *                                       If an array of strings is provided, it initializes the column names.
             *                                       If an object is provided, it initializes a single row with the object's key-value pairs.
             */
            DataModel : class implements DataModel {

            },
        };
        link = {
            CachingModule: class {
                test = function() {
                    //ApiLink에서 DataWrapper를 사용하는데.... 어떤게 구현할 것인가.... (변환된 option의 설정이 적용되도록 해야함..)
                    const dw = new _hison!.data.DataWrapper();
                };
            },
            ApiLink: class {
            }
        };
    }
    //내부에서 사용될 hison객체
    _hison = new Hison();

    const hison = new Hison();
    return {
        //====================================================================================
        //option utils set
        //====================================================================================
        //set
        setDateFormat(str: string) {option.utils.dateFormat = str;},
        setTimeFormat(str: string) {option.utils.timeFormat = str;},
        setDatetimeFormat(str: string) {option.utils.datetimeFormat = str;},
        setYearFormat(str: string) {option.utils.yearFormat = str;},
        setMonthFormat(str: string) {option.utils.monthFormat = str;},
        setMonthNameFormat(str: string) {option.utils.monthNameFormat = str;},
        setYearMonthFormat(str: string) {option.utils.yearMonthFormat = str;},
        setDayFormat(str: string) {option.utils.dayFormat = str;},
        setDayOfWeekFormat(str: string) {option.utils.dayOfWeekFormat = str;},
        setHourFormat(str: string) {option.utils.hourFormat = str;},
        setHourMinuteFormat(str: string) {option.utils.hourMinuteFormat = str;},
        setMinuteFormat(str: string) {option.utils.minuteFormat = str;},
        setSecondFormat(str: string) {option.utils.secondFormat = str;},
        setNumberFormat(str: string) {option.utils.numberFormat = str;},
        setLESSOREQ_0X7FF_BYTE(num: number) {option.utils.LESSOREQ_0X7FF_BYTE = num;},
        setLESSOREQ_0XFFFF_BYTE(num: number) {option.utils.LESSOREQ_0XFFFF_BYTE = num;},
        setGREATER_0XFFFF_BYTE(num: number) {option.utils.GREATER_0XFFFF_BYTE = num;},
        //get
        getDateFormat() {return option.utils.dateFormat;},
        getTimeFormat() {return option.utils.timeFormat;},
        getDatetimeFormat() {return option.utils.datetimeFormat;},
        getYearFormat() {return option.utils.yearFormat;},
        getMonthFormat() {return option.utils.monthFormat;},
        getMonthNameFormat() {return option.utils.monthNameFormat;},
        getYearMonthFormat() {return option.utils.yearMonthFormat;},
        getDayFormat() {return option.utils.dayFormat;},
        getDayOfWeekFormat() {return option.utils.dayOfWeekFormat;},
        getHourFormat() {return option.utils.hourFormat;},
        getHourMinuteFormat() {return option.utils.hourMinuteFormat;},
        getMinuteFormat() {return option.utils.minuteFormat;},
        getSecondFormat() {return option.utils.secondFormat;},
        getNumberFormat() {return option.utils.numberFormat;},
        getLESSOREQ_0X7FF_BYTE() {return option.utils.LESSOREQ_0X7FF_BYTE;},
        getLESSOREQ_0XFFFF_BYTE() {return option.utils.LESSOREQ_0XFFFF_BYTE;},
        getGREATER_0XFFFF_BYTE() {return option.utils.GREATER_0XFFFF_BYTE;},

        //====================================================================================
        //option shield set
        //====================================================================================
        //set
        setShieldURL(str: string) {option.shield.shieldURL = str;},
        setExposeIpList(arr: []) {option.shield.exposeIpList = arr;},
        setIsFreeze(bool: boolean) {option.shield.isFreeze = bool;},
        setIsPossibleGoBack(bool: boolean) {option.shield.isPossibleGoBack = bool;},
        setIsPossibleOpenDevTool(bool: boolean) {option.shield.isPossibleOpenDevTool = bool;},
        //get
        getShieldURL() {return option.shield.shieldURL;},
        getExposeIpList() {return option.shield.exposeIpList;},
        getIsFreeze() {return option.shield.isFreeze;},
        getIsPossibleGoBack() {return option.shield.isPossibleGoBack;},
        getIsPossibleOpenDevTool() {return option.shield.isPossibleOpenDevTool;},

        //====================================================================================
        //option data set
        //====================================================================================
        //function set
        /**
         * Sets a custom function for the `convertValue` method, which is responsible for converting
         * special values into a predefined format before they are inserted into the DataModel.
         * This method allows users to override the default behavior of `convertValue`.
         *
         * @param {ConvertValue} func - A function that takes a value of any type and 
         * returns the converted value. This function can handle specific value types (e.g., `Date`) 
         * to ensure consistent and predictable storage in the DataModel.
         *
         * ### Related:
         * - **`convertValue`**:
         *   - Default implementation: `function(value: any): any { return value; }`
         *
         * @example
         * // Customizing the `convertValue` function to format Date objects as ISO strings
         * Hison.setConvertValue((value) => {
         *     if (value instanceof Date) {
         *         return value.toISOString(); // Convert Date to ISO 8601 format
         *     }
         *     return value; // Return other values as-is
         * });
         *
         * @remarks
         * - When a new `convertValue` function is set using `setConvertValue`, all future
         *   data insertions will utilize the custom logic provided in the function.
         * - The default `convertValue` function simply returns the input value unchanged.
         */
        setConvertValue(func: ConvertValue) {option.data.convertValue = func;},

        //====================================================================================
        //option link set
        //====================================================================================
        //set
        setProtocol(str: string) {option.link.protocol = str;},
        setDomain(str: string) {option.link.domain = str;},
        setControllerPath(str: string) {option.link.controllerPath = str;},
        setTimeout(num: number) {option.link.timeout = num;},
        setWebSocketProtocol(str: string) {option.link.webSocketProtocol = str;},
        setWebSocketEndPoint(str: string) {option.link.webSocketEndPoint = str;},
        setWebSocketlimit(num: number) {option.link.webSocketlimit = num;},
        //get
        getProtocol() {return option.link.protocol;},
        getDomain() {return option.link.domain;},
        getControllerPath() {return option.link.controllerPath;},
        getTimeout() {return option.link.timeout;},
        getWebSocketProtocol() {return option.link.webSocketProtocol;},
        getWebSocketEndPoint() {return option.link.webSocketEndPoint;},
        getWebSocketlimit() {return option.link.webSocketlimit;},
        //function set
        setBeforeGetRequst(func: BeforeGetRequst) {option.link.beforeGetRequst = func;},
        setBeforePostRequst(func: BeforePostRequst) {option.link.beforePostRequst = func},
        setBeforePutRequst(func: BeforePutRequst) {option.link.beforePutRequst = func},
        setBeforePatchRequst(func: BeforePatchRequst) {option.link.beforePatchRequst = func},
        setBeforeDeleteRequst(func: BeforeDeleteRequst) {option.link.beforeDeleteRequst = func},
        setBeforeCallbackWorked(func: BeforeCallbackWorked) {option.link.beforeCallbackWorked = func},
        setBeforeCallbackError(func: BeforeCallbackError) {option.link.beforeCallbackError = func},

        //====================================================================================
        //utils
        //====================================================================================
        /**
         * Javascript의 다양한 기능을 가지고있는 object를 반환합니다.
         * @returns {Object} {utils}
         * 
         * @example
         * utils.isAlpha();
         * 
         * @description
         * boolean형 utils
         * Date형 utils
         * number형 utils
         * string형 utils
         * 형변환 utils가 있습니다.
         */
        utils : {
            // for boolean
            /**
             * Checks if the given string consists only of English alphabet characters.
             * This method uses a regular expression to test whether the input string contains
             * only letters (both uppercase and lowercase) from A to Z.
             *
             * @param {string} str - The string to be tested.
             * @returns {boolean} Returns true if the string consists only of English alphabet characters; otherwise, false.
             *
             * @example
             * // returns true
             * hison.utils.isAlpha("HelloWorld");
             *
             * @example
             * // returns false
             * hison.utils.isAlpha("Hello World! 123");
             */
            isAlpha: hison.utils.isAlpha,
            isNumeric: hison.utils.isNumeric,
            // for Date
            // for number
            // for string
            getNumberFormat: hison.utils.getNumberFormat,
            // for convertor
            getToNumber: hison.utils.getToNumber,
            getToFloat: hison.utils.getToFloat,
            getToString: hison.utils.getToString,
            // etc
        },

        //====================================================================================
        //shield
        //====================================================================================
        /**
         * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
         * 
         * @returns {Object} {function excute}
         * 
         * @example
         * shield.excute(); // Initializes and executes the security measures.
         * 
         * @description
         * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
         * hison 객체에 대해 Object.freeze()를 처리합니다. desfatched
         * localhost를 제외한 모든 URL 또는 특정 URL에 대해 개발자 모드 접근을 봉쇄합니다.
         * localhost를 제외한 모든 URL 또는 특정 URL에 대해 뒤로가기를 봉쇄합니다.
         */
        shield : {
            /**
             * Executes the specified functionality for the given `Hison` object with additional security measures.
             * This function applies deep freezing, IP-based shielding, and developer mode restrictions based on the provided options.
             *
             * @param {Hison} hison - The main object to be processed and optionally frozen for immutability.
             *
             * @remarks
             * This function incorporates multiple layers of security, including:
             * - Freezing objects to prevent tampering.
             * - Blocking unauthorized access based on the user's IP.
             * - Preventing the use of browser developer tools.
             *
             * ### Related:
             * - hison.setShieldURL
             * - hison.setExposeIpList
             * - hison.setIsFreeze
             * - hison.setIsPossibleGoBack
             * - hison.setIsPossibleOpenDevTool
             *
             * #### Logic Breakdown:
             * 1. **Object Freezing**:
             *    - If `option.shield.isFreeze` is enabled, the `hison` object is deeply frozen using the `deepFreeze` function.
             *    - Prevents runtime modification of the object or its nested properties.
             *
             * 2. **Access Control by URL and IP**:
             *    - If not on `localhost`:
             *        - Ensures the current URL matches `option.shield.shieldURL`.
             *        - Fetches the user's IP via `/ajax/getIp`.
             *        - Verifies the IP against `option.shield.exposeIpList`.
             *        - If the IP is not allowed:
             *            - Prevents navigating back using the browser's back button.
             *            - Restricts developer tool access.
             *
             * 3. **Developer Tool Restrictions**:
             *    - Blocks `F12` key to prevent opening developer tools.
             *    - Detects and alerts when developer tools are opened using browser resizing, focus, or mouse events.
             *    - Displays a warning message and halts further actions if developer tools are detected.
             */
            excute: hison.shield.excute,
        },
        
        //====================================================================================
        //data
        //====================================================================================
        /**
         * DataWrapper와 DataModel 생성자를 가진 객체입니다.
         * 
         * @returns {Object} { DataWrapper class, DataModel class }
         * 
         * @example
         * new hison.data.DataWrapper(); DataWrapper 인스턴스를 생성합니다.
         * new hison.data.DataModel(); DataModel 인스턴스를 생성합니다.
         * 
         * @description
         * DataModel을 감싸는 wrapper객체인 DataWrapper 생성자와
         * JavaScript object for managing and manipulating a table-like data structure인 DataModel 생성자를 갖고있는 객체입니다.
         */
        data: hison.data,
        /**
         * ApiLink와 CachingModule 생성자를 가진 객체입니다.
         * 
         * @returns {Object} { ApiLink와 class, CachingModule class }
         * 
         * @example
         * new hison.link.ApiLink(); ApiLink 인스턴스를 생성합니다.
         * new hison.link.CachingModule(); CachingModule 인스턴스를 생성합니다.
         * 
         * @description
         * hisondev 플랫폼의 api-link와 통신을 지원하는 javasctript 통신 인스턴스인 ApiLink와.
         * hisondev 플랫폼의 api-link와 웹소캣 통신 및 캐싱을 지원하는 javasctript 인스턴스인 CachingModule을 갖고있는 객체입니다.
         */
        
        //====================================================================================
        //link
        //====================================================================================
        link: hison.link,
    }
}


const hison = createHison();

const dw = new hison.data.DataWrapper();
const cm = new hison.link.CachingModule();
hison.shield.excute(hison);

export default createHison();
