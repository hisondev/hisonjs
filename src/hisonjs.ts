/**
 * The `Hison` interface serves as a central container for configuration values and methods 
 * required to use the `hisondev` solution. It provides various functionalities aimed at 
 * enhancing the development experience.
 *
 * The `hisondev` solution offers the following core modules:
 *
 * - **hison.utils**: A collection of utility methods for various development needs.
 * - **hison.sheild**: Security-related methods to enhance data protection.
 * - **hison.data**: Instances designed for structuring and transmitting communication 
 *   data in a table format.
 * - **hison.link**: Promise-based communication support instances to simplify 
 *   asynchronous operations.
 *
 * ## Object Creation and Encapsulation
 * - The `Hison` object is **created through the `createHison()` function**, which encapsulates 
 *   its implementation using a closure.
 * - This ensures that the internal state remains private while exposing only the necessary 
 *   methods to interact with `Hison`.
 * - The function returns an object containing various methods to access `Hison` functionalities.
 *
 * ## Default Option Configuration
 * - `Hison` provides setter methods to modify **defaultOption** properties that influence 
 *   internal method behavior.
 * - Examples include:
 *   - `setDateFormat(format: string)`: Updates the default date format.
 *   - `setTimeFormat(format: string)`: Updates the default time format.
 * - These methods allow developers to customize behavior according to project requirements.
 */
interface Hison {
    //====================================================================================
    //option utils set
    //====================================================================================
    /**
     * Sets the default format for displaying dates.
     *
     * This method updates the `dateFormat` property in `defaultOption.utils`, 
     * which is used throughout the `hisondev` solution for parsing and formatting date values.
     *
     * - The new format will be applied globally to all date-related operations.
     * - Default value: `'yyyy-MM-dd'`
     * - Example output after setting format: `'02/04/2025'` (for `'MM/dd/yyyy'`)
     *
     * ## Related Property
     * - **`dateFormat`**: Defines the default date format.
     *   - Default: `'yyyy-MM-dd'`
     *   - Example output: `'2025-02-04'`
     *
     * @param str The new date format string.
     */
    setDateFormat(str: string): void;
    /**
     * Sets the default format for displaying time.
     *
     * This method updates the `timeFormat` property in `defaultOption.utils`, 
     * which is used throughout the `hisondev` solution for parsing and formatting time values.
     *
     * - The new format will be applied globally to all time-related operations.
     * - Default value: `'hh:mm:ss'`
     * - Example output after setting format: `'14:30'` (for `'HH:mm'`)
     *
     * ## Related Property
     * - **`timeFormat`**: Defines the default time format.
     *   - Default: `'hh:mm:ss'`
     *   - Example output: `'14:30:15'`
     *
     * @param str The new time format string.
     */
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

    //====================================================================================
    //option shield set
    //====================================================================================
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

    //====================================================================================
    //option link set
    //====================================================================================
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
        //for boolean
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
        isAlpha(str: string): boolean
        isAlphaNumber(str: string): boolean
        isNumber(str: string): boolean
        isNumberSymbols(str: string): boolean
        isIncludeSymbols(str: string): boolean
        isLowerAlpha(str: string): boolean
        isLowerAlphaAndNumber(str: string): boolean
        isUpperAlpha(str: string): boolean
        isUpperAlphaNumber(str: string): boolean
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
        //for Date
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
        //for number
        getCeil(num: number, precision?: number): number;
        getFloor(num: number, precision?: number): number;
        getRound(num: number, precision?: number): number;
        getTrunc(num: number, precision?: number): number;
        //for string
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
        //for convertor
        getToBoolean(value: any): boolean;
        getToNumber(value: any, impossibleValue?: number): number;
        getToFloat(value: any, impossibleValue?: number): number;
        getToInteger(value: any, impossibleValue?: number): number;
        getToString(str: any, impossibleValue?: string): string;
        //etc
        getFileExtension(str: string): string;
        getFileName(str: string): string;
        getDecodeBase64(str: string): string;
        getEncodeBase64(str: string): string;
        deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any;
    }
    
    //====================================================================================
    //shield
    //====================================================================================
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
    
    //====================================================================================
    //data
    //====================================================================================
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

    //====================================================================================
    //link
    //====================================================================================
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
    }
}
//====================================================================================
//utils interface, type
//====================================================================================
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
interface DateTimeObject extends DateObject, TimeObject {}
enum MonthFullName {
    January = 1, February, March, April, May, June, July, August, September, October, November, December
}
enum MonthShortName {
    Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
}
enum DayOfWeekFullName {
    Sun = 0, Mon, Tue, Wed, Thu, Fri, Sat
}
enum DayOfWeekShortName {
    Sunday = 0, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}
enum DayOfWeekFullNameKR {
    일 = 0, 월, 화, 수, 목, 금, 토
}
enum DayOfWeekShortNameKR {
    일요일 = 0, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일
}
//====================================================================================
//shield interface, type
//====================================================================================

//====================================================================================
//datamodel interface, type
//====================================================================================
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
};
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
    remove(key: string): { data: DataWrapper, result: boolean };
    size(): number;
    keys(): string[];
    values(): any[];
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
};
interface DataModelFormatter{(value: any): any;};
interface DataModelValidator{(value: any): boolean;};
interface DataModelFillter{(row: Record<string, any>): boolean;};
//====================================================================================
//link interface, type
//====================================================================================
interface CachingModule {
    getIsCachingModule(): boolean;
    hasKey(key: string): boolean;
    get(key: string): Promise<{ data: any; response: Response; }>;
    put(key: string, value: Promise<{ data: any; response: Response; }>): void;
    remove(key: string): void;
    getAll(): Record<string, Promise<{ data: any; response: Response; }>>;
    getKeys(): string[];
    clear(): void;
    onopen(func: ((this: WebSocket, ev: Event) => any) | null): void;
    onmessage(func: ((this: WebSocket, ev: MessageEvent) => any) | null): void;
    onclose(func: ((this: WebSocket, ev: CloseEvent) => any) | null): void;
    onerror(func: ((this: WebSocket, ev: Event) => any) | null): void;
    isWebSocketConnection(): number;
};
interface ApiGet {
    call(options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiPost {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiPut {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiPatch {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiDelete {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiGetUrl {
    call(options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiPostUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiPutUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiPatchUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
interface ApiDeleteUrl {
    call(requestData: any, options?: Record<string, any>): Promise<{ data: any; response: Response; }>;
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    options(options?: Record<string, any>): Promise<string[]>;
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
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
interface BeforeGetRequst {(resourcePath?: string, options?: Record<string, any>): boolean | void;};
interface BeforePostRequst {(requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;};
interface BeforePutRequst {(requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;};
interface BeforePatchRequst {(requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;};
interface BeforeDeleteRequst {(requestDw?: DataWrapper, options?: Record<string, any>): boolean | void;};
interface InterceptApiResult {(result: DataWrapper | undefined, response: Response): boolean | void;};
interface InterceptApiError {(error: any/**promise에서 던지는 error는 어떤 값이든 가능하다 */): boolean | void;};

//====================================================================================
//createHison
//====================================================================================
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
 * 어떻게 사용하는지 명시
 * 
 * @namespace Hison
 */
function createHison(): Hison {
    class DefaultOption {
        utils = {
            /**
             * The default format for displaying dates.
             *
             * This format is used throughout the `hisondev` solution for parsing 
             * and formatting date values.
             *
             * - Default value: `'yyyy-MM-dd'`
             * - Example output: `'2025-02-04'` (for February 4, 2025)
             * - Can be modified using `setDateFormat(format: string)`.
             */
            dateFormat : 'yyyy-MM-dd',
            /**
             * The default format for displaying time.
             *
             * This format is used throughout the `hisondev` solution for parsing 
             * and formatting time values.
             *
             * - Default value: `'hh:mm:ss'`
             * - Example output: `'14:30:15'` (for 2:30:15 PM)
             * - Can be modified using `setTimeFormat(format: string)`.
             */
            timeFormat : 'hh:mm:ss',
            /**
             * The default format for displaying date and time.
             *
             * This format is used throughout the `hisondev` solution for parsing 
             * and formatting datetime values.
             *
             * - Default value: `'yyyy-MM-dd hh:mm:ss'`
             * - Example output: `'2025-02-04 14:30:15'` (for February 4, 2025, 2:30:15 PM)
             * - Can be modified using `setDatetimeFormat(format: string)`.
             */
            datetimeFormat : 'yyyy-MM-dd hh:mm:ss',
            /**
             * The default format for displaying the year.
             *
             * This format is used to represent year values in date-related operations.
             *
             * - Default value: `'yyyy'`
             * - Example output: `'2025'` (for the year 2025)
             * - Can be modified using `setYearFormat(format: string)`.
             */
            yearFormat : 'yyyy',
            /**
             * The default format for displaying the month.
             *
             * This format is used to represent month values in date-related operations.
             *
             * - Default value: `'M'`
             * - Example output: `'2'` (for February)
             * - Can be modified using `setMonthFormat(format: string)`.
             */
            monthFormat : 'M',
            /**
             * The default format for displaying the full month name.
             *
             * This format is used to represent the full name of a month in date-related operations.
             *
             * - Default value: `'MMMM'`
             * - Example output: `'February'` (for the month of February)
             * - Can be modified using `setMonthNameFormat(format: string)`.
             */
            monthNameFormat : 'MMMM',
            /**
             * The default format for displaying year and month.
             *
             * This format is used to represent a combination of year and month in date-related operations.
             *
             * - Default value: `'yyyy-MM'`
             * - Example output: `'2025-02'` (for February 2025)
             * - Can be modified using `setYearMonthFormat(format: string)`.
             */
            yearMonthFormat : 'yyyy-MM',
            /**
             * The default format for displaying the day of the month.
             *
             * This format is used to represent the day component in date-related operations.
             *
             * - Default value: `'d'`
             * - Example output: `'4'` (for the 4th day of the month)
             * - Can be modified using `setDayFormat(format: string)`.
             */
            dayFormat : 'd',
            /**
             * The default format for displaying the day of the week.
             *
             * This format is used to represent the day of the week in date-related operations.
             *
             * - Default value: `'d'`
             * - Example output: `'3'` (where 3 could represent Wednesday depending on locale settings)
             * - Can be modified using `setDayOfWeekFormat(format: string)`.
             */
            dayOfWeekFormat : 'd',
            /**
             * The default format for displaying the hour.
             *
             * This format is used to represent the hour component in time-related operations.
             *
             * - Default value: `'h'`
             * - Example output: `'2'
             * - Can be modified using `setHourFormat(format: string)`.
             */
            hourFormat : 'h',
            /**
             * The default format for displaying the hour and minute.
             *
             * This format is used to represent the time in hours and minutes.
             *
             * - Default value: `'hh:mm'`
             * - Example output: `'14:30'` (for 2:30 PM in 24-hour format)
             * - Can be modified using `setHourMinuteFormat(format: string)`.
             */
            hourMinuteFormat : 'hh:mm',
            /**
             * The default format for displaying the minute.
             *
             * This format is used to represent the minute component in time-related operations.
             *
             * - Default value: `'m'`
             * - Example output: `'5'` (for the 5th minute of the hour)
             * - Can be modified using `setMinuteFormat(format: string)`.
             */
            minuteFormat : 'm',
            /**
             * The default format for displaying the second.
             *
             * This format is used to represent the second component in time-related operations.
             *
             * - Default value: `'s'`
             * - Example output: `'45'` (for the 45th second of the minute)
             * - Can be modified using `setSecondFormat(format: string)`.
             */
            secondFormat : 's',
            /**
             * The default format for displaying numbers.
             *
             * This format is used to represent numeric values with grouping separators and decimal precision.
             *
             * - Default value: `"#,##0.##"`
             * - Example output: `"1,234.56"` (for the number `1234.56`)
             * - Can be modified using `setNumberFormat(format: string)`.
             */
            numberFormat : '#,##0.##',
            /**
             * The byte size used for characters with a char code less than or equal to `0x7FF`.
             *
             * This value defines the number of bytes required to encode characters in this range.
             *
             * - Default value: `2`
             * - Represents characters with `charCode <= 0x7FF`
             */
            LESSOREQ_0X7FF_BYTE : 2,
            /**
             * The byte size used for characters with a char code less than or equal to `0xFFFF`.
             *
             * This value defines the number of bytes required to encode characters in this range.
             *
             * - Default value: `3`
             * - Represents characters with `charCode <= 0xFFFF`
             */
            LESSOREQ_0XFFFF_BYTE : 3,
            /**
             * The byte size used for characters with a char code greater than `0xFFFF`.
             *
             * This value defines the number of bytes required to encode characters in this range.
             *
             * - Default value: `4`
             * - Represents characters with `charCode > 0xFFFF`
             */
            GREATER_0XFFFF_BYTE : 4,
        };
        shield = {
            /**
             * The URL used to enforce access restrictions.
             *
             * If this value is set, the system verifies whether the current location matches 
             * the specified URL. If not, access may be blocked.
             *
             * - Default value: `""` (empty string, meaning no restriction)
             * - Used in `shield.excute(hison: Hison)` to validate the URL.
             */
            shieldURL : '',
            /**
             * A list of IP addresses that are allowed to bypass security restrictions.
             *
             * When the shield mechanism is activated, only these IPs are granted access.
             *
             * - Default value: `["0:0:0:0:0:0:0:1"]` (allows localhost)
             * - Used in `shield.excute(hison: Hison)` to verify access permissions.
             */
            exposeIpList : ['0:0:0:0:0:0:0:1'],
            /**
             * Determines whether the `Hison` instance should be frozen to prevent modifications.
             *
             * If `true`, the `Hison` object and its properties are deeply frozen using `Object.freeze()`, 
             * ensuring that no further changes can be made.
             *
             * - Default value: `true`
             * - Used in `shield.excute(hison: Hison)`, where `deepFreeze(hison)` is applied.
             */
            isFreeze : true,
            /**
             * Determines whether the browser's back navigation is allowed.
             *
             * If `false`, a mechanism is implemented to prevent the user from navigating back.
             *
             * - Default value: `false`
             * - Used in `shield.excute(hison: Hison)`, where `history.pushState()` is applied 
             *   to disable the back button.
             */
            isPossibleGoBack : false,
            /**
             * Determines whether developer tools can be opened.
             *
             * If `false`, an event listener is added to detect developer mode access (F12 key, 
             * browser dev tools, resizing, etc.), and alerts the user if an attempt is detected.
             *
             * - Default value: `false`
             * - Used in `shield.excute(hison: Hison)`, where `shieldFuncCreateBlockDevMode()` is triggered.
             */
            isPossibleOpenDevTool : false,
        };
        data = {
            /**
             * A function that allows customization of how specific objects are inserted into a `DataModel`.
             *
             * In `hisondev`, all values inserted into a `DataModel` are **copied** to maintain data integrity.
             * However, certain JavaScript objects, such as `Date`, require a more flexible way of handling 
             * their copying process. Instead of manually defining conversion logic for every object type, 
             * `convertValue` provides a way for developers to customize how specific objects are transformed
             * before being inserted into a `DataModel`.
             *
             * - By default, this function **returns the input value as is**.
             * - Developers can override this function to implement custom conversion logic.
             * - Used in `DataModel._deepCopy(object)`, where it is applied to non-plain objects.
             *
             * ## Usage in `DataModel`
             * When copying an object, if it is not a plain `Object` or `Array`, `convertValue` is called:
             * ```typescript
             * if (object.constructor !== Object && object.constructor !== Array) {
             *     const convertValue = defaultOption.data.convertValue(object);
             *     return convertValue !== undefined ? convertValue : object;
             * }
             * ```
             *
             * ## Example: Customizing `convertValue` to Handle `Date` Objects
             * ```typescript
             * hison.setConvertValue((value: any) => {
             *     return value instanceof Date ? value.getTime() : value;
             * });
             * ```
             *
             * - The above example ensures that when a `Date` object is inserted into `DataModel`, 
             *   it is converted into a timestamp (`number`) instead of being copied as a reference.
             *
             * @param value The value to be processed before being inserted into `DataModel`.
             * @returns The customized or original value.
             */
            convertValue(value: any): any {return value;},
        };
        link = {
            /**
             * The default protocol used for API communication.
             *
             * - Default value: `'http://'`
             * - Used in `ApiLink` to construct request URLs.
             */
            protocol : 'http://',
            /**
             * The default domain for API requests.
             *
             * - Default value: `'localhost:8081'`
             * - Used in `ApiLink` when constructing full request URLs.
             */
            domain : 'localhost:8081',
            /**
             * The default controller path for API requests.
             *
             * This value is appended to the `protocol` and `domain` when making API calls.
             *
             * - Default value: `'/hison-api-link'`
             * - Used in `ApiLink` when constructing API request URLs.
             */
            controllerPath : '/hison-api-link',
            /**
             * The timeout duration (in milliseconds) for API requests.
             *
             * If the request does not complete within this time, it will be aborted.
             *
             * - Default value: `10000` (10 seconds)
             * - Used in `ApiLink._getFetch()` to set request timeouts.
             */
            timeout : 10000,
            /**
             * The default protocol used for WebSocket connections.
             *
             * - Default value: `'ws://'`
             * - Used in `ApiLink` when initializing WebSocket communication.
             */
            webSocketProtocol : 'ws://',
            /**
             * The default WebSocket endpoint for caching-related communication.
             *
             * - Default value: `'/hison-caching-websocket-endpoint'`
             * - Used in `ApiLink` when establishing WebSocket connections.
             */
            webSocketEndPoint : '/hison-caching-websocket-endpoint',
            /**
             * The caching limit for stored API responses.
             *
             * Determines the maximum number of cached API responses before old ones are removed.
             *
             * - Default value: `10`
             * - Used in `ApiLink._getCachingResult()` for cache management.
             */
            cachingLimit : 10,
            /**
             * Hook function executed before making a `GET` request.
             *
             * This function can be used to modify request parameters or cancel the request.
             *
             * - If it returns `false`, the request will be canceled.
             * - Default implementation returns `true`.
             *
             * @param resourcePath The API resource path being requested.
             * @param options Additional request options.
             * @returns `boolean | void` (Returning `false` cancels the request)
             */
            beforeGetRequst(resourcePath: string, options: Record<string, any>): boolean | void {return true;},
            /**
             * Hook function executed before making a `POST` request.
             *
             * This function allows modifying the request before it is sent.
             *
             * - If it returns `false`, the request will be canceled.
             * - Default implementation returns `true`.
             *
             * @param requestDw The `DataWrapper` object containing the request data.
             * @param options Additional request options.
             * @returns `boolean | void` (Returning `false` cancels the request)
             */
            beforePostRequst(requestDw: DataWrapper, options: Record<string, any>): boolean | void {return true;},
            /**
             * Hook function executed before making a `PUT` request.
             *
             * - If it returns `false`, the request will be canceled.
             * - Default implementation returns `true`.
             *
             * @param requestDw The `DataWrapper` object containing the request data.
             * @param options Additional request options.
             * @returns `boolean | void` (Returning `false` cancels the request)
             */
            beforePutRequst(requestDw: DataWrapper, options: Record<string, any>): boolean | void {return true;},
            /**
             * Hook function executed before making a `PATCH` request.
             *
             * - If it returns `false`, the request will be canceled.
             * - Default implementation returns `true`.
             *
             * @param requestDw The `DataWrapper` object containing the request data.
             * @param options Additional request options.
             * @returns `boolean | void` (Returning `false` cancels the request)
             */
            beforePatchRequst(requestDw: DataWrapper, options: Record<string, any>): boolean | void {return true;},
            /**
             * Hook function executed before making a `DELETE` request.
             *
             * - If it returns `false`, the request will be canceled.
             * - Default implementation returns `true`.
             *
             * @param requestDw The `DataWrapper` object containing the request data.
             * @param options Additional request options.
             * @returns `boolean | void` (Returning `false` cancels the request)
             */
            beforeDeleteRequst(requestDw: DataWrapper, options: Record<string, any>): boolean | void {return true;},
            /**
             * Intercepts and processes API responses before returning them to the caller.
             *
             * - If it returns `false`, the response is ignored.
             * - Default implementation returns `true`.
             *
             * @param result The `DataWrapper` object containing the API response.
             * @param response The raw `Response` object from the fetch request.
             * @returns `boolean | void` (Returning `false` cancels further processing)
             */
            interceptApiResult(result: DataWrapper | undefined, response: Response): boolean | void {return true;},
            /**
             * Intercepts and processes API errors before returning them to the caller.
             *
             * - If it returns `false`, the error is ignored.
             * - Default implementation returns `true`.
             *
             * @param error The encountered error.
             * @returns `boolean | void` (Returning `false` cancels further error handling)
             */
            interceptApiError(error: any): boolean | void {return true;},
        };
    }
    class LRUCache {
        constructor(limit: number) {
            this._limit = limit;
            this._cache = {};
            this._keys = [];
        }
        private _limit: number;
        private _cache: Record<string, Promise<{ data: any; response: Response; }>>;
        private _keys: string[];
        private _removeKey = (key: string) => {
            const index = this._keys.indexOf(key);
            if (index > -1) {
                this._keys.splice(index, 1);
            }
        }
        hasKey = (key: string): boolean => {
            return this._cache.hasOwnProperty(key);
        }
        get = (key: string): Promise<{ data: any; response: Response; }> => {
            if(!this.hasKey(key)) return null;
            const value = hison.utils.deepCopyObject(this._cache[key]);
            this._removeKey(key);
            this._keys.push(key);
            return value;
        };
        put = (key: string , value: Promise<{ data: any; response: Response; }>) => {
            if (this.hasKey(key)) {
                this.remove(key);
            } else if (this._keys.length == this._limit) {
                const oldestKey = this._keys.shift();
                delete this._cache[oldestKey];
            }
            this._cache[key] = hison.utils.deepCopyObject(value);
            this._keys.push(key);
        };
        remove = (key: string): Promise<{ data: any; response: Response; }> => {
            if(!this.hasKey(key)) return null;
            this._removeKey(key);
            const result = hison.utils.deepCopyObject(this._cache[key])
            delete this._cache[key];
            return result;
        };
        getAll = (): Record<string, Promise<{ data: any; response: Response; }>> => {
            const result = {}
            Object.keys(this._cache).forEach((key) => {
                result[key] = hison.utils.deepCopyObject(this._cache[key]);
            });
            return result;
        };
        getKeys = (): string[] => {
            const result =[];
            this._keys.forEach((key) => {
                result.push(key);
            })
            return result;
        };
        clear = () => {
            this._cache = {};
            this._keys = [];
        };
    };
    class EventEmitter {
        private events: { [eventName: string]: Array<(...args: any[]) => void> } = {};
    
        on = (eventName: string, listener: (...args: any[]) => void): void => {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            this.events[eventName].push(listener);
        };
    
        emit = (eventName: string, ...args: any[]): void => {
            if (this.events[eventName]) {
                this.events[eventName].forEach(listener => listener(...args));
            }
        };
    };
    class ApiLink {
        constructor(eventEmitter: EventEmitter, cachingModule?: CachingModule) {
            this._eventEmitter = eventEmitter;
            if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) {
                this._cachingModule = cachingModule;
            }
        };
        private _eventEmitter: EventEmitter;
        private _cachingModule: CachingModule;
        private _getRsultDataWrapper = (resultData: any): any => {
            let data = null;
            if(resultData && resultData.constructor === Object && resultData.isDataWrapper === 'true') {
                data = new hison.data.DataWrapper();
                for(const key of Object.keys(resultData)) {
                    if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                        data.putDataModel(key, new hison.data.DataModel(resultData[key]));
                    } else {
                        if(key !== 'isDataWrapper') data.put(key, resultData[key]);
                    }
                }
            } else {
                data = resultData;
            }
            return data;
        };
        private _getCachingResult = async (resourcePath: string): Promise<{ data: any; response: Response; }> => {
            if(this._cachingModule.isWebSocketConnection() === 1 && this._cachingModule.get(resourcePath)) {
                const result = await this._cachingModule.get(resourcePath);
                if(result && defaultOption.link.interceptApiResult(result.data, result.response) !== false) {
                    return result;
                };
                return null;
            }
        };
        private _getFetch = (methodName: string, requestPath: string, options: Record<string, any>, serviceCmd: string, requestData: any): Promise<any>[] => {
            if(requestData && requestData.getIsDataWrapper && requestData.getIsDataWrapper()) {
                if (serviceCmd) requestData.putString('cmd', serviceCmd);
                requestData = requestData.getSerialized();
            } else if (requestData && typeof requestData === 'object'){
                if (serviceCmd && requestData.constructor === Object) requestData.cmd = serviceCmd;
                requestData = JSON.parse(requestData);
            }
            const fetchOptions = {
                method: methodName,
                headers: {'Content-Type': 'application/json'},
                body: requestData
            }
            if (options.constructor !== Object) {
                throw new Error('fetchOptions must be an object which contains key and value.');
            }
            let timeoutPromise = null;
            Object.keys(options).forEach(key => {
                if(key !== 'timeout') fetchOptions[key] = options[key];
            });
            if(options.timeout) {
                if (typeof options.timeout !== 'number' || options.timeout <= 0 || !Number.isInteger(options.timeout)) {
                    throw new Error('Timeout must be a positive integer.');
                }
                timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), options.timeout));
            }
            const fecthArr = [fetch(requestPath, fetchOptions)];
            if(timeoutPromise) fecthArr.push(timeoutPromise);
            return fecthArr;
        };
        private _request = async (fecthInfo: any[], cachingKey: string) => {
            const result = await Promise.race(fecthInfo)
            .then((response: Response) => {
                this._eventEmitter.emit('requestCompleted_Response', response);
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(data => ({ data: data, response: response }));
                } else if (contentType) {
                    return response.text().then(text => ({ data: text ? text : null, response: response }));
                } else {
                    return { data: null, response: response };
                }
            })
            .then(rtn => {
                const resultData = rtn.data;
                const data = this._getRsultDataWrapper(resultData);
                this._eventEmitter.emit('requestCompleted_Data', { data: data, response: rtn.response });
                if(this._cachingModule && this._cachingModule.isWebSocketConnection() === 1) this._cachingModule.put(cachingKey, Promise.resolve({ data: data, response: rtn.response }));
                if(defaultOption.link.interceptApiResult(data, rtn.response) === false) return null;
                return { data: data, response: rtn.response };
            })
            .catch(error => {
                this._eventEmitter.emit('requestError', error);
                if(defaultOption.link.interceptApiError(error) === false) return null;
                return error;
            });
        
            return result;
        };
        get = (resourcePath: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
            if(defaultOption.link.beforeGetRequst(resourcePath, options) === false) return null;
            const METHOD_NAME = 'GET';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, resourcePath, options);
            if(this._cachingModule && this._cachingModule.hasKey(resourcePath)) return this._getCachingResult(resourcePath);
            return this._request(this._getFetch(METHOD_NAME, defaultOption.link.protocol + defaultOption.link.domain + resourcePath, options, null, null), resourcePath);
        };
        post = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
            if(defaultOption.link.beforePostRequst(requestData, options) === false) return null;
            const METHOD_NAME = 'POST';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, defaultOption.link.protocol + defaultOption.link.domain + defaultOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        put = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
            if(defaultOption.link.beforePutRequst(requestData, options) === false) return null;
            const METHOD_NAME = 'PUT';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, defaultOption.link.protocol + defaultOption.link.domain + defaultOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        patch = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
            if(defaultOption.link.beforePatchRequst(requestData, options) === false) return null;
            const METHOD_NAME = 'PATCH';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, defaultOption.link.protocol + defaultOption.link.domain + defaultOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        delete = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
            if(defaultOption.link.beforeDeleteRequst(requestData, options) === false) return null;
            const METHOD_NAME = 'DELETE';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, defaultOption.link.protocol + defaultOption.link.domain + defaultOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        head = async (resourcePath: string, options: Record<string, any> = {}): Promise<Record<string, string>> => {
            const url = defaultOption.link.protocol + defaultOption.link.domain + resourcePath;
            return fetch(url, { method: 'HEAD', ...options })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HEAD request failed with status: ${response.status}`);
                    }
                    const headers = {};
                    response.headers.forEach((value, key) => {
                        headers[key] = value;
                    });
                    return headers;
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        };
        options = async (resourcePath: string, options: Record<string, any> = {}): Promise<string[]> => {
            const url = defaultOption.link.protocol + defaultOption.link.domain + resourcePath;
            return fetch(url, { method: 'OPTIONS', ...options })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`OPTIONS request failed with status: ${response.status}`);
                    }
                    const allowHeader = response.headers.get('Allow');
                    if (allowHeader) {
                        return allowHeader.split(',').map(method => method.trim());
                    }
                    return []
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        };
        getURL = (url: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
            const METHOD_NAME = 'GET';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, url, options);
            if(this._cachingModule && this._cachingModule.hasKey(url)) return this._getCachingResult(url);
            return this._request(this._getFetch(METHOD_NAME, url, options, null, null), url);
        };
        postURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
            const METHOD_NAME = 'POST';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        putURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
            const METHOD_NAME = 'PUT';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        patchURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
            const METHOD_NAME = 'PATCH';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        deleteURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; }> => {
            const METHOD_NAME = 'DELETE';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        headURL = async (url: string, options: Record<string, any> = {}): Promise<Record<string, string>> => {
            return fetch(url, { method: 'HEAD', ...options })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HEAD request failed with status: ${response.status}`);
                    }
                    const headers = {};
                    response.headers.forEach((value, key) => {
                        headers[key] = value;
                    });
                    return headers;
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        };
        optionsURL = async (url: string, options: Record<string, any> = {}): Promise<string[]> => {
            return fetch(url, { method: 'OPTIONS', ...options })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`OPTIONS request failed with status: ${response.status}`);
                    }
                    const allowHeader = response.headers.get('Allow');
                    if (allowHeader) {
                        return allowHeader.split(',').map(method => method.trim());
                    }
                    return []
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        };
        onEventEmit = (methodName: string, eventName: string, eventFunc: (...args: any[]) => void) => {
            if (!eventName) {
                throw new Error('Event name is required.');
            }
            if (!eventFunc) {
                throw new Error('Event function is required.');
            }
            if (typeof eventName !== 'string') {
                throw new Error('Event name must be a string.');
            }
            const requestEventName = 'requestStarted_' + methodName;
            if ([requestEventName,
                 'requestCompleted_Response',
                 'requestCompleted_Data',
                 'requestError'].indexOf(eventName) === -1) {
                throw new Error('Invalid event name.'
                + '\nInserted event name: ' + eventName
                + '\nValid event names are:'
                + `\n${requestEventName}`
                + '\nrequestCompleted_Response'
                + '\nrequestCompleted_Data'
                + '\nrequestError'
                );
            }
            if (typeof eventFunc !== 'function') {
                throw new Error('Event function must be a function.');
            }
            this._eventEmitter.on(eventName, eventFunc);
        };
    };
    class Hison implements Hison{
        utils = {
            //for boolean
            isAlpha(str: string): boolean {
                return /^[A-Za-z]+$/.test(str);
            },
            isAlphaNumber(str: string): boolean {
                return /^[A-Za-z0-9]+$/.test(str);
            },
            isNumber(str: string): boolean {
                return /^[0-9]+$/.test(str);
            },
            isNumberSymbols(str: string): boolean {
                return /^[0-9!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?~]+$/.test(str);
            },
            isIncludeSymbols(str: string): boolean {
                return /[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?~]/.test(str);
            },
            isLowerAlpha(str: string): boolean {
                return /^[a-z]+$/.test(str);
            },
            isLowerAlphaAndNumber(str: string): boolean {
                return /^[a-z0-9]+$/.test(str);
            },
            isUpperAlpha(str: string): boolean {
                return /^[A-Z]+$/.test(str);
            },
            isUpperAlphaNumber(str: string): boolean {
                return /^[A-Z0-9]+$/.test(str);
            },
            isNumeric(num: any): boolean {
                return !isNaN(num) && isFinite(num);
            },
            isInteger(num: any): boolean {
                if (!hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num);
            },
            isPositiveInteger(num: any): boolean {
                if (!hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num) && num > 0;
            },
            isNegativeInteger(num: any): boolean {
                if (!hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num) && num < 0;
            },
            isArray(arr: any): boolean {
                return Array.isArray(arr) && arr.constructor === Array;
            },
            isObject(obj: any): boolean {
                return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object;
            },
            isDate(date: DateObject | string): boolean {
                const dateObj: DateObject = hison.utils.isObject(date) ? date as DateObject : hison.utils.getDateObject(date as string);
        
                let yyyy: string = hison.utils.getToString(dateObj.y);
                let MM: string = hison.utils.getToString(dateObj.M);
                let dd: string = hison.utils.getToString(dateObj.d);
        
                let result = true;
                try {
                    if (!hison.utils.isInteger(yyyy) || !hison.utils.isInteger(MM) || !hison.utils.isInteger(dd)) {
                        return false;
                    }
        
                    if (!yyyy) {
                        return false;
                    }
                    if (!MM) {
                        MM = '01';
                    } else if (MM.length === 1) {
                        MM = '0' + MM;
                    }
                    if (!dd) {
                        dd = '01';
                    } else if (dd.length === 1) {
                        dd = '0' + dd;
                    }
        
                    if (hison.utils.getToNumber(yyyy+MM+dd) < 16000101) {
                        const date = new Date(hison.utils.getToNumber(yyyy), hison.utils.getToNumber(MM) - 1, hison.utils.getToNumber(dd));
                        if (date.getFullYear() !== hison.utils.getToNumber(yyyy) || date.getMonth() !== hison.utils.getToNumber(MM) - 1 || date.getDate() !== hison.utils.getToNumber(dd)) {
                            return false;
                        }
                        return true;
                    }
                    else {
                        const dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
                        result = dateRegex.test(dd+'-'+MM+'-'+yyyy);
                    }
                    
                } catch (err) {
                    result = false;
                }    
                return result;
            },
            isTime(time: TimeObject | string): boolean {
                const timeObj: TimeObject = hison.utils.isObject(time) ? time as TimeObject : hison.utils.getTimeObject(time as string);
        
                let hh: number = timeObj.h;
                let mm: number = timeObj.m;
                let ss: number = timeObj.s;
        
                if (!hison.utils.isInteger(hh) || !hison.utils.isInteger(mm) || !hison.utils.isInteger(ss)) {
                    return false;
                }
                /*
                hh = parseInt(hh, 10);
                mm = parseInt(mm, 10);
                ss = parseInt(ss, 10);
                */
        
                function isValidTimePart(time: number, max: number): boolean {
                    return !isNaN(time) && time >= 0 && time <= max;
                }
            
                return isValidTimePart(hh, 23) && isValidTimePart(mm, 59) && isValidTimePart(ss, 59);
            },
            isDatetime(datetime: DateTimeObject | string): boolean {
                const datetimeObj: DateTimeObject = hison.utils.isObject(datetime) ? datetime as DateTimeObject : hison.utils.getDatetimeObject(datetime as string);
                if (!hison.utils.isDate(datetimeObj)) return false;
                if (!hison.utils.isTime(datetimeObj)) return false;
                return true;
            },
            isEmail(str: string): boolean {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
                return emailPattern.test(str);
            },
            isURL(urlStr: string): boolean {
                const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                return urlPattern.test(urlStr);
            },
            isValidMask(str: string, mask: string): boolean {
                if (str.length !== mask.length) {
                    return false;
                }
            
                for (let i = 0; i < str.length; i++) {
                    const char = str.charAt(i);
                    const maskChar = mask.charAt(i);
            
                    switch (maskChar) {
                        case 'A':
                            if (char < 'A' || char > 'Z') return false;
                            break;
                        case 'a':
                            if (char < 'a' || char > 'z') return false;
                            break;
                        case '9':
                            if (isNaN(parseInt(char))) return false;
                            break;
                        default:
                            if (char !== maskChar) return false;
                    }
                }
                return true;
            },

            //for Date
            getDateObject(date: Date | string): DateObject {
                const result = {y: null, M: null, d: null};
                if (typeof date === 'string') {
                    let year: number = null, month: number = null, day: number = null;
                    date = hison.utils.getToString(date);
                    date = date.split(' ')[0];
                    if (date.includes('-')) {
                        [year, month, day] = date.split('-').map(num => parseInt(num, 10));
                    } else if (date.includes('/')) {
                        [year, month, day] = date.split('/').map(num => parseInt(num, 10));
                    } else if (date.length === 8) {
                        year = parseInt(date.substring(0, 4), 10);
                        month = parseInt(date.substring(4, 6), 10);
                        day = parseInt(date.substring(6, 8), 10);
                    } else {
                        return result;
                    }
                    result.y = year;
                    result.M = month;
                    result.d = day;
                } else if (date instanceof Date) {
                    result.y = date.getFullYear();
                    result.M = date.getMonth() + 1;
                    result.d = date.getDate();
                }
                return result
            },
            getTimeObject(time: Date | string): TimeObject {
                const result = {h: null, m: null, s: null};
                if (typeof time === 'string') {
                    let hours: number = null, minutes: number = null, seconds: number = null;
                    time = hison.utils.getToString(time);
                    const dateArr = time.split(' ');
                    time = dateArr.length > 1 ? dateArr[1] : time;
            
                    if (time.includes(':')) {
                        [hours, minutes, seconds] = time.split(':').map(num => parseInt(num, 10));
                    } else if (time.length === 6) {
                        hours = parseInt(time.substring(0, 2), 10);
                        minutes = parseInt(time.substring(2, 4), 10);
                        seconds = parseInt(time.substring(4, 6), 10);
                    } else {
                        return { h: null, m: null, s: null };
                    }
                    result.h = hours;
                    result.m = minutes;
                    result.s = seconds;
                } else if (time instanceof Date) {
                    result.h = time.getHours();
                    result.m = time.getMinutes();
                    result.s = time.getSeconds();
                }
                return result;
            },
            getDatetimeObject(datetime: Date | string): DateTimeObject {
                if (typeof datetime === 'string') {
                    datetime = hison.utils.getToString(datetime);
                    const datetimeArr = datetime.split(' ');
                    const dateObj = datetimeArr[0];
                    const timeObj = datetimeArr.length > 1 ? datetimeArr[1] as string : '';
                    return Object.assign({}, hison.utils.getDateObject(dateObj), hison.utils.getTimeObject(timeObj));
                }
                if (datetime instanceof Date) {
                    return {
                        y : datetime.getFullYear(),
                        M : datetime.getMonth() + 1,
                        d : datetime.getDate(),
                        h : datetime.getHours(),
                        m : datetime.getMinutes(),
                        s : datetime.getSeconds(),
                    }
                }
                return null;
            },
            addDate(datetime: DateTimeObject | DateObject | string, addValue: string | number = 0, addType: string = '', format: string = ''): DateTimeObject | string {
                const datetimeObj: DateTimeObject = hison.utils.isObject(datetime) ? hison.utils.deepCopyObject(datetime) : hison.utils.getDatetimeObject(datetime as string);
                if (!format) {
                    if (datetimeObj.h === undefined || datetimeObj.h === null) {
                        format = defaultOption.utils.dateFormat
                    }
                    else {
                        format = defaultOption.utils.datetimeFormat;
                    }
                }
                
                if (!hison.utils.isInteger(addValue)) throw new Error(`ER0001 Please enter a valid value.\n=>${JSON.stringify(addValue)}`);
                addValue = hison.utils.getToNumber(addValue);

                datetimeObj.M = datetimeObj.M === null || datetimeObj.M === undefined ? 1 : datetimeObj.M;
                datetimeObj.d = datetimeObj.d === null || datetimeObj.d === undefined ? 1 : datetimeObj.d;
                datetimeObj.h = datetimeObj.h === null || datetimeObj.h === undefined ? 0 : datetimeObj.h;
                datetimeObj.m = datetimeObj.m === null || datetimeObj.m === undefined ? 0 : datetimeObj.m;
                datetimeObj.s = datetimeObj.s === null || datetimeObj.s === undefined ? 0 : datetimeObj.s;
        
                if (!hison.utils.isDate(datetimeObj)) throw new Error(`ER0002 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
                if (!hison.utils.isTime(datetimeObj)) throw new Error(`ER0003 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
            
                const d = new Date(datetimeObj.y, datetimeObj.M - 1, datetimeObj.d, datetimeObj.h, datetimeObj.m, datetimeObj.s);
            
                switch (addType) {
                    case 'y':
                        d.setFullYear(d.getFullYear() + addValue);
                        break;
                    case 'M':
                        d.setMonth(d.getMonth() + addValue);
                        break;
                    case 'd':
                        d.setDate(d.getDate() + addValue);
                        break;
                    case 'h':
                        d.setHours(d.getHours() + addValue);
                        break;
                    case 'm':
                        d.setMinutes(d.getMinutes() + addValue);
                        break;
                    case 's':
                        d.setSeconds(d.getSeconds() + addValue);
                        break;
                    default:
                        d.setDate(d.getDate() + addValue);
                }
        
                const rtnObj = {
                    y: d.getFullYear(),
                    M: (d.getMonth() + 1),
                    d: d.getDate(),
                    h: d.getHours(),
                    m: d.getMinutes(),
                    s: d.getSeconds()
                }
        
                return hison.utils.isObject(datetime) ? rtnObj : hison.utils.getDateWithFormat(rtnObj, format);
            },
            getDateDiff(datetime1: DateTimeObject | DateObject | string, datetime2: DateTimeObject | DateObject | string, diffType: string = ''): number {
                const datetimeObj1: DateTimeObject = hison.utils.isObject(datetime1) ? hison.utils.deepCopyObject(datetime1) : hison.utils.getDatetimeObject(datetime1 as string);
                const datetimeObj2: DateTimeObject = hison.utils.isObject(datetime2) ? hison.utils.deepCopyObject(datetime2) : hison.utils.getDatetimeObject(datetime2 as string);
                            
                datetimeObj1.M = datetimeObj1.M || 1; datetimeObj2.M = datetimeObj2.M || 1;
                datetimeObj1.d = datetimeObj1.d || 1; datetimeObj2.d = datetimeObj2.d || 1;
                datetimeObj1.h = datetimeObj1.h || 0; datetimeObj2.h = datetimeObj2.h || 0;
                datetimeObj1.m = datetimeObj1.m || 0; datetimeObj2.m = datetimeObj2.m || 0;
                datetimeObj1.s = datetimeObj1.s || 0; datetimeObj2.s = datetimeObj2.s || 0;
        
                if (!hison.utils.isDate(datetimeObj1)) throw new Error(`ER0004 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
                if (!hison.utils.isTime(datetimeObj1)) throw new Error(`ER0005 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
                if (!hison.utils.isDate(datetimeObj2)) throw new Error(`ER0006 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
                if (!hison.utils.isTime(datetimeObj2)) throw new Error(`ER0007 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
            
                const d1 = new Date(datetimeObj1.y, datetimeObj1.M - 1, datetimeObj1.d, datetimeObj1.h, datetimeObj1.m, datetimeObj1.s);
                const d2 = new Date(datetimeObj2.y, datetimeObj2.M - 1, datetimeObj2.d, datetimeObj2.h, datetimeObj2.m, datetimeObj2.s);
            
                switch (diffType) {
                    case 'y':
                        return d2.getFullYear() - d1.getFullYear();
                    case 'M':
                        return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
                    case 'd':
                        return Math.floor((d2.getTime() - d1.getTime()) / (24 * 60 * 60 * 1000));
                    case 'h':
                        return Math.floor((d2.getTime() - d1.getTime()) / (60 * 60 * 1000));
                    case 'm':
                        return Math.floor((d2.getTime() - d1.getTime()) / (60 * 1000));
                    case 's':
                        return Math.floor((d2.getTime() - d1.getTime()) / 1000);
                    default:
                        return Math.floor((d2.getTime() - d1.getTime()) / (24 * 60 * 60 * 1000));
                }
            },
            getMonthName(month: number | string, isFullName: boolean = true): string {
                if (typeof month === 'string') month = parseInt(month, 10);
        
                if (month < 1 || month > 12) {
                    throw new Error(`ER0008 Month must be between 1 and 12`);
                }

                if (isFullName) {
                    return MonthFullName[month];
                } else {
                    return MonthShortName[month];
                }
            },
            getDateWithFormat(datetime: DateTimeObject | DateObject | string, format: string = ''): string {
                const datetimeObj = hison.utils.isObject(datetime) ? hison.utils.deepCopyObject(datetime) : hison.utils.getDatetimeObject(datetime as string);
                if (!format) {
                    if (datetimeObj.h === undefined || datetimeObj.h === null) {
                        format = defaultOption.utils.dateFormat
                    }
                    else {
                        format = defaultOption.utils.datetimeFormat;
                    }
                }

                const y = datetimeObj.y.toString();
                const M = (datetimeObj.M || 1).toString().padStart(2, '0');
                const d = (datetimeObj.d || 1).toString().padStart(2, '0');
                const h = (datetimeObj.h || 0).toString().padStart(2, '0');
                const m = (datetimeObj.m || 0).toString().padStart(2, '0');
                const s = (datetimeObj.s || 0).toString().padStart(2, '0');

                if (!hison.utils.isDate(y + M + d)) throw new Error(`ER0009 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
                if (!hison.utils.isTime(h + m + s)) throw new Error(`ER0010 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);

                const MMMM = hison.utils.getMonthName(datetimeObj.M);
                const MMM = hison.utils.getMonthName(datetimeObj.M, false);

                switch (format) {
                    case 'yyyy':
                        return y;
                        
                    case 'yyyyMM':
                        return y + M;
                    case 'yyyy-MM':
                        return y + '-' + M;
                    case 'yyyy/MM':
                        return y + '/' + M;
                    case 'yyyy. MM':
                        return y + '. ' + M;
                    case 'yyyy MM':
                        return y + ' ' + M;
            
                    case 'yyyyMMdd':
                        return y + M + d;
                    case 'yyyy-MM-dd':
                        return y + '-' + M + '-' + d;
                    case 'yyyy/MM/dd':
                        return y + '/' + M + '/' + d;
                    case 'yyyy. MM. dd':
                        return y + '. ' + M + '. ' + d;
                    case 'yyyy MM dd':
                        return y + ' ' + M + ' ' + d;
            
                    case 'yyyyMMdd hh':
                        return y + M + d + ' ' + h;
                    case 'yyyyMMdd hhmm':
                        return y + M + d + ' ' + h + m;
                    case 'yyyyMMdd hhmmss':
                        return y + M + d + ' ' + h + m + s;
                    case 'yyyyMMdd hh:mm':
                        return y + M + d + ' ' + h + ':' + m;
                    case 'yyyyMMdd hh:mm:ss':
                        return y + M + d + ' ' + h + ':' + m + ':' + s;
                    case 'yyyy-MM-dd hh':
                        return y + '-' + M + '-' + d + ' ' + h;
                    case 'yyyy-MM-dd hhmm':
                        return y + '-' + M + '-' + d + ' ' + h + m;
                    case 'yyyy-MM-dd hhmmss':
                        return y + '-' + M + '-' + d + ' ' + h + m + s;
                    case 'yyyy-MM-dd hh:mm':
                        return y + '-' + M + '-' + d + ' ' + h + ':' + m;
                    case 'yyyy-MM-dd hh:mm:ss':
                        return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
                    case 'yyyy/MM/dd hh':
                        return y + '/' + M + '/' + d + ' ' + h;
                    case 'yyyy/MM/dd hhmm':
                        return y + '/' + M + '/' + d + ' ' + h + m;
                    case 'yyyy/MM/dd hhmmss':
                        return y + '/' + M + '/' + d + ' ' + h + m + s;
                    case 'yyyy/MM/dd hh:mm':
                        return y + '/' + M + '/' + d + ' ' + h + ':' + m;
                    case 'yyyy/MM/dd hh:mm:ss':
                        return y + '/' + M + '/' + d + ' ' + h + ':' + m + ':' + s;
                    case 'yyyy. MM. dd hh':
                        return y + '. ' + M + '. ' + d + ' ' + h;
                    case 'yyyy. MM. dd hhmm':
                        return y + '. ' + M + '. ' + d + ' ' + h + m;
                    case 'yyyy. MM. dd hhmmss':
                        return y + '. ' + M + '. ' + d + ' ' + h + m + s;
                    case 'yyyy. MM. dd hh:mm':
                        return y + '. ' + M + '. ' + d + ' ' + h + ':' + m;
                    case 'yyyy. MM. dd hh:mm:ss':
                        return y + '. ' + M + '. ' + d + ' ' + h + ':' + m + ':' + s;
                    case 'yyyy MM dd hh':
                        return y + ' ' + M + ' ' + d + ' ' + h;
                    case 'yyyy MM dd hhmm':
                        return y + ' ' + M + ' ' + d + ' ' + h + m;
                    case 'yyyy MM dd hhmmss':
                        return y + ' ' + M + ' ' + d + ' ' + h + m + s;
                    case 'yyyy MM dd hh:mm':
                        return y + ' ' + M + ' ' + d + ' ' + h + ':' + m;
                    case 'yyyy MM dd hh:mm:ss':
                        return y + ' ' + M + ' ' + d + ' ' + h + ':' + m + ':' + s;
            
                    case 'MMyyyy':
                        return M + y;
                    case 'MM-yyyy':
                        return M + '-' + y;
                    case 'MM/yyyy':
                        return M + '/' + y;
                    case 'MM. yyyy':
                        return M + '/' + y;
                    case 'MM yyyy':
                        return M + '/' + y;
                    case 'MMMM yyyy':
                        return MMMM + ' ' + y;
                    case 'MMMM, yyyy':
                        return MMMM + ', ' + y;
                    case 'MMM yyyy':
                        return MMM + ' ' + y;
                    case 'MMM, yyyy':
                        return MMM + ', ' + y;
            
                    case 'MMddyyyy':
                        return M + d + y;
                    case 'MM-dd-yyyy':
                        return M + '-' + d + '-' + y;
                    case 'MM/dd/yyyy':
                        return M + '/' + d + '/' + y;
                    case 'MM. dd. yyyy':
                        return M + '. ' + d + '. ' + y;
                    case 'MMMM dd yyyy':
                        return MMMM + ' ' + d + ' ' + y;
                    case 'MMMM dd, yyyy':
                        return MMMM + ' ' + d + ', ' + y;
                    case 'MMM dd yyyy':
                        return MMM + ' ' + d + ' ' + y;
                    case 'MMM dd, yyyy':
                        return MMM + ' ' + d + ', ' + y;
            
                    case 'MMddyyyy hh':
                        return M + d + y + ' ' + h;
                    case 'MMddyyyy hhmm':
                        return M + d + y + ' ' + h + m;
                    case 'MMddyyyy hhmmss':
                        return M + d + y + ' ' + h + m + s;
                    case 'MMddyyyy hh:mm':
                        return M + d + y + ' ' + h + ':' + m;
                    case 'MMddyyyy hh:mm:ss':
                        return M + d + y + ' ' + h + ':' + m + ':' + s;
                    case 'MM-dd-yyyy hh':
                        return M + '-' + d + '-' + y + ' ' + h;
                    case 'MM-dd-yyyy hhmm':
                        return M + '-' + d + '-' + y + ' ' + h + m;
                    case 'MM-dd-yyyy hhmmss':
                        return M + '-' + d + '-' + y + ' ' + h + m + s;
                    case 'MM-dd-yyyy hh:mm':
                        return M + '-' + d + '-' + y + ' ' + h + ':' + m;
                    case 'MM-dd-yyyy hh:mm:ss':
                        return M + '-' + d + '-' + y + ' ' + h + ':' + m + ':' + s;
                    case 'MM/dd/yyyy hh':
                        return M + '/' + d + '/' + y + ' ' + h;
                    case 'MM/dd/yyyy hhmm':
                        return M + '/' + d + '/' + y + ' ' + h + m;
                    case 'MM/dd/yyyy hhmmss':
                        return M + '/' + d + '/' + y + ' ' + h + m + s;
                    case 'MM/dd/yyyy hh:mm':
                        return M + '/' + d + '/' + y + ' ' + h + ':' + m;
                    case 'MM/dd/yyyy hh:mm:ss':
                        return M + '/' + d + '/' + y + ' ' + h + ':' + m + ':' + s;
                    case 'MM. dd. yyyy hh':
                        return M + '. ' + d + '. ' + y + ' ' + h;
                    case 'MM. dd. yyyy hhmm':
                        return M + '. ' + d + '. ' + y + ' ' + h + m;
                    case 'MM. dd. yyyy hhmmss':
                        return M + '. ' + d + '. ' + y + ' ' + h + m + s;
                    case 'MM. dd. yyyy hh:mm':
                        return M + '. ' + d + '. ' + y + ' ' + h + ':' + m;
                    case 'MM. dd. yyyy hh:mm:ss':
                        return M + '. ' + d + '. ' + y + ' ' + h + ':' + m + ':' + s;
                    case 'MMMM dd yyyy hh':
                        return MMMM + ' ' + d + ' ' + y + ' ' + h;
                    case 'MMMM dd yyyy hhmm':
                        return MMMM + ' ' + d + ' ' + y + ' ' + h + m;
                    case 'MMMM dd yyyy hhmmss':
                        return MMMM + ' ' + d + ' ' + y + ' ' + h + m + s;
                    case 'MMMM dd yyyy hh:mm':
                        return MMMM + ' ' + d + ' ' + y + ' ' + h + ':' + m;
                    case 'MMMM dd yyyy hh:mm:ss':
                        return MMMM + ' ' + d + ' ' + y + ' ' + h + ':' + m + ':' + s;
                    case 'MMMM dd, yyyy hh':
                        return MMMM + ' ' + d + ', ' + y + ' ' + h;
                    case 'MMMM dd, yyyy hhmm':
                        return MMMM + ' ' + d + ', ' + y + ' ' + h + m;
                    case 'MMMM dd, yyyy hhmmss':
                        return MMMM + ' ' + d + ', ' + y + ' ' + h + m + s;
                    case 'MMMM dd, yyyy hh:mm':
                        return MMMM + ' ' + d + ', ' + y + ' ' + h + ':' + m;
                    case 'MMMM dd, yyyy hh:mm:ss':
                        return MMMM + ' ' + d + ', ' + y + ' ' + h + ':' + m + ':' + s;
                    case 'MMM dd yyyy hh':
                        return MMM + ' ' + d + ' ' + y + ' ' + h;
                    case 'MMM dd yyyy hhmm':
                        return MMM + ' ' + d + ' ' + y + ' ' + h + m;
                    case 'MMM dd yyyy hhmmss':
                        return MMM + ' ' + d + ' ' + y + ' ' + h + m + s;
                    case 'MMM dd yyyy hh:mm':
                        return MMM + ' ' + d + ' ' + y + ' ' + h + ':' + m;
                    case 'MMM dd yyyy hh:mm:ss':
                        return MMM + ' ' + d + ' ' + y + ' ' + h + ':' + m + ':' + s;
                    case 'MMM dd, yyyy hh':
                        return MMM + ' ' + d + ', ' + y + ' ' + h;
                    case 'MMM dd, yyyy hhmm':
                        return MMM + ' ' + d + ', ' + y + ' ' + h + m;
                    case 'MMM dd, yyyy hhmmss':
                        return MMM + ' ' + d + ', ' + y + ' ' + h + m + s;
                    case 'MMM dd, yyyy hh:mm':
                        return MMM + ' ' + d + ', ' + y + ' ' + h + ':' + m;
                    case 'MMM dd, yyyy hh:mm:ss':
                        return MMM + ' ' + d + ', ' + y + ' ' + h + ':' + m + ':' + s;
            
                    case 'ddMMyyyy':
                        return d + M + y;
                    case 'dd-MM-yyyy':
                        return d + '-' + M + '-' + y;
                    case 'dd/MM/yyyy':
                        return d + '/' + M + '/' + y;
                    case 'dd. MM. yyyy':
                        return d + '. ' + M + '. ' + y;
                    case 'dd MMMM yyyy':
                        return d + ' ' + MMMM + ' ' + y;
                    case 'dd MMM yyyy':
                        return d + ' ' + MMM + ' ' + y;
            
                    case 'ddMMyyyy hh':
                        return d + M + y + ' ' + h;
                    case 'ddMMyyyy hhmm':
                        return d + M + y + ' ' + h + m;
                    case 'ddMMyyyy hhmmss':
                        return d + M + y + ' ' + h + m + s;
                    case 'ddMMyyyy hh:mm':
                        return d + M + y + ' ' + h + ':' + m;
                    case 'ddMMyyyy hh:mm:ss':
                        return d + M + y + ' ' + h + ':' + m + ':' + s;
                    case 'dd-MM-yyyy hh':
                        return d + '-' + M + '-' + y + ' ' + h;
                    case 'dd-MM-yyyy hhmm':
                        return d + '-' + M + '-' + y + ' ' + h + m;
                    case 'dd-MM-yyyy hhmmss':
                        return d + '-' + M + '-' + y + ' ' + h + m + s;
                    case 'dd-MM-yyyy hh:mm':
                        return d + '-' + M + '-' + y + ' ' + h + ':' + m;
                    case 'dd-MM-yyyy hh:mm:ss':
                        return d + '-' + M + '-' + y + ' ' + h + ':' + m + ':' + s;
                    case 'dd/MM/yyyy hh':
                        return d + '/' + M + '/' + y + ' ' + h;
                    case 'dd/MM/yyyy hhmm':
                        return d + '/' + M + '/' + y + ' ' + h + m;
                    case 'dd/MM/yyyy hhmmss':
                        return d + '/' + M + '/' + y + ' ' + h + m + s;
                    case 'dd/MM/yyyy hh:mm':
                        return d + '/' + M + '/' + y + ' ' + h + ':' + m;
                    case 'dd/MM/yyyy hh:mm:ss':
                        return d + '/' + M + '/' + y + ' ' + h + ':' + m + ':' + s;
                    case 'dd. MM. yyyy hh':
                        return d + '. ' + M + '. ' + y + ' ' + h;
                    case 'dd. MM. yyyy hhmm':
                        return d + '. ' + M + '. ' + y + ' ' + h + m;
                    case 'dd. MM. yyyy hhmmss':
                        return d + '. ' + M + '. ' + y + ' ' + h + m + s;
                    case 'dd. MM. yyyy hh:mm':
                        return d + '. ' + M + '. ' + y + ' ' + h + ':' + m;
                    case 'dd. MM. yyyy hh:mm:ss':
                        return d + '. ' + M + '. ' + y + ' ' + h + ':' + m + ':' + s;
                    case 'dd MMMM yyyy hh':
                        return d + ' ' + MMMM + ' ' + y + ' ' + h;
                    case 'dd MMMM yyyy hhmm':
                        return d + ' ' + MMMM + ' ' + y + ' ' + h + m;
                    case 'dd MMMM yyyy hhmmss':
                        return d + ' ' + MMMM + ' ' + y + ' ' + h + m + s;
                    case 'dd MMMM yyyy hh:mm':
                        return d + ' ' + MMMM + ' ' + y + ' ' + h + ':' + m;
                    case 'dd MMMM yyyy hh:mm:ss':
                        return d + ' ' + MMMM + ' ' + y + ' ' + h + ':' + m + ':' + s;
                    case 'dd MMM yyyy hh':
                        return d + ' ' + MMM + ' ' + y + ' ' + h;
                    case 'dd MMM yyyy hhmm':
                        return d + ' ' + MMM + ' ' + y + ' ' + h + m;
                    case 'dd MMM yyyy hhmmss':
                        return d + ' ' + MMM + ' ' + y + ' ' + h + m + s;
                    case 'dd MMM yyyy hh:mm':
                        return d + ' ' + MMM + ' ' + y + ' ' + h + ':' + m;
                    case 'dd MMM yyyy hh:mm:ss':
                        return d + ' ' + MMM + ' ' + y + ' ' + h + ':' + m + ':' + s;
            
                    default:
                        throw new Error(`ER0010 Invalid format.\n=>${JSON.stringify(format)}`);
                }
            },
            getDayOfWeek(date: DateObject | string, dayType: string = defaultOption.utils.dayOfWeekFormat): string {
                const dateObj: DateObject = hison.utils.isObject(date) ? date as DateObject : hison.utils.getDateObject(date as string);
                if (!hison.utils.isDate(dateObj)) throw new Error(`ER0011 Invalid format.\n=>${JSON.stringify(date)}`);
                
                const d = new Date(dateObj.y, dateObj.M - 1, dateObj.d);
                const dayOfWeek = d.getDay();
                switch (dayType.toLowerCase()) {
                    case 'd':
                        return dayOfWeek.toString();    //0 ~ 6
                    case 'dy':
                        return DayOfWeekShortName[dayOfWeek];
                    case 'day':
                        return DayOfWeekFullName[dayOfWeek];
                    case 'kdy':
                        return DayOfWeekShortNameKR[dayOfWeek];
                    case 'kday':
                        return DayOfWeekFullNameKR[dayOfWeek];
                    default:
                        return dayOfWeek.toString();
                }
            },
            getLastDay(date: DateObject | string): number {
                let dateObj: DateObject;
                if (hison.utils.isObject(date)) {
                    dateObj = hison.utils.deepCopyObject(date);
                    dateObj.d = 1;
                }
                else {
                    if ((date as string).includes('-')) {
                        date = date + '-01'
                    }
                    else if ((date as string).includes('/')) {
                        date = date + '/01'
                    }
                    else {
                        date = date + '01'
                    }
                    dateObj = hison.utils.getDateObject(date);
                }
                if (!hison.utils.isDate(dateObj)) throw new Error(`ER0011 Invalid format.\n=>${JSON.stringify(date)}`);
        
                const nextMonthFirstDay = new Date(dateObj.y, dateObj.M, 1);
                nextMonthFirstDay.setDate(0);
                return nextMonthFirstDay.getDate();
            },
            getSysYear(format: string = defaultOption.utils.yearFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'yy':
                        return currentDate.getFullYear().toString().substring(2);
                    default:
                        return currentDate.getFullYear().toString();
                }
            },
            getSysMonth(format: string = defaultOption.utils.monthFormat): string {
                const currentDate = new Date();
                const sysMonth = currentDate.getMonth() + 1;
                switch (format.toLowerCase()) {
                    case 'mm':
                        return sysMonth.toString().padStart(2, '0');
                    case 'mmmm':
                        return hison.utils.getMonthName(sysMonth);
                    case 'mmm':
                        return hison.utils.getMonthName(sysMonth, false);
                    default:
                        return sysMonth.toString();
                }
            },
            getSysYearMonth(format: string = defaultOption.utils.yearMonthFormat): string {
                const currentDate = new Date();
                return hison.utils.getDateWithFormat( {y : currentDate.getFullYear(), M : currentDate.getMonth() + 1, d : 1 }, format);
            },
            getSysDay(format: string = defaultOption.utils.dayFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'dd':
                        return currentDate.getDate().toString().padStart(2, '0');
                    default:
                        return currentDate.getDate().toString();
                }
            },
            getSysDayOfWeek(dayType: string = defaultOption.utils.dayOfWeekFormat): string {
                const currentDate = new Date();
                return hison.utils.getDayOfWeek({ y : currentDate.getFullYear(), M : currentDate.getMonth() + 1, d : currentDate.getDate()}, dayType);
            },
            getSysHour(format: string = defaultOption.utils.hourFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'hh':
                        return currentDate.getHours().toString().padStart(2, '0');
                    default:
                        return currentDate.getHours().toString();
                }
            },
            getSysHourMinute(format: string = defaultOption.utils.hourMinuteFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'hhmm':
                        return currentDate.getHours().toString().padStart(2, '0') + '' + currentDate.getMinutes().toString().padStart(2, '0');
                    default:
                        return currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0');
                }
            },
            getSysMinute(format: string = defaultOption.utils.minuteFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'mm':
                        return currentDate.getMinutes().toString().padStart(2, '0');
                    default:
                        return currentDate.getMinutes().toString();
                }
            },
            getSysSecond(format: string = defaultOption.utils.secondFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'ss':
                        return currentDate.getSeconds().toString().padStart(2, '0');
                    default:
                        return currentDate.getSeconds().toString();
                }
            },
            getSysTime(format: string = defaultOption.utils.timeFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'hhmmss':
                        return currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0') + currentDate.getSeconds().toString().padStart(2, '0');
                    default:
                        return currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0') + ':' + currentDate.getSeconds().toString().padStart(2, '0');
                }
            },
            getSysDate(format: string = defaultOption.utils.datetimeFormat): string {
                const currentDate = new Date();
                return hison.utils.getDateWithFormat(
                    {
                        y:currentDate.getFullYear(),
                        M:currentDate.getMonth() + 1,
                        d:currentDate.getDate(),
                        h:currentDate.getHours(),
                        m:currentDate.getMinutes(),
                        s:currentDate.getSeconds(),
                    }
                    , format);
            },
            //for number
            getCeil(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.ceil(num * factor) / factor;
            },
            getFloor(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.floor(num * factor) / factor;
            },
            getRound(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.round(num * factor) / factor;
            },
            getTrunc(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.trunc(num * factor) / factor;
            },
            //for string
            getByteLength(str: string): number {
                str = hison.utils.getToString(str);
                let byteLength = 0;
                for (let i = 0; i < str.length; i++) {
                    const charCode = str.charCodeAt(i);
                    if (charCode <= 0x7F) {
                        byteLength += 1;
                    } else if (charCode <= 0x7FF) {
                        byteLength += defaultOption.utils.LESSOREQ_0X7FF_BYTE;
                    } else if (charCode <= 0xFFFF) {
                        byteLength += defaultOption.utils.LESSOREQ_0XFFFF_BYTE;
                    } else {
                        byteLength += defaultOption.utils.GREATER_0XFFFF_BYTE;
                    }
                }
                return byteLength;
            },
            getCutByteLength(str: string, cutByte: number): string {
                str = hison.utils.getToString(str);
                cutByte = hison.utils.getToNumber(cutByte);
                let byteLength = 0;
                let cutIndex = str.length;
                for (let i = 0; i < str.length; i++) {
                    const charCode = str.charCodeAt(i);
                    if (charCode <= 0x7F) {
                        byteLength += 1;
                    } else if (charCode <= 0x7FF) {
                        byteLength += defaultOption.utils.LESSOREQ_0X7FF_BYTE;
                    } else if (charCode <= 0xFFFF) {
                        byteLength += defaultOption.utils.LESSOREQ_0XFFFF_BYTE;
                    } else {
                        byteLength += defaultOption.utils.GREATER_0XFFFF_BYTE;
                    }
                    if (byteLength > cutByte) {
                        cutIndex = i;
                        break;
                    }
                }
                return str.substring(0, cutIndex);
            },
            getStringLenForm(str: string, length: number): string {
                str = hison.utils.getToString(str);
                length = hison.utils.getToNumber(length);
                const strLength = str.length;
                if (strLength >= length) {
                    return str;
                }
                const totalSpaces = length - strLength;
                const gaps = strLength - 1;
                const spacePerGap = Math.floor(totalSpaces / gaps);
                const extraSpaces = totalSpaces % gaps;
                let result = '';
                for (let i = 0; i < gaps; i++) {
                    result += str[i];
                    result += ' '.repeat(spacePerGap + (i < extraSpaces ? 1 : 0));
                }
                result += str[strLength - 1];
                return result;
            },
            getLpad(str: string, padStr: string, length: number): string {
                str = hison.utils.getToString(str);
                padStr = hison.utils.getToString(padStr);
                length = hison.utils.getToNumber(length);
                if (str.length >= length) return str.substring(str.length, length - 1);
                const pad = padStr.repeat((length - str.length) / padStr.length);
                return pad + str;
            },
            getRpad(str: string, padStr: string, length: number): string {
                str = hison.utils.getToString(str);
                padStr = hison.utils.getToString(padStr);
                length = hison.utils.getToNumber(length);
                if (str.length >= length) return str.substring(0, length);
                const pad = padStr.repeat((length - str.length) / padStr.length);
                return str + pad;
            },
            getTrim(str: string): string {
                str = hison.utils.getToString(str);
                return str.trim();
            },
            getReplaceAll(str: string, targetStr: string, replaceStr: string = ''): string {
                str = hison.utils.getToString(str);
                targetStr = hison.utils.getToString(targetStr);
                replaceStr = hison.utils.getToString(replaceStr);
                return str.split(targetStr).join(replaceStr);
            },
            nvl(val: any, defaultValue: any): any {
                return (val === null || val === undefined) ? defaultValue : val;
            },
            getNumberFormat(value: number, format?: string): string {
                value = hison.utils.getToNumber(value);
                format = hison.utils.getToString(format);

                const oriValue = value;
                if (!hison.utils.isNumeric(value)) {
                    throw new Error(`ER0021 Invalid number\n=>${JSON.stringify(oriValue)}`);
                }
                format = format ? format : defaultOption.utils.numberFormat;
                const regex = /^(.*?)([#0,.]+)(.*?)$/;
                const matches = format.match(regex);
        
                if (!matches) {
                    throw new Error(`ER0022 Invalid format\n=>${JSON.stringify(format)}`);
                }
        
                const prefix = matches[1];
                const numberFormat = matches[2];
                const suffix = matches[3];
                const intergerFormat = numberFormat.split('.')[0];
                const decimalFormat = numberFormat.split('.').length > 1 ? numberFormat.split('.')[1] : '';
        
                if (suffix === '%' || suffix === ' %') value = value * 100;
        
                let numStr = hison.utils.getToString(value);
                const isNegative = numStr[0] === '-';
                numStr = isNegative ? numStr.substring(1) : numStr;
                let interger = numStr.split('.')[0];
                let decimal = numStr.split('.').length > 1 ? numStr.split('.')[1] : '';
                
                let result: string;
        
                decimal = hison.utils.getToFloat('0.' + decimal)
                        .toLocaleString('en',{
                            minimumFractionDigits: decimalFormat.lastIndexOf('0') + 1,
                            maximumFractionDigits: decimalFormat.length
                            });
                if (decimal === '0') decimal = '';
                else decimal = decimal.substring(1);
        
                switch (intergerFormat) {
                    case '#,###':
                        if (hison.utils.getToNumber(interger) === 0) {
                            result = decimal;
                        }
                        else {
                            interger = hison.utils.getToFloat(interger).toLocaleString('en');
                            result = interger + decimal;
                        }
                        break;
                    case '#,##0':
                        interger = hison.utils.getToFloat(interger).toLocaleString('en');
                        result = interger + decimal;
                        break;
                    case '#':
                        if (hison.utils.getToNumber(interger) === 0) {
                            result = decimal;
                        }
                        else {
                            result = interger + decimal;
                        }
                        break;
                    case '0':
                        result = interger + decimal;
                        break;
                    default:
                        throw new Error(`ER0023 Invalid format\n=>${JSON.stringify(format)}`);
                }
                result = isNegative ? '-' + result : result;
                return prefix + result + suffix;
            },
            getRemoveExceptNumbers(str: string): string {
                str = hison.utils.getToString(str);
                return str.replace(/[^0-9]/g, '');
            },
            getRemoveNumbers(str: string): string {
                str = hison.utils.getToString(str);
                return str.replace(/[0-9]/g, '');
            },
            getReverse(str: string): string {
                str = hison.utils.getToString(str);
                return str.split('').reverse().join('');
            },
            //for convertor
            getToBoolean(value: any): boolean {
                if (hison.utils.isNumeric(value)) {
                    return Number(value) != 0;
                }
                else if (typeof value === 'boolean'){
                    return value
                }
                else if (typeof value === 'string'){
                    return ['t','true','y','yes','check','c','checked','selected','참'].indexOf(value.toLowerCase()) >= 0;
                }
                else {
                    return false;
                }
            },
            getToNumber(value: any, impossibleValue: number = 0) {
                return hison.utils.getToFloat(value, impossibleValue);
            },
            getToFloat(value: any, impossibleValue: number = 0) {
                if (!hison.utils.isNumeric(value)) {
                    return impossibleValue;
                }
                return parseFloat(value);
            },
            getToInteger(value: any, impossibleValue: number = 0): number {
                if (!hison.utils.isNumeric(value)) {
                    return Math.trunc(impossibleValue);
                }
                return Math.trunc(parseInt(value, 10));
            },
            getToString(str: any, impossibleValue: string = ''): string {
                if (typeof str === 'string') {
                } else if (typeof str === 'number' || typeof str === 'boolean' || typeof str === 'bigint') {
                    str = String(str);
                } else if (typeof str === 'symbol') {
                    str = (str as Symbol).description;
                } else {
                    str = impossibleValue;
                }
                return str;
            },
            //etc
            getFileExtension(str: string): string {
                str = hison.utils.getToString(str);
            
                const extension = str.split('.').pop();
                if (extension === str) {
                    return '';
                }
                return extension;
            },
            getFileName(str: string): string {
                str = hison.utils.getToString(str);
            
                const fileName = str.split('/').pop();
                const lastDotIndex = fileName.lastIndexOf('.');
            
                if (lastDotIndex === -1) return fileName;
                return fileName.substring(0, lastDotIndex);
            },
            getDecodeBase64(str: string): string {
                str = hison.utils.getToString(str);
                return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            },
            getEncodeBase64(str: string): string {
                str = hison.utils.getToString(str);
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1:string) {
                    return String.fromCharCode(parseInt(p1, 16));
                }));
            },
            deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any {
                if (object === null || typeof object !== 'object') {
                    return object;
                }
                if (object instanceof Response) {
                    return object.clone();
                }
                if (object.constructor !== Object && object.constructor !== Array) {
                    if ((object && object.getIsDataWrapper && object.getIsDataWrapper())
                        ||(object && object.getIsDataModel && object.getIsDataModel())
                    ) {
                        return object.clone();
                    } else {
                        return object;
                    }
                }
                if (!visited) visited = [];
                for (let i = 0; i < visited.length; i++) {
                    if (visited[i].source === object) {
                        return visited[i].copy;
                    }
                }
                let copy: any;
                if (Array.isArray(object)) {
                    copy = [];
                    visited.push({ source: object, copy: copy });
            
                    for (let j = 0; j < object.length; j++) {
                        copy[j] = hison.utils.deepCopyObject(object[j], visited);
                    }
                } else {
                    copy = {};
                    visited.push({ source: object, copy: copy });
            
                    for (let key in object) {
                        if (object.hasOwnProperty(key)) {
                            copy[key] = hison.utils.deepCopyObject(object[key], visited);
                        }
                    }
                }
                return copy;
            },
        };
        shield = {
            excute(hison: Hison) {
                const deepFreeze = function(object: any) {
                    const propNames = Object.getOwnPropertyNames(object);
                
                    propNames.forEach(function(name) {
                        const prop = object[name];
                
                        if (typeof prop == 'object' && prop !== null) {
                            deepFreeze(prop);
                        }
                    });
                    
                    return Object.freeze(object);
                };
                const shieldFuncGetIp = function(func: Function) {
                    const httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = () => {
                        if (httpRequest.readyState === XMLHttpRequest.DONE) {
                            if (httpRequest.status === 200) {
                                const result = httpRequest.response;
                                func(result);
                            } else {
                                func(null);
                            }
                        }
                    };
                    httpRequest.open('get', '/ajax/getIp');
                    httpRequest.responseType = 'json';
                    httpRequest.send();
                }
                const shieldFuncCreateBlockDevMode = function() {
                    const msg = 'Developer mode is not available.';
                    document.onkeydown = function(event) {
                        if (event.key === 'F12') {
                            alert(msg);
                            event.preventDefault();
                            return false;
                        }
                    };
                    
                    function detectDevTool(allow?: any) {
                        if (isNaN(+allow)) allow = 100;
                        const start = +new Date();
                        debugger;
                        const end = +new Date();
                        if (isNaN(start) || isNaN(end) || end - start > allow) {
                            alert(msg);
                            document.write(msg);
                        }
                    }
                    
                    window.addEventListener('load', detectDevTool);
                    window.addEventListener('resize', detectDevTool);
                    window.addEventListener('mousemove', detectDevTool);
                    window.addEventListener('focus', detectDevTool);
                    window.addEventListener('blur', detectDevTool);
                }

                if (defaultOption.shield.isFreeze) {
                    deepFreeze(hison);
                }
                
                if (location.href.indexOf('localhost') < 0){
                    if (defaultOption.shield.shieldURL && location.href.indexOf(defaultOption.shield.shieldURL) < 0 ){
                        return;
                    }
    
                    shieldFuncGetIp(function(response: any) {
                        const ip = response && response.ip ? response.ip : '';
                        if (ip && defaultOption.shield.exposeIpList.indexOf(ip) >= 0) {
                            return;
                        }
    
                        if (!defaultOption.shield.isPossibleGoBack) {
                            history.pushState(null, document.title, location.href);//현재 URL push
                            window.addEventListener('popstate', function() {  //뒤로가기 이벤트 등록
                                history.pushState(null, document.title, location.href); //다시 push함으로 뒤로가기 방지
                            });
                        }
                        
                        if (!defaultOption.shield.isPossibleOpenDevTool) {
                            shieldFuncCreateBlockDevMode();
                            return;
                        }
                    });
                }
            }
        };
        data = {
            DataWrapper : class implements DataWrapper {
                constructor(keyOrObject?: Record<string, any> | string, value?: any) {
                    this._data = {};
                    if (keyOrObject === undefined) return;
                    if (typeof keyOrObject === 'object' && keyOrObject !== null) {
                        for (let key in keyOrObject) {
                            this._put(key, keyOrObject[key]);
                        }
                    } else if (typeof keyOrObject === 'string' && value !== undefined) {
                        this._put(keyOrObject, value);
                    } else {
                        throw new Error('Invalid arguments. Provide an object or a key-value pair.');
                    }
                }
                private _data: Record<string, DataModel | string | null>;
                private _isDataWrapper = true;
                private _put = (key: string, value: any) => {
                    if (typeof key !== 'string') {
                        throw new Error('Keys must always be strings.');
                    } else if (typeof value === 'string') {
                        this._data[key] = value;
                    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                        this._data[key] = String(value);
                    } else if (typeof value === 'symbol') {
                        this._data[key] = value.description;
                    } else if (value === null) {
                        this._data[key] = null;
                    } else if (value === undefined) {
                        throw new Error('You can not put a value of undefined type.');
                    } else if (typeof value === 'object') {
                        if (!value || !value.getIsDataModel || !value.getIsDataModel()) {
                            throw new Error('Please insert only values convertible to string or of data-model type.');
                        }
                        this._data[key] = value.clone();
                    } else {
                        throw new Error('Please insert only values convertible to string or of data-model type.');
                    }
                };
                getIsDataWrapper = (): boolean => {
                    return this._isDataWrapper;
                };
                clone = (): DataWrapper => {
                    const newData = {};
                    for (let key in this._data) {
                        newData[key] = hison.utils.deepCopyObject(this._data[key]);
                    }
                    return new hison.data.DataWrapper(newData);
                };
                clear = (): DataWrapper => {
                    this._data = {};
                    return this;
                };
                getSerialized = (): string => {
                    const data = {};
                    
                    for (let key in this._data) {
                        if (this._data.hasOwnProperty(key)) {
                            // DataModel 객체인 경우
                            if (this._data[key] && (this._data[key] as DataModel).getIsDataModel && (this._data[key] as DataModel).getIsDataModel()) {
                                data[key] = (this._data[key] as DataModel).getRows();
                            } else {
                                // 그 외의 경우는 정상적으로 값을 할당
                                data[key] = this._data[key];
                            }
                        }
                    }
                    return JSON.stringify(data);
                };
                get = (key: string): DataModel | string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    return this._data[key] ? hison.utils.deepCopyObject(this._data[key]) : null;
                };
                getString = (key: string): string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (typeof this._data[key] !== 'string') throw new Error('The data does not contain the specified string value.');
                    return this._data[key] ? this._data[key] as string : null;
                };
                getDataModel = (key: string): DataModel => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (!this._data[key] || !(this._data[key] as DataModel).getIsDataModel || !(this._data[key] as DataModel).getIsDataModel()) throw new Error('The data does not contain the specified data-model value.');
                    return (this._data[key] as DataModel).clone();
                };
                put = (key: string, value: any): DataWrapper => {
                    this._put(key, value);
                    return this;
                };
                putString = (key: string, value: string | number | boolean | bigint | symbol | null): DataWrapper => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (typeof value !== 'string'
                        && typeof value !== 'number'
                        && typeof value !== 'boolean'
                        && typeof value !== 'bigint'
                        && typeof value !== 'symbol'
                        && value !== null) {
                        throw new Error('Please insert only values convertible to string type.');
                    }
                    this._put(key, value);
                    return this;
                };
                putDataModel = (key: string, value: DataModel): DataWrapper => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (value === null || !value.getIsDataModel || !value.getIsDataModel()) {
                        throw new Error('Please insert only values of data-model type.');
                    }
                    this._put(key, value);
                    return this;
                };
                getObject = (): Record<string, any> => {
                    const result = {};
                    for(let key in this._data) {
                        if (this._data[key] && (this._data[key] as DataModel).getIsDataModel && (this._data[key] as DataModel).getIsDataModel()) {
                            result[key] = (this._data[key] as DataModel).getObject();
                        } else {
                            result[key] = this._data[key];
                        }
                    }
                    return result;
                };
                containsKey = (key: string): boolean => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    return this._data.hasOwnProperty(key);
                };
                isEmpty = (): boolean => {
                    return Object.keys(this._data).length === 0;
                };
                remove = (key: string): { data: DataWrapper, result: boolean } => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    let result = false;
                    if (this._data.hasOwnProperty(key)) {
                        result = true;
                        delete this._data[key];
                    }
                    return { data: this, result };
                };
                size = (): number => {
                    return Object.keys(this._data).length;
                };
                keys = (): string[] => {
                    return Object.keys(this._data);
                };
                values = (): any[] => {
                    const values = [];
                    for (let key in this._data) {
                        if (this._data.hasOwnProperty(key)) {
                            values.push(hison.utils.deepCopyObject(this._data[key]));
                        }
                    }
                    return values;
                };
            },
            DataModel : class implements DataModel {
                constructor(data?: Record<string, any>[] | Record<string, any>) {
                    if (!data) return;
                    this._put(data);
                }
                private _cols: string[] = [];
                private _rows: Record<string, any>[] = [];
                private _isDataModel = true;
                private _deepCopy = (object: any, visited?: { source: any, copy: any }[]): any => {
                    if (object === null || typeof object !== 'object') {
                        return object;
                    }
                    if (object.constructor !== Object && object.constructor !== Array) {
                        const convertValue = defaultOption.data.convertValue(object);
                        return convertValue !== undefined ? convertValue : object;
                    }
                    if (!visited) visited = [];
                    for (let i = 0; i < visited.length; i++) {
                        if (visited[i].source === object) {
                            return visited[i].copy;
                        }
                    }
                    let copy: any;
                    if (Array.isArray(object)) {
                        copy = [];
                        visited.push({ source: object, copy: copy });
                
                        for (let j = 0; j < object.length; j++) {
                            copy[j] = this._deepCopy(object[j], visited);
                        }
                    } else {
                        copy = {};
                        visited.push({ source: object, copy: copy });
                
                        for (let key in object) {
                            if (object.hasOwnProperty(key)) {
                                copy[key] = this._deepCopy(object[key], visited);
                            }
                        }
                    }
                    return copy;
                };
                private _isPositiveIntegerIncludingZero = (value: string | number | bigint): boolean => {
                    if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'bigint') {
                        return false;
                    }
                    value = String(value);
                    const intNum = parseInt(value, 10);
                    const floatNum = parseFloat(value);
                    if (intNum !== floatNum || isNaN(intNum) || intNum < 0) {
                        return false;
                    }
                    return true;
                };
                private _getValidRowIndex = (rowIndex: number): number => {
                    if (!this._isPositiveIntegerIncludingZero(rowIndex)) {
                        throw new Error('Invalid number type. It should be a number or a string that can be converted to a number.');
                    }
                    const index = Number(rowIndex);
                    if (index < 0 || index >= this._rows.length) {
                        throw new Error(`Invalid rowIndex value. It should be within the range of the rows.\nrange: between 0 and ${this._rows.length - 1}\ninsert rowIndex : ${index}`);
                    }
                    return index;
                }
                private _isConvertibleString = (value: any): boolean => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    if (value === null) return true;
                    if (['string','number','boolean','bigint','symbol'].indexOf(typeof value) >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                };
                private _hasColumn = (column: string): boolean => {
                    return this._cols.indexOf(column) >= 0
                };
                private _checkColumn = (column: string) => {
                    if (!this._hasColumn(column)) {
                        throw new Error('The column does not exist. column : ' + column);
                    }
                };
                private _checkValidFunction = (func: Function) => {
                    if (!func || typeof func !== 'function') {
                        throw new Error('Please insert the valid function.');
                    }
                };
                private _checkBoolean = (value: boolean) => {
                    if (typeof value !== 'boolean') {
                        throw new Error('Please pass an boolean as a parameter.');
                    }
                };
                private _checkOriginObject = (value: Object) => {
                    if (value.constructor !== Object) {
                        throw new Error('Please pass an object with its own key-value pairs as a parameter.');
                    }
                };
                private _checkArray = (value: any[]) => {
                    if (value.constructor !== Array) {
                        throw new Error('Please pass an array.');
                    }
                };
                private _getColumnType = (rowIndex: number, col: string): string => {
                    if (rowIndex === 0) return 'null';
                    for(let index = rowIndex - 1; index >= 0; index--) {
                        if (this._rows[index][col]) {
                            if (typeof this._rows[index][col] === 'object') {
                                return this._rows[index][col].constructor;
                            }
                            return typeof this._rows[index][col];
                        }
                    }
                    return 'null';
                };
                private _makeValue = (value: any): any => {
                    let result = value;
                    /*if (typeof value === 'string') {
                        result = value;
                    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                        result = String(value);
                    } else if (typeof value === 'symbol') {
                        result = value.description;
                    } else if (value === null) {
                        result = null;
                    } else */if (typeof value === 'object') {
                        if ((value && value.getIsDataWrapper && value.getIsDataWrapper())
                            || (value && value.getIsDataModel && value.getIsDataModel())
                        ) {
                            throw new Error('You cannot insert a datawrapper or datamodel within a datamodel.');
                        }
                        result = this._deepCopy(value);
                    }
                    return result;
                };
                private _getValidColValue = (value: string): string => {
                    value = this._makeValue(value);
                    if (!this._isConvertibleString(value)) {
                        throw new Error('Only strings can be inserted into columns.');
                    }
                    if (!value) {
                        throw new Error('Column cannot be null.');
                    }
                    return value;
                }
                private _getValidRowValue = (rowIndex: number, col: string, value: any): any => {
                    value = this._makeValue(value);
                    const chkType = this._getColumnType(rowIndex, col);
                    if (chkType !== 'null' && value !== null) {
                        if (typeof value === 'object') {
                            if (value.constructor !== chkType) {
                                throw new Error('Data of the same type must be inserted into the same column. column : ' + col);
                            }
                        } else {
                            if (typeof value !== 'object' && typeof value !== chkType) {
                                throw new Error('Data of the same type must be inserted into the same column. column : ' + col);
                            }
                        }
                    }
                    return value;
                }
                private _addCol = (value: string) => {
                    value = this._getValidColValue(value);
                    if (this._cols.indexOf(value) === -1) {
                        this._cols.push(value);
                    } else {
                        throw new Error('There are duplicate columns to add. column : ' + value);
                    }
                }
                private _addRow = (rowIndex: number, row: Record<string, any>) => {
                    if (!row) {
                        throw new Error('Please insert vaild object');
                    }
                    if (row.constructor !== Object) {
                        throw new Error('Please insert object with their own key-value pairs.');
                    }
                    if (Object.keys(row).length === 0) return;
                    if (this._cols.length === 0) {
                        for (const key in row) {
                            this._addCol(key);
                        }
                    }
                    const tempRow = {};
                    for(const col of this._cols) {
                        if (row.hasOwnProperty(col)) {
                            tempRow[col] = this._getValidRowValue(rowIndex, col, row[col]);
                        }
                        else {
                            tempRow[col] = null;
                        }
                    }
                    this._rows.push(tempRow);
                }
                private _put = (data: Record<string, any>[] | Record<string, any>) => {
                    let rowIndex = this._rows.length;
                    if (Array.isArray(data)) {
                        if (data.length === 0) return;
                        if (this._isConvertibleString(data[0])) {
                            for(const col of data) {
                                this._addCol(col);
                            }
                            return;
                        } else {
                            for(const row of data) {
                                this._addRow(rowIndex, row);
                                rowIndex++;
                            }
                            return;
                        }
                    } else if (typeof data === 'object') {
                        if (data && (data as DataWrapper).getIsDataWrapper && (data as DataWrapper).getIsDataWrapper()) {
                            throw new Error('You cannot construct a datamodel with datawrapper.');
                        } else if (data && (data as DataModel).getIsDataModel && (data as DataModel).getIsDataModel()){
                            for(const row of (data as DataModel).getRows() ) {
                                this._addRow(rowIndex, row);
                                rowIndex++;
                            }
                            return;
                        } else if (data.constructor === Object) {
                            this._addRow(rowIndex, data);
                            return;
                        }
                    }
                    throw new Error('Please insert array contains objects with their own key-value pairs, array contains strings or only object of key-value pairs.');
                };
                private _getNullColumnFirstRowIndex = (column: string): number => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    for(let i = 0; i < this._rows.length; i++) {
                        if (this._rows[i][column] === null) return i;
                    }
                    return -1;
                };
                private _getDuplColumnFirstRowIndex = (column: string): number => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    const checkedValues = [];
                    for(let i = 0; i < this._rows.length; i++) {
                        if (checkedValues.includes(JSON.stringify(this._rows[i][column]))) {
                            return i;
                        }
                        if (this._rows[i][column] !== null) {
                            checkedValues.push(JSON.stringify(this._rows[i][column]));
                        }
                    }
                    return -1;
                };
                private _getInValidColumnFirstRowIndex = (column: string, validator: DataModelValidator): number => {
                    this._checkValidFunction(validator);
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    
                    for(let i = 0; i < this._rows.length; i++) {
                        if (!validator(this._rows[i][column])) {
                            return i;
                        }
                    }
                    return -1;
                };
                getIsDataModel = (): boolean => {
                    return this._isDataModel;
                };
                clone = (): DataModel => {
                    return new hison.data.DataModel(this._rows);
                };
                clear = (): DataModel => {
                    this._cols = [];
                    this._rows = [];
                    return this;
                };
                getSerialized = (): string => {
                    return JSON.stringify(this._rows);
                };
                isDeclare = (): boolean => {
                    return this._cols.length > 0;
                };
                getColumns = (): string[] => {
                    return this._deepCopy(this._cols);
                };
                getColumnValues = (column: string): any[] => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    const result = [];
                    for(const row of this._rows) {
                        result.push(this._deepCopy(row[column]));
                    }
                    return result;
                };
                addColumn = (column: string): DataModel => {
                    this._addCol(column);
                    for(const row of this._rows) {
                        if (!row.hasOwnProperty(column)) {
                            row[column] = null;
                        }
                    }
                    return this;
                };
                addColumns = (columns: string[]): DataModel => {
                    if (!Array.isArray(columns)) {
                        throw new Error('Only array contains strings can be inserted into columns.');
                    }
                    for(const column of columns) {
                        this._addCol(column);
                        for(const row of this._rows) {
                            if (!row.hasOwnProperty(column)) {
                                row[column] = null;
                            }
                        }
                    }
                    return this;
                };
                setColumnSameValue = (column: string, value: any): DataModel => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    column = this._getValidColValue(column);
                    if (!this._hasColumn(column)) this._addCol(column);
                    let rowIndex = 0;
                    for(const row of this._rows) {
                        row[column] = this._getValidRowValue(rowIndex, column, value);
                        rowIndex++;
                    }
                    return this;
                };
                setColumnSameFormat = (column: string, formatter: DataModelFormatter): DataModel => {
                    this._checkValidFunction(formatter);
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    let rowIndex = 0;
                    for(const row of this._rows) {
                        row[column] = this._getValidRowValue(rowIndex, column, formatter(row[column]));
                        rowIndex++;
                    }
                    return this;
                };
                getRow = (rowIndex: number): Record<string, any> => {
                    return this._deepCopy(this._rows[this._getValidRowIndex(rowIndex)]);
                };
                getRowAsDataModel = (rowIndex: number): DataModel => {
                    return new hison.data.DataModel(this._rows[this._getValidRowIndex(rowIndex)]);
                };
                addRow = (rowIndexOrRow?: number | Record<string, any>, row?: Record<string, any>): DataModel => {
                    if (rowIndexOrRow === undefined && row === undefined) {
                        if (this._cols.length <= 0) {
                            throw new Error('Please define the column first.');
                        }
                        const emptyRow = {};
                        for (const col of this._cols) {
                            emptyRow[col] = null;
                        }
                        this._rows.push(emptyRow);
                    } else if (typeof rowIndexOrRow === 'number' && row === undefined) {
                        if (this._cols.length <= 0) {
                            throw new Error('Please define the column first.');
                        }
                        const validIndex = rowIndexOrRow >= this._rows.length ? this._rows.length : this._getValidRowIndex(rowIndexOrRow);
                        const emptyRow = {};
                        for (const col of this._cols) {
                            emptyRow[col] = null;
                        }
                        this._rows.splice(validIndex, 0, emptyRow);
                    } else if (typeof rowIndexOrRow === 'object' && row === undefined) {
                        this._addRow(this._rows.length, rowIndexOrRow);
                    } else if (typeof rowIndexOrRow === 'number' && typeof row === 'object') {
                        const validIndex = rowIndexOrRow >= this._rows.length ? this._rows.length : this._getValidRowIndex(rowIndexOrRow);
                        this._addRow(validIndex, row);
                        const newRow = this._rows.pop();
                        this._rows.splice(validIndex, 0, newRow);
                    } else {
                        throw new Error('Invalid parameters for addRow method.');
                    }
                    return this;
                };
                getRows = (startRow: number = 0, endRow: number = null): Record<string, any>[] => {
                    const sRow = this._getValidRowIndex(startRow);
                    if(sRow === 0 && endRow === null) return this._deepCopy(this._rows);
                    const eRow = endRow ? this._getValidRowIndex(endRow) : this._rows.length;
                    const result = [];
                    for(let i = sRow; i <= eRow; i++) {
                        if(!this._rows[i]) break;
                        result.push(this._deepCopy(this._rows[i]));
                    }
                    return result;
                }
                getRowsAsDataModel = (startRow: number = 0, endRow: number = null): DataModel => {
                    const sRow = this._getValidRowIndex(startRow);
                    if(sRow === 0 && endRow === null) return this.clone();
                    const eRow = endRow ? this._getValidRowIndex(endRow) : this._rows.length;
                    const result = [];
                    for(let i = sRow; i <= eRow; i++) {
                        if(!this._rows[i]) break;
                        result.push(this._deepCopy(this._rows[i]));
                    }
                    return new hison.data.DataModel(result);
                }
                addRows = (rows: Record<string, any>[]): DataModel => {
                    this._put(rows);
                    return this;
                }
                getObject = (): Record<string, any> => {
                    const result = {};
                    const copyCol = this._deepCopy(this._cols);
                    const copyRow = this._deepCopy(this._rows);
        
                    result['cols'] = copyCol;
                    result['rows'] = copyRow;
                    result['colCount'] = copyCol.length;
                    result['rowCount'] = copyRow.length;
                    result['isDeclare'] = this.isDeclare();
                    return result;
                };
                getValue = (rowIndex: number, column: string): any => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    return this._deepCopy(this._rows[this._getValidRowIndex(rowIndex)][column]);
                };
                setValue = (rowIndex: number, column: string, value: any): DataModel => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    this._rows[this._getValidRowIndex(rowIndex)][column] = this._getValidRowValue(rowIndex, column, value);
                    return this;
                };
                removeColumn = (column: string): DataModel => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    for(const row of this._rows) {
                        delete row[column]
                    }
                    this._cols = this._cols.filter(oriColumn => oriColumn !== column);
                    return this;
                };
                removeColumns = (columns: string[]): DataModel => {
                    for(const column of columns) {
                        this.removeColumn(column);
                    }
                    return this;
                };
                removeRow = (rowIndex: number = 0): Record<string, any> => {
                    return this._rows.splice(this._getValidRowIndex(rowIndex), 1)[0];
                };
                getColumnCount = (): number => {
                    return this._cols.length;
                };
                getRowCount = (): number => {
                    return this._rows.length;
                };
                hasColumn = (column: string): boolean => {
                    return this._hasColumn(column);
                };
                setValidColumns = (columns: string[]): DataModel => {
                    columns = this._cols.filter(oriColumn => !columns.includes(oriColumn));
                    this.removeColumns(columns);
                    return this;
                };
                isNotNullColumn = (column: string): boolean => {
                    return this._getNullColumnFirstRowIndex(column) === -1;
                };
                findFirstRowNullColumn = (column: string): Record<string, any> => {
                    const nullColumnFirstRowIndex = this._getNullColumnFirstRowIndex(column);
                    if (nullColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(nullColumnFirstRowIndex);
                    }
                };
                isNotDuplColumn = (column: string): boolean => {
                    return this._getDuplColumnFirstRowIndex(column) === -1;
                };
                findFirstRowDuplColumn = (column: string): Record<string, any> => {
                    const duplColumnFirstRowIndex = this._getDuplColumnFirstRowIndex(column);
                    if (duplColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(duplColumnFirstRowIndex);
                    }
                };
                isValidValue = (column: string, vaildator: DataModelValidator): boolean => {
                    return this._getInValidColumnFirstRowIndex(column, vaildator) === -1;
                };
                findFirstRowInvalidValue = (column: string, vaildator: DataModelValidator): Record<string, any> => {
                    const inValidColumnFirstRowIndex = this._getInValidColumnFirstRowIndex(column, vaildator);
                    if (inValidColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(inValidColumnFirstRowIndex);
                    }
                };
                searchRowIndexes = (condition: Record<string, any>, isNegative: boolean = false): number[] => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched = [];
                    _this._rows.forEach(function(row, index) {
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(row[key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (!matchesCondition) matched.push(index);
                        } else {
                            if (matchesCondition) matched.push(index);
                        }
                    });
                    return matched;
                };
                searchRows = (condition: Record<string, any>, isNegative: boolean = false): Record<string, any>[] => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched = [];
                    _this._rows.forEach(function(row) {
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(row[key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (!matchesCondition) matched.push(_this._deepCopy(row));
                        } else {
                            if (matchesCondition) matched.push(_this._deepCopy(row));
                        }
                    });
                    return matched;
                };
                searchRowsAsDataModel = (condition: Record<string, any>, isNegative: boolean = false): DataModel => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched = [];
                    _this._rows.forEach(function(row) {
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(row[key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (!matchesCondition) matched.push(row);
                        } else {
                            if (matchesCondition) matched.push(row);
                        }
                    });
                    return new hison.data.DataModel(matched);
                };
                searchAndModify = (condition: Record<string, any>, isNegative: boolean = false): DataModel => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    for (let i = 0; i < _this._rows.length; i++ ){
                        let matchesCondition = true;
                        for (const key in condition) {
                            _this._checkColumn(key);
                            if ((JSON.stringify(_this._rows[i][key]) !== JSON.stringify(condition[key]))) {
                                matchesCondition = false;
                                break;
                            }
                        }
                        if (isNegative) {
                            if (matchesCondition) {
                                _this._rows.splice(i, 1);
                                i--;
                            }
                        } else {
                            if (!matchesCondition) {
                                _this._rows.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    return _this;
                };
                filterRowIndexes = (filter: DataModelFillter): number[] => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched = [];
                    _this._rows.forEach(function(row: Record<string, any>, index) {
                        if (filter(row)) {
                            matched.push(index);
                        }
                    });
                    return matched;
                };
                filterRows = (filter: DataModelFillter): Record<string, any>[] => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched = [];
                    _this._rows.forEach(function(row) {
                        if (filter(row)) {
                            matched.push(_this._deepCopy(row));
                        }
                    });
                    return matched;
                };
                filterRowsAsDataModel = (filter: DataModelFillter): DataModel => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched = [];
                    _this._rows.forEach(function(row) {
                        if (filter(row)) {
                            matched.push(row);
                        }
                    });
                    return new hison.data.DataModel(matched);
                };
                filterAndModify = (filter: DataModelFillter): DataModel => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    for (let i = 0; i < _this._rows.length; i++ ){
                        if (!filter(_this._rows[i])) {
                            _this._rows.splice(i, 1);
                            i--;
                        }
                    }
                    return _this;
                };
                setColumnSorting = (columns: string[]): DataModel => {
                    this._checkArray(columns);
                    const newColumns = [];
                    for(let column of columns) {
                        column = this._getValidColValue(column);
                        this._checkColumn(column);
                        newColumns.push(column);
                    }
                    for(const column of this._cols) {
                        if (!newColumns.includes(column)) {
                            newColumns.push(column)
                        }
                    }
                    this._cols = newColumns;
                    return this;
                };
                sortColumnAscending = (): DataModel => {
                    this._cols.sort();
                    return this;
                };
                sortColumnDescending = (): DataModel => {
                    this._cols.sort(function(a, b) {
                        if (a > b) {
                            return -1;
                        }
                        if (a < b) {
                            return 1;
                        }
                        return 0;
                    });
                    return this;
                };
                sortColumnReverse = (): DataModel => {
                    this._cols.reverse();
                    return this;
                };
                sortRowAscending = (column: string, isIntegerOrder: boolean = false): DataModel => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    this._checkBoolean(isIntegerOrder);
                    this._rows.sort(function(a, b) {
                        let valueA = a[column];
                        let valueB = b[column];
                        if (valueA === null || valueB === null) {
                            return valueA === null ? 1 : -1;
                        }
                        if (typeof valueA === 'object' || typeof valueB === 'object') {
                            valueA = JSON.stringify(valueA);
                            valueB = JSON.stringify(valueB);
                        }
                        if (isIntegerOrder) {
                            valueA = parseInt(valueA, 10);
                            valueB = parseInt(valueB, 10);
                            if (isNaN(valueA) || isNaN(valueB)) {
                                throw new Error('Cannot sort rows: non-integer value encountered.');
                            }
                        }
                        if (valueA < valueB) {
                            return -1;
                        }
                        if (valueA > valueB) {
                            return 1;
                        }
                        return 0;
                    });
                    return this;
                };
                sortRowDescending = (column: string, isIntegerOrder: boolean = false): DataModel => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    this._checkBoolean(isIntegerOrder);
                    this._rows.sort(function(a, b) {
                        let valueA = a[column];
                        let valueB = b[column];
                        if (valueA === null || valueB === null) {
                            return valueA === null ? -1 : 1;
                        }
                        if (typeof valueA === 'object' || typeof valueB === 'object') {
                            valueA = JSON.stringify(valueA);
                            valueB = JSON.stringify(valueB);
                        }
                        if (isIntegerOrder) {
                            valueA = parseInt(valueA, 10);
                            valueB = parseInt(valueB, 10);
                            if (isNaN(valueA) || isNaN(valueB)) {
                                throw new Error('Cannot sort rows: non-integer value encountered.');
                            }
                        }
                        if (valueA < valueB) {
                            return 1;
                        }
                        if (valueA > valueB) {
                            return -1;
                        }
                        return 0;
                    });
                    return this;
                };
                sortRowReverse = (): DataModel => {
                    this._rows.reverse();
                    return this;
                };
            },
        };
        link = {
            CachingModule: class implements CachingModule {
                constructor(cachingLimit: number = defaultOption.link.cachingLimit) {
                    this._webSocket = new WebSocket(defaultOption.link.webSocketProtocol + defaultOption.link.domain + defaultOption.link.webSocketEndPoint);
                    this._webSocket.onopen = function() {};
                    this._webSocket.onmessage = function() {};
                    this._webSocket.onclose = function() {};
                    this._webSocket.onerror = function() {};
                    this._LRUCache = new LRUCache(cachingLimit);
                    this._isCachingModule = true;
                };
                private _webSocket: WebSocket;
                private _LRUCache: LRUCache;
                private _isCachingModule: boolean;
                private _checkTypeString = (str: string) => {
                    if(typeof str !== 'string') {
                        throw new Error('key is only a string.');
                    }
                }
                private _checkTypeFunction = (func: Function) => {
                    if (func && typeof func !== 'function') {
                        throw new Error('Please enter only the function.');
                    }
                }
                private _checkWebSocketConnection = (): number => {
                    if (this._webSocket.readyState === WebSocket.OPEN) {
                        return 1;
                    } else if (this._webSocket.readyState === WebSocket.CONNECTING) {
                        return 0;
                    } else {
                        return -1;
                    }
                };
                getIsCachingModule = (): boolean => {
                    return this._isCachingModule;
                };
                hasKey = (key: string): boolean => {
                    this._checkTypeString(key);
                    return this._LRUCache.hasKey(key);
                };
                get = (key: string): Promise<{ data: any; response: Response; }> => {
                    this._checkTypeString(key);
                    return this._LRUCache.get(key);
                };
                put = (key: string, value: Promise<{ data: any; response: Response; }>) => {
                    this._checkTypeString(key);
                    this._LRUCache.put(key, value);
                };
                remove = (key: string) => {
                    this._checkTypeString(key);
                    this._LRUCache.remove(key);
                };
                getAll = (): Record<string, Promise<{ data: any; response: Response; }>>  => {
                    return this._LRUCache.getAll();
                };
                getKeys = (): string[] => {
                    return this._LRUCache.getKeys();
                }
                clear = () => {
                    this._LRUCache.clear();
                };
                onopen = (func: ((this: WebSocket, ev: Event) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onopen = func;
                };
                onmessage = (func: ((this: WebSocket, ev: MessageEvent) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onmessage = func;
                };
                onclose = (func: ((this: WebSocket, ev: CloseEvent) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onclose = func;
                };
                onerror = (func: ((this: WebSocket, ev: Event) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onclose = func;
                };
                isWebSocketConnection = (): number => {
                    return this._checkWebSocketConnection();
                }
            },
            ApiGet: class implements ApiGet {
                constructor(resourcePath: string = '', cachingModule: CachingModule = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._resourcePath = resourcePath;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _resourcePath: string;
                call = (options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.get(this._resourcePath, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(this._resourcePath, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._resourcePath, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('GET', eventName, eventFunc);
                };
            },
            ApiPost: class implements ApiPost {
                constructor(serviceCmd: string, cachingModule: CachingModule = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.post(requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(defaultOption.link.controllerPath, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(defaultOption.link.controllerPath, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('POST', eventName, eventFunc);
                };
            },
            ApiPut: class implements ApiPut {
                constructor(serviceCmd: string, cachingModule: CachingModule = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.put(requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(defaultOption.link.controllerPath, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(defaultOption.link.controllerPath, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PUT', eventName, eventFunc);
                };
            },
            ApiPatch: class implements ApiPatch {
                constructor(serviceCmd: string, cachingModule: CachingModule = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.patch(requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(defaultOption.link.controllerPath, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(defaultOption.link.controllerPath, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
                };
            },
            ApiDelete: class implements ApiDelete {
                constructor(serviceCmd: string, cachingModule: CachingModule = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.delete(requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(defaultOption.link.controllerPath, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(defaultOption.link.controllerPath, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
                };
            },
            ApiGetUrl: class implements ApiGetUrl {
                constructor(url: string, cachingModule: CachingModule = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _url: string;
                call = (options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.getURL(this._url, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(this._url, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('GET', eventName, eventFunc);
                };
            },
            ApiPostUrl: class implements ApiPostUrl {
                constructor(url: string, serviceCmd: string = '', cachingModule: CachingModule = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.postURL(this._url, requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('POST', eventName, eventFunc);
                };
            },
            ApiPutUrl: class implements ApiPutUrl {
                constructor(url: string, serviceCmd: string = '', cachingModule: CachingModule = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.putURL(this._url, requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PUT', eventName, eventFunc);
                };
            },
            ApiPatchUrl: class implements ApiPatchUrl {
                constructor(url: string, serviceCmd: string = '', cachingModule: CachingModule = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
                };
            },
            ApiDeleteUrl: class implements ApiDeleteUrl {
                constructor(url: string, serviceCmd: string = '', cachingModule: CachingModule = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: CachingModule = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; }> => {
                    return this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options);
                }
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
                };
            },
        };
    };
    
    const defaultOption = new DefaultOption();
    const hison = new Hison();

    return {
        setDateFormat(str: string) {defaultOption.utils.dateFormat = str;},
        setTimeFormat(str: string) {defaultOption.utils.timeFormat = str;},
        setDatetimeFormat(str: string) {defaultOption.utils.datetimeFormat = str;},
        setYearFormat(str: string) {defaultOption.utils.yearFormat = str;},
        setMonthFormat(str: string) {defaultOption.utils.monthFormat = str;},
        setMonthNameFormat(str: string) {defaultOption.utils.monthNameFormat = str;},
        setYearMonthFormat(str: string) {defaultOption.utils.yearMonthFormat = str;},
        setDayFormat(str: string) {defaultOption.utils.dayFormat = str;},
        setDayOfWeekFormat(str: string) {defaultOption.utils.dayOfWeekFormat = str;},
        setHourFormat(str: string) {defaultOption.utils.hourFormat = str;},
        setHourMinuteFormat(str: string) {defaultOption.utils.hourMinuteFormat = str;},
        setMinuteFormat(str: string) {defaultOption.utils.minuteFormat = str;},
        setSecondFormat(str: string) {defaultOption.utils.secondFormat = str;},
        setNumberFormat(str: string) {defaultOption.utils.numberFormat = str;},
        setLESSOREQ_0X7FF_BYTE(num: number) {defaultOption.utils.LESSOREQ_0X7FF_BYTE = num;},
        setLESSOREQ_0XFFFF_BYTE(num: number) {defaultOption.utils.LESSOREQ_0XFFFF_BYTE = num;},
        setGREATER_0XFFFF_BYTE(num: number) {defaultOption.utils.GREATER_0XFFFF_BYTE = num;},
        getDateFormat() {return defaultOption.utils.dateFormat;},
        getTimeFormat() {return defaultOption.utils.timeFormat;},
        getDatetimeFormat() {return defaultOption.utils.datetimeFormat;},
        getYearFormat() {return defaultOption.utils.yearFormat;},
        getMonthFormat() {return defaultOption.utils.monthFormat;},
        getMonthNameFormat() {return defaultOption.utils.monthNameFormat;},
        getYearMonthFormat() {return defaultOption.utils.yearMonthFormat;},
        getDayFormat() {return defaultOption.utils.dayFormat;},
        getDayOfWeekFormat() {return defaultOption.utils.dayOfWeekFormat;},
        getHourFormat() {return defaultOption.utils.hourFormat;},
        getHourMinuteFormat() {return defaultOption.utils.hourMinuteFormat;},
        getMinuteFormat() {return defaultOption.utils.minuteFormat;},
        getSecondFormat() {return defaultOption.utils.secondFormat;},
        getNumberFormat() {return defaultOption.utils.numberFormat;},
        getLESSOREQ_0X7FF_BYTE() {return defaultOption.utils.LESSOREQ_0X7FF_BYTE;},
        getLESSOREQ_0XFFFF_BYTE() {return defaultOption.utils.LESSOREQ_0XFFFF_BYTE;},
        getGREATER_0XFFFF_BYTE() {return defaultOption.utils.GREATER_0XFFFF_BYTE;},
        setShieldURL(str: string) {defaultOption.shield.shieldURL = str;},
        setExposeIpList(arr: string[]) {defaultOption.shield.exposeIpList = arr;},
        setIsFreeze(bool: boolean) {defaultOption.shield.isFreeze = bool;},
        setIsPossibleGoBack(bool: boolean) {defaultOption.shield.isPossibleGoBack = bool;},
        setIsPossibleOpenDevTool(bool: boolean) {defaultOption.shield.isPossibleOpenDevTool = bool;},
        getShieldURL() {return defaultOption.shield.shieldURL;},
        getExposeIpList() {return defaultOption.shield.exposeIpList;},
        getIsFreeze() {return defaultOption.shield.isFreeze;},
        getIsPossibleGoBack() {return defaultOption.shield.isPossibleGoBack;},
        getIsPossibleOpenDevTool() {return defaultOption.shield.isPossibleOpenDevTool;},
        setConvertValue(func: ConvertValue) {defaultOption.data.convertValue = func;},
        setProtocol(str: string) {defaultOption.link.protocol = str;},
        setDomain(str: string) {defaultOption.link.domain = str;},
        setControllerPath(str: string) {defaultOption.link.controllerPath = str;},
        setTimeout(num: number) {defaultOption.link.timeout = num;},
        setWebSocketProtocol(str: string) {defaultOption.link.webSocketProtocol = str;},
        setWebSocketEndPoint(str: string) {defaultOption.link.webSocketEndPoint = str;},
        setCachingLimit(num: number) {defaultOption.link.cachingLimit = num;},
        getProtocol() {return defaultOption.link.protocol;},
        getDomain() {return defaultOption.link.domain;},
        getControllerPath() {return defaultOption.link.controllerPath;},
        getTimeout() {return defaultOption.link.timeout;},
        getWebSocketProtocol() {return defaultOption.link.webSocketProtocol;},
        getWebSocketEndPoint() {return defaultOption.link.webSocketEndPoint;},
        getCachingLimit() {return defaultOption.link.cachingLimit;},
        setBeforeGetRequst(func: BeforeGetRequst) {defaultOption.link.beforeGetRequst = func;},
        setBeforePostRequst(func: BeforePostRequst) {defaultOption.link.beforePostRequst = func},
        setBeforePutRequst(func: BeforePutRequst) {defaultOption.link.beforePutRequst = func},
        setBeforePatchRequst(func: BeforePatchRequst) {defaultOption.link.beforePatchRequst = func},
        setBeforeDeleteRequst(func: BeforeDeleteRequst) {defaultOption.link.beforeDeleteRequst = func},
        setInterceptApiResult(func: InterceptApiResult) {defaultOption.link.interceptApiResult = func},
        setInterceptApiError(func: InterceptApiError) {defaultOption.link.interceptApiError = func},

        utils : {
            isAlpha: hison.utils.isAlpha,
            isAlphaNumber: hison.utils.isAlphaNumber,
            isNumber: hison.utils.isNumber,
            isNumberSymbols: hison.utils.isNumberSymbols,
            isIncludeSymbols: hison.utils.isIncludeSymbols,
            isLowerAlpha: hison.utils.isLowerAlpha,
            isLowerAlphaAndNumber: hison.utils.isLowerAlphaAndNumber,
            isUpperAlpha: hison.utils.isUpperAlpha,
            isUpperAlphaNumber: hison.utils.isUpperAlphaNumber,
            isNumeric: hison.utils.isNumeric,
            isInteger: hison.utils.isInteger,
            isPositiveInteger: hison.utils.isPositiveInteger,
            isNegativeInteger: hison.utils.isNegativeInteger,
            isArray: hison.utils.isArray,
            isObject: hison.utils.isObject,
            isDate: hison.utils.isDate,
            isTime: hison.utils.isTime,
            isDatetime: hison.utils.isDatetime,
            isEmail: hison.utils.isEmail,
            isURL: hison.utils.isURL,
            isValidMask: hison.utils.isValidMask,
            getDateObject: hison.utils.getDateObject,
            getTimeObject: hison.utils.getTimeObject,
            getDatetimeObject: hison.utils.getDatetimeObject,
            addDate: hison.utils.addDate,
            getDateDiff: hison.utils.getDateDiff,
            getMonthName: hison.utils.getMonthName,
            getDateWithFormat: hison.utils.getDateWithFormat,
            getDayOfWeek: hison.utils.getDayOfWeek,
            getLastDay: hison.utils.getLastDay,
            getSysYear: hison.utils.getSysYear,
            getSysMonth: hison.utils.getSysMonth,
            getSysYearMonth: hison.utils.getSysYearMonth,
            getSysDay: hison.utils.getSysDay,
            getSysDayOfWeek: hison.utils.getSysDayOfWeek,
            getSysHour: hison.utils.getSysHour,
            getSysHourMinute: hison.utils.getSysHourMinute,
            getSysMinute: hison.utils.getSysMinute,
            getSysSecond: hison.utils.getSysSecond,
            getSysTime: hison.utils.getSysTime,
            getSysDate: hison.utils.getSysDate,
            getCeil: hison.utils.getCeil,
            getFloor: hison.utils.getFloor,
            getRound: hison.utils.getRound,
            getTrunc: hison.utils.getTrunc,
            getByteLength: hison.utils.getByteLength,
            getCutByteLength: hison.utils.getCutByteLength,
            getStringLenForm: hison.utils.getStringLenForm,
            getLpad: hison.utils.getLpad,
            getRpad: hison.utils.getRpad,
            getTrim: hison.utils.getTrim,
            getReplaceAll: hison.utils.getReplaceAll,
            nvl: hison.utils.nvl,
            getNumberFormat: hison.utils.getNumberFormat,
            getRemoveExceptNumbers: hison.utils.getRemoveExceptNumbers,
            getRemoveNumbers: hison.utils.getRemoveNumbers,
            getReverse: hison.utils.getReverse,
            getToBoolean: hison.utils.getToBoolean,
            getToNumber: hison.utils.getToNumber,
            getToFloat: hison.utils.getToFloat,
            getToInteger: hison.utils.getToInteger,
            getToString: hison.utils.getToString,
            getFileExtension: hison.utils.getFileExtension,
            getFileName: hison.utils.getFileName,
            getDecodeBase64: hison.utils.getDecodeBase64,
            getEncodeBase64: hison.utils.getEncodeBase64,
            deepCopyObject: hison.utils.deepCopyObject,
        },

        shield : {
            excute: hison.shield.excute,
        },
        
        data: hison.data,
        link: hison.link,
    }
}

export default createHison();