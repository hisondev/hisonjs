import type { InterfaceApiDelete, InterfaceApiDeleteUrl, InterfaceCachingModule, InterfaceDataWrapper } from "../types";
import { customOption } from "../core";
import { ApiLink } from "./ApiLink";
import { EventEmitter } from "./EventEmitter";

/**
 * **`ApiDelete<T>` - A class for handling HTTP DELETE requests within the `hison.link` module.**
 *
 * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ### **Key Features**
 * - **Executes HTTP DELETE requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types (`T`)**, allowing for **strongly typed responses**.
 *
 * ### **How It Works**
 * - When instantiated, `ApiDelete<T>` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a DELETE request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 * - The **generic type `T` defines the response data structure**, ensuring **type safety**.
 *
 * ### **Example Usage**
 * ```typescript
 * // Define a response type
 * interface DeleteUserResponse {
 *     success: boolean;
 *     deletedId: string;
 * }
 *
 * // Creating an instance of ApiDelete with a typed response
 * const apiDelete = new hison.link.ApiDelete<DeleteUserResponse>("UserService.deleteUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("userId", "12345");
 * 
 * // Sending a DELETE request
 * apiDelete.call(requestData).then(response => {
 *     console.log(response.data.success); // Type: boolean
 *     console.log(response.data.deletedId); // Type: string
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiDelete = new hison.link.ApiDelete("UserService.deleteUser", cachingModule);
 *
 * // Handling request events
 * cachedApiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("DELETE request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiDelete<T>`, providing methods for executing DELETE requests and managing request events.
 *
 * ### **Typical Use Cases**
 * - **Deleting data from a REST API** in a structured and type-safe way.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export class ApiDelete<T = InterfaceDataWrapper> implements InterfaceApiDelete<T> {
    /**
     * **Creates an instance of `ApiDelete`, initializing API request handling with optional caching.**
     *
     * The constructor sets up the **API request configuration** and **event handling mechanisms** 
     * required for making DELETE requests to a specified service command.
     *
     * ### **Parameters**
     * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
     *   - **Example:** `"UserService.createUser"`
     *   - If no `serviceCmd` is provided, an error is thrown.
     * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
     *   - If provided, responses may be retrieved from the cache instead of making a new request.
     *
     * ### **Initialization Process**
     * 1. **Checks if a valid `CachingModule` is provided.**
     *    - If caching is enabled, `_cachingModule` is assigned.
     * 2. **Creates an `EventEmitter` instance.**
     *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
     * 3. **Instantiates an `ApiLink` instance.**
     *    - Handles actual request execution and response processing.
     * 4. **Stores the `serviceCmd`.**
     *    - Defines the service endpoint for the DELETE request.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an ApiDelete instance without caching
     * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
     *
     * // Creating an ApiDelete instance with caching
     * const cachingModule = new hison.link.CachingModule(20);
     * const cachedApiDelete = new hison.link.ApiDelete("UserService.createUser", cachingModule);
     * ```
     *
     * ### **Related Properties**
     * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
     * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
     * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
     * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
     *
     * @param {string} serviceCmd - The service command defining the target API action.
     * @param {CachingModule} [cachingModule=null] - An optional caching module.
     * @throws {Error} If `serviceCmd` is not provided.
     */
    constructor(serviceCmd: string | null = null, cachingModule: InterfaceCachingModule | null = null) {
        if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
        this._eventEmitter = new EventEmitter();
        this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
        this._serviceCmd = serviceCmd;
    };
    private _cachingModule: InterfaceCachingModule | null = null;
    private _eventEmitter: EventEmitter;
    private _apiLink: ApiLink;
    private _serviceCmd: string;
    /**
     * **Executes an HTTP DELETE request to the specified service command.**
     *
     * This method sends a DELETE request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforeDeleteRequest((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the DELETE request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_DELETE"` Event**
     *   - This event is emitted **before the DELETE request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(`T`)* - The API response data, **strongly typed based on `T`**.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP DELETE request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforeDeleteRequest`)** is checked.
     *   - The **event `"requestStarted_DELETE"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * interface DeleteUserResponse {
     *     success: boolean;
     *     deletedId: string;
     * }
     *
     * const apiDelete = new hison.link.ApiDelete<DeleteUserResponse>("UserService.deleteUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("userId", "12345");
     * 
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforeDeleteRequest = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     * 
     * // Listening to the "requestStarted_DELETE" event
     * apiDelete.onEventEmit("requestStarted_DELETE", (requestData, options) => {
     *     console.log("DELETE request started with data:", requestData);
     * });
     * 
     * // Sending a DELETE request
     * apiDelete.call(requestData).then(response => {
     *     console.log(response.data.success); // Type: boolean
     *     console.log(response.data.deletedId); // Type: string
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
        return this._apiLink.delete(requestData, this._serviceCmd, options);
    };
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
     * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiDelete.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiDelete.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
        return this._apiLink.head(customOption.link.controllerPath, options);
    };
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
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiDelete.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiDelete.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options = (options: Record<string, any> = {}): Promise<string[]> => {
        return this._apiLink.options(customOption.link.controllerPath, options);
    };
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a DELETE request.
     *
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("DELETE request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiDelete.onEventEmit("requestError", (error) => {
     *     console.error("DELETE request failed:", error);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
        this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
    };
};


/**
 * **`ApiDeleteUrl` - A class for handling HTTP DELETE requests to a specified URL.**
 *
 * The `ApiDeleteUrl` class is responsible for sending HTTP DELETE requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP DELETE requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types** for type-safe API responses.
 *
 * ### **How It Works**
 * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a DELETE request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiDeleteUrl
 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a DELETE request
 * apiDeleteUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data); // Response data
 *     }
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser", cachingModule);
 *
 * // Handling request events
 * cachedApiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("DELETE request completed!", data);
 * });
 * ```
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface DeleteResponse {
 *     success: boolean;
 *     message: string;
 * }
 *
 * const apiDeleteUrl = new hison.link.ApiDeleteUrl<DeleteResponse>("https://api.example.com/users", "UserService.deleteUser");
 * 
 * apiDeleteUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data.message); // `message` is inferred as a string
 *     }
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - **A `Promise` resolving to an object with the following properties:**
 *   - `data` *(T)* - The API response data, where `T` is the specified generic type (default: `any`).
 *   - `response` *(Response)* - The original HTTP response object.
 * - If an error occurs, it returns `null`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
export class ApiDeleteUrl<T = any> implements InterfaceApiDeleteUrl<T> {
    /**
     * **Creates an instance of `ApiDeleteUrl`, initializing API request handling with optional caching.**
     *
     * The constructor sets up the **API request configuration** and **event handling mechanisms** 
     * required for making DELETE requests to a specified URL.
     *
     * ### **Parameters**
     * - `url` *(string, required)* - The full URL to which the DELETE request will be sent.
     *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
     * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
     *   business logic on the server.
     *   - **Default:** `''` (empty string)
     *   - If provided, this is included in the request payload for structured routing.
     * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
     *   - If provided, responses may be retrieved from the cache instead of making a new request.
     *
     * ### **Initialization Process**
     * 1. **Validates the `url`.**
     *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
     * 2. **Checks if a valid `CachingModule` is provided.**
     *    - If caching is enabled, `_cachingModule` is assigned.
     * 3. **Creates an `EventEmitter` instance.**
     *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
     * 4. **Instantiates an `ApiLink` instance.**
     *    - Handles actual request execution and response processing.
     * 5. **Stores the `url` and `serviceCmd`.**
     *    - Defines the endpoint and optional service command for the DELETE request.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an ApiDeleteUrl instance without caching
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
     *
     * // Creating an ApiDeleteUrl instance with caching
     * const cachingModule = new hison.link.CachingModule(20);
     * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
     * ```
     *
     * ### **Related Properties**
     * - **`_url`** *(string)* - Stores the URL for the request.
     * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
     * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
     * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
     * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
     *
     * @param {string} url - The full URL for the DELETE request.
     * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
     * @param {CachingModule} [cachingModule=null] - An optional caching module.
     * @throws {Error} If `url` is not provided.
     */
    constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
        if (!url) throw new Error('Please enter the request URL.');
        if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
        this._eventEmitter = new EventEmitter();
        this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
        this._url = url;
        this._serviceCmd = serviceCmd;
    };
    private _cachingModule: InterfaceCachingModule | null = null;
    private _eventEmitter: EventEmitter;
    private _apiLink: ApiLink;
    private _serviceCmd: string;
    private _url: string;
    /**
     * **Executes an HTTP DELETE request to the specified URL with an optional service command.**
     *
     * This method sends a DELETE request using `ApiLink.deleteURL()`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, `Record<string, any>`)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`"requestStarted_DELETE"` Event**
     *   - This event is emitted **before the DELETE request is executed**.
     *   - It includes the `serviceCmd`, request options, and request data.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new DELETE request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - **A `Promise` resolving to an object with the following properties:**
     *   - `data` *(T)* - The API response data, where `T` is the specified generic type (default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_DELETE"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP DELETE request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Listening to the "requestStarted_DELETE" event
     * apiDeleteUrl.onEventEmit("requestStarted_DELETE", (serviceCmd, options, requestData) => {
     *     console.log(`DELETE request started for service: ${serviceCmd}`, requestData);
     * });
     * 
     * // Sending a DELETE request
     * apiDeleteUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data); // Response data
     *     }
     * });
     * ```
     *
     * ### **Type-Safe Example**
     * ```typescript
     * interface DeleteResponse {
     *     success: boolean;
     *     message: string;
     * }
     *
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl<DeleteResponse>("https://api.example.com/users", "UserService.deleteUser");
     * 
     * apiDeleteUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data.message); // `message` is inferred as a string
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
    call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
        return this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options);
    };
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
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiDeleteUrl.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiDeleteUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
        return this._apiLink.headURL(this._url, options);
    };
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
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Calls `this._apiLink.options(this._url, options)`, which:
     *   - Sends an HTTP OPTIONS request to `_url`.
     *   - Extracts the `Allow` header from the response.
     *   - Parses and returns the list of permitted HTTP methods.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiDeleteUrl.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiDeleteUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options = (options: Record<string, any> = {}): Promise<string[]> => {
        return this._apiLink.options(this._url, options);
    };
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a DELETE request to a specified URL.
     *
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("DELETE request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiDeleteUrl.onEventEmit("requestError", (error) => {
     *     console.error("DELETE request failed:", error);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
        this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
    };
};