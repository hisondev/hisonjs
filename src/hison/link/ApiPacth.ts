import type { InterfaceApiPatch, InterfaceApiPatchUrl, InterfaceCachingModule, InterfaceDataWrapper } from "../types";
import { customOption } from "../core";
import { ApiLink } from "./ApiLink";
import { EventEmitter } from "./EventEmitter";

/**
 * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
 *
 * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
 * It supports **strongly typed responses** using generics (`T`), allowing precise response data handling.
 *
 * ### **Key Features**
 * - **Executes HTTP PATCH requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Utilizes generics (`T`)** to enable type-safe response handling.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call<T>()` method sends a PATCH request and expects a response of type `T`.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Defining a custom response type
 * interface UpdateUserResponse {
 *     success: boolean;
 *     updatedFields: string[];
 * }
 *
 * // Creating an instance of ApiPatch with a custom response type
 * const apiPatch = new hison.link.ApiPatch<UpdateUserResponse>("UserService.updateUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a PATCH request with a typed response
 * apiPatch.call(requestData).then(response => {
 *     console.log(response.data.success); // Type: boolean
 *     console.log(response.data.updatedFields); // Type: string[]
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPatch = new hison.link.ApiPatch("UserService.updateUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PATCH request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPatch<T>`, providing methods for executing PATCH requests and managing request events.
 *
 * ### **Typical Use Cases**
 * - **Applying partial updates** to a REST API.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export class ApiPatch<T = InterfaceDataWrapper> implements InterfaceApiPatch<T> {
    /**
     * **Creates an instance of `ApiPatch`, initializing API request handling with optional caching.**
     *
     * The constructor sets up the **API request configuration** and **event handling mechanisms** 
     * required for making PATCH requests to a specified service command.
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
     *    - Defines the service endpoint for the PATCH request.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an ApiPatch instance without caching
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     *
     * // Creating an ApiPatch instance with caching
     * const cachingModule = new hison.link.CachingModule(20);
     * const cachedApiPatch = new hison.link.ApiPatch("UserService.createUser", cachingModule);
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
    constructor(serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
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
     * **Executes an HTTP PATCH request to the specified service command.**
     *
     * This method sends a PATCH request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions. The response type is determined by
     * the **generic type `T`**, allowing for precise response handling.
     *
     * ### **Parameters**
     * - `requestData` *(T, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforePatchRequest((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the PATCH request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_PATCH"` Event**
     *   - This event is emitted **before the PATCH request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, strongly typed based on the generic type.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP PATCH request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePatchRequest`)** is checked.
     *   - The **event `"requestStarted_PATCH"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Define a response type
     * interface UpdateUserResponse {
     *     success: boolean;
     *     updatedFields: string[];
     * }
     *
     * // Creating an ApiPatch instance with a typed response
     * const apiPatch = new hison.link.ApiPatch<UpdateUserResponse>("UserService.updateUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforePatchRequest = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     * 
     * // Listening to the "requestStarted_PATCH" event
     * apiPatch.onEventEmit("requestStarted_PATCH", (requestData, options) => {
     *     console.log("PATCH request started with data:", requestData);
     * });
     * 
     * // Sending a PATCH request with a typed response
     * apiPatch.call(requestData).then(response => {
     *     console.log(response.data.success); // Type: boolean
     *     console.log(response.data.updatedFields); // Type: string[]
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
     * @param {T} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: T; response: Response; }> => {
        return this._apiLink.patch(requestData, this._serviceCmd, options);
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
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiPatch.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiPatch.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
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
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiPatch.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiPatch.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
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
     * occurs during the execution of a PATCH request.
     *
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("PATCH request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiPatch.onEventEmit("requestError", (error) => {
     *     console.error("PATCH request failed:", error);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
        this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
    };
};

/**
 * **`ApiPatchUrl` - A class for handling HTTP PATCH requests to a specified URL.**
 *
 * The `ApiPatchUrl` class is responsible for sending HTTP PATCH requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP PATCH requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a PATCH request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Return Value**
 * - A `Promise` resolving to an object containing:
 *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
 *   - `response` *(Response)* - The original HTTP response object.
 * - If an error occurs, it returns `null`.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPatchUrl
 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a PATCH request
 * apiPatchUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data); // Response data
 *     }
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PATCH request completed!", data);
 * });
 * ```
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface UpdateUserResponse {
 *     success: boolean;
 *     message: string;
 * }
 *
 * const apiPatchUrl = new hison.link.ApiPatchUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
 * 
 * apiPatchUrl.call(requestData).then(response => {
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
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
export class ApiPatchUrl<T = any> implements InterfaceApiPatchUrl<T> {
    /**
     * **Creates an instance of `ApiPatchUrl`, initializing API request handling with optional caching.**
     *
     * The constructor sets up the **API request configuration** and **event handling mechanisms** 
     * required for making PATCH requests to a specified URL.
     *
     * ### **Parameters**
     * - `url` *(string, required)* - The full URL to which the PATCH request will be sent.
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
     *    - Defines the endpoint and optional service command for the PATCH request.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an ApiPatchUrl instance without caching
     * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
     *
     * // Creating an ApiPatchUrl instance with caching
     * const cachingModule = new hison.link.CachingModule(20);
     * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
     * ```
     *
     * ### **Related Properties**
     * - **`_url`** *(string)* - Stores the URL for the request.
     * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
     * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
     * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
     * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
     *
     * @param {string} url - The full URL for the PATCH request.
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
     * **Executes an HTTP PATCH request to the specified URL with an optional service command.**
     *
     * This method sends a PATCH request using `ApiLink.patchURL()`, encapsulating request data in a `DataWrapper`
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
     * - **`"requestStarted_PATCH"` Event**
     *   - This event is emitted **before the PATCH request is executed**.
     *   - It includes the `serviceCmd`, request options, and request data.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new PATCH request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, typed based on the provided generic `T` (default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_PATCH"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP PATCH request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Listening to the "requestStarted_PATCH" event
     * apiPatchUrl.onEventEmit("requestStarted_PATCH", (serviceCmd, options, requestData) => {
     *     console.log(`PATCH request started for service: ${serviceCmd}`, requestData);
     * });
     * 
     * // Sending a PATCH request
     * apiPatchUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data); // Response data
     *     }
     * });
     * ```
     *
     * ### **Type-Safe Example**
     * ```typescript
     * interface UpdateUserResponse {
     *     success: boolean;
     *     message: string;
     * }
     *
     * const apiPatchUrl = new hison.link.ApiPatchUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
     * 
     * apiPatchUrl.call(requestData).then(response => {
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
        return this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options);
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
     * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiPatchUrl.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiPatchUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
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
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Calls `this._apiLink.options(this._url, options)`, which:
     *   - Sends an HTTP OPTIONS request to `_url`.
     *   - Extracts the `Allow` header from the response.
     *   - Parses and returns the list of permitted HTTP methods.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiPatchUrl.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiPatchUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
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
     * occurs during the execution of a PATCH request to a specified URL.
     *
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("PATCH request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiPatchUrl.onEventEmit("requestError", (error) => {
     *     console.error("PATCH request failed:", error);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
        this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
    };
};
