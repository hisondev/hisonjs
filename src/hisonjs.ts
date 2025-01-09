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
    (value: any): any; // return은 무조건 있어야함을 어떻게 정의? return null이든 뭐든
}
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
interface BeforeGetRequst {(resourcePath: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void;}
interface BeforePostRequst {(requestDw: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void;}

interface DataWrapper {

}
interface DataModel {

}
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

function createHison() {
    class Option {
        utils = {
    
        };
        shield = {

        };
        data = {
            convertValue : function(value: any): any {return value;},
        };
        link = {
            protocol : 'http://',
            domain : 'localhost:8081',
            controllerPath : '/hison-api-link',
            timeout : 10000,
            beforeGetRequst : function(resourcePath: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePostRequst : function(requestDw: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}) {return true;},
            beforePutRequst : function(requestDw: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}) {return true;},
            beforePatchRequst : function(requestDw: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}) {return true;},
            beforeDeleteRequst : function(requestDw: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}) {return true;},
            beforeCallbackWorked : function(result: any/**DataWrapper */, response: Response) {return true;},
            beforeCallbackError : function(error: any/**promise에서 던지는 error는 어떤 값이든 가능하다 */) {return true;},
        };
    }
    const option = new Option();
    let _hison: Hison;

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
    class Hison implements Hison{
        utils = {

        };
        shield = {

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
    _hison = new Hison();
    const hison = new Hison();

    return {
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
        setConvertValue : function (func: ConvertValue) {option.data.convertValue = func;},
        setBeforeGetRequst : function (func: BeforeGetRequst) {option.link.beforeGetRequst = func;},
        data: hison.data,
        link: hison.link,
    }
}

const hison = createHison();

console.log(hison);
const dw = new hison.data.DataWrapper();
const cm = new hison.link.CachingModule();
console.log(dw);
console.log(cm);

export default createHison();