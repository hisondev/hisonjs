/**
 * **Executes an HTTP POST request to the specified service command.**
 *
 * This method sends a POST request using `ApiLink`, encapsulating request data in a `DataWrapper`
 * and invoking necessary pre-request hooks and event emissions.
 *
 * ## **Parameters**
 * - `requestData` *(any, required)* - The data to be sent in the request.
 *   - If it is a `DataWrapper`, it is sent as-is.
 *   - If it is a standard object, it is converted to a JSON payload.
 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
 *   - **Default:** `{}` (empty object)
 *
 * ## **Pre-Request Handling**
 * - **`customOption.link.beforePostRequst(requestData, options)`**
 *   - A customizable hook executed **before sending the POST request**.
 *   - If it returns `false`, the request is **prevented from execution**.
 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
 *
 * ## **Event Emission**
 * - **`"requestStarted_POST"` Event**
 *   - This event is emitted **before the POST request is executed**.
 *   - Can be used for logging, request tracking, or debugging.
 *
 * ## **Return Value**
 * - A `Promise` resolving to an object containing:
 *   - `data` *(any)* - The API response data.
 *   - `response` *(Response)* - The original HTTP response object.
 *
 * ## **Behavior**
 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
 * - If the data is not cached, it makes an HTTP POST request to `_serviceCmd`.
 * - Before executing the request:
 *   - The **before-request hook (`beforePostRequst`)** is checked.
 *   - The **event `"requestStarted_POST"`** is emitted.
 * - Once the request is completed, the response is returned and optionally stored in the cache.
 *
 * ## **Example Usage**
 * ```typescript
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 * 
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("cmd", "UserService.createUser");
 * requestData.putString("username", "Alice");
 * 
 * // Customizing the before-request hook to modify data before sending
 * customOption.link.beforePostRequst = (requestData, options) => {
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
 *     console.log(response.data); // Response data
 * });
 * ```
 *
 * ## **Related Methods**
 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
 *
 * @param {any} requestData - The data to be sent in the request.
 * @param {Record<string, any>} [options={}] - Additional request options.
 * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the API response.
 */
