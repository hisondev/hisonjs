import type { DateObject, DateTimeObject, Hison, InterfaceDataWrapper, TimeObject } from "./types";
import { DataModel, DataWrapper } from "./data";
import { ApiDelete, ApiDeleteUrl, ApiGet, ApiGetUrl, ApiPatch, ApiPatchUrl, ApiPost, ApiPostUrl, ApiPut, ApiPutUrl, CachingModule } from "./link";
import { CustomOption } from "./options";
import { getShield } from "./shield";
import { getUtils } from "./utils";
import { AllDateTimeFormat, CountDateType, DateFormat, DateTimeFormat, DayFormat, DayOfWeekFormat, HourFormat, HourMinuteFormat, MinuteFormat, MonthFormat, SecondFormat, TimeFormat, YearFormat, YearMonthFormat } from "./enums";

export const customOption = new CustomOption();
class HisonCore {
    utils = getUtils();
    shield = getShield();
    data = {
        DataWrapper,
        DataModel
    };
    link = {
        CachingModule,
        ApiGet,
        ApiPost,
        ApiPut,
        ApiPatch,
        ApiDelete,
        ApiGetUrl,
        ApiPostUrl,
        ApiPutUrl,
        ApiPatchUrl,
        ApiDeleteUrl,
    };
};
export const hisonCore = new HisonCore();

/**
 * Creates and returns an instance of `Hison`, the core object of the `hisondev` solution.
 * 
 * ### **Overview**
 * The `createHison()` function **encapsulates the creation of the `Hison` object** using a **closure pattern**.
 * This ensures that:
 * - **Internal states remain private** while exposing necessary functionalities.
 * - **Methods are encapsulated**, preventing direct manipulation of internal logic.
 * - **Security and integrity** of configuration settings are preserved.
 * 
 * The returned `Hison` object serves as the **central interface** for configuration, security, utilities, 
 * structured data handling, and API communication.
 * 
 * ---
 * ### **Encapsulation with Closure**
 * - Internally, `createHison()` initializes a **`HisonCore` object**, which holds the actual implementations.
 * - The **returned object only exposes a selected set of methods**, ensuring safe interaction.
 * - This design provides **data encapsulation** and **prevents unintended modifications**.
 * 
 * ---
 * ### **Core Functionalities of `Hison`**
 * 
 * The `Hison` object provides a **modular and extensible API** with the following key components:
 * 
 * ### **1. Configuration Management**
 * - **Dynamic Customization**: Modify settings via setter methods (`setDateFormat()`, `setTimeFormat()`, etc.).
 * - **Character Encoding Configuration**: Adjust byte sizes for different character encodings.
 * - **Security Settings**: Enable object freezing, access restrictions, and debugging prevention.
 *
 * Example:
 * ```typescript
 * hison.setDateFormat("MM/dd/yyyy");
 * hison.setTimeFormat("HH:mm:ss");
 * hison.setCharByteLess2047(3);
 * ```
 *
 * ---
 * ### **2. Security & Access Control (`hison.shield`)**
 * - **Enforce object immutability** (`setIsFreeze(true)`).
 * - **Restrict access to specific URLs/IPs** (`setShieldURL()`, `setExposeIpList()`).
 * - **Prevent developer tool access** (`setIsPossibleOpenDevTool(false)`).
 *
 * Example:
 * ```typescript
 * hison.setIsFreeze(true);
 * hison.setShieldURL("https://secure.example.com");
 * hison.setExposeIpList(["192.168.1.1", "10.0.0.2"]);
 * ```
 *
 * ---
 * ### **3. Utility Functions (`hison.utils`)**
 * - **String Processing** (`isAlpha()`, `getLpad()`).
 * - **Number Formatting** (`getRound()`, `getNumberFormat()`).
 * - **Date Handling** (`getDateWithFormat()`).
 *
 * Example:
 * ```typescript
 * hison.utils.isAlpha("HelloWorld"); // true
 * hison.utils.getNumberFormat(1234.5678, "#,###.00"); // "1,234.57"
 * ```
 *
 * ---
 * ### **4. Structured Data Handling (`hison.data`)**
 * The `data` module provides structured data storage and manipulation tools:
 *
 * - **`DataWrapper`**: Key-value storage for flexible data management.
 * - **`DataModel`**: Table-based structure for handling tabular data.
 *
 * Example:
 * ```typescript
 * const wrapper = new hison.data.DataWrapper({ username: "Alice", age: 25 });
 * console.log(wrapper.getString("username")); // "Alice"
 * 
 * const model = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
 * console.log(model.getValue(0, "name")); // "Alice"
 * ```
 *
 * ---
 * ### **5. API Communication (`hison.link`)**
 * - **Simplified HTTP Requests** using promise-based networking.
 * - **Built-in caching** to optimize API performance.
 * - **WebSocket support** for real-time data updates.
 *
 * Example:
 * ```typescript
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 * apiPost.call(new hison.data.DataWrapper({ username: "Alice" })).then(response => {
 *     console.log(response.data);
 * });
 * ```
 *
 * ---
 * ### **Encapsulation Benefits**
 * - **Prevents direct access to internal states**.
 * - **Ensures safe API exposure** while protecting core logic.
 * - **Maintains clean separation between implementation and interface**.
 *
 * ---
 * ### **Summary**
 * The `createHison()` function returns an instance of `Hison`, a **comprehensive framework** for managing:
 * - Configuration settings
 * - Security controls
 * - Utility functions
 * - Structured data storage
 * - API communication
 *
 * Through **closure-based encapsulation**, `Hison` maintains **high security, modularity, and efficiency**.
 *
 * ---
 * @returns {Hison} An encapsulated `Hison` object with restricted direct access to core logic.
 */
export const createHison = (): Hison => {
    return {
        setDateFormat(str: (typeof DateFormat)[keyof typeof DateFormat]) {customOption.utils.dateFormat = str;},
        setTimeFormat(str: (typeof TimeFormat) [keyof typeof TimeFormat]) {customOption.utils.timeFormat = str;},
        setDatetimeFormat(str: (typeof DateTimeFormat) [keyof typeof DateTimeFormat]) {customOption.utils.datetimeFormat = str;},
        setYearFormat(str: (typeof YearFormat) [keyof typeof YearFormat]) {customOption.utils.yearFormat = str;},
        setMonthFormat(str: (typeof MonthFormat) [keyof typeof MonthFormat]) {customOption.utils.monthFormat = str;},
        setYearMonthFormat(str: (typeof YearMonthFormat) [keyof typeof YearMonthFormat]) {customOption.utils.yearMonthFormat = str;},
        setDayFormat(str: (typeof DayFormat) [keyof typeof DayFormat]) {customOption.utils.dayFormat = str;},
        setDayOfWeekFormat(str: (typeof DayOfWeekFormat) [keyof typeof DayOfWeekFormat]) {customOption.utils.dayOfWeekFormat = str;},
        setHourFormat(str: (typeof HourFormat) [keyof typeof HourFormat]) {customOption.utils.hourFormat = str;},
        setHourMinuteFormat(str: (typeof HourMinuteFormat) [keyof typeof HourMinuteFormat]) {customOption.utils.hourMinuteFormat = str;},
        setMinuteFormat(str: (typeof MinuteFormat) [keyof typeof MinuteFormat]) {customOption.utils.minuteFormat = str;},
        setSecondFormat(str: (typeof SecondFormat) [keyof typeof SecondFormat]) {customOption.utils.secondFormat = str;},
        setNumberFormat(str: string) {customOption.utils.numberFormat = str;},
        setCharByteLess2047(num: number) {customOption.utils.LESSOREQ_0X7FF_BYTE = num;},
        setCharByteLess65535(num: number) {customOption.utils.LESSOREQ_0XFFFF_BYTE = num;},
        setCharByteGreater65535(num: number) {customOption.utils.GREATER_0XFFFF_BYTE = num;},
        getDateFormat(): string {return customOption.utils.dateFormat;},
        getTimeFormat(): string {return customOption.utils.timeFormat;},
        getDatetimeFormat(): string {return customOption.utils.datetimeFormat;},
        getYearFormat(): string {return customOption.utils.yearFormat;},
        getMonthFormat(): string {return customOption.utils.monthFormat;},
        getYearMonthFormat(): string {return customOption.utils.yearMonthFormat;},
        getDayFormat(): string {return customOption.utils.dayFormat;},
        getDayOfWeekFormat(): string {return customOption.utils.dayOfWeekFormat;},
        getHourFormat(): string {return customOption.utils.hourFormat;},
        getHourMinuteFormat(): string {return customOption.utils.hourMinuteFormat;},
        getMinuteFormat(): string {return customOption.utils.minuteFormat;},
        getSecondFormat(): string {return customOption.utils.secondFormat;},
        getNumberFormat(): string {return customOption.utils.numberFormat;},
        getCharByteLess2047(): number {return customOption.utils.LESSOREQ_0X7FF_BYTE;},
        getCharByteLess65535(): number {return customOption.utils.LESSOREQ_0XFFFF_BYTE;},
        getCharByteGreater65535(): number {return customOption.utils.GREATER_0XFFFF_BYTE;},
        setShieldURL(str: string) {customOption.shield.shieldURL = str;},
        setExposeIpList(arr: string[]) {customOption.shield.exposeIpList = arr;},
        setIsFreeze(bool: boolean) {customOption.shield.isFreeze = bool;},
        setIsPossibleGoBack(bool: boolean) {customOption.shield.isPossibleGoBack = bool;},
        setIsPossibleOpenDevTool(bool: boolean) {customOption.shield.isPossibleOpenDevTool = bool;},
        setDoDetectDevTool(func: (() => void)) {customOption.shield.doDetectDevTool = func;},
        getShieldURL(): string {return customOption.shield.shieldURL;},
        getExposeIpList(): string[] {return customOption.shield.exposeIpList;},
        getIsFreeze(): boolean {return customOption.shield.isFreeze;},
        getIsPossibleGoBack(): boolean {return customOption.shield.isPossibleGoBack;},
        getIsPossibleOpenDevTool(): boolean {return customOption.shield.isPossibleOpenDevTool;},
        setConvertValue(func: (value: any) => any) {customOption.data.convertValue = func;},
        setProtocol(str: string) {customOption.link.protocol = str;},
        setDomain(str: string) {customOption.link.domain = str;},
        setControllerPath(str: string) {customOption.link.controllerPath = str;},
        setTimeout(num: number) {customOption.link.timeout = num;},
        setWebSocketProtocol(str: string) {customOption.link.webSocketProtocol = str;},
        setWebSocketEndPoint(str: string) {customOption.link.webSocketEndPoint = str;},
        setCachingLimit(num: number) {customOption.link.cachingLimit = num;},
        getProtocol(): string {return customOption.link.protocol;},
        getDomain(): string {return customOption.link.domain;},
        getControllerPath(): string {return customOption.link.controllerPath;},
        getTimeout(): number {return customOption.link.timeout;},
        getWebSocketProtocol(): string {return customOption.link.webSocketProtocol;},
        getWebSocketEndPoint(): string {return customOption.link.webSocketEndPoint;},
        getCachingLimit(): number {return customOption.link.cachingLimit;},
        setBeforeGetRequest(func: (resourcePath?: string, options?: Record<string, any>) => boolean | void) {customOption.link.beforeGetRequest = func;},
        setBeforePostRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePostRequest = func},
        setBeforePutRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePutRequest = func},
        setBeforePatchRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePatchRequest = func},
        setBeforeDeleteRequest(func: <T = InterfaceDataWrapper>(requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforeDeleteRequest = func},
        setAfterGetRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterGetRequest = func;},
        setAfterPostRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPostRequest = func},
        setAfterPutRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPutRequest = func},
        setAfterPatchRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPatchRequest = func},
        setAfterDeleteRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterDeleteRequest = func},
        setBeforeGetUrlRequest(func: (url?: string, options?: Record<string, any>) => boolean | void) {customOption.link.beforeGetUrlRequest = func;},
        setBeforePostUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePostUrlRequest = func},
        setBeforePutUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePutUrlRequest = func},
        setBeforePatchUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforePatchUrlRequest = func},
        setBeforeDeleteUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void) {customOption.link.beforeDeleteUrlRequest = func},
        setAfterGetUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterGetUrlRequest = func;},
        setAfterPostUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPostUrlRequest = func},
        setAfterPutUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPutUrlRequest = func},
        setAfterPatchUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterPatchUrlRequest = func},
        setAfterDeleteUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void) {customOption.link.afterDeleteUrlRequest = func},
        setInterceptApiResult(func: (result: any | undefined, response: Response) => boolean | void) {customOption.link.interceptApiResult = func},
        setInterceptApiError(func: (error: any) => boolean | void) {customOption.link.interceptApiError = func},
        utils : {
            isAlpha(str: string): boolean { return hisonCore.utils.isAlpha(str) },
            isAlphaNumber(str: string): boolean { return hisonCore.utils.isAlphaNumber(str) },
            isNumber(str: string): boolean { return hisonCore.utils.isNumber(str) },
            isNumberSymbols(str: string): boolean { return hisonCore.utils.isNumberSymbols(str) },
            isIncludeSymbols(str: string): boolean { return hisonCore.utils.isIncludeSymbols(str) },
            isLowerAlpha(str: string): boolean { return hisonCore.utils.isLowerAlpha(str) },
            isLowerAlphaAndNumber(str: string): boolean { return hisonCore.utils.isLowerAlphaAndNumber(str) },
            isUpperAlpha(str: string): boolean { return hisonCore.utils.isUpperAlpha(str) },
            isUpperAlphaNumber(str: string): boolean { return hisonCore.utils.isUpperAlphaNumber(str) },
            isNumeric(num: any): boolean { return hisonCore.utils.isNumeric(num) },
            isInteger(num: any): boolean { return hisonCore.utils.isInteger(num) },
            isPositiveInteger(num: any): boolean { return hisonCore.utils.isPositiveInteger(num) },
            isNegativeInteger(num: any): boolean { return hisonCore.utils.isNegativeInteger(num) },
            isArray(arr: any): boolean { return hisonCore.utils.isArray(arr) },
            isObject(obj: any): boolean { return hisonCore.utils.isObject(obj) },
            isDate(date: DateObject | string): boolean { return hisonCore.utils.isDate(date) },
            isTime(time: TimeObject | string): boolean { return hisonCore.utils.isTime(time) },
            isDatetime(datetime: DateTimeObject | string): boolean { return hisonCore.utils.isDatetime(datetime) },
            isEmail(str: string): boolean { return hisonCore.utils.isEmail(str) },
            isURL(str: string): boolean { return hisonCore.utils.isURL(str) },
            isValidMask(str: string, mask: string): boolean { return hisonCore.utils.isValidMask(str, mask) },
            formatDateDash(date: Date): string { return hisonCore.utils.formatDateDash(date) },
            formatDateCompact(date: Date): string { return hisonCore.utils.formatDateCompact(date) },
            getDateObject(date: Date | string): DateObject { return hisonCore.utils.getDateObject(date) },
            getTimeObject(time: Date | string): TimeObject { return hisonCore.utils.getTimeObject(time) },
            getDatetimeObject(datetime: Date | string): DateTimeObject | null { return hisonCore.utils.getDatetimeObject(datetime) },
            addDate(datetime: DateTimeObject | DateObject | string, addValue?: string | number, addType?: keyof typeof CountDateType, format?: keyof typeof AllDateTimeFormat): DateTimeObject | string { return hisonCore.utils.addDate(datetime, addValue, addType, format) },
            getDateDiff(datetime1: DateTimeObject | DateObject | string, datetime2: DateTimeObject | DateObject | string, diffType?: keyof typeof CountDateType): number { return hisonCore.utils.getDateDiff(datetime1, datetime2, diffType) },
            getMonthName(month: number | string, isFullName?: boolean): string { return hisonCore.utils.getMonthName(month, isFullName) },
            getDateWithFormat(datetime: DateTimeObject | DateObject | string, format?: keyof typeof AllDateTimeFormat): string { return hisonCore.utils.getDateWithFormat(datetime, format) },
            getDayOfWeek(date: DateObject | string, dayOfWeekType?: keyof typeof DayOfWeekFormat): string { return hisonCore.utils.getDayOfWeek(date, dayOfWeekType) },
            getLastDay(date: DateObject | string): number { return hisonCore.utils.getLastDay(date) },
            getSysYear(format?: keyof typeof YearFormat): string { return hisonCore.utils.getSysYear(format) },
            getSysMonth(format?: keyof typeof MonthFormat): string { return hisonCore.utils.getSysMonth(format) },
            getSysYearMonth(format?: keyof typeof YearMonthFormat): string { return hisonCore.utils.getSysYearMonth(format) },
            getSysDay(format?: keyof typeof DayFormat): string { return hisonCore.utils.getSysDay(format) },
            getSysDayOfWeek(format?: keyof typeof DayOfWeekFormat): string { return hisonCore.utils.getSysDayOfWeek(format) },
            getSysHour(format?: keyof typeof HourFormat): string { return hisonCore.utils.getSysHour(format) },
            getSysHourMinute(format?: keyof typeof HourMinuteFormat): string { return hisonCore.utils.getSysHourMinute(format) },
            getSysMinute(format?: keyof typeof MinuteFormat): string { return hisonCore.utils.getSysMinute(format) },
            getSysSecond(format?: keyof typeof SecondFormat): string { return hisonCore.utils.getSysSecond(format) },
            getSysTime(format?: keyof typeof TimeFormat): string { return hisonCore.utils.getSysTime(format) },
            getSysDate(format?: keyof typeof AllDateTimeFormat): string { return hisonCore.utils.getSysDate(format) },
            getCeil(num: number, precision?: number): number { return hisonCore.utils.getCeil(num, precision) },
            getFloor(num: number, precision?: number): number { return hisonCore.utils.getFloor(num, precision) },
            getRound(num: number, precision?: number): number { return hisonCore.utils.getRound(num, precision) },
            getTrunc(num: number, precision?: number): number { return hisonCore.utils.getTrunc(num, precision) },
            getByteLength(str: string): number { return hisonCore.utils.getByteLength(str) },
            getCutByteLength(str: string, cutByte: number): string { return hisonCore.utils.getCutByteLength(str, cutByte) },
            getStringLenForm(str: string, length: number): string { return hisonCore.utils.getStringLenForm(str, length) },
            getLpad(str: string, padStr: string, length: number): string { return hisonCore.utils.getLpad(str, padStr, length) },
            getRpad(str: string, padStr: string, length: number): string { return hisonCore.utils.getRpad(str, padStr, length) },
            getTrim(str: string): string { return hisonCore.utils.getTrim(str, ) },
            getReplaceAll(str: string, targetStr: string, replaceStr?: string): string { return hisonCore.utils.getReplaceAll(str, targetStr, replaceStr) },
            getNumberFormat(value: number, format?: string): string { return hisonCore.utils.getNumberFormat(value, format) },
            getRemoveExceptNumbers(str: string): string { return hisonCore.utils.getRemoveExceptNumbers(str) },
            getRemoveNumbers(str: string): string { return hisonCore.utils.getRemoveNumbers(str) },
            getReverse(str: string): string { return hisonCore.utils.getReverse(str) },
            getToBoolean(value: any): boolean { return hisonCore.utils.getToBoolean(value) },
            getToNumber(value: any, impossibleValue?: number): number { return hisonCore.utils.getToNumber(value, impossibleValue) },
            getToFloat(value: any, impossibleValue?: number): number { return hisonCore.utils.getToFloat(value, impossibleValue) },
            getToInteger(value: any, impossibleValue?: number): number { return hisonCore.utils.getToInteger(value, impossibleValue) },
            getToString(str: any, impossibleValue?: string): string { return hisonCore.utils.getToString(str, impossibleValue) },
            nvl(val: any, defaultValue: any): any { return hisonCore.utils.nvl(val, defaultValue) },
            getFileExtension(str: string): string { return hisonCore.utils.getFileExtension(str) },
            getFileName(str: string): string { return hisonCore.utils.getFileName(str) },
            getDecodeBase64(str: string): string { return hisonCore.utils.getDecodeBase64(str) },
            getEncodeBase64(str: string): string { return hisonCore.utils.getEncodeBase64(str) },
            deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any { return hisonCore.utils.deepCopyObject(object, visited) },
        },
        shield : {
            isHison: true,
            excute(hison: Hison) { hisonCore.shield.excute(hison) },
        },
        data: hisonCore.data,
        link: hisonCore.link,
    }
}

export default createHison();
