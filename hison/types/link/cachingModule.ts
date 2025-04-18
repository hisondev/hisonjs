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
export interface InterfaceCachingModule {
    /**
     * **Checks whether this instance is a valid caching module.**
     *
     * This method returns a boolean flag indicating whether the current instance 
     * is recognized as a `CachingModule`. This is useful for validating whether 
     * an instance supports caching functionalities.
     *
     * ### **Return Value**
     * - `true` if this instance is a caching module.
     * - `false` if caching is not enabled.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * console.log(cachingModule.getIsCachingModule()); // true
     * ```
     *
     * ### **Related Properties**
     * - **`_isCachingModule`** *(boolean)* - Stores the module's caching capability status.
     *
     * @returns {boolean} `true` if this instance is a caching module.
     */
    getIsCachingModule(): boolean;
    /**
     * **Checks if the cache contains a specific key.**
     *
     * This method verifies if the specified `key` exists in the LRU cache. It ensures 
     * that the key is a valid string and then delegates the check to the underlying 
     * `LRUCache` instance.
     *
     * ### **Parameters**
     * - `key` *(string)* - The key to check in the cache.
     *
     * ### **Return Value**
     * - `true` if the cache contains the specified key.
     * - `false` if the key is not found in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * console.log(cachingModule.hasKey("user123")); // true
     * console.log(cachingModule.hasKey("user456")); // false
     * ```
     *
     * ### **Related Methods**
     * - **`_checkTypeString(key)`** - Ensures the key is a valid string before performing the cache check.
     * - **`_LRUCache.hasKey(key)`** - The internal method that checks the existence of the key in the cache.
     *
     * @param {string} key - The key to check in the cache.
     * @returns {boolean} `true` if the cache contains the key, otherwise `false`.
     */
    hasKey(key: string): boolean;
    /**
     * **Retrieves cached data for a given key.**
     *
     * Fetches the cached API response associated with `key`, returning a promise.
     * If the key does not exist in the cache, `null` is returned.
     *
     * ### **Parameters**
     * - `key` *(string)* - The cache key to retrieve.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The cached API response.
     *   - `response` *(Response)* - The original HTTP response.
     * - Returns `null` if the key does not exist.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store API response in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * 
     * // Retrieve cached data
     * cachingModule.get("user123").then(data => console.log(data));
     * ```
     *
     * ### **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`hasKey(key)`** - Checks if a key exists in the cache.
     * - **`remove(key)`** - Removes a key from the cache.
     *
     * @param {string} key - The cache key to retrieve.
     * @returns {Promise<{ data: T; response: Response }>} | null
     */
    get<T = any>(key: string): Promise<{ data: T; response: Response; }> | null;
    /**
     * **Stores API response data in the cache.**
     *
     * This method saves the provided `value` (API response) in the cache with the specified `key`.
     * Before storing the data, it validates that the `key` is a string.
     *
     * ### **Parameters**
     * - `key` *(string)* - The cache key under which the response will be stored.
     * - `value` *(Promise<{ data: any; response: Response }>)*
     *   - A promise resolving to an object containing:
     *     - `data` *(any)* - The API response data.
     *     - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If the `key` already exists, the old value is **replaced** with the new one.
     * - If the cache reaches its limit, the **least recently used (LRU) entry is removed**.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store an API response in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * ```
     *
     * ### **Related Methods**
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`hasKey(key)`** - Checks if a key exists in the cache.
     * - **`remove(key)`** - Removes a specific key from the cache.
     *
     * @param {string} key - The cache key under which the response will be stored.
     * @param {Promise<{ data: any; response: Response }>} value - The API response to be cached.
     */
    put(key: string, value: Promise<{ data: any; response: Response; }>): void;
    /**
     * **Removes a key from the cache and returns its value.**
     *
     * Retrieves the cached response for `key` before deleting it.  
     * If the key does not exist, returns `null`.
     *
     * ### **Parameters**
     * - `key` *(string)* - The cache key to remove.
     *
     * ### **Behavior**
     * - Ensures `key` is a valid string before proceeding.
     * - Fetches the cached data for `key`, if available.
     * - Deletes the key from the cache.
     * - Returns the cached data before deletion, or `null` if not found.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store an API response in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * 
     * // Remove and retrieve cached data
     * cachingModule.remove("user123").then(data => console.log(data));
     * 
     * // Verify key removal
     * console.log(cachingModule.hasKey("user123")); // false
     * ```
     *
     * ### **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`clear()`** - Removes all cached entries.
     *
     * @param {string} key - The cache key to remove.
     * @returns {Promise<{ data: T; response: Response; }> | null} The cached response before removal, or `null` if not found.
     */
    remove<T = any>(key: string): Promise<{ data: T; response: Response; }> | null;
    /**
     * **Retrieves all cached data as a key-value object.**
     *
     * Returns the entire cache as a `Record<string, Promise<{ data: T; response: Response }>>`,  
     * where each key corresponds to a cached API response.
     *
     * ### **Return Value**
     * - A `Record<string, Promise<{ data: T; response: Response }>>`, where:
     *   - `key` *(string)* - The cache key.
     *   - `value` *(Promise<{ data: T; response: Response }>>)* - A promise resolving to:
     *     - `data` *(T)* - The API response data.
     *     - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store multiple API responses in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * cachingModule.put("posts", fetch("/api/posts").then(response => response.json()));
     * 
     * // Retrieve all cached data
     * console.log(cachingModule.getAll());
     * ```
     *
     * ### **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`getKeys()`** - Retrieves all cache keys.
     * - **`clear()`** - Removes all cached entries.
     *
     * @returns {Record<string, Promise<{ data: T; response: Response }>>} An object containing all cached responses.
     */
    getAll<T = any>(): Record<string, Promise<{ data: T; response: Response; }>>;
    /**
     * **Retrieves all cache keys.**
     *
     * This method returns an array of all keys currently stored in the cache.
     *
     * ### **Return Value**
     * - An array of strings representing the cache keys.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store multiple API responses in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * cachingModule.put("posts", fetch("/api/posts").then(response => response.json()));
     * 
     * // Retrieve all cache keys
     * console.log(cachingModule.getKeys()); // ["user123", "posts"]
     * ```
     *
     * ### **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`getAll()`** - Retrieves all cached data as a key-value object.
     * - **`clear()`** - Removes all cached entries.
     *
     * @returns {string[]} An array of cache keys.
     */
    getKeys(): string[];
    /**
     * **Clears all cached data.**
     *
     * This method removes all entries from the cache, resetting it to an empty state.
     *
     * ### **Behavior**
     * - All cached responses are permanently deleted.
     * - The cache size is reset to zero.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store multiple API responses in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * cachingModule.put("posts", fetch("/api/posts").then(response => response.json()));
     * 
     * // Clear all cached data
     * cachingModule.clear();
     * 
     * // Verify that the cache is empty
     * console.log(cachingModule.getKeys()); // []
     * ```
     *
     * ### **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`getAll()`** - Retrieves all cached data as a key-value object.
     * - **`getKeys()`** - Retrieves all cache keys.
     *
     * @returns {void}
     */
    clear(): void;
    /**
     * **Registers an event handler for the WebSocket `open` event.**
     *
     * This method assigns a custom event handler to be executed when the WebSocket connection is successfully opened.
     *
     * ### **Parameters**
     * - `func` *(function | null)* - A callback function to handle the WebSocket `open` event.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ### **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When the WebSocket connection is established, the specified function is invoked.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket open event handler
     * cachingModule.onopen = (event) => {
     *     console.log("WebSocket connected:", event);
     * };
     * ```
     *
     * ### **Related Methods**
     * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
     * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
     * - **`onerror(func)`** - Registers a handler for WebSocket error events.
     *
     * @param {(this: WebSocket, ev: Event) => any | null} func - The event handler function for the WebSocket `open` event.
     */
    onopen(func: ((this: WebSocket, ev: Event) => any) | null): void;
    /**
     * **Registers an event handler for the WebSocket `message` event.**
     *
     * This method assigns a custom event handler to be executed whenever a message is received 
     * through the WebSocket connection.
     *
     * ### **Parameters**
     * - `func` *(function | null)* - A callback function to handle incoming WebSocket messages.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ### **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When a message is received, the specified function is invoked with the event data.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket message event handler
     * cachingModule.onmessage = (event) => {
     *     console.log("Received WebSocket message:", event.data);
     * };
     * ```
     *
     * ### **Related Methods**
     * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
     * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
     * - **`onerror(func)`** - Registers a handler for WebSocket error events.
     *
     * @param {(this: WebSocket, ev: MessageEvent) => any | null} func - The event handler function for WebSocket messages.
     */
    onmessage(func: ((this: WebSocket, ev: MessageEvent) => any) | null): void;
    /**
     * **Registers an event handler for the WebSocket `close` event.**
     *
     * This method assigns a custom event handler to be executed when the WebSocket connection is closed.
     *
     * ### **Parameters**
     * - `func` *(function | null)* - A callback function to handle the WebSocket `close` event.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ### **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When the WebSocket connection is closed, the specified function is invoked with the event data.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket close event handler
     * cachingModule.onclose = (event) => {
     *     console.log("WebSocket closed:", event);
     * };
     * ```
     *
     * ### **Related Methods**
     * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
     * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
     * - **`onerror(func)`** - Registers a handler for WebSocket error events.
     *
     * @param {(this: WebSocket, ev: CloseEvent) => any | null} func - The event handler function for WebSocket disconnection.
     */
    onclose(func: ((this: WebSocket, ev: CloseEvent) => any) | null): void;
    /**
     * **Registers an event handler for the WebSocket `error` event.**
     *
     * This method assigns a custom event handler to be executed when a WebSocket error occurs.
     *
     * ### **Parameters**
     * - `func` *(function | null)* - A callback function to handle WebSocket errors.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ### **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When an error occurs in the WebSocket connection, the specified function is invoked with the event data.
     * - **Note:** The implementation currently assigns the function to `onclose` instead of `onerror`,
     *   which may require correction.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket error event handler
     * cachingModule.onerror = (event) => {
     *     console.error("WebSocket error:", event);
     * };
     * ```
     *
     * ### **Related Methods**
     * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
     * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
     * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
     *
     * @param {(this: WebSocket, ev: Event) => any | null} func - The event handler function for WebSocket errors.
     */
    onerror(func: ((this: WebSocket, ev: Event) => any) | null): void;
    /**
     * **Checks the current state of the WebSocket connection.**
     *
     * This method returns an integer representing the current status of the WebSocket connection.
     *
     * ### **Return Value**
     * - `1` → The WebSocket connection is open.
     * - `0` → The WebSocket connection is in the process of connecting.
     * - `-1` → The WebSocket connection is closed or unavailable.
     *
     * ### **Behavior**
     * - Internally calls `_checkWebSocketConnection()` to determine the WebSocket state.
     * - Useful for monitoring connection status and handling reconnection logic if needed.
     *
     * ### **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Check WebSocket connection status
     * const status = cachingModule.isWebSocketConnection();
     * console.log(status); // Output: 1 (open), 0 (connecting), or -1 (closed)
     * ```
     *
     * ### **Related Methods**
     * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
     * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
     * - **`onerror(func)`** - Registers a handler for WebSocket error events.
     *
     * @returns {number} The WebSocket connection status (`1`: open, `0`: connecting, `-1`: closed).
     */
    isWebSocketConnection(): number;
};
