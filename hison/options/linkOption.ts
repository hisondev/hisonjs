import type { InterfaceDataWrapper } from "../types";

export const linkOption = {
    /**
     * The default protocol used for API communication.
     *
     * - Default value: `'http://'`
     * - Used in `ApiLink` to construct request URLs.
     */
    protocol : 'http://',
    /**
     * The default domain for API requests.
     *
     * - Default value: `'localhost:8080'`
     * - Used in `ApiLink` when constructing full request URLs.
     */
    domain : 'localhost:8080',
    /**
     * The default controller path for API requests.
     *
     * This value is appended to the `protocol` and `domain` when making API calls.
     *
     * - Default value: `'/hison-api-link'`
     * - Used in `ApiLink` when constructing API request URLs.
     */
    controllerPath : '/hison-api-link',
    /**
     * The timeout duration (in milliseconds) for API requests.
     *
     * If the request does not complete within this time, it will be aborted.
     *
     * - Default value: `10000` (10 seconds)
     * - Used in `ApiLink._getFetch()` to set request timeouts.
     */
    timeout : 10000,
    /**
     * The default protocol used for WebSocket connections.
     *
     * - Default value: `'ws://'`
     * - Used in `ApiLink` when initializing WebSocket communication.
     */
    webSocketProtocol : 'ws://',
    /**
     * The default WebSocket endpoint for caching-related communication.
     *
     * - Default value: `'/hison-websocket-endpoint'`
     * - Used in `ApiLink` when establishing WebSocket connections.
     */
    webSocketEndPoint : '/hison-websocket-endpoint',
    /**
     * The caching limit for stored API responses.
     *
     * Determines the maximum number of cached API responses before old ones are removed.
     *
     * - Default value: `10`
     * - Used in `ApiLink._getCachingResult()` for cache management.
     */
    cachingLimit : 10,
    /**
     * Hook function executed before making a `GET` request.
     *
     * This function can be used to modify request parameters or cancel the request.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param resourcePath The API resource path being requested.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforeGetRequest(resourcePath: string, options: Record<string, any>): boolean | void {return true;},
    /**
     * Hook function executed before making a `POST` request.
     *
     * This function allows modifying the request before it is sent.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param requestData The `DataWrapper` object containing the request data.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforePostRequest(requestData: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
    /**
     * Hook function executed before making a `PUT` request.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param requestData The `DataWrapper` object containing the request data.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforePutRequest(requestData: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
    /**
     * Hook function executed before making a `PATCH` request.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param requestData The `DataWrapper` object containing the request data.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforePatchRequest(requestData: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
    /**
     * Hook function executed before making a `DELETE` request.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param requestData The `DataWrapper` object containing the request data.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforeDeleteRequest(requestData: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
    /**
     * Hook function executed after completing a `GET` request.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterGetRequest(responseData: { data: InterfaceDataWrapper; response: Response }): boolean | void {return true;},
    /**
     * Hook function executed after completing a `POST` request.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterPostRequest(responseData: { data: InterfaceDataWrapper; response: Response }): boolean | void {return true;},
    /**
     * Hook function executed after completing a `PUT` request.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterPutRequest(responseData: { data: InterfaceDataWrapper; response: Response }): boolean | void {return true;},
    /**
     * Hook function executed after completing a `PATCH` request.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterPatchRequest(responseData: { data: InterfaceDataWrapper; response: Response }): boolean | void {return true;},
    /**
     * Hook function executed after completing a `DELETE` request.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterDeleteRequest(responseData: { data: InterfaceDataWrapper; response: Response }): boolean | void {return true;},
    /**
     * Hook function executed before making a `GET` request to a specified URL.
     *
     * This function allows modifying request parameters or canceling the request.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param url The API endpoint being requested.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforeGetUrlRequest(url: string, options: Record<string, any>): boolean | void { return true; },
    /**
     * Hook function executed before making a `POST` request to a specified URL.
     *
     * This function allows modifying the request before it is sent.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param url The API endpoint being requested.
     * @param requestData The data being sent in the request.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforePostUrlRequest(url: string, requestData: any, options: Record<string, any>): boolean | void { return true; },
    /**
     * Hook function executed before making a `PUT` request to a specified URL.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param url The API endpoint being requested.
     * @param requestData The data being sent in the request.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforePutUrlRequest(url: string, requestData: any, options: Record<string, any>): boolean | void { return true; },
    /**
     * Hook function executed before making a `PATCH` request to a specified URL.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param url The API endpoint being requested.
     * @param requestData The data being sent in the request.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforePatchUrlRequest(url: string, requestData: any, options: Record<string, any>): boolean | void { return true; },
    /**
     * Hook function executed before making a `DELETE` request to a specified URL.
     *
     * - If it returns `false`, the request will be canceled.
     * - Default implementation returns `true`.
     *
     * @param url The API endpoint being requested.
     * @param requestData The data being sent in the request.
     * @param options Additional request options.
     * @returns `boolean | void` (Returning `false` cancels the request)
     */
    beforeDeleteUrlRequest(url: string, requestData: any, options: Record<string, any>): boolean | void { return true; },
    /**
     * Hook function executed after completing a `GET` request to a specified URL.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterGetUrlRequest(responseData: { data: any; response: Response }): boolean | void { return true; },
    /**
     * Hook function executed after completing a `POST` request to a specified URL.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterPostUrlRequest(responseData: { data: any; response: Response }): boolean | void { return true; },
    /**
     * Hook function executed after completing a `PUT` request to a specified URL.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterPutUrlRequest(responseData: { data: any; response: Response }): boolean | void { return true; },
    /**
     * Hook function executed after completing a `PATCH` request to a specified URL.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterPatchUrlRequest(responseData: { data: any; response: Response }): boolean | void { return true; },
    /**
     * Hook function executed after completing a `DELETE` request to a specified URL.
     *
     * This function allows post-processing of the API response.
     *
     * - If it returns `false`, the response will be nullified.
     * - Default implementation does nothing.
     *
     * @param responseData The response object containing `data` and `response`.
     * @returns `boolean | void` (Returning `false` nullifies the response)
     */
    afterDeleteUrlRequest(responseData: { data: any; response: Response }): boolean | void { return true; },
    /**
     * Intercepts and processes API responses before returning them to the caller.
     *
     * - If it returns `false`, the response is ignored.
     * - Default implementation returns `true`.
     *
     * @param result The `DataWrapper` object containing the API response.
     * @param response The raw `Response` object from the fetch request.
     * @returns `boolean | void` (Returning `false` cancels further processing)
     */
    interceptApiResult(result: InterfaceDataWrapper | undefined, response: Response): boolean | void {return true;},
    /**
     * Intercepts and processes API errors before returning them to the caller.
     *
     * - If it returns `false`, the error is ignored.
     * - Default implementation returns `true`.
     *
     * @param error The encountered error.
     * @returns `boolean | void` (Returning `false` cancels further error handling)
     */
    interceptApiError(error: any): boolean | void {return true;},
};
