import type { InterfaceDataWrapper } from "../data";

/**
 * **`ApiPost<T>` - A class for handling HTTP POST requests within the `hison.link` module.**
 *
 * The `ApiPost<T>` class is responsible for sending HTTP POST requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 * The response type can be customized using the generic parameter `T`, with a default type of `InterfaceDataWrapper`.
 *
 * ### **Key Features**
 * - **Executes HTTP POST requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`**, ensuring structured payloads with a `cmd` field for service routing.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** to monitor request execution.
 * - **Flexible response typing** via **`T`**, allowing the user to define the expected response data structure.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPost<T>` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a POST request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPost (default response type: InterfaceDataWrapper)
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a POST request
 * apiPost.call(requestData).then(response => {
 *     console.log(response.data); // Type: InterfaceDataWrapper
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
 *
 * // Specifying a custom response type
 * interface CreateUserResponse {
 *     userId: number;
 *     username: string;
 * }
 * const apiPostTyped = new hison.link.ApiPost<CreateUserResponse>("UserService.createUser");
 *
 * apiPostTyped.call(requestData).then(response => {
 *     console.log(response.data.userId); // Type: number
 *     console.log(response.data.username); // Type: string
 * });
 *
 * // Handling request events
 * cachedApiPost.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("POST request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPost<T>`, which provides methods for executing POST requests and managing request events.
 * - The response type **defaults to `InterfaceDataWrapper`** but can be customized by specifying a different type `T`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export interface InterfaceApiPost<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP POST request to the specified service command.**
     *
     * This method sends a POST request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(T | InterfaceDataWrapper, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object matching `T`, it is automatically processed as JSON.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforePostRequest((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the POST request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_POST"` Event**
     *   - This event is emitted **before the POST request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP POST request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePostRequest`)** is checked.
     *   - The **event `"requestStarted_POST"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Defining a custom response type
     * interface CreateUserResponse {
     *     userId: number;
     *     username: string;
     * }
     * 
     * // Creating an instance of ApiPost with a custom response type
     * const apiPost = new hison.link.ApiPost<CreateUserResponse>("UserService.createUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforePostRequest = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     * 
     * // Listening to the "requestStarted_POST" event
     * apiPost.onEventEmit("requestStarted_POST", (requestData, options) => {
     *     console.log("POST request started with data:", requestData);
     * });
     * 
     * // Sending a POST request
     * apiPost.call(requestData).then(response => {
     *     console.log(response.data.userId); // Type: number
     *     console.log(response.data.username); // Type: string
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
     * @param {T | InterfaceDataWrapper} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{ data: T; response: Response; }>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPost = new hison.link.ApiPost("UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiPost.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiPost.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
     * **Sends an HTTP OPTIONS request to the API controller path.**
     *
     * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
     * It is useful for checking which HTTP methods are permitted for a specific endpoint.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPost = new hison.link.ApiPost("UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiPost.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiPost.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a POST request.
     *
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_POST"` - Triggered when a POST request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPost = new hison.link.ApiPost("UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiPost.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("POST request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiPost.onEventEmit("requestError", (error) => {
     *     console.error("POST request failed:", error);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};

/**
 * **`ApiPostUrl` - A class for handling HTTP POST requests to a specified URL.**
 *
 * The `ApiPostUrl` class is responsible for sending HTTP POST requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP POST requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports an optional `serviceCmd` parameter**, allowing structured routing on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Uses a generic type `T` (default: `any`)** to specify the expected response data format.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a POST request with the provided request data.
 * - If caching is enabled, previously stored responses may be returned instead of making a new request.
 * - Event listeners can be attached to track request execution and completion.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPostUrl for a direct POST request
 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a POST request
 * apiPostUrl.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with a service command for structured routing
 * const apiPostUrlWithCmd = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
 * 
 * // Sending a POST request with service command
 * apiPostUrlWithCmd.call(requestData).then(response => {
 *     console.log(response.data);
 * });
 * 
 * // Creating an instance with caching enabled
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("POST request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPostUrl`, providing methods for executing POST requests to a specific URL.
 * - The response data type is determined by `T`, with a default of `any`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface UserResponse {
 *     id: number;
 *     name: string;
 *     email: string;
 * }
 * 
 * const typedApiPostUrl = new hison.link.ApiPostUrl<UserResponse>("https://api.example.com/users");
 * 
 * typedApiPostUrl.call(requestData).then(response => {
 *     console.log(response.data.name); // `name` is inferred as a string
 * });
 * ```
 */
export interface InterfaceApiPostUrl<T = any> {
    /**
     * **Executes an HTTP POST request to the specified URL with an optional service command.**
     *
     * This method sends a POST request using `ApiLink.postURL()`, encapsulating request data and invoking
     * necessary pre-request hooks and event emissions. The response type is determined by the generic `T` (default: `any`).
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`"requestStarted_POST"` Event**
     *   - This event is emitted **before the POST request is executed**.
     *   - It includes the `serviceCmd`, request options, and request data.
     *   - Useful for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is provided, it checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new POST request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_POST"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP POST request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an instance of ApiPostUrl with a service command
     * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Listening to the "requestStarted_POST" event
     * apiPostUrl.onEventEmit("requestStarted_POST", (serviceCmd, options, requestData) => {
     *     console.log(`POST request started for service: ${serviceCmd}`, requestData);
     * });
     * 
     * // Sending a POST request
     * apiPostUrl.call(requestData).then(response => {
     *     console.log(response.data); // Response data
     * });
     * ```
     *
     * ### **Type-Safe Example**
     * ```typescript
     * interface UserResponse {
     *     id: number;
     *     name: string;
     *     email: string;
     * }
     * 
     * const apiPostUrl = new hison.link.ApiPostUrl<UserResponse>("https://api.example.com/users");
     * 
     * apiPostUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data.name); // `name` is inferred as a string
     *     }
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response; }>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{ data: T; response: Response; }>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending a HEAD request
    * apiPostUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiPostUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the specified URL.**
    *
    * This method retrieves the list of allowed HTTP methods for the specified URL 
    * without performing an actual data operation. It is useful for checking which 
    * HTTP methods are permitted for a specific endpoint.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ### **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending an OPTIONS request
    * apiPostUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiPostUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a POST request to a specified URL.
    *
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_POST"` - Triggered when a POST request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Register an event listener for when the request completes
    * apiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("POST request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiPostUrl.onEventEmit("requestError", (error) => {
    *     console.error("POST request failed:", error);
    * });
    * ```
    *
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
