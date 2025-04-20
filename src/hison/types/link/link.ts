import type { InterfaceApiGet, InterfaceApiGetUrl } from "./apiGet";
import type { InterfaceApiPost, InterfaceApiPostUrl } from "./apiPost";
import type { InterfaceApiPut, InterfaceApiPutUrl } from "./apiPut";
import type { InterfaceApiPatch, InterfaceApiPatchUrl } from "./apiPatch";
import type { InterfaceApiDelete, InterfaceApiDeleteUrl } from "./apiDelete";
import type { InterfaceCachingModule } from "./cachingModule";
import type { InterfaceDataWrapper } from "../data";

/**
 * The `hison.link` object provides core communication modules for interacting with the hisondev platform.
 * It serves as a central hub for API requests, caching, and WebSocket communication.
 *
 * ### Key Components
 * - **`CachingModule`**: Manages API response caching using an LRU (Least Recently Used) strategy.
 * - **`ApiGet`, `ApiPost`, `ApiPut`, `ApiPatch`, `ApiDelete`**: Handle REST API calls by encapsulating request logic.
 * - **`ApiGetUrl`, `ApiPostUrl`, `ApiPutUrl`, `ApiPatchUrl`, `ApiDeleteUrl`**: Similar to the above, but allow direct URL-based requests.
 *
 * These components simplify API integration and provide caching and event-driven request handling.
 *
 * ### How It Works
 * - **API requests are wrapped in `DataWrapper` instances**, which store key-value data.
 * - **The `cmd` property in `DataWrapper` determines the service path**, directing the request to the appropriate business logic on the server.
 * - **`CachingModule` enables response caching**, reducing redundant network calls for frequently accessed resources.
 * - **`EventEmitter` allows developers to listen for request events**, such as completion, errors, or specific triggers.
 *
 * ### Example Usage
 * ```typescript
 * // Creating an API request
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a POST request
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 * apiPost.call(requestData).then(response => {
 *     console.log(response.data); // Response from the server
 * });
 *
 * // Handling request events
 * apiPost.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("Request completed!", data);
 * });
 *
 * // Using caching for a GET request
 * const cachingModule = new hison.link.CachingModule(20); // Set cache limit to 20
 * const apiGet = new hison.link.ApiGet("/users", cachingModule);
 * apiGet.call().then(response => {
 *     console.log(response.data);
 * });
 * ```
 *
 * ### Internal Structure
 * - **Uses `ApiLink` for handling network requests**.
 * - **Utilizes `EventEmitter` for event-driven communication**.
 * - **Supports WebSocket integration via `CachingModule`**.
 * - **Compatible with `CustomOption` for flexible configuration**.
 */
export interface Link {
    /**
     * **`CachingModule` - A module for API response caching and real-time WebSocket updates.**
     *
     * The `CachingModule` provides a caching mechanism for API responses using an **LRU (Least Recently Used) strategy** 
     * while integrating **WebSocket communication** for real-time data updates.
     *
     * ### **Key Features**
     * - **LRU Cache for API Responses**: Stores API responses with a configurable limit, reducing redundant network requests.
     * - **WebSocket Support**: Maintains a persistent WebSocket connection for real-time data updates.
     * - **Cache Management Methods**: Supports cache operations (`get`, `put`, `remove`, `clear`, etc.).
     * - **Event-Driven Communication**: Allows event listeners (`onopen`, `onmessage`, `onclose`, `onerror`) for WebSocket handling.
     * - **Flexible Configuration**: Uses `CustomOption` settings for cache limits and WebSocket parameters.
     * - **Validation Methods**: Ensures proper data types for cache keys and event listeners.
     *
     * ### **How It Works**
     * - **API responses are stored in an LRUCache instance**, avoiding redundant network calls.
     * - **When a WebSocket connection is established**, data updates can be received in real-time.
     * - **Cache data can be accessed and managed using `get`, `put`, `remove`, and `clear` methods.**
     * - **WebSocket event handlers can be set up for real-time notifications.**
     *
     * ### **Example Usage**
     * ```typescript
     * // Create a CachingModule instance with a cache limit of 20
     * const cachingModule = new hison.link.CachingModule(20);
     * 
     * // Store API response in the cache
     * cachingModule.put("users", fetch("/api/users").then(response => response.json()));
     * 
     * // Retrieve cached data
     * cachingModule.get("users").then(data => console.log(data));
     * 
     * // Register WebSocket event handlers
     * cachingModule.onopen = () => console.log("WebSocket Connected");
     * cachingModule.onmessage = event => console.log("New Message:", event.data);
     * ```
     *
     * ### **Internal Structure**
     * - **Uses `LRUCache`** to manage cached responses with a defined limit.
     * - **Maintains a WebSocket connection** to receive real-time data updates.
     * - **Supports configurable options via `CustomOption`**, such as WebSocket endpoint and cache size.
     * - **Provides utility methods** for cache validation, data retrieval, and event handling.
     *
     * ### **Related Components**
     * - **`LRUCache`**: Handles the caching logic for API responses.
     * - **`WebSocket`**: Establishes a real-time connection for live data updates.
     * - **`CustomOption`**: Provides configurable options for WebSocket and cache settings.
     * - **`ApiLink`**: Uses this module to fetch and store API responses efficiently.
     *
     * ### **Return Value**
     * - This module **returns an instance of `CachingModule`**, which allows cache operations and WebSocket event management.
     *
     * ### **Typical Use Cases**
     * - **Reducing unnecessary API calls** by storing frequently accessed responses.
     * - **Receiving real-time updates** from the server without polling.
     * - **Efficiently managing API response data** in web applications.
     * - **Supporting offline or low-latency scenarios** by using cached responses.
     */
    CachingModule: new (cachingLimit?: number) => InterfaceCachingModule;
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
    ApiGet: new <T = InterfaceDataWrapper>(resourcePath?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiGet<T>;
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
    ApiPost: new <T = InterfaceDataWrapper>(serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPost<T>;
    /**
     * **`ApiPut<T>` - A class for handling HTTP PUT requests within the `hison.link` module.**
     *
     * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
     * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
     *
     * ### **Key Features**
     * - **Executes HTTP PUT requests** using `ApiLink`.
     * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
     * - **Supports response caching** via an optional `CachingModule`.
     * - **Emits request lifecycle events** using `EventEmitter`.
     * - **Allows event listeners** for monitoring request execution.
     * - **Supports generic response types (`T`)** to enable type-safe API responses.
     *
     * ### **How It Works**
     * - When instantiated, `ApiPut<T>` requires a `serviceCmd` that specifies the business logic endpoint.
     * - The `call()` method sends a PUT request with the provided request data.
     * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
     * - Event listeners can be attached to monitor the request lifecycle.
     *
     * ### **Example Usage**
     * ```typescript
     * // Defining a custom response type
     * interface UpdateUserResponse {
     *     success: boolean;
     *     updatedUserId: number;
     * }
     *
     * // Creating an instance of ApiPut with a custom response type
     * const apiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser");
     *
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Sending a PUT request
     * apiPut.call(requestData).then(response => {
     *     console.log(response.data.success); // Type: boolean
     *     console.log(response.data.updatedUserId); // Type: number
     * });
     *
     * // Creating an instance with caching
     * const cachingModule = new hison.link.CachingModule(20);
     * const cachedApiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser", cachingModule);
     *
     * // Handling request events
     * cachedApiPut.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("PUT request completed!", data);
     * });
     * ```
     *
     * ### **Internal Components**
     * - **`ApiLink`**: Handles request execution and response processing.
     * - **`EventEmitter`**: Manages event-driven request handling.
     * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
     *
     * ### **Return Value**
     * - This class returns an instance of `ApiPut<T>`, providing methods for executing PUT requests and managing request events.
     * - The `T` type parameter allows users to define the expected response structure.
     *
     * ### **Typical Use Cases**
     * - **Sending data to a REST API** with structured payloads.
     * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
     * - **Handling event-driven request monitoring** via `onEventEmit`.
     *
     * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
     */
    ApiPut: new <T = InterfaceDataWrapper>(serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPut<T>;
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
    ApiPatch: new <T = InterfaceDataWrapper>(serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPatch<T>;
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
    ApiDelete: new <T = InterfaceDataWrapper>(serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiDelete<T>;
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
    ApiGetUrl: new <T = any>(url: string, cachingModule?: InterfaceCachingModule) => InterfaceApiGetUrl<T>;
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
    ApiPostUrl: new <T = any>(url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPostUrl<T>;
    /**
     * **`ApiPutUrl` - A class for handling HTTP PUT requests to a specified URL.**
     *
     * The `ApiPutUrl` class is responsible for sending HTTP PUT requests to a provided URL.
     * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
     * This class supports a generic type `T`, allowing users to define the expected response type.
     *
     * ### **Key Features**
     * - **Executes HTTP PUT requests** using `ApiLink.putURL()`.
     * - **Accepts a direct URL** instead of using a predefined service command.
     * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
     * - **Supports response caching** via an optional `CachingModule`.
     * - **Emits request lifecycle events** using `EventEmitter`.
     * - **Allows event listeners** for monitoring request execution.
     * - **Provides type safety for response data** using a generic `T` (default: `any`).
     *
     * ### **How It Works**
     * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
     * - The `call()` method sends a PUT request with the provided request data.
     * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
     * - Event listeners can be attached to monitor the request lifecycle.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an instance of ApiPutUrl
     * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser");
     *
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Sending a PUT request
     * apiPutUrl.call(requestData).then(response => {
     *     console.log(response.data); // Response data
     * });
     *
     * // Creating an instance with caching
     * const cachingModule = new hison.link.CachingModule(20);
     * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser", cachingModule);
     *
     * // Handling request events
     * cachedApiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("PUT request completed!", data);
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
     * const apiPutUrl = new hison.link.ApiPutUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
     * 
     * apiPutUrl.call(requestData).then(response => {
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
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Typical Use Cases**
     * - **Sending data to an external API** using a full URL.
     * - **Passing a `serviceCmd` for structured request routing**.
     * - **Using cached responses** to reduce redundant API calls.
     * - **Handling event-driven request monitoring** via `onEventEmit`.
     */
    ApiPutUrl: new <T = any>(url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPutUrl<T>;
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
    ApiPatchUrl: new <T = any>(url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPatchUrl<T>;
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
    ApiDeleteUrl: new <T = any>(url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiDeleteUrl<T>;
}
