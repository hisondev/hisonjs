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
 *          var year = value.getFullYear();
 *          var month = value.getMonth() + 1;
 *          var day = value.getDate();
 *          var hour = value.getHours();
 *          var minute = value.getMinutes();
 *          var second = value.getSeconds();
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
    (value: any): any;
}
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
interface BeforeGetRequst {
    (resourcePath: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void;
}
declare const _default: {
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
    setConvertValue: (func: ConvertValue) => void;
    setBeforeGetRequst: (func: BeforeGetRequst) => void;
    data: {
        /**
         * DataWrapper constructor.
         * @constructor
         * @param {Object|string} keyOrObject - Either an object with key-value pairs, or a single key if paired with a value.
         * @param {*} [value] - Value associated with the provided key. Only needed if a single key is provided.
         */
        DataWrapper: {
            new (): {};
        };
        DataModel: {
            new (): {};
        };
    };
    link: {
        CachingModule: {
            new (): {
                test: () => void;
            };
        };
        ApiLink: {
            new (): {};
        };
    };
};
export default _default;
