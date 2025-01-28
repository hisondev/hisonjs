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
interface Hison {
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
    setExposeIpList(arr: string[]): void;
    setIsFreeze(bool: boolean): void;
    setIsPossibleGoBack(bool: boolean): void;
    setIsPossibleOpenDevTool(bool: boolean): void;
    getShieldURL(): string;
    getExposeIpList(): string[];
    getIsFreeze(): boolean;
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
     * //Customizing the `convertValue` function to format Date objects as ISO strings
     * Hison.setConvertValue((value) => {
     *     if (value instanceof Date) {
     *         return value.toISOString(); //Convert Date to ISO 8601 format
     *     }
     *     return value; //Return other values as-is
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
    setCachingLimit(num: number): void;
    getProtocol(): string;
    getDomain(): string;
    getControllerPath(): string;
    getTimeout(): number;
    getWebSocketProtocol(): string;
    getWebSocketEndPoint(): string;
    getCachingLimit(): number;
    setBeforeGetRequst(func: BeforeGetRequst): void;
    setBeforePostRequst(func: BeforePostRequst): void;
    setBeforePutRequst(func: BeforePutRequst): void;
    setBeforePatchRequst(func: BeforePatchRequst): void;
    setBeforeDeleteRequst(func: BeforeDeleteRequst): void;
    setInterceptApiResult(func: InterceptApiResult): void;
    setInterceptApiError(func: InterceptApiError): void;
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
         * //returns true
         * hison.utils.isAlpha('HelloWorld');
         *
         * @example
         * //returns false
         * hison.utils.isAlpha('Hello World! 123');
         */
        isAlpha(str: string): boolean;
        isAlphaNumber(str: string): boolean;
        isNumber(str: string): boolean;
        isNumberSymbols(str: string): boolean;
        isIncludeSymbols(str: string): boolean;
        isLowerAlpha(str: string): boolean;
        isLowerAlphaAndNumber(str: string): boolean;
        isUpperAlpha(str: string): boolean;
        isUpperAlphaNumber(str: string): boolean;
        isNumeric(num: any): boolean;
        isInteger(num: any): boolean;
        isPositiveInteger(num: any): boolean;
        isNegativeInteger(num: any): boolean;
        isArray(arr: any): boolean;
        isObject(obj: any): boolean;
        isDate(date: DateObject | string): boolean;
        isTime(time: TimeObject | string): boolean;
        isDatetime(datetime: DateTimeObject | string): boolean;
        isEmail(str: string): boolean;
        isURL(urlStr: string): boolean;
        isValidMask(str: string, mask: string): boolean;
        getDateObject(dateStr: Date | string): DateObject;
        getTimeObject(str: Date | string): TimeObject;
        getDatetimeObject(datetime: Date | string): DateTimeObject;
        addDate(datetime: DateTimeObject | string, addValue: string | number, addType?: string, format?: string): DateTimeObject | string;
        getDateDiff(datetime1: DateTimeObject | string, datetime2: DateTimeObject | string, diffType?: string): number;
        getMonthName(month: number | string, isFullName?: boolean): string;
        getDateWithFormat(datetime: DateTimeObject | DateObject | string, format?: string): string;
        getDayOfWeek(date: DateObject | string, dayType?: string): string;
        getLastDay(date: DateObject | string): number;
        getSysYear(format?: string): string;
        getSysMonth(format?: string): string;
        getSysYearMonth(format?: string): string;
        getSysDay(format?: string): string;
        getSysDayOfWeek(dayType?: string): string;
        getSysHour(format?: string): string;
        getSysHourMinute(format?: string): string;
        getSysMinute(format?: string): string;
        getSysSecond(format?: string): string;
        getSysTime(format?: string): string;
        getSysDate(format?: string): string;
        getCeil(num: number, precision?: number): number;
        getFloor(num: number, precision?: number): number;
        getRound(num: number, precision?: number): number;
        getTrunc(num: number, precision?: number): number;
        getByteLength(str: string): number;
        getCutByteLength(str: string, cutByte: number): string;
        getStringLenForm(str: string, length: number): string;
        getLpad(str: string, padStr: string, length: number): string;
        getRpad(str: string, padStr: string, length: number): string;
        getTrim(str: string): string;
        getReplaceAll(str: string, targetStr: string, replaceStr?: string): string;
        nvl(val: any, defaultValue: any): any;
        getNumberFormat(value: number, format?: string): string;
        getRemoveExceptNumbers(str: string): string;
        getRemoveNumbers(str: string): string;
        getReverse(str: string): string;
        getToBoolean(value: any): boolean;
        getToNumber(value: any, impossibleValue?: number): number;
        getToFloat(value: any, impossibleValue?: number): number;
        getToInteger(value: any, impossibleValue?: number): number;
        getToString(str: any, impossibleValue?: string): string;
        getFileExtension(str: string): string;
        getFileName(str: string): string;
        getDecodeBase64(str: string): string;
        getEncodeBase64(str: string): string;
        deepCopyObject(object: any, visited?: {
            source: any;
            copy: any;
        }[]): any;
    };
    /**
     * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
     *
     * @returns {Object} {function excute}
     *
     * @example
     * shield.excute(); //Initializes and executes the security measures.
     *
     * @description
     * 웹 클라이언트에 대한 보안을 강화하는 조치를 합니다.
     * hison 객체에 대해 Object.freeze()를 처리합니다. desfatched
     * localhost를 제외한 모든 URL 또는 특정 URL에 대해 개발자 모드 접근을 봉쇄합니다.
     * localhost를 제외한 모든 URL 또는 특정 URL에 대해 뒤로가기를 봉쇄합니다.
     */
    shield: {
        /**
         * Executes the specified functionality for the given `Hison` object with additional security measures.
         * This function applies deep freezing, IP-based shielding, and developer mode restrictions based on the provided options.
         *
         * @param {Hison} hison - The main object to be processed and optionally frozen for immutability.
         *
         * @remarks
         * This function incorporates multiple layers of security, including:
         * - Freezing objects to prevent tampering.
         * - Blocking unauthorized access based on the user's IP.
         * - Preventing the use of browser developer tools.
         *
         * ### Related:
         * - hison.setShieldURL
         * - hison.setExposeIpList
         * - hison.setIsFreeze
         * - hison.setIsPossibleGoBack
         * - hison.setIsPossibleOpenDevTool
         *
         * #### Logic Breakdown:
         * 1. **Object Freezing**:
         *    - If `option.shield.isFreeze` is enabled, the `hison` object is deeply frozen using the `deepFreeze` function.
         *    - Prevents runtime modification of the object or its nested properties.
         *
         * 2. **Access Control by URL and IP**:
         *    - If not on `localhost`:
         *        - Ensures the current URL matches `option.shield.shieldURL`.
         *        - Fetches the user's IP via `/ajax/getIp`.
         *        - Verifies the IP against `option.shield.exposeIpList`.
         *        - If the IP is not allowed:
         *            - Prevents navigating back using the browser's back button.
         *            - Restricts developer tool access.
         *
         * 3. **Developer Tool Restrictions**:
         *    - Blocks `F12` key to prevent opening developer tools.
         *    - Detects and alerts when developer tools are opened using browser resizing, focus, or mouse events.
         *    - Displays a warning message and halts further actions if developer tools are detected.
         */
        excute: Function;
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
        DataWrapper: new (keyOrObject?: Record<string, any> | string, value?: any) => DataWrapper;
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
        DataModel: new (data?: Record<string, any>[] | Record<string, any>) => DataModel;
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
        CachingModule: new (cachingLimit?: number) => CachingModule;
        ApiGet: new (resourcePath?: string, cachingModule?: CachingModule) => ApiGet;
        ApiPost: new (serviceCmd: string, cachingModule?: CachingModule) => ApiPost;
        ApiPut: new (serviceCmd: string, cachingModule?: CachingModule) => ApiPut;
        ApiPatch: new (serviceCmd: string, cachingModule?: CachingModule) => ApiPatch;
        ApiDelete: new (serviceCmd: string, cachingModule?: CachingModule) => ApiDelete;
        ApiGetUrl: new (url: string, cachingModule?: CachingModule) => ApiGetUrl;
        ApiPostUrl: new (url: string, serviceCmd?: string, cachingModule?: CachingModule) => ApiPostUrl;
        ApiPutUrl: new (url: string, serviceCmd?: string, cachingModule?: CachingModule) => ApiPutUrl;
        ApiPatchUrl: new (url: string, serviceCmd?: string, cachingModule?: CachingModule) => ApiPatchUrl;
        ApiDeleteUrl: new (url: string, serviceCmd?: string, cachingModule?: CachingModule) => ApiDeleteUrl;
    };
}
interface DateObject {
    y: number | null;
    M: number | null;
    d: number | null;
}
interface TimeObject {
    h: number | null;
    m: number | null;
    s: number | null;
}
interface DateTimeObject extends DateObject, TimeObject {
}
/**
 * Converts special values into a predefined format before they are inserted into the DataModel.
 * This function allows for custom handling of values like Date, or other special values, to ensure
 * they are stored in the DataModel in a consistent and predictable format. By default, it returns the value as is.
 *
 * @param {any} value - The value to be converted. This can be a special value like Date or any other value.
 * @returns {any} Returns the converted value.
 *
 * @example
 * //When set the hison.data.convertValue
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
 *          return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
 *     }
 *     return value;
 * };
 * //Inserting a Date object into DataModel
 * const dm = newDataModel([{key:'key1',value:new Date()},{key:'key2',value:new Date()}]);
 * //The value will be in 'yyyy-MM-dd hh:mm:ss' format
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
 * DataWrapper constructor.
 * @constructor
 * @param {Object|string} keyOrObject - Either an object with key-value pairs, or a single key if paired with a value.
 * @param {*} [value] - Value associated with the provided key. Only needed if a single key is provided.
 */
interface DataWrapper {
    getIsDataWrapper(): boolean;
    clone(): DataWrapper;
    clear(): DataWrapper;
    getSerialized(): string;
    get(key: string): DataModel | string | null;
    getString(key: string): string;
    getDataModel(key: string): DataModel;
    put(key: string, value: any): DataWrapper;
    putString(key: string, value: string | number | boolean | bigint | symbol | null): DataWrapper;
    putDataModel(key: string, value: DataModel): DataWrapper;
    getObject(): Record<string, any>;
    containsKey(key: string): boolean;
    isEmpty(): boolean;
    remove(key: string): {
        data: DataWrapper;
        result: boolean;
    };
    size(): number;
    keys(): string[];
    values(): any[];
}
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
interface DataModel {
    getIsDataModel(): boolean;
    clone(): DataModel;
    clear(): DataModel;
    getSerialized(): string;
    isDeclare(): boolean;
    getColumns(): string[];
    getColumnValues(column: string): any[];
    addColumn(column: string): DataModel;
    addColumns(columns: string[]): DataModel;
    setColumnSameValue(column: string, value: any): DataModel;
    setColumnSameFormat(column: string, formatter: DataModelFormatter): DataModel;
    getRow(rowIndex: number): Record<string, any>;
    getRowAsDataModel(rowIndex: number): DataModel;
    addRow(rowIndexOrRow?: number | Record<string, any>, row?: Record<string, any>): DataModel;
    getRows(startRow?: number, endRow?: number): Record<string, any>[];
    getRowsAsDataModel(startRow?: number, endRow?: number): DataModel;
    addRows(rows: Record<string, any>[]): DataModel;
    getObject(): Record<string, any>;
    getValue(rowIndex: number, column: string): any;
    setValue(rowIndex: number, column: string, value: any): DataModel;
    removeColumn(column: string): DataModel;
    removeColumns(columns: string[]): DataModel;
    removeRow(rowIndex?: number): Record<string, any>;
    getColumnCount(): number;
    getRowCount(): number;
    hasColumn(column: string): boolean;
    setValidColumns(columns: string[]): DataModel;
    isNotNullColumn(column: string): boolean;
    findFirstRowNullColumn(column: string): Record<string, any>;
    isNotDuplColumn(column: string): boolean;
    findFirstRowDuplColumn(column: string): Record<string, any>;
    isValidValue(column: string, vaildator: DataModelValidator): boolean;
    findFirstRowInvalidValue(column: string, vaildator: DataModelValidator): Record<string, any>;
    searchRowIndexes(condition: Record<string, any>, isNegative?: boolean): number[];
    searchRows(condition: Record<string, any>, isNegative?: boolean): Record<string, any>[];
    searchRowsAsDataModel(condition: Record<string, any>, isNegative?: boolean): DataModel;
    searchAndModify(condition: Record<string, any>, isNegative?: boolean): DataModel;
    filterRowIndexes(filter: DataModelFillter): number[];
    filterRows(filter: DataModelFillter): Record<string, any>[];
    filterRowsAsDataModel(filter: DataModelFillter): DataModel;
    filterAndModify(filter: DataModelFillter): DataModel;
    setColumnSorting(columns: string[]): DataModel;
    sortColumnAscending(): DataModel;
    sortColumnDescending(): DataModel;
    sortColumnReverse(): DataModel;
    sortRowAscending(column: string, isIntegerOrder?: boolean): DataModel;
    sortRowDescending(column: string, isIntegerOrder?: boolean): DataModel;
    sortRowReverse(): DataModel;
}
interface DataModelFormatter {
    (value: any): any;
}
interface DataModelValidator {
    (value: any): boolean;
}
interface DataModelFillter {
    (row: Record<string, any>): boolean;
}
interface CachingModule {
    getIsCachingModule(): boolean;
    hasKey(key: string): boolean;
    get(key: string): Promise<{
        data: any;
        response: Response;
    }>;
    put(key: string, value: Promise<{
        data: any;
        response: Response;
    }>): void;
    remove(key: string): void;
    getAll(): Record<string, Promise<{
        data: any;
        response: Response;
    }>>;
    getKeys(): string[];
    clear(): void;
    onopen(func: ((this: WebSocket, ev: Event) => any) | null): void;
    onmessage(func: ((this: WebSocket, ev: MessageEvent) => any) | null): void;
    onclose(func: ((this: WebSocket, ev: CloseEvent) => any) | null): void;
    onerror(func: ((this: WebSocket, ev: Event) => any) | null): void;
    isWebSocketConnection(): number;
}
interface ApiGet {
    call(options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiPost {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiPut {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiPatch {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiDelete {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiGetUrl {
    call(options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiPostUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiPutUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiPatchUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
interface ApiDeleteUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: any;
        response: Response;
    }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * Defines the behavior to be executed before making a GET request in apiLink.
 * This function can be customized to perform actions or checks before the actual GET request is sent.
 * By default, it is set to return true, allowing the GET request to proceed.
 * Returning false from this function will prevent the GET request from being sent.
 *
 * @param {string} resourcePath - The URL address to which the GET request will be sent.
 * @param {object} options - Options provided by the user for the GET request.
 * @returns {boolean} Returns true to proceed with the GET request, or false to prevent the request from being sent.
 *
 * @example
 * hison.link.beforeGetRequst = function(resourcePath, options) {
 *     //Custom logic before sending a GET request
 *     return true; //Proceed with the GET request
 * };
 *
 * @example
 * //Preventing a GET request
 * hison.link.beforeGetRequst = function(resourcePath, options) {
 *     //Custom logic to determine whether to proceed
 *     return false; //Prevent the GET request
 * };
 *
 * Note: This function is useful for implementing pre-request validations, logging, or any setup required before
 * making a GET request. The function's return value controls whether the GET request should be executed.
 */
interface BeforeGetRequst {
    (resourcePath?: string, options?: Record<string, any>): boolean | void;
}
interface BeforePostRequst {
    (requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;
}
interface BeforePutRequst {
    (requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;
}
interface BeforePatchRequst {
    (requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;
}
interface BeforeDeleteRequst {
    (requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;
}
interface InterceptApiResult {
    (result: DataWrapper | undefined, response: Response): boolean | void;
}
interface InterceptApiError {
    (error: any /**promise에서 던지는 error는 어떤 값이든 가능하다 */): boolean | void;
}
declare const _default: Hison;
export default _default;
