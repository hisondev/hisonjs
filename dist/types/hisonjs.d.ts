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
 *          let year = value.getFullYear();
 *          let month = value.getMonth() + 1;
 *          let day = value.getDate();
 *          let hour = value.getHours();
 *          let minute = value.getMinutes();
 *          let second = value.getSeconds();
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
interface callbackWorked {
    (result: DataWrapper | undefined, response: Response): boolean | void;
}
interface callbackError {
    (error: any /**promise에서 던지는 error는 어떤 값이든 가능하다 */): boolean | void;
}
interface BeforeGetRequst {
    (resourcePath: string, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;
}
interface BeforePostRequst {
    (requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;
}
interface BeforePutRequst {
    (requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;
}
interface BeforePatchRequst {
    (requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;
}
interface BeforeDeleteRequst {
    (requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;
}
interface BeforeCallbackWorked extends callbackWorked {
}
interface BeforeCallbackError extends callbackError {
}
interface DataWrapper {
}
declare const _default: {
    setDateFormat(str: string): void;
    setTimeFormat(str: string): void;
    setDatetimeFormat(str: string): void;
    setYearFormat(str: string): void;
    setMonthFormat(str: string): void;
    setMonthNameFormat(str: string): void;
    setYearMonthFormat(str: string): void;
    setDayFormat(str: string): void;
    setDayOfWeekFormat(str: string): void;
    setHourFormat(str: string): void;
    setHourMinuteFormat(str: string): void;
    setMinuteFormat(str: string): void;
    setSecondFormat(str: string): void;
    setNumberFormat(str: string): void;
    setLESSOREQ_0X7FF_BYTE(num: number): void;
    setLESSOREQ_0XFFFF_BYTE(num: number): void;
    setGREATER_0XFFFF_BYTE(num: number): void;
    getDateFormat(): string;
    getTimeFormat(): string;
    getDatetimeFormat(): string;
    getYearFormat(): string;
    getMonthFormat(): string;
    getMonthNameFormat(): string;
    getYearMonthFormat(): string;
    getDayFormat(): string;
    getDayOfWeekFormat(): string;
    getHourFormat(): string;
    getHourMinuteFormat(): string;
    getMinuteFormat(): string;
    getSecondFormat(): string;
    getNumberFormat(): string;
    getLESSOREQ_0X7FF_BYTE(): number;
    getLESSOREQ_0XFFFF_BYTE(): number;
    getGREATER_0XFFFF_BYTE(): number;
    setShieldURL(str: string): void;
    setExposeIpList(arr: []): void;
    setIsFreeze(bool: boolean): void;
    setIsSheld(bool: boolean): void;
    setIsPossibleGoBack(bool: boolean): void;
    setIsPossibleOpenDevTool(bool: boolean): void;
    getShieldURL(): string;
    getExposeIpList(): string[];
    getIsFreeze(): boolean;
    getIsSheld(): boolean;
    getIsPossibleGoBack(): boolean;
    getIsPossibleOpenDevTool(): boolean;
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
    setConvertValue(func: ConvertValue): void;
    setProtocol(str: string): void;
    setDomain(str: string): void;
    setControllerPath(str: string): void;
    setTimeout(num: number): void;
    setWebSocketProtocol(str: string): void;
    setWebSocketEndPoint(str: string): void;
    setWebSocketlimit(num: number): void;
    getProtocol(): string;
    getDomain(): string;
    getControllerPath(): string;
    getTimeout(): number;
    getWebSocketProtocol(): string;
    getWebSocketEndPoint(): string;
    getWebSocketlimit(): number;
    setBeforeGetRequst(func: BeforeGetRequst): void;
    setBeforePostRequst(func: BeforePostRequst): void;
    setBeforePutRequst(func: BeforePutRequst): void;
    setBeforePatchRequst(func: BeforePatchRequst): void;
    setBeforeDeleteRequst(func: BeforeDeleteRequst): void;
    setBeforeCallbackWorked(func: BeforeCallbackWorked): void;
    setBeforeCallbackError(func: BeforeCallbackError): void;
    /**
     * Javascript의 다양한 기능을 가지고있는 object를 반환합니다.
     * @returns {Object} {utils}
     *
     * @example
     * utils.isAlpha();
     *
     * @description
     * boolean형 utils
     * Date형 utils
     * number형 utils
     * string형 utils
     * 형변환 utils가 있습니다.
     */
    utils: {
        /**
         * Checks if the given string consists only of English alphabet characters.
         * This method uses a regular expression to test whether the input string contains
         * only letters (both uppercase and lowercase) from A to Z.
         *
         * @param {string} str - The string to be tested.
         * @returns {boolean} Returns true if the string consists only of English alphabet characters; otherwise, false.
         *
         * @example
         * // returns true
         * hison.utils.isAlpha("HelloWorld");
         *
         * @example
         * // returns false
         * hison.utils.isAlpha("Hello World! 123");
         */
        isAlpha: (str: string) => boolean;
        isNumeric: (num: any) => boolean;
        getNumberFormat: (value: number, format?: string) => string;
        getToNumber: (val: any, impossibleValue?: number) => number;
        getToFloat: (val: any, impossibleValue?: number) => number;
        getToString: (str: any, impossibleValue?: string) => any;
    };
    /**
     * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
     *
     * @returns {Object} {function hisonShield}
     *
     * @example
     * shield.hisonShield(); // Initializes and executes the security measures.
     *
     * @description
     * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
     * hison 객체에 대해 Object.freeze()를 처리합니다. desfatched
     * localhost를 제외한 모든 URL 또는 특정 URL에 대해 개발자 모드 접근을 봉쇄합니다.
     * localhost를 제외한 모든 URL 또는 특정 URL에 대해 뒤로가기를 봉쇄합니다.
     */
    shield: {
        excute: (hison: {
            utils: {
                isAlpha(str: string): boolean;
                isNumeric(num: any): boolean;
                getNumberFormat(value: number, format?: string): string;
                getToNumber(val: any, impossibleValue?: number): number;
                getToFloat(val: any, impossibleValue?: number): number;
                getToString(str: any, impossibleValue?: string): any;
            };
            shield: {
                excute(hison: any): void;
            };
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
                /**
                 * DataModel is a JavaScript object for managing and manipulating a table-like data structure.
                 * It provides methods to add, remove, sort, and filter rows and columns, and to perform various operations on the data.
                 *
                 * @constructor
                 * @param {Array|Object} ArrayOrObject - An array or object to initialize the DataModel.
                 *                                       If an array of objects is provided, each object represents a row, and the keys represent the columns.
                 *                                       If an array of strings is provided, it initializes the column names.
                 *                                       If an object is provided, it initializes a single row with the object's key-value pairs.
                 */
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
        }) => void;
    };
    /**
     * DataWrapper와 DataModel 생성자를 가진 객체입니다.
     *
     * @returns {Object} { DataWrapper class, DataModel class }
     *
     * @example
     * new hison.data.DataWrapper(); DataWrapper 인스턴스를 생성합니다.
     * new hison.data.DataModel(); DataModel 인스턴스를 생성합니다.
     *
     * @description
     * DataModel을 감싸는 wrapper객체인 DataWrapper 생성자와
     * JavaScript object for managing and manipulating a table-like data structure인 DataModel 생성자를 갖고있는 객체입니다.
     */
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
        /**
         * DataModel is a JavaScript object for managing and manipulating a table-like data structure.
         * It provides methods to add, remove, sort, and filter rows and columns, and to perform various operations on the data.
         *
         * @constructor
         * @param {Array|Object} ArrayOrObject - An array or object to initialize the DataModel.
         *                                       If an array of objects is provided, each object represents a row, and the keys represent the columns.
         *                                       If an array of strings is provided, it initializes the column names.
         *                                       If an object is provided, it initializes a single row with the object's key-value pairs.
         */
        DataModel: {
            new (): {};
        };
    };
    /**
     * ApiLink와 CachingModule 생성자를 가진 객체입니다.
     *
     * @returns {Object} { ApiLink와 class, CachingModule class }
     *
     * @example
     * new hison.link.ApiLink(); ApiLink 인스턴스를 생성합니다.
     * new hison.link.CachingModule(); CachingModule 인스턴스를 생성합니다.
     *
     * @description
     * hisondev 플랫폼의 api-link와 통신을 지원하는 javasctript 통신 인스턴스인 ApiLink와.
     * hisondev 플랫폼의 api-link와 웹소캣 통신 및 캐싱을 지원하는 javasctript 인스턴스인 CachingModule을 갖고있는 객체입니다.
     */
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
