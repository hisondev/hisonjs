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
};
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
interface callbackWorked {(result: DataWrapper | undefined, response: Response): boolean | void;};
interface callbackError {(error: any/**promise에서 던지는 error는 어떤 값이든 가능하다 */): boolean | void;};
interface BeforeGetRequst {(resourcePath: string, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforePostRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforePutRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforePatchRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforeDeleteRequst {(requestDw: DataWrapper, callbackWorkedFunc: callbackWorked, callbackErrorFunc: callbackError, options: {}): boolean | void;};
interface BeforeCallbackWorked extends callbackWorked {};
interface BeforeCallbackError extends callbackError {};
interface DataWrapper {

};
interface DataModel {

};
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
function createHison() {
    class Option {
        utils = {
            dateFormat : 'yyyy-MM-dd',
            timeFormat : 'hh:mm:ss',
            datetimeFormat : 'yyyy-MM-dd hh:mm:ss',
            yearFormat : 'yyyy',
            monthFormat : 'M',
            monthNameFormat : 'MMMM',
            yearMonthFormat : 'yyyy-MM',
            dayFormat : 'd',
            dayOfWeekFormat : 'd',
            hourFormat : 'h',
            hourMinuteFormat : 'hh:mm',
            minuteFormat : 'm',
            secondFormat : 's',
            numberFormat : '#,##0.##',
            LESSOREQ_0X7FF_BYTE : 2,    //charCode <= 0x7FF
            LESSOREQ_0XFFFF_BYTE : 3,   //charCode <= 0xFFFF
            GREATER_0XFFFF_BYTE : 4,    //charCode > 0xFFFF
        };
        shield = {
            shieldURL : "",
            exposeIpList : ["0:0:0:0:0:0:0:1"],
            isFreeze : true,
            isSheld : true,
            isPossibleGoBack : false,
            isPossibleOpenDevTool : false,
        };
        data = {
            convertValue : function(value: any): any {return value;},
        };
        link = {
            protocol : 'http://',
            domain : 'localhost:8081',
            controllerPath : '/hison-api-link',
            timeout : 10000,
            webSocketProtocol : 'ws://',
            webSocketEndPoint : '/hison-caching-websocket-endpoint',
            webSocketlimit : 10,
            beforeGetRequst : function(resourcePath: string, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePostRequst : function(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePutRequst : function(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforePatchRequst : function(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforeDeleteRequst : function(requestDw: DataWrapper, callbackWorkedFunc: Function, callbackErrorFunc: Function, options: {}): boolean | void {return true;},
            beforeCallbackWorked : function(result: DataWrapper | undefined, response: Response): boolean | void {return true;},
            beforeCallbackError : function(error: any): boolean | void {return true;},
        };
    }
    const option = new Option();
    let _hison: Hison;

    class Hison implements Hison{
        /**
         * Javascript의 다양한 기능을 가지고있는 object를 반환합니다.
         * @returns {Object} {function hisonShield}
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
        utils = {
            isAlpha: function(str: string):boolean {
                return /^[A-Za-z]+$/.test(str);
            },
        };
        /**
         * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
         * 
         * @returns {Object} {function hisonShield}
         * 
         * @example
         * sheild.hisonShield(); // Initializes and executes the security measures.
         * 
         * @description
         * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
         * hison 객체에 대해 Object.freeze()를 처리합니다. desfatched
         * localhost를 제외한 모든 URL 또는 특정 URL에 대해 개발자 모드 접근을 봉쇄합니다.
         * localhost를 제외한 모든 URL 또는 특정 URL에 대해 뒤로가기를 봉쇄합니다.
         */
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
    //내부에서 사용될 hison객체
    _hison = new Hison();

    const hison = new Hison();
    return {
        //====================================================================================
        //option utils set
        //====================================================================================
        //set
        setDateFormat : function(str: string) {option.utils.dateFormat = str;},
        setTimeFormat : function(str: string) {option.utils.timeFormat = str;},
        setDatetimeFormat : function(str: string) {option.utils.datetimeFormat = str;},
        setYearFormat : function(str: string) {option.utils.yearFormat = str;},
        setMonthFormat : function(str: string) {option.utils.monthFormat = str;},
        setMonthNameFormat : function(str: string) {option.utils.monthNameFormat = str;},
        setYearMonthFormat : function(str: string) {option.utils.yearMonthFormat = str;},
        setDayFormat : function(str: string) {option.utils.dayFormat = str;},
        setDayOfWeekFormat : function(str: string) {option.utils.dayOfWeekFormat = str;},
        setHourFormat : function(str: string) {option.utils.hourFormat = str;},
        setHourMinuteFormat : function(str: string) {option.utils.hourMinuteFormat = str;},
        setMinuteFormat : function(str: string) {option.utils.minuteFormat = str;},
        setSecondFormat : function(str: string) {option.utils.secondFormat = str;},
        setNumberFormat : function(str: string) {option.utils.numberFormat = str;},
        setLESSOREQ_0X7FF_BYTE : function(num: number) {option.utils.LESSOREQ_0X7FF_BYTE = num;},
        setLESSOREQ_0XFFFF_BYTE : function(num: number) {option.utils.LESSOREQ_0XFFFF_BYTE = num;},
        setGREATER_0XFFFF_BYTE : function(num: number) {option.utils.GREATER_0XFFFF_BYTE = num;},
        //get
        getDateFormat : function() {return option.utils.dateFormat;},
        getTimeFormat : function() {return option.utils.timeFormat;},
        getDatetimeFormat : function() {return option.utils.datetimeFormat;},
        getYearFormat : function() {return option.utils.yearFormat;},
        getMonthFormat : function() {return option.utils.monthFormat;},
        getMonthNameFormat : function() {return option.utils.monthNameFormat;},
        getYearMonthFormat : function() {return option.utils.yearMonthFormat;},
        getDayFormat : function() {return option.utils.dayFormat;},
        getDayOfWeekFormat : function() {return option.utils.dayOfWeekFormat;},
        getHourFormat : function() {return option.utils.hourFormat;},
        getHourMinuteFormat : function() {return option.utils.hourMinuteFormat;},
        getMinuteFormat : function() {return option.utils.minuteFormat;},
        getSecondFormat : function() {return option.utils.secondFormat;},
        getNumberFormat : function() {return option.utils.numberFormat;},
        getLESSOREQ_0X7FF_BYTE : function() {return option.utils.LESSOREQ_0X7FF_BYTE;},
        getLESSOREQ_0XFFFF_BYTE : function() {return option.utils.LESSOREQ_0XFFFF_BYTE;},
        getGREATER_0XFFFF_BYTE : function() {return option.utils.GREATER_0XFFFF_BYTE;},

        //====================================================================================
        //option sheild set
        //====================================================================================
        //set
        setShieldURL : function(str: string) {option.shield.shieldURL = str;},
        setExposeIpList : function(arr: []) {option.shield.exposeIpList = arr;},
        setIsFreeze : function(bool: boolean) {option.shield.isFreeze = bool;},
        setIsSheld : function(bool: boolean) {option.shield.isSheld = bool;},
        setIsPossibleGoBack : function(bool: boolean) {option.shield.isPossibleGoBack = bool;},
        setIsPossibleOpenDevTool : function(bool: boolean) {option.shield.isPossibleOpenDevTool = bool;},
        //get
        getShieldURL : function() {return option.shield.shieldURL;},
        getExposeIpList : function() {return option.shield.exposeIpList;},
        getIsFreeze : function() {return option.shield.isFreeze;},
        getIsSheld : function() {return option.shield.isSheld;},
        getIsPossibleGoBack : function() {return option.shield.isPossibleGoBack;},
        getIsPossibleOpenDevTool : function() {return option.shield.isPossibleOpenDevTool;},

        //====================================================================================
        //option data set
        //====================================================================================
        //function set
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

        //====================================================================================
        //option link set
        //====================================================================================
        //set
        setProtocol : function(str: string) {option.link.protocol = str;},
        setDomain : function(str: string) {option.link.domain = str;},
        setControllerPath : function(str: string) {option.link.controllerPath = str;},
        setTimeout : function(num: number) {option.link.timeout = num;},
        setWebSocketProtocol : function(str: string) {option.link.webSocketProtocol = str;},
        setWebSocketEndPoint : function(str: string) {option.link.webSocketEndPoint = str;},
        setWebSocketlimit : function(num: number) {option.link.webSocketlimit = num;},
        //get
        getProtocol : function() {return option.link.protocol;},
        getDomain : function() {return option.link.domain;},
        getControllerPath : function() {return option.link.controllerPath;},
        getTimeout : function() {return option.link.timeout;},
        getWebSocketProtocol : function() {return option.link.webSocketProtocol;},
        getWebSocketEndPoint : function() {return option.link.webSocketEndPoint;},
        getWebSocketlimit : function() {return option.link.webSocketlimit;},
        //function set
        setBeforeGetRequst : function(func: BeforeGetRequst) {option.link.beforeGetRequst = func;},
        setBeforePostRequst : function(func: BeforePostRequst) {option.link.beforePostRequst = func},
        setBeforePutRequst : function(func: BeforePutRequst) {option.link.beforePutRequst = func},
        setBeforePatchRequst : function(func: BeforePatchRequst) {option.link.beforePatchRequst = func},
        setBeforeDeleteRequst : function(func: BeforeDeleteRequst) {option.link.beforeDeleteRequst = func},
        setBeforeCallbackWorked : function(func: BeforeCallbackWorked) {option.link.beforeCallbackWorked = func},
        setBeforeCallbackError : function(func: BeforeCallbackError) {option.link.beforeCallbackError = func},

        //====================================================================================
        //option link set
        //====================================================================================
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
        isAlpha: hison.utils.isAlpha,
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
        data: hison.data,
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