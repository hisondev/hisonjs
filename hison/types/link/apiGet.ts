/**
 * **`ApiGet<T>` - A generic class for handling HTTP GET requests within the `hison.link` module.**
 *
 * The `ApiGet<T>` class is responsible for sending HTTP GET requests to a specified API resource.
 * It allows defining a **custom response type** using the generic parameter `T`, providing strong typing for API responses.
 * 
 * ### **Key Features**
 * - **Executes HTTP GET requests** using `ApiLink`.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows defining the expected response type** via the generic parameter `T` (default: `InterfaceDataWrapper`).
 *
 * ### **How It Works**
 * - When instantiated, `ApiGet<T>` stores the API resource path and an optional `CachingModule` instance.
 * - The `call()` method triggers a GET request and returns a `Promise<{ data: T; response: Response }>`.
 * - If caching is enabled, previously stored responses may be returned instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Default usage (response type: InterfaceDataWrapper)
 * const apiGet = new hison.link.ApiGet("/users");
 * apiGet.call().then(response => {
 *     console.log(response?.data); // Type: InterfaceDataWrapper
 * });
 *
 * // Specifying a custom response type (User[])
 * interface User {
 *     id: number;
 *     name: string;
 * }
 * const apiGetUsers = new hison.link.ApiGet<User[]>("/users");
 * apiGetUsers.call().then(response => {
 *     console.log(response?.data); // Type: User[]
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiGet = new hison.link.ApiGet<User[]>("/users", cachingModule);
 * 
 * // Handling request events
 * cachedApiGet.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("GET request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-based request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiGet<T>`, which provides methods for executing GET requests and managing request events.
 *
 * ### **Typical Use Cases**
 * - **Fetching data from a REST API** with strong type support.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (default: `InterfaceDataWrapper`).
 */
export interface InterfaceApiGet<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP GET request to the specified resource path.**
     *
     * This method sends a GET request using `ApiLink`, optionally applying caching if a `CachingModule` is provided.
     * It **invokes a pre-request hook** (`hison.setBeforeGetRequest`) and **emits a request-start event**
     * (`"requestStarted_GET"`) before execution.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforeGetRequest((resourcePath, options) => {})`**
     *   - A customizable hook executed **before sending the GET request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters or implementing conditional request logic.
     *
     * ### **Event Emission**
     * - **`"requestStarted_GET"` Event**
     *   - This event is emitted **before the GET request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, **typed according to the generic parameter `T`**.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP GET request to `_resourcePath`.
     * - Before executing the request:
     *   - The **before-request hook (`beforeGetRequest`)** is checked.
     *   - The **event `"requestStarted_GET"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Default usage (response type: InterfaceDataWrapper)
     * const apiGet = new hison.link.ApiGet("/users");
     * apiGet.call().then(response => {
     *     console.log(response?.data); // Type: InterfaceDataWrapper
     * });
     * 
     * // Specifying a custom response type (User[])
     * interface User {
     *     id: number;
     *     name: string;
     * }
     * const apiGetUsers = new hison.link.ApiGet<User[]>("/users");
     * apiGetUsers.call().then(response => {
     *     console.log(response?.data); // Type: User[]
     * });
     *
     * // Handling request events
     * apiGetUsers.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("GET request completed!", data);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call(options?: Record<string, any>): Promise<{ data: T; response: Response; }>;
    /**
     * **Sends an HTTP HEAD request to the specified resource path.**
     *
     * This method retrieves only the headers from the specified resource without downloading the response body.
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
     * - The method delegates the request execution to `ApiLink.head()`.
     * - The response body is **not** included in the result, only headers are returned.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Sending a HEAD request
     * apiGet.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiGet.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(options)`** - Sends a GET request to retrieve full response data.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
     * **Sends an HTTP OPTIONS request to the specified resource path.**
     *
     * This method retrieves the list of allowed HTTP methods for the specified resource 
     * without performing an actual data operation.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - The method delegates the request execution to `ApiLink.options()`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Sending an OPTIONS request
     * apiGet.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiGet.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(options)`** - Sends a GET request to retrieve full response data.
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
     * occurs during the execution of a GET request.
     *
     * ### **Parameters**
     * - `eventName` *(string)* - The name of the event to listen for.
     * - `eventFunc` *(function)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_GET"` - Triggered when a GET request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Register an event listener for when the request completes
     * apiGet.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("GET request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiGet.onEventEmit("requestError", (error) => {
     *     console.error("GET request failed:", error);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(options)`** - Sends a GET request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};

/**
 * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
 *
 * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP GET requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined API resource path.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types (`T`)** with a default value of `any` to accommodate diverse API responses.
 *
 * ### **How It Works**
 * - When instantiated, `ApiGetUrl` requires a valid URL.
 * - The `call()` method triggers a GET request to the specified URL.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 * - The response data type can be explicitly defined using `T` (default: `any`).
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiGetUrl without caching
 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
 * 
 * // Sending a GET request
 * apiGetUrl.call().then(response => {
 *     console.log(response.data); // Response data (any type by default)
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users", cachingModule);
 * 
 * // Handling request events
 * cachedApiGetUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("GET request completed!", data);
 * });
 * 
 * // Defining a specific response type using generics
 * interface UserResponse {
 *     id: number;
 *     name: string;
 *     email: string;
 * }
 * const typedApiGetUrl = new hison.link.ApiGetUrl<UserResponse>("https://api.example.com/user/1");
 * 
 * typedApiGetUrl.call().then(response => {
 *     console.log(response.data.name); // `name` is inferred as a string
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
 * - The response type is determined by the generic parameter `T` (default: `any`).
 *
 * ### **Typical Use Cases**
 * - **Fetching data from an external API** by specifying a full URL.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 * - **Explicitly defining the response structure** using TypeScript generics.
 */
export interface InterfaceApiGetUrl<T = any> {
    /**
     * **Executes an HTTP GET request to the specified URL.**
     *
     * This method sends a GET request using `ApiLink.getURL()`, optionally applying caching if a `CachingModule` is provided.
     * It also **emits a request-start event** (`"requestStarted_GET"`) before execution.
     *
     * ### **Parameters**
     * - `options` *(optional, `Record<string, any>`)* - Additional request options such as headers or query parameters.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **Event Emission: `"requestStarted_GET"`**
     *   - This event is emitted **before the GET request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new GET request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - **`data: T`** - The API response data, where `T` is a generic type (default: `any`).
     *   - **`response: Response`** - The original HTTP response object.
     *   - Returns `null` if the request fails or is prevented by an event hook.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.getURL(this._url, options)`, which:
     *   - Emits `"requestStarted_GET"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP GET request to `_url`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
     * 
     * // Listening to the "requestStarted_GET" event
     * apiGetUrl.onEventEmit("requestStarted_GET", (url, options) => {
     *     console.log(`GET request started for: ${url}`);
     * });
     * 
     * // Sending a GET request with inferred response type (`any` by default)
     * apiGetUrl.call().then(response => {
     *     console.log(response.data); // Response data
     * });
     * 
     * // Defining a specific response type
     * interface User {
     *     id: number;
     *     name: string;
     *     email: string;
     * }
     * const typedApiGetUrl = new hison.link.ApiGetUrl<User>("https://api.example.com/user/1");
     * 
     * typedApiGetUrl.call().then(response => {
     *     console.log(response.data.name); // `name` is inferred as a string
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call(options?: Record<string, any>): Promise<{ data: T; response: Response; }>;
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
    * - Calls `this._apiLink.head(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
    * ```typescript
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Sending a HEAD request
    * apiGetUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiGetUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ### **Related Methods**
    * - **`call(options)`** - Sends a GET request to retrieve full response data.
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
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Sending an OPTIONS request
    * apiGetUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiGetUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ### **Related Methods**
    * - **`call(options)`** - Sends a GET request to retrieve full response data.
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
    * occurs during the execution of a GET request to a specified URL.
    *
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_GET"` - Triggered when a GET request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"GET"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
    * ```typescript
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Register an event listener for when the request completes
    * apiGetUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("GET request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiGetUrl.onEventEmit("requestError", (error) => {
    *     console.error("GET request failed:", error);
    * });
    * ```
    *
    * ### **Related Methods**
    * - **`call(options)`** - Sends a GET request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
