/**
 * The `Hison` object serves as the central interface for the `hisondev` solution, 
 * providing a comprehensive set of tools for handling configuration, security, 
 * data manipulation, and communication.
 *
 * The `Hison` object is designed to streamline development by offering:
 * - **Configuration Management**: Modify settings dynamically using setter methods.
 * - **Security Features**: Control access, enforce restrictions, and prevent unauthorized modifications.
 * - **Utility Functions**: Validate and process data using `hison.utils`.
 * - **Data Handling**: Utilize structured models for data storage and transformation.
 * - **Communication Support**: Simplify API requests with promise-based networking.
 *
 * ## Core Modules
 *
 * The `Hison` solution consists of the following primary components:
 *
 * - **hison.utils**: Provides various utility functions for data validation, formatting, and conversion.
 * - **hison.shield**: Implements security measures, including access control and developer tool restrictions.
 * - **hison.data**: Offers structured storage and transformation via `DataWrapper` and `DataModel`.
 * - **hison.link**: Enables promise-based communication and API request handling.
 *
 * ---
 * ## Object Creation and Encapsulation
 * - The `Hison` object is instantiated via the `createHison()` function, encapsulating its implementation within a closure.
 * - This design pattern ensures that internal states remain private while exposing necessary functionalities.
 * - The returned object includes a set of methods that allow developers to interact with `Hison` safely and efficiently.
 *
 * ---
 * ## Customization and Configuration
 *
 * `Hison` provides setter methods to modify `CustomOption` properties, allowing developers to configure behavior dynamically.
 *
 * ### Example: Updating Date and Time Formats
 * ```typescript
 * hison.setDateFormat("MM/dd/yyyy");
 * hison.setTimeFormat("HH:mm:ss");
 * hison.setDatetimeFormat("MM/dd/yyyy HH:mm");
 * ```
 *
 * ### Example: Adjusting Character Encoding Byte Sizes
 * ```typescript
 * hison.setCharByteLess2047(3);
 * hison.setCharByteLess65535(4);
 * hison.setCharByteGreater65535(5);
 * ```
 *
 * These configurations ensure compatibility with different project requirements, encoding formats, and locale settings.
 *
 * ---
 * ## Security Features
 *
 * The `hison.shield` module provides multiple layers of security, including:
 * - **Object Freezing** (`setIsFreeze(true)`) to prevent modifications.
 * - **Access Control by URL** (`setShieldURL(url)`) to restrict unauthorized entry.
 * - **IP-Based Access Restrictions** (`setExposeIpList(ipList)`) for controlled access.
 * - **Developer Tool Blocking** (`setIsPossibleOpenDevTool(false)`) to prevent debugging exploits.
 *
 * Example:
 * ```typescript
 * hison.setIsFreeze(true);
 * hison.setShieldURL("https://secure.example.com");
 * hison.setExposeIpList(["192.168.1.1", "10.0.0.2"]);
 * ```
 *
 * ---
 * ## Utility Functions (`hison.utils`)
 *
 * The `utils` module offers a variety of helper functions for validation, formatting, and data manipulation:
 *
 * ### String Validation & Manipulation
 * ```typescript
 * hison.utils.isAlpha("HelloWorld"); // true
 * hison.utils.getLpad("123", "0", 5); // "00123"
 * ```
 *
 * ### Number Formatting & Rounding
 * ```typescript
 * hison.utils.getRound(12.3456, 2); // 12.35
 * hison.utils.getNumberFormat(1234.5678, "#,###.00"); // "1,234.57"
 * ```
 *
 * ### Date Processing
 * ```typescript
 * hison.utils.getDateWithFormat("2025-02-05", "MMMM dd, yyyy"); // "February 5, 2025"
 * ```
 *
 * ---
 * ## Data Handling (`hison.data`)
 *
 * The `data` module provides structured storage via `DataWrapper` and `DataModel`:
 *
 * ```typescript
 * const wrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
 * console.log(wrapper.getString("name")); // "Alice"
 *
 * const model = new hison.data.DataModel([
 *     { id: 1, name: "Alice" },
 *     { id: 2, name: "Bob" }
 * ]);
 * console.log(model.getValue(0, "name")); // "Alice"
 * ```
 *
 * ---
 * ## API Communication (`hison.link`)
 *
 * The `link` module simplifies API interactions with promise-based requests:
 *
 * ```typescript
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 * apiPost.call(new hison.data.DataWrapper({ username: "Alice" })).then(response => {
 *     console.log(response.data);
 * });
 * ```
 *
 * The `hison.link` module also supports caching and WebSocket integration.
 *
 * ---
 * ## Summary
 *
 * The `Hison` object provides a robust and flexible framework for managing configurations, security, utilities, structured data, and communication.
 * It is designed to improve development efficiency while offering customization and security controls.
 */
interface Hison {
    //====================================================================================
    //option utils
    //====================================================================================
    /**
     * Sets the default format for displaying dates.
     *
     * This method updates the `dateFormat` property in `customOption`, 
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
     * This method updates the `timeFormat` property in `customOption`, 
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
    /**
     * Sets the default format for displaying date and time.
     *
     * This method updates the `datetimeFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting datetime values.
     *
     * - The new format will be applied globally to all datetime-related operations.
     * - Default value: `'yyyy-MM-dd hh:mm:ss'`
     * - Example output after setting format: `'02/04/2025 14:30'` (for `'MM/dd/yyyy HH:mm'`)
     *
     * ## Related Property
     * - **`datetimeFormat`**: Defines the default date-time format.
     *   - Default: `'yyyy-MM-dd hh:mm:ss'`
     *   - Example output: `'2025-02-04 14:30:15'`
     *
     * @param str The new datetime format string.
     */
    setDatetimeFormat(str: string): void;
    /**
     * Sets the default format for displaying the year.
     *
     * This method updates the `yearFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting year values.
     *
     * - The new format will be applied globally to all year-related operations.
     * - Default value: `'yyyy'`
     * - Example output after setting format: `'25'` (for `'yy'`)
     *
     * ## Related Property
     * - **`yearFormat`**: Defines the default year format.
     *   - Default: `'yyyy'`
     *   - Example output: `'2025'`
     *
     * @param str The new year format string.
     */
    setYearFormat(str: string): void;
    /**
     * Sets the default format for displaying the month.
     *
     * This method updates the `monthFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting month values.
     *
     * - The new format will be applied globally to all month-related operations.
     * - Default value: `'M'`
     * - Example output after setting format: `'02'` (for `'MM'`)
     *
     * ## Related Property
     * - **`monthFormat`**: Defines the default month format.
     *   - Default: `'M'`
     *   - Example output: `'2'` (for February)
     *
     * @param str The new month format string.
     */
    setMonthFormat(str: string): void;
    /**
     * Sets the default format for displaying the full month name.
     *
     * This method updates the `monthNameFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting month names.
     *
     * - The new format will be applied globally to all month-related operations.
     * - Default value: `'MMMM'`
     * - Example output after setting format: `'Feb'` (for `'MMM'`)
     *
     * ## Related Property
     * - **`monthNameFormat`**: Defines the default full month name format.
     *   - Default: `'MMMM'`
     *   - Example output: `'February'`
     *
     * @param str The new full month name format string.
     */
    setMonthNameFormat(str: string): void;
    /**
     * Sets the default format for displaying year and month.
     *
     * This method updates the `yearMonthFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting year-month values.
     *
     * - The new format will be applied globally to all year-month-related operations.
     * - Default value: `'yyyy-MM'`
     * - Example output after setting format: `'02/2025'` (for `'MM/yyyy'`)
     *
     * ## Related Property
     * - **`yearMonthFormat`**: Defines the default year and month format.
     *   - Default: `'yyyy-MM'`
     *   - Example output: `'2025-02'`
     *
     * @param str The new year-month format string.
     */
    setYearMonthFormat(str: string): void;
    /**
     * Sets the default format for displaying the day of the month.
     *
     * This method updates the `dayFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting day values.
     *
     * - The new format will be applied globally to all day-related operations.
     * - Default value: `'d'`
     * - Example output after setting format: `'04'` (for `'dd'`)
     *
     * ## Related Property
     * - **`dayFormat`**: Defines the default day format.
     *   - Default: `'d'`
     *   - Example output: `'4'` (for the 4th day of the month)
     *
     * @param str The new day format string.
     */
    setDayFormat(str: string): void;
    /**
     * Sets the default format for displaying the day of the week.
     *
     * This method updates the `dayOfWeekFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting day-of-week values.
     *
     * - The new format will be applied globally to all day-of-week-related operations.
     * - Default value: `'d'`
     * - Example output after setting format: `'Wed'` (for `'EEE'`)
     *
     * ## Related Property
     * - **`dayOfWeekFormat`**: Defines the default day-of-week format.
     *   - Default: `'d'`
     *   - Example output: `'3'` (where 3 represents Wednesday depending on locale settings)
     *
     * @param str The new day-of-week format string.
     */
    setDayOfWeekFormat(str: string): void;
    /**
     * Sets the default format for displaying the hour.
     *
     * This method updates the `hourFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting hour values.
     *
     * - The new format will be applied globally to all hour-related operations.
     * - Default value: `'h'`
     * - Example output after setting format: `'14'` (for `'HH'`)
     *
     * ## Related Property
     * - **`hourFormat`**: Defines the default hour format.
     *   - Default: `'h'`
     *   - Example output: `'2'` (for 2 AM or 2 PM, depending on the time format setting)
     *
     * @param str The new hour format string.
     */
    setHourFormat(str: string): void;
    /**
     * Sets the default format for displaying the hour and minute.
     *
     * This method updates the `hourMinuteFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting time values.
     *
     * - The new format will be applied globally to all hour-minute-related operations.
     * - Default value: `'hh:mm'`
     * - Example output after setting format: `'14:30'` (for `'HH:mm'`)
     *
     * ## Related Property
     * - **`hourMinuteFormat`**: Defines the default hour-minute format.
     *   - Default: `'hh:mm'`
     *   - Example output: `'02:30'` (for 2:30 AM or PM, depending on the time format setting)
     *
     * @param str The new hour-minute format string.
     */
    setHourMinuteFormat(str: string): void;
    /**
     * Sets the default format for displaying the minute.
     *
     * This method updates the `minuteFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting minute values.
     *
     * - The new format will be applied globally to all minute-related operations.
     * - Default value: `'m'`
     * - Example output after setting format: `'05'` (for `'mm'`)
     *
     * ## Related Property
     * - **`minuteFormat`**: Defines the default minute format.
     *   - Default: `'m'`
     *   - Example output: `'5'` (for the 5th minute of the hour)
     *
     * @param str The new minute format string.
     */
    setMinuteFormat(str: string): void;
    /**
     * Sets the default format for displaying the second.
     *
     * This method updates the `secondFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for parsing and formatting second values.
     *
     * - The new format will be applied globally to all second-related operations.
     * - Default value: `'s'`
     * - Example output after setting format: `'09'` (for `'ss'`)
     *
     * ## Related Property
     * - **`secondFormat`**: Defines the default second format.
     *   - Default: `'s'`
     *   - Example output: `'45'` (for the 45th second of the minute)
     *
     * @param str The new second format string.
     */
    setSecondFormat(str: string): void;
    /**
     * Sets the default format for displaying numbers.
     *
     * This method updates the `numberFormat` property in `customOption`, 
     * which is used throughout the `hisondev` solution for formatting numeric values.
     *
     * - The new format will be applied globally to all number-related operations.
     * - Default value: `"#,##0.##"`
     * - Example output after setting format: `"1.234,56"` (for `"#.###,##"` in European style)
     *
     * ## Related Property
     * - **`numberFormat`**: Defines the default number format.
     *   - Default: `"#,##0.##"`
     *   - Example output: `"1,234.56"` (for the number `1234.56`)
     *
     * @param str The new number format string.
     */
    setNumberFormat(str: string): void;
    /**
     * Sets the byte size for characters with a char code less than or equal to `0x7FF`.
     *
     * This method updates the `LESSOREQ_0X7FF_BYTE` property in `customOption`, 
     * which determines the number of bytes required to encode characters in this range.
     *
     * - The new value will be applied globally to all character encoding operations.
     * - Default value: `2`
     * - Example usage: `setCharByteLess2047(3);` (Changes encoding size to 3 bytes)
     *
     * ## Related Property
     * - **`LESSOREQ_0X7FF_BYTE`**: Defines the byte size for `charCode <= 0x7FF`.
     *   - Default: `2`
     *   - Represents characters with `charCode <= 0x7FF`
     *
     * @param num The new byte size for characters in this range.
     */
    setCharByteLess2047(num: number): void;
    /**
     * Sets the byte size for characters with a char code less than or equal to `0xFFFF`.
     *
     * This method updates the `LESSOREQ_0XFFFF_BYTE` property in `customOption`, 
     * which determines the number of bytes required to encode characters in this range.
     *
     * - The new value will be applied globally to all character encoding operations.
     * - Default value: `3`
     * - Example usage: `setCharByteLess65535(4);` (Changes encoding size to 4 bytes)
     *
     * ## Related Property
     * - **`LESSOREQ_0XFFFF_BYTE`**: Defines the byte size for `charCode <= 0xFFFF`.
     *   - Default: `3`
     *   - Represents characters with `charCode <= 0xFFFF`
     *
     * @param num The new byte size for characters in this range.
     */
    setCharByteLess65535(num: number): void;
    /**
     * Sets the byte size for characters with a char code greater than `0xFFFF`.
     *
     * This method updates the `GREATER_0XFFFF_BYTE` property in `customOption`, 
     * which determines the number of bytes required to encode characters in this range.
     *
     * - The new value will be applied globally to all character encoding operations.
     * - Default value: `4`
     * - Example usage: `setCharByteGreater65535(5);` (Changes encoding size to 5 bytes)
     *
     * ## Related Property
     * - **`GREATER_0XFFFF_BYTE`**: Defines the byte size for `charCode > 0xFFFF`.
     *   - Default: `4`
     *   - Represents characters with `charCode > 0xFFFF`
     *
     * @param num The new byte size for characters in this range.
     */
    setCharByteGreater65535(num: number): void;
    /**
     * Returns the currently set default date format.
     *
     * This method retrieves the value of `dateFormat` from `customOption`.
     *
     * @returns The current date format string.
     */
    getDateFormat(): string;
    /**
     * Returns the currently set default time format.
     *
     * This method retrieves the value of `timeFormat` from `customOption`.
     *
     * @returns The current time format string.
     */
    getTimeFormat(): string;
    /**
     * Returns the currently set default datetime format.
     *
     * This method retrieves the value of `datetimeFormat` from `customOption`.
     *
     * @returns The current datetime format string.
     */
    getDatetimeFormat(): string;
    /**
     * Returns the currently set default year format.
     *
     * This method retrieves the value of `yearFormat` from `customOption`.
     *
     * @returns The current year format string.
     */
    getYearFormat(): string;
    /**
     * Returns the currently set default month format.
     *
     * This method retrieves the value of `monthFormat` from `customOption`.
     *
     * @returns The current month format format string.
     */
    getMonthFormat(): string;
    /**
     * Returns the currently set default month name format.
     *
     * This method retrieves the value of `monthNameFormat` from `customOption`.
     *
     * @returns The current month name format string.
     */
    getMonthNameFormat(): string;
    /**
     * Returns the currently set default year month format.
     *
     * This method retrieves the value of `yearMonthFormat` from `customOption`.
     *
     * @returns The current year month format string.
     */
    getYearMonthFormat(): string;
    /**
     * Returns the currently set default day format.
     *
     * This method retrieves the value of `dayFormat` from `customOption`.
     *
     * @returns The current day format string.
     */
    getDayFormat(): string;
    /**
     * Returns the currently set default day of week format.
     *
     * This method retrieves the value of `dayOfWeekFormat` from `customOption`.
     *
     * @returns The current day of week format string.
     */
    getDayOfWeekFormat(): string;
    /**
     * Returns the currently set default hour format.
     *
     * This method retrieves the value of `hourFormat` from `customOption`.
     *
     * @returns The current hour format string.
     */
    getHourFormat(): string;
    /**
     * Returns the currently set default hour minute format.
     *
     * This method retrieves the value of `hourMinuteFormat` from `customOption`.
     *
     * @returns The current hour minute format string.
     */
    getHourMinuteFormat(): string;
    /**
     * Returns the currently set default mibute format.
     *
     * This method retrieves the value of `minuteFormat` from `customOption`.
     *
     * @returns The current mibute format string.
     */
    getMinuteFormat(): string;
    /**
     * Returns the currently set default second format.
     *
     * This method retrieves the value of `secondFormat` from `customOption`.
     *
     * @returns The current second format string.
     */
    getSecondFormat(): string;
    /**
     * Returns the currently set default number format.
     *
     * This method retrieves the value of `numberFormat` from `customOption`.
     *
     * @returns The current number format string.
     */
    getNumberFormat(): string;
    /**
    * Returns the currently set byte size for characters with a char code less than or equal to `0x7FF`.
    *
    * This method retrieves the value of `LESSOREQ_0X7FF_BYTE` from `customOption`.
    *
    * @returns The byte size for `charCode <= 0x7FF`.
    */
    getCharByteLess2047(): number;
    /**
    * Returns the currently set byte size for characters with a char code less than or equal to `0xFFFF`.
    *
    * This method retrieves the value of `LESSOREQ_0XFFFF_BYTE` from `customOption`.
    *
    * @returns The byte size for `charCode <= 0xFFFF`.
    */
    getCharByteLess65535(): number;
    /**
     * Returns the currently set byte size for characters with a char code greater than `0xFFFF`.
     *
     * This method retrieves the value of `GREATER_0XFFFF_BYTE` from `customOption`.
     *
     * @returns The byte size for `charCode > 0xFFFF`.
     */
    getCharByteGreater65535(): number;

    //====================================================================================
    //option shield
    //====================================================================================
    /**
     * Sets the security service URL used to enforce access restrictions.
     *
     * This method updates the `shieldURL` property in `customOption`, 
     * which is used throughout the `hisondev` solution to validate access to the system.
     *
     * - If set, the system verifies whether the current location matches the specified URL.
     * - If the URL does not match, access may be restricted.
     * - Default value: `""` (empty string, meaning no restriction)
     * - Example usage: `setShieldURL("https://secure.example.com");`
     *
     * ## Related Property
     * - **`shieldURL`**: Defines the security enforcement URL.
     *   - Default: `""`
     *   - Used in `shield.excute(hison: Hison)` to validate URL access.
     *
     * @param str The new security service URL.
     */
    setShieldURL(str: string): void;
    /**
     * Sets the list of IP addresses that are allowed to bypass security restrictions.
     *
     * This method updates the `exposeIpList` property in `customOption`, 
     * which is used throughout the `hisondev` solution to define a whitelist of trusted IPs.
     *
     * - Only IPs in this list will be granted access when security restrictions are enabled.
     * - Default value: `["0:0:0:0:0:0:0:1"]` (allows localhost)
     * - Example usage: `setExposeIpList(["192.168.1.1", "203.0.113.45"]);`
     *
     * ## Related Property
     * - **`exposeIpList`**: Defines the list of allowed IP addresses.
     *   - Default: `["0:0:0:0:0:0:0:1"]`
     *   - Used in `shield.excute(hison: Hison)` to verify access permissions.
     *
     * @param arr An array of IP addresses to be added to the whitelist.
     */
    setExposeIpList(arr: string[]): void;
    /**
     * Sets whether the `Hison` instance should be frozen to prevent modifications.
     *
     * This method updates the `isFreeze` property in `customOption`, 
     * which determines whether the `Hison` object and its properties should be deeply frozen.
     *
     * - If `true`, `Object.freeze()` is applied to prevent modifications.
     * - Default value: `true`
     * - Example usage: `setIsFreeze(false);` (Allows modifications to the `Hison` instance)
     *
     * ## Related Property
     * - **`isFreeze`**: Determines if the `Hison` object should be frozen.
     *   - Default: `true`
     *   - Used in `shield.excute(hison: Hison)`, where `deepFreeze(hison)` is applied.
     *
     * @param bool A boolean indicating whether the `Hison` instance should be frozen.
     */
    setIsFreeze(bool: boolean): void;
    /**
     * Sets whether the browser's back navigation is allowed.
     *
     * This method updates the `isPossibleGoBack` property in `customOption`, 
     * which determines if users can navigate back in their browser history.
     *
     * - If `false`, a mechanism is implemented to prevent the user from navigating back.
     * - Default value: `false`
     * - Example usage: `setIsPossibleGoBack(true);` (Allows back navigation)
     *
     * ## Related Property
     * - **`isPossibleGoBack`**: Determines if browser back navigation is allowed.
     *   - Default: `false`
     *     to disable the back button.
     *
     * @param bool A boolean indicating whether back navigation is allowed.
     */
    setIsPossibleGoBack(bool: boolean): void;
    /**
     * Sets whether developer tools can be opened.
     *
     * This method updates the `isPossibleOpenDevTool` property in `customOption`, 
     * which determines if browser developer tools should be restricted.
     *
     * - If `false`, an event listener is added to detect developer mode access 
     *   (e.g., F12 key, browser dev tools, resizing).
     * - Default value: `false`
     * - Example usage: `setIsPossibleOpenDevTool(true);` (Allows developer tools to be opened)
     *
     * ## Related Property
     * - **`isPossibleOpenDevTool`**: Determines if developer tools can be opened.
     *   - Default: `false`
     *
     * @param bool A boolean indicating whether developer tools can be opened.
     */
    setIsPossibleOpenDevTool(bool: boolean): void;
    /**
     * Returns the currently set security service URL.
     *
     * This method retrieves the value of `shieldURL` from `customOption`.
     *
     * @returns The current security service URL.
     */
    getShieldURL(): string;
    /**
     * Returns the list of IP addresses allowed to bypass security restrictions.
     *
     * This method retrieves the value of `exposeIpList` from `customOption`.
     *
     * @returns An array of allowed IP addresses.
     */
    getExposeIpList(): string[];
    /**
     * Returns whether the `Hison` instance is frozen to prevent modifications.
     *
     * This method retrieves the value of `isFreeze` from `customOption`.
     *
     * @returns `true` if the `Hison` instance is frozen, otherwise `false`.
     */
    getIsFreeze(): boolean;
    /**
     * Returns whether browser back navigation is allowed.
     *
     * This method retrieves the value of `isPossibleGoBack` from `customOption`.
     *
     * @returns `true` if back navigation is allowed, otherwise `false`.
     */
    getIsPossibleGoBack(): boolean;
    /**
     * Returns whether developer tools can be opened.
     *
     * This method retrieves the value of `isPossibleOpenDevTool` from `customOption`.
     *
     * @returns `true` if developer tools can be opened, otherwise `false`.
     */
    getIsPossibleOpenDevTool(): boolean;
    
    //====================================================================================
    //option data
    //====================================================================================
    /**
     * Sets the function used to convert special values before they are inserted into the `DataModel`.
     *
     * This method updates the `convertValue` property in `customOption`, 
     * allowing developers to define a custom transformation for specific objects like `Date` 
     * before they are stored in a `DataModel`. By default, values are inserted as-is.
     *
     * - The new function will be applied globally to all `DataModel` insertions.
     * - Default behavior: Returns the input value unchanged.
     * - Example use case: Formatting `Date` objects before storage.
     *
     * ## Related Property
     * - **`convertValue`**: Defines a function for transforming special values.
     *   - Default: Returns the value unchanged.
     *   - Used in `DataModel._deepCopy()` to handle non-plain objects.
     *
     * ## Example Usage:
     * ```typescript
     * setConvertValue(function(value) {
     *     if (value instanceof Date) {
     *         let year = value.getFullYear();
     *         let month = ('0' + (value.getMonth() + 1)).slice(-2);
     *         let day = ('0' + value.getDate()).slice(-2);
     *         let hour = ('0' + value.getHours()).slice(-2);
     *         let minute = ('0' + value.getMinutes()).slice(-2);
     *         let second = ('0' + value.getSeconds()).slice(-2);
     *         return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
     *     }
     *     return value;
     * });
     * ```
     *
     * ## Notes:
     * 1. Special values not processed by `convertValue` are stored in the `DataModel` as references.
     *    Changes to the original object will also reflect in the `DataModel`.
     * 2. Ensure the function returns the original value for all cases not explicitly handled.
     *    This prevents unexpected `undefined` values in the `DataModel`.
     *
     * @param func The function used to transform values before they are stored in `DataModel`.
     */
    setConvertValue(func: ConvertValue): void;

    //====================================================================================
    //option link
    //====================================================================================
    /**
     * Sets the default protocol for API communication.
     *
     * This method updates the `protocol` property in `customOption`, 
     * which is used throughout the `hisondev` solution to construct request URLs.
     *
     * - The new protocol will be applied globally to all API requests.
     * - Default value: `'http://'`
     * - Example usage: `setProtocol("https://");` (Switches API communication to HTTPS)
     *
     * ## Related Property
     * - **`protocol`**: Defines the default protocol for API requests.
     *   - Default: `'http://'`
     *   - Used in `ApiLink` to construct full request URLs.
     *
     * @param str The new protocol string (e.g., `'http://'` or `'https://'`).
     */
    setProtocol(str: string): void;
    /**
     * Sets the default domain for API requests.
     *
     * This method updates the `domain` property in `customOption`, 
     * which is used throughout the `hisondev` solution to construct request URLs.
     *
     * - The new domain will be applied globally to all API requests.
     * - Default value: `'localhost:8080'`
     * - Example usage: `setDomain("api.example.com");` (Changes the API domain to `api.example.com`)
     *
     * ## Related Property
     * - **`domain`**: Defines the default domain for API requests.
     *   - Default: `'localhost:8080'`
     *   - Used in `ApiLink` to construct full request URLs.
     *
     * @param str The new domain string (e.g., `'api.example.com'` or `'192.168.1.100:3000'`).
     */
    setDomain(str: string): void;
    /**
     * Sets the default controller path for API requests.
     *
     * This method updates the `controllerPath` property in `customOption`, 
     * which is used throughout the `hisondev` solution to construct request URLs.
     *
     * - The new controller path will be applied globally to all API requests.
     * - Default value: `'/hison-api-link'`
     * - Example usage: `setControllerPath("/api/v1");` (Changes the API path to `/api/v1`)
     *
     * ## Related Property
     * - **`controllerPath`**: Defines the default API controller path.
     *   - Default: `'/hison-api-link'`
     *   - Used in `ApiLink` to construct full request URLs.
     *
     * @param str The new controller path string (e.g., `'/api'`).
     */
    setControllerPath(str: string): void;
    /**
     * Sets the default timeout duration for API requests.
     *
     * This method updates the `timeout` property in `customOption`, 
     * which determines the maximum time (in milliseconds) an API request can take before being aborted.
     *
     * - The new timeout will be applied globally to all API requests.
     * - Default value: `10000` (10 seconds)
     * - Example usage: `setTimeout(5000);` (Sets the timeout to 5 seconds)
     *
     * ## Related Property
     * - **`timeout`**: Defines the request timeout duration in milliseconds.
     *   - Default: `10000`
     *
     * @param num The new timeout duration in milliseconds.
     */
    setTimeout(num: number): void;
    /**
     * Sets the default protocol for WebSocket communication.
     *
     * This method updates the `webSocketProtocol` property in `customOption`, 
     * which is used throughout the `hisondev` solution to establish WebSocket connections.
     *
     * - The new protocol will be applied globally to all WebSocket connections.
     * - Default value: `'ws://'`
     * - Example usage: `setWebSocketProtocol("wss://");` (Switches WebSocket communication to a secure protocol)
     *
     * ## Related Property
     * - **`webSocketProtocol`**: Defines the default protocol for WebSocket connections.
     *   - Default: `'ws://'`
     *   - Used in `ApiLink` when initializing WebSocket communication.
     *
     * @param str The new WebSocket protocol string (e.g., `'ws://'` or `'wss://'`).
     */
    setWebSocketProtocol(str: string): void;
    /**
     * Sets the default WebSocket endpoint for real-time communication.
     *
     * This method updates the `webSocketEndPoint` property in `customOption`, 
     * which is used throughout the `hisondev` solution to establish WebSocket connections.
     *
     * - The new endpoint will be applied globally to all WebSocket connections.
     * - Default value: `'hison-websocket-endpoint'`
     * - Example usage: `setWebSocketEndPoint("/ws/data-stream");` (Changes the WebSocket endpoint)
     *
     * ## Related Property
     * - **`webSocketEndPoint`**: Defines the default WebSocket endpoint for API communication.
     *   - Default: `'hison-websocket-endpoint'`
     *   - Used in `ApiLink` when establishing WebSocket connections.
     *
     * @param str The new WebSocket endpoint string (e.g., `'/ws/data-stream'` or `'/ws/notifications'`).
     */
    setWebSocketEndPoint(str: string): void;
    /**
     * Sets the caching limit for stored API responses.
     *
     * This method updates the `cachingLimit` property in `customOption`, 
     * which determines the maximum number of cached API responses before older ones are removed.
     *
     * - The new caching limit will be applied globally to all API request caching.
     * - Default value: `10`
     * - Example usage: `setCachingLimit(20);` (Increases the caching limit to 20 responses)
     *
     * ## Related Property
     * - **`cachingLimit`**: Defines the maximum number of cached API responses.
     *   - Default: `10`
     *
     * @param num The new caching limit.
     */
    setCachingLimit(num: number): void;
    /**
     * Returns the currently set default protocol for API communication.
     *
     * This method retrieves the value of `protocol` from `customOption`.
     *
     * @returns The current protocol string (e.g., `'http://'` or `'https://'`).
     */
    getProtocol(): string;
    /**
     * Returns the currently set default domain for API requests.
     *
     * This method retrieves the value of `domain` from `customOption`.
     *
     * @returns The current domain string.
     */
    getDomain(): string;
    /**
     * Returns the currently set default controller path for API requests.
     *
     * This method retrieves the value of `controllerPath` from `customOption`.
     *
     * @returns The current controller path string.
     */
    getControllerPath(): string;
    /**
     * Returns the currently set timeout duration for API requests.
     *
     * This method retrieves the value of `timeout` from `customOption`.
     *
     * @returns The current timeout duration in milliseconds.
     */
    getTimeout(): number;
    /**
     * Returns the currently set default protocol for WebSocket communication.
     *
     * This method retrieves the value of `webSocketProtocol` from `customOption`.
     *
     * @returns The current WebSocket protocol string (e.g., `'ws://'` or `'wss://'`).
     */
    getWebSocketProtocol(): string;
    /**
     * Returns the currently set default WebSocket endpoint.
     *
     * This method retrieves the value of `webSocketEndPoint` from `customOption`.
     *
     * @returns The current WebSocket endpoint string.
     */
    getWebSocketEndPoint(): string;
    /**
     * Returns the currently set caching limit for stored API responses.
     *
     * This method retrieves the value of `cachingLimit` from `customOption`.
     *
     * @returns The maximum number of cached API responses.
     */
    getCachingLimit(): number;
    /**
     * Sets the hook function that executes before making a `GET` request.
     *
     * This method updates the `beforeGetRequst` property in `customOption`, 
     * allowing developers to intercept or modify `GET` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `GET` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ## Related Property
     * - **`beforeGetRequst`**: A hook function executed before a `GET` request.
     *   - Default: Returns `true`
     *   - Used in `ApiGet.call()` to determine if a request should proceed.
     *
     * ## Example Usage:
     * ```typescript
     * setBeforeGetRequst((resourcePath, options) => {
     *     console.log("GET request intercepted:", resourcePath);
     *     return resourcePath.startsWith("/secure/") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `GET` request. Returning `false` cancels the request.
     */
    setBeforeGetRequst(func: BeforeGetRequst): void;
    /**
     * Sets the hook function that executes before making a `POST` request.
     *
     * This method updates the `beforePostRequst` property in `customOption`, 
     * allowing developers to intercept or modify `POST` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `POST` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ## Related Property
     * - **`beforePostRequst`**: A hook function executed before a `POST` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPost.call()` to determine if a request should proceed.
     *
     * ## Example Usage:
     * ```typescript
     * setBeforePostRequst((requestDw, options) => {
     *     console.log("POST request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("secureData") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `POST` request. Returning `false` cancels the request.
     */
    setBeforePostRequst(func: BeforePostRequst): void;
    /**
     * Sets the hook function that executes before making a `PUT` request.
     *
     * This method updates the `beforePutRequst` property in `customOption`, 
     * allowing developers to intercept or modify `PUT` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `PUT` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ## Related Property
     * - **`beforePutRequst`**: A hook function executed before a `PUT` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPut.call()` to determine if a request should proceed.
     *
     * ## Example Usage:
     * ```typescript
     * setBeforePutRequst((requestDw, options) => {
     *     console.log("PUT request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("readOnly") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `PUT` request. Returning `false` cancels the request.
     */
    setBeforePutRequst(func: BeforePutRequst): void;
    /**
     * Sets the hook function that executes before making a `PATCH` request.
     *
     * This method updates the `beforePatchRequst` property in `customOption`, 
     * allowing developers to intercept or modify `PATCH` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `PATCH` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ## Related Property
     * - **`beforePatchRequst`**: A hook function executed before a `PATCH` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPatch.call()` to determine if a request should proceed.
     *
     * ## Example Usage:
     * ```typescript
     * setBeforePatchRequst((requestDw, options) => {
     *     console.log("PATCH request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("lockedField") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `PATCH` request. Returning `false` cancels the request.
     */
    setBeforePatchRequst(func: BeforePatchRequst): void;
    /**
     * Sets the hook function that executes before making a `DELETE` request.
     *
     * This method updates the `beforeDeleteRequst` property in `customOption`, 
     * allowing developers to intercept or modify `DELETE` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `DELETE` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ## Related Property
     * - **`beforeDeleteRequst`**: A hook function executed before a `DELETE` request.
     *   - Default: Returns `true`
     *   - Used in `ApiDelete.call()` to determine if a request should proceed.
     *
     * ## Example Usage:
     * ```typescript
     * setBeforeDeleteRequst((requestDw, options) => {
     *     console.log("DELETE request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("protected") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `DELETE` request. Returning `false` cancels the request.
     */
    setBeforeDeleteRequst(func: BeforeDeleteRequst): void;
    /**
     * Sets the function that intercepts and processes API responses before returning them to the caller.
     *
     * This method updates the `interceptApiResult` property in `customOption`, 
     * allowing developers to handle API responses globally before they are processed.
     *
     * - If the function returns `false`, the response will be ignored.
     * - The new function will be applied globally to all API responses.
     * - Default behavior: Returns `true`, allowing the response to be processed normally.
     *
     * ## Related Property
     * - **`interceptApiResult`**: A hook function executed after receiving an API response.
     *   - Default: Returns `true`
     *   - Used in `ApiLink._request()` to determine if the response should be processed.
     *
     * ## Example Usage:
     * ```typescript
     * setInterceptApiResult((result, response) => {
     *     console.log("API response intercepted:", result);
     *     return response.status === 200 ? true : false;
     * });
     * ```
     *
     * @param func A function to execute after receiving an API response. Returning `false` cancels further processing.
     */
    setInterceptApiResult(func: InterceptApiResult): void;
    /**
     * Sets the function that intercepts and processes API errors before returning them to the caller.
     *
     * This method updates the `interceptApiError` property in `customOption`, 
     * allowing developers to handle API errors globally before they are processed.
     *
     * - If the function returns `false`, the error will be ignored.
     * - The new function will be applied globally to all API error responses.
     * - Default behavior: Returns `true`, allowing the error to be processed normally.
     *
     * ## Related Property
     * - **`interceptApiError`**: A hook function executed when an API request encounters an error.
     *   - Default: Returns `true`
     *   - Used in `ApiLink._request()` to determine if the error should be processed.
     *
     * ## Example Usage:
     * ```typescript
     * setInterceptApiError((error) => {
     *     console.error("API error intercepted:", error);
     *     return error.message.includes("timeout") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute when an API error occurs. Returning `false` cancels further error handling.
     */
    setInterceptApiError(func: InterceptApiError): void;

    //====================================================================================
    //utils
    //====================================================================================
    /**
     * Provides a collection of utility functions for validation, formatting, and data manipulation within `Hison`.
     *
     * The `utils` module includes a wide range of helper functions designed to simplify working with strings, numbers,
     * dates, and structured data. Additionally, it integrates with `CustomOption`, allowing developers to customize
     * key configurations such as date formats, numeric precision, and byte encoding rules.
     *
     * ---
     * ## Core Features & Functionality
     *
     * ### 1. **Configurable Utility Behaviors**
     * - Many utility functions reference properties in `CustomOption`, which can be modified using `Hison`'s `set` methods.
     * - Example: `getCutByteLength()` uses `customOption.GREATER_0XFFFF_BYTE`, which can be adjusted via:
     *   ```typescript
     *   hison.setCharByteGreater65535(5);
     *   ```
     * - This approach ensures adaptability to different encoding formats (e.g., UTF-8, UTF-16, UTF-32).
     *
     * ### 2. **String Validation & Manipulation**
     * - **Character Type Checks**: `isAlpha()`, `isNumber()`, `isEmail()`, `isURL()` validate string content.
     * - **String Formatting**: `getLpad()`, `getRpad()`, `getReplaceAll()` enable flexible formatting.
     * - **Encoding & Decoding**: Supports `Base64` operations with `getEncodeBase64()` and `getDecodeBase64()`.
     *
     * ### 3. **Numeric Operations**
     * - **Rounding & Truncation**: Functions like `getCeil()`, `getFloor()`, `getRound()`, and `getTrunc()` offer fine-grained control.
     * - **Number Formatting**: `getNumberFormat()` applies formatting rules, which can be adjusted using:
     *   ```typescript
     *   hison.setNumberFormat("#,###.00");
     *   ```
     * - **Type Conversion**: `getToNumber()`, `getToFloat()`, `getToInteger()` ensure safe and predictable data transformation.
     *
     * ### 4. **Date & Time Processing**
     * - **Parsing & Formatting**: Converts date/time strings to structured objects (`getDateObject()`, `getTimeObject()`).
     * - **Date Arithmetic**: Supports adding and subtracting time values (`addDate()`, `getDateDiff()`).
     * - **System Date/Time Retrieval**: Methods like `getSysDate()`, `getSysYear()`, and `getSysDayOfWeek()` return system values.
     * - **Customizable Formats**: Date and time formats are configurable via:
     *   ```typescript
     *   hison.setDateFormat("MM/dd/yyyy");
     *   hison.setTimeFormat("HH:mm:ss");
     *   ```
     *
     * ### 5. **Data Structure Handling**
     * - **Object & Array Validation**: `isArray()`, `isObject()`, and `deepCopyObject()` facilitate structured data manipulation.
     * - **File Operations**: Extract metadata with `getFileExtension()` and `getFileName()`.
     *
     * ---
     * ## Integration with `CustomOption`
     * Many methods in `hison.utils` utilize configurable properties from `CustomOption.utils`. These properties can be modified
     * using `Hison`'s setter methods to accommodate different project requirements.
     *
     * ### Example: Modifying Byte Length for Encoding
     * - The default encoding size for characters is determined by:
     *   - `LESSOREQ_0X7FF_BYTE` (default: `2`)
     *   - `LESSOREQ_0XFFFF_BYTE` (default: `3`)
     *   - `GREATER_0XFFFF_BYTE` (default: `4`)
     * - These values impact functions like `getByteLength()` and `getCutByteLength()`.
     * - Developers can modify these settings as follows:
     *   ```typescript
     *   hison.setCharByteLess2047(3);
     *   hison.setCharByteLess65535(4);
     *   hison.setCharByteGreater65535(5);
     *   ```
     *
     * ---
     * ## Related Utility Methods
     * - `hison.utils.isAlpha(str: string): boolean` → Checks if a string contains only alphabetic characters.
     * - `hison.utils.getDateWithFormat(datetime: DateTimeObject | string, format: string): string` → Formats a date.
     * - `hison.utils.getByteLength(str: string): number` → Computes byte length using configurable encoding settings.
     * - `hison.utils.getRound(num: number, precision: number): number` → Rounds a number to a specified precision.
     *
     * @example
     * // Validate a string
     * hison.utils.isNumber("12345"); // true
     *
     * // Format a date using a custom format
     * hison.setDateFormat("MM/dd/yyyy");
     * hison.utils.getDateWithFormat("2025-02-05", "MM/dd/yyyy"); // "02/05/2025"
     *
     * // Change default encoding settings
     * hison.setCharByteGreater65535(5);
     * console.log(hison.utils.getByteLength("𐍈")); // Uses updated byte length
     */
    utils: {
        /**
         * Checks if the given string contains only alphabetic characters (A-Z, a-z).
         *
         * - Returns `true` if the string consists solely of alphabetic characters.
         * - Returns `false` if the string contains numbers, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only alphabetic characters, otherwise `false`.
         *
         * @example
         * isAlpha("Hello"); // true
         * isAlpha("Hello123"); // false
         * isAlpha("!@#"); // false
         */
        isAlpha(str: string): boolean
        /**
         * Checks if the given string contains only alphabetic characters (A-Z, a-z) and numbers (0-9).
         *
         * - Returns `true` if the string consists solely of alphabetic characters and/or numbers.
         * - Returns `false` if the string contains symbols or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only alphabetic characters and numbers, otherwise `false`.
         *
         * @example
         * isAlphaNumber("Hello123"); // true
         * isAlphaNumber("Hello!"); // false
         * isAlphaNumber("123"); // true
         */
        isAlphaNumber(str: string): boolean
        /**
         * Checks if the given string contains only numeric characters (0-9).
         *
         * - Returns `true` if the string consists solely of numbers.
         * - Returns `false` if the string contains letters, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only numeric characters, otherwise `false`.
         *
         * @example
         * isNumber("123456"); // true
         * isNumber("123a"); // false
         * isNumber("!@#"); // false
         */
        isNumber(str: string): boolean
        /**
         * Checks if the given string contains only numeric characters (0-9) and symbols.
         *
         * - Returns `true` if the string consists solely of numbers and/or symbols.
         * - Returns `false` if the string contains alphabetic characters or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only numeric characters and symbols, otherwise `false`.
         *
         * @example
         * isNumberSymbols("123!@#"); // true
         * isNumberSymbols("123ABC"); // false
         * isNumberSymbols("!@#$%^"); // true
         */
        isNumberSymbols(str: string): boolean
        /**
         * Checks if the given string contains any symbols.
         *
         * - Returns `true` if the string contains at least one symbol.
         * - Returns `false` if the string has only alphanumeric characters or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains symbols, otherwise `false`.
         *
         * @example
         * isIncludeSymbols("Hello!"); // true
         * isIncludeSymbols("123"); // false
         * isIncludeSymbols("password@123"); // true
         */
        isIncludeSymbols(str: string): boolean
        /**
         * Checks if the given string contains only lowercase alphabetic characters (a-z).
         *
         * - Returns `true` if the string consists solely of lowercase letters.
         * - Returns `false` if the string contains uppercase letters, numbers, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only lowercase alphabetic characters, otherwise `false`.
         *
         * @example
         * isLowerAlpha("hello"); // true
         * isLowerAlpha("Hello"); // false
         * isLowerAlpha("hello123"); // false
         */
        isLowerAlpha(str: string): boolean
        /**
         * Checks if the given string contains only lowercase alphabetic characters (a-z) and numbers (0-9).
         *
         * - Returns `true` if the string consists solely of lowercase letters and/or numbers.
         * - Returns `false` if the string contains uppercase letters, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only lowercase letters and numbers, otherwise `false`.
         *
         * @example
         * isLowerAlphaAndNumber("hello123"); // true
         * isLowerAlphaAndNumber("Hello123"); // false
         * isLowerAlphaAndNumber("hello!"); // false
         */
        isLowerAlphaAndNumber(str: string): boolean
        /**
         * Checks if the given string contains only uppercase alphabetic characters (A-Z).
         *
         * - Returns `true` if the string consists solely of uppercase letters.
         * - Returns `false` if the string contains lowercase letters, numbers, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only uppercase alphabetic characters, otherwise `false`.
         *
         * @example
         * isUpperAlpha("HELLO"); // true
         * isUpperAlpha("Hello"); // false
         * isUpperAlpha("HELLO123"); // false
         */
        isUpperAlpha(str: string): boolean
        /**
         * Checks if the given string contains only uppercase alphabetic characters (A-Z) and numbers (0-9).
         *
         * - Returns `true` if the string consists solely of uppercase letters and/or numbers.
         * - Returns `false` if the string contains lowercase letters, symbols, or is empty.
         *
         * @param str The string to be checked.
         * @returns `true` if the string contains only uppercase letters and numbers, otherwise `false`.
         *
         * @example
         * isUpperAlphaNumber("HELLO123"); // true
         * isUpperAlphaNumber("Hello123"); // false
         * isUpperAlphaNumber("HELLO!"); // false
         */
        isUpperAlphaNumber(str: string): boolean
        /**
         * Checks if the given value is a numeric value.
         *
         * - Returns `true` if the value is a finite number.
         * - Returns `false` if the value is `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is numeric, otherwise `false`.
         *
         * @example
         * isNumeric(123); // true
         * isNumeric("123"); // true
         * isNumeric("abc"); // false
         * isNumeric(Infinity); // false
         * isNumeric(NaN); // false
         */
        isNumeric(num: any): boolean;
        /**
         * Checks if the given value is an integer.
         *
         * - Returns `true` if the value is a finite integer.
         * - Returns `false` if the value is a decimal, `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is an integer, otherwise `false`.
         *
         * @example
         * isInteger(10); // true
         * isInteger("10"); // true
         * isInteger(10.5); // false
         * isInteger("abc"); // false
         * isInteger(Infinity); // false
         */
        isInteger(num: any): boolean;
        /**
         * Checks if the given value is a positive integer.
         *
         * - Returns `true` if the value is a finite integer greater than zero.
         * - Returns `false` if the value is zero, a negative number, a decimal, `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is a positive integer, otherwise `false`.
         *
         * @example
         * isPositiveInteger(10); // true
         * isPositiveInteger("10"); // true
         * isPositiveInteger(0); // false
         * isPositiveInteger(-5); // false
         * isPositiveInteger(10.5); // false
         */
        isPositiveInteger(num: any): boolean;
        /**
         * Checks if the given value is a negative integer.
         *
         * - Returns `true` if the value is a finite integer less than zero.
         * - Returns `false` if the value is zero, a positive number, a decimal, `NaN`, `Infinity`, or not a number.
         *
         * @param num The value to be checked.
         * @returns `true` if the value is a negative integer, otherwise `false`.
         *
         * @example
         * isNegativeInteger(-10); // true
         * isNegativeInteger("-10"); // true
         * isNegativeInteger(0); // false
         * isNegativeInteger(5); // false
         * isNegativeInteger(-10.5); // false
         */
        isNegativeInteger(num: any): boolean;
        /**
         * Checks if the given value is an array.
         *
         * - Returns `true` if the value is an array.
         * - Returns `false` if the value is `null`, `undefined`, an object, or any other data type.
         *
         * @param arr The value to be checked.
         * @returns `true` if the value is an array, otherwise `false`.
         *
         * @example
         * isArray([1, 2, 3]); // true
         * isArray("Hello"); // false
         * isArray({ key: "value" }); // false
         * isArray(null); // false
         */
        isArray(arr: any): boolean;
        /**
         * Checks if the given value is a plain object.
         *
         * - Returns `true` if the value is a non-null object and not an array.
         * - Returns `false` if the value is `null`, an array, or any other data type.
         *
         * @param obj The value to be checked.
         * @returns `true` if the value is a plain object, otherwise `false`.
         *
         * @example
         * isObject({ key: "value" }); // true
         * isObject([1, 2, 3]); // false
         * isObject(null); // false
         * isObject("Hello"); // false
         */
        isObject(obj: any): boolean;
        /**
         * Checks if the given value is a valid date.
         *
         * - Accepts a `DateObject` or a string representation of a date.
         * - Returns `true` if the date is valid based on its year, month, and day.
         * - Returns `false` if the date is improperly formatted or does not exist.
         *
         * @param date The value to be checked (as a `DateObject` or string).
         * @returns `true` if the value is a valid date, otherwise `false`.
         *
         * @example
         * isDate("2024-02-29"); // true (valid leap year date)
         * isDate("2023-02-29"); // false (February 29 does not exist in 2023)
         * isDate({ y: 2023, M: 12, d: 31 }); // true
         * isDate("invalid-date"); // false
         */
        isDate(date: DateObject | string): boolean;
        /**
         * Checks if the given value is a valid time.
         *
         * - Accepts a `TimeObject` or a string representation of a time.
         * - Returns `true` if the time consists of valid hours, minutes, and seconds.
         * - Returns `false` if any part of the time is invalid or improperly formatted.
         *
         * @param time The value to be checked (as a `TimeObject` or string).
         * @returns `true` if the value is a valid time, otherwise `false`.
         *
         * @example
         * isTime("14:30:59"); // true
         * isTime({ h: 23, m: 59, s: 59 }); // true
         * isTime("25:00:00"); // false (invalid hour)
         * isTime("12:60:00"); // false (invalid minute)
         * isTime("12:30:61"); // false (invalid second)
         */
        isTime(time: TimeObject | string): boolean;
        /**
         * Checks if the given value is a valid datetime.
         *
         * - Accepts a `DateTimeObject` or a string representation of a datetime.
         * - Returns `true` if both the date and time components are valid.
         * - Returns `false` if either the date or time is invalid or improperly formatted.
         *
         * @param datetime The value to be checked (as a `DateTimeObject` or string).
         * @returns `true` if the value is a valid datetime, otherwise `false`.
         *
         * @example
         * isDatetime("2024-02-29 14:30:59"); // true
         * isDatetime({ y: 2023, M: 12, d: 31, h: 23, m: 59, s: 59 }); // true
         * isDatetime("2023-02-29 12:00:00"); // false (invalid date)
         * isDatetime("2024-02-28 25:00:00"); // false (invalid time)
         */
        isDatetime(datetime: DateTimeObject | string): boolean;
        /**
         * Checks if the given string is a valid email address.
         *
         * - Returns `true` if the string follows the standard email format.
         * - Returns `false` if the string does not match the email pattern.
         *
         * @param str The string to be checked.
         * @returns `true` if the string is a valid email address, otherwise `false`.
         *
         * @example
         * isEmail("user@example.com"); // true
         * isEmail("user.name@domain.co"); // true
         * isEmail("user@domain"); // false (missing top-level domain)
         * isEmail("invalid-email"); // false
         */
        isEmail(str: string): boolean;
        /**
         * Checks if the given string is a valid URL.
         *
         * - Returns `true` if the string follows the standard URL format.
         * - Returns `false` if the string does not match the URL pattern.
         *
         * @param urlStr The string to be checked.
         * @returns `true` if the string is a valid URL, otherwise `false`.
         *
         * @example
         * isURL("https://example.com"); // true
         * isURL("ftp://files.server.com"); // true
         * isURL("www.example.com"); // false (missing protocol)
         * isURL("invalid-url"); // false
         */
        isURL(urlStr: string): boolean;
        /**
         * Checks if the given string matches the specified mask pattern.
         *
         * - A mask defines expected character types at each position:
         *   - `'A'` expects an uppercase letter (A-Z).
         *   - `'a'` expects a lowercase letter (a-z).
         *   - `'9'` expects a numeric digit (0-9).
         *   - Any other character in the mask must match exactly.
         * - Returns `true` if the string fully matches the mask pattern.
         * - Returns `false` if the string does not match the mask or has a different length.
         *
         * @param str The string to be validated.
         * @param mask The mask pattern defining expected character types.
         * @returns `true` if the string matches the mask pattern, otherwise `false`.
         *
         * @example
         * isValidMask("ABC123", "AAA999"); // true
         * isValidMask("abc123", "AAA999"); // false (lowercase letters don't match uppercase mask)
         * isValidMask("abc-123", "aaa-999"); // true
         * isValidMask("abcd123", "aaa-999"); // false (length mismatch)
         */
        isValidMask(str: string, mask: string): boolean;
        /**
         * Extracts and returns the year, month, and day from a given date.
         *
         * - If the input is a `Date` object, it extracts the year, month, and day.
         * - If the input is a string, it attempts to parse it in formats:
         *   - `"YYYY-MM-DD"`
         *   - `"YYYY/MM/DD"`
         *   - `"YYYYMMDD"`
         * - If parsing fails, it returns an object with `null` values.
         *
         * @param date A `Date` object or a date string in a supported format.
         * @returns An object containing the year (`y`), month (`M`), and day (`d`).
         *
         * @example
         * getDateObject("2024-02-05"); // { y: 2024, M: 2, d: 5 }
         * getDateObject("20240205"); // { y: 2024, M: 2, d: 5 }
         * getDateObject(new Date(2024, 1, 5)); // { y: 2024, M: 2, d: 5 }
         * getDateObject("invalid"); // { y: null, M: null, d: null }
         */
        getDateObject(dateStr: Date | string): DateObject;
        /**
         * Extracts and returns the hours, minutes, and seconds from a given time.
         *
         * - If the input is a `Date` object, it extracts the hour, minute, and second.
         * - If the input is a string, it attempts to parse it in formats:
         *   - `"HH:MM:SS"`
         *   - `"HHMMSS"`
         * - If the input is a datetime string (`"YYYY-MM-DD HH:MM:SS"`), it extracts only the time part.
         * - If parsing fails, it returns an object with `null` values.
         *
         * @param time A `Date` object or a time string in a supported format.
         * @returns An object containing the hours (`h`), minutes (`m`), and seconds (`s`).
         *
         * @example
         * getTimeObject("14:30:45"); // { h: 14, m: 30, s: 45 }
         * getTimeObject("143045"); // { h: 14, m: 30, s: 45 }
         * getTimeObject("2024-02-05 14:30:45"); // { h: 14, m: 30, s: 45 }
         * getTimeObject(new Date(2024, 1, 5, 14, 30, 45)); // { h: 14, m: 30, s: 45 }
         * getTimeObject("invalid"); // { h: null, m: null, s: null }
         */
        getTimeObject(str: Date | string): TimeObject;
        /**
         * Extracts and returns the year, month, day, hours, minutes, and seconds from a given datetime.
         *
         * - If the input is a `Date` object, it extracts all date and time components.
         * - If the input is a string, it attempts to parse it in formats:
         *   - `"YYYY-MM-DD HH:MM:SS"`
         *   - `"YYYY/MM/DD HH:MM:SS"`
         *   - `"YYYYMMDDHHMMSS"`
         * - If the input is a date-only string (`"YYYY-MM-DD"`), the time defaults to `00:00:00`.
         * - If parsing fails, it returns `null`.
         *
         * @param datetime A `Date` object or a datetime string in a supported format.
         * @returns An object containing the year (`y`), month (`M`), day (`d`), hours (`h`), minutes (`m`), and seconds (`s`), or `null` if parsing fails.
         *
         * @example
         * getDatetimeObject("2024-02-05 14:30:45"); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
         * getDatetimeObject("20240205143045"); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
         * getDatetimeObject("2024-02-05"); // { y: 2024, M: 2, d: 5, h: 0, m: 0, s: 0 }
         * getDatetimeObject(new Date(2024, 1, 5, 14, 30, 45)); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
         * getDatetimeObject("invalid"); // null
         */
        getDatetimeObject(datetime: Date | string): DateTimeObject | null;
        /**
         * Adds a specified amount of time to a given date or datetime.
         *
         * - Accepts a `DateTimeObject`, `DateObject`, or a date string.
         * - Supports adding years (`'y'`), months (`'M'`), days (`'d'`), hours (`'h'`), minutes (`'m'`), and seconds (`'s'`).
         * - If `addType` is omitted or invalid, it defaults to adding days.
         * - If `format` is provided, returns a formatted string; otherwise, returns a `DateTimeObject`.
         *
         * @param datetime The original datetime as an object or string.
         * @param addValue The amount to add (positive or negative).
         * @param addType The unit of time to add (`'y'`, `'M'`, `'d'`, `'h'`, `'m'`, `'s'`).
         * @param format Optional format string for the output. default : 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm:ss'
         * @returns The updated datetime as an object or formatted string.
         *
         * @example
         * addDate("2024-02-05", 1, "d"); // { y: 2024, M: 2, d: 6 }
         * addDate("2024-02-05", -1, "M"); // { y: 2024, M: 1, d: 5 }
         * addDate("2024-02-05 14:30:00", 2, "h"); // { y: 2024, M: 2, d: 5, h: 16, m: 30, s: 0 }
         * addDate("2024-02-05", 1, "d", "yyyy-MM-dd"); // "2024-02-06"
         */
        addDate(datetime: DateTimeObject | string, addValue: string | number, addType?: string, format?: string): DateTimeObject | string;
        /**
         * Calculates the difference between two dates or datetimes.
         *
         * - Accepts `DateTimeObject`, `DateObject`, or a string representation of a date or datetime.
         * - If `diffType` is specified, it returns the difference in the given unit:
         *   - `'y'`: Years
         *   - `'M'`: Months
         *   - `'d'`: Days
         *   - `'h'`: Hours
         *   - `'m'`: Minutes
         *   - `'s'`: Seconds
         * - If `diffType` is omitted or invalid, it defaults to calculating the difference in days.
         *
         * @param datetime1 The first date or datetime.
         * @param datetime2 The second date or datetime.
         * @param diffType The unit of difference (`'y'`, `'M'`, `'d'`, `'h'`, `'m'`, `'s'`).
         * @returns The difference between the two dates in the specified unit.
         *
         * @example
         * getDateDiff("2024-02-01", "2024-03-01", "M"); // 1
         * getDateDiff("2024-02-01", "2025-02-01", "y"); // 1
         * getDateDiff("2024-02-01", "2024-02-10", "d"); // 9
         * getDateDiff("2024-02-01 14:00:00", "2024-02-01 16:30:00", "h"); // 2
         * getDateDiff("2024-02-01 14:00:00", "2024-02-01 14:45:00", "m"); // 45
         * getDateDiff("2024-02-01 14:00:00", "2024-02-01 14:00:30", "s"); // 30
         */
        getDateDiff(datetime1: DateTimeObject | string, datetime2: DateTimeObject | string, diffType?: string): number;
        /**
         * Returns the full or abbreviated name of a given month.
         *
         * - Accepts a month number (`1-12`) or a string representation of a number.
         * - If `isFullName` is `true`, it returns the full month name (e.g., `"January"`).
         * - If `isFullName` is `false`, it returns the abbreviated month name (e.g., `"Jan"`).
         * - Throws an error if the input month is outside the valid range (`1-12`).
         *
         * @param month The month as a number (`1-12`) or a string representing a number.
         * @param isFullName Determines whether to return the full name (`true`) or the abbreviated name (`false`) (default: `true`).
         * @returns The full or abbreviated month name.
         *
         * @throws Error if the month is not between `1` and `12`.
         *
         * @example
         * getMonthName(2); // "February"
         * getMonthName("3", false); // "Mar"
         * getMonthName(12, true); // "December"
         * getMonthName(0); // Throws error: "Month must be between 1 and 12"
         */
        getMonthName(month: number | string, isFullName?: boolean): string;
        /**
         * Formats a given date or datetime according to the specified format.
         *
         * - Accepts a `DateTimeObject`, `DateObject`, or a string representation of a date/datetime.
         * - If no format is provided, it defaults to `CustomOption.dateFormat` for dates 
         *   and `CustomOption.datetimeFormat` for datetimes.
         * - Supports various formats such as:
         *   - `'yyyy-MM-dd'` → `"2025-02-05"`
         *   - `'yyyy/MM/dd hh:mm:ss'` → `"2025/02/05 14:30:45"`
         *   - `'MMMM dd, yyyy'` → `"February 5, 2025"`
         * - Throws an error if the input date is invalid.
         *
         * @param datetime The date or datetime to format.
         * @param format The desired output format (optional). Default: `'yyyy-MM-dd'` or `'yyyy-MM-dd hh:mm:ss'`
         * @returns The formatted date/time as a string.
         *
         * @throws Error if the provided date is invalid.
         *
         * @example
         * getDateWithFormat("2025-02-05", "yyyy/MM/dd"); // "2025/02/05"
         * getDateWithFormat("2025-02-05 14:30:45", "MMMM dd, yyyy"); // "February 5, 2025"
         * getDateWithFormat({ y: 2025, M: 2, d: 5 }, "MM-dd-yyyy"); // "02-05-2025"
         */
        getDateWithFormat(datetime: DateTimeObject | DateObject | string, format?: string): string;
        /**
         * Returns the day of the week for a given date.
         *
         * - Accepts a `DateObject` or a string representation of a date.
         * - Uses `CustomOption.dayOfWeekFormat` as the default format.
         * - Supports different formats for output:
         *   - `'d'` → Numeric day of the week (`0-6`, where `0 = Sunday`).
         *   - `'dy'` → Abbreviated English name (`"Sun", "Mon", ..., "Sat"`).
         *   - `'day'` → Full English name (`"Sunday", "Monday", ..., "Saturday"`).
         *   - `'kdy'` → Abbreviated Korean name (`"일", "월", ..., "토"`).
         *   - `'kday'` → Full Korean name (`"일요일", "월요일", ..., "토요일"`).
         * - Throws an error if the input date is invalid.
         *
         * @param date The date to evaluate.
         * @param dayType The format of the output (optional). Default: `'d'`
         * @returns The day of the week in the specified format.
         *
         * @throws Error if the provided date is invalid.
         *
         * @example
         * getDayOfWeek("2025-02-05", "d"); // "3" (Wednesday)
         * getDayOfWeek("2025-02-05", "dy"); // "Wed"
         * getDayOfWeek("2025-02-05", "day"); // "Wednesday"
         * getDayOfWeek("2025-02-05", "kdy"); // "수"
         * getDayOfWeek("2025-02-05", "kday"); // "수요일"
         */
        getDayOfWeek(date: DateObject | string, dayType?: string): string;
        /**
         * Returns the last day of the month for a given date.
         *
         * - Accepts a `DateObject` or a string representation of a date.
         * - If the input is a `DateObject`, it uses the month and year from the object.
         * - If the input is a string, it assumes the first day of the given month unless a full date is provided.
         * - Determines the last day of the specified month by computing the last day of the next month minus one.
         * - Throws an error if the input date is invalid.
         *
         * @param date The date or month to evaluate.
         * @returns The last day of the month as a number.
         *
         * @throws Error if the provided date is invalid.
         *
         * @example
         * getLastDay("2025-02"); // 28 (for February 2025)
         * getLastDay("2024-02"); // 29 (leap year February)
         * getLastDay({ y: 2025, M: 5, d: 15 }); // 31 (May has 31 days)
         * getLastDay("2025-07-10"); // 31 (July has 31 days)
         */
        getLastDay(date: DateObject | string): number;
        /**
         * Returns the current system year in the specified format.
         *
         * - Uses `CustomOption.yearFormat` as the default format.
         * - Supports the following formats:
         *   - `'yyyy'` → Full year (`"2025"`)
         *   - `'yy'` → Last two digits of the year (`"25"`)
         * - If an unsupported format is provided, it defaults to `'yyyy'`.
         *
         * @param format The desired output format (optional). Default: `'yyyy'`
         * @returns The current year as a string in the specified format.
         *
         * @example
         * getSysYear(); // "2025" (default format)
         * getSysYear("yyyy"); // "2025"
         * getSysYear("yy"); // "25"
         */
        getSysYear(format?: string): string;
        /**
         * Returns the current system month in the specified format.
         *
         * - Uses `CustomOption.monthFormat` as the default format.
         * - Supports the following formats:
         *   - `'M'` → Numeric month without leading zero (`"2"` for February).
         *   - `'MM'` → Numeric month with leading zero (`"02"` for February).
         *   - `'MMMM'` → Full month name (`"February"`).
         *   - `'MMM'` → Abbreviated month name (`"Feb"`).
         * - If an unsupported format is provided, it defaults to `'M'`.
         *
         * @param format The desired output format (optional). Default: `'M'`
         * @returns The current month as a string in the specified format.
         *
         * @example
         * getSysMonth(); // "2" (default format for February)
         * getSysMonth("MM"); // "02"
         * getSysMonth("MMMM"); // "February"
         * getSysMonth("MMM"); // "Feb"
         */
        getSysMonth(format?: string): string;
        /**
         * Returns the current system year and month in the specified format.
         *
         * - Uses `CustomOption.yearMonthFormat` as the default format.
         * - Delegates formatting to `getDateWithFormat()` using the first day of the current month.
         * - Common formats include:
         *   - `'yyyy-MM'` → `"2025-02"`
         *   - `'yyyy/MM'` → `"2025/02"`
         *   - `'MMMM yyyy'` → `"February 2025"`
         *   - `'MMM yyyy'` → `"Feb 2025"`
         *
         * @param format The desired output format (optional). Default: `'yyyy-MM'`
         * @returns The current year and month as a formatted string.
         *
         * @example
         * getSysYearMonth(); // "2025-02" (default format for February 2025)
         * getSysYearMonth("yyyy/MM"); // "2025/02"
         * getSysYearMonth("MMMM yyyy"); // "February 2025"
         * getSysYearMonth("MMM yyyy"); // "Feb 2025"
         */
        getSysYearMonth(format?: string): string;
        /**
         * Returns the current system day of the month in the specified format.
         *
         * - Uses `CustomOption.dayFormat` as the default format.
         * - Supports the following formats:
         *   - `'d'` → Day without leading zero (`"5"` for the 5th day of the month).
         *   - `'dd'` → Day with leading zero (`"05"` for the 5th day of the month).
         * - If an unsupported format is provided, it defaults to `'d'`.
         *
         * @param format The desired output format (optional). Default: `'d'`
         * @returns The current day of the month as a string in the specified format.
         *
         * @example
         * getSysDay(); // "5" (default format for the 5th day)
         * getSysDay("dd"); // "05"
         */
        getSysDay(format?: string): string;
        /**
         * Returns the current system day of the week in the specified format.
         *
         * - Uses `CustomOption.dayOfWeekFormat` as the default format.
         * - Delegates formatting to `getDayOfWeek()`, which supports:
         *   - `'d'` → Numeric day of the week (`0-6`, where `0 = Sunday`).
         *   - `'dy'` → Abbreviated English name (`"Sun", "Mon", ..., "Sat"`).
         *   - `'day'` → Full English name (`"Sunday", "Monday", ..., "Saturday"`).
         *   - `'kdy'` → Abbreviated Korean name (`"일", "월", ..., "토"`).
         *   - `'kday'` → Full Korean name (`"일요일", "월요일", ..., "토요일"`).
         *
         * @param format The desired output format (optional). Default: `'d'`
         * @returns The current day of the week in the specified format.
         *
         * @example
         * getSysDayOfWeek(); // "3" (default format, Wednesday)
         * getSysDayOfWeek("dy"); // "Wed"
         * getSysDayOfWeek("day"); // "Wednesday"
         * getSysDayOfWeek("kdy"); // "수"
         * getSysDayOfWeek("kday"); // "수요일"
         */
        getSysDayOfWeek(dayType?: string): string;
        /**
         * Returns the current system hour in the specified format.
         *
         * - Uses `CustomOption.hourFormat` as the default format.
         * - Supports the following formats:
         *   - `'h'` → Hour without leading zero (`"5"` for 5 AM/PM).
         *   - `'hh'` → Hour with leading zero (`"05"` for 5 AM/PM).
         * - If an unsupported format is provided, it defaults to `'h'`.
         *
         * @param format The desired output format (optional). Default: `'h'`
         * @returns The current hour as a string in the specified format.
         *
         * @example
         * getSysHour(); // "5" (default format)
         * getSysHour("hh"); // "05"
         */
        getSysHour(format?: string): string;
        /**
         * Returns the current system hour and minute in the specified format.
         *
         * - Uses `CustomOption.hourMinuteFormat` as the default format.
         * - Supports the following formats:
         *   - `'hhmm'` → Compact format without separators (`"1430"` for 2:30 PM).
         *   - `'hh:mm'` → Standard format with a colon separator (`"14:30"` for 2:30 PM).
         * - If an unsupported format is provided, it defaults to `'hh:mm'`.
         *
         * @param format The desired output format (optional). Default: `'hh:mm'`
         * @returns The current hour and minute as a string in the specified format.
         *
         * @example
         * getSysHourMinute(); // "14:30" (default format)
         * getSysHourMinute("hhmm"); // "1430"
         */
        getSysHourMinute(format?: string): string;
        /**
         * Returns the current system minute in the specified format.
         *
         * - Uses `CustomOption.minuteFormat` as the default format.
         * - Supports the following formats:
         *   - `'m'` → Minute without leading zero (`"5"` for the 5th minute).
         *   - `'mm'` → Minute with leading zero (`"05"` for the 5th minute).
         * - If an unsupported format is provided, it defaults to `'m'`.
         *
         * @param format The desired output format (optional). Default: `'m'`
         * @returns The current minute as a string in the specified format.
         *
         * @example
         * getSysMinute(); // "5" (default format)
         * getSysMinute("mm"); // "05"
         */
        getSysMinute(format?: string): string;
        /**
         * Returns the current system second in the specified format.
         *
         * - Uses `CustomOption.secondFormat` as the default format.
         * - Supports the following formats:
         *   - `'s'` → Second without leading zero (`"5"` for the 5th second).
         *   - `'ss'` → Second with leading zero (`"05"` for the 5th second).
         * - If an unsupported format is provided, it defaults to `'s'`.
         *
         * @param format The desired output format (optional). Default: `'s'`
         * @returns The current second as a string in the specified format.
         *
         * @example
         * getSysSecond(); // "5" (default format)
         * getSysSecond("ss"); // "05"
         */
        getSysSecond(format?: string): string;
        /**
         * Returns the current system time in the specified format.
         *
         * - Uses `CustomOption.timeFormat` as the default format.
         * - Supports the following formats:
         *   - `'hhmmss'` → Compact format without separators (`"143015"` for 2:30:15 PM).
         *   - `'hh:mm:ss'` → Standard format with colons (`"14:30:15"` for 2:30:15 PM).
         * - If an unsupported format is provided, it defaults to `'hh:mm:ss'`.
         *
         * @param format The desired output format (optional). Default: `'hh:mm:ss'`
         * @returns The current time as a string in the specified format.
         *
         * @example
         * getSysTime(); // "14:30:15" (default format)
         * getSysTime("hhmmss"); // "143015"
         */
        getSysTime(format?: string): string;
        /**
         * Returns the current system date and time in the specified format.
         *
         * - Uses `CustomOption.datetimeFormat` as the default format.
         * - Delegates formatting to `getDateWithFormat()`, which supports various formats, including:
         *   - `'yyyy-MM-dd hh:mm:ss'` → `"2025-02-05 14:30:15"`
         *   - `'yyyy/MM/dd'` → `"2025/02/05"`
         *   - `'MMMM dd, yyyy'` → `"February 5, 2025"`
         * - If no format is specified, it defaults to the full datetime format.
         *
         * @param format The desired output format (optional). Default: `'yyyy-MM-dd hh:mm:ss'`
         * @returns The current date and time as a formatted string.
         *
         * @example
         * getSysDate(); // "2025-02-05 14:30:15" (default format)
         * getSysDate("yyyy/MM/dd"); // "2025/02/05"
         * getSysDate("MMMM dd, yyyy"); // "February 5, 2025"
         */
        getSysDate(format?: string): string;
        /**
         * Rounds a number up to the nearest integer or specified decimal place.
         *
         * - If `precision` is `0`, it rounds up to the nearest whole number.
         * - If `precision` is greater than `0`, it rounds up to the specified number of decimal places.
         * - If `precision` is less than `0`, it rounds up to the nearest multiple of `10^precision`.
         *
         * @param num The number to be rounded up.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The rounded-up number.
         *
         * @example
         * getCeil(12.34); // 13
         * getCeil(12.34, 1); // 12.4
         * getCeil(12.34, 2); // 12.34
         * getCeil(1250, -2); // 1300
         */
        getCeil(num: number, precision?: number): number;
        /**
         * Rounds a number down to the nearest integer or specified decimal place.
         *
         * - If `precision` is `0`, it rounds down to the nearest whole number.
         * - If `precision` is greater than `0`, it rounds down to the specified number of decimal places.
         * - If `precision` is less than `0`, it rounds down to the nearest multiple of `10^precision`.
         *
         * @param num The number to be rounded down.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The rounded-down number.
         *
         * @example
         * getFloor(12.89); // 12
         * getFloor(12.89, 1); // 12.8
         * getFloor(12.89, 2); // 12.89
         * getFloor(1299, -2); // 1200
         */
        getFloor(num: number, precision?: number): number;
        /**
         * Rounds a number to the nearest integer or specified decimal place.
         *
         * - If `precision` is `0`, it rounds to the nearest whole number.
         * - If `precision` is greater than `0`, it rounds to the specified number of decimal places.
         * - If `precision` is less than `0`, it rounds to the nearest multiple of `10^precision`.
         *
         * @param num The number to be rounded.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The rounded number.
         *
         * @example
         * getRound(12.49); // 12
         * getRound(12.5); // 13
         * getRound(12.345, 2); // 12.35
         * getRound(1250, -2); // 1300
         */
        getRound(num: number, precision?: number): number;
        /**
         * Truncates a number to the specified decimal place without rounding.
         *
         * - If `precision` is `0`, it removes the decimal part, keeping only the integer.
         * - If `precision` is greater than `0`, it truncates the number at the specified decimal places.
         * - If `precision` is less than `0`, it truncates to the nearest multiple of `10^precision`.
         *
         * @param num The number to be truncated.
         * @param precision The number of decimal places to retain (default: `0`).
         * @returns The truncated number.
         *
         * @example
         * getTrunc(12.89); // 12
         * getTrunc(12.89, 1); // 12.8
         * getTrunc(12.89, 2); // 12.89
         * getTrunc(1299, -2); // 1200
         */
        getTrunc(num: number, precision?: number): number;
        /**
         * Calculates the byte length of a given string based on character encoding.
         *
         * - Uses UTF-8 encoding rules to determine the byte size of each character.
         * - Character byte sizes are determined as follows:
         *   - `charCode <= 0x7F` → 1 byte (ASCII characters).
         *   - `charCode <= 0x7FF` → `CustomOption.LESSOREQ_0X7FF_BYTE` bytes. Default: 2
         *   - `charCode <= 0xFFFF` → `CustomOption.LESSOREQ_0XFFFF_BYTE` bytes. Default: 3
         *   - `charCode > 0xFFFF` → `CustomOption.GREATER_0XFFFF_BYTE` bytes. Default: 4
         *
         * @param str The input string.
         * @returns The total byte length of the string.
         *
         * @example
         * getByteLength("Hello"); // 5 (each ASCII character is 1 byte)
         * getByteLength("안녕하세요"); // 15 (each Korean character is 3 bytes)
         * getByteLength("𐍈"); // 4 (UTF-16 surrogate pair)
         */
        getByteLength(str: string): number;
        /**
         * Truncates a string to fit within a specified byte length.
         *
         * - Uses UTF-8 encoding rules to calculate byte size.
         * - Truncates the string at the point where the total byte length exceeds `cutByte`.
         * - Character byte sizes are determined as follows:
         *   - `charCode <= 0x7F` → 1 byte (ASCII characters).
         *   - `charCode <= 0x7FF` → `CustomOption.LESSOREQ_0X7FF_BYTE` bytes.
         *   - `charCode <= 0xFFFF` → `CustomOption.LESSOREQ_0XFFFF_BYTE` bytes.
         *   - `charCode > 0xFFFF` → `CustomOption.GREATER_0XFFFF_BYTE` bytes.
         *
         * @param str The input string to be truncated.
         * @param cutByte The maximum allowed byte length.
         * @returns The truncated string that fits within the given byte length.
         *
         * @example
         * getCutByteLength("Hello, World!", 5); // "Hello"
         * getCutByteLength("안녕하세요", 6); // "안녕" (each Korean character is 3 bytes)
         * getCutByteLength("𐍈𐍈𐍈", 4); // "𐍈" (each surrogate pair character is 4 bytes)
         */
        getCutByteLength(str: string, cutByte: number): string;
        /**
         * Adjusts a string to fit a specified length by evenly distributing spaces between characters.
         *
         * - If the string's length is already greater than or equal to `length`, it is returned as is.
         * - Spaces are distributed as evenly as possible between characters to reach the desired length.
         * - If the spacing is not evenly divisible, extra spaces are added starting from the left.
         *
         * @param str The input string.
         * @param length The target total length of the formatted string.
         * @returns A string with evenly distributed spaces to match the specified length.
         *
         * @example
         * getStringLenForm("Hi", 5); // "H  i"
         * getStringLenForm("Hello", 10); // "H  e  l  l  o"
         * getStringLenForm("A", 3); // "A  "
         */
        getStringLenForm(str: string, length: number): string;
        /**
         * Left-pads a string with a specified padding string until it reaches the desired length.
         *
         * - If the original string's length is already greater than or equal to `length`, it is returned as is.
         * - The `padStr` is repeated as needed to fill the remaining space.
         * - If `padStr` does not evenly divide into the required padding length, it may be truncated.
         *
         * @param str The original string.
         * @param padStr The string used for padding.
         * @param length The desired total length of the padded string.
         * @returns The left-padded string.
         *
         * @example
         * getLpad("123", "0", 5); // "00123"
         * getLpad("abc", "-", 6); // "---abc"
         * getLpad("test", "XY", 10); // "XYXYXYtest"
         */
        getLpad(str: string, padStr: string, length: number): string;
        /**
         * Right-pads a string with a specified padding string until it reaches the desired length.
         *
         * - If the original string's length is already greater than or equal to `length`, it is truncated to fit.
         * - The `padStr` is repeated as needed to fill the remaining space.
         * - If `padStr` does not evenly divide into the required padding length, it may be truncated.
         *
         * @param str The original string.
         * @param padStr The string used for padding.
         * @param length The desired total length of the padded string.
         * @returns The right-padded string.
         *
         * @example
         * getRpad("123", "0", 5); // "12300"
         * getRpad("abc", "-", 6); // "abc---"
         * getRpad("test", "XY", 10); // "testXYXYXY"
         */
        getRpad(str: string, padStr: string, length: number): string;
        /**
         * Removes leading and trailing whitespace from a string.
         *
         * - Converts the input to a string if it is not already.
         * - Uses JavaScript's built-in `trim()` method to remove whitespace.
         *
         * @param str The input string.
         * @returns The trimmed string without leading or trailing spaces.
         *
         * @example
         * getTrim("  Hello World  "); // "Hello World"
         * getTrim("\tTest String\n"); // "Test String"
         * getTrim("   "); // "" (empty string)
         */
        getTrim(str: string): string;
        /**
         * Replaces all occurrences of a target substring within a string with a specified replacement.
         *
         * - Converts all inputs to strings before processing.
         * - Uses `split()` and `join()` to replace all instances of `targetStr` with `replaceStr`.
         * - If `replaceStr` is not provided, occurrences of `targetStr` are removed.
         *
         * @param str The original string.
         * @param targetStr The substring to be replaced.
         * @param replaceStr The string to replace occurrences of `targetStr` (default: `''`).
         * @returns A new string with all occurrences of `targetStr` replaced.
         *
         * @example
         * getReplaceAll("hello world", "o", "O"); // "hellO wOrld"
         * getReplaceAll("banana", "a", ""); // "bnn"
         * getReplaceAll("2025-02-05", "-", "/"); // "2025/02/05"
         */
        getReplaceAll(str: string, targetStr: string, replaceStr?: string): string;
        /**
         * Formats a number according to a specified format pattern.
         *
         * - Uses `CustomOption.numberFormat` as the default format if none is provided.
         * - Supports various number formatting patterns, including:
         *   - `"#,###"` → `"1,234"` (comma-separated thousands).
         *   - `"#,##0"` → `"1,234"` (ensures at least one digit).
         *   - `".##"` → `"0.1"` (no grouping).
         *   - `".00"` → `"0.10"` (ensures at least one digit).
         * - Supports decimal formatting and percentage notation (`"%"`).
         * - Throws an error if the input is not a valid number or if the format is invalid.
         *
         * @param value The number to format.
         * @param format The desired format pattern (optional). Default: `'#,##0.##'`
         * @returns The formatted number as a string.
         *
         * @throws Error if the input value is not numeric or the format is invalid.
         *
         * @example
         * getNumberFormat(1234); // "1,234" (default format)
         * getNumberFormat(1234.5678, "#,###.00"); // "1,234.56"
         * getNumberFormat(0.25, "#,##0%"); // "25%" (percentage conversion)
         * getNumberFormat(-1234, "#,###"); // "-1,234"
         */
        getNumberFormat(value: number, format?: string): string;
        /**
         * Removes all non-numeric characters from a string, leaving only digits.
         *
         * - Converts the input to a string if it is not already.
         * - Uses a regular expression to remove any character that is not a digit (`0-9`).
         *
         * @param str The input string.
         * @returns A new string containing only numeric characters.
         *
         * @example
         * getRemoveExceptNumbers("abc123def456"); // "123456"
         * getRemoveExceptNumbers("Phone: (555) 123-4567"); // "5551234567"
         * getRemoveExceptNumbers("No numbers here!"); // ""
         */
        getRemoveExceptNumbers(str: string): string;
        /**
         * Removes all numeric characters from a string, leaving only non-numeric characters.
         *
         * - Converts the input to a string if it is not already.
         * - Uses a regular expression to remove any digit (`0-9`).
         *
         * @param str The input string.
         * @returns A new string containing only non-numeric characters.
         *
         * @example
         * getRemoveNumbers("abc123def456"); // "abcdef"
         * getRemoveNumbers("Phone: (555) 123-4567"); // "Phone: () -"
         * getRemoveNumbers("123456"); // "" (all numbers removed)
         */
        getRemoveNumbers(str: string): string;
        /**
         * Reverses the characters in a given string.
         *
         * - Converts the input to a string if it is not already.
         * - Splits the string into an array of characters, reverses the order, and joins them back.
         *
         * @param str The input string.
         * @returns The reversed string.
         *
         * @example
         * getReverse("hello"); // "olleh"
         * getReverse("12345"); // "54321"
         * getReverse("A B C"); // "C B A"
         */
        getReverse(str: string): string;
        /**
         * Converts the given value to a boolean.
         *
         * - Numeric values: `0` is `false`, any other number is `true`.
         * - Boolean values: Returned as is.
         * - String values: Returns `true` if the string matches predefined truthy values (`"true"`, `"yes"`, `"checked"`, etc.).
         * - Other types: Returns `false`.
         *
         * @param value The value to be converted.
         * @returns `true` if the value represents a truthy value, otherwise `false`.
         *
         * @example
         * getToBoolean(1); // true
         * getToBoolean(0); // false
         * getToBoolean("yes"); // true
         * getToBoolean("false"); // false
         * getToBoolean(true); // true
         * getToBoolean(null); // false
         */
        getToBoolean(value: any): boolean;
        /**
         * Converts the given value to a number.
         *
         * - If the value is numeric, it is returned as a number.
         * - If the value is not a valid number, `impossibleValue` is returned instead.
         *
         * @param value The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `0`).
         * @returns The numeric representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToNumber("123"); // 123
         * getToNumber("12.34"); // 12.34
         * getToNumber("abc", -1); // -1 (fallback value)
         * getToNumber(null, 100); // 100 (fallback value)
         */
        getToNumber(value: any, impossibleValue?: number): number;
        /**
         * Converts the given value to a floating-point number.
         *
         * - If the value is numeric, it is converted to a float and returned.
         * - If the value is not a valid number, `impossibleValue` is returned instead.
         *
         * @param value The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `0`).
         * @returns The floating-point representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToFloat("123.45"); // 123.45
         * getToFloat(42); // 42
         * getToFloat("abc", -1); // -1 (fallback value)
         * getToFloat(null, 100.5); // 100.5 (fallback value)
         */
        getToFloat(value: any, impossibleValue?: number): number;
        /**
         * Converts the given value to an integer.
         *
         * - If the value is numeric, it is converted to an integer using `Math.trunc()`.
         * - If the value is not a valid number, `impossibleValue` is returned instead.
         *
         * @param value The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `0`).
         * @returns The integer representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToInteger("123.45"); // 123
         * getToInteger(42.9); // 42
         * getToInteger("abc", -1); // -1 (fallback value)
         * getToInteger(null, 100); // 100 (fallback value)
         */
        getToInteger(value: any, impossibleValue?: number): number;
        /**
         * Converts the given value to a string.
         *
         * - If the value is already a string, it is returned as is.
         * - If the value is a number, boolean, or bigint, it is converted to a string.
         * - If the value is a symbol, its description is returned.
         * - If the value is `null`, `undefined`, or an unsupported type, `impossibleValue` is returned.
         *
         * @param str The value to be converted.
         * @param impossibleValue The fallback value if conversion fails (default: `""`).
         * @returns The string representation of the value, or `impossibleValue` if conversion fails.
         *
         * @example
         * getToString(123); // "123"
         * getToString(true); // "true"
         * getToString(Symbol("test")); // "test"
         * getToString(null, "N/A"); // "N/A" (fallback value)
         */
        getToString(str: any, impossibleValue?: string): string;
        /**
         * Returns a default value if the given value is `null` or `undefined`.
         *
         * - If `val` is `null` or `undefined`, `defaultValue` is returned.
         * - Otherwise, `val` is returned as is.
         *
         * @param val The value to check.
         * @param defaultValue The default value to return if `val` is `null` or `undefined`.
         * @returns The original value if not `null` or `undefined`, otherwise the `defaultValue`.
         *
         * @example
         * nvl(null, "default"); // "default"
         * nvl(undefined, 100); // 100
         * nvl("Hello", "default"); // "Hello"
         * nvl(0, "fallback"); // 0 (not null or undefined, so returned as is)
         */
        nvl(val: any, defaultValue: any): any;
        /**
         * Extracts the file extension from a given filename or file path.
         *
         * - Converts the input to a string if it is not already.
         * - Splits the string by `.` and returns the last segment as the file extension.
         * - If no extension is found, an empty string is returned.
         *
         * @param str The filename or file path.
         * @returns The file extension as a string, or an empty string if no extension exists.
         *
         * @example
         * getFileExtension("document.txt"); // "txt"
         * getFileExtension("archive.tar.gz"); // "gz"
         * getFileExtension("/path/to/file"); // "" (no extension)
         */
        getFileExtension(str: string): string;
        /**
         * Extracts the filename (without extension) from a given file path or filename.
         *
         * - Converts the input to a string if it is not already.
         * - Extracts the last part of the path after the last `/` (or full filename if no path exists).
         * - Removes the file extension by cutting the string at the last `.` if present.
         *
         * @param str The full file path or filename.
         * @returns The filename without the extension.
         *
         * @example
         * getFileName("/path/to/document.txt"); // "document"
         * getFileName("archive.tar.gz"); // "archive.tar"
         * getFileName("file_without_extension"); // "file_without_extension"
         */
        getFileName(str: string): string;
        /**
         * Decodes a Base64-encoded string into a human-readable format.
         *
         * - Converts the input to a string if it is not already.
         * - Uses `atob()` to decode the Base64 string.
         * - Decodes percent-encoded UTF-8 characters to properly restore special characters.
         *
         * @param str The Base64-encoded string.
         * @returns The decoded string.
         *
         * @example
         * getDecodeBase64("SGVsbG8gd29ybGQh"); // "Hello world!"
         * getDecodeBase64("44GT44KT44Gr44Gh44Gv"); // "こんにちは" (Japanese "Hello")
         */
        getDecodeBase64(str: string): string;
        /**
         * Encodes a string into Base64 format.
         *
         * - Converts the input to a string if it is not already.
         * - Uses `encodeURIComponent()` to properly handle special characters.
         * - Encodes the string to Base64 using `btoa()`.
         *
         * @param str The input string to be encoded.
         * @returns The Base64-encoded string.
         *
         * @example
         * getEncodeBase64("Hello world!"); // "SGVsbG8gd29ybGQh"
         * getEncodeBase64("こんにちは"); // "44GT44KT44Gr44Gh44Gv" (Japanese "Hello")
         */
        getEncodeBase64(str: string): string;
        /**
         * Creates a deep copy of an object or array, preserving nested structures.
         *
         * - Handles `Object` and `Array` types recursively.
         * - Supports cloning custom objects implementing `getIsDataWrapper()` or `getIsDataModel()`.
         * - Prevents infinite loops by tracking previously copied references.
         * - If the object is `null` or not an object, it is returned as is.
         *
         * @param object The object or array to be deep copied.
         * @param visited An optional array to track visited references and prevent circular references.
         * @returns A deep copy of the input object or array.
         *
         * @example
         * const obj = { a: 1, b: { c: 2 } };
         * const copy = deepCopyObject(obj);
         * copy.b.c = 3;
         * console.log(obj.b.c); // 2 (original object remains unchanged)
         *
         * const arr = [1, [2, 3]];
         * const arrCopy = deepCopyObject(arr);
         * arrCopy[1][0] = 99;
         * console.log(arr[1][0]); // 2 (original array remains unchanged)
         */
        deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any;
    }
    
    //====================================================================================
    //shield
    //====================================================================================
    /**
     * Enforces security policies on the given `Hison` instance, including access restrictions and object immutability.
     *
     * This function applies multiple layers of security to protect the `Hison` instance and enforce security policies:
     * - **Object Freezing**: Prevents modification of the `Hison` object.
     * - **Access Control by URL and IP**: Restricts access based on predefined security settings.
     * - **Developer Tool Restrictions**: Detects and prevents unauthorized debugging or tampering.
     * - **Back Navigation Prevention**: Blocks browser back navigation if enabled.
     *
     * @param hison The `Hison` object to secure and optionally freeze.
     *
     * @throws Error If `hison` is not provided.
     * @throws Error If `hison` is not an instance of `Hison`.
     *
     * @remarks
     * This function enhances security by enforcing strict runtime protections. It utilizes configuration settings from
     * `customOption.shield` to determine the applied security policies.
     *
     * ---
     * ## Security Features & Execution Flow
     *
     * ### 1. **Validation of `hison` Parameter**
     * - If `hison` is not provided, an error is thrown:  
     *   `"Invalid argument: 'hison' is required."`
     * - Ensures that the input is a valid `Hison` instance before executing security functions.
     * - If `hison.constructor !== Hison`, an error is thrown:  
     *   `"Invalid argument: 'hison' must be an instance of Hison."`
     *
     * ### 2. **Object Freezing (`isFreeze`)**
     * - If `customOption.isFreeze` is `true`, the `Hison` object is **deeply frozen**.
     * - Uses the `deepFreeze()` function to recursively apply `Object.freeze()`, preventing modifications.
     *
     * ### 3. **Access Control by URL (`shieldURL`)**
     * - If `customOption.shieldURL` is set:
     *   - Ensures the current URL matches `shieldURL`.
     *   - If the URL does not match, execution stops immediately.
     *
     * ### 4. **IP-Based Access Control (`exposeIpList`)**
     * - If the request is **not from `localhost`**, it performs IP verification:
     *   - Fetches the user's IP from `/ajax/getIp`.
     *   - Compares the retrieved IP against `customOption.exposeIpList`.
     *   - If the IP is **not** in the list, additional restrictions are applied:
     *     - **Back Navigation is Blocked** if `isPossibleGoBack` is `false`.
     *     - **Developer Tools are Restricted** if `isPossibleOpenDevTool` is `false`.
     *
     * ### 5. **Back Navigation Prevention (`isPossibleGoBack`)**
     * - If `customOption.isPossibleGoBack` is `false`:
     *   - Overrides the browser's back button functionality using `history.pushState()`.
     *   - Registers an event listener to **prevent back navigation**.
     *
     * ### 6. **Developer Tool Restrictions (`isPossibleOpenDevTool`)**
     * - If `customOption.isPossibleOpenDevTool` is `false`:
     *   - Blocks `F12` keypress to prevent opening developer tools.
     *   - Uses `debugger` trick and event listeners (`resize`, `mousemove`, `focus`, `blur`) to detect dev tools.
     *   - Displays a warning message and prevents further execution if dev tools are detected.
     *
     * ---
     * ## Related Methods
     * - `hison.setShieldURL(url: string)` → Sets the URL restriction for access control.
     * - `hison.setExposeIpList(ipList: string[])` → Defines a whitelist of allowed IP addresses.
     * - `hison.setIsFreeze(state: boolean)` → Enables or disables object freezing.
     * - `hison.setIsPossibleGoBack(state: boolean)` → Enables or disables back navigation prevention.
     * - `hison.setIsPossibleOpenDevTool(state: boolean)` → Enables or disables developer tool restrictions.
     *
     * @example
     * // Execute security features for the Hison instance
     * shield.excute(hison);
     */
    shield: {
        /**
         * Checks if the object is Hison.
         */
        isHison: boolean;
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
        excute(hison: Hison): void;
    };
    
    //====================================================================================
    //data
    //====================================================================================
    /**
     * The `hison.data` module provides core data management structures within the `hisondev` ecosystem.
     * It includes:
     *
     * - **`DataWrapper`**: A key-value based data storage container.
     * - **`DataModel`**: A structured table-like data model for handling tabular data.
     *
     * These components enable **efficient data storage, retrieval, validation, and transformation** 
     * while maintaining type safety and structural consistency.
     *
     * ## Core Features
     *
     * ### **1. Structured Data Management**
     * - `DataWrapper` provides **key-value storage**, allowing easy organization of structured data.
     * - `DataModel` offers **tabular data management**, ensuring **column consistency** across rows.
     *
     * ### **2. Data Transformation & Validation**
     * - Supports **custom conversion logic** through `hison.setConvertValue()`, allowing pre-insertion transformations.
     * - Allows setting a **`DataModelValidator`** to validate column values.
     * - Supports **`DataModelFormatter`** for automatic column formatting.
     *
     * ### **3. Deep Copy & Serialization**
     * - Ensures **data immutability** using **deep cloning** (`clone()`).
     * - Supports **JSON serialization** for structured data transfer (`getSerialized()`).
     *
     * ### **4. Integration Between `DataWrapper` and `DataModel`**
     * - `DataWrapper` can **store and retrieve** `DataModel` instances seamlessly.
     * - Allows flexible conversion between **key-value storage** and **structured table data**.
     *
     * ## Example Usage
     *
     * ### **Using `DataWrapper` for Key-Value Storage**
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ username: "Alice", age: 30 });
     * console.log(dataWrapper.getString("username")); // Output: "Alice"
     * ```
     *
     * ### **Using `DataModel` for Tabular Data**
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 }
     * ]);
     *
     * // Formatting and validation
     * dataModel.setColumnSameFormat("age", (value) => `${value} years old`);
     * dataModel.isValidValue("age", value => typeof value === "number");
     * ```
     *
     * ### **Storing `DataModel` Inside `DataWrapper`**
     * ```typescript
     * const usersData = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper();
     * dataWrapper.putDataModel("users", usersData);
     * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
     * ```
     *
     * ## Related Functions
     * - **`hison.setConvertValue(func)`**: 
     *   - Allows defining a **custom value transformation function** for `DataModel`.
     *   - Useful for formatting **Date objects** or handling special types before insertion.
     *   - Example:
     *   ```typescript
     *   hison.setConvertValue((value) => value instanceof Date ? value.toISOString() : value);
     *   ```
     */
    data: {
        /**
         * The `DataWrapper` class provides a flexible key-value storage container
         * within the `hisondev` solution. It allows storing various data types,
         * including string value and `DataModel` instances.
         *
         * ## Core Features:
         * - **Key-Value Storage:**
         *   - Supports dynamic insertion and retrieval of key-value pairs.
         *   - Ensures that keys are always strings.
         * - **Integration with `DataModel`:**
         *   - Allows storing `DataModel` instances under specific keys.
         *   - Provides methods to retrieve `DataModel` instances safely.
         * - **Serialization & Cloning:**
         *   - Supports deep cloning of stored data.
         *   - Provides JSON serialization for structured data handling.
         * - **Validation & Type Safety:**
         *   - Ensures type safety for values stored in `DataWrapper`.
         *   - Throws errors when attempting to insert invalid types.
         *
         * ## Data Integrity & Deep Copying:
         * - Uses `hison.utils.deepCopyObject()` to ensure stored objects are immutable.
         * - Prevents unintended modifications by returning cloned values.
         *
         * ## Example Usage:
         * ```typescript
         * // Creating a DataWrapper with key-value pairs
         * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
         * console.log(dataWrapper.getString("name")); // Output: "Alice"
         *
         * // Storing a DataModel instance
         * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
         * dataWrapper.putDataModel("users", dataModel);
         * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
         *
         * // Serializing the DataWrapper to JSON
         * console.log(dataWrapper.getSerialized());
         * ```
         */
        DataWrapper: new (keyOrObject?: Record<string, any> | string, value?: any) => InterfaceDataWrapper;
        /**
         * The `DataModel` class provides a structured way to manage tabular data within the `hisondev` solution.
         * It is designed to store, manipulate, and retrieve data efficiently while ensuring type consistency
         * and validation. 
         * 
         * ## Core Features:
         * - **Column and Row Management:**
         *   - Supports dynamic addition and removal of columns and rows.
         *   - Ensures column consistency when inserting data.
         * - **Validation and Formatting:**
         *   - Allows setting a `DataModelValidator` to check column values.
         *   - Supports `DataModelFormatter` to format column values uniformly.
         * - **Filtering and Searching:**
         *   - Provides methods to filter rows based on conditions (`filterRows()`, `searchRows()`).
         *   - Allows searching rows and modifying data accordingly (`searchAndModify()`).
         * - **Sorting and Structuring:**
         *   - Supports ascending, descending, and reverse sorting on both columns and rows.
         * - **Serialization and Cloning:**
         *   - Enables deep copying of the entire `DataModel`.
         *   - Provides `getSerialized()` to retrieve a JSON string of the model.
         * - **Integration with `DataWrapper`**
         *   - DataWrapper is an instance for storing DataModel.
         *
         * ## Data Consistency and Validation:
         * - Uses `_deepCopy()` to ensure stored objects are immutable.
         * - Prevents invalid data types using `_getValidRowValue()`.
         * - Ensures uniform column data types to maintain consistency.
         *
         * ## Example Usage:
         * ```typescript
         * const dataModel = new hison.data.DataModel([
         *     { id: 1, name: "Alice", age: 25 },
         *     { id: 2, name: "Bob", age: 30 }
         * ]);
         * 
         * // Add a new column
         * dataModel.addColumn("gender");
         * 
         * // Set a default value for a column
         * dataModel.setColumnSameValue("gender", "Unknown");
         * 
         * // Apply a formatting function to the age column
         * dataModel.setColumnSameFormat("age", (value) => `${value} years old`);
         * 
         * // Get filtered rows where age is greater than 25
         * const filtered = dataModel.filterRows(row => row.age > 25);
         * console.log(filtered);
         * ```
         *
         * ## Related Functions:
         * - `hison.setConvertValue()`: Sets the conversion logic for special values before insertion.
         *
         */
        DataModel: new (data?: Record<string, any>[] | Record<string, any>) => InterfaceDataModel;
    };

    //====================================================================================
    //link
    //====================================================================================
    /**
     * The `hison.link` object provides core communication modules for interacting with the hisondev platform.
     * It serves as a central hub for API requests, caching, and WebSocket communication.
     *
     * ## Key Components
     * - **`CachingModule`**: Manages API response caching using an LRU (Least Recently Used) strategy.
     * - **`ApiGet`, `ApiPost`, `ApiPut`, `ApiPatch`, `ApiDelete`**: Handle REST API calls by encapsulating request logic.
     * - **`ApiGetUrl`, `ApiPostUrl`, `ApiPutUrl`, `ApiPatchUrl`, `ApiDeleteUrl`**: Similar to the above, but allow direct URL-based requests.
     *
     * These components simplify API integration and provide caching and event-driven request handling.
     *
     * ## How It Works
     * - **API requests are wrapped in `DataWrapper` instances**, which store key-value data.
     * - **The `cmd` property in `DataWrapper` determines the service path**, directing the request to the appropriate business logic on the server.
     * - **`CachingModule` enables response caching**, reducing redundant network calls for frequently accessed resources.
     * - **`EventEmitter` allows developers to listen for request events**, such as completion, errors, or specific triggers.
     *
     * ## Example Usage
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
     * ## Internal Structure
     * - **Uses `ApiLink` for handling network requests**.
     * - **Utilizes `EventEmitter` for event-driven communication**.
     * - **Supports WebSocket integration via `CachingModule`**.
     * - **Compatible with `CustomOption` for flexible configuration**.
     */
    link: {
        /**
         * **`CachingModule` - A module for API response caching and real-time WebSocket updates.**
         *
         * The `CachingModule` provides a caching mechanism for API responses using an **LRU (Least Recently Used) strategy** 
         * while integrating **WebSocket communication** for real-time data updates.
         *
         * ## **Key Features**
         * - **LRU Cache for API Responses**: Stores API responses with a configurable limit, reducing redundant network requests.
         * - **WebSocket Support**: Maintains a persistent WebSocket connection for real-time data updates.
         * - **Cache Management Methods**: Supports cache operations (`get`, `put`, `remove`, `clear`, etc.).
         * - **Event-Driven Communication**: Allows event listeners (`onopen`, `onmessage`, `onclose`, `onerror`) for WebSocket handling.
         * - **Flexible Configuration**: Uses `CustomOption` settings for cache limits and WebSocket parameters.
         * - **Validation Methods**: Ensures proper data types for cache keys and event listeners.
         *
         * ## **How It Works**
         * - **API responses are stored in an LRUCache instance**, avoiding redundant network calls.
         * - **When a WebSocket connection is established**, data updates can be received in real-time.
         * - **Cache data can be accessed and managed using `get`, `put`, `remove`, and `clear` methods.**
         * - **WebSocket event handlers can be set up for real-time notifications.**
         *
         * ## **Example Usage**
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
         * ## **Internal Structure**
         * - **Uses `LRUCache`** to manage cached responses with a defined limit.
         * - **Maintains a WebSocket connection** to receive real-time data updates.
         * - **Supports configurable options via `CustomOption`**, such as WebSocket endpoint and cache size.
         * - **Provides utility methods** for cache validation, data retrieval, and event handling.
         *
         * ## **Related Components**
         * - **`LRUCache`**: Handles the caching logic for API responses.
         * - **`WebSocket`**: Establishes a real-time connection for live data updates.
         * - **`CustomOption`**: Provides configurable options for WebSocket and cache settings.
         * - **`ApiLink`**: Uses this module to fetch and store API responses efficiently.
         *
         * ## **Return Value**
         * - This module **returns an instance of `CachingModule`**, which allows cache operations and WebSocket event management.
         *
         * ## **Typical Use Cases**
         * - **Reducing unnecessary API calls** by storing frequently accessed responses.
         * - **Receiving real-time updates** from the server without polling.
         * - **Efficiently managing API response data** in web applications.
         * - **Supporting offline or low-latency scenarios** by using cached responses.
         */
        CachingModule: new (cachingLimit?: number) => InterfaceCachingModule;
        /**
         * **`ApiGet` - A class for handling HTTP GET requests within the `hison.link` module.**
         *
         * The `ApiGet` class is responsible for sending HTTP GET requests to a specified API resource. 
         * It integrates with `ApiLink` to handle request execution, event emissions, and optional response caching.
         *
         * ## **Key Features**
         * - **Executes HTTP GET requests** using `ApiLink`.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows setting event listeners** for request completion, errors, and other key events.
         *
         * ## **How It Works**
         * - When instantiated, `ApiGet` stores the API resource path and an optional `CachingModule` instance.
         * - The `call()` method triggers a GET request to the specified resource path.
         * - If caching is enabled, previously stored responses may be returned instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiGet without caching
         * const apiGet = new hison.link.ApiGet("/users");
         * 
         * // Sending a GET request
         * apiGet.call().then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiGet = new hison.link.ApiGet("/users", cachingModule);
         * 
         * // Handling request events
         * cachedApiGet.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("GET request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-based request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiGet`, which provides methods for executing GET requests and managing request events.
         *
         * ## **Typical Use Cases**
         * - **Fetching data from a REST API** with minimal setup.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiGet: new (resourcePath?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiGet;
        /**
         * **`ApiPost` - A class for handling HTTP POST requests within the `hison.link` module.**
         *
         * The `ApiPost` class is responsible for sending HTTP POST requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ## **Key Features**
         * - **Executes HTTP POST requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiPost` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a POST request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiPost
         * const apiPost = new hison.link.ApiPost("UserService.createUser");
         *
         * // Creating request data
         * const requestData = new hison.data.DataWrapper();
         * requestData.putString("username", "Alice");
         * 
         * // Sending a POST request
         * apiPost.call(requestData).then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiPost.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("POST request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiPost`, providing methods for executing POST requests and managing request events.
         *
         * ## **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPost: new (serviceCmd: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPost;
        /**
         * **`ApiPut` - A class for handling HTTP PUT requests within the `hison.link` module.**
         *
         * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ## **Key Features**
         * - **Executes HTTP PUT requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiPut` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a PUT request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiPut
         * const apiPut = new hison.link.ApiPut("UserService.createUser");
         *
         * // Creating request data
         * const requestData = new hison.data.DataWrapper();
         * requestData.putString("username", "Alice");
         * 
         * // Sending a PUT request
         * apiPut.call(requestData).then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiPut = new hison.link.ApiPut("UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiPut.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("PUT request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiPut`, providing methods for executing PUT requests and managing request events.
         *
         * ## **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPut: new (serviceCmd: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPut;
        /**
         * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
         *
         * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ## **Key Features**
         * - **Executes HTTP PATCH requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a PATCH request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiPatch
         * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
         *
         * // Creating request data
         * const requestData = new hison.data.DataWrapper();
         * requestData.putString("username", "Alice");
         * 
         * // Sending a PATCH request
         * apiPatch.call(requestData).then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiPatch = new hison.link.ApiPatch("UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("PATCH request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiPatch`, providing methods for executing PATCH requests and managing request events.
         *
         * ## **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPatch: new (serviceCmd: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPatch;
        /**
         * **`ApiDelete` - A class for handling HTTP DELETE requests within the `hison.link` module.**
         *
         * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ## **Key Features**
         * - **Executes HTTP DELETE requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiDelete` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a DELETE request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiDelete
         * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
         *
         * // Creating request data
         * const requestData = new hison.data.DataWrapper();
         * requestData.putString("username", "Alice");
         * 
         * // Sending a DELETE request
         * apiDelete.call(requestData).then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiDelete = new hison.link.ApiDelete("UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("DELETE request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiDelete`, providing methods for executing DELETE requests and managing request events.
         *
         * ## **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiDelete: new (serviceCmd: string, cachingModule?: InterfaceCachingModule) => InterfaceApiDelete;
        /**
         * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
         *
         * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
         * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
         *
         * ## **Key Features**
         * - **Executes HTTP GET requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined API resource path.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiGetUrl` requires a valid URL.
         * - The `call()` method triggers a GET request to the specified URL.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiGetUrl without caching
         * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
         * 
         * // Sending a GET request
         * apiGetUrl.call().then(response => {
         *     console.log(response.data); // Response data
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
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
         *
         * ## **Typical Use Cases**
         * - **Fetching data from an external API** by specifying a full URL.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiGetUrl: new (url: string, cachingModule?: InterfaceCachingModule) => InterfaceApiGetUrl;
        /**
         * **`ApiPostUrl` - A class for handling HTTP POST requests to a specified URL.**
         *
         * The `ApiPostUrl` class is responsible for sending HTTP POST requests to a provided URL.
         * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
         *
         * ## **Key Features**
         * - **Executes HTTP POST requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a POST request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiPostUrl
         * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
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
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("POST request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiPostUrl`, which provides methods for executing POST requests to a specific URL.
         *
         * ## **Typical Use Cases**
         * - **Sending data to an external API** using a full URL.
         * - **Passing a `serviceCmd` for structured request routing**.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPostUrl: new (url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPostUrl;
        /**
         * **`ApiPutUrl` - A class for handling HTTP PUT requests to a specified URL.**
         *
         * The `ApiPutUrl` class is responsible for sending HTTP PUT requests to a provided URL.
         * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
         *
         * ## **Key Features**
         * - **Executes HTTP PUT requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a PUT request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiPutUrl
         * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
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
         * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("PUT request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiPutUrl`, which provides methods for executing PUT requests to a specific URL.
         *
         * ## **Typical Use Cases**
         * - **Sending data to an external API** using a full URL.
         * - **Passing a `serviceCmd` for structured request routing**.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPutUrl: new (url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPutUrl;
        /**
         * **`ApiPatchUrl` - A class for handling HTTP PATCH requests to a specified URL.**
         *
         * The `ApiPatchUrl` class is responsible for sending HTTP PATCH requests to a provided URL.
         * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
         *
         * ## **Key Features**
         * - **Executes HTTP PATCH requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a PATCH request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiPatchUrl
         * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
         *
         * // Creating request data
         * const requestData = new hison.data.DataWrapper();
         * requestData.putString("username", "Alice");
         * 
         * // Sending a PATCH request
         * apiPatchUrl.call(requestData).then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("PATCH request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiPatchUrl`, which provides methods for executing PATCH requests to a specific URL.
         *
         * ## **Typical Use Cases**
         * - **Sending data to an external API** using a full URL.
         * - **Passing a `serviceCmd` for structured request routing**.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPatchUrl: new (url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPatchUrl;
        /**
         * **`ApiDeleteUrl` - A class for handling HTTP DELETE requests to a specified URL.**
         *
         * The `ApiDeleteUrl` class is responsible for sending HTTP DELETE requests to a provided URL.
         * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
         *
         * ## **Key Features**
         * - **Executes HTTP DELETE requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ## **How It Works**
         * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a DELETE request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ## **Example Usage**
         * ```typescript
         * // Creating an instance of ApiDeleteUrl
         * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
         *
         * // Creating request data
         * const requestData = new hison.data.DataWrapper();
         * requestData.putString("username", "Alice");
         * 
         * // Sending a DELETE request
         * apiDeleteUrl.call(requestData).then(response => {
         *     console.log(response.data); // Response data
         * });
         *
         * // Creating an instance with caching
         * const cachingModule = new hison.link.CachingModule(20);
         * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
         *
         * // Handling request events
         * cachedApiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
         *     console.log("DELETE request completed!", data);
         * });
         * ```
         *
         * ## **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ## **Return Value**
         * - This class returns an instance of `ApiDeleteUrl`, which provides methods for executing DELETE requests to a specific URL.
         *
         * ## **Typical Use Cases**
         * - **Sending data to an external API** using a full URL.
         * - **Passing a `serviceCmd` for structured request routing**.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiDeleteUrl: new (url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiDeleteUrl;
    }
}
//====================================================================================
//utils interface, type
//====================================================================================
/**
 * Represents a date structure with year, month, and day properties.
 *
 * - `y`: The year (e.g., `2025`).
 * - `M`: The month (`1-12`).
 * - `d`: The day of the month (`1-31`).
 *
 * All properties can be `null` if no value is set.
 */
interface DateObject {
    y: number | null;
    M: number | null;
    d: number | null;
}
/**
 * Represents a time structure with hours, minutes, and seconds.
 *
 * - `h`: The hour (`0-23`).
 * - `m`: The minutes (`0-59`).
 * - `s`: The seconds (`0-59`).
 *
 * All properties can be `null` if no value is set.
 */
interface TimeObject {
    h: number | null;
    m: number | null;
    s: number | null;
}
/**
 * Represents a full datetime structure combining `DateObject` and `TimeObject`.
 *
 * - Includes year, month, day, hour, minute, and second properties.
 * - All properties can be `null` if no value is set.
 */
interface DateTimeObject extends DateObject, TimeObject {}
/**
 * Enum representing the full names of the months (`January` to `December`).
 *
 * - Values range from `1` to `12`, corresponding to the month number.
 */
enum MonthFullName {
    January = 1, February, March, April, May, June, July, August, September, October, November, December
}
/**
 * Enum representing the abbreviated names of the months (`Jan` to `Dec`).
 *
 * - Values range from `1` to `12`, corresponding to the month number.
 */
enum MonthShortName {
    Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
}
/**
 * Enum representing the full English names of the days of the week (`Sunday` to `Saturday`).
 *
 * - Values range from `0` to `6`, where `0 = Sunday`, `1 = Monday`, ..., `6 = Saturday`.
 */
enum DayOfWeekFullName {
    Sun = 0, Mon, Tue, Wed, Thu, Fri, Sat
}
/**
 * Enum representing the abbreviated English names of the days of the week (`Sun` to `Sat`).
 *
 * - Values range from `0` to `6`, where `0 = Sun`, `1 = Mon`, ..., `6 = Sat`.
 */
enum DayOfWeekShortName {
    Sunday = 0, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}
/**
 * Enum representing the full Korean names of the days of the week (`일요일` to `토요일`).
 *
 * - Values range from `0` to `6`, where `0 = 일요일`, `1 = 월요일`, ..., `6 = 토요일`.
 */
enum DayOfWeekFullNameKR {
    일 = 0, 월, 화, 수, 목, 금, 토
}
/**
 * Enum representing the abbreviated Korean names of the days of the week (`일` to `토`).
 *
 * - Values range from `0` to `6`, where `0 = 일`, `1 = 월`, ..., `6 = 토`.
 */
enum DayOfWeekShortNameKR {
    일요일 = 0, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일
}
//====================================================================================
//shield interface, type
//====================================================================================

//====================================================================================
//data interface, type
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
 * The `DataWrapper` class provides a flexible key-value storage container
 * within the `hisondev` solution. It allows storing various data types,
 * including string value and `DataModel` instances.
 *
 * ## Core Features:
 * - **Key-Value Storage:**
 *   - Supports dynamic insertion and retrieval of key-value pairs.
 *   - Ensures that keys are always strings.
 * - **Integration with `DataModel`:**
 *   - Allows storing `DataModel` instances under specific keys.
 *   - Provides methods to retrieve `DataModel` instances safely.
 * - **Serialization & Cloning:**
 *   - Supports deep cloning of stored data.
 *   - Provides JSON serialization for structured data handling.
 * - **Validation & Type Safety:**
 *   - Ensures type safety for values stored in `DataWrapper`.
 *   - Throws errors when attempting to insert invalid types.
 *
 * ## Data Integrity & Deep Copying:
 * - Uses `hison.utils.deepCopyObject()` to ensure stored objects are immutable.
 * - Prevents unintended modifications by returning cloned values.
 *
 * ## Example Usage:
 * ```typescript
 * // Creating a DataWrapper with key-value pairs
 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
 * console.log(dataWrapper.getString("name")); // Output: "Alice"
 *
 * // Storing a DataModel instance
 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
 * dataWrapper.putDataModel("users", dataModel);
 * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
 *
 * // Serializing the DataWrapper to JSON
 * console.log(dataWrapper.getSerialized());
 * ```
 */
interface InterfaceDataWrapper {
    /**
     * Checks whether the current instance is a `DataWrapper`.
     * This method is primarily used for type verification.
     *
     * ## Returns
     * - **`boolean`**: Returns `true` if the instance is a `DataWrapper`, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ key: "value" });
     * console.log(dataWrapper.getIsDataWrapper()); // Output: true
     * ```
     *
     * @returns {boolean} `true` if the instance is a `DataWrapper`, otherwise `false`.
     */
    getIsDataWrapper(): boolean;
    /**
     * Creates and returns a deep copy of the current `DataWrapper` instance.
     * This method ensures that all stored key-value pairs are fully cloned, 
     * preventing unintended modifications between the original and copied instances.
     *
     * ## Implementation Details
     * - Uses `hison.utils.deepCopyObject()` to recursively copy nested objects and arrays.
     * - Supports cloning `DataModel` instances stored within the `DataWrapper`.
     * - Prevents circular references by tracking previously copied objects.
     * - Ensures that modifications in the cloned instance do not affect the original instance.
     *
     * ## Returns
     * - **`DataWrapper`**: A new `DataWrapper` instance containing a deep copy of the original data.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * const clonedWrapper = dataWrapper.clone();
     * 
     * console.log(clonedWrapper.getString("name")); // Output: "Alice"
     * console.log(clonedWrapper !== dataWrapper);   // Output: true (Cloned instance is independent)
     *
     * // Deep copy verification
     * const originalNested = new hison.data.DataModel([{ id: 1, value: "Test" }]);
     * const dataWrapperWithModel = new hison.data.DataWrapper({ nested: originalNested });
     * const clonedWrapperWithModel = dataWrapperWithModel.clone();
     * 
     * console.log(clonedWrapperWithModel.getDataModel("nested") !== originalNested); // Output: true
     * ```
     *
     * @returns {InterfaceDataWrapper} A new `DataWrapper` instance with a deep copy of the stored data.
     */
    clone(): InterfaceDataWrapper | null;
    /**
     * Removes all stored key-value pairs in the `DataWrapper`, resetting it to an empty state.
     * 
     * ## Behavior
     * - Clears the internal storage by setting `_data` to an empty object.
     * - Returns the same `DataWrapper` instance for method chaining.
     *
     * ## Returns
     * - **`DataWrapper`**: The current instance after clearing all stored data.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ key1: "value1", key2: "value2" });
     * console.log(dataWrapper.size()); // Output: 2
     * 
     * dataWrapper.clear();
     * console.log(dataWrapper.size()); // Output: 0
     * ```
     *
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after clearing all data.
     */
    clear(): InterfaceDataWrapper;
    /**
     * Serializes the `DataWrapper` into a JSON string representation.
     * Converts stored `DataModel` instances into their row data format for proper serialization.
     *
     * ## Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - If a value is a `DataModel`, it is converted to an array of rows using `getRows()`.
     * - Other values are stored as-is.
     * - The final object is serialized into a JSON string.
     *
     * ## Returns
     * - **`string`**: A JSON string representation of the `DataWrapper` contents.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper({ users: dataModel, status: "active" });
     * 
     * console.log(dataWrapper.getSerialized());
     * // Output: '{"users":[{"id":1,"name":"Alice"}],"status":"active"}'
     * ```
     *
     * @returns {string} JSON string representation of the stored data.
     */
    getSerialized(): string;
    /**
     * Retrieves the value associated with the specified key from the `DataWrapper`.
     * If the value exists, a deep copy is returned to prevent unintended modifications.
     *
     * ## Parameters
     * - `key` **(string)**: The key associated with the value to retrieve.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - If the key exists, returns a deep copy of the stored value.
     * - If the key does not exist, returns `null`.
     *
     * ## Returns
     * - **`DataModel | string | null`**: A deep copy of the stored value, or `null` if the key is not found.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ message: "Hello", users: new hison.data.DataModel([{ id: 1 }]) });
     * 
     * console.log(dataWrapper.get("message")); // Output: "Hello"
     * console.log(dataWrapper.get("users"));   // Output: Deep copy of the DataModel instance
     * console.log(dataWrapper.get("nonExistentKey")); // Output: null
     * ```
     *
     * @param {string} key The key to retrieve the associated value.
     * @returns {InterfaceDataModel | string | null} A deep copy of the stored value, or `null` if the key is not found.
     */
    get(key: string): InterfaceDataModel | string | null;
    /**
     * Retrieves the string value associated with the specified key from the `DataWrapper`.
     * Ensures that the retrieved value is explicitly a string before returning it.
     *
     * ## Parameters
     * - `key` **(string)**: The key associated with the string value to retrieve.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if the value associated with `key` is not a string.
     * - Returns the string value if it exists; otherwise, returns `null`.
     *
     * ## Returns
     * - **`string | null`**: The associated string value, or `null` if the key is not found.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ status: "active", count: 5 });
     * 
     * console.log(dataWrapper.getString("status")); // Output: "active"
     * console.log(dataWrapper.getString("nonExistentKey")); // Output: null
     *
     * // Throws an error: "The data does not contain the specified string value."
     * console.log(dataWrapper.getString("count"));
     * ```
     *
     * @param {string} key The key associated with the string value.
     * @returns {string | null} The associated string value, or `null` if not found.
     * @throws {Error} If the key is not a string or if the stored value is not a string.
     */
    getString(key: string): string | null;
    /**
     * Retrieves the `DataModel` instance associated with the specified key from the `DataWrapper`.
     * Ensures that the retrieved value is a valid `DataModel` before returning a cloned copy.
     *
     * ## Parameters
     * - `key` **(string)**: The key associated with the `DataModel` instance to retrieve.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if the value associated with `key` is not a valid `DataModel` instance.
     * - Returns a deep-cloned copy of the `DataModel` to maintain data integrity.
     *
     * ## Returns
     * - **`DataModel`**: A cloned `DataModel` instance retrieved from the `DataWrapper`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper({ users: dataModel });
     * 
     * const clonedDataModel = dataWrapper.getDataModel("users");
     * console.log(clonedDataModel.getRowCount()); // Output: 1
     *
     * // Throws an error: "The data does not contain the specified data-model value."
     * console.log(dataWrapper.getDataModel("nonExistentKey"));
     * ```
     *
     * @param {string} key The key associated with the `DataModel` instance.
     * @returns {InterfaceDataModel} A cloned `DataModel` instance retrieved from the `DataWrapper`.
     * @throws {Error} If the key is not a string or if the stored value is not a valid `DataModel`.
     */
    getDataModel(key: string): InterfaceDataModel;
    /**
     * Inserts or updates a key-value pair in the `DataWrapper`.
     * Allows storing primitive values, strings, and `DataModel` instances.
     *
     * ## Parameters
     * - `key` **(string)**: The key under which the value will be stored.
     * - `value` **(any)**: The value to be stored. Can be a string, number, boolean, `DataModel`, or other valid types.
     *
     * ## Behavior
     * - Calls the internal `_put()` method to validate and store the value.
     * - If the key already exists, its value is updated.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ## Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the value.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * 
     * // Storing a string value
     * dataWrapper.put("status", "active");
     * console.log(dataWrapper.getString("status")); // Output: "active"
     * 
     * // Storing a DataModel instance
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.put("users", dataModel);
     * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
     * ```
     *
     * @param {string} key The key under which the value is stored.
     * @param {any} value The value to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     */
    put(key: string, value: any): InterfaceDataWrapper;
    /**
     * Inserts or updates a key-value pair in the `DataWrapper`, ensuring that the value is a string-convertible type.
     * Only accepts primitive types (`string`, `number`, `boolean`, `bigint`, `symbol`) or `null`.
     *
     * ## Parameters
     * - `key` **(string)**: The key under which the value will be stored.
     * - `value` **(string | number | boolean | bigint | symbol | null)**: The value to be stored, 
     *   restricted to types that can be converted to a string.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if `value` is not of a valid type.
     * - Calls the internal `_put()` method to store the value.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ## Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the value.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * 
     * // Storing a string value
     * dataWrapper.putString("status", "active");
     * console.log(dataWrapper.getString("status")); // Output: "active"
     *
     * // Storing a number (converted to string internally)
     * dataWrapper.putString("count", 10);
     * console.log(dataWrapper.getString("count")); // Output: "10"
     *
     * // Throws an error: "Please insert only values convertible to string type."
     * dataWrapper.putString("invalid", { key: "value" });
     * ```
     *
     * @param {string} key The key under which the value is stored.
     * @param {string | number | boolean | bigint | symbol | null} value The value to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     * @throws {Error} If `key` is not a string or `value` is not a valid type.
     */
    putString(key: string, value: string | number | boolean | bigint | symbol | null): InterfaceDataWrapper;
    /**
     * Inserts or updates a `DataModel` instance in the `DataWrapper`.
     * Ensures that the stored value is a valid `DataModel`.
     *
     * ## Parameters
     * - `key` **(string)**: The key under which the `DataModel` will be stored.
     * - `value` **(`DataModel`)**: The `DataModel` instance to be stored.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if `value` is not a valid `DataModel` instance.
     * - Calls the internal `_put()` method to store the `DataModel`.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ## Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the `DataModel`.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * 
     * // Creating and storing a DataModel
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.putDataModel("users", dataModel);
     * 
     * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
     *
     * // Throws an error: "Please insert only values of data-model type."
     * dataWrapper.putDataModel("invalid", "not a DataModel");
     * ```
     *
     * @param {string} key The key under which the `DataModel` is stored.
     * @param {InterfaceDataModel} value The `DataModel` instance to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     * @throws {Error} If `key` is not a string or `value` is not a valid `DataModel`.
     */
    putDataModel(key: string, value: InterfaceDataModel): InterfaceDataWrapper;
    /**
     * Converts the `DataWrapper` instance into a standard JavaScript object.
     * If the stored values include `DataModel` instances, they are converted into object representations.
     *
     * ## Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - If a value is a `DataModel`, it is converted using `getObject()`.
     * - Other values are returned as-is.
     * - Returns a plain JavaScript object representation of the `DataWrapper`.
     *
     * ## Returns
     * - **`Record<string, any>`**: A plain object containing all stored key-value pairs.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper({ users: dataModel, status: "active" });
     * 
     * console.log(dataWrapper.getObject());
     * // Output: { users: { cols: ["id", "name"], rows: [{ id: 1, name: "Alice" }] }, status: "active" }
     * ```
     *
     * @returns {Record<string, any>} A plain object representation of the `DataWrapper` instance.
     */
    getObject(): Record<string, any>;
    /**
     * Checks whether the `DataWrapper` contains a specified key.
     *
     * ## Parameters
     * - `key` **(string)**: The key to check for existence in the `DataWrapper`.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - Uses `hasOwnProperty()` to determine if the key exists in the stored data.
     *
     * ## Returns
     * - **`boolean`**: `true` if the key exists, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * 
     * console.log(dataWrapper.containsKey("name")); // Output: true
     * console.log(dataWrapper.containsKey("nonExistentKey")); // Output: false
     * ```
     *
     * @param {string} key The key to check for existence.
     * @returns {boolean} `true` if the key exists, otherwise `false`.
     * @throws {Error} If `key` is not a string.
     */
    containsKey(key: string): boolean;
    /**
     * Checks whether the `DataWrapper` is empty (i.e., contains no key-value pairs).
     *
     * ## Behavior
     * - Determines emptiness by checking if the number of stored keys is `0`.
     *
     * ## Returns
     * - **`boolean`**: `true` if the `DataWrapper` contains no data, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper();
     * console.log(dataWrapper.isEmpty()); // Output: true
     * 
     * dataWrapper.put("status", "active");
     * console.log(dataWrapper.isEmpty()); // Output: false
     * ```
     *
     * @returns {boolean} `true` if the `DataWrapper` contains no data, otherwise `false`.
     */
    isEmpty(): boolean;
    /**
     * Removes a key-value pair from the `DataWrapper` if the key exists.
     *
     * ## Parameters
     * - `key` **(string)**: The key to be removed from the `DataWrapper`.
     *
     * ## Behavior
     * - Throws an error if `key` is not a string.
     * - Checks if the key exists using `hasOwnProperty()`.
     * - If the key exists, it is deleted from the internal data storage.
     * - Returns an object containing the updated `DataWrapper` and a boolean indicating success.
     *
     * ## Returns
     * - **`{ data: DataWrapper, result: boolean }`**:
     *   - `data`: The current `DataWrapper` instance after attempting removal.
     *   - `result`: `true` if the key was successfully removed, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * 
     * console.log(dataWrapper.containsKey("name")); // Output: true
     * 
     * const { data: updatedWrapper, result } = dataWrapper.remove("name");
     * console.log(result); // Output: true
     * console.log(updatedWrapper.containsKey("name")); // Output: false
     *
     * const { result: nonExistentResult } = dataWrapper.remove("nonExistentKey");
     * console.log(nonExistentResult); // Output: false
     * ```
     *
     * @param {string} key The key to remove from the `DataWrapper`.
     * @returns {{ data: InterfaceDataWrapper, result: boolean }} An object containing the updated `DataWrapper` and a success flag.
     * @throws {Error} If `key` is not a string.
     */
    remove(key: string): { data: InterfaceDataWrapper, result: boolean };
    /**
     * Returns the number of key-value pairs stored in the `DataWrapper`.
     *
     * ## Behavior
     * - Counts the number of keys present in the internal data storage.
     *
     * ## Returns
     * - **`number`**: The total number of stored key-value pairs.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.size()); // Output: 2
     * 
     * dataWrapper.put("status", "active");
     * console.log(dataWrapper.size()); // Output: 3
     * ```
     *
     * @returns {number} The number of stored key-value pairs in the `DataWrapper`.
     */
    size(): number;
    /**
     * Retrieves an array of all keys stored in the `DataWrapper`.
     *
     * ## Behavior
     * - Returns a list of all keys currently stored in the `DataWrapper`.
     * - If the `DataWrapper` is empty, returns an empty array.
     *
     * ## Returns
     * - **`string[]`**: An array containing all stored keys.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.keys()); // Output: ["name", "age"]
     * 
     * dataWrapper.clear();
     * console.log(dataWrapper.keys()); // Output: []
     * ```
     *
     * @returns {string[]} An array of keys stored in the `DataWrapper`.
     */
    keys(): string[];
    /**
     * Retrieves an array of all values stored in the `DataWrapper`.
     * Ensures that stored values are returned as deep copies to prevent unintended modifications.
     *
     * ## Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - Uses `hison.utils.deepCopyObject()` to return deep copies of stored values.
     * - If the `DataWrapper` is empty, returns an empty array.
     *
     * ## Returns
     * - **`any[]`**: An array containing deep copies of all stored values.
     *
     * ## Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.values()); // Output: ["Alice", 25]
     * 
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.put("users", dataModel);
     * console.log(dataWrapper.values()); // Output: ["Alice", 25, <cloned DataModel>]
     * ```
     *
     * @returns {any[]} An array of deep-copied values stored in the `DataWrapper`.
     */
    values(): any[];
};

/**
 * The `DataModel` class provides a structured way to manage tabular data within the `hisondev` solution.
 * It is designed to store, manipulate, and retrieve data efficiently while ensuring type consistency
 * and validation. 
 * 
 * ## Core Features:
 * - **Column and Row Management:**
 *   - Supports dynamic addition and removal of columns and rows.
 *   - Ensures column consistency when inserting data.
 * - **Validation and Formatting:**
 *   - Allows setting a `DataModelValidator` to check column values.
 *   - Supports `DataModelFormatter` to format column values uniformly.
 * - **Filtering and Searching:**
 *   - Provides methods to filter rows based on conditions (`filterRows()`, `searchRows()`).
 *   - Allows searching rows and modifying data accordingly (`searchAndModify()`).
 * - **Sorting and Structuring:**
 *   - Supports ascending, descending, and reverse sorting on both columns and rows.
 * - **Serialization and Cloning:**
 *   - Enables deep copying of the entire `DataModel`.
 *   - Provides `getSerialized()` to retrieve a JSON string of the model.
 * - **Integration with `DataWrapper`**
 *   - DataWrapper is an instance for storing DataModel.
 *
 * ## Data Consistency and Validation:
 * - Uses `_deepCopy()` to ensure stored objects are immutable.
 * - Prevents invalid data types using `_getValidRowValue()`.
 * - Ensures uniform column data types to maintain consistency.
 *
 * ## Example Usage:
 * ```typescript
 * const dataModel = new hison.data.DataModel([
 *     { id: 1, name: "Alice", age: 25 },
 *     { id: 2, name: "Bob", age: 30 }
 * ]);
 * 
 * // Add a new column
 * dataModel.addColumn("gender");
 * 
 * // Set a default value for a column
 * dataModel.setColumnSameValue("gender", "Unknown");
 * 
 * // Apply a formatting function to the age column
 * dataModel.setColumnSameFormat("age", (value) => `${value} years old`);
 * 
 * // Get filtered rows where age is greater than 25
 * const filtered = dataModel.filterRows(row => row.age > 25);
 * console.log(filtered);
 * ```
 *
 * ## Related Functions:
 * - `hison.setConvertValue()`: Sets the conversion logic for special values before insertion.
 *
 */
interface InterfaceDataModel {
    /**
     * Checks whether the current instance is a `DataModel`.
     * This method is primarily used for type verification.
     *
     * ## Returns
     * - **`boolean`**: Returns `true` if the instance is a `DataModel`, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * console.log(dataModel.getIsDataModel()); // Output: true
     * ```
     *
     * @returns {boolean} `true` if the instance is a `DataModel`, otherwise `false`.
     */
    getIsDataModel(): boolean;
    /**
     * Creates and returns a deep copy of the current `DataModel` instance.
     * The cloned instance contains independent copies of all stored rows, 
     * ensuring that modifications in the cloned instance do not affect the original instance.
     *
     * ## Behavior
     * - Uses the internal `_rows` data to initialize a new `DataModel` instance.
     * - Ensures that all row data is duplicated to maintain data integrity.
     *
     * ## Returns
     * - **`DataModel`**: A new `DataModel` instance containing a copy of the original rows.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const clonedModel = dataModel.clone();
     * 
     * console.log(clonedModel.getRowCount()); // Output: 1
     * console.log(clonedModel !== dataModel); // Output: true (Cloned instance is independent)
     * ```
     *
     * @returns {InterfaceDataModel} A new `DataModel` instance with a copy of the stored rows.
     */
    clone(): InterfaceDataModel;
    /**
     * Removes all stored rows and columns from the `DataModel`, resetting it to an empty state.
     * 
     * ## Behavior
     * - Clears the `_cols` array, removing all column definitions.
     * - Clears the `_rows` array, removing all stored data.
     * - Returns the same `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after clearing all stored data.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * console.log(dataModel.getRowCount()); // Output: 1
     * 
     * dataModel.clear();
     * console.log(dataModel.getRowCount()); // Output: 0
     * console.log(dataModel.getColumns());  // Output: []
     * ```
     *
     * @returns {InterfaceDataModel} The current `DataModel` instance after clearing all data.
     */
    clear(): InterfaceDataModel;
    /**
     * Serializes the `DataModel` instance into a JSON string representation.
     * Converts the stored row data into a JSON format for easy storage or transmission.
     *
     * ## Behavior
     * - Uses `JSON.stringify()` to serialize the `_rows` array.
     * - Column definitions (`_cols`) are not included in the serialized output.
     *
     * ## Returns
     * - **`string`**: A JSON string representation of the stored row data.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getSerialized());
     * // Output: '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'
     * ```
     *
     * @returns {string} JSON string representation of the stored row data.
     */
    getSerialized(): string;
    /**
     * Checks whether the `DataModel` has defined columns.
     * This method determines if the `DataModel` has been initialized with at least one column.
     *
     * ## Behavior
     * - Returns `true` if `_cols` contains at least one column.
     * - Returns `false` if no columns have been defined.
     *
     * ## Returns
     * - **`boolean`**: `true` if columns are defined, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name"]);
     * console.log(dataModel.isDeclare()); // Output: true
     * 
     * const emptyModel = new hison.data.DataModel();
     * console.log(emptyModel.isDeclare()); // Output: false
     * ```
     *
     * @returns {boolean} `true` if columns are defined, otherwise `false`.
     */
    isDeclare(): boolean;
    /**
     * Retrieves an array of all column names defined in the `DataModel`.
     * Returns a deep copy of the `_cols` array to prevent unintended modifications.
     *
     * ## Behavior
     * - Uses `_deepCopy()` to return a copy of `_cols`, ensuring data integrity.
     * - If no columns are defined, returns an empty array.
     *
     * ## Returns
     * - **`string[]`**: An array of column names.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name"]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     * 
     * const emptyModel = new hison.data.DataModel();
     * console.log(emptyModel.getColumns()); // Output: []
     * ```
     *
     * @returns {string[]} An array containing the column names.
     */
    getColumns(): string[];
    /**
     * Retrieves an array of all values in the specified column.
     * Ensures that returned values are deep copies to prevent unintended modifications.
     *
     * ## Parameters
     * - `column` **(string)**: The column name from which to retrieve values.
     *
     * ## Behavior
     * - Throws an error if `column` is not a valid string.
     * - Throws an error if the specified column does not exist.
     * - Iterates through all rows and extracts the values of the specified column.
     * - Uses `_deepCopy()` to return deep copies of the values.
     *
     * ## Returns
     * - **`any[]`**: An array containing all values from the specified column.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getColumnValues("name")); // Output: ["Alice", "Bob"]
     *
     * // Throws an error: "The column does not exist."
     * console.log(dataModel.getColumnValues("age"));
     * ```
     *
     * @param {string} column The column name from which to retrieve values.
     * @returns {any[]} An array of values from the specified column.
     * @throws {Error} If the column is invalid or does not exist.
     */
    getColumnValues(column: string): any[];
    /**
     * Adds a new column to the `DataModel`.
     * Ensures that all existing rows include the new column with a default value of `null`.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to be added.
     *
     * ## Behavior
     * - Throws an error if `column` is not a valid string.
     * - Calls `_addCol(column)` to validate and add the column.
     * - Iterates through `_rows` and ensures each row includes the new column, assigning `null` if missing.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after adding the new column.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     * 
     * dataModel.addColumn("age");
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice", age: null }
     * ```
     *
     * @param {string} column The name of the column to add.
     * @returns {InterfaceDataModel} The current `DataModel` instance after adding the column.
     * @throws {Error} If the column is invalid or already exists.
     */
    addColumn(column: string): InterfaceDataModel;
    /**
     * Adds multiple new columns to the `DataModel`.
     * Ensures that all existing rows include the newly added columns with a default value of `null`.
     *
     * ## Parameters
     * - `columns` **(string[])**: An array of column names to be added.
     *
     * ## Behavior
     * - Throws an error if `columns` is not an array.
     * - Iterates through the provided column names and calls `_addCol(column)` to validate and add each column.
     * - Ensures that all existing rows include the new columns, assigning `null` if missing.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after adding the new columns.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     * 
     * dataModel.addColumns(["age", "email"]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age", "email"]
     * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice", age: null, email: null }
     * ```
     *
     * @param {string[]} columns An array of column names to add.
     * @returns {InterfaceDataModel} The current `DataModel` instance after adding the columns.
     * @throws {Error} If `columns` is not an array or contains invalid column names.
     */
    addColumns(columns: string[]): InterfaceDataModel;
    /**
     * Sets the same value for all rows in the specified column.
     * If the column does not exist, it is created before assigning values.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to update.
     * - `value` **(any)**: The value to be assigned to all rows in the specified column.
     *
     * ## Behavior
     * - Throws an error if `value` is `undefined`.
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - If the column does not exist, `_addCol(column)` is called to add it.
     * - Iterates through all rows and assigns the specified value using `_getValidRowValue()`.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after setting the column values.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
     * 
     * // Set the same value for all rows in the "status" column
     * dataModel.setColumnSameValue("status", "active");
     * console.log(dataModel.getColumnValues("status")); // Output: ["active", "active"]
     * 
     * // If the column does not exist, it is created automatically
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "status"]
     * ```
     *
     * @param {string} column The name of the column to set the value for.
     * @param {any} value The value to assign to all rows in the column.
     * @returns {InterfaceDataModel} The current `DataModel` instance after updating the column.
     * @throws {Error} If `value` is `undefined` or if the column name is invalid.
     */
    setColumnSameValue(column: string, value: any): InterfaceDataModel;
    /**
     * Applies a formatting function to all values in the specified column.
     * The formatter function transforms each row's value in the column.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to format.
     * - `formatter` **(`DataModelFormatter`)**: A function that takes a value and returns a formatted version of it.
     *
     * ## Behavior
     * - Throws an error if `formatter` is not a valid function.
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Iterates through all rows and applies the `formatter` function to each value in the column.
     * - Ensures that the formatted value is valid using `_getValidRowValue()`.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after formatting the column values.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, price: 1000 },
     *     { id: 2, price: 2000 }
     * ]);
     * 
     * // Format the "price" column by adding a currency symbol
     * dataModel.setColumnSameFormat("price", value => `$${value}`);
     * console.log(dataModel.getColumnValues("price")); // Output: ["$1000", "$2000"]
     * 
     * // Throws an error if the column does not exist
     * // dataModel.setColumnSameFormat("discount", value => `${value}%`);
     * ```
     *
     * @param {string} column The name of the column to format.
     * @param {DataModelFormatter} formatter A function that transforms each value in the column.
     * @returns {InterfaceDataModel} The current `DataModel` instance after formatting the column.
     * @throws {Error} If `formatter` is not a function or if the column does not exist.
     */
    setColumnSameFormat(column: string, formatter: DataModelFormatter): InterfaceDataModel;
    /**
     * Retrieves a deep copy of the row at the specified index.
     * Ensures that modifications to the returned row do not affect the original data.
     *
     * ## Parameters
     * - `rowIndex` **(number)**: The index of the row to retrieve.
     *
     * ## Behavior
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Uses `_deepCopy()` to return a copy of the row, preventing unintended modifications.
     *
     * ## Returns
     * - **`Record<string, any>`**: A deep copy of the row data as an object.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice" }
     *
     * // Throws an error if the index is out of bounds
     * // console.log(dataModel.getRow(10));
     * ```
     *
     * @param {number} rowIndex The index of the row to retrieve.
     * @returns {Record<string, any>} A deep copy of the row data.
     * @throws {Error} If `rowIndex` is out of bounds.
     */
    getRow(rowIndex: number): Record<string, any>;
    /**
     * Retrieves the row at the specified index as a new `DataModel` instance.
     * Converts the row object into a `DataModel` for further structured operations.
     *
     * ## Parameters
     * - `rowIndex` **(number)**: The index of the row to retrieve.
     *
     * ## Behavior
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Initializes a new `DataModel` using the retrieved row data.
     *
     * ## Returns
     * - **`DataModel`**: A new `DataModel` instance containing the specified row.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * const rowDataModel = dataModel.getRowAsDataModel(0);
     * console.log(rowDataModel.getRowCount()); // Output: 1
     * console.log(rowDataModel.getColumns()); // Output: ["id", "name"]
     *
     * // Throws an error if the index is out of bounds
     * // console.log(dataModel.getRowAsDataModel(10));
     * ```
     *
     * @param {number} rowIndex The index of the row to retrieve.
     * @returns {InterfaceDataModel} A new `DataModel` instance containing the row data.
     * @throws {Error} If `rowIndex` is out of bounds.
     */
    getRowAsDataModel(rowIndex: number): InterfaceDataModel;
    /**
     * Adds a new row to the `DataModel` at the specified index or appends it to the end.
     * If no parameters are provided, an empty row is added.
     *
     * ## Parameters
     * - `rowIndexOrRow` **(number | Object, optional)**: The index at which to insert the row, or the row data to insert.
     * - `row` **(Object, optional)**: The row data to insert (only required when `rowIndexOrRow` is a number).
     *
     * ## Behavior
     * - If **no parameters** are provided, an empty row is appended.
     * - If **only a number is provided**, an empty row is inserted at that index.
     * - If **only an object is provided**, it is inserted as a new row at the end.
     * - If **both a number and an object are provided**, the row is inserted at the specified index.
     * - Throws an error if attempting to add a row without first defining columns.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after adding the new row.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name"]);
     * 
     * // Add an empty row
     * dataModel.addRow();
     * console.log(dataModel.getRowCount()); // Output: 1
     * console.log(dataModel.getRow(0)); // Output: { id: null, name: null }
     * 
     * // Add a row with data
     * dataModel.addRow({ id: 1, name: "Alice" });
     * console.log(dataModel.getRow(1)); // Output: { id: 1, name: "Alice" }
     * 
     * // Insert a row at index 1
     * dataModel.addRow(1, { id: 2, name: "Bob" });
     * console.log(dataModel.getRow(1)); // Output: { id: 2, name: "Bob" }
     * 
     * // Throws an error: "Please define the column first."
     * // new hison.data.DataModel().addRow();
     * ```
     *
     * @param {number | Object} [rowIndexOrRow] The index at which to insert the row, or the row data.
     * @param {Object} [row] The row data to insert (only required if `rowIndexOrRow` is a number).
     * @returns {InterfaceDataModel} The current `DataModel` instance after adding the row.
     * @throws {Error} If columns are not defined or parameters are invalid.
     */
    addRow(rowIndexOrRow?: number | Record<string, any>, row?: Record<string, any>): InterfaceDataModel;
    /**
     * Retrieves a deep copy of a range of rows from the `DataModel`.
     * Ensures that modifications to the returned rows do not affect the original data.
     *
     * ## Parameters
     * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
     * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
     *
     * ## Behavior
     * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
     * - If `endRow` is `null`, retrieves rows from `startRow` to the last row.
     * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
     *
     * ## Returns
     * - **`Record<string, any>[]`**: An array of deep-copied row objects.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Charlie" }
     * ]);
     * 
     * console.log(dataModel.getRows()); 
     * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
     * 
     * console.log(dataModel.getRows(1, 2)); 
     * // Output: [{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
     * 
     * // Throws an error if startRow or endRow is out of bounds
     * // console.log(dataModel.getRows(5));
     * ```
     *
     * @param {number} [startRow=0] The starting index of the row range.
     * @param {number} [endRow=null] The ending index of the row range (inclusive).
     * @returns {Record<string, any>[]} An array of deep-copied rows.
     * @throws {Error} If `startRow` or `endRow` is out of bounds.
     */
    getRows(startRow?: number, endRow?: number): Record<string, any>[];
    /**
     * Retrieves a range of rows as a new `DataModel` instance.
     * Ensures that the returned `DataModel` contains independent copies of the selected rows.
     *
     * ## Parameters
     * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
     * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
     *
     * ## Behavior
     * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
     * - If `startRow` is `0` and `endRow` is `null`, returns a clone of the entire `DataModel`.
     * - Uses `_deepCopy()` to ensure the returned rows are independent.
     * - Returns a new `DataModel` containing the selected rows.
     *
     * ## Returns
     * - **`DataModel`**: A new `DataModel` instance containing the selected row range.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Charlie" }
     * ]);
     * 
     * const newModel = dataModel.getRowsAsDataModel(1, 2);
     * console.log(newModel.getRowCount()); // Output: 2
     * console.log(newModel.getRow(0)); // Output: { id: 2, name: "Bob" }
     *
     * // Retrieves all rows as a new DataModel
     * const clonedModel = dataModel.getRowsAsDataModel();
     * console.log(clonedModel.getRowCount()); // Output: 3
     * ```
     *
     * @param {number} [startRow=0] The starting index of the row range.
     * @param {number} [endRow=null] The ending index of the row range (inclusive).
     * @returns {InterfaceDataModel} A new `DataModel` instance containing the selected rows.
     * @throws {Error} If `startRow` or `endRow` is out of bounds.
     */
    getRowsAsDataModel(startRow?: number, endRow?: number): InterfaceDataModel;
    /**
     * Adds multiple rows to the `DataModel`.
     * Each row is validated and inserted into the existing dataset.
     *
     * ## Parameters
     * - `rows` **(`Record<string, any>[]`)**: An array of row objects to be added.
     *
     * ## Behavior
     * - Calls `_put(rows)` to process and insert the provided rows.
     * - Ensures that column structures are maintained.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after adding the new rows.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name"]);
     * 
     * // Add multiple rows
     * dataModel.addRows([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getRowCount()); // Output: 2
     * console.log(dataModel.getRow(1)); // Output: { id: 2, name: "Bob" }
     * ```
     *
     * @param {Record<string, any>[]} rows An array of row objects to add.
     * @returns {InterfaceDataModel} The current `DataModel` instance after adding the rows.
     * @throws {Error} If `rows` contain invalid data.
     */
    addRows(rows: Record<string, any>[]): InterfaceDataModel;
    /**
     * Converts the `DataModel` instance into a standard JavaScript object.
     * The returned object includes column definitions, row data, and metadata.
     *
     * ## Behavior
     * - Uses `_deepCopy()` to ensure that returned data is independent of the original `DataModel`.
     * - Includes the following properties in the returned object:
     *   - `cols`: An array of column names.
     *   - `rows`: An array of row objects.
     *   - `colCount`: The total number of columns.
     *   - `rowCount`: The total number of rows.
     *   - `isDeclare`: A boolean indicating whether columns are defined.
     *
     * ## Returns
     * - **`Record<string, any>`**: A plain object representing the `DataModel` structure.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getObject());
     * // Output:
     * // {
     * //   cols: ["id", "name"],
     * //   rows: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
     * //   colCount: 2,
     * //   rowCount: 2,
     * //   isDeclare: true
     * // }
     * ```
     *
     * @returns {Record<string, any>} A plain object representing the `DataModel` structure.
     */
    getObject(): Record<string, any>;
    /**
     * Retrieves the value at the specified row index and column name.
     * Ensures that the returned value is a deep copy to prevent unintended modifications.
     *
     * ## Parameters
     * - `rowIndex` **(number)**: The index of the row from which to retrieve the value.
     * - `column` **(string)**: The name of the column containing the desired value.
     *
     * ## Behavior
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Uses `_deepCopy()` to return an independent copy of the value.
     *
     * ## Returns
     * - **`any`**: A deep copy of the value stored at the specified row and column.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getValue(0, "name")); // Output: "Alice"
     * 
     * // Throws an error if the column does not exist
     * // console.log(dataModel.getValue(0, "age"));
     * ```
     *
     * @param {number} rowIndex The index of the row to retrieve the value from.
     * @param {string} column The column name containing the value.
     * @returns {any} A deep copy of the value stored at the specified row and column.
     * @throws {Error} If `rowIndex` or `column` is invalid.
     */
    getValue(rowIndex: number, column: string): any;
    /**
     * Sets a value at the specified row index and column name.
     * Ensures that the value is valid and maintains data integrity.
     *
     * ## Parameters
     * - `rowIndex` **(number)**: The index of the row where the value should be set.
     * - `column` **(string)**: The name of the column where the value should be stored.
     * - `value` **(any)**: The value to be assigned to the specified row and column.
     *
     * ## Behavior
     * - Throws an error if `value` is `undefined`.
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Calls `_getValidRowValue(rowIndex, column, value)` to ensure the value is properly formatted.
     * - Updates the value at the specified row and column.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after updating the value.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * dataModel.setValue(0, "name", "Charlie");
     * console.log(dataModel.getValue(0, "name")); // Output: "Charlie"
     *
     * // Throws an error if trying to set `undefined`
     * // dataModel.setValue(1, "name", undefined);
     *
     * // Throws an error if the column does not exist
     * // dataModel.setValue(0, "age", 25);
     * ```
     *
     * @param {number} rowIndex The index of the row where the value should be set.
     * @param {string} column The column name where the value should be stored.
     * @param {any} value The value to assign.
     * @returns {InterfaceDataModel} The current `DataModel` instance after updating the value.
     * @throws {Error} If `value` is `undefined` or if `rowIndex` or `column` is invalid.
     */
    setValue(rowIndex: number, column: string, value: any): InterfaceDataModel;
    /**
     * Removes a column from the `DataModel`, deleting its values from all rows.
     * Ensures that the column exists before attempting removal.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to remove.
     *
     * ## Behavior
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Iterates through all rows and removes the specified column.
     * - Updates `_cols` to exclude the removed column.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after removing the column.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 }
     * ]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     * 
     * dataModel.removeColumn("age");
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     *
     * // Throws an error if the column does not exist
     * // dataModel.removeColumn("salary");
     * ```
     *
     * @param {string} column The name of the column to remove.
     * @returns {InterfaceDataModel} The current `DataModel` instance after removing the column.
     * @throws {Error} If `column` is invalid or does not exist.
     */
    removeColumn(column: string): InterfaceDataModel;
    /**
     * Removes multiple columns from the `DataModel`, deleting their values from all rows.
     * Ensures that each specified column exists before attempting removal.
     *
     * ## Parameters
     * - `columns` **(string[])**: An array of column names to remove.
     *
     * ## Behavior
     * - Iterates through the `columns` array and calls `removeColumn(column)` for each entry.
     * - If any column does not exist, `removeColumn` will throw an error.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The current instance after removing the specified columns.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25, city: "New York" },
     *     { id: 2, name: "Bob", age: 30, city: "Los Angeles" }
     * ]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age", "city"]
     * 
     * dataModel.removeColumns(["age", "city"]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     *
     * // Throws an error if a column does not exist
     * // dataModel.removeColumns(["salary", "bonus"]);
     * ```
     *
     * @param {string[]} columns An array of column names to remove.
     * @returns {InterfaceDataModel} The current `DataModel` instance after removing the columns.
     * @throws {Error} If any column does not exist.
     */
    removeColumns(columns: string[]): InterfaceDataModel;
    /**
     * Removes a row from the `DataModel` at the specified index and returns the removed row.
     * Ensures that the row index is valid before removal.
     *
     * ## Parameters
     * - `rowIndex` **(number, optional, default = `0`)**: The index of the row to remove.
     *
     * ## Behavior
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Uses `splice()` to remove the row from `_rows` and returns the removed row.
     *
     * ## Returns
     * - **`Record<string, any>`**: The removed row object.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Charlie" }
     * ]);
     * 
     * console.log(dataModel.getRowCount()); // Output: 3
     * 
     * const removedRow = dataModel.removeRow(1);
     * console.log(removedRow); // Output: { id: 2, name: "Bob" }
     * console.log(dataModel.getRowCount()); // Output: 2
     *
     * // Throws an error if rowIndex is out of bounds
     * // dataModel.removeRow(10);
     * ```
     *
     * @param {number} [rowIndex=0] The index of the row to remove.
     * @returns {Record<string, any>} The removed row object.
     * @throws {Error} If `rowIndex` is out of bounds.
     */
    removeRow(rowIndex?: number): Record<string, any>;
    /**
     * Retrieves the total number of columns in the `DataModel`.
     *
     * ## Behavior
     * - Returns the length of the `_cols` array, which represents the column definitions.
     *
     * ## Returns
     * - **`number`**: The total number of columns in the `DataModel`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
     * console.log(dataModel.getColumnCount()); // Output: 3
     * 
     * dataModel.removeColumn("age");
     * console.log(dataModel.getColumnCount()); // Output: 2
     * ```
     *
     * @returns {number} The number of columns in the `DataModel`.
     */
    getColumnCount(): number;
    /**
     * Retrieves the total number of rows in the `DataModel`.
     *
     * ## Behavior
     * - Returns the length of the `_rows` array, which represents the stored data rows.
     *
     * ## Returns
     * - **`number`**: The total number of rows in the `DataModel`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * console.log(dataModel.getRowCount()); // Output: 2
     * 
     * dataModel.addRow({ id: 3, name: "Charlie" });
     * console.log(dataModel.getRowCount()); // Output: 3
     * ```
     *
     * @returns {number} The number of rows in the `DataModel`.
     */
    getRowCount(): number;
    /**
     * Checks whether the `DataModel` contains a specified column.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to check.
     *
     * ## Behavior
     * - Calls `_hasColumn(column)` to determine if the column exists.
     * - Returns `true` if the column is found in `_cols`, otherwise `false`.
     *
     * ## Returns
     * - **`boolean`**: `true` if the column exists, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name"]);
     * 
     * console.log(dataModel.hasColumn("name")); // Output: true
     * console.log(dataModel.hasColumn("age")); // Output: false
     * ```
     *
     * @param {string} column The column name to check.
     * @returns {boolean} `true` if the column exists, otherwise `false`.
     */
    hasColumn(column: string): boolean;
    /**
     * Restricts the `DataModel` to only the specified columns by removing all other columns.
     * Ensures that only the columns listed in `columns` remain in the dataset.
     *
     * ## Parameters
     * - `columns` **(string[])**: An array of column names to keep in the `DataModel`.
     *
     * ## Behavior
     * - Filters `_cols` to identify columns that are **not** in the provided `columns` list.
     * - Calls `removeColumns()` to remove those columns from the dataset.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with only the specified columns retained.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 }
     * ]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     * 
     * // Keep only "id" and "name" columns
     * dataModel.setValidColumns(["id", "name"]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     * ```
     *
     * @param {string[]} columns An array of column names to retain.
     * @returns {InterfaceDataModel} The modified `DataModel` instance with only the specified columns retained.
     */
    setValidColumns(columns: string[]): InterfaceDataModel;
    /**
     * Checks whether a specified column contains only non-null values.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to check.
     *
     * ## Behavior
     * - Calls `_getNullColumnFirstRowIndex(column)` to find the first occurrence of a `null` value in the column.
     * - If no `null` values are found, returns `true`; otherwise, returns `false`.
     *
     * ## Returns
     * - **`boolean`**: `true` if the column has no `null` values, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: null },
     *     { id: 3, name: "Charlie" }
     * ]);
     * 
     * console.log(dataModel.isNotNullColumn("id")); // Output: true
     * console.log(dataModel.isNotNullColumn("name")); // Output: false
     * ```
     *
     * @param {string} column The column name to check.
     * @returns {boolean} `true` if the column has no `null` values, otherwise `false`.
     * @throws {Error} If `column` does not exist.
     */
    isNotNullColumn(column: string): boolean;
    /**
     * Finds and returns the first row where the specified column contains a `null` value.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to check.
     *
     * ## Behavior
     * - Calls `_getNullColumnFirstRowIndex(column)` to locate the first occurrence of a `null` value in the column.
     * - If no `null` values are found, returns `null`.
     * - If a `null` value is found, retrieves and returns the corresponding row using `getRow()`.
     *
     * ## Returns
     * - **`Record<string, any> | null`**: The first row where the column has a `null` value, or `null` if no such row exists.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: null },
     *     { id: 3, name: "Charlie" }
     * ]);
     * 
     * console.log(dataModel.findFirstRowNullColumn("name"));
     * // Output: { id: 2, name: null }
     * 
     * console.log(dataModel.findFirstRowNullColumn("id"));
     * // Output: null (no null values in the "id" column)
     * ```
     *
     * @param {string} column The column name to check for `null` values.
     * @returns {Record<string, any> | null} The first row where the column has a `null` value, or `null` if none exist.
     * @throws {Error} If `column` does not exist.
     */
    findFirstRowNullColumn(column: string): Record<string, any> | null;
    /**
     * Checks whether a specified column contains only unique values (i.e., no duplicate values).
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to check.
     *
     * ## Behavior
     * - Calls `_getDuplColumnFirstRowIndex(column)` to find the first occurrence of a duplicate value in the column.
     * - If no duplicates are found, returns `true`; otherwise, returns `false`.
     *
     * ## Returns
     * - **`boolean`**: `true` if the column has no duplicate values, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Alice" }
     * ]);
     * 
     * console.log(dataModel.isNotDuplColumn("id")); // Output: true
     * console.log(dataModel.isNotDuplColumn("name")); // Output: false
     * ```
     *
     * @param {string} column The column name to check for duplicate values.
     * @returns {boolean} `true` if the column has no duplicate values, otherwise `false`.
     * @throws {Error} If `column` does not exist.
     */
    isNotDuplColumn(column: string): boolean;
    /**
     * Finds and returns the first row where the specified column contains a duplicate value.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to check for duplicate values.
     *
     * ## Behavior
     * - Calls `_getDuplColumnFirstRowIndex(column)` to locate the first occurrence of a duplicate value in the column.
     * - If no duplicate values are found, returns `null`.
     * - If a duplicate value is found, retrieves and returns the corresponding row using `getRow()`.
     *
     * ## Returns
     * - **`Record<string, any> | null`**: The first row where the column has a duplicate value, or `null` if no duplicates exist.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Alice" }
     * ]);
     * 
     * console.log(dataModel.findFirstRowDuplColumn("name"));
     * // Output: { id: 3, name: "Alice" } (the second occurrence of "Alice")
     * 
     * console.log(dataModel.findFirstRowDuplColumn("id"));
     * // Output: null (no duplicate values in the "id" column)
     * ```
     *
     * @param {string} column The column name to check for duplicate values.
     * @returns {Record<string, any> | null} The first row where the column has a duplicate value, or `null` if none exist.
     * @throws {Error} If `column` does not exist.
     */
    findFirstRowDuplColumn(column: string): Record<string, any> | null;
    /**
     * Checks whether all values in the specified column satisfy a given validation function.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to validate.
     * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
     *
     * ## Behavior
     * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to check for invalid values.
     * - If no invalid values are found, returns `true`; otherwise, returns `false`.
     *
     * ## Returns
     * - **`boolean`**: `true` if all values in the column are valid, otherwise `false`.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, age: 25 },
     *     { id: 2, age: 30 },
     *     { id: 3, age: "invalid" }
     * ]);
     * 
     * // Check if all values in "age" column are valid numbers
     * console.log(dataModel.isValidValue("age", value => typeof value === "number"));
     * // Output: false
     * 
     * console.log(dataModel.isValidValue("id", value => typeof value === "number"));
     * // Output: true
     * ```
     *
     * @param {string} column The column name to validate.
     * @param {DataModelValidator} validator A function that checks if a value is valid.
     * @returns {boolean} `true` if all values in the column are valid, otherwise `false`.
     * @throws {Error} If `column` does not exist or `validator` is not a function.
     */
    isValidValue(column: string, vaildator: DataModelValidator): boolean;
    /**
     * Finds and returns the first row where the specified column contains an invalid value based on a given validation function.
     *
     * ## Parameters
     * - `column` **(string)**: The name of the column to validate.
     * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
     *
     * ## Behavior
     * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to locate the first occurrence of an invalid value in the column.
     * - If no invalid values are found, returns `null`.
     * - If an invalid value is found, retrieves and returns the corresponding row using `getRow()`.
     *
     * ## Returns
     * - **`Record<string, any> | null`**: The first row where the column has an invalid value, or `null` if all values are valid.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, age: 25 },
     *     { id: 2, age: "invalid" },
     *     { id: 3, age: 30 }
     * ]);
     * 
     * // Find the first row where "age" contains a non-numeric value
     * console.log(dataModel.findFirstRowInvalidValue("age", value => typeof value === "number"));
     * // Output: { id: 2, age: "invalid" }
     * 
     * console.log(dataModel.findFirstRowInvalidValue("id", value => typeof value === "number"));
     * // Output: null (all values in "id" are valid)
     * ```
     *
     * @param {string} column The column name to validate.
     * @param {DataModelValidator} validator A function that checks if a value is valid.
     * @returns {Record<string, any> | null} The first row with an invalid value, or `null` if all values are valid.
     * @throws {Error} If `column` does not exist or `validator` is not a function.
     */
    findFirstRowInvalidValue(column: string, vaildator: DataModelValidator): Record<string, any> | null;
    /**
     * Searches for rows that match a given condition and returns their indexes.
     * Allows for both positive and negative filtering based on the `isNegative` flag.
     *
     * ## Parameters
     * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
     * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, returns indexes of rows that **do not** match the condition.
     *
     * ## Behavior
     * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
     * - Calls `_checkBoolean(isNegative)` to validate the boolean flag.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, adds matching row indexes to the result.
     * - If `isNegative` is `true`, adds **non-matching** row indexes to the result.
     *
     * ## Returns
     * - **`number[]`**: An array of indexes of rows that match (or do not match) the condition.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 25 }
     * ]);
     * 
     * // Search for row indexes where age is 25
     * console.log(dataModel.searchRowIndexes({ age: 25 }));
     * // Output: [0, 2]
     * 
     * // Search for row indexes where age is NOT 25
     * console.log(dataModel.searchRowIndexes({ age: 25 }, true));
     * // Output: [1]
     * ```
     *
     * @param {Record<string, any>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, returns indexes of rows that do **not** match the condition.
     * @returns {number[]} An array of indexes of rows that match or do not match the condition.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchRowIndexes(condition: Record<string, any>, isNegative?: boolean): number[];
    /**
     * Searches for rows that match a given condition and returns them as an array.
     * Allows for both positive and negative filtering based on the `isNegative` flag.
     *
     * ## Parameters
     * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
     * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
     *
     * ## Behavior
     * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
     * - Calls `_checkBoolean(isNegative)` to validate the flag.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, adds matching rows to the result.
     * - If `isNegative` is `true`, adds **non-matching** rows to the result.
     * - Returns a deep copy of the matched rows.
     *
     * ## Returns
     * - **`Record<string, any>[]`**: An array of deep-copied rows that match (or do not match) the condition.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 25 }
     * ]);
     * 
     * // Search for rows where age is 25
     * console.log(dataModel.searchRows({ age: 25 }));
     * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
     * 
     * // Search for rows where age is NOT 25
     * console.log(dataModel.searchRows({ age: 25 }, true));
     * // Output: [{ id: 2, name: "Bob", age: 30 }]
     * ```
     *
     * @param {Record<string, any>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
     * @returns {Record<string, any>[]} An array of deep-copied rows that match or do not match the condition.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchRows(condition: Record<string, any>, isNegative?: boolean): Record<string, any>[];
    /**
     * Searches for rows that match a given condition and returns them as a new `DataModel` instance.
     * Allows for both positive and negative filtering based on the `isNegative` flag.
     *
     * ## Parameters
     * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
     * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
     *
     * ## Behavior
     * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
     * - Calls `_checkBoolean(isNegative)` to validate the boolean flag.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, adds matching rows to the result.
     * - If `isNegative` is `true`, adds **non-matching** rows to the result.
     * - Returns a new `DataModel` containing the filtered rows.
     *
     * ## Returns
     * - **`DataModel`**: A new `DataModel` instance containing the matched rows.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 25 }
     * ]);
     * 
     * // Search for rows where age is 25 and return them as a new DataModel
     * const filteredModel = dataModel.searchRowsAsDataModel({ age: 25 });
     * console.log(filteredModel.getRowCount()); // Output: 2
     * console.log(filteredModel.getRows());
     * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
     * 
     * // Search for rows where age is NOT 25
     * const excludedModel = dataModel.searchRowsAsDataModel({ age: 25 }, true);
     * console.log(excludedModel.getRows());
     * // Output: [{ id: 2, name: "Bob", age: 30 }]
     * ```
     *
     * @param {Record<string, any>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
     * @returns {InterfaceDataModel} A new `DataModel` instance containing the matched rows.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchRowsAsDataModel(condition: Record<string, any>, isNegative?: boolean): InterfaceDataModel;
    /**
     * Searches for rows that match a given condition and **modifies** the original `DataModel` by removing matched or unmatched rows.
     * This method directly updates the existing dataset instead of returning a new instance.
     *
     * ## Parameters
     * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
     * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, removes rows that **match** the condition; otherwise, removes rows that **do not** match the condition.
     *
     * ## Behavior
     * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
     * - Calls `_checkBoolean(isNegative)` to validate the boolean flag.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, removes rows that **do not** match the condition.
     * - If `isNegative` is `true`, removes rows that **do** match the condition.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance after removing specified rows.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 25 }
     * ]);
     * 
     * // Keep only rows where age is 25
     * dataModel.searchAndModify({ age: 25 });
     * console.log(dataModel.getRows());
     * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
     * 
     * // Remove rows where age is 25
     * dataModel.searchAndModify({ age: 25 }, true);
     * console.log(dataModel.getRows());
     * // Output: []
     * ```
     *
     * @param {Record<string, any>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, removes rows that **match** the condition; otherwise, removes rows that **do not** match the condition.
     * @returns {InterfaceDataModel} The modified `DataModel` instance after removing specified rows.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchAndModify(condition: Record<string, any>, isNegative?: boolean): InterfaceDataModel;
    /**
     * Filters rows in the `DataModel` based on a custom filtering function and returns their indexes.
     * Allows for efficiently identifying row positions that match a given condition.
     *
     * ## Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
     *
     * ## Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Collects the indexes of rows that satisfy the filter condition.
     *
     * ## Returns
     * - **`number[]`**: An array of indexes of rows that match the filter condition.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 22 }
     * ]);
     * 
     * // Get indexes of rows where age is greater than 25
     * const rowIndexes = dataModel.filterRowIndexes(row => row.age > 25);
     * console.log(rowIndexes); // Output: [1]
     * ```
     *
     * @param {DataModelFillter} filter A function that determines whether a row should be included.
     * @returns {number[]} An array of indexes of rows that match the filter condition.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterRowIndexes(filter: DataModelFillter): number[];
    /**
     * Filters rows in the `DataModel` based on a custom filtering function.
     * Returns an array of rows that satisfy the provided filter condition.
     *
     * ## Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
     *
     * ## Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
     * - Returns an array of matching rows.
     *
     * ## Returns
     * - **`Record<string, any>[]`**: An array of deep-copied rows that match the filter condition.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 22 }
     * ]);
     * 
     * // Filter rows where age is greater than 25
     * const filteredRows = dataModel.filterRows(row => row.age > 25);
     * console.log(filteredRows);
     * // Output: [{ id: 2, name: "Bob", age: 30 }]
     * ```
     *
     * @param {DataModelFillter} filter A function that determines whether a row should be included.
     * @returns {Record<string, any>[]} An array of deep-copied rows that match the filter condition.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterRows(filter: DataModelFillter): Record<string, any>[];
    /**
     * Filters rows in the `DataModel` based on a custom filtering function and returns a new `DataModel` containing the matched rows.
     * Allows for extracting a subset of the dataset while preserving the structured format.
     *
     * ## Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
     *
     * ## Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Collects rows that satisfy the filter condition.
     * - Returns a new `DataModel` instance containing the filtered rows.
     *
     * ## Returns
     * - **`DataModel`**: A new `DataModel` instance containing the filtered rows.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 22 }
     * ]);
     * 
     * // Create a new DataModel containing only rows where age is greater than 25
     * const filteredDataModel = dataModel.filterRowsAsDataModel(row => row.age > 25);
     * console.log(filteredDataModel.getRowCount()); // Output: 1
     * console.log(filteredDataModel.getRow(0)); // Output: { id: 2, name: "Bob", age: 30 }
     * ```
     *
     * @param {DataModelFillter} filter A function that determines whether a row should be included.
     * @returns {InterfaceDataModel} A new `DataModel` instance containing the filtered rows.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterRowsAsDataModel(filter: DataModelFillter): InterfaceDataModel;
    /**
     * Filters rows in the `DataModel` based on a custom filtering function and **modifies** the original `DataModel` by removing unmatched rows.
     * This method directly updates the existing dataset instead of returning a new instance.
     *
     * ## Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be retained.
     *
     * ## Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Removes rows that do **not** satisfy the filter condition.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with only the filtered rows.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 },
     *     { id: 3, name: "Charlie", age: 22 }
     * ]);
     * 
     * // Remove all rows where age is 25 or below
     * dataModel.filterAndModify(row => row.age > 25);
     * 
     * console.log(dataModel.getRowCount()); // Output: 1
     * console.log(dataModel.getRow(0)); // Output: { id: 2, name: "Bob", age: 30 }
     * ```
     *
     * @param {DataModelFillter} filter A function that determines whether a row should be retained.
     * @returns {InterfaceDataModel} The modified `DataModel` instance after removing unmatched rows.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterAndModify(filter: DataModelFillter): InterfaceDataModel;
    /**
     * Reorders the columns in the `DataModel` based on the specified order.
     * Ensures that all existing columns are included, maintaining the defined structure.
     *
     * ## Parameters
     * - `columns` **(string[])**: An array of column names in the desired order.
     *
     * ## Behavior
     * - Calls `_checkArray(columns)` to validate the input as an array.
     * - Iterates through `columns`, ensuring each column is valid and exists in the `DataModel`.
     * - Creates a new column order, appending any remaining columns that were not specified.
     * - Updates `_cols` with the new column order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with reordered columns.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     * 
     * // Change column order
     * dataModel.setColumnSorting(["age", "name"]);
     * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
     * ```
     *
     * @param {string[]} columns An array of column names in the desired order.
     * @returns {InterfaceDataModel} The modified `DataModel` instance with reordered columns.
     * @throws {Error} If `columns` is not an array or contains invalid column names.
     */
    setColumnSorting(columns: string[]): InterfaceDataModel;
    /**
     * Sorts the columns of the `DataModel` in ascending (A-Z) order.
     * The sorting is applied alphabetically based on column names.
     *
     * ## Behavior
     * - Calls the native `Array.sort()` method on `_cols` to rearrange columns in ascending order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with columns sorted in ascending order.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
     * 
     * dataModel.sortColumnAscending();
     * console.log(dataModel.getColumns()); // Output: ["age", "id", "name"]
     * ```
     *
     * @returns {InterfaceDataModel} The modified `DataModel` instance with columns sorted in ascending order.
     */
    sortColumnAscending(): InterfaceDataModel;
    /**
     * Sorts the columns of the `DataModel` in descending (Z-A) order.
     * The sorting is applied alphabetically based on column names.
     *
     * ## Behavior
     * - Calls the native `Array.sort()` method on `_cols` with a custom comparator to sort columns in descending order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with columns sorted in descending order.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
     * 
     * dataModel.sortColumnDescending();
     * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
     * ```
     *
     * @returns {InterfaceDataModel} The modified `DataModel` instance with columns sorted in descending order.
     */
    sortColumnDescending(): InterfaceDataModel;
    /**
     * Reverses the order of columns in the `DataModel`.
     * The column order is flipped without sorting alphabetically.
     *
     * ## Behavior
     * - Calls the native `Array.reverse()` method on `_cols` to reverse the column order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with reversed column order.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
     * 
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     * 
     * dataModel.sortColumnReverse();
     * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
     * ```
     *
     * @returns {InterfaceDataModel} The modified `DataModel` instance with reversed column order.
     */
    sortColumnReverse(): InterfaceDataModel;
    /**
     * Sorts the rows of the `DataModel` in ascending order based on the specified column.
     * Optionally supports integer-based sorting for numerical values.
     *
     * ## Parameters
     * - `column` **(string)**: The column name to sort by.
     * - `isIntegerOrder` **(boolean, optional, default = `false`)**: If `true`, treats values as integers for sorting.
     *
     * ## Behavior
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Calls `_checkBoolean(isIntegerOrder)` to validate the boolean flag.
     * - Uses the native `Array.sort()` method to arrange rows in ascending order.
     * - Handles `null` values by placing them at the end of the sorted list.
     * - Converts object values to JSON strings for sorting.
     * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
     * - Throws an error if a non-numeric value is encountered during integer sorting.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with rows sorted in ascending order.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 3, name: "Charlie" },
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * // Sort rows by "id" in ascending order
     * dataModel.sortRowAscending("id");
     * console.log(dataModel.getRows());
     * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
     * 
     * // Sort rows numerically by "id"
     * dataModel.sortRowAscending("id", true);
     * ```
     *
     * @param {string} column The column name to sort by.
     * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
     * @returns {InterfaceDataModel} The modified `DataModel` instance with rows sorted in ascending order.
     * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
     */
    sortRowAscending(column: string, isIntegerOrder?: boolean): InterfaceDataModel;
    /**
     * Sorts the rows of the `DataModel` in descending order based on the specified column.
     * Optionally supports integer-based sorting for numerical values.
     *
     * ## Parameters
     * - `column` **(string)**: The column name to sort by.
     * - `isIntegerOrder` **(boolean, optional, default = `false`)**: If `true`, treats values as integers for sorting.
     *
     * ## Behavior
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Calls `_checkBoolean(isIntegerOrder)` to validate the boolean flag.
     * - Uses the native `Array.sort()` method to arrange rows in descending order.
     * - Handles `null` values by placing them at the beginning of the sorted list.
     * - Converts object values to JSON strings for sorting.
     * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
     * - Throws an error if a non-numeric value is encountered during integer sorting.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with rows sorted in descending order.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 3, name: "Charlie" },
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * 
     * // Sort rows by "id" in descending order
     * dataModel.sortRowDescending("id");
     * console.log(dataModel.getRows());
     * // Output: [{ id: 3, name: "Charlie" }, { id: 2, name: "Bob" }, { id: 1, name: "Alice" }]
     * 
     * // Sort rows numerically by "id"
     * dataModel.sortRowDescending("id", true);
     * ```
     *
     * @param {string} column The column name to sort by.
     * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
     * @returns {InterfaceDataModel} The modified `DataModel` instance with rows sorted in descending order.
     * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
     */
    sortRowDescending(column: string, isIntegerOrder?: boolean): InterfaceDataModel;
    /**
     * Reverses the order of rows in the `DataModel`.
     * This method flips the row order without sorting by a specific column.
     *
     * ## Behavior
     * - Calls the native `Array.reverse()` method on `_rows` to reverse the row order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ## Returns
     * - **`DataModel`**: The modified `DataModel` instance with reversed row order.
     *
     * ## Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Charlie" }
     * ]);
     * 
     * console.log(dataModel.getRows());
     * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
     * 
     * dataModel.sortRowReverse();
     * console.log(dataModel.getRows());
     * // Output: [{ id: 3, name: "Charlie" }, { id: 2, name: "Bob" }, { id: 1, name: "Alice" }]
     * ```
     *
     * @returns {InterfaceDataModel} The modified `DataModel` instance with reversed row order.
     */
    sortRowReverse(): InterfaceDataModel;
};
/**
 * Defines a function signature for formatting values in a `DataModel` column.
 * 
 * - This function takes a value as input and returns a transformed version of it.
 * - Used in `DataModel.setColumnSameFormat()` to apply consistent formatting across a column.
 * 
 * ## Example Usage
 * ```typescript
 * const formatCurrency: DataModelFormatter = (value) => `$${value.toFixed(2)}`;
 * console.log(formatCurrency(1000)); // "$1000.00"
 * ```
 * 
 * @callback DataModelFormatter
 * @param value The original value from the `DataModel` column.
 * @returns The formatted value.
 */
interface DataModelFormatter{(value: any): any;};
/**
 * Defines a function signature for validating values in a `DataModel` column.
 * 
 * - This function takes a value as input and returns a boolean indicating validity.
 * - Used in `DataModel.isValidValue()` to check if all column values meet the validation criteria.
 * 
 * ## Example Usage
 * ```typescript
 * const isNumber: DataModelValidator = (value) => typeof value === "number";
 * console.log(isNumber(123)); // true
 * console.log(isNumber("text")); // false
 * ```
 * 
 * @callback DataModelValidator
 * @param value The value from the `DataModel` column to validate.
 * @returns `true` if the value is valid, otherwise `false`.
 */
interface DataModelValidator{(value: any): boolean;};
/**
 * Defines a function signature for filtering rows in a `DataModel`.
 * 
 * - This function takes a row (as an object) and returns `true` if it should be included.
 * - Used in `DataModel.filterRowIndexes()` to filter row indexes based on the given condition.
 * 
 * ## Example Usage
 * ```typescript
 * const filterByAge: DataModelFillter = (row) => row.age > 25;
 * console.log(filterByAge({ age: 30 })); // true
 * console.log(filterByAge({ age: 22 })); // false
 * ```
 * 
 * @callback DataModelFillter
 * @param row A record representing a row in the `DataModel`.
 * @returns `true` if the row matches the filter criteria, otherwise `false`.
 */
interface DataModelFillter{(row: Record<string, any>): boolean;};
//====================================================================================
//link interface, type
//====================================================================================
/**
 * **`CachingModule` - A module for API response caching and real-time WebSocket updates.**
 *
 * The `CachingModule` provides a caching mechanism for API responses using an **LRU (Least Recently Used) strategy** 
 * while integrating **WebSocket communication** for real-time data updates.
 *
 * ## **Key Features**
 * - **LRU Cache for API Responses**: Stores API responses with a configurable limit, reducing redundant network requests.
 * - **WebSocket Support**: Maintains a persistent WebSocket connection for real-time data updates.
 * - **Cache Management Methods**: Supports cache operations (`get`, `put`, `remove`, `clear`, etc.).
 * - **Event-Driven Communication**: Allows event listeners (`onopen`, `onmessage`, `onclose`, `onerror`) for WebSocket handling.
 * - **Flexible Configuration**: Uses `CustomOption` settings for cache limits and WebSocket parameters.
 * - **Validation Methods**: Ensures proper data types for cache keys and event listeners.
 *
 * ## **How It Works**
 * - **API responses are stored in an LRUCache instance**, avoiding redundant network calls.
 * - **When a WebSocket connection is established**, data updates can be received in real-time.
 * - **Cache data can be accessed and managed using `get`, `put`, `remove`, and `clear` methods.**
 * - **WebSocket event handlers can be set up for real-time notifications.**
 *
 * ## **Example Usage**
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
 * ## **Internal Structure**
 * - **Uses `LRUCache`** to manage cached responses with a defined limit.
 * - **Maintains a WebSocket connection** to receive real-time data updates.
 * - **Supports configurable options via `CustomOption`**, such as WebSocket endpoint and cache size.
 * - **Provides utility methods** for cache validation, data retrieval, and event handling.
 *
 * ## **Related Components**
 * - **`LRUCache`**: Handles the caching logic for API responses.
 * - **`WebSocket`**: Establishes a real-time connection for live data updates.
 * - **`CustomOption`**: Provides configurable options for WebSocket and cache settings.
 * - **`ApiLink`**: Uses this module to fetch and store API responses efficiently.
 *
 * ## **Return Value**
 * - This module **returns an instance of `CachingModule`**, which allows cache operations and WebSocket event management.
 *
 * ## **Typical Use Cases**
 * - **Reducing unnecessary API calls** by storing frequently accessed responses.
 * - **Receiving real-time updates** from the server without polling.
 * - **Efficiently managing API response data** in web applications.
 * - **Supporting offline or low-latency scenarios** by using cached responses.
 */
interface InterfaceCachingModule {
    /**
     * **Checks whether this instance is a valid caching module.**
     *
     * This method returns a boolean flag indicating whether the current instance 
     * is recognized as a `CachingModule`. This is useful for validating whether 
     * an instance supports caching functionalities.
     *
     * ## **Return Value**
     * - `true` if this instance is a caching module.
     * - `false` if caching is not enabled.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * console.log(cachingModule.getIsCachingModule()); // true
     * ```
     *
     * ## **Related Properties**
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
     * ## **Parameters**
     * - `key` *(string)* - The key to check in the cache.
     *
     * ## **Return Value**
     * - `true` if the cache contains the specified key.
     * - `false` if the key is not found in the cache.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * console.log(cachingModule.hasKey("user123")); // true
     * console.log(cachingModule.hasKey("user456")); // false
     * ```
     *
     * ## **Related Methods**
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
     * This method fetches the cached API response associated with the specified `key`.
     * Before accessing the cache, it validates that the key is a string.
     *
     * ## **Parameters**
     * - `key` *(string)* - The key of the cached data.
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(any)* - The cached API response data.
     *   - `response` *(Response)* - The original HTTP response object.
     * - If the key does not exist in the cache, `null` is returned.
     *
     * ## **Example Usage**
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
     * ## **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`hasKey(key)`** - Checks if a key exists in the cache.
     * - **`remove(key)`** - Removes a key from the cache.
     *
     * @param {string} key - The key to retrieve from the cache.
     * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the cached response data.
     */
    get(key: string): Promise<{ data: any; response: Response; }> | null;
    /**
     * **Stores API response data in the cache.**
     *
     * This method saves the provided `value` (API response) in the cache with the specified `key`.
     * Before storing the data, it validates that the `key` is a string.
     *
     * ## **Parameters**
     * - `key` *(string)* - The cache key under which the response will be stored.
     * - `value` *(Promise<{ data: any; response: Response }>)*
     *   - A promise resolving to an object containing:
     *     - `data` *(any)* - The API response data.
     *     - `response` *(Response)* - The original HTTP response object.
     *
     * ## **Behavior**
     * - If the `key` already exists, the old value is **replaced** with the new one.
     * - If the cache reaches its limit, the **least recently used (LRU) entry is removed**.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store an API response in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * ```
     *
     * ## **Related Methods**
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`hasKey(key)`** - Checks if a key exists in the cache.
     * - **`remove(key)`** - Removes a specific key from the cache.
     *
     * @param {string} key - The cache key under which the response will be stored.
     * @param {Promise<{ data: any; response: Response }>} value - The API response to be cached.
     */
    put(key: string, value: Promise<{ data: any; response: Response; }>): void;
    /**
     * **Removes a specific key from the cache.**
     *
     * This method deletes the cached API response associated with the given `key`.
     * Before performing the removal, it ensures that the `key` is a valid string.
     *
     * ## **Parameters**
     * - `key` *(string)* - The cache key to be removed.
     *
     * ## **Behavior**
     * - If the specified `key` exists in the cache, it is deleted.
     * - If the `key` does not exist, no action is taken.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Store an API response in the cache
     * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
     * 
     * // Remove the cached response
     * cachingModule.remove("user123");
     * 
     * // Check if the key still exists
     * console.log(cachingModule.hasKey("user123")); // false
     * ```
     *
     * ## **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`clear()`** - Removes all cached entries.
     *
     * @param {string} key - The cache key to be removed.
     */
    remove(key: string): void;
    /**
     * **Retrieves all cached data as a key-value object.**
     *
     * This method returns the entire cache as a record where each key corresponds to a cached API response.
     *
     * ## **Return Value**
     * - A `Record<string, Promise<{ data: any; response: Response }>>` representing all cached entries.
     * - Each entry consists of:
     *   - `key` *(string)* - The cache key.
     *   - `value` *(Promise<{ data: any; response: Response }>>)* - A promise resolving to:
     *     - `data` *(any)* - The API response data.
     *     - `response` *(Response)* - The original HTTP response object.
     *
     * ## **Example Usage**
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
     * ## **Related Methods**
     * - **`put(key, value)`** - Stores API responses in the cache.
     * - **`get(key)`** - Retrieves cached data for a given key.
     * - **`getKeys()`** - Retrieves all cache keys.
     * - **`clear()`** - Removes all cached entries.
     *
     * @returns {Record<string, Promise<{ data: any; response: Response }>>} An object containing all cached responses.
     */
    getAll(): Record<string, Promise<{ data: any; response: Response; }>>;
    /**
     * **Retrieves all cache keys.**
     *
     * This method returns an array of all keys currently stored in the cache.
     *
     * ## **Return Value**
     * - An array of strings representing the cache keys.
     *
     * ## **Example Usage**
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
     * ## **Related Methods**
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
     * ## **Behavior**
     * - All cached responses are permanently deleted.
     * - The cache size is reset to zero.
     *
     * ## **Example Usage**
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
     * ## **Related Methods**
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
     * ## **Parameters**
     * - `func` *(function | null)* - A callback function to handle the WebSocket `open` event.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ## **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When the WebSocket connection is established, the specified function is invoked.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket open event handler
     * cachingModule.onopen = (event) => {
     *     console.log("WebSocket connected:", event);
     * };
     * ```
     *
     * ## **Related Methods**
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
     * ## **Parameters**
     * - `func` *(function | null)* - A callback function to handle incoming WebSocket messages.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ## **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When a message is received, the specified function is invoked with the event data.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket message event handler
     * cachingModule.onmessage = (event) => {
     *     console.log("Received WebSocket message:", event.data);
     * };
     * ```
     *
     * ## **Related Methods**
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
     * ## **Parameters**
     * - `func` *(function | null)* - A callback function to handle the WebSocket `close` event.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ## **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When the WebSocket connection is closed, the specified function is invoked with the event data.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket close event handler
     * cachingModule.onclose = (event) => {
     *     console.log("WebSocket closed:", event);
     * };
     * ```
     *
     * ## **Related Methods**
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
     * ## **Parameters**
     * - `func` *(function | null)* - A callback function to handle WebSocket errors.
     *   - If `null` is provided, the event handler is cleared.
     *
     * ## **Behavior**
     * - Ensures that the provided function is valid before assigning it as the event handler.
     * - When an error occurs in the WebSocket connection, the specified function is invoked with the event data.
     * - **Note:** The implementation currently assigns the function to `onclose` instead of `onerror`,
     *   which may require correction.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Register a WebSocket error event handler
     * cachingModule.onerror = (event) => {
     *     console.error("WebSocket error:", event);
     * };
     * ```
     *
     * ## **Related Methods**
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
     * ## **Return Value**
     * - `1` → The WebSocket connection is open.
     * - `0` → The WebSocket connection is in the process of connecting.
     * - `-1` → The WebSocket connection is closed or unavailable.
     *
     * ## **Behavior**
     * - Internally calls `_checkWebSocketConnection()` to determine the WebSocket state.
     * - Useful for monitoring connection status and handling reconnection logic if needed.
     *
     * ## **Example Usage**
     * ```typescript
     * const cachingModule = new hison.link.CachingModule();
     * 
     * // Check WebSocket connection status
     * const status = cachingModule.isWebSocketConnection();
     * console.log(status); // Output: 1 (open), 0 (connecting), or -1 (closed)
     * ```
     *
     * ## **Related Methods**
     * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
     * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
     * - **`onerror(func)`** - Registers a handler for WebSocket error events.
     *
     * @returns {number} The WebSocket connection status (`1`: open, `0`: connecting, `-1`: closed).
     */
    isWebSocketConnection(): number;
};
/**
 * **`ApiGet` - A class for handling HTTP GET requests within the `hison.link` module.**
 *
 * The `ApiGet` class is responsible for sending HTTP GET requests to a specified API resource. 
 * It integrates with `ApiLink` to handle request execution, event emissions, and optional response caching.
 *
 * ## **Key Features**
 * - **Executes HTTP GET requests** using `ApiLink`.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows setting event listeners** for request completion, errors, and other key events.
 *
 * ## **How It Works**
 * - When instantiated, `ApiGet` stores the API resource path and an optional `CachingModule` instance.
 * - The `call()` method triggers a GET request to the specified resource path.
 * - If caching is enabled, previously stored responses may be returned instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiGet without caching
 * const apiGet = new hison.link.ApiGet("/users");
 * 
 * // Sending a GET request
 * apiGet.call().then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiGet = new hison.link.ApiGet("/users", cachingModule);
 * 
 * // Handling request events
 * cachedApiGet.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("GET request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-based request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiGet`, which provides methods for executing GET requests and managing request events.
 *
 * ## **Typical Use Cases**
 * - **Fetching data from a REST API** with minimal setup.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiGet {
    /**
     * **Executes an HTTP GET request to the specified resource path.**
     *
     * This method sends a GET request using `ApiLink`, optionally applying caching if a `CachingModule` is provided.
     * It also **invokes a pre-request hook** (`hison.setBeforeGetRequst`) and **emits a request-start event** 
     * (`"requestStarted_GET"`) before execution.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Pre-Request Handling**
     * - **`hison.setBeforeGetRequst((resourcePath, options) => {})`**
     *   - A customizable hook executed **before sending the GET request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters or implementing conditional request logic.
     *
     * ## **Event Emission**
     * - **`"requestStarted_GET"` Event**
     *   - This event is emitted **before the GET request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(any)* - The API response data.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ## **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP GET request to `_resourcePath`.
     * - Before executing the request:
     *   - The **before-request hook (`beforeGetRequst`)** is checked.
     *   - The **event `"requestStarted_GET"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Customizing the before-request hook to prevent requests conditionally
     * hison.setBeforeGetRequst((resourcePath, options) => {
     *     if (!options.headers.Authorization) {
     *         console.warn("Missing Authorization header.");
     *         return false; // Prevents the request from being sent
     *     }
     *     return true;
     * });
     * 
     * // Listening to the "requestStarted_GET" event
     * apiGet.onEventEmit("requestStarted_GET", (resourcePath, options) => {
     *     console.log(`GET request started for: ${resourcePath}`);
     * });
     * 
     * // Sending a GET request
     * apiGet.call({ headers: { "Authorization": "Bearer token" } }).then(response => {
     *     console.log(response.data); // Response data
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the API response.
     */
    call(options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
     * **Sends an HTTP HEAD request to the specified resource path.**
     *
     * This method retrieves only the headers from the specified resource without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ## **Behavior**
     * - The method delegates the request execution to `ApiLink.head()`.
     * - The response body is **not** included in the result, only headers are returned.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Sending a HEAD request
     * apiGet.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiGet.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(options)`** - Sends a GET request to retrieve full response data.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
     * **Sends an HTTP OPTIONS request to the specified resource path.**
     *
     * This method retrieves the list of allowed HTTP methods for the specified resource 
     * without performing an actual data operation.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
     *
     * ## **Behavior**
     * - The method delegates the request execution to `ApiLink.options()`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Sending an OPTIONS request
     * apiGet.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiGet.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(options)`** - Sends a GET request to retrieve full response data.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a GET request.
     *
     * ## **Parameters**
     * - `eventName` *(string)* - The name of the event to listen for.
     * - `eventFunc` *(function)* - The callback function to be executed when the event occurs.
     *
     * ## **Supported Events**
     * - `"requestStarted_GET"` - Triggered when a GET request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiGet = new hison.link.ApiGet("/users");
     * 
     * // Register an event listener for when the request completes
     * apiGet.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("GET request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiGet.onEventEmit("requestError", (error) => {
     *     console.error("GET request failed:", error);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(options)`** - Sends a GET request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiPost` - A class for handling HTTP POST requests within the `hison.link` module.**
 *
 * The `ApiPost` class is responsible for sending HTTP POST requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ## **Key Features**
 * - **Executes HTTP POST requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiPost` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a POST request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPost
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a POST request
 * apiPost.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPost.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("POST request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiPost`, providing methods for executing POST requests and managing request events.
 *
 * ## **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiPost {
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
     * - **`hison.setBeforePostRequst((requestData, options) => {})`**
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ## **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPost = new hison.link.ApiPost("UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiPost.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiPost.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
     * **Sends an HTTP OPTIONS request to the API controller path.**
     *
     * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
     * It is useful for checking which HTTP methods are permitted for a specific endpoint.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
     *
     * ## **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPost = new hison.link.ApiPost("UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiPost.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiPost.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a POST request.
     *
     * ## **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ## **Supported Events**
     * - `"requestStarted_POST"` - Triggered when a POST request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ## **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPost = new hison.link.ApiPost("UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiPost.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("POST request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiPost.onEventEmit("requestError", (error) => {
     *     console.error("POST request failed:", error);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiPut` - A class for handling HTTP PUT requests within the `hison.link` module.**
 *
 * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ## **Key Features**
 * - **Executes HTTP PUT requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiPut` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a PUT request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPut
 * const apiPut = new hison.link.ApiPut("UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a PUT request
 * apiPut.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPut = new hison.link.ApiPut("UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPut.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PUT request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiPut`, providing methods for executing PUT requests and managing request events.
 *
 * ## **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiPut {
    /**
     * **Executes an HTTP PUT request to the specified service command.**
     *
     * This method sends a PUT request using `ApiLink`, encapsulating request data in a `DataWrapper`
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
     * - **`hison.setBeforePutRequst((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the PUT request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ## **Event Emission**
     * - **`"requestStarted_PUT"` Event**
     *   - This event is emitted **before the PUT request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(any)* - The API response data.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ## **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP PUT request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePutRequst`)** is checked.
     *   - The **event `"requestStarted_PUT"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPut = new hison.link.ApiPut("UserService.createUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforePutRequst = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     * 
     * // Listening to the "requestStarted_PUT" event
     * apiPut.onEventEmit("requestStarted_PUT", (requestData, options) => {
     *     console.log("PUT request started with data:", requestData);
     * });
     * 
     * // Sending a PUT request
     * apiPut.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ## **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPut = new hison.link.ApiPut("UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiPut.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiPut.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
     * **Sends an HTTP OPTIONS request to the API controller path.**
     *
     * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
     * It is useful for checking which HTTP methods are permitted for a specific endpoint.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
     *
     * ## **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPut = new hison.link.ApiPut("UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiPut.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "PUT", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiPut.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a PUT request.
     *
     * ## **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ## **Supported Events**
     * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ## **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPut = new hison.link.ApiPut("UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiPut.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("PUT request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiPut.onEventEmit("requestError", (error) => {
     *     console.error("PUT request failed:", error);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
 *
 * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ## **Key Features**
 * - **Executes HTTP PATCH requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a PATCH request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPatch
 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a PATCH request
 * apiPatch.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPatch = new hison.link.ApiPatch("UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PATCH request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiPatch`, providing methods for executing PATCH requests and managing request events.
 *
 * ## **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiPatch {
    /**
     * **Executes an HTTP PATCH request to the specified service command.**
     *
     * This method sends a PATCH request using `ApiLink`, encapsulating request data in a `DataWrapper`
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
     * - **`hison.setBeforePatchRequst((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the PATCH request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ## **Event Emission**
     * - **`"requestStarted_PATCH"` Event**
     *   - This event is emitted **before the PATCH request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(any)* - The API response data.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ## **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP PATCH request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePatchRequst`)** is checked.
     *   - The **event `"requestStarted_PATCH"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     * 
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforePatchRequst = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     * 
     * // Listening to the "requestStarted_PATCH" event
     * apiPatch.onEventEmit("requestStarted_PATCH", (requestData, options) => {
     *     console.log("PATCH request started with data:", requestData);
     * });
     * 
     * // Sending a PATCH request
     * apiPatch.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ## **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Sending a HEAD request
     * apiPatch.head().then(headers => {
     *     console.log(headers["content-type"]); // e.g., "application/json"
     * });
     *
     * // Sending a HEAD request with additional headers
     * apiPatch.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
     *     console.log(headers);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
     * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
     */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
     * **Sends an HTTP OPTIONS request to the API controller path.**
     *
     * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
     * It is useful for checking which HTTP methods are permitted for a specific endpoint.
     *
     * ## **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ## **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
     *
     * ## **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Sending an OPTIONS request
     * apiPatch.options().then(allowedMethods => {
     *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
     * });
     *
     * // Sending an OPTIONS request with additional headers
     * apiPatch.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
     *     console.log(allowedMethods);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
     * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
     */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
     * **Registers an event listener for API request lifecycle events.**
     *
     * This method allows attaching a callback function to be executed when a specified event 
     * occurs during the execution of a PATCH request.
     *
     * ## **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ## **Supported Events**
     * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ## **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ## **Example Usage**
     * ```typescript
     * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
     * 
     * // Register an event listener for when the request completes
     * apiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("PATCH request completed!", data);
     * });
     * 
     * // Register an event listener for request errors
     * apiPatch.onEventEmit("requestError", (error) => {
     *     console.error("PATCH request failed:", error);
     * });
     * ```
     *
     * ## **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiDelete` - A class for handling HTTP DELETE requests within the `hison.link` module.**
 *
 * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ## **Key Features**
 * - **Executes HTTP DELETE requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiDelete` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a DELETE request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiDelete
 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a DELETE request
 * apiDelete.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiDelete = new hison.link.ApiDelete("UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("DELETE request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiDelete`, providing methods for executing DELETE requests and managing request events.
 *
 * ## **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiDelete {
    /**
    * **Executes an HTTP DELETE request to the specified service command.**
    *
    * This method sends a DELETE request using `ApiLink`, encapsulating request data in a `DataWrapper`
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
    * - **`hison.setBeforeDeleteRequst((requestData, options) => {})`**
    *   - A customizable hook executed **before sending the DELETE request**.
    *   - If it returns `false`, the request is **prevented from execution**.
    *   - **Use Case:** Validating request parameters, modifying request data dynamically.
    *
    * ## **Event Emission**
    * - **`"requestStarted_DELETE"` Event**
    *   - This event is emitted **before the DELETE request is executed**.
    *   - Can be used for logging, request tracking, or debugging.
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing:
    *   - `data` *(any)* - The API response data.
    *   - `response` *(Response)* - The original HTTP response object.
    *
    * ## **Behavior**
    * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
    * - If the data is not cached, it makes an HTTP DELETE request to `_serviceCmd`.
    * - Before executing the request:
    *   - The **before-request hook (`beforeDeleteRequst`)** is checked.
    *   - The **event `"requestStarted_DELETE"`** is emitted.
    * - Once the request is completed, the response is returned and optionally stored in the cache.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
    * 
    * // Creating request data
    * const requestData = new hison.data.DataWrapper();
    * requestData.putString("username", "Alice");
    * 
    * // Customizing the before-request hook to modify data before sending
    * customOption.link.beforeDeleteRequst = (requestData, options) => {
    *     requestData.putString("timestamp", Date.now().toString());
    *     return true;
    * };
    * 
    * // Listening to the "requestStarted_DELETE" event
    * apiDelete.onEventEmit("requestStarted_DELETE", (requestData, options) => {
    *     console.log("DELETE request started with data:", requestData);
    * });
    * 
    * // Sending a DELETE request
    * apiDelete.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
    * **Sends an HTTP HEAD request to the API controller path.**
    *
    * This method retrieves only the headers from the API without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ## **Behavior**
    * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
    * - The response body is **not** included in the result; only headers are returned.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
    * 
    * // Sending a HEAD request
    * apiDelete.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiDelete.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the API controller path.**
    *
    * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
    * It is useful for checking which HTTP methods are permitted for a specific endpoint.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
    *
    * ## **Behavior**
    * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
    * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
    * 
    * // Sending an OPTIONS request
    * apiDelete.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiDelete.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a DELETE request.
    *
    * ## **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ## **Supported Events**
    * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ## **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
    * 
    * // Register an event listener for when the request completes
    * apiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("DELETE request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiDelete.onEventEmit("requestError", (error) => {
    *     console.error("DELETE request failed:", error);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
 *
 * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ## **Key Features**
 * - **Executes HTTP GET requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined API resource path.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiGetUrl` requires a valid URL.
 * - The `call()` method triggers a GET request to the specified URL.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiGetUrl without caching
 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
 * 
 * // Sending a GET request
 * apiGetUrl.call().then(response => {
 *     console.log(response.data); // Response data
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
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
 *
 * ## **Typical Use Cases**
 * - **Fetching data from an external API** by specifying a full URL.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiGetUrl {
    /**
    * **Executes an HTTP GET request to the specified URL.**
    *
    * This method sends a GET request using `ApiLink.getURL()`, optionally applying caching if a `CachingModule` is provided.
    * It also **emits a request-start event** (`"requestStarted_GET"`) before execution.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Pre-Request Handling**
    * - **`"requestStarted_GET"` Event**
    *   - This event is emitted **before the GET request is executed**.
    *   - Can be used for logging, request tracking, or debugging.
    *
    * ## **Caching Mechanism**
    * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
    * - If cached data is found, it is returned **without making a new network request**.
    * - If no cached data exists, a new GET request is executed, and the response may be stored in the cache.
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing:
    *   - `data` *(any)* - The API response data.
    *   - `response` *(Response)* - The original HTTP response object.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.getURL(this._url, options)`, which:
    *   - Emits `"requestStarted_GET"` before making the request.
    *   - Checks if the requested data is cached and returns it if available.
    *   - If not cached, makes an HTTP GET request to `_url`.
    *   - Returns the response and optionally stores it in the cache.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Listening to the "requestStarted_GET" event
    * apiGetUrl.onEventEmit("requestStarted_GET", (url, options) => {
    *     console.log(`GET request started for: ${url}`);
    * });
    * 
    * // Sending a GET request
    * apiGetUrl.call().then(response => {
    *     console.log(response.data); // Response data
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
    * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the API response.
    */
    call(options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.head(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Sending a HEAD request
    * apiGetUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiGetUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(options)`** - Sends a GET request to retrieve full response data.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the specified URL.**
    *
    * This method retrieves the list of allowed HTTP methods for the specified URL 
    * without performing an actual data operation. It is useful for checking which 
    * HTTP methods are permitted for a specific endpoint.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
    *
    * ## **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Sending an OPTIONS request
    * apiGetUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiGetUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(options)`** - Sends a GET request to retrieve full response data.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a GET request to a specified URL.
    *
    * ## **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ## **Supported Events**
    * - `"requestStarted_GET"` - Triggered when a GET request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ## **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"GET"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
    * 
    * // Register an event listener for when the request completes
    * apiGetUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("GET request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiGetUrl.onEventEmit("requestError", (error) => {
    *     console.error("GET request failed:", error);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(options)`** - Sends a GET request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiPostUrl` - A class for handling HTTP POST requests to a specified URL.**
 *
 * The `ApiPostUrl` class is responsible for sending HTTP POST requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ## **Key Features**
 * - **Executes HTTP POST requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a POST request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPostUrl
 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
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
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("POST request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiPostUrl`, which provides methods for executing POST requests to a specific URL.
 *
 * ## **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiPostUrl {
    /**
    * **Executes an HTTP POST request to the specified URL with an optional service command.**
    *
    * This method sends a POST request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
    * - **`"requestStarted_POST"` Event**
    *   - This event is emitted **before the POST request is executed**.
    *   - It includes the `serviceCmd`, request options, and request data.
    *   - Can be used for logging, request tracking, or debugging.
    *
    * ## **Caching Mechanism**
    * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
    * - If cached data is found, it is returned **without making a new network request**.
    * - If no cached data exists, a new POST request is executed, and the response may be stored in the cache.
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing:
    *   - `data` *(any)* - The API response data.
    *   - `response` *(Response)* - The original HTTP response object.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
    *   - Emits `"requestStarted_POST"` before making the request.
    *   - Checks if the requested data is cached and returns it if available.
    *   - If not cached, makes an HTTP POST request to `_url` with the provided `serviceCmd`.
    *   - Returns the response and optionally stores it in the cache.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Creating request data
    * const requestData = new hison.data.DataWrapper();
    * requestData.putString("username", "Alice");
    * 
    * // Listening to the "requestStarted_POST" event
    * apiPostUrl.onEventEmit("requestStarted_POST", (serviceCmd, options, requestData) => {
    *     console.log(`POST request started for service: ${serviceCmd}`, requestData);
    * });
    * 
    * // Sending a POST request
    * apiPostUrl.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending a HEAD request
    * apiPostUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiPostUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the specified URL.**
    *
    * This method retrieves the list of allowed HTTP methods for the specified URL 
    * without performing an actual data operation. It is useful for checking which 
    * HTTP methods are permitted for a specific endpoint.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
    *
    * ## **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending an OPTIONS request
    * apiPostUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiPostUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a POST request to a specified URL.
    *
    * ## **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ## **Supported Events**
    * - `"requestStarted_POST"` - Triggered when a POST request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ## **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Register an event listener for when the request completes
    * apiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("POST request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiPostUrl.onEventEmit("requestError", (error) => {
    *     console.error("POST request failed:", error);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiPutUrl` - A class for handling HTTP PUT requests to a specified URL.**
 *
 * The `ApiPutUrl` class is responsible for sending HTTP PUT requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ## **Key Features**
 * - **Executes HTTP PUT requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a PUT request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPutUrl
 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
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
 * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PUT request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiPutUrl`, which provides methods for executing PUT requests to a specific URL.
 *
 * ## **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiPutUrl {
    /**
    * **Executes an HTTP PUT request to the specified URL with an optional service command.**
    *
    * This method sends a PUT request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
    * - **`"requestStarted_PUT"` Event**
    *   - This event is emitted **before the PUT request is executed**.
    *   - It includes the `serviceCmd`, request options, and request data.
    *   - Can be used for logging, request tracking, or debugging.
    *
    * ## **Caching Mechanism**
    * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
    * - If cached data is found, it is returned **without making a new network request**.
    * - If no cached data exists, a new PUT request is executed, and the response may be stored in the cache.
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing:
    *   - `data` *(any)* - The API response data.
    *   - `response` *(Response)* - The original HTTP response object.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
    *   - Emits `"requestStarted_PUT"` before making the request.
    *   - Checks if the requested data is cached and returns it if available.
    *   - If not cached, makes an HTTP PUT request to `_url` with the provided `serviceCmd`.
    *   - Returns the response and optionally stores it in the cache.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Creating request data
    * const requestData = new hison.data.DataWrapper();
    * requestData.putString("username", "Alice");
    * 
    * // Listening to the "requestStarted_PUT" event
    * apiPutUrl.onEventEmit("requestStarted_PUT", (serviceCmd, options, requestData) => {
    *     console.log(`PUT request started for service: ${serviceCmd}`, requestData);
    * });
    * 
    * // Sending a PUT request
    * apiPutUrl.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending a HEAD request
    * apiPutUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiPutUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the specified URL.**
    *
    * This method retrieves the list of allowed HTTP methods for the specified URL 
    * without performing an actual data operation. It is useful for checking which 
    * HTTP methods are permitted for a specific endpoint.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
    *
    * ## **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending an OPTIONS request
    * apiPutUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "PUT", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiPutUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a PUT request to a specified URL.
    *
    * ## **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ## **Supported Events**
    * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ## **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Register an event listener for when the request completes
    * apiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("PUT request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiPutUrl.onEventEmit("requestError", (error) => {
    *     console.error("PUT request failed:", error);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiPatchUrl` - A class for handling HTTP PATCH requests to a specified URL.**
 *
 * The `ApiPatchUrl` class is responsible for sending HTTP PATCH requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ## **Key Features**
 * - **Executes HTTP PATCH requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a PATCH request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPatchUrl
 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a PATCH request
 * apiPatchUrl.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PATCH request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiPatchUrl`, which provides methods for executing PATCH requests to a specific URL.
 *
 * ## **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiPatchUrl {
    /**
    * **Executes an HTTP PATCH request to the specified URL with an optional service command.**
    *
    * This method sends a PATCH request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
    * - **`"requestStarted_PATCH"` Event**
    *   - This event is emitted **before the PATCH request is executed**.
    *   - It includes the `serviceCmd`, request options, and request data.
    *   - Can be used for logging, request tracking, or debugging.
    *
    * ## **Caching Mechanism**
    * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
    * - If cached data is found, it is returned **without making a new network request**.
    * - If no cached data exists, a new PATCH request is executed, and the response may be stored in the cache.
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing:
    *   - `data` *(any)* - The API response data.
    *   - `response` *(Response)* - The original HTTP response object.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
    *   - Emits `"requestStarted_PATCH"` before making the request.
    *   - Checks if the requested data is cached and returns it if available.
    *   - If not cached, makes an HTTP PATCH request to `_url` with the provided `serviceCmd`.
    *   - Returns the response and optionally stores it in the cache.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Creating request data
    * const requestData = new hison.data.DataWrapper();
    * requestData.putString("username", "Alice");
    * 
    * // Listening to the "requestStarted_PATCH" event
    * apiPatchUrl.onEventEmit("requestStarted_PATCH", (serviceCmd, options, requestData) => {
    *     console.log(`PATCH request started for service: ${serviceCmd}`, requestData);
    * });
    * 
    * // Sending a PATCH request
    * apiPatchUrl.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending a HEAD request
    * apiPatchUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiPatchUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the specified URL.**
    *
    * This method retrieves the list of allowed HTTP methods for the specified URL 
    * without performing an actual data operation. It is useful for checking which 
    * HTTP methods are permitted for a specific endpoint.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
    *
    * ## **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending an OPTIONS request
    * apiPatchUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiPatchUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a PATCH request to a specified URL.
    *
    * ## **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ## **Supported Events**
    * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ## **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Register an event listener for when the request completes
    * apiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("PATCH request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiPatchUrl.onEventEmit("requestError", (error) => {
    *     console.error("PATCH request failed:", error);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * **`ApiDeleteUrl` - A class for handling HTTP DELETE requests to a specified URL.**
 *
 * The `ApiDeleteUrl` class is responsible for sending HTTP DELETE requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ## **Key Features**
 * - **Executes HTTP DELETE requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ## **How It Works**
 * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a DELETE request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ## **Example Usage**
 * ```typescript
 * // Creating an instance of ApiDeleteUrl
 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 * 
 * // Sending a DELETE request
 * apiDeleteUrl.call(requestData).then(response => {
 *     console.log(response.data); // Response data
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("DELETE request completed!", data);
 * });
 * ```
 *
 * ## **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ## **Return Value**
 * - This class returns an instance of `ApiDeleteUrl`, which provides methods for executing DELETE requests to a specific URL.
 *
 * ## **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
interface InterfaceApiDeleteUrl {
    /**
    * **Executes an HTTP DELETE request to the specified URL with an optional service command.**
    *
    * This method sends a DELETE request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
    * - **`"requestStarted_DELETE"` Event**
    *   - This event is emitted **before the DELETE request is executed**.
    *   - It includes the `serviceCmd`, request options, and request data.
    *   - Can be used for logging, request tracking, or debugging.
    *
    * ## **Caching Mechanism**
    * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
    * - If cached data is found, it is returned **without making a new network request**.
    * - If no cached data exists, a new DELETE request is executed, and the response may be stored in the cache.
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing:
    *   - `data` *(any)* - The API response data.
    *   - `response` *(Response)* - The original HTTP response object.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
    *   - Emits `"requestStarted_DELETE"` before making the request.
    *   - Checks if the requested data is cached and returns it if available.
    *   - If not cached, makes an HTTP DELETE request to `_url` with the provided `serviceCmd`.
    *   - Returns the response and optionally stores it in the cache.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Creating request data
    * const requestData = new hison.data.DataWrapper();
    * requestData.putString("username", "Alice");
    * 
    * // Listening to the "requestStarted_DELETE" event
    * apiDeleteUrl.onEventEmit("requestStarted_DELETE", (serviceCmd, options, requestData) => {
    *     console.log(`DELETE request started for service: ${serviceCmd}`, requestData);
    * });
    * 
    * // Sending a DELETE request
    * apiDeleteUrl.call(requestData).then(response => {
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
    call(requestData: any, options?: Record<string, any>): Promise<{ data: InterfaceDataWrapper; response: Response; } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ## **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending a HEAD request
    * apiDeleteUrl.head().then(headers => {
    *     console.log(headers["content-type"]); // e.g., "application/json"
    * });
    *
    * // Sending a HEAD request with additional headers
    * apiDeleteUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
    *     console.log(headers);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
    * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
    */
    head(options?: Record<string, any>): Promise<Record<string, string>>;
    /**
    * **Sends an HTTP OPTIONS request to the specified URL.**
    *
    * This method retrieves the list of allowed HTTP methods for the specified URL 
    * without performing an actual data operation. It is useful for checking which 
    * HTTP methods are permitted for a specific endpoint.
    *
    * ## **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ## **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
    *
    * ## **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Sending an OPTIONS request
    * apiDeleteUrl.options().then(allowedMethods => {
    *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
    * });
    *
    * // Sending an OPTIONS request with additional headers
    * apiDeleteUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
    *     console.log(allowedMethods);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
    * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
    *
    * @param {Record<string, any>} [options={}] - Additional request options.
    * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
    */
    options(options?: Record<string, any>): Promise<string[]>;
    /**
    * **Registers an event listener for API request lifecycle events.**
    *
    * This method allows attaching a callback function to be executed when a specified event 
    * occurs during the execution of a DELETE request to a specified URL.
    *
    * ## **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ## **Supported Events**
    * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ## **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ## **Example Usage**
    * ```typescript
    * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
    * 
    * // Register an event listener for when the request completes
    * apiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
    *     console.log("DELETE request completed!", data);
    * });
    * 
    * // Register an event listener for request errors
    * apiDeleteUrl.onEventEmit("requestError", (error) => {
    *     console.error("DELETE request failed:", error);
    * });
    * ```
    *
    * ## **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
};
/**
 * Defines a function type for handling API GET requests before they are sent.
 * This allows developers to modify request options or cancel the request.
 *
 * ## Parameters
 * - `resourcePath` *(optional, string)*: The API endpoint URL for the GET request.
 * - `options` *(optional, Record<string, any>)*: Additional request options, such as headers or timeout settings.
 *
 * ## Return Value
 * - Returns `false` to prevent the GET request from being executed.
 * - Returns `void` or `true` to proceed with the request.
 *
 * ## Example Usage
 * ```typescript
 * hison.setBeforeGetRequst((resourcePath, options) => {
 *     console.log("Preparing GET request to:", resourcePath);
 *     options.headers = { Authorization: "Bearer token" };
 *     return true;
 * });
 * ```
 */
interface BeforeGetRequst {(resourcePath?: string, options?: Record<string, any>): boolean | void;};
/**
 * Defines a function type for handling API POST requests before they are sent.
 * This allows modifying request data, headers, or preventing the request.
 *
 * ## Parameters
 * - `requestDw` *(optional, DataWrapper)*: The request payload wrapped in `DataWrapper`.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ## Return Value
 * - Returns `false` to cancel the POST request.
 * - Returns `void` or `true` to proceed with the request.
 *
 * ## Example Usage
 * ```typescript
 * hison.setBeforePostRequst((requestDw, options) => {
 *     requestDw.putString("timestamp", Date.now().toString());
 *     return true;
 * });
 * ```
 */
interface BeforePostRequst {(requestDw?: InterfaceDataWrapper, options?: Record<string, any>): boolean | void;};
/**
 * Defines a function type for handling API PUT requests before they are sent.
 * Similar to `BeforePostRequst`, this allows modifying request payload or settings.
 *
 * ## Parameters
 * - `requestDw` *(optional, DataWrapper)*: The request payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ## Return Value
 * - Returns `false` to cancel the PUT request.
 * - Returns `void` or `true` to proceed.
 *
 * ## Example Usage
 * ```typescript
 * hison.setBeforePutRequst((requestDw, options) => {
 *     requestDw.putString("modified", "true");
 * });
 * ```
 */
interface BeforePutRequst {(requestDw?: InterfaceDataWrapper, options?: Record<string, any>): boolean | void;};
/**
 * Defines a function type for handling API PATCH requests before they are sent.
 * This allows modifying partial update data before execution.
 *
 * ## Parameters
 * - `requestDw` *(optional, DataWrapper)*: The partial update payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ## Return Value
 * - Returns `false` to cancel the PATCH request.
 * - Returns `void` or `true` to proceed.
 *
 * ## Example Usage
 * ```typescript
 * hison.setBeforePatchRequst((requestDw, options) => {
 *     requestDw.putString("lastUpdated", new Date().toISOString());
 * });
 * ```
 */
interface BeforePatchRequst {(requestDw?: InterfaceDataWrapper, options?: Record<string, any>): boolean | void;};
/**
 * Defines a function type for handling API DELETE requests before they are sent.
 * This allows validating or modifying delete operations before execution.
 *
 * ## Parameters
 * - `requestDw` *(optional, DataWrapper)*: The delete request payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ## Return Value
 * - Returns `false` to cancel the DELETE request.
 * - Returns `void` or `true` to proceed.
 *
 * ## Example Usage
 * ```typescript
 * hison.setBeforeDeleteRequst((requestDw, options) => {
 *     if (!requestDw.hasKey("id")) return false;
 * });
 * ```
 */
interface BeforeDeleteRequst {(requestDw?: InterfaceDataWrapper, options?: Record<string, any>): boolean | void;};
/**
 * Defines a function type for intercepting API response results.
 * This allows modifying API responses before they are returned to the caller.
 *
 * ## Parameters
 * - `result` *(DataWrapper | undefined)*: The API response data wrapped in `DataWrapper`.
 * - `response` *(Response)*: The original HTTP response object.
 *
 * ## Return Value
 * - Returns `false` to prevent the response from being processed further.
 * - Returns `void` or `true` to allow normal response handling.
 *
 * ## Example Usage
 * ```typescript
 * hison.setInterceptApiResult((result, response) => {
 *     console.log("Received API result:", result);
 *     return true;
 * });
 * ```
 */
interface InterceptApiResult {(result: InterfaceDataWrapper | undefined, response: Response): boolean | void;};
/**
 * Defines a function type for handling API errors before they are propagated.
 * This allows logging or modifying error responses before they are thrown.
 *
 * ## Parameters
 * - `error` *(any)*: The error object thrown by the API request.
 *
 * ## Return Value
 * - Returns `false` to suppress the error.
 * - Returns `void` or `true` to propagate the error as normal.
 *
 * ## Example Usage
 * ```typescript
 * hison.setInterceptApiError((error) => {
 *     console.error("API error occurred:", error);
 * });
 * ```
 */
interface InterceptApiError {(error: any): boolean | void;};

//====================================================================================
//createHison
//====================================================================================
/**
 * Creates and returns an instance of `Hison`, the core object of the `hisondev` solution.
 * 
 * ## **Overview**
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
 * ## **Encapsulation with Closure**
 * - Internally, `createHison()` initializes a **`HisonCore` object**, which holds the actual implementations.
 * - The **returned object only exposes a selected set of methods**, ensuring safe interaction.
 * - This design provides **data encapsulation** and **prevents unintended modifications**.
 * 
 * ---
 * ## **Core Functionalities of `Hison`**
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
 * ## **Encapsulation Benefits**
 * - **Prevents direct access to internal states**.
 * - **Ensures safe API exposure** while protecting core logic.
 * - **Maintains clean separation between implementation and interface**.
 *
 * ---
 * ## **Summary**
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
function createHison(): Hison {
    class CustomOption {
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
             *     const convertValue = customOption.data.convertValue(object);
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
             * - Default value: `'localhost:8080'`
             * - Used in `ApiLink` when constructing full request URLs.
             */
            domain : 'localhost:8080',
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
             * - Default value: `'hison-websocket-endpoint'`
             * - Used in `ApiLink` when establishing WebSocket connections.
             */
            webSocketEndPoint : 'hison-websocket-endpoint',
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
            beforePostRequst(requestDw: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
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
            beforePutRequst(requestDw: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
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
            beforePatchRequst(requestDw: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
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
            beforeDeleteRequst(requestDw: InterfaceDataWrapper, options: Record<string, any>): boolean | void {return true;},
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
            interceptApiResult(result: InterfaceDataWrapper | undefined, response: Response): boolean | void {return true;},
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
        get = (key: string): Promise<{ data: any; response: Response; }> | null => {
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
                if(oldestKey !== undefined) delete this._cache[oldestKey];
            }
            this._cache[key] = hison.utils.deepCopyObject(value);
            this._keys.push(key);
        };
        remove = (key: string): Promise<{ data: any; response: Response; }> | null => {
            if(!this.hasKey(key)) return null;
            this._removeKey(key);
            const result = hison.utils.deepCopyObject(this._cache[key])
            delete this._cache[key];
            return result;
        };
        getAll = (): Record<string, Promise<{ data: any; response: Response; }>> => {
            const result: Record<string, Promise<{ data: any; response: Response; }>> = {}
            Object.keys(this._cache).forEach((key) => {
                result[key] = hison.utils.deepCopyObject(this._cache[key]);
            });
            return result;
        };
        getKeys = (): string[] => {
            const result: string[] = [];
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
        constructor(eventEmitter: EventEmitter, cachingModule?: InterfaceCachingModule | null) {
            this._eventEmitter = eventEmitter;
            if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) {
                this._cachingModule = cachingModule;
            }
        };
        private _eventEmitter: EventEmitter;
        private _cachingModule: InterfaceCachingModule | null = null;
        private _getRsultDataWrapper = (resultData: any): any => {
            let data = null;
            if(resultData && resultData.constructor === Object && resultData.DATAWRAPPER === 'TRUE'
            ) {
                data = new hison.data.DataWrapper();
                for(const key of Object.keys(resultData)) {
                    if (resultData[key].constructor === Object || resultData[key].constructor === Array) {
                        data.putDataModel(key, new hison.data.DataModel(resultData[key]));
                    } else {
                        if(key !== 'DATAWRAPPER') data.put(key, resultData[key]);
                    }
                }
            } else {
                data = resultData;
            }
            return data;
        };
        private _getCachingResult = async (resourcePath: string): Promise<{ data: any; response: Response; } | null> => {
            if(this._cachingModule && this._cachingModule.isWebSocketConnection() === 1) {
                const result = await this._cachingModule.get(resourcePath);
                if(result && customOption.link.interceptApiResult(result.data, result.response) !== false) {
                    return result;
                };
                return null;
            }
            return null;
        };
        private _getFetch = (methodName: string, requestPath: string, options: Record<string, any>, serviceCmd: string | null, requestData: any): Promise<any>[] => {
            if(requestData && requestData.getIsDataWrapper && requestData.getIsDataWrapper()) {
                if (serviceCmd) requestData.putString('cmd', serviceCmd);
                requestData = requestData.getSerialized();
            } else if (requestData && typeof requestData === 'object'){
                if (serviceCmd && requestData.constructor === Object) requestData.cmd = serviceCmd;
                requestData = JSON.parse(requestData);
            }
            const fetchOptions: Record<string, any> = {
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
            const fecthArr: Promise<any>[] = [fetch(requestPath, fetchOptions)];
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
                if(customOption.link.interceptApiResult(data, rtn.response) === false) return null;
                return { data: data, response: rtn.response };
            })
            .catch(error => {
                this._eventEmitter.emit('requestError', error);
                if(customOption.link.interceptApiError(error) === false) return null;
                return error;
            });
        
            return result;
        };
        get = (resourcePath: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
            if(customOption.link.beforeGetRequst(resourcePath, options) === false) return Promise.resolve(null);
            const METHOD_NAME = 'GET';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, resourcePath, options);
            if(this._cachingModule && this._cachingModule.hasKey(resourcePath)) return this._getCachingResult(resourcePath);
            return this._request(this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + resourcePath, options, null, null), resourcePath);
        };
        post = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
            if(customOption.link.beforePostRequst(requestData, options) === false) return Promise.resolve(null);
            const METHOD_NAME = 'POST';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        put = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
            if(customOption.link.beforePutRequst(requestData, options) === false) return Promise.resolve(null);
            const METHOD_NAME = 'PUT';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        patch = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
            if(customOption.link.beforePatchRequst(requestData, options) === false) return Promise.resolve(null);
            const METHOD_NAME = 'PATCH';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        delete = async (requestData: any, serviceCmd: string, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
            if(customOption.link.beforeDeleteRequst(requestData, options) === false) return Promise.resolve(null);
            const METHOD_NAME = 'DELETE';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, customOption.link.protocol + customOption.link.domain + customOption.link.controllerPath, options, serviceCmd, requestData), serviceCmd);
        };
        head = async (resourcePath: string, options: Record<string, any> = {}): Promise<Record<string, string>> => {
            const url = customOption.link.protocol + customOption.link.domain + resourcePath;
            return fetch(url, { method: 'HEAD', ...options })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HEAD request failed with status: ${response.status}`);
                    }
                    const headers: Record<string, any> = {};
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
            const url = customOption.link.protocol + customOption.link.domain + resourcePath;
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
        getURL = (url: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; } | null> => {
            const METHOD_NAME = 'GET';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, url, options);
            if(this._cachingModule && this._cachingModule.hasKey(url)) return this._getCachingResult(url);
            return this._request(this._getFetch(METHOD_NAME, url, options, null, null), url);
        };
        postURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; } | null> => {
            const METHOD_NAME = 'POST';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        putURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; } | null> => {
            const METHOD_NAME = 'PUT';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        patchURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; } | null> => {
            const METHOD_NAME = 'PATCH';
            this._eventEmitter.emit('requestStarted_' + METHOD_NAME, serviceCmd, options, requestData);
            if(this._cachingModule && this._cachingModule.hasKey(serviceCmd)) return this._getCachingResult(url + serviceCmd);
            return this._request(this._getFetch(METHOD_NAME, url, options, serviceCmd, requestData), url + serviceCmd);
        };
        deleteURL = async (url: string, requestData: any, serviceCmd: string, options: Record<string, any> ={}): Promise<{ data: any; response: Response; } | null> => {
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
                    const headers: Record<string, any> = {};
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
    class HisonCore{
        utils = {
            /**
             * Checks if the given string contains only alphabetic characters (A-Z, a-z).
             *
             * - Returns `true` if the string consists solely of alphabetic characters.
             * - Returns `false` if the string contains numbers, symbols, or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only alphabetic characters, otherwise `false`.
             *
             * @example
             * isAlpha("Hello"); // true
             * isAlpha("Hello123"); // false
             * isAlpha("!@#"); // false
             */
            isAlpha(str: string): boolean {
                return /^[A-Za-z]+$/.test(str);
            },
            /**
             * Checks if the given string contains only alphabetic characters (A-Z, a-z) and numbers (0-9).
             *
             * - Returns `true` if the string consists solely of alphabetic characters and/or numbers.
             * - Returns `false` if the string contains symbols or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only alphabetic characters and numbers, otherwise `false`.
             *
             * @example
             * isAlphaNumber("Hello123"); // true
             * isAlphaNumber("Hello!"); // false
             * isAlphaNumber("123"); // true
             */
            isAlphaNumber(str: string): boolean {
                return /^[A-Za-z0-9]+$/.test(str);
            },
            /**
             * Checks if the given string contains only numeric characters (0-9).
             *
             * - Returns `true` if the string consists solely of numbers.
             * - Returns `false` if the string contains letters, symbols, or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only numeric characters, otherwise `false`.
             *
             * @example
             * isNumber("123456"); // true
             * isNumber("123a"); // false
             * isNumber("!@#"); // false
             */
            isNumber(str: string): boolean {
                return /^[0-9]+$/.test(str);
            },
            /**
             * Checks if the given string contains only numeric characters (0-9) and symbols.
             *
             * - Returns `true` if the string consists solely of numbers and/or symbols.
             * - Returns `false` if the string contains alphabetic characters or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only numeric characters and symbols, otherwise `false`.
             *
             * @example
             * isNumberSymbols("123!@#"); // true
             * isNumberSymbols("123ABC"); // false
             * isNumberSymbols("!@#$%^"); // true
             */
            isNumberSymbols(str: string): boolean {
                return /^[0-9!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?~]+$/.test(str);
            },
            /**
             * Checks if the given string contains any symbols.
             *
             * - Returns `true` if the string contains at least one symbol.
             * - Returns `false` if the string has only alphanumeric characters or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains symbols, otherwise `false`.
             *
             * @example
             * isIncludeSymbols("Hello!"); // true
             * isIncludeSymbols("123"); // false
             * isIncludeSymbols("password@123"); // true
             */
            isIncludeSymbols(str: string): boolean {
                return /[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?~]/.test(str);
            },
            /**
             * Checks if the given string contains only lowercase alphabetic characters (a-z).
             *
             * - Returns `true` if the string consists solely of lowercase letters.
             * - Returns `false` if the string contains uppercase letters, numbers, symbols, or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only lowercase alphabetic characters, otherwise `false`.
             *
             * @example
             * isLowerAlpha("hello"); // true
             * isLowerAlpha("Hello"); // false
             * isLowerAlpha("hello123"); // false
             */
            isLowerAlpha(str: string): boolean {
                return /^[a-z]+$/.test(str);
            },
            /**
             * Checks if the given string contains only lowercase alphabetic characters (a-z) and numbers (0-9).
             *
             * - Returns `true` if the string consists solely of lowercase letters and/or numbers.
             * - Returns `false` if the string contains uppercase letters, symbols, or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only lowercase letters and numbers, otherwise `false`.
             *
             * @example
             * isLowerAlphaAndNumber("hello123"); // true
             * isLowerAlphaAndNumber("Hello123"); // false
             * isLowerAlphaAndNumber("hello!"); // false
             */
            isLowerAlphaAndNumber(str: string): boolean {
                return /^[a-z0-9]+$/.test(str);
            },
            /**
             * Checks if the given string contains only uppercase alphabetic characters (A-Z).
             *
             * - Returns `true` if the string consists solely of uppercase letters.
             * - Returns `false` if the string contains lowercase letters, numbers, symbols, or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only uppercase alphabetic characters, otherwise `false`.
             *
             * @example
             * isUpperAlpha("HELLO"); // true
             * isUpperAlpha("Hello"); // false
             * isUpperAlpha("HELLO123"); // false
             */
            isUpperAlpha(str: string): boolean {
                return /^[A-Z]+$/.test(str);
            },
            /**
             * Checks if the given string contains only uppercase alphabetic characters (A-Z) and numbers (0-9).
             *
             * - Returns `true` if the string consists solely of uppercase letters and/or numbers.
             * - Returns `false` if the string contains lowercase letters, symbols, or is empty.
             *
             * @param str The string to be checked.
             * @returns `true` if the string contains only uppercase letters and numbers, otherwise `false`.
             *
             * @example
             * isUpperAlphaNumber("HELLO123"); // true
             * isUpperAlphaNumber("Hello123"); // false
             * isUpperAlphaNumber("HELLO!"); // false
             */
            isUpperAlphaNumber(str: string): boolean {
                return /^[A-Z0-9]+$/.test(str);
            },
            /**
             * Checks if the given value is a numeric value.
             *
             * - Returns `true` if the value is a finite number.
             * - Returns `false` if the value is `NaN`, `Infinity`, or not a number.
             *
             * @param num The value to be checked.
             * @returns `true` if the value is numeric, otherwise `false`.
             *
             * @example
             * isNumeric(123); // true
             * isNumeric("123"); // true
             * isNumeric("abc"); // false
             * isNumeric(Infinity); // false
             * isNumeric(NaN); // false
             */
            isNumeric(num: any): boolean {
                return !isNaN(num) && isFinite(num);
            },
            /**
             * Checks if the given value is an integer.
             *
             * - Returns `true` if the value is a finite integer.
             * - Returns `false` if the value is a decimal, `NaN`, `Infinity`, or not a number.
             *
             * @param num The value to be checked.
             * @returns `true` if the value is an integer, otherwise `false`.
             *
             * @example
             * isInteger(10); // true
             * isInteger("10"); // true
             * isInteger(10.5); // false
             * isInteger("abc"); // false
             * isInteger(Infinity); // false
             */
            isInteger(num: any): boolean {
                if (!hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num);
            },
            /**
             * Checks if the given value is a positive integer.
             *
             * - Returns `true` if the value is a finite integer greater than zero.
             * - Returns `false` if the value is zero, a negative number, a decimal, `NaN`, `Infinity`, or not a number.
             *
             * @param num The value to be checked.
             * @returns `true` if the value is a positive integer, otherwise `false`.
             *
             * @example
             * isPositiveInteger(10); // true
             * isPositiveInteger("10"); // true
             * isPositiveInteger(0); // false
             * isPositiveInteger(-5); // false
             * isPositiveInteger(10.5); // false
             */
            isPositiveInteger(num: any): boolean {
                if (!hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num) && num > 0;
            },
            /**
             * Checks if the given value is a negative integer.
             *
             * - Returns `true` if the value is a finite integer less than zero.
             * - Returns `false` if the value is zero, a positive number, a decimal, `NaN`, `Infinity`, or not a number.
             *
             * @param num The value to be checked.
             * @returns `true` if the value is a negative integer, otherwise `false`.
             *
             * @example
             * isNegativeInteger(-10); // true
             * isNegativeInteger("-10"); // true
             * isNegativeInteger(0); // false
             * isNegativeInteger(5); // false
             * isNegativeInteger(-10.5); // false
             */
            isNegativeInteger(num: any): boolean {
                if (!hison.utils.isNumeric(num)) return false;
                num = Number(num);
                return Number.isInteger(num) && num < 0;
            },
            /**
             * Checks if the given value is an array.
             *
             * - Returns `true` if the value is an array.
             * - Returns `false` if the value is `null`, `undefined`, an object, or any other data type.
             *
             * @param arr The value to be checked.
             * @returns `true` if the value is an array, otherwise `false`.
             *
             * @example
             * isArray([1, 2, 3]); // true
             * isArray("Hello"); // false
             * isArray({ key: "value" }); // false
             * isArray(null); // false
             */
            isArray(arr: any): boolean {
                return Array.isArray(arr) && arr.constructor === Array;
            },
            /**
             * Checks if the given value is a plain object.
             *
             * - Returns `true` if the value is a non-null object and not an array.
             * - Returns `false` if the value is `null`, an array, or any other data type.
             *
             * @param obj The value to be checked.
             * @returns `true` if the value is a plain object, otherwise `false`.
             *
             * @example
             * isObject({ key: "value" }); // true
             * isObject([1, 2, 3]); // false
             * isObject(null); // false
             * isObject("Hello"); // false
             */
            isObject(obj: any): boolean {
                return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object;
            },
            /**
             * Checks if the given value is a valid date.
             *
             * - Accepts a `DateObject` or a string representation of a date.
             * - Returns `true` if the date is valid based on its year, month, and day.
             * - Returns `false` if the date is improperly formatted or does not exist.
             *
             * @param date The value to be checked (as a `DateObject` or string).
             * @returns `true` if the value is a valid date, otherwise `false`.
             *
             * @example
             * isDate("2024-02-29"); // true (valid leap year date)
             * isDate("2023-02-29"); // false (February 29 does not exist in 2023)
             * isDate({ y: 2023, M: 12, d: 31 }); // true
             * isDate("invalid-date"); // false
             */
            isDate(date: DateObject | string | null): boolean {
                if(!date) return false;
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
            /**
             * Checks if the given value is a valid time.
             *
             * - Accepts a `TimeObject` or a string representation of a time.
             * - Returns `true` if the time consists of valid hours, minutes, and seconds.
             * - Returns `false` if any part of the time is invalid or improperly formatted.
             *
             * @param time The value to be checked (as a `TimeObject` or string).
             * @returns `true` if the value is a valid time, otherwise `false`.
             *
             * @example
             * isTime("14:30:59"); // true
             * isTime({ h: 23, m: 59, s: 59 }); // true
             * isTime("25:00:00"); // false (invalid hour)
             * isTime("12:60:00"); // false (invalid minute)
             * isTime("12:30:61"); // false (invalid second)
             */
            isTime(time: TimeObject | string | null): boolean {
                if(!time) return false;
                const timeObj: TimeObject = hison.utils.isObject(time) ? time as TimeObject : hison.utils.getTimeObject(time as string);
        
                let hh: number | null = timeObj.h;
                let mm: number | null = timeObj.m;
                let ss: number | null = timeObj.s;
        
                if (!hison.utils.isInteger(hh) || !hison.utils.isInteger(mm) || !hison.utils.isInteger(ss)) {
                    return false;
                }
                /*
                hh = parseInt(hh, 10);
                mm = parseInt(mm, 10);
                ss = parseInt(ss, 10);
                */
        
                function isValidTimePart(time: number | null, max: number): boolean {
                    if(!time) return false;
                    return !isNaN(time) && time >= 0 && time <= max;
                }
            
                return isValidTimePart(hh, 23) && isValidTimePart(mm, 59) && isValidTimePart(ss, 59);
            },
            /**
             * Checks if the given value is a valid datetime.
             *
             * - Accepts a `DateTimeObject` or a string representation of a datetime.
             * - Returns `true` if both the date and time components are valid.
             * - Returns `false` if either the date or time is invalid or improperly formatted.
             *
             * @param datetime The value to be checked (as a `DateTimeObject` or string).
             * @returns `true` if the value is a valid datetime, otherwise `false`.
             *
             * @example
             * isDatetime("2024-02-29 14:30:59"); // true
             * isDatetime({ y: 2023, M: 12, d: 31, h: 23, m: 59, s: 59 }); // true
             * isDatetime("2023-02-29 12:00:00"); // false (invalid date)
             * isDatetime("2024-02-28 25:00:00"); // false (invalid time)
             */
            isDatetime(datetime: DateTimeObject | string): boolean {
                const datetimeObj: DateTimeObject | null = hison.utils.isObject(datetime) ? datetime as DateTimeObject : hison.utils.getDatetimeObject(datetime as string);
                if (!hison.utils.isDate(datetimeObj)) return false;
                if (!hison.utils.isTime(datetimeObj)) return false;
                return true;
            },
            /**
             * Checks if the given string is a valid email address.
             *
             * - Returns `true` if the string follows the standard email format.
             * - Returns `false` if the string does not match the email pattern.
             *
             * @param str The string to be checked.
             * @returns `true` if the string is a valid email address, otherwise `false`.
             *
             * @example
             * isEmail("user@example.com"); // true
             * isEmail("user.name@domain.co"); // true
             * isEmail("user@domain"); // false (missing top-level domain)
             * isEmail("invalid-email"); // false
             */
            isEmail(str: string): boolean {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,}$/;
                return emailPattern.test(str);
            },
            /**
             * Checks if the given string is a valid URL.
             *
             * - Returns `true` if the string follows the standard URL format.
             * - Returns `false` if the string does not match the URL pattern.
             *
             * @param urlStr The string to be checked.
             * @returns `true` if the string is a valid URL, otherwise `false`.
             *
             * @example
             * isURL("https://example.com"); // true
             * isURL("ftp://files.server.com"); // true
             * isURL("www.example.com"); // false (missing protocol)
             * isURL("invalid-url"); // false
             */
            isURL(urlStr: string): boolean {
                const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
                return urlPattern.test(urlStr);
            },
            /**
             * Checks if the given string matches the specified mask pattern.
             *
             * - A mask defines expected character types at each position:
             *   - `'A'` expects an uppercase letter (A-Z).
             *   - `'a'` expects a lowercase letter (a-z).
             *   - `'9'` expects a numeric digit (0-9).
             *   - Any other character in the mask must match exactly.
             * - Returns `true` if the string fully matches the mask pattern.
             * - Returns `false` if the string does not match the mask or has a different length.
             *
             * @param str The string to be validated.
             * @param mask The mask pattern defining expected character types.
             * @returns `true` if the string matches the mask pattern, otherwise `false`.
             *
             * @example
             * isValidMask("ABC123", "AAA999"); // true
             * isValidMask("abc123", "AAA999"); // false (lowercase letters don't match uppercase mask)
             * isValidMask("abc-123", "aaa-999"); // true
             * isValidMask("abcd123", "aaa-999"); // false (length mismatch)
             */
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
            /**
             * Extracts and returns the year, month, and day from a given date.
             *
             * - If the input is a `Date` object, it extracts the year, month, and day.
             * - If the input is a string, it attempts to parse it in formats:
             *   - `"YYYY-MM-DD"`
             *   - `"YYYY/MM/DD"`
             *   - `"YYYYMMDD"`
             * - If parsing fails, it returns an object with `null` values.
             *
             * @param date A `Date` object or a date string in a supported format.
             * @returns An object containing the year (`y`), month (`M`), and day (`d`).
             *
             * @example
             * getDateObject("2024-02-05"); // { y: 2024, M: 2, d: 5 }
             * getDateObject("20240205"); // { y: 2024, M: 2, d: 5 }
             * getDateObject(new Date(2024, 1, 5)); // { y: 2024, M: 2, d: 5 }
             * getDateObject("invalid"); // { y: null, M: null, d: null }
             */
            getDateObject(date: Date | string): DateObject {
                const result: {
                   y: number | null;
                   M: number | null;
                   d: number | null; 
                } = {y: null, M: null, d: null};
                if (typeof date === 'string') {
                    let year: number | null = null, month: number | null = null, day: number | null = null;
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
            /**
             * Extracts and returns the hours, minutes, and seconds from a given time.
             *
             * - If the input is a `Date` object, it extracts the hour, minute, and second.
             * - If the input is a string, it attempts to parse it in formats:
             *   - `"HH:MM:SS"`
             *   - `"HHMMSS"`
             * - If the input is a datetime string (`"YYYY-MM-DD HH:MM:SS"`), it extracts only the time part.
             * - If parsing fails, it returns an object with `null` values.
             *
             * @param time A `Date` object or a time string in a supported format.
             * @returns An object containing the hours (`h`), minutes (`m`), and seconds (`s`).
             *
             * @example
             * getTimeObject("14:30:45"); // { h: 14, m: 30, s: 45 }
             * getTimeObject("143045"); // { h: 14, m: 30, s: 45 }
             * getTimeObject("2024-02-05 14:30:45"); // { h: 14, m: 30, s: 45 }
             * getTimeObject(new Date(2024, 1, 5, 14, 30, 45)); // { h: 14, m: 30, s: 45 }
             * getTimeObject("invalid"); // { h: null, m: null, s: null }
             */
            getTimeObject(time: Date | string): TimeObject {
                const result: {
                    h: number | null;
                    m: number | null;
                    s: number | null;
                } = {h: null, m: null, s: null};
                if (typeof time === 'string') {
                    let hours: number | null = null, minutes: number | null = null, seconds: number | null = null;
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
            /**
             * Extracts and returns the year, month, day, hours, minutes, and seconds from a given datetime.
             *
             * - If the input is a `Date` object, it extracts all date and time components.
             * - If the input is a string, it attempts to parse it in formats:
             *   - `"YYYY-MM-DD HH:MM:SS"`
             *   - `"YYYY/MM/DD HH:MM:SS"`
             *   - `"YYYYMMDDHHMMSS"`
             * - If the input is a date-only string (`"YYYY-MM-DD"`), the time defaults to `00:00:00`.
             * - If parsing fails, it returns `null`.
             *
             * @param datetime A `Date` object or a datetime string in a supported format.
             * @returns An object containing the year (`y`), month (`M`), day (`d`), hours (`h`), minutes (`m`), and seconds (`s`), or `null` if parsing fails.
             *
             * @example
             * getDatetimeObject("2024-02-05 14:30:45"); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
             * getDatetimeObject("20240205143045"); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
             * getDatetimeObject("2024-02-05"); // { y: 2024, M: 2, d: 5, h: 0, m: 0, s: 0 }
             * getDatetimeObject(new Date(2024, 1, 5, 14, 30, 45)); // { y: 2024, M: 2, d: 5, h: 14, m: 30, s: 45 }
             * getDatetimeObject("invalid"); // null
             */
            getDatetimeObject(datetime: Date | string): DateTimeObject | null {
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

            /**
             * Adds a specified amount of time to a given date or datetime.
             *
             * - Accepts a `DateTimeObject`, `DateObject`, or a date string.
             * - Supports adding years (`'y'`), months (`'M'`), days (`'d'`), hours (`'h'`), minutes (`'m'`), and seconds (`'s'`).
             * - If `addType` is omitted or invalid, it defaults to adding days.
             * - If `format` is provided, returns a formatted string; otherwise, returns a `DateTimeObject`.
             *
             * @param datetime The original datetime as an object or string.
             * @param addValue The amount to add (positive or negative).
             * @param addType The unit of time to add (`'y'`, `'M'`, `'d'`, `'h'`, `'m'`, `'s'`).
             * @param format Optional format string for the output. default : 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm:ss'
             * @returns The updated datetime as an object or formatted string.
             *
             * @example
             * addDate("2024-02-05", 1, "d"); // { y: 2024, M: 2, d: 6 }
             * addDate("2024-02-05", -1, "M"); // { y: 2024, M: 1, d: 5 }
             * addDate("2024-02-05 14:30:00", 2, "h"); // { y: 2024, M: 2, d: 5, h: 16, m: 30, s: 0 }
             * addDate("2024-02-05", 1, "d", "yyyy-MM-dd"); // "2024-02-06"
             */
            addDate(datetime: DateTimeObject | DateObject | string, addValue: string | number = 0, addType: string = '', format: string = ''): DateTimeObject | string {
                const datetimeObj: DateTimeObject = hison.utils.isObject(datetime) ? hison.utils.deepCopyObject(datetime) : hison.utils.getDatetimeObject(datetime as string);
                if (!format) {
                    if (datetimeObj.h === undefined || datetimeObj.h === null) {
                        format = customOption.utils.dateFormat
                    }
                    else {
                        format = customOption.utils.datetimeFormat;
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
                if (datetimeObj.y === null || datetimeObj.M === null || datetimeObj.d === null) {
                    throw new Error(`ER0002 Please enter a valid date.\n=>${JSON.stringify(datetime)}`);
                }

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
            /**
             * Calculates the difference between two dates or datetimes.
             *
             * - Accepts `DateTimeObject`, `DateObject`, or a string representation of a date or datetime.
             * - If `diffType` is specified, it returns the difference in the given unit:
             *   - `'y'`: Years
             *   - `'M'`: Months
             *   - `'d'`: Days
             *   - `'h'`: Hours
             *   - `'m'`: Minutes
             *   - `'s'`: Seconds
             * - If `diffType` is omitted or invalid, it defaults to calculating the difference in days.
             *
             * @param datetime1 The first date or datetime.
             * @param datetime2 The second date or datetime.
             * @param diffType The unit of difference (`'y'`, `'M'`, `'d'`, `'h'`, `'m'`, `'s'`).
             * @returns The difference between the two dates in the specified unit.
             *
             * @example
             * getDateDiff("2024-02-01", "2024-03-01", "M"); // 1
             * getDateDiff("2024-02-01", "2025-02-01", "y"); // 1
             * getDateDiff("2024-02-01", "2024-02-10", "d"); // 9
             * getDateDiff("2024-02-01 14:00:00", "2024-02-01 16:30:00", "h"); // 2
             * getDateDiff("2024-02-01 14:00:00", "2024-02-01 14:45:00", "m"); // 45
             * getDateDiff("2024-02-01 14:00:00", "2024-02-01 14:00:30", "s"); // 30
             */
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
                if (!hison.utils.isDate(datetimeObj2)) throw new Error(`ER0006 Please enter a valid date.\n=>${JSON.stringify(datetimeObj2)}`);
                if (!hison.utils.isTime(datetimeObj2)) throw new Error(`ER0007 Please enter a valid date.\n=>${JSON.stringify(datetimeObj2)}`);
                if (datetimeObj1.y === null) {
                    throw new Error(`ER0004 Please enter a valid date.\n=>${JSON.stringify(datetimeObj1)}`);
                }
                if (datetimeObj2.y === null) {
                    throw new Error(`ER0005 Please enter a valid date.\n=>${JSON.stringify(datetimeObj2)}`);
                }
            
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
            /**
             * Returns the full or abbreviated name of a given month.
             *
             * - Accepts a month number (`1-12`) or a string representation of a number.
             * - If `isFullName` is `true`, it returns the full month name (e.g., `"January"`).
             * - If `isFullName` is `false`, it returns the abbreviated month name (e.g., `"Jan"`).
             * - Throws an error if the input month is outside the valid range (`1-12`).
             *
             * @param month The month as a number (`1-12`) or a string representing a number.
             * @param isFullName Determines whether to return the full name (`true`) or the abbreviated name (`false`) (default: `true`).
             * @returns The full or abbreviated month name.
             *
             * @throws Error if the month is not between `1` and `12`.
             *
             * @example
             * getMonthName(2); // "February"
             * getMonthName("3", false); // "Mar"
             * getMonthName(12, true); // "December"
             * getMonthName(0); // Throws error: "Month must be between 1 and 12"
             */
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
            /**
             * Formats a given date or datetime according to the specified format.
             *
             * - Accepts a `DateTimeObject`, `DateObject`, or a string representation of a date/datetime.
             * - If no format is provided, it defaults to `CustomOption.dateFormat` for dates 
             *   and `CustomOption.datetimeFormat` for datetimes.
             * - Supports various formats such as:
             *   - `'yyyy-MM-dd'` → `"2025-02-05"`
             *   - `'yyyy/MM/dd hh:mm:ss'` → `"2025/02/05 14:30:45"`
             *   - `'MMMM dd, yyyy'` → `"February 5, 2025"`
             * - Throws an error if the input date is invalid.
             *
             * @param datetime The date or datetime to format.
             * @param format The desired output format (optional). Default: `'yyyy-MM-dd'` or `'yyyy-MM-dd hh:mm:ss'`
             * @returns The formatted date/time as a string.
             *
             * @throws Error if the provided date is invalid.
             *
             * @example
             * getDateWithFormat("2025-02-05", "yyyy/MM/dd"); // "2025/02/05"
             * getDateWithFormat("2025-02-05 14:30:45", "MMMM dd, yyyy"); // "February 5, 2025"
             * getDateWithFormat({ y: 2025, M: 2, d: 5 }, "MM-dd-yyyy"); // "02-05-2025"
             */
            getDateWithFormat(datetime: DateTimeObject | DateObject | string, format: string = ''): string {
                const datetimeObj = hison.utils.isObject(datetime) ? hison.utils.deepCopyObject(datetime) : hison.utils.getDatetimeObject(datetime as string);
                if (!format) {
                    if (datetimeObj.h === undefined || datetimeObj.h === null) {
                        format = customOption.utils.dateFormat
                    }
                    else {
                        format = customOption.utils.datetimeFormat;
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
            /**
             * Returns the day of the week for a given date.
             *
             * - Accepts a `DateObject` or a string representation of a date.
             * - Uses `CustomOption.dayOfWeekFormat` as the default format.
             * - Supports different formats for output:
             *   - `'d'` → Numeric day of the week (`0-6`, where `0 = Sunday`).
             *   - `'dy'` → Abbreviated English name (`"Sun", "Mon", ..., "Sat"`).
             *   - `'day'` → Full English name (`"Sunday", "Monday", ..., "Saturday"`).
             *   - `'kdy'` → Abbreviated Korean name (`"일", "월", ..., "토"`).
             *   - `'kday'` → Full Korean name (`"일요일", "월요일", ..., "토요일"`).
             * - Throws an error if the input date is invalid.
             *
             * @param date The date to evaluate.
             * @param dayType The format of the output (optional). Default: `'d'`
             * @returns The day of the week in the specified format.
             *
             * @throws Error if the provided date is invalid.
             *
             * @example
             * getDayOfWeek("2025-02-05", "d"); // "3" (Wednesday)
             * getDayOfWeek("2025-02-05", "dy"); // "Wed"
             * getDayOfWeek("2025-02-05", "day"); // "Wednesday"
             * getDayOfWeek("2025-02-05", "kdy"); // "수"
             * getDayOfWeek("2025-02-05", "kday"); // "수요일"
             */
            getDayOfWeek(date: DateObject | string, dayType: string = customOption.utils.dayOfWeekFormat): string {
                const dateObj: DateObject = hison.utils.isObject(date) ? date as DateObject : hison.utils.getDateObject(date as string);
                if (!hison.utils.isDate(dateObj)) throw new Error(`ER0011 Invalid format.\n=>${JSON.stringify(date)}`);
                if (dateObj.y === null || dateObj.M === null || dateObj.d === null) {
                    throw new Error(`ER0011 Invalid format.\n=>${JSON.stringify(date)}`);
                }
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
            /**
             * Returns the last day of the month for a given date.
             *
             * - Accepts a `DateObject` or a string representation of a date.
             * - If the input is a `DateObject`, it uses the month and year from the object.
             * - If the input is a string, it assumes the first day of the given month unless a full date is provided.
             * - Determines the last day of the specified month by computing the last day of the next month minus one.
             * - Throws an error if the input date is invalid.
             *
             * @param date The date or month to evaluate.
             * @returns The last day of the month as a number.
             *
             * @throws Error if the provided date is invalid.
             *
             * @example
             * getLastDay("2025-02"); // 28 (for February 2025)
             * getLastDay("2024-02"); // 29 (leap year February)
             * getLastDay({ y: 2025, M: 5, d: 15 }); // 31 (May has 31 days)
             * getLastDay("2025-07-10"); // 31 (July has 31 days)
             */
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
                if (!hison.utils.isDate(dateObj)) throw new Error(`ER0012 Invalid format.\n=>${JSON.stringify(date)}`);
                if (dateObj.y === null || dateObj.M === null) {
                    throw new Error(`ER0012 Invalid format.\n=>${JSON.stringify(date)}`);
                }
                const nextMonthFirstDay = new Date(dateObj.y, dateObj.M, 1);
                nextMonthFirstDay.setDate(0);
                return nextMonthFirstDay.getDate();
            },
            /**
             * Returns the current system year in the specified format.
             *
             * - Uses `CustomOption.yearFormat` as the default format.
             * - Supports the following formats:
             *   - `'yyyy'` → Full year (`"2025"`)
             *   - `'yy'` → Last two digits of the year (`"25"`)
             * - If an unsupported format is provided, it defaults to `'yyyy'`.
             *
             * @param format The desired output format (optional). Default: `'yyyy'`
             * @returns The current year as a string in the specified format.
             *
             * @example
             * getSysYear(); // "2025" (default format)
             * getSysYear("yyyy"); // "2025"
             * getSysYear("yy"); // "25"
             */
            getSysYear(format: string = customOption.utils.yearFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'yy':
                        return currentDate.getFullYear().toString().substring(2);
                    default:
                        return currentDate.getFullYear().toString();
                }
            },
            /**
             * Returns the current system month in the specified format.
             *
             * - Uses `CustomOption.monthFormat` as the default format.
             * - Supports the following formats:
             *   - `'M'` → Numeric month without leading zero (`"2"` for February).
             *   - `'MM'` → Numeric month with leading zero (`"02"` for February).
             *   - `'MMMM'` → Full month name (`"February"`).
             *   - `'MMM'` → Abbreviated month name (`"Feb"`).
             * - If an unsupported format is provided, it defaults to `'M'`.
             *
             * @param format The desired output format (optional). Default: `'M'`
             * @returns The current month as a string in the specified format.
             *
             * @example
             * getSysMonth(); // "2" (default format for February)
             * getSysMonth("MM"); // "02"
             * getSysMonth("MMMM"); // "February"
             * getSysMonth("MMM"); // "Feb"
             */
            getSysMonth(format: string = customOption.utils.monthFormat): string {
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
            /**
             * Returns the current system year and month in the specified format.
             *
             * - Uses `CustomOption.yearMonthFormat` as the default format.
             * - Delegates formatting to `getDateWithFormat()` using the first day of the current month.
             * - Common formats include:
             *   - `'yyyy-MM'` → `"2025-02"`
             *   - `'yyyy/MM'` → `"2025/02"`
             *   - `'MMMM yyyy'` → `"February 2025"`
             *   - `'MMM yyyy'` → `"Feb 2025"`
             *
             * @param format The desired output format (optional). Default: `'yyyy-MM'`
             * @returns The current year and month as a formatted string.
             *
             * @example
             * getSysYearMonth(); // "2025-02" (default format for February 2025)
             * getSysYearMonth("yyyy/MM"); // "2025/02"
             * getSysYearMonth("MMMM yyyy"); // "February 2025"
             * getSysYearMonth("MMM yyyy"); // "Feb 2025"
             */
            getSysYearMonth(format: string = customOption.utils.yearMonthFormat): string {
                const currentDate = new Date();
                return hison.utils.getDateWithFormat( {y : currentDate.getFullYear(), M : currentDate.getMonth() + 1, d : 1 }, format);
            },
            /**
             * Returns the current system day of the month in the specified format.
             *
             * - Uses `CustomOption.dayFormat` as the default format.
             * - Supports the following formats:
             *   - `'d'` → Day without leading zero (`"5"` for the 5th day of the month).
             *   - `'dd'` → Day with leading zero (`"05"` for the 5th day of the month).
             * - If an unsupported format is provided, it defaults to `'d'`.
             *
             * @param format The desired output format (optional). Default: `'d'`
             * @returns The current day of the month as a string in the specified format.
             *
             * @example
             * getSysDay(); // "5" (default format for the 5th day)
             * getSysDay("dd"); // "05"
             */
            getSysDay(format: string = customOption.utils.dayFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'dd':
                        return currentDate.getDate().toString().padStart(2, '0');
                    default:
                        return currentDate.getDate().toString();
                }
            },
            /**
             * Returns the current system day of the week in the specified format.
             *
             * - Uses `CustomOption.dayOfWeekFormat` as the default format.
             * - Delegates formatting to `getDayOfWeek()`, which supports:
             *   - `'d'` → Numeric day of the week (`0-6`, where `0 = Sunday`).
             *   - `'dy'` → Abbreviated English name (`"Sun", "Mon", ..., "Sat"`).
             *   - `'day'` → Full English name (`"Sunday", "Monday", ..., "Saturday"`).
             *   - `'kdy'` → Abbreviated Korean name (`"일", "월", ..., "토"`).
             *   - `'kday'` → Full Korean name (`"일요일", "월요일", ..., "토요일"`).
             *
             * @param format The desired output format (optional). Default: `'d'`
             * @returns The current day of the week in the specified format.
             *
             * @example
             * getSysDayOfWeek(); // "3" (default format, Wednesday)
             * getSysDayOfWeek("dy"); // "Wed"
             * getSysDayOfWeek("day"); // "Wednesday"
             * getSysDayOfWeek("kdy"); // "수"
             * getSysDayOfWeek("kday"); // "수요일"
             */
            getSysDayOfWeek(format: string = customOption.utils.dayOfWeekFormat): string {
                const currentDate = new Date();
                return hison.utils.getDayOfWeek({ y : currentDate.getFullYear(), M : currentDate.getMonth() + 1, d : currentDate.getDate()}, format);
            },
            /**
             * Returns the current system hour in the specified format.
             *
             * - Uses `CustomOption.hourFormat` as the default format.
             * - Supports the following formats:
             *   - `'h'` → Hour without leading zero (`"5"` for 5 AM/PM).
             *   - `'hh'` → Hour with leading zero (`"05"` for 5 AM/PM).
             * - If an unsupported format is provided, it defaults to `'h'`.
             *
             * @param format The desired output format (optional). Default: `'h'`
             * @returns The current hour as a string in the specified format.
             *
             * @example
             * getSysHour(); // "5" (default format)
             * getSysHour("hh"); // "05"
             */
            getSysHour(format: string = customOption.utils.hourFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'hh':
                        return currentDate.getHours().toString().padStart(2, '0');
                    default:
                        return currentDate.getHours().toString();
                }
            },
            /**
             * Returns the current system hour and minute in the specified format.
             *
             * - Uses `CustomOption.hourMinuteFormat` as the default format.
             * - Supports the following formats:
             *   - `'hhmm'` → Compact format without separators (`"1430"` for 2:30 PM).
             *   - `'hh:mm'` → Standard format with a colon separator (`"14:30"` for 2:30 PM).
             * - If an unsupported format is provided, it defaults to `'hh:mm'`.
             *
             * @param format The desired output format (optional). Default: `'hh:mm'`
             * @returns The current hour and minute as a string in the specified format.
             *
             * @example
             * getSysHourMinute(); // "14:30" (default format)
             * getSysHourMinute("hhmm"); // "1430"
             */
            getSysHourMinute(format: string = customOption.utils.hourMinuteFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'hhmm':
                        return currentDate.getHours().toString().padStart(2, '0') + '' + currentDate.getMinutes().toString().padStart(2, '0');
                    default:
                        return currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0');
                }
            },
            /**
             * Returns the current system minute in the specified format.
             *
             * - Uses `CustomOption.minuteFormat` as the default format.
             * - Supports the following formats:
             *   - `'m'` → Minute without leading zero (`"5"` for the 5th minute).
             *   - `'mm'` → Minute with leading zero (`"05"` for the 5th minute).
             * - If an unsupported format is provided, it defaults to `'m'`.
             *
             * @param format The desired output format (optional). Default: `'m'`
             * @returns The current minute as a string in the specified format.
             *
             * @example
             * getSysMinute(); // "5" (default format)
             * getSysMinute("mm"); // "05"
             */
            getSysMinute(format: string = customOption.utils.minuteFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'mm':
                        return currentDate.getMinutes().toString().padStart(2, '0');
                    default:
                        return currentDate.getMinutes().toString();
                }
            },
            /**
             * Returns the current system second in the specified format.
             *
             * - Uses `CustomOption.secondFormat` as the default format.
             * - Supports the following formats:
             *   - `'s'` → Second without leading zero (`"5"` for the 5th second).
             *   - `'ss'` → Second with leading zero (`"05"` for the 5th second).
             * - If an unsupported format is provided, it defaults to `'s'`.
             *
             * @param format The desired output format (optional). Default: `'s'`
             * @returns The current second as a string in the specified format.
             *
             * @example
             * getSysSecond(); // "5" (default format)
             * getSysSecond("ss"); // "05"
             */
            getSysSecond(format: string = customOption.utils.secondFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'ss':
                        return currentDate.getSeconds().toString().padStart(2, '0');
                    default:
                        return currentDate.getSeconds().toString();
                }
            },
            /**
             * Returns the current system time in the specified format.
             *
             * - Uses `CustomOption.timeFormat` as the default format.
             * - Supports the following formats:
             *   - `'hhmmss'` → Compact format without separators (`"143015"` for 2:30:15 PM).
             *   - `'hh:mm:ss'` → Standard format with colons (`"14:30:15"` for 2:30:15 PM).
             * - If an unsupported format is provided, it defaults to `'hh:mm:ss'`.
             *
             * @param format The desired output format (optional). Default: `'hh:mm:ss'`
             * @returns The current time as a string in the specified format.
             *
             * @example
             * getSysTime(); // "14:30:15" (default format)
             * getSysTime("hhmmss"); // "143015"
             */
            getSysTime(format: string = customOption.utils.timeFormat): string {
                const currentDate = new Date();
                switch (format.toLowerCase()) {
                    case 'hhmmss':
                        return currentDate.getHours().toString().padStart(2, '0') + currentDate.getMinutes().toString().padStart(2, '0') + currentDate.getSeconds().toString().padStart(2, '0');
                    default:
                        return currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0') + ':' + currentDate.getSeconds().toString().padStart(2, '0');
                }
            },
            /**
             * Returns the current system date and time in the specified format.
             *
             * - Uses `CustomOption.datetimeFormat` as the default format.
             * - Delegates formatting to `getDateWithFormat()`, which supports various formats, including:
             *   - `'yyyy-MM-dd hh:mm:ss'` → `"2025-02-05 14:30:15"`
             *   - `'yyyy/MM/dd'` → `"2025/02/05"`
             *   - `'MMMM dd, yyyy'` → `"February 5, 2025"`
             * - If no format is specified, it defaults to the full datetime format.
             *
             * @param format The desired output format (optional). Default: `'yyyy-MM-dd hh:mm:ss'`
             * @returns The current date and time as a formatted string.
             *
             * @example
             * getSysDate(); // "2025-02-05 14:30:15" (default format)
             * getSysDate("yyyy/MM/dd"); // "2025/02/05"
             * getSysDate("MMMM dd, yyyy"); // "February 5, 2025"
             */
            getSysDate(format: string = customOption.utils.datetimeFormat): string {
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
            /**
             * Rounds a number up to the nearest integer or specified decimal place.
             *
             * - If `precision` is `0`, it rounds up to the nearest whole number.
             * - If `precision` is greater than `0`, it rounds up to the specified number of decimal places.
             * - If `precision` is less than `0`, it rounds up to the nearest multiple of `10^precision`.
             *
             * @param num The number to be rounded up.
             * @param precision The number of decimal places to retain (default: `0`).
             * @returns The rounded-up number.
             *
             * @example
             * getCeil(12.34); // 13
             * getCeil(12.34, 1); // 12.4
             * getCeil(12.34, 2); // 12.34
             * getCeil(1250, -2); // 1300
             */
            getCeil(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.ceil(num * factor) / factor;
            },
            /**
             * Rounds a number down to the nearest integer or specified decimal place.
             *
             * - If `precision` is `0`, it rounds down to the nearest whole number.
             * - If `precision` is greater than `0`, it rounds down to the specified number of decimal places.
             * - If `precision` is less than `0`, it rounds down to the nearest multiple of `10^precision`.
             *
             * @param num The number to be rounded down.
             * @param precision The number of decimal places to retain (default: `0`).
             * @returns The rounded-down number.
             *
             * @example
             * getFloor(12.89); // 12
             * getFloor(12.89, 1); // 12.8
             * getFloor(12.89, 2); // 12.89
             * getFloor(1299, -2); // 1200
             */
            getFloor(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.floor(num * factor) / factor;
            },
            /**
             * Rounds a number to the nearest integer or specified decimal place.
             *
             * - If `precision` is `0`, it rounds to the nearest whole number.
             * - If `precision` is greater than `0`, it rounds to the specified number of decimal places.
             * - If `precision` is less than `0`, it rounds to the nearest multiple of `10^precision`.
             *
             * @param num The number to be rounded.
             * @param precision The number of decimal places to retain (default: `0`).
             * @returns The rounded number.
             *
             * @example
             * getRound(12.49); // 12
             * getRound(12.5); // 13
             * getRound(12.345, 2); // 12.35
             * getRound(1250, -2); // 1300
             */
            getRound(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.round(num * factor) / factor;
            },
            /**
             * Truncates a number to the specified decimal place without rounding.
             *
             * - If `precision` is `0`, it removes the decimal part, keeping only the integer.
             * - If `precision` is greater than `0`, it truncates the number at the specified decimal places.
             * - If `precision` is less than `0`, it truncates to the nearest multiple of `10^precision`.
             *
             * @param num The number to be truncated.
             * @param precision The number of decimal places to retain (default: `0`).
             * @returns The truncated number.
             *
             * @example
             * getTrunc(12.89); // 12
             * getTrunc(12.89, 1); // 12.8
             * getTrunc(12.89, 2); // 12.89
             * getTrunc(1299, -2); // 1200
             */
            getTrunc(num: number, precision: number = 0): number {
                num = hison.utils.getToNumber(num);
                precision = Math.trunc(hison.utils.getToNumber(precision));
                const factor = Math.pow(10, precision);
                return Math.trunc(num * factor) / factor;
            },
            /**
             * Calculates the byte length of a given string based on character encoding.
             *
             * - Uses UTF-8 encoding rules to determine the byte size of each character.
             * - Character byte sizes are determined as follows:
             *   - `charCode <= 0x7F` → 1 byte (ASCII characters).
             *   - `charCode <= 0x7FF` → `CustomOption.LESSOREQ_0X7FF_BYTE` bytes. Default: 2
             *   - `charCode <= 0xFFFF` → `CustomOption.LESSOREQ_0XFFFF_BYTE` bytes. Default: 3
             *   - `charCode > 0xFFFF` → `CustomOption.GREATER_0XFFFF_BYTE` bytes. Default: 4
             *
             * @param str The input string.
             * @returns The total byte length of the string.
             *
             * @example
             * getByteLength("Hello"); // 5 (each ASCII character is 1 byte)
             * getByteLength("안녕하세요"); // 15 (each Korean character is 3 bytes)
             * getByteLength("𐍈"); // 4 (UTF-16 surrogate pair)
             */
            getByteLength(str: string): number {
                str = hison.utils.getToString(str);
                let byteLength = 0;
                for (let i = 0; i < str.length; i++) {
                    const charCode = str.charCodeAt(i);
                    if (charCode <= 0x7F) {
                        byteLength += 1;
                    } else if (charCode <= 0x7FF) {
                        byteLength += customOption.utils.LESSOREQ_0X7FF_BYTE;
                    } else if (charCode <= 0xFFFF) {
                        byteLength += customOption.utils.LESSOREQ_0XFFFF_BYTE;
                    } else {
                        byteLength += customOption.utils.GREATER_0XFFFF_BYTE;
                    }
                }
                return byteLength;
            },
            /**
             * Truncates a string to fit within a specified byte length.
             *
             * - Uses UTF-8 encoding rules to calculate byte size.
             * - Truncates the string at the point where the total byte length exceeds `cutByte`.
             * - Character byte sizes are determined as follows:
             *   - `charCode <= 0x7F` → 1 byte (ASCII characters).
             *   - `charCode <= 0x7FF` → `CustomOption.LESSOREQ_0X7FF_BYTE` bytes.
             *   - `charCode <= 0xFFFF` → `CustomOption.LESSOREQ_0XFFFF_BYTE` bytes.
             *   - `charCode > 0xFFFF` → `CustomOption.GREATER_0XFFFF_BYTE` bytes.
             *
             * @param str The input string to be truncated.
             * @param cutByte The maximum allowed byte length.
             * @returns The truncated string that fits within the given byte length.
             *
             * @example
             * getCutByteLength("Hello, World!", 5); // "Hello"
             * getCutByteLength("안녕하세요", 6); // "안녕" (each Korean character is 3 bytes)
             * getCutByteLength("𐍈𐍈𐍈", 4); // "𐍈" (each surrogate pair character is 4 bytes)
             */
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
                        byteLength += customOption.utils.LESSOREQ_0X7FF_BYTE;
                    } else if (charCode <= 0xFFFF) {
                        byteLength += customOption.utils.LESSOREQ_0XFFFF_BYTE;
                    } else {
                        byteLength += customOption.utils.GREATER_0XFFFF_BYTE;
                    }
                    if (byteLength > cutByte) {
                        cutIndex = i;
                        break;
                    }
                }
                return str.substring(0, cutIndex);
            },
            /**
             * Adjusts a string to fit a specified length by evenly distributing spaces between characters.
             *
             * - If the string's length is already greater than or equal to `length`, it is returned as is.
             * - Spaces are distributed as evenly as possible between characters to reach the desired length.
             * - If the spacing is not evenly divisible, extra spaces are added starting from the left.
             *
             * @param str The input string.
             * @param length The target total length of the formatted string.
             * @returns A string with evenly distributed spaces to match the specified length.
             *
             * @example
             * getStringLenForm("Hi", 5); // "H  i"
             * getStringLenForm("Hello", 10); // "H  e  l  l  o"
             * getStringLenForm("A", 3); // "A  "
             */
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
            /**
             * Left-pads a string with a specified padding string until it reaches the desired length.
             *
             * - If the original string's length is already greater than or equal to `length`, it is returned as is.
             * - The `padStr` is repeated as needed to fill the remaining space.
             * - If `padStr` does not evenly divide into the required padding length, it may be truncated.
             *
             * @param str The original string.
             * @param padStr The string used for padding.
             * @param length The desired total length of the padded string.
             * @returns The left-padded string.
             *
             * @example
             * getLpad("123", "0", 5); // "00123"
             * getLpad("abc", "-", 6); // "---abc"
             * getLpad("test", "XY", 10); // "XYXYXYtest"
             */
            getLpad(str: string, padStr: string, length: number): string {
                str = hison.utils.getToString(str);
                padStr = hison.utils.getToString(padStr);
                length = hison.utils.getToNumber(length);
                if (str.length >= length) return str.substring(str.length, length - 1);
                const pad = padStr.repeat((length - str.length) / padStr.length);
                return pad + str;
            },
            /**
             * Right-pads a string with a specified padding string until it reaches the desired length.
             *
             * - If the original string's length is already greater than or equal to `length`, it is truncated to fit.
             * - The `padStr` is repeated as needed to fill the remaining space.
             * - If `padStr` does not evenly divide into the required padding length, it may be truncated.
             *
             * @param str The original string.
             * @param padStr The string used for padding.
             * @param length The desired total length of the padded string.
             * @returns The right-padded string.
             *
             * @example
             * getRpad("123", "0", 5); // "12300"
             * getRpad("abc", "-", 6); // "abc---"
             * getRpad("test", "XY", 10); // "testXYXYXY"
             */
            getRpad(str: string, padStr: string, length: number): string {
                str = hison.utils.getToString(str);
                padStr = hison.utils.getToString(padStr);
                length = hison.utils.getToNumber(length);
                if (str.length >= length) return str.substring(0, length);
                const pad = padStr.repeat((length - str.length) / padStr.length);
                return str + pad;
            },
            /**
             * Removes leading and trailing whitespace from a string.
             *
             * - Converts the input to a string if it is not already.
             * - Uses JavaScript's built-in `trim()` method to remove whitespace.
             *
             * @param str The input string.
             * @returns The trimmed string without leading or trailing spaces.
             *
             * @example
             * getTrim("  Hello World  "); // "Hello World"
             * getTrim("\tTest String\n"); // "Test String"
             * getTrim("   "); // "" (empty string)
             */
            getTrim(str: string): string {
                str = hison.utils.getToString(str);
                return str.trim();
            },
            /**
             * Replaces all occurrences of a target substring within a string with a specified replacement.
             *
             * - Converts all inputs to strings before processing.
             * - Uses `split()` and `join()` to replace all instances of `targetStr` with `replaceStr`.
             * - If `replaceStr` is not provided, occurrences of `targetStr` are removed.
             *
             * @param str The original string.
             * @param targetStr The substring to be replaced.
             * @param replaceStr The string to replace occurrences of `targetStr` (default: `''`).
             * @returns A new string with all occurrences of `targetStr` replaced.
             *
             * @example
             * getReplaceAll("hello world", "o", "O"); // "hellO wOrld"
             * getReplaceAll("banana", "a", ""); // "bnn"
             * getReplaceAll("2025-02-05", "-", "/"); // "2025/02/05"
             */
            getReplaceAll(str: string, targetStr: string, replaceStr: string = ''): string {
                str = hison.utils.getToString(str);
                targetStr = hison.utils.getToString(targetStr);
                replaceStr = hison.utils.getToString(replaceStr);
                return str.split(targetStr).join(replaceStr);
            },
            /**
             * Formats a number according to a specified format pattern.
             *
             * - Uses `CustomOption.numberFormat` as the default format if none is provided.
             * - Supports various number formatting patterns, including:
             *   - `"#,###"` → `"1,234"` (comma-separated thousands).
             *   - `"#,##0"` → `"1,234"` (ensures at least one digit).
             *   - `".##"` → `"0.1"` (no grouping).
             *   - `".00"` → `"0.10"` (ensures at least one digit).
             * - Supports decimal formatting and percentage notation (`"%"`).
             * - Throws an error if the input is not a valid number or if the format is invalid.
             *
             * @param value The number to format.
             * @param format The desired format pattern (optional). Default: `'#,##0.##'`
             * @returns The formatted number as a string.
             *
             * @throws Error if the input value is not numeric or the format is invalid.
             *
             * @example
             * getNumberFormat(1234); // "1,234" (default format)
             * getNumberFormat(1234.5678, "#,###.00"); // "1,234.56"
             * getNumberFormat(0.25, "#,##0%"); // "25%" (percentage conversion)
             * getNumberFormat(-1234, "#,###"); // "-1,234"
             */
            getNumberFormat(value: number, format?: string): string {
                value = hison.utils.getToNumber(value);
                format = hison.utils.getToString(format);

                const oriValue = value;
                if (!hison.utils.isNumeric(value)) {
                    throw new Error(`ER0021 Invalid number\n=>${JSON.stringify(oriValue)}`);
                }
                format = format ? format : customOption.utils.numberFormat;
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
            /**
             * Removes all non-numeric characters from a string, leaving only digits.
             *
             * - Converts the input to a string if it is not already.
             * - Uses a regular expression to remove any character that is not a digit (`0-9`).
             *
             * @param str The input string.
             * @returns A new string containing only numeric characters.
             *
             * @example
             * getRemoveExceptNumbers("abc123def456"); // "123456"
             * getRemoveExceptNumbers("Phone: (555) 123-4567"); // "5551234567"
             * getRemoveExceptNumbers("No numbers here!"); // ""
             */
            getRemoveExceptNumbers(str: string): string {
                str = hison.utils.getToString(str);
                return str.replace(/[^0-9]/g, '');
            },
            /**
             * Removes all numeric characters from a string, leaving only non-numeric characters.
             *
             * - Converts the input to a string if it is not already.
             * - Uses a regular expression to remove any digit (`0-9`).
             *
             * @param str The input string.
             * @returns A new string containing only non-numeric characters.
             *
             * @example
             * getRemoveNumbers("abc123def456"); // "abcdef"
             * getRemoveNumbers("Phone: (555) 123-4567"); // "Phone: () -"
             * getRemoveNumbers("123456"); // "" (all numbers removed)
             */
            getRemoveNumbers(str: string): string {
                str = hison.utils.getToString(str);
                return str.replace(/[0-9]/g, '');
            },
            /**
             * Reverses the characters in a given string.
             *
             * - Converts the input to a string if it is not already.
             * - Splits the string into an array of characters, reverses the order, and joins them back.
             *
             * @param str The input string.
             * @returns The reversed string.
             *
             * @example
             * getReverse("hello"); // "olleh"
             * getReverse("12345"); // "54321"
             * getReverse("A B C"); // "C B A"
             */
            getReverse(str: string): string {
                str = hison.utils.getToString(str);
                return str.split('').reverse().join('');
            },
            /**
             * Converts the given value to a boolean.
             *
             * - Numeric values: `0` is `false`, any other number is `true`.
             * - Boolean values: Returned as is.
             * - String values: Returns `true` if the string matches predefined truthy values (`"true"`, `"yes"`, `"checked"`, etc.).
             * - Other types: Returns `false`.
             *
             * @param value The value to be converted.
             * @returns `true` if the value represents a truthy value, otherwise `false`.
             *
             * @example
             * getToBoolean(1); // true
             * getToBoolean(0); // false
             * getToBoolean("yes"); // true
             * getToBoolean("false"); // false
             * getToBoolean(true); // true
             * getToBoolean(null); // false
             */
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
            /**
             * Converts the given value to a number.
             *
             * - If the value is numeric, it is returned as a number.
             * - If the value is not a valid number, `impossibleValue` is returned instead.
             *
             * @param value The value to be converted.
             * @param impossibleValue The fallback value if conversion fails (default: `0`).
             * @returns The numeric representation of the value, or `impossibleValue` if conversion fails.
             *
             * @example
             * getToNumber("123"); // 123
             * getToNumber("12.34"); // 12.34
             * getToNumber("abc", -1); // -1 (fallback value)
             * getToNumber(null, 100); // 100 (fallback value)
             */
            getToNumber(value: any, impossibleValue: number = 0): number {
                return hison.utils.getToFloat(value, impossibleValue);
            },
            /**
             * Converts the given value to a floating-point number.
             *
             * - If the value is numeric, it is converted to a float and returned.
             * - If the value is not a valid number, `impossibleValue` is returned instead.
             *
             * @param value The value to be converted.
             * @param impossibleValue The fallback value if conversion fails (default: `0`).
             * @returns The floating-point representation of the value, or `impossibleValue` if conversion fails.
             *
             * @example
             * getToFloat("123.45"); // 123.45
             * getToFloat(42); // 42
             * getToFloat("abc", -1); // -1 (fallback value)
             * getToFloat(null, 100.5); // 100.5 (fallback value)
             */
            getToFloat(value: any, impossibleValue: number = 0): number {
                if (!hison.utils.isNumeric(value)) {
                    return impossibleValue;
                }
                return parseFloat(value);
            },
            /**
             * Converts the given value to an integer.
             *
             * - If the value is numeric, it is converted to an integer using `Math.trunc()`.
             * - If the value is not a valid number, `impossibleValue` is returned instead.
             *
             * @param value The value to be converted.
             * @param impossibleValue The fallback value if conversion fails (default: `0`).
             * @returns The integer representation of the value, or `impossibleValue` if conversion fails.
             *
             * @example
             * getToInteger("123.45"); // 123
             * getToInteger(42.9); // 42
             * getToInteger("abc", -1); // -1 (fallback value)
             * getToInteger(null, 100); // 100 (fallback value)
             */
            getToInteger(value: any, impossibleValue: number = 0): number {
                if (!hison.utils.isNumeric(value)) {
                    return Math.trunc(impossibleValue);
                }
                return Math.trunc(parseInt(value, 10));
            },
            /**
             * Converts the given value to a string.
             *
             * - If the value is already a string, it is returned as is.
             * - If the value is a number, boolean, or bigint, it is converted to a string.
             * - If the value is a symbol, its description is returned.
             * - If the value is `null`, `undefined`, or an unsupported type, `impossibleValue` is returned.
             *
             * @param str The value to be converted.
             * @param impossibleValue The fallback value if conversion fails (default: `""`).
             * @returns The string representation of the value, or `impossibleValue` if conversion fails.
             *
             * @example
             * getToString(123); // "123"
             * getToString(true); // "true"
             * getToString(Symbol("test")); // "test"
             * getToString(null, "N/A"); // "N/A" (fallback value)
             */
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
            /**
             * Returns a default value if the given value is `null` or `undefined`.
             *
             * - If `val` is `null` or `undefined`, `defaultValue` is returned.
             * - Otherwise, `val` is returned as is.
             *
             * @param val The value to check.
             * @param defaultValue The default value to return if `val` is `null` or `undefined`.
             * @returns The original value if not `null` or `undefined`, otherwise the `defaultValue`.
             *
             * @example
             * nvl(null, "default"); // "default"
             * nvl(undefined, 100); // 100
             * nvl("Hello", "default"); // "Hello"
             * nvl(0, "fallback"); // 0 (not null or undefined, so returned as is)
             */
            nvl(val: any, defaultValue: any): any {
                return (val === null || val === undefined) ? defaultValue : val;
            },
            /**
             * Extracts the file extension from a given filename or file path.
             *
             * - Converts the input to a string if it is not already.
             * - Splits the string by `.` and returns the last segment as the file extension.
             * - If no extension is found, an empty string is returned.
             *
             * @param str The filename or file path.
             * @returns The file extension as a string, or an empty string if no extension exists.
             *
             * @example
             * getFileExtension("document.txt"); // "txt"
             * getFileExtension("archive.tar.gz"); // "gz"
             * getFileExtension("/path/to/file"); // "" (no extension)
             */
            getFileExtension(str: string): string {
                str = hison.utils.getToString(str);
            
                const extension = str.split('.').pop();
                if (extension === str) {
                    return '';
                }
                return extension ? extension : '';
            },
            /**
             * Extracts the filename (without extension) from a given file path or filename.
             *
             * - Converts the input to a string if it is not already.
             * - Extracts the last part of the path after the last `/` (or full filename if no path exists).
             * - Removes the file extension by cutting the string at the last `.` if present.
             *
             * @param str The full file path or filename.
             * @returns The filename without the extension.
             *
             * @example
             * getFileName("/path/to/document.txt"); // "document"
             * getFileName("archive.tar.gz"); // "archive.tar"
             * getFileName("file_without_extension"); // "file_without_extension"
             */
            getFileName(str: string): string {
                str = hison.utils.getToString(str);
            
                const fileName = str.split('/').pop();
                if(!fileName) return '';
                const lastDotIndex = fileName.lastIndexOf('.');
            
                if (lastDotIndex === -1) return fileName;
                return fileName.substring(0, lastDotIndex);
            },
            /**
             * Decodes a Base64-encoded string into a human-readable format.
             *
             * - Converts the input to a string if it is not already.
             * - Uses `atob()` to decode the Base64 string.
             * - Decodes percent-encoded UTF-8 characters to properly restore special characters.
             *
             * @param str The Base64-encoded string.
             * @returns The decoded string.
             *
             * @example
             * getDecodeBase64("SGVsbG8gd29ybGQh"); // "Hello world!"
             * getDecodeBase64("44GT44KT44Gr44Gh44Gv"); // "こんにちは" (Japanese "Hello")
             */
            getDecodeBase64(str: string): string {
                str = hison.utils.getToString(str);
                return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            },
            /**
             * Encodes a string into Base64 format.
             *
             * - Converts the input to a string if it is not already.
             * - Uses `encodeURIComponent()` to properly handle special characters.
             * - Encodes the string to Base64 using `btoa()`.
             *
             * @param str The input string to be encoded.
             * @returns The Base64-encoded string.
             *
             * @example
             * getEncodeBase64("Hello world!"); // "SGVsbG8gd29ybGQh"
             * getEncodeBase64("こんにちは"); // "44GT44KT44Gr44Gh44Gv" (Japanese "Hello")
             */
            getEncodeBase64(str: string): string {
                str = hison.utils.getToString(str);
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(_, p1:string) {
                    return String.fromCharCode(parseInt(p1, 16));
                }));
            },
            /**
             * Creates a deep copy of an object or array, preserving nested structures.
             *
             * - Handles `Object` and `Array` types recursively.
             * - Supports cloning custom objects implementing `getIsDataWrapper()` or `getIsDataModel()`.
             * - Prevents infinite loops by tracking previously copied references.
             * - If the object is `null` or not an object, it is returned as is.
             *
             * @param object The object or array to be deep copied.
             * @param visited An optional array to track visited references and prevent circular references.
             * @returns A deep copy of the input object or array.
             *
             * @example
             * const obj = { a: 1, b: { c: 2 } };
             * const copy = deepCopyObject(obj);
             * copy.b.c = 3;
             * console.log(obj.b.c); // 2 (original object remains unchanged)
             *
             * const arr = [1, [2, 3]];
             * const arrCopy = deepCopyObject(arr);
             * arrCopy[1][0] = 99;
             * console.log(arr[1][0]); // 2 (original array remains unchanged)
             */
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
            /**
             * Executes security mechanisms for the given `Hison` object to enforce access restrictions and prevent unauthorized modifications.
             *
             * This function applies multiple layers of security, including:
             * - **Object Freezing**: Prevents modification of the `Hison` object.
             * - **Access Control by URL and IP**: Restricts access based on predefined security settings.
             * - **Developer Tool Restrictions**: Prevents unauthorized debugging or tampering.
             * - **Back Navigation Prevention**: Blocks browser back navigation if enabled.
             *
             * @param hison The main `Hison` object to be processed and optionally frozen for immutability.
             *
             * @throws Error If `hison` is not provided or is not a valid `Hison` instance.
             *
             * @remarks
             * This function is designed to enhance security by enforcing strict runtime protections.
             * It utilizes configuration settings from `customOption.shield` to determine the applied security policies.
             *
             * ---
             * ## Security Features & Execution Flow
             *
             * ### 1. **Validation of `hison` Parameter**
             * - If `hison` is not provided, an error is thrown:  
             *   `"Invalid arguments. Provide an object or a key-value pair."`
             * - Ensures that the input is a valid `Hison` instance before executing security functions.
             *
             * ### 2. **Object Freezing (`isFreeze`)**
             * - If `customOption.shield.isFreeze` is `true`, the `Hison` object is **deeply frozen**.
             * - Uses the `deepFreeze()` function to recursively apply `Object.freeze()`, preventing any modifications.
             *
             * ### 3. **Access Control by URL (`shieldURL`)**
             * - If `customOption.shield.shieldURL` is set:
             *   - Ensures the current URL matches `shieldURL`. 
             *   - If the URL does not match, execution stops immediately.
             *
             * ### 4. **IP-Based Access Control (`exposeIpList`)**
             * - If the request is **not from `localhost`**, it performs IP verification:
             *   - Fetches the user's IP from `/ajax/getIp`.
             *   - Compares the retrieved IP against `customOption.shield.exposeIpList`.
             *   - If the IP is **not** in the list, additional restrictions are applied:
             *     - **Back Navigation is Blocked** if `isPossibleGoBack` is `false`.
             *     - **Developer Tools are Restricted** if `isPossibleOpenDevTool` is `false`.
             *
             * ### 5. **Back Navigation Prevention (`isPossibleGoBack`)**
             * - If `customOption.shield.isPossibleGoBack` is `false`:
             *   - Overrides the browser's back button functionality using `history.pushState()`.
             *   - Registers an event listener to **prevent back navigation**.
             *
             * ### 6. **Developer Tool Restrictions (`isPossibleOpenDevTool`)**
             * - If `customOption.shield.isPossibleOpenDevTool` is `false`:
             *   - Blocks `F12` keypress to prevent opening developer tools.
             *   - Uses `debugger` trick and event listeners (`resize`, `mousemove`, `focus`, `blur`) to detect dev tools.
             *   - Displays a warning message and prevents further execution if dev tools are detected.
             *
             * ---
             * ## Related Methods
             * - `hison.setShieldURL(url: string)`
             * - `hison.setExposeIpList(ipList: string[])`
             * - `hison.setIsFreeze(state: boolean)`
             * - `hison.setIsPossibleGoBack(state: boolean)`
             * - `hison.setIsPossibleOpenDevTool(state: boolean)`
             *
             * @example
             * // Execute security features for the Hison instance
             * shield.excute(hison);
             */
            excute(hison: Hison) {
                if (!hison) throw new Error("Invalid argument: 'hison' is required.");
                if (!hison.shield.isHison) throw new Error("Invalid argument: 'hison' must be an instance of Hison.");

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

                if (customOption.shield.isFreeze) {
                    deepFreeze(hison);
                }
                
                if (location.href.indexOf('localhost') < 0){
                    if (customOption.shield.shieldURL && location.href.indexOf(customOption.shield.shieldURL) < 0 ){
                        return;
                    }
    
                    shieldFuncGetIp(function(response: any) {
                        const ip = response && response.ip ? response.ip : '';
                        if (ip && customOption.shield.exposeIpList.indexOf(ip) >= 0) {
                            return;
                        }
    
                        if (!customOption.shield.isPossibleGoBack) {
                            history.pushState(null, document.title, location.href);
                            window.addEventListener('popstate', function() {
                                history.pushState(null, document.title, location.href);
                            });
                        }
                        
                        if (!customOption.shield.isPossibleOpenDevTool) {
                            shieldFuncCreateBlockDevMode();
                            return;
                        }
                    });
                }
            }
        };
        data = {
            /**
             * The `DataWrapper` class provides a flexible key-value storage container
             * within the `hisondev` solution. It allows storing various data types,
             * including string value and `DataModel` instances.
             *
             * ## Core Features:
             * - **Key-Value Storage:**
             *   - Supports dynamic insertion and retrieval of key-value pairs.
             *   - Ensures that keys are always strings.
             * - **Integration with `DataModel`:**
             *   - Allows storing `DataModel` instances under specific keys.
             *   - Provides methods to retrieve `DataModel` instances safely.
             * - **Serialization & Cloning:**
             *   - Supports deep cloning of stored data.
             *   - Provides JSON serialization for structured data handling.
             * - **Validation & Type Safety:**
             *   - Ensures type safety for values stored in `DataWrapper`.
             *   - Throws errors when attempting to insert invalid types.
             *
             * ## Data Integrity & Deep Copying:
             * - Uses `hison.utils.deepCopyObject()` to ensure stored objects are immutable.
             * - Prevents unintended modifications by returning cloned values.
             *
             * ## Example Usage:
             * ```typescript
             * // Creating a DataWrapper with key-value pairs
             * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
             * console.log(dataWrapper.getString("name")); // Output: "Alice"
             *
             * // Storing a DataModel instance
             * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
             * dataWrapper.putDataModel("users", dataModel);
             * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
             *
             * // Serializing the DataWrapper to JSON
             * console.log(dataWrapper.getSerialized());
             * ```
             */
            DataWrapper : class implements InterfaceDataWrapper {
                /**
                 * Creates an instance of `DataWrapper`, which serves as a key-value storage container.
                 * It allows storing various data types, including primitive values and `DataModel` instances.
                 *
                 * ## Parameters
                 * - `keyOrObject` **(Object | string, optional)**: This parameter can be:
                 *   - An **object** containing multiple key-value pairs, where each key is mapped to a value.
                 *   - A **single string key** when paired with a `value` parameter.
                 * - `value` **(*, optional)**: The value associated with the provided key. This parameter is 
                 *   required only when `keyOrObject` is a string.
                 *
                 * ## Behavior
                 * - If an **object** is provided, all key-value pairs from the object are stored in the `DataWrapper`.
                 * - If a **string and value** are provided, a single key-value pair is stored.
                 * - If neither of these conditions are met, an error is thrown.
                 *
                 * ## Example Usage
                 * ```typescript
                 * // Creating a DataWrapper with an object
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * console.log(dataWrapper.getString("name")); // Output: "Alice"
                 *
                 * // Creating a DataWrapper with a single key-value pair
                 * const dataWrapper = new hison.data.DataWrapper("status", "active");
                 * console.log(dataWrapper.getString("status")); // Output: "active"
                 * ```
                 *
                 * @constructor
                 */
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
                private _data: Record<string, InterfaceDataModel | string | null>;
                private _isDataWrapper = true;
                private _put = (key: string, value: any) => {
                    if (typeof key !== 'string') {
                        throw new Error('Keys must always be strings.');
                    } else if (typeof value === 'string') {
                        this._data[key] = value;
                    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
                        this._data[key] = String(value);
                    } else if (typeof value === 'symbol') {
                        this._data[key] = value.description ? value.description : null;
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
                /**
                 * Checks whether the current instance is a `DataWrapper`.
                 * This method is primarily used for type verification.
                 *
                 * ## Returns
                 * - **`boolean`**: Returns `true` if the instance is a `DataWrapper`, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ key: "value" });
                 * console.log(dataWrapper.getIsDataWrapper()); // Output: true
                 * ```
                 *
                 * @returns {boolean} `true` if the instance is a `DataWrapper`, otherwise `false`.
                 */
                getIsDataWrapper = (): boolean => {
                    return this._isDataWrapper;
                };
                /**
                 * Creates and returns a deep copy of the current `DataWrapper` instance.
                 * This method ensures that all stored key-value pairs are fully cloned, 
                 * preventing unintended modifications between the original and copied instances.
                 *
                 * ## Implementation Details
                 * - Uses `hison.utils.deepCopyObject()` to recursively copy nested objects and arrays.
                 * - Supports cloning `DataModel` instances stored within the `DataWrapper`.
                 * - Prevents circular references by tracking previously copied objects.
                 * - Ensures that modifications in the cloned instance do not affect the original instance.
                 *
                 * ## Returns
                 * - **`DataWrapper`**: A new `DataWrapper` instance containing a deep copy of the original data.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * const clonedWrapper = dataWrapper.clone();
                 * 
                 * console.log(clonedWrapper.getString("name")); // Output: "Alice"
                 * console.log(clonedWrapper !== dataWrapper);   // Output: true (Cloned instance is independent)
                 *
                 * // Deep copy verification
                 * const originalNested = new hison.data.DataModel([{ id: 1, value: "Test" }]);
                 * const dataWrapperWithModel = new hison.data.DataWrapper({ nested: originalNested });
                 * const clonedWrapperWithModel = dataWrapperWithModel.clone();
                 * 
                 * console.log(clonedWrapperWithModel.getDataModel("nested") !== originalNested); // Output: true
                 * ```
                 *
                 * @returns {InterfaceDataWrapper} A new `DataWrapper` instance with a deep copy of the stored data.
                 */
                clone = (): InterfaceDataWrapper | null => {
                    const newData: Record<string, any> = {};
                    for (let key in this._data) {
                        newData[key] = hison.utils.deepCopyObject(this._data[key]);
                    }
                    return new hison.data.DataWrapper(newData);
                };
                /**
                 * Removes all stored key-value pairs in the `DataWrapper`, resetting it to an empty state.
                 * 
                 * ## Behavior
                 * - Clears the internal storage by setting `_data` to an empty object.
                 * - Returns the same `DataWrapper` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataWrapper`**: The current instance after clearing all stored data.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ key1: "value1", key2: "value2" });
                 * console.log(dataWrapper.size()); // Output: 2
                 * 
                 * dataWrapper.clear();
                 * console.log(dataWrapper.size()); // Output: 0
                 * ```
                 *
                 * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after clearing all data.
                 */
                clear = (): InterfaceDataWrapper => {
                    this._data = {};
                    return this;
                };
                /**
                 * Serializes the `DataWrapper` into a JSON string representation.
                 * Converts stored `DataModel` instances into their row data format for proper serialization.
                 *
                 * ## Behavior
                 * - Iterates through all key-value pairs in the `DataWrapper`.
                 * - If a value is a `DataModel`, it is converted to an array of rows using `getRows()`.
                 * - Other values are stored as-is.
                 * - The final object is serialized into a JSON string.
                 *
                 * ## Returns
                 * - **`string`**: A JSON string representation of the `DataWrapper` contents.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * const dataWrapper = new hison.data.DataWrapper({ users: dataModel, status: "active" });
                 * 
                 * console.log(dataWrapper.getSerialized());
                 * // Output: '{"users":[{"id":1,"name":"Alice"}],"status":"active"}'
                 * ```
                 *
                 * @returns {string} JSON string representation of the stored data.
                 */
                getSerialized = (): string => {
                    const data: Record<string, any> = {};
                    
                    for (let key in this._data) {
                        if (this._data.hasOwnProperty(key)) {
                            if (this._data[key] && (this._data[key] as InterfaceDataModel).getIsDataModel && (this._data[key] as InterfaceDataModel).getIsDataModel()) {
                                data[key] = (this._data[key] as InterfaceDataModel).getRows();
                            } else {
                                data[key] = this._data[key];
                            }
                        }
                    }
                    return JSON.stringify(data);
                };
                /**
                 * Retrieves the value associated with the specified key from the `DataWrapper`.
                 * If the value exists, a deep copy is returned to prevent unintended modifications.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key associated with the value to retrieve.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - If the key exists, returns a deep copy of the stored value.
                 * - If the key does not exist, returns `null`.
                 *
                 * ## Returns
                 * - **`DataModel | string | null`**: A deep copy of the stored value, or `null` if the key is not found.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ message: "Hello", users: new hison.data.DataModel([{ id: 1 }]) });
                 * 
                 * console.log(dataWrapper.get("message")); // Output: "Hello"
                 * console.log(dataWrapper.get("users"));   // Output: Deep copy of the DataModel instance
                 * console.log(dataWrapper.get("nonExistentKey")); // Output: null
                 * ```
                 *
                 * @param {string} key The key to retrieve the associated value.
                 * @returns {DataModel | string | null} A deep copy of the stored value, or `null` if the key is not found.
                 */
                get = (key: string): InterfaceDataModel | string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    return this._data[key] ? hison.utils.deepCopyObject(this._data[key]) : null;
                };
                /**
                 * Retrieves the string value associated with the specified key from the `DataWrapper`.
                 * Ensures that the retrieved value is explicitly a string before returning it.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key associated with the string value to retrieve.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - Throws an error if the value associated with `key` is not a string.
                 * - Returns the string value if it exists; otherwise, returns `null`.
                 *
                 * ## Returns
                 * - **`string | null`**: The associated string value, or `null` if the key is not found.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ status: "active", count: 5 });
                 * 
                 * console.log(dataWrapper.getString("status")); // Output: "active"
                 * console.log(dataWrapper.getString("nonExistentKey")); // Output: null
                 *
                 * // Throws an error: "The data does not contain the specified string value."
                 * console.log(dataWrapper.getString("count"));
                 * ```
                 *
                 * @param {string} key The key associated with the string value.
                 * @returns {string | null} The associated string value, or `null` if not found.
                 * @throws {Error} If the key is not a string or if the stored value is not a string.
                 */
                getString = (key: string): string | null => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (typeof this._data[key] !== 'string') throw new Error('The data does not contain the specified string value.');
                    return this._data[key] ? this._data[key] as string : null;
                };
                /**
                 * Retrieves the `DataModel` instance associated with the specified key from the `DataWrapper`.
                 * Ensures that the retrieved value is a valid `DataModel` before returning a cloned copy.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key associated with the `DataModel` instance to retrieve.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - Throws an error if the value associated with `key` is not a valid `DataModel` instance.
                 * - Returns a deep-cloned copy of the `DataModel` to maintain data integrity.
                 *
                 * ## Returns
                 * - **`DataModel`**: A cloned `DataModel` instance retrieved from the `DataWrapper`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * const dataWrapper = new hison.data.DataWrapper({ users: dataModel });
                 * 
                 * const clonedDataModel = dataWrapper.getDataModel("users");
                 * console.log(clonedDataModel.getRowCount()); // Output: 1
                 *
                 * // Throws an error: "The data does not contain the specified data-model value."
                 * console.log(dataWrapper.getDataModel("nonExistentKey"));
                 * ```
                 *
                 * @param {string} key The key associated with the `DataModel` instance.
                 * @returns {InterfaceDataModel} A cloned `DataModel` instance retrieved from the `DataWrapper`.
                 * @throws {Error} If the key is not a string or if the stored value is not a valid `DataModel`.
                 */
                getDataModel = (key: string): InterfaceDataModel => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (!this._data[key] || !(this._data[key] as InterfaceDataModel).getIsDataModel || !(this._data[key] as InterfaceDataModel).getIsDataModel()) throw new Error('The data does not contain the specified data-model value.');
                    return (this._data[key] as InterfaceDataModel).clone();
                };
                /**
                 * Inserts or updates a key-value pair in the `DataWrapper`.
                 * Allows storing primitive values, strings, and `DataModel` instances.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key under which the value will be stored.
                 * - `value` **(any)**: The value to be stored. Can be a string, number, boolean, `DataModel`, or other valid types.
                 *
                 * ## Behavior
                 * - Calls the internal `_put()` method to validate and store the value.
                 * - If the key already exists, its value is updated.
                 * - Returns the current `DataWrapper` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataWrapper`**: The current instance after inserting/updating the value.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper();
                 * 
                 * // Storing a string value
                 * dataWrapper.put("status", "active");
                 * console.log(dataWrapper.getString("status")); // Output: "active"
                 * 
                 * // Storing a DataModel instance
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * dataWrapper.put("users", dataModel);
                 * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
                 * ```
                 *
                 * @param {string} key The key under which the value is stored.
                 * @param {any} value The value to store.
                 * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
                 */
                put = (key: string, value: any): InterfaceDataWrapper => {
                    this._put(key, value);
                    return this;
                };
                /**
                 * Inserts or updates a key-value pair in the `DataWrapper`, ensuring that the value is a string-convertible type.
                 * Only accepts primitive types (`string`, `number`, `boolean`, `bigint`, `symbol`) or `null`.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key under which the value will be stored.
                 * - `value` **(string | number | boolean | bigint | symbol | null)**: The value to be stored, 
                 *   restricted to types that can be converted to a string.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - Throws an error if `value` is not of a valid type.
                 * - Calls the internal `_put()` method to store the value.
                 * - Returns the current `DataWrapper` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataWrapper`**: The current instance after inserting/updating the value.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper();
                 * 
                 * // Storing a string value
                 * dataWrapper.putString("status", "active");
                 * console.log(dataWrapper.getString("status")); // Output: "active"
                 *
                 * // Storing a number (converted to string internally)
                 * dataWrapper.putString("count", 10);
                 * console.log(dataWrapper.getString("count")); // Output: "10"
                 *
                 * // Throws an error: "Please insert only values convertible to string type."
                 * dataWrapper.putString("invalid", { key: "value" });
                 * ```
                 *
                 * @param {string} key The key under which the value is stored.
                 * @param {string | number | boolean | bigint | symbol | null} value The value to store.
                 * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
                 * @throws {Error} If `key` is not a string or `value` is not a valid type.
                 */
                putString = (key: string, value: string | number | boolean | bigint | symbol | null): InterfaceDataWrapper => {
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
                /**
                 * Inserts or updates a `DataModel` instance in the `DataWrapper`.
                 * Ensures that the stored value is a valid `DataModel`.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key under which the `DataModel` will be stored.
                 * - `value` **(`DataModel`)**: The `DataModel` instance to be stored.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - Throws an error if `value` is not a valid `DataModel` instance.
                 * - Calls the internal `_put()` method to store the `DataModel`.
                 * - Returns the current `DataWrapper` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataWrapper`**: The current instance after inserting/updating the `DataModel`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper();
                 * 
                 * // Creating and storing a DataModel
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * dataWrapper.putDataModel("users", dataModel);
                 * 
                 * console.log(dataWrapper.getDataModel("users").getRowCount()); // Output: 1
                 *
                 * // Throws an error: "Please insert only values of data-model type."
                 * dataWrapper.putDataModel("invalid", "not a DataModel");
                 * ```
                 *
                 * @param {string} key The key under which the `DataModel` is stored.
                 * @param {InterfaceDataModel} value The `DataModel` instance to store.
                 * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
                 * @throws {Error} If `key` is not a string or `value` is not a valid `DataModel`.
                 */
                putDataModel = (key: string, value: InterfaceDataModel): InterfaceDataWrapper => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    if (value === null || !value.getIsDataModel || !value.getIsDataModel()) {
                        throw new Error('Please insert only values of data-model type.');
                    }
                    this._put(key, value);
                    return this;
                };
                /**
                 * Converts the `DataWrapper` instance into a standard JavaScript object.
                 * If the stored values include `DataModel` instances, they are converted into object representations.
                 *
                 * ## Behavior
                 * - Iterates through all key-value pairs in the `DataWrapper`.
                 * - If a value is a `DataModel`, it is converted using `getObject()`.
                 * - Other values are returned as-is.
                 * - Returns a plain JavaScript object representation of the `DataWrapper`.
                 *
                 * ## Returns
                 * - **`Record<string, any>`**: A plain object containing all stored key-value pairs.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * const dataWrapper = new hison.data.DataWrapper({ users: dataModel, status: "active" });
                 * 
                 * console.log(dataWrapper.getObject());
                 * // Output: { users: { cols: ["id", "name"], rows: [{ id: 1, name: "Alice" }] }, status: "active" }
                 * ```
                 *
                 * @returns {Record<string, any>} A plain object representation of the `DataWrapper` instance.
                 */
                getObject = (): Record<string, any> => {
                    const result: Record<string, any> = {};
                    for(let key in this._data) {
                        if (this._data[key] && (this._data[key] as InterfaceDataModel).getIsDataModel && (this._data[key] as InterfaceDataModel).getIsDataModel()) {
                            result[key] = (this._data[key] as InterfaceDataModel).getObject();
                        } else {
                            result[key] = this._data[key];
                        }
                    }
                    return result;
                };
                /**
                 * Checks whether the `DataWrapper` contains a specified key.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key to check for existence in the `DataWrapper`.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - Uses `hasOwnProperty()` to determine if the key exists in the stored data.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if the key exists, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * 
                 * console.log(dataWrapper.containsKey("name")); // Output: true
                 * console.log(dataWrapper.containsKey("nonExistentKey")); // Output: false
                 * ```
                 *
                 * @param {string} key The key to check for existence.
                 * @returns {boolean} `true` if the key exists, otherwise `false`.
                 * @throws {Error} If `key` is not a string.
                 */
                containsKey = (key: string): boolean => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    return this._data.hasOwnProperty(key);
                };
                /**
                 * Checks whether the `DataWrapper` is empty (i.e., contains no key-value pairs).
                 *
                 * ## Behavior
                 * - Determines emptiness by checking if the number of stored keys is `0`.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if the `DataWrapper` contains no data, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper();
                 * console.log(dataWrapper.isEmpty()); // Output: true
                 * 
                 * dataWrapper.put("status", "active");
                 * console.log(dataWrapper.isEmpty()); // Output: false
                 * ```
                 *
                 * @returns {boolean} `true` if the `DataWrapper` contains no data, otherwise `false`.
                 */
                isEmpty = (): boolean => {
                    return Object.keys(this._data).length === 0;
                };
                /**
                 * Removes a key-value pair from the `DataWrapper` if the key exists.
                 *
                 * ## Parameters
                 * - `key` **(string)**: The key to be removed from the `DataWrapper`.
                 *
                 * ## Behavior
                 * - Throws an error if `key` is not a string.
                 * - Checks if the key exists using `hasOwnProperty()`.
                 * - If the key exists, it is deleted from the internal data storage.
                 * - Returns an object containing the updated `DataWrapper` and a boolean indicating success.
                 *
                 * ## Returns
                 * - **`{ data: DataWrapper, result: boolean }`**:
                 *   - `data`: The current `DataWrapper` instance after attempting removal.
                 *   - `result`: `true` if the key was successfully removed, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * 
                 * console.log(dataWrapper.containsKey("name")); // Output: true
                 * 
                 * const { data: updatedWrapper, result } = dataWrapper.remove("name");
                 * console.log(result); // Output: true
                 * console.log(updatedWrapper.containsKey("name")); // Output: false
                 *
                 * const { result: nonExistentResult } = dataWrapper.remove("nonExistentKey");
                 * console.log(nonExistentResult); // Output: false
                 * ```
                 *
                 * @param {string} key The key to remove from the `DataWrapper`.
                 * @returns {{ data: InterfaceDataWrapper, result: boolean }} An object containing the updated `DataWrapper` and a success flag.
                 * @throws {Error} If `key` is not a string.
                 */
                remove = (key: string): { data: InterfaceDataWrapper, result: boolean } => {
                    if (typeof key !== 'string') throw new Error('Keys must always be strings.');
                    let result = false;
                    if (this._data.hasOwnProperty(key)) {
                        result = true;
                        delete this._data[key];
                    }
                    return { data: this, result };
                };
                /**
                 * Returns the number of key-value pairs stored in the `DataWrapper`.
                 *
                 * ## Behavior
                 * - Counts the number of keys present in the internal data storage.
                 *
                 * ## Returns
                 * - **`number`**: The total number of stored key-value pairs.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * console.log(dataWrapper.size()); // Output: 2
                 * 
                 * dataWrapper.put("status", "active");
                 * console.log(dataWrapper.size()); // Output: 3
                 * ```
                 *
                 * @returns {number} The number of stored key-value pairs in the `DataWrapper`.
                 */
                size = (): number => {
                    return Object.keys(this._data).length;
                };
                /**
                 * Retrieves an array of all keys stored in the `DataWrapper`.
                 *
                 * ## Behavior
                 * - Returns a list of all keys currently stored in the `DataWrapper`.
                 * - If the `DataWrapper` is empty, returns an empty array.
                 *
                 * ## Returns
                 * - **`string[]`**: An array containing all stored keys.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * console.log(dataWrapper.keys()); // Output: ["name", "age"]
                 * 
                 * dataWrapper.clear();
                 * console.log(dataWrapper.keys()); // Output: []
                 * ```
                 *
                 * @returns {string[]} An array of keys stored in the `DataWrapper`.
                 */
                keys = (): string[] => {
                    return Object.keys(this._data);
                };
                /**
                 * Retrieves an array of all values stored in the `DataWrapper`.
                 * Ensures that stored values are returned as deep copies to prevent unintended modifications.
                 *
                 * ## Behavior
                 * - Iterates through all key-value pairs in the `DataWrapper`.
                 * - Uses `hison.utils.deepCopyObject()` to return deep copies of stored values.
                 * - If the `DataWrapper` is empty, returns an empty array.
                 *
                 * ## Returns
                 * - **`any[]`**: An array containing deep copies of all stored values.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
                 * console.log(dataWrapper.values()); // Output: ["Alice", 25]
                 * 
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * dataWrapper.put("users", dataModel);
                 * console.log(dataWrapper.values()); // Output: ["Alice", 25, <cloned DataModel>]
                 * ```
                 *
                 * @returns {any[]} An array of deep-copied values stored in the `DataWrapper`.
                 */
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
            /**
             * The `DataModel` class provides a structured way to manage tabular data within the `hisondev` solution.
             * It is designed to store, manipulate, and retrieve data efficiently while ensuring type consistency
             * and validation. 
             * 
             * ## Core Features:
             * - **Column and Row Management:**
             *   - Supports dynamic addition and removal of columns and rows.
             *   - Ensures column consistency when inserting data.
             * - **Validation and Formatting:**
             *   - Allows setting a `DataModelValidator` to check column values.
             *   - Supports `DataModelFormatter` to format column values uniformly.
             * - **Filtering and Searching:**
             *   - Provides methods to filter rows based on conditions (`filterRows()`, `searchRows()`).
             *   - Allows searching rows and modifying data accordingly (`searchAndModify()`).
             * - **Sorting and Structuring:**
             *   - Supports ascending, descending, and reverse sorting on both columns and rows.
             * - **Serialization and Cloning:**
             *   - Enables deep copying of the entire `DataModel`.
             *   - Provides `getSerialized()` to retrieve a JSON string of the model.
             * - **Integration with `DataWrapper`**
             *   - DataWrapper is an instance for storing DataModel.
             *
             * ## Data Consistency and Validation:
             * - Uses `_deepCopy()` to ensure stored objects are immutable.
             * - Prevents invalid data types using `_getValidRowValue()`.
             * - Ensures uniform column data types to maintain consistency.
             *
             * ## Example Usage:
             * ```typescript
             * const dataModel = new hison.data.DataModel([
             *     { id: 1, name: "Alice", age: 25 },
             *     { id: 2, name: "Bob", age: 30 }
             * ]);
             * 
             * // Add a new column
             * dataModel.addColumn("gender");
             * 
             * // Set a default value for a column
             * dataModel.setColumnSameValue("gender", "Unknown");
             * 
             * // Apply a formatting function to the age column
             * dataModel.setColumnSameFormat("age", (value) => `${value} years old`);
             * 
             * // Get filtered rows where age is greater than 25
             * const filtered = dataModel.filterRows(row => row.age > 25);
             * console.log(filtered);
             * ```
             *
             * ## Related Functions:
             * - `hison.setConvertValue()`: Sets the conversion logic for special values before insertion.
             *
             */
            DataModel : class implements InterfaceDataModel {
                /**
                 * Creates a `DataModel` instance, which manages a structured table-like data format.
                 * The instance allows for efficient row and column management.
                 *
                 * ## Parameters
                 * - `data` **(Array | Object, optional)**: The initial dataset, which can be:
                 *   - An **array of objects**, where each object represents a row and its keys represent columns.
                 *   - An **array of strings**, which initializes column names.
                 *   - A **single object**, representing a single-row initialization.
                 *
                 * ## Behavior
                 * - If no data is provided, an empty `DataModel` is created.
                 * - Calls `_put(data)`, which processes the input and initializes `_cols` and `_rows` accordingly.
                 *
                 * ## Returns
                 * - **`DataModel`**: A new instance containing structured tabular data.
                 *
                 * ## Example Usage
                 * ```typescript
                 * // Creating a DataModel with an array of objects (rows)
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 *
                 * console.log(dataModel.getRowCount()); // Output: 2
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Creating a DataModel with column names only
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Creating a DataModel with a single object (one row)
                 * const dataModel = new hison.data.DataModel({ id: 1, name: "Alice" });
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * ```
                 *
                 * @constructor
                 * @param {Array | Object} [data] The initial dataset, which can be an array of objects, an array of column names, or a single object.
                 * @returns {InterfaceDataModel} A new instance of `DataModel`.
                 */
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
                        const convertValue = customOption.data.convertValue(object);
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
                    const tempRow: Record<string, any> = {};
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
                        if (data && (data as InterfaceDataWrapper).getIsDataWrapper && (data as InterfaceDataWrapper).getIsDataWrapper()) {
                            throw new Error('You cannot construct a datamodel with datawrapper.');
                        } else if (data && (data as InterfaceDataModel).getIsDataModel && (data as InterfaceDataModel).getIsDataModel()){
                            for(const row of (data as InterfaceDataModel).getRows() ) {
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
                    const checkedValues: string[] = [];
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
                /**
                 * Checks whether the current instance is a `DataModel`.
                 * This method is primarily used for type verification.
                 *
                 * ## Returns
                 * - **`boolean`**: Returns `true` if the instance is a `DataModel`, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getIsDataModel()); // Output: true
                 * ```
                 *
                 * @returns {boolean} `true` if the instance is a `DataModel`, otherwise `false`.
                 */
                getIsDataModel = (): boolean => {
                    return this._isDataModel;
                };
                /**
                 * Creates and returns a deep copy of the current `DataModel` instance.
                 * The cloned instance contains independent copies of all stored rows, 
                 * ensuring that modifications in the cloned instance do not affect the original instance.
                 *
                 * ## Behavior
                 * - Uses the internal `_rows` data to initialize a new `DataModel` instance.
                 * - Ensures that all row data is duplicated to maintain data integrity.
                 *
                 * ## Returns
                 * - **`DataModel`**: A new `DataModel` instance containing a copy of the original rows.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * const clonedModel = dataModel.clone();
                 * 
                 * console.log(clonedModel.getRowCount()); // Output: 1
                 * console.log(clonedModel !== dataModel); // Output: true (Cloned instance is independent)
                 * ```
                 *
                 * @returns {InterfaceDataModel} A new `DataModel` instance with a copy of the stored rows.
                 */
                clone = (): InterfaceDataModel => {
                    return new hison.data.DataModel(this._rows);
                };
                /**
                 * Removes all stored rows and columns from the `DataModel`, resetting it to an empty state.
                 * 
                 * ## Behavior
                 * - Clears the `_cols` array, removing all column definitions.
                 * - Clears the `_rows` array, removing all stored data.
                 * - Returns the same `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after clearing all stored data.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * 
                 * dataModel.clear();
                 * console.log(dataModel.getRowCount()); // Output: 0
                 * console.log(dataModel.getColumns());  // Output: []
                 * ```
                 *
                 * @returns {InterfaceDataModel} The current `DataModel` instance after clearing all data.
                 */
                clear = (): InterfaceDataModel => {
                    this._cols = [];
                    this._rows = [];
                    return this;
                };
                /**
                 * Serializes the `DataModel` instance into a JSON string representation.
                 * Converts the stored row data into a JSON format for easy storage or transmission.
                 *
                 * ## Behavior
                 * - Uses `JSON.stringify()` to serialize the `_rows` array.
                 * - Column definitions (`_cols`) are not included in the serialized output.
                 *
                 * ## Returns
                 * - **`string`**: A JSON string representation of the stored row data.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getSerialized());
                 * // Output: '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]'
                 * ```
                 *
                 * @returns {string} JSON string representation of the stored row data.
                 */
                getSerialized = (): string => {
                    return JSON.stringify(this._rows);
                };
                /**
                 * Checks whether the `DataModel` has defined columns.
                 * This method determines if the `DataModel` has been initialized with at least one column.
                 *
                 * ## Behavior
                 * - Returns `true` if `_cols` contains at least one column.
                 * - Returns `false` if no columns have been defined.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if columns are defined, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * console.log(dataModel.isDeclare()); // Output: true
                 * 
                 * const emptyModel = new hison.data.DataModel();
                 * console.log(emptyModel.isDeclare()); // Output: false
                 * ```
                 *
                 * @returns {boolean} `true` if columns are defined, otherwise `false`.
                 */
                isDeclare = (): boolean => {
                    return this._cols.length > 0;
                };
                /**
                 * Retrieves an array of all column names defined in the `DataModel`.
                 * Returns a deep copy of the `_cols` array to prevent unintended modifications.
                 *
                 * ## Behavior
                 * - Uses `_deepCopy()` to return a copy of `_cols`, ensuring data integrity.
                 * - If no columns are defined, returns an empty array.
                 *
                 * ## Returns
                 * - **`string[]`**: An array of column names.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * 
                 * const emptyModel = new hison.data.DataModel();
                 * console.log(emptyModel.getColumns()); // Output: []
                 * ```
                 *
                 * @returns {string[]} An array containing the column names.
                 */
                getColumns = (): string[] => {
                    return this._deepCopy(this._cols);
                };
                /**
                 * Retrieves an array of all values in the specified column.
                 * Ensures that returned values are deep copies to prevent unintended modifications.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The column name from which to retrieve values.
                 *
                 * ## Behavior
                 * - Throws an error if `column` is not a valid string.
                 * - Throws an error if the specified column does not exist.
                 * - Iterates through all rows and extracts the values of the specified column.
                 * - Uses `_deepCopy()` to return deep copies of the values.
                 *
                 * ## Returns
                 * - **`any[]`**: An array containing all values from the specified column.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getColumnValues("name")); // Output: ["Alice", "Bob"]
                 *
                 * // Throws an error: "The column does not exist."
                 * console.log(dataModel.getColumnValues("age"));
                 * ```
                 *
                 * @param {string} column The column name from which to retrieve values.
                 * @returns {any[]} An array of values from the specified column.
                 * @throws {Error} If the column is invalid or does not exist.
                 */
                getColumnValues = (column: string): any[] => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    const result = [];
                    for(const row of this._rows) {
                        result.push(this._deepCopy(row[column]));
                    }
                    return result;
                };
                /**
                 * Adds a new column to the `DataModel`.
                 * Ensures that all existing rows include the new column with a default value of `null`.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to be added.
                 *
                 * ## Behavior
                 * - Throws an error if `column` is not a valid string.
                 * - Calls `_addCol(column)` to validate and add the column.
                 * - Iterates through `_rows` and ensures each row includes the new column, assigning `null` if missing.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after adding the new column.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * 
                 * dataModel.addColumn("age");
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice", age: null }
                 * ```
                 *
                 * @param {string} column The name of the column to add.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after adding the column.
                 * @throws {Error} If the column is invalid or already exists.
                 */
                addColumn = (column: string): InterfaceDataModel => {
                    this._addCol(column);
                    for(const row of this._rows) {
                        if (!row.hasOwnProperty(column)) {
                            row[column] = null;
                        }
                    }
                    return this;
                };
                /**
                 * Adds multiple new columns to the `DataModel`.
                 * Ensures that all existing rows include the newly added columns with a default value of `null`.
                 *
                 * ## Parameters
                 * - `columns` **(string[])**: An array of column names to be added.
                 *
                 * ## Behavior
                 * - Throws an error if `columns` is not an array.
                 * - Iterates through the provided column names and calls `_addCol(column)` to validate and add each column.
                 * - Ensures that all existing rows include the new columns, assigning `null` if missing.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after adding the new columns.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * 
                 * dataModel.addColumns(["age", "email"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age", "email"]
                 * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice", age: null, email: null }
                 * ```
                 *
                 * @param {string[]} columns An array of column names to add.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after adding the columns.
                 * @throws {Error} If `columns` is not an array or contains invalid column names.
                 */
                addColumns = (columns: string[]): InterfaceDataModel => {
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
                /**
                 * Sets the same value for all rows in the specified column.
                 * If the column does not exist, it is created before assigning values.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to update.
                 * - `value` **(any)**: The value to be assigned to all rows in the specified column.
                 *
                 * ## Behavior
                 * - Throws an error if `value` is `undefined`.
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - If the column does not exist, `_addCol(column)` is called to add it.
                 * - Iterates through all rows and assigns the specified value using `_getValidRowValue()`.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after setting the column values.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
                 * 
                 * // Set the same value for all rows in the "status" column
                 * dataModel.setColumnSameValue("status", "active");
                 * console.log(dataModel.getColumnValues("status")); // Output: ["active", "active"]
                 * 
                 * // If the column does not exist, it is created automatically
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "status"]
                 * ```
                 *
                 * @param {string} column The name of the column to set the value for.
                 * @param {any} value The value to assign to all rows in the column.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after updating the column.
                 * @throws {Error} If `value` is `undefined` or if the column name is invalid.
                 */
                setColumnSameValue = (column: string, value: any): InterfaceDataModel => {
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
                /**
                 * Applies a formatting function to all values in the specified column.
                 * The formatter function transforms each row's value in the column.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to format.
                 * - `formatter` **(`DataModelFormatter`)**: A function that takes a value and returns a formatted version of it.
                 *
                 * ## Behavior
                 * - Throws an error if `formatter` is not a valid function.
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Iterates through all rows and applies the `formatter` function to each value in the column.
                 * - Ensures that the formatted value is valid using `_getValidRowValue()`.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after formatting the column values.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, price: 1000 },
                 *     { id: 2, price: 2000 }
                 * ]);
                 * 
                 * // Format the "price" column by adding a currency symbol
                 * dataModel.setColumnSameFormat("price", value => `$${value}`);
                 * console.log(dataModel.getColumnValues("price")); // Output: ["$1000", "$2000"]
                 * 
                 * // Throws an error if the column does not exist
                 * // dataModel.setColumnSameFormat("discount", value => `${value}%`);
                 * ```
                 *
                 * @param {string} column The name of the column to format.
                 * @param {DataModelFormatter} formatter A function that transforms each value in the column.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after formatting the column.
                 * @throws {Error} If `formatter` is not a function or if the column does not exist.
                 */
                setColumnSameFormat = (column: string, formatter: DataModelFormatter): InterfaceDataModel => {
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
                /**
                 * Retrieves a deep copy of the row at the specified index.
                 * Ensures that modifications to the returned row do not affect the original data.
                 *
                 * ## Parameters
                 * - `rowIndex` **(number)**: The index of the row to retrieve.
                 *
                 * ## Behavior
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Uses `_deepCopy()` to return a copy of the row, preventing unintended modifications.
                 *
                 * ## Returns
                 * - **`Record<string, any>`**: A deep copy of the row data as an object.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getRow(0)); // Output: { id: 1, name: "Alice" }
                 *
                 * // Throws an error if the index is out of bounds
                 * // console.log(dataModel.getRow(10));
                 * ```
                 *
                 * @param {number} rowIndex The index of the row to retrieve.
                 * @returns {Record<string, any>} A deep copy of the row data.
                 * @throws {Error} If `rowIndex` is out of bounds.
                 */
                getRow = (rowIndex: number): Record<string, any> => {
                    return this._deepCopy(this._rows[this._getValidRowIndex(rowIndex)]);
                };
                /**
                 * Retrieves the row at the specified index as a new `DataModel` instance.
                 * Converts the row object into a `DataModel` for further structured operations.
                 *
                 * ## Parameters
                 * - `rowIndex` **(number)**: The index of the row to retrieve.
                 *
                 * ## Behavior
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Initializes a new `DataModel` using the retrieved row data.
                 *
                 * ## Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the specified row.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * const rowDataModel = dataModel.getRowAsDataModel(0);
                 * console.log(rowDataModel.getRowCount()); // Output: 1
                 * console.log(rowDataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Throws an error if the index is out of bounds
                 * // console.log(dataModel.getRowAsDataModel(10));
                 * ```
                 *
                 * @param {number} rowIndex The index of the row to retrieve.
                 * @returns {InterfaceDataModel} A new `DataModel` instance containing the row data.
                 * @throws {Error} If `rowIndex` is out of bounds.
                 */
                getRowAsDataModel = (rowIndex: number): InterfaceDataModel => {
                    return new hison.data.DataModel(this._rows[this._getValidRowIndex(rowIndex)]);
                };
                /**
                 * Adds a new row to the `DataModel` at the specified index or appends it to the end.
                 * If no parameters are provided, an empty row is added.
                 *
                 * ## Parameters
                 * - `rowIndexOrRow` **(number | Object, optional)**: The index at which to insert the row, or the row data to insert.
                 * - `row` **(Object, optional)**: The row data to insert (only required when `rowIndexOrRow` is a number).
                 *
                 * ## Behavior
                 * - If **no parameters** are provided, an empty row is appended.
                 * - If **only a number is provided**, an empty row is inserted at that index.
                 * - If **only an object is provided**, it is inserted as a new row at the end.
                 * - If **both a number and an object are provided**, the row is inserted at the specified index.
                 * - Throws an error if attempting to add a row without first defining columns.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after adding the new row.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * 
                 * // Add an empty row
                 * dataModel.addRow();
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * console.log(dataModel.getRow(0)); // Output: { id: null, name: null }
                 * 
                 * // Add a row with data
                 * dataModel.addRow({ id: 1, name: "Alice" });
                 * console.log(dataModel.getRow(1)); // Output: { id: 1, name: "Alice" }
                 * 
                 * // Insert a row at index 1
                 * dataModel.addRow(1, { id: 2, name: "Bob" });
                 * console.log(dataModel.getRow(1)); // Output: { id: 2, name: "Bob" }
                 * 
                 * // Throws an error: "Please define the column first."
                 * // new hison.data.DataModel().addRow();
                 * ```
                 *
                 * @param {number | Object} [rowIndexOrRow] The index at which to insert the row, or the row data.
                 * @param {Object} [row] The row data to insert (only required if `rowIndexOrRow` is a number).
                 * @returns {InterfaceDataModel} The current `DataModel` instance after adding the row.
                 * @throws {Error} If columns are not defined or parameters are invalid.
                 */
                addRow = (rowIndexOrRow?: number | Record<string, any>, row?: Record<string, any>): InterfaceDataModel => {
                    if (rowIndexOrRow === undefined && row === undefined) {
                        if (this._cols.length <= 0) {
                            throw new Error('Please define the column first.');
                        }
                        const emptyRow: Record<string, any> = {};
                        for (const col of this._cols) {
                            emptyRow[col] = null;
                        }
                        this._rows.push(emptyRow);
                    } else if (typeof rowIndexOrRow === 'number' && row === undefined) {
                        if (this._cols.length <= 0) {
                            throw new Error('Please define the column first.');
                        }
                        const validIndex = rowIndexOrRow >= this._rows.length ? this._rows.length : this._getValidRowIndex(rowIndexOrRow);
                        const emptyRow: Record<string, any> = {};
                        for (const col of this._cols) {
                            emptyRow[col] = null;
                        }
                        this._rows.splice(validIndex, 0, emptyRow);
                    } else if (typeof rowIndexOrRow === 'object' && row === undefined) {
                        this._addRow(this._rows.length, rowIndexOrRow);
                    } else if (typeof rowIndexOrRow === 'number' && typeof row === 'object') {
                        const validIndex = rowIndexOrRow >= this._rows.length ? this._rows.length : this._getValidRowIndex(rowIndexOrRow);
                        this._addRow(validIndex, row);
                        const newRow: Record<string, any> | undefined = this._rows.pop();
                        if(newRow) this._rows.splice(validIndex, 0, newRow);
                    } else {
                        throw new Error('Invalid parameters for addRow method.');
                    }
                    return this;
                };
                /**
                 * Retrieves a deep copy of a range of rows from the `DataModel`.
                 * Ensures that modifications to the returned rows do not affect the original data.
                 *
                 * ## Parameters
                 * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
                 * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
                 *
                 * ## Behavior
                 * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
                 * - If `endRow` is `null`, retrieves rows from `startRow` to the last row.
                 * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
                 *
                 * ## Returns
                 * - **`Record<string, any>[]`**: An array of deep-copied row objects.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.getRows()); 
                 * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * console.log(dataModel.getRows(1, 2)); 
                 * // Output: [{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * // Throws an error if startRow or endRow is out of bounds
                 * // console.log(dataModel.getRows(5));
                 * ```
                 *
                 * @param {number} [startRow=0] The starting index of the row range.
                 * @param {number} [endRow=null] The ending index of the row range (inclusive).
                 * @returns {Record<string, any>[]} An array of deep-copied rows.
                 * @throws {Error} If `startRow` or `endRow` is out of bounds.
                 */
                getRows = (startRow: number = 0, endRow: number | null = null): Record<string, any>[] => {
                    const sRow = this._getValidRowIndex(startRow);
                    if(sRow === 0 && endRow === null) return this._deepCopy(this._rows);
                    const eRow = endRow ? this._getValidRowIndex(endRow) : this._rows.length;
                    const result = [];
                    for(let i = sRow; i <= eRow; i++) {
                        if(!this._rows[i]) break;
                        result.push(this._deepCopy(this._rows[i]));
                    }
                    return result;
                };
                /**
                 * Retrieves a range of rows as a new `DataModel` instance.
                 * Ensures that the returned `DataModel` contains independent copies of the selected rows.
                 *
                 * ## Parameters
                 * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
                 * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
                 *
                 * ## Behavior
                 * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
                 * - If `startRow` is `0` and `endRow` is `null`, returns a clone of the entire `DataModel`.
                 * - Uses `_deepCopy()` to ensure the returned rows are independent.
                 * - Returns a new `DataModel` containing the selected rows.
                 *
                 * ## Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the selected row range.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * const newModel = dataModel.getRowsAsDataModel(1, 2);
                 * console.log(newModel.getRowCount()); // Output: 2
                 * console.log(newModel.getRow(0)); // Output: { id: 2, name: "Bob" }
                 *
                 * // Retrieves all rows as a new DataModel
                 * const clonedModel = dataModel.getRowsAsDataModel();
                 * console.log(clonedModel.getRowCount()); // Output: 3
                 * ```
                 *
                 * @param {number} [startRow=0] The starting index of the row range.
                 * @param {number} [endRow=null] The ending index of the row range (inclusive).
                 * @returns {InterfaceDataModel} A new `DataModel` instance containing the selected rows.
                 * @throws {Error} If `startRow` or `endRow` is out of bounds.
                 */
                getRowsAsDataModel = (startRow: number = 0, endRow: number | null = null): InterfaceDataModel => {
                    const sRow = this._getValidRowIndex(startRow);
                    if(sRow === 0 && endRow === null) return this.clone();
                    const eRow = endRow ? this._getValidRowIndex(endRow) : this._rows.length;
                    const result = [];
                    for(let i = sRow; i <= eRow; i++) {
                        if(!this._rows[i]) break;
                        result.push(this._deepCopy(this._rows[i]));
                    }
                    return new hison.data.DataModel(result);
                };
                /**
                 * Adds multiple rows to the `DataModel`.
                 * Each row is validated and inserted into the existing dataset.
                 *
                 * ## Parameters
                 * - `rows` **(`Record<string, any>[]`)**: An array of row objects to be added.
                 *
                 * ## Behavior
                 * - Calls `_put(rows)` to process and insert the provided rows.
                 * - Ensures that column structures are maintained.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after adding the new rows.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * 
                 * // Add multiple rows
                 * dataModel.addRows([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 2
                 * console.log(dataModel.getRow(1)); // Output: { id: 2, name: "Bob" }
                 * ```
                 *
                 * @param {Record<string, any>[]} rows An array of row objects to add.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after adding the rows.
                 * @throws {Error} If `rows` contain invalid data.
                 */
                addRows = (rows: Record<string, any>[]): InterfaceDataModel => {
                    this._put(rows);
                    return this;
                };
                /**
                 * Converts the `DataModel` instance into a standard JavaScript object.
                 * The returned object includes column definitions, row data, and metadata.
                 *
                 * ## Behavior
                 * - Uses `_deepCopy()` to ensure that returned data is independent of the original `DataModel`.
                 * - Includes the following properties in the returned object:
                 *   - `cols`: An array of column names.
                 *   - `rows`: An array of row objects.
                 *   - `colCount`: The total number of columns.
                 *   - `rowCount`: The total number of rows.
                 *   - `isDeclare`: A boolean indicating whether columns are defined.
                 *
                 * ## Returns
                 * - **`Record<string, any>`**: A plain object representing the `DataModel` structure.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getObject());
                 * // Output:
                 * // {
                 * //   cols: ["id", "name"],
                 * //   rows: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
                 * //   colCount: 2,
                 * //   rowCount: 2,
                 * //   isDeclare: true
                 * // }
                 * ```
                 *
                 * @returns {Record<string, any>} A plain object representing the `DataModel` structure.
                 */
                getObject = (): Record<string, any> => {
                    const result: Record<string, any> = {};
                    const copyCol = this._deepCopy(this._cols);
                    const copyRow = this._deepCopy(this._rows);
        
                    result['cols'] = copyCol;
                    result['rows'] = copyRow;
                    result['colCount'] = copyCol.length;
                    result['rowCount'] = copyRow.length;
                    result['isDeclare'] = this.isDeclare();
                    return result;
                };
                /**
                 * Retrieves the value at the specified row index and column name.
                 * Ensures that the returned value is a deep copy to prevent unintended modifications.
                 *
                 * ## Parameters
                 * - `rowIndex` **(number)**: The index of the row from which to retrieve the value.
                 * - `column` **(string)**: The name of the column containing the desired value.
                 *
                 * ## Behavior
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Uses `_deepCopy()` to return an independent copy of the value.
                 *
                 * ## Returns
                 * - **`any`**: A deep copy of the value stored at the specified row and column.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getValue(0, "name")); // Output: "Alice"
                 * 
                 * // Throws an error if the column does not exist
                 * // console.log(dataModel.getValue(0, "age"));
                 * ```
                 *
                 * @param {number} rowIndex The index of the row to retrieve the value from.
                 * @param {string} column The column name containing the value.
                 * @returns {any} A deep copy of the value stored at the specified row and column.
                 * @throws {Error} If `rowIndex` or `column` is invalid.
                 */
                getValue = (rowIndex: number, column: string): any => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    return this._deepCopy(this._rows[this._getValidRowIndex(rowIndex)][column]);
                };
                /**
                 * Sets a value at the specified row index and column name.
                 * Ensures that the value is valid and maintains data integrity.
                 *
                 * ## Parameters
                 * - `rowIndex` **(number)**: The index of the row where the value should be set.
                 * - `column` **(string)**: The name of the column where the value should be stored.
                 * - `value` **(any)**: The value to be assigned to the specified row and column.
                 *
                 * ## Behavior
                 * - Throws an error if `value` is `undefined`.
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Calls `_getValidRowValue(rowIndex, column, value)` to ensure the value is properly formatted.
                 * - Updates the value at the specified row and column.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after updating the value.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * dataModel.setValue(0, "name", "Charlie");
                 * console.log(dataModel.getValue(0, "name")); // Output: "Charlie"
                 *
                 * // Throws an error if trying to set `undefined`
                 * // dataModel.setValue(1, "name", undefined);
                 *
                 * // Throws an error if the column does not exist
                 * // dataModel.setValue(0, "age", 25);
                 * ```
                 *
                 * @param {number} rowIndex The index of the row where the value should be set.
                 * @param {string} column The column name where the value should be stored.
                 * @param {any} value The value to assign.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after updating the value.
                 * @throws {Error} If `value` is `undefined` or if `rowIndex` or `column` is invalid.
                 */
                setValue = (rowIndex: number, column: string, value: any): InterfaceDataModel => {
                    if (value === undefined) throw new Error('You can not put a value of undefined type.');
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    this._rows[this._getValidRowIndex(rowIndex)][column] = this._getValidRowValue(rowIndex, column, value);
                    return this;
                };
                /**
                 * Removes a column from the `DataModel`, deleting its values from all rows.
                 * Ensures that the column exists before attempting removal.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to remove.
                 *
                 * ## Behavior
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Iterates through all rows and removes the specified column.
                 * - Updates `_cols` to exclude the removed column.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after removing the column.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 }
                 * ]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * dataModel.removeColumn("age");
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Throws an error if the column does not exist
                 * // dataModel.removeColumn("salary");
                 * ```
                 *
                 * @param {string} column The name of the column to remove.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after removing the column.
                 * @throws {Error} If `column` is invalid or does not exist.
                 */
                removeColumn = (column: string): InterfaceDataModel => {
                    column = this._getValidColValue(column);
                    this._checkColumn(column);
                    for(const row of this._rows) {
                        delete row[column]
                    }
                    this._cols = this._cols.filter(oriColumn => oriColumn !== column);
                    return this;
                };
                /**
                 * Removes multiple columns from the `DataModel`, deleting their values from all rows.
                 * Ensures that each specified column exists before attempting removal.
                 *
                 * ## Parameters
                 * - `columns` **(string[])**: An array of column names to remove.
                 *
                 * ## Behavior
                 * - Iterates through the `columns` array and calls `removeColumn(column)` for each entry.
                 * - If any column does not exist, `removeColumn` will throw an error.
                 * - Returns the current `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The current instance after removing the specified columns.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25, city: "New York" },
                 *     { id: 2, name: "Bob", age: 30, city: "Los Angeles" }
                 * ]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age", "city"]
                 * 
                 * dataModel.removeColumns(["age", "city"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 *
                 * // Throws an error if a column does not exist
                 * // dataModel.removeColumns(["salary", "bonus"]);
                 * ```
                 *
                 * @param {string[]} columns An array of column names to remove.
                 * @returns {InterfaceDataModel} The current `DataModel` instance after removing the columns.
                 * @throws {Error} If any column does not exist.
                 */
                removeColumns = (columns: string[]): InterfaceDataModel => {
                    for(const column of columns) {
                        this.removeColumn(column);
                    }
                    return this;
                };
                /**
                 * Removes a row from the `DataModel` at the specified index and returns the removed row.
                 * Ensures that the row index is valid before removal.
                 *
                 * ## Parameters
                 * - `rowIndex` **(number, optional, default = `0`)**: The index of the row to remove.
                 *
                 * ## Behavior
                 * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
                 * - Uses `splice()` to remove the row from `_rows` and returns the removed row.
                 *
                 * ## Returns
                 * - **`Record<string, any>`**: The removed row object.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 3
                 * 
                 * const removedRow = dataModel.removeRow(1);
                 * console.log(removedRow); // Output: { id: 2, name: "Bob" }
                 * console.log(dataModel.getRowCount()); // Output: 2
                 *
                 * // Throws an error if rowIndex is out of bounds
                 * // dataModel.removeRow(10);
                 * ```
                 *
                 * @param {number} [rowIndex=0] The index of the row to remove.
                 * @returns {Record<string, any>} The removed row object.
                 * @throws {Error} If `rowIndex` is out of bounds.
                 */
                removeRow = (rowIndex: number = 0): Record<string, any> => {
                    return this._rows.splice(this._getValidRowIndex(rowIndex), 1)[0];
                };
                /**
                 * Retrieves the total number of columns in the `DataModel`.
                 *
                 * ## Behavior
                 * - Returns the length of the `_cols` array, which represents the column definitions.
                 *
                 * ## Returns
                 * - **`number`**: The total number of columns in the `DataModel`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
                 * console.log(dataModel.getColumnCount()); // Output: 3
                 * 
                 * dataModel.removeColumn("age");
                 * console.log(dataModel.getColumnCount()); // Output: 2
                 * ```
                 *
                 * @returns {number} The number of columns in the `DataModel`.
                 */
                getColumnCount = (): number => {
                    return this._cols.length;
                };
                /**
                 * Retrieves the total number of rows in the `DataModel`.
                 *
                 * ## Behavior
                 * - Returns the length of the `_rows` array, which represents the stored data rows.
                 *
                 * ## Returns
                 * - **`number`**: The total number of rows in the `DataModel`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 2
                 * 
                 * dataModel.addRow({ id: 3, name: "Charlie" });
                 * console.log(dataModel.getRowCount()); // Output: 3
                 * ```
                 *
                 * @returns {number} The number of rows in the `DataModel`.
                 */
                getRowCount = (): number => {
                    return this._rows.length;
                };
                /**
                 * Checks whether the `DataModel` contains a specified column.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to check.
                 *
                 * ## Behavior
                 * - Calls `_hasColumn(column)` to determine if the column exists.
                 * - Returns `true` if the column is found in `_cols`, otherwise `false`.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if the column exists, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name"]);
                 * 
                 * console.log(dataModel.hasColumn("name")); // Output: true
                 * console.log(dataModel.hasColumn("age")); // Output: false
                 * ```
                 *
                 * @param {string} column The column name to check.
                 * @returns {boolean} `true` if the column exists, otherwise `false`.
                 */
                hasColumn = (column: string): boolean => {
                    return this._hasColumn(column);
                };
                /**
                 * Restricts the `DataModel` to only the specified columns by removing all other columns.
                 * Ensures that only the columns listed in `columns` remain in the dataset.
                 *
                 * ## Parameters
                 * - `columns` **(string[])**: An array of column names to keep in the `DataModel`.
                 *
                 * ## Behavior
                 * - Filters `_cols` to identify columns that are **not** in the provided `columns` list.
                 * - Calls `removeColumns()` to remove those columns from the dataset.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with only the specified columns retained.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 }
                 * ]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * // Keep only "id" and "name" columns
                 * dataModel.setValidColumns(["id", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["id", "name"]
                 * ```
                 *
                 * @param {string[]} columns An array of column names to retain.
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with only the specified columns retained.
                 */
                setValidColumns = (columns: string[]): InterfaceDataModel => {
                    columns = this._cols.filter(oriColumn => !columns.includes(oriColumn));
                    this.removeColumns(columns);
                    return this;
                };
                /**
                 * Checks whether a specified column contains only non-null values.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to check.
                 *
                 * ## Behavior
                 * - Calls `_getNullColumnFirstRowIndex(column)` to find the first occurrence of a `null` value in the column.
                 * - If no `null` values are found, returns `true`; otherwise, returns `false`.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if the column has no `null` values, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: null },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.isNotNullColumn("id")); // Output: true
                 * console.log(dataModel.isNotNullColumn("name")); // Output: false
                 * ```
                 *
                 * @param {string} column The column name to check.
                 * @returns {boolean} `true` if the column has no `null` values, otherwise `false`.
                 * @throws {Error} If `column` does not exist.
                 */
                isNotNullColumn = (column: string): boolean => {
                    return this._getNullColumnFirstRowIndex(column) === -1;
                };
                /**
                 * Finds and returns the first row where the specified column contains a `null` value.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to check.
                 *
                 * ## Behavior
                 * - Calls `_getNullColumnFirstRowIndex(column)` to locate the first occurrence of a `null` value in the column.
                 * - If no `null` values are found, returns `null`.
                 * - If a `null` value is found, retrieves and returns the corresponding row using `getRow()`.
                 *
                 * ## Returns
                 * - **`Record<string, any> | null`**: The first row where the column has a `null` value, or `null` if no such row exists.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: null },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.findFirstRowNullColumn("name"));
                 * // Output: { id: 2, name: null }
                 * 
                 * console.log(dataModel.findFirstRowNullColumn("id"));
                 * // Output: null (no null values in the "id" column)
                 * ```
                 *
                 * @param {string} column The column name to check for `null` values.
                 * @returns {Record<string, any> | null} The first row where the column has a `null` value, or `null` if none exist.
                 * @throws {Error} If `column` does not exist.
                 */
                findFirstRowNullColumn = (column: string): Record<string, any> | null => {
                    const nullColumnFirstRowIndex = this._getNullColumnFirstRowIndex(column);
                    if (nullColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(nullColumnFirstRowIndex);
                    }
                };
                /**
                 * Checks whether a specified column contains only unique values (i.e., no duplicate values).
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to check.
                 *
                 * ## Behavior
                 * - Calls `_getDuplColumnFirstRowIndex(column)` to find the first occurrence of a duplicate value in the column.
                 * - If no duplicates are found, returns `true`; otherwise, returns `false`.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if the column has no duplicate values, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Alice" }
                 * ]);
                 * 
                 * console.log(dataModel.isNotDuplColumn("id")); // Output: true
                 * console.log(dataModel.isNotDuplColumn("name")); // Output: false
                 * ```
                 *
                 * @param {string} column The column name to check for duplicate values.
                 * @returns {boolean} `true` if the column has no duplicate values, otherwise `false`.
                 * @throws {Error} If `column` does not exist.
                 */
                isNotDuplColumn = (column: string): boolean => {
                    return this._getDuplColumnFirstRowIndex(column) === -1;
                };
                /**
                 * Finds and returns the first row where the specified column contains a duplicate value.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to check for duplicate values.
                 *
                 * ## Behavior
                 * - Calls `_getDuplColumnFirstRowIndex(column)` to locate the first occurrence of a duplicate value in the column.
                 * - If no duplicate values are found, returns `null`.
                 * - If a duplicate value is found, retrieves and returns the corresponding row using `getRow()`.
                 *
                 * ## Returns
                 * - **`Record<string, any> | null`**: The first row where the column has a duplicate value, or `null` if no duplicates exist.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Alice" }
                 * ]);
                 * 
                 * console.log(dataModel.findFirstRowDuplColumn("name"));
                 * // Output: { id: 3, name: "Alice" } (the second occurrence of "Alice")
                 * 
                 * console.log(dataModel.findFirstRowDuplColumn("id"));
                 * // Output: null (no duplicate values in the "id" column)
                 * ```
                 *
                 * @param {string} column The column name to check for duplicate values.
                 * @returns {Record<string, any> | null} The first row where the column has a duplicate value, or `null` if none exist.
                 * @throws {Error} If `column` does not exist.
                 */
                findFirstRowDuplColumn = (column: string): Record<string, any> | null => {
                    const duplColumnFirstRowIndex = this._getDuplColumnFirstRowIndex(column);
                    if (duplColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(duplColumnFirstRowIndex);
                    }
                };
                /**
                 * Checks whether all values in the specified column satisfy a given validation function.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to validate.
                 * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
                 *
                 * ## Behavior
                 * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to check for invalid values.
                 * - If no invalid values are found, returns `true`; otherwise, returns `false`.
                 *
                 * ## Returns
                 * - **`boolean`**: `true` if all values in the column are valid, otherwise `false`.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, age: 25 },
                 *     { id: 2, age: 30 },
                 *     { id: 3, age: "invalid" }
                 * ]);
                 * 
                 * // Check if all values in "age" column are valid numbers
                 * console.log(dataModel.isValidValue("age", value => typeof value === "number"));
                 * // Output: false
                 * 
                 * console.log(dataModel.isValidValue("id", value => typeof value === "number"));
                 * // Output: true
                 * ```
                 *
                 * @param {string} column The column name to validate.
                 * @param {DataModelValidator} validator A function that checks if a value is valid.
                 * @returns {boolean} `true` if all values in the column are valid, otherwise `false`.
                 * @throws {Error} If `column` does not exist or `validator` is not a function.
                 */
                isValidValue = (column: string, vaildator: DataModelValidator): boolean => {
                    return this._getInValidColumnFirstRowIndex(column, vaildator) === -1;
                };
                /**
                 * Finds and returns the first row where the specified column contains an invalid value based on a given validation function.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The name of the column to validate.
                 * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
                 *
                 * ## Behavior
                 * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to locate the first occurrence of an invalid value in the column.
                 * - If no invalid values are found, returns `null`.
                 * - If an invalid value is found, retrieves and returns the corresponding row using `getRow()`.
                 *
                 * ## Returns
                 * - **`Record<string, any> | null`**: The first row where the column has an invalid value, or `null` if all values are valid.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, age: 25 },
                 *     { id: 2, age: "invalid" },
                 *     { id: 3, age: 30 }
                 * ]);
                 * 
                 * // Find the first row where "age" contains a non-numeric value
                 * console.log(dataModel.findFirstRowInvalidValue("age", value => typeof value === "number"));
                 * // Output: { id: 2, age: "invalid" }
                 * 
                 * console.log(dataModel.findFirstRowInvalidValue("id", value => typeof value === "number"));
                 * // Output: null (all values in "id" are valid)
                 * ```
                 *
                 * @param {string} column The column name to validate.
                 * @param {DataModelValidator} validator A function that checks if a value is valid.
                 * @returns {Record<string, any> | null} The first row with an invalid value, or `null` if all values are valid.
                 * @throws {Error} If `column` does not exist or `validator` is not a function.
                 */
                findFirstRowInvalidValue = (column: string, vaildator: DataModelValidator): Record<string, any> | null => {
                    const inValidColumnFirstRowIndex = this._getInValidColumnFirstRowIndex(column, vaildator);
                    if (inValidColumnFirstRowIndex === -1) {
                        return null
                    } else {
                        return this.getRow(inValidColumnFirstRowIndex);
                    }
                };
                /**
                 * Searches for rows that match a given condition and returns their indexes.
                 * Allows for both positive and negative filtering based on the `isNegative` flag.
                 *
                 * ## Parameters
                 * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, returns indexes of rows that **do not** match the condition.
                 *
                 * ## Behavior
                 * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
                 * - Calls `_checkBoolean(isNegative)` to validate the boolean flag.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, adds matching row indexes to the result.
                 * - If `isNegative` is `true`, adds **non-matching** row indexes to the result.
                 *
                 * ## Returns
                 * - **`number[]`**: An array of indexes of rows that match (or do not match) the condition.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Search for row indexes where age is 25
                 * console.log(dataModel.searchRowIndexes({ age: 25 }));
                 * // Output: [0, 2]
                 * 
                 * // Search for row indexes where age is NOT 25
                 * console.log(dataModel.searchRowIndexes({ age: 25 }, true));
                 * // Output: [1]
                 * ```
                 *
                 * @param {Record<string, any>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, returns indexes of rows that do **not** match the condition.
                 * @returns {number[]} An array of indexes of rows that match or do not match the condition.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchRowIndexes = (condition: Record<string, any>, isNegative: boolean = false): number[] => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched: number[] = [];
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
                /**
                 * Searches for rows that match a given condition and returns them as an array.
                 * Allows for both positive and negative filtering based on the `isNegative` flag.
                 *
                 * ## Parameters
                 * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
                 *
                 * ## Behavior
                 * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
                 * - Calls `_checkBoolean(isNegative)` to validate the flag.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, adds matching rows to the result.
                 * - If `isNegative` is `true`, adds **non-matching** rows to the result.
                 * - Returns a deep copy of the matched rows.
                 *
                 * ## Returns
                 * - **`Record<string, any>[]`**: An array of deep-copied rows that match (or do not match) the condition.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Search for rows where age is 25
                 * console.log(dataModel.searchRows({ age: 25 }));
                 * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
                 * 
                 * // Search for rows where age is NOT 25
                 * console.log(dataModel.searchRows({ age: 25 }, true));
                 * // Output: [{ id: 2, name: "Bob", age: 30 }]
                 * ```
                 *
                 * @param {Record<string, any>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
                 * @returns {Record<string, any>[]} An array of deep-copied rows that match or do not match the condition.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchRows = (condition: Record<string, any>, isNegative: boolean = false): Record<string, any>[] => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched: Record<string, any>[] = [];
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
                /**
                 * Searches for rows that match a given condition and returns them as a new `DataModel` instance.
                 * Allows for both positive and negative filtering based on the `isNegative` flag.
                 *
                 * ## Parameters
                 * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
                 *
                 * ## Behavior
                 * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
                 * - Calls `_checkBoolean(isNegative)` to validate the boolean flag.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, adds matching rows to the result.
                 * - If `isNegative` is `true`, adds **non-matching** rows to the result.
                 * - Returns a new `DataModel` containing the filtered rows.
                 *
                 * ## Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the matched rows.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Search for rows where age is 25 and return them as a new DataModel
                 * const filteredModel = dataModel.searchRowsAsDataModel({ age: 25 });
                 * console.log(filteredModel.getRowCount()); // Output: 2
                 * console.log(filteredModel.getRows());
                 * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
                 * 
                 * // Search for rows where age is NOT 25
                 * const excludedModel = dataModel.searchRowsAsDataModel({ age: 25 }, true);
                 * console.log(excludedModel.getRows());
                 * // Output: [{ id: 2, name: "Bob", age: 30 }]
                 * ```
                 *
                 * @param {Record<string, any>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
                 * @returns {InterfaceDataModel} A new `DataModel` instance containing the matched rows.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchRowsAsDataModel = (condition: Record<string, any>, isNegative: boolean = false): InterfaceDataModel => {
                    const _this = this;
                    _this._checkOriginObject(condition);
                    _this._checkBoolean(isNegative);
                    const matched: Record<string, any>[] = [];
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
                /**
                 * Searches for rows that match a given condition and **modifies** the original `DataModel` by removing matched or unmatched rows.
                 * This method directly updates the existing dataset instead of returning a new instance.
                 *
                 * ## Parameters
                 * - `condition` **(Record<string, any>)**: An object representing the key-value conditions to match.
                 * - `isNegative` **(boolean, optional, default = `false`)**: If `true`, removes rows that **match** the condition; otherwise, removes rows that **do not** match the condition.
                 *
                 * ## Behavior
                 * - Calls `_checkOriginObject(condition)` to ensure the condition is a valid object.
                 * - Calls `_checkBoolean(isNegative)` to validate the boolean flag.
                 * - Iterates through `_rows`, checking if each row meets the condition.
                 * - Uses `JSON.stringify()` for deep comparison of values.
                 * - If `isNegative` is `false`, removes rows that **do not** match the condition.
                 * - If `isNegative` is `true`, removes rows that **do** match the condition.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance after removing specified rows.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 25 }
                 * ]);
                 * 
                 * // Keep only rows where age is 25
                 * dataModel.searchAndModify({ age: 25 });
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 3, name: "Charlie", age: 25 }]
                 * 
                 * // Remove rows where age is 25
                 * dataModel.searchAndModify({ age: 25 }, true);
                 * console.log(dataModel.getRows());
                 * // Output: []
                 * ```
                 *
                 * @param {Record<string, any>} condition The key-value condition to match.
                 * @param {boolean} [isNegative=false] If `true`, removes rows that **match** the condition; otherwise, removes rows that **do not** match the condition.
                 * @returns {InterfaceDataModel} The modified `DataModel` instance after removing specified rows.
                 * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
                 */
                searchAndModify = (condition: Record<string, any>, isNegative: boolean = false): InterfaceDataModel => {
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
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function and returns their indexes.
                 * Allows for efficiently identifying row positions that match a given condition.
                 *
                 * ## Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
                 *
                 * ## Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Collects the indexes of rows that satisfy the filter condition.
                 *
                 * ## Returns
                 * - **`number[]`**: An array of indexes of rows that match the filter condition.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Get indexes of rows where age is greater than 25
                 * const rowIndexes = dataModel.filterRowIndexes(row => row.age > 25);
                 * console.log(rowIndexes); // Output: [1]
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be included.
                 * @returns {number[]} An array of indexes of rows that match the filter condition.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterRowIndexes = (filter: DataModelFillter): number[] => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched: number[] = [];
                    _this._rows.forEach(function(row: Record<string, any>, index) {
                        if (filter(row)) {
                            matched.push(index);
                        }
                    });
                    return matched;
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function.
                 * Returns an array of rows that satisfy the provided filter condition.
                 *
                 * ## Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
                 *
                 * ## Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
                 * - Returns an array of matching rows.
                 *
                 * ## Returns
                 * - **`Record<string, any>[]`**: An array of deep-copied rows that match the filter condition.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Filter rows where age is greater than 25
                 * const filteredRows = dataModel.filterRows(row => row.age > 25);
                 * console.log(filteredRows);
                 * // Output: [{ id: 2, name: "Bob", age: 30 }]
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be included.
                 * @returns {Record<string, any>[]} An array of deep-copied rows that match the filter condition.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterRows = (filter: DataModelFillter): Record<string, any>[] => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched: Record<string, any>[] = [];
                    _this._rows.forEach(function(row) {
                        if (filter(row)) {
                            matched.push(_this._deepCopy(row));
                        }
                    });
                    return matched;
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function and returns a new `DataModel` containing the matched rows.
                 * Allows for extracting a subset of the dataset while preserving the structured format.
                 *
                 * ## Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
                 *
                 * ## Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Collects rows that satisfy the filter condition.
                 * - Returns a new `DataModel` instance containing the filtered rows.
                 *
                 * ## Returns
                 * - **`DataModel`**: A new `DataModel` instance containing the filtered rows.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Create a new DataModel containing only rows where age is greater than 25
                 * const filteredDataModel = dataModel.filterRowsAsDataModel(row => row.age > 25);
                 * console.log(filteredDataModel.getRowCount()); // Output: 1
                 * console.log(filteredDataModel.getRow(0)); // Output: { id: 2, name: "Bob", age: 30 }
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be included.
                 * @returns {InterfaceDataModel} A new `DataModel` instance containing the filtered rows.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterRowsAsDataModel = (filter: DataModelFillter): InterfaceDataModel => {
                    const _this = this;
                    _this._checkValidFunction(filter);
                    const matched: Record<string, any>[] = [];
                    _this._rows.forEach(function(row) {
                        if (filter(row)) {
                            matched.push(row);
                        }
                    });
                    return new hison.data.DataModel(matched);
                };
                /**
                 * Filters rows in the `DataModel` based on a custom filtering function and **modifies** the original `DataModel` by removing unmatched rows.
                 * This method directly updates the existing dataset instead of returning a new instance.
                 *
                 * ## Parameters
                 * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be retained.
                 *
                 * ## Behavior
                 * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
                 * - Iterates through `_rows`, applying the filter function to each row.
                 * - Removes rows that do **not** satisfy the filter condition.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with only the filtered rows.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice", age: 25 },
                 *     { id: 2, name: "Bob", age: 30 },
                 *     { id: 3, name: "Charlie", age: 22 }
                 * ]);
                 * 
                 * // Remove all rows where age is 25 or below
                 * dataModel.filterAndModify(row => row.age > 25);
                 * 
                 * console.log(dataModel.getRowCount()); // Output: 1
                 * console.log(dataModel.getRow(0)); // Output: { id: 2, name: "Bob", age: 30 }
                 * ```
                 *
                 * @param {DataModelFillter} filter A function that determines whether a row should be retained.
                 * @returns {InterfaceDataModel} The modified `DataModel` instance after removing unmatched rows.
                 * @throws {Error} If `filter` is not a valid function.
                 */
                filterAndModify = (filter: DataModelFillter): InterfaceDataModel => {
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
                /**
                 * Reorders the columns in the `DataModel` based on the specified order.
                 * Ensures that all existing columns are included, maintaining the defined structure.
                 *
                 * ## Parameters
                 * - `columns` **(string[])**: An array of column names in the desired order.
                 *
                 * ## Behavior
                 * - Calls `_checkArray(columns)` to validate the input as an array.
                 * - Iterates through `columns`, ensuring each column is valid and exists in the `DataModel`.
                 * - Creates a new column order, appending any remaining columns that were not specified.
                 * - Updates `_cols` with the new column order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with reordered columns.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * // Change column order
                 * dataModel.setColumnSorting(["age", "name"]);
                 * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
                 * ```
                 *
                 * @param {string[]} columns An array of column names in the desired order.
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with reordered columns.
                 * @throws {Error} If `columns` is not an array or contains invalid column names.
                 */
                setColumnSorting = (columns: string[]): InterfaceDataModel => {
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
                /**
                 * Sorts the columns of the `DataModel` in ascending (A-Z) order.
                 * The sorting is applied alphabetically based on column names.
                 *
                 * ## Behavior
                 * - Calls the native `Array.sort()` method on `_cols` to rearrange columns in ascending order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with columns sorted in ascending order.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
                 * 
                 * dataModel.sortColumnAscending();
                 * console.log(dataModel.getColumns()); // Output: ["age", "id", "name"]
                 * ```
                 *
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with columns sorted in ascending order.
                 */
                sortColumnAscending = (): InterfaceDataModel => {
                    this._cols.sort();
                    return this;
                };
                /**
                 * Sorts the columns of the `DataModel` in descending (Z-A) order.
                 * The sorting is applied alphabetically based on column names.
                 *
                 * ## Behavior
                 * - Calls the native `Array.sort()` method on `_cols` with a custom comparator to sort columns in descending order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with columns sorted in descending order.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
                 * 
                 * dataModel.sortColumnDescending();
                 * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
                 * ```
                 *
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with columns sorted in descending order.
                 */
                sortColumnDescending = (): InterfaceDataModel => {
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
                /**
                 * Reverses the order of columns in the `DataModel`.
                 * The column order is flipped without sorting alphabetically.
                 *
                 * ## Behavior
                 * - Calls the native `Array.reverse()` method on `_cols` to reverse the column order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with reversed column order.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
                 * 
                 * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
                 * 
                 * dataModel.sortColumnReverse();
                 * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
                 * ```
                 *
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with reversed column order.
                 */
                sortColumnReverse = (): InterfaceDataModel => {
                    this._cols.reverse();
                    return this;
                };
                /**
                 * Sorts the rows of the `DataModel` in ascending order based on the specified column.
                 * Optionally supports integer-based sorting for numerical values.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The column name to sort by.
                 * - `isIntegerOrder` **(boolean, optional, default = `false`)**: If `true`, treats values as integers for sorting.
                 *
                 * ## Behavior
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Calls `_checkBoolean(isIntegerOrder)` to validate the boolean flag.
                 * - Uses the native `Array.sort()` method to arrange rows in ascending order.
                 * - Handles `null` values by placing them at the end of the sorted list.
                 * - Converts object values to JSON strings for sorting.
                 * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
                 * - Throws an error if a non-numeric value is encountered during integer sorting.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with rows sorted in ascending order.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 3, name: "Charlie" },
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * // Sort rows by "id" in ascending order
                 * dataModel.sortRowAscending("id");
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * // Sort rows numerically by "id"
                 * dataModel.sortRowAscending("id", true);
                 * ```
                 *
                 * @param {string} column The column name to sort by.
                 * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with rows sorted in ascending order.
                 * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
                 */
                sortRowAscending = (column: string, isIntegerOrder: boolean = false): InterfaceDataModel => {
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
                /**
                 * Sorts the rows of the `DataModel` in descending order based on the specified column.
                 * Optionally supports integer-based sorting for numerical values.
                 *
                 * ## Parameters
                 * - `column` **(string)**: The column name to sort by.
                 * - `isIntegerOrder` **(boolean, optional, default = `false`)**: If `true`, treats values as integers for sorting.
                 *
                 * ## Behavior
                 * - Calls `_getValidColValue(column)` to validate the column name.
                 * - Throws an error if the specified column does not exist.
                 * - Calls `_checkBoolean(isIntegerOrder)` to validate the boolean flag.
                 * - Uses the native `Array.sort()` method to arrange rows in descending order.
                 * - Handles `null` values by placing them at the beginning of the sorted list.
                 * - Converts object values to JSON strings for sorting.
                 * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
                 * - Throws an error if a non-numeric value is encountered during integer sorting.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with rows sorted in descending order.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 3, name: "Charlie" },
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" }
                 * ]);
                 * 
                 * // Sort rows by "id" in descending order
                 * dataModel.sortRowDescending("id");
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 3, name: "Charlie" }, { id: 2, name: "Bob" }, { id: 1, name: "Alice" }]
                 * 
                 * // Sort rows numerically by "id"
                 * dataModel.sortRowDescending("id", true);
                 * ```
                 *
                 * @param {string} column The column name to sort by.
                 * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with rows sorted in descending order.
                 * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
                 */
                sortRowDescending = (column: string, isIntegerOrder: boolean = false): InterfaceDataModel => {
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
                /**
                 * Reverses the order of rows in the `DataModel`.
                 * This method flips the row order without sorting by a specific column.
                 *
                 * ## Behavior
                 * - Calls the native `Array.reverse()` method on `_rows` to reverse the row order.
                 * - Returns the modified `DataModel` instance for method chaining.
                 *
                 * ## Returns
                 * - **`DataModel`**: The modified `DataModel` instance with reversed row order.
                 *
                 * ## Example Usage
                 * ```typescript
                 * const dataModel = new hison.data.DataModel([
                 *     { id: 1, name: "Alice" },
                 *     { id: 2, name: "Bob" },
                 *     { id: 3, name: "Charlie" }
                 * ]);
                 * 
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
                 * 
                 * dataModel.sortRowReverse();
                 * console.log(dataModel.getRows());
                 * // Output: [{ id: 3, name: "Charlie" }, { id: 2, name: "Bob" }, { id: 1, name: "Alice" }]
                 * ```
                 *
                 * @returns {InterfaceDataModel} The modified `DataModel` instance with reversed row order.
                 */
                sortRowReverse = (): InterfaceDataModel => {
                    this._rows.reverse();
                    return this;
                };
            },
        };
        link = {
            /**
             * **`CachingModule` - A module for API response caching and real-time WebSocket updates.**
             *
             * The `CachingModule` provides a caching mechanism for API responses using an **LRU (Least Recently Used) strategy** 
             * while integrating **WebSocket communication** for real-time data updates.
             *
             * ## **Key Features**
             * - **LRU Cache for API Responses**: Stores API responses with a configurable limit, reducing redundant network requests.
             * - **WebSocket Support**: Maintains a persistent WebSocket connection for real-time data updates.
             * - **Cache Management Methods**: Supports cache operations (`get`, `put`, `remove`, `clear`, etc.).
             * - **Event-Driven Communication**: Allows event listeners (`onopen`, `onmessage`, `onclose`, `onerror`) for WebSocket handling.
             * - **Flexible Configuration**: Uses `CustomOption` settings for cache limits and WebSocket parameters.
             * - **Validation Methods**: Ensures proper data types for cache keys and event listeners.
             *
             * ## **How It Works**
             * - **API responses are stored in an LRUCache instance**, avoiding redundant network calls.
             * - **When a WebSocket connection is established**, data updates can be received in real-time.
             * - **Cache data can be accessed and managed using `get`, `put`, `remove`, and `clear` methods.**
             * - **WebSocket event handlers can be set up for real-time notifications.**
             *
             * ## **Example Usage**
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
             * ## **Internal Structure**
             * - **Uses `LRUCache`** to manage cached responses with a defined limit.
             * - **Maintains a WebSocket connection** to receive real-time data updates.
             * - **Supports configurable options via `CustomOption`**, such as WebSocket endpoint and cache size.
             * - **Provides utility methods** for cache validation, data retrieval, and event handling.
             *
             * ## **Related Components**
             * - **`LRUCache`**: Handles the caching logic for API responses.
             * - **`WebSocket`**: Establishes a real-time connection for live data updates.
             * - **`CustomOption`**: Provides configurable options for WebSocket and cache settings.
             * - **`ApiLink`**: Uses this module to fetch and store API responses efficiently.
             *
             * ## **Return Value**
             * - This module **returns an instance of `CachingModule`**, which allows cache operations and WebSocket event management.
             *
             * ## **Typical Use Cases**
             * - **Reducing unnecessary API calls** by storing frequently accessed responses.
             * - **Receiving real-time updates** from the server without polling.
             * - **Efficiently managing API response data** in web applications.
             * - **Supporting offline or low-latency scenarios** by using cached responses.
             */
            CachingModule: class implements InterfaceCachingModule {
                /**
                 * **Creates an instance of `CachingModule`, initializing an LRU cache and a WebSocket connection.**
                 *
                 * The constructor sets up the **WebSocket connection** for real-time updates and 
                 * **instantiates an `LRUCache`** to manage API response caching.
                 *
                 * ## **Parameters**
                 * - `cachingLimit` *(optional, number)* - The maximum number of items the cache can store.  
                 *   - **Default:** `customOption.cachingLimit`
                 *
                 * ## **Initialization Process**
                 * 1. **Establishes a WebSocket connection** using the protocol, domain, and endpoint specified in `CustomOption`.
                 * 2. **Configures WebSocket event handlers** (`onopen`, `onmessage`, `onclose`, `onerror`).
                 * 3. **Creates an LRUCache instance** with the specified caching limit.
                 * 4. **Marks this instance as a valid caching module** using `_isCachingModule = true`.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating a caching module with a default caching limit
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Creating a caching module with a custom limit of 50 entries
                 * const customCachingModule = new hison.link.CachingModule(50);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_webSocket`** *(WebSocket)* - The WebSocket connection instance.
                 * - **`_LRUCache`** *(LRUCache)* - The LRU-based cache for storing API responses.
                 * - **`_isCachingModule`** *(boolean)* - A flag indicating whether this instance is a caching module.
                 *
                 * @param {number} [cachingLimit=customOption.link.cachingLimit] - The maximum number of cached responses.
                 */
                constructor(cachingLimit: number = customOption.link.cachingLimit) {
                    this._webSocket = new WebSocket(customOption.link.webSocketProtocol + customOption.link.domain + customOption.link.webSocketEndPoint);
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
                private _checkTypeFunction = (func: Function | null) => {
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
                /**
                 * **Checks whether this instance is a valid caching module.**
                 *
                 * This method returns a boolean flag indicating whether the current instance 
                 * is recognized as a `CachingModule`. This is useful for validating whether 
                 * an instance supports caching functionalities.
                 *
                 * ## **Return Value**
                 * - `true` if this instance is a caching module.
                 * - `false` if caching is not enabled.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * console.log(cachingModule.getIsCachingModule()); // true
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_isCachingModule`** *(boolean)* - Stores the module's caching capability status.
                 *
                 * @returns {boolean} `true` if this instance is a caching module.
                 */
                getIsCachingModule = (): boolean => {
                    return this._isCachingModule;
                };
                /**
                 * **Checks if the cache contains a specific key.**
                 *
                 * This method verifies if the specified `key` exists in the LRU cache. It ensures 
                 * that the key is a valid string and then delegates the check to the underlying 
                 * `LRUCache` instance.
                 *
                 * ## **Parameters**
                 * - `key` *(string)* - The key to check in the cache.
                 *
                 * ## **Return Value**
                 * - `true` if the cache contains the specified key.
                 * - `false` if the key is not found in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * console.log(cachingModule.hasKey("user123")); // true
                 * console.log(cachingModule.hasKey("user456")); // false
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`_checkTypeString(key)`** - Ensures the key is a valid string before performing the cache check.
                 * - **`_LRUCache.hasKey(key)`** - The internal method that checks the existence of the key in the cache.
                 *
                 * @param {string} key - The key to check in the cache.
                 * @returns {boolean} `true` if the cache contains the key, otherwise `false`.
                 */
                hasKey = (key: string): boolean => {
                    this._checkTypeString(key);
                    return this._LRUCache.hasKey(key);
                };
                /**
                 * **Retrieves cached data for a given key.**
                 *
                 * This method fetches the cached API response associated with the specified `key`.
                 * Before accessing the cache, it validates that the key is a string.
                 *
                 * ## **Parameters**
                 * - `key` *(string)* - The key of the cached data.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The cached API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 * - If the key does not exist in the cache, `null` is returned.
                 *
                 * ## **Example Usage**
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
                 * ## **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`hasKey(key)`** - Checks if a key exists in the cache.
                 * - **`remove(key)`** - Removes a key from the cache.
                 *
                 * @param {string} key - The key to retrieve from the cache.
                 * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the cached response data.
                 */
                get = (key: string): Promise<{ data: any; response: Response; }> | null => {
                    this._checkTypeString(key);
                    return this._LRUCache.get(key);
                };
                /**
                 * **Stores API response data in the cache.**
                 *
                 * This method saves the provided `value` (API response) in the cache with the specified `key`.
                 * Before storing the data, it validates that the `key` is a string.
                 *
                 * ## **Parameters**
                 * - `key` *(string)* - The cache key under which the response will be stored.
                 * - `value` *(Promise<{ data: any; response: Response }>)*
                 *   - A promise resolving to an object containing:
                 *     - `data` *(any)* - The API response data.
                 *     - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - If the `key` already exists, the old value is **replaced** with the new one.
                 * - If the cache reaches its limit, the **least recently used (LRU) entry is removed**.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store an API response in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`hasKey(key)`** - Checks if a key exists in the cache.
                 * - **`remove(key)`** - Removes a specific key from the cache.
                 *
                 * @param {string} key - The cache key under which the response will be stored.
                 * @param {Promise<{ data: any; response: Response }>} value - The API response to be cached.
                 */
                put = (key: string, value: Promise<{ data: any; response: Response; }>) => {
                    this._checkTypeString(key);
                    this._LRUCache.put(key, value);
                };
                /**
                 * **Removes a specific key from the cache.**
                 *
                 * This method deletes the cached API response associated with the given `key`.
                 * Before performing the removal, it ensures that the `key` is a valid string.
                 *
                 * ## **Parameters**
                 * - `key` *(string)* - The cache key to be removed.
                 *
                 * ## **Behavior**
                 * - If the specified `key` exists in the cache, it is deleted.
                 * - If the `key` does not exist, no action is taken.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Store an API response in the cache
                 * cachingModule.put("user123", fetch("/api/user/123").then(response => response.json()));
                 * 
                 * // Remove the cached response
                 * cachingModule.remove("user123");
                 * 
                 * // Check if the key still exists
                 * console.log(cachingModule.hasKey("user123")); // false
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`clear()`** - Removes all cached entries.
                 *
                 * @param {string} key - The cache key to be removed.
                 */
                remove = (key: string) => {
                    this._checkTypeString(key);
                    this._LRUCache.remove(key);
                };
                /**
                 * **Retrieves all cached data as a key-value object.**
                 *
                 * This method returns the entire cache as a record where each key corresponds to a cached API response.
                 *
                 * ## **Return Value**
                 * - A `Record<string, Promise<{ data: any; response: Response }>>` representing all cached entries.
                 * - Each entry consists of:
                 *   - `key` *(string)* - The cache key.
                 *   - `value` *(Promise<{ data: any; response: Response }>>)* - A promise resolving to:
                 *     - `data` *(any)* - The API response data.
                 *     - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Example Usage**
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
                 * ## **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`getKeys()`** - Retrieves all cache keys.
                 * - **`clear()`** - Removes all cached entries.
                 *
                 * @returns {Record<string, Promise<{ data: any; response: Response }>>} An object containing all cached responses.
                 */
                getAll = (): Record<string, Promise<{ data: any; response: Response; }>>  => {
                    return this._LRUCache.getAll();
                };
                /**
                 * **Retrieves all cache keys.**
                 *
                 * This method returns an array of all keys currently stored in the cache.
                 *
                 * ## **Return Value**
                 * - An array of strings representing the cache keys.
                 *
                 * ## **Example Usage**
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
                 * ## **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`getAll()`** - Retrieves all cached data as a key-value object.
                 * - **`clear()`** - Removes all cached entries.
                 *
                 * @returns {string[]} An array of cache keys.
                 */
                getKeys = (): string[] => {
                    return this._LRUCache.getKeys();
                };
                /**
                 * **Clears all cached data.**
                 *
                 * This method removes all entries from the cache, resetting it to an empty state.
                 *
                 * ## **Behavior**
                 * - All cached responses are permanently deleted.
                 * - The cache size is reset to zero.
                 *
                 * ## **Example Usage**
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
                 * ## **Related Methods**
                 * - **`put(key, value)`** - Stores API responses in the cache.
                 * - **`get(key)`** - Retrieves cached data for a given key.
                 * - **`getAll()`** - Retrieves all cached data as a key-value object.
                 * - **`getKeys()`** - Retrieves all cache keys.
                 *
                 * @returns {void}
                 */
                clear = () => {
                    this._LRUCache.clear();
                };
                /**
                 * **Registers an event handler for the WebSocket `open` event.**
                 *
                 * This method assigns a custom event handler to be executed when the WebSocket connection is successfully opened.
                 *
                 * ## **Parameters**
                 * - `func` *(function | null)* - A callback function to handle the WebSocket `open` event.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ## **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When the WebSocket connection is established, the specified function is invoked.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket open event handler
                 * cachingModule.onopen = (event) => {
                 *     console.log("WebSocket connected:", event);
                 * };
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @param {(this: WebSocket, ev: Event) => any | null} func - The event handler function for the WebSocket `open` event.
                 */
                onopen = (func: ((this: WebSocket, ev: Event) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onopen = func;
                };
                /**
                 * **Registers an event handler for the WebSocket `message` event.**
                 *
                 * This method assigns a custom event handler to be executed whenever a message is received 
                 * through the WebSocket connection.
                 *
                 * ## **Parameters**
                 * - `func` *(function | null)* - A callback function to handle incoming WebSocket messages.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ## **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When a message is received, the specified function is invoked with the event data.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket message event handler
                 * cachingModule.onmessage = (event) => {
                 *     console.log("Received WebSocket message:", event.data);
                 * };
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @param {(this: WebSocket, ev: MessageEvent) => any | null} func - The event handler function for WebSocket messages.
                 */
                onmessage = (func: ((this: WebSocket, ev: MessageEvent) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onmessage = func;
                };
                /**
                 * **Registers an event handler for the WebSocket `close` event.**
                 *
                 * This method assigns a custom event handler to be executed when the WebSocket connection is closed.
                 *
                 * ## **Parameters**
                 * - `func` *(function | null)* - A callback function to handle the WebSocket `close` event.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ## **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When the WebSocket connection is closed, the specified function is invoked with the event data.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket close event handler
                 * cachingModule.onclose = (event) => {
                 *     console.log("WebSocket closed:", event);
                 * };
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @param {(this: WebSocket, ev: CloseEvent) => any | null} func - The event handler function for WebSocket disconnection.
                 */
                onclose = (func: ((this: WebSocket, ev: CloseEvent) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onclose = func;
                };
                /**
                 * **Registers an event handler for the WebSocket `error` event.**
                 *
                 * This method assigns a custom event handler to be executed when a WebSocket error occurs.
                 *
                 * ## **Parameters**
                 * - `func` *(function | null)* - A callback function to handle WebSocket errors.
                 *   - If `null` is provided, the event handler is cleared.
                 *
                 * ## **Behavior**
                 * - Ensures that the provided function is valid before assigning it as the event handler.
                 * - When an error occurs in the WebSocket connection, the specified function is invoked with the event data.
                 * - **Note:** The implementation currently assigns the function to `onclose` instead of `onerror`,
                 *   which may require correction.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Register a WebSocket error event handler
                 * cachingModule.onerror = (event) => {
                 *     console.error("WebSocket error:", event);
                 * };
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onmessage(func)`** - Registers a handler for incoming WebSocket messages.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 *
                 * @param {(this: WebSocket, ev: Event) => any | null} func - The event handler function for WebSocket errors.
                 */
                onerror = (func: ((this: WebSocket, ev: Event) => any) | null) => {
                    this._checkTypeFunction(func);
                    this._webSocket.onclose = func;
                };
                /**
                 * **Checks the current state of the WebSocket connection.**
                 *
                 * This method returns an integer representing the current status of the WebSocket connection.
                 *
                 * ## **Return Value**
                 * - `1` → The WebSocket connection is open.
                 * - `0` → The WebSocket connection is in the process of connecting.
                 * - `-1` → The WebSocket connection is closed or unavailable.
                 *
                 * ## **Behavior**
                 * - Internally calls `_checkWebSocketConnection()` to determine the WebSocket state.
                 * - Useful for monitoring connection status and handling reconnection logic if needed.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const cachingModule = new hison.link.CachingModule();
                 * 
                 * // Check WebSocket connection status
                 * const status = cachingModule.isWebSocketConnection();
                 * console.log(status); // Output: 1 (open), 0 (connecting), or -1 (closed)
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`onopen(func)`** - Registers a handler for WebSocket connection open events.
                 * - **`onclose(func)`** - Registers a handler for WebSocket disconnection events.
                 * - **`onerror(func)`** - Registers a handler for WebSocket error events.
                 *
                 * @returns {number} The WebSocket connection status (`1`: open, `0`: connecting, `-1`: closed).
                 */
                isWebSocketConnection = (): number => {
                    return this._checkWebSocketConnection();
                };
            },
            /**
             * **`ApiGet` - A class for handling HTTP GET requests within the `hison.link` module.**
             *
             * The `ApiGet` class is responsible for sending HTTP GET requests to a specified API resource. 
             * It integrates with `ApiLink` to handle request execution, event emissions, and optional response caching.
             *
             * ## **Key Features**
             * - **Executes HTTP GET requests** using `ApiLink`.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows setting event listeners** for request completion, errors, and other key events.
             *
             * ## **How It Works**
             * - When instantiated, `ApiGet` stores the API resource path and an optional `CachingModule` instance.
             * - The `call()` method triggers a GET request to the specified resource path.
             * - If caching is enabled, previously stored responses may be returned instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiGet without caching
             * const apiGet = new hison.link.ApiGet("/users");
             * 
             * // Sending a GET request
             * apiGet.call().then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiGet = new hison.link.ApiGet("/users", cachingModule);
             * 
             * // Handling request events
             * cachedApiGet.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("GET request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-based request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiGet`, which provides methods for executing GET requests and managing request events.
             *
             * ## **Typical Use Cases**
             * - **Fetching data from a REST API** with minimal setup.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiGet: class implements InterfaceApiGet {
                /**
                 * **Creates an instance of `ApiGet`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making GET requests to a specified resource path.
                 *
                 * ## **Parameters**
                 * - `resourcePath` *(optional, string)* - The API resource path for the GET request.
                 *   - **Default:** `''` (empty string)
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 2. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 3. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 4. **Stores the API resource path.**
                 *    - Defines the endpoint for the GET request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiGet instance without caching
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Creating an ApiGet instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiGet = new hison.link.ApiGet("/users", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_resourcePath`** *(string)* - Stores the API resource path.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} [resourcePath=''] - The API resource path.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 */
                constructor(resourcePath: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._resourcePath = resourcePath;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _resourcePath: string;
                /**
                 * **Executes an HTTP GET request to the specified resource path.**
                 *
                 * This method sends a GET request using `ApiLink`, optionally applying caching if a `CachingModule` is provided.
                 * It also **invokes a pre-request hook** (`hison.setBeforeGetRequst`) and **emits a request-start event** 
                 * (`"requestStarted_GET"`) before execution.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Pre-Request Handling**
                 * - **`hison.setBeforeGetRequst((resourcePath, options) => {})`**
                 *   - A customizable hook executed **before sending the GET request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters or implementing conditional request logic.
                 *
                 * ## **Event Emission**
                 * - **`"requestStarted_GET"` Event**
                 *   - This event is emitted **before the GET request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP GET request to `_resourcePath`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforeGetRequst`)** is checked.
                 *   - The **event `"requestStarted_GET"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Customizing the before-request hook to prevent requests conditionally
                 * hison.setBeforeGetRequst((resourcePath, options) => {
                 *     if (!options.headers.Authorization) {
                 *         console.warn("Missing Authorization header.");
                 *         return false; // Prevents the request from being sent
                 *     }
                 *     return true;
                 * });
                 * 
                 * // Listening to the "requestStarted_GET" event
                 * apiGet.onEventEmit("requestStarted_GET", (resourcePath, options) => {
                 *     console.log(`GET request started for: ${resourcePath}`);
                 * });
                 * 
                 * // Sending a GET request
                 * apiGet.call({ headers: { "Authorization": "Bearer token" } }).then(response => {
                 *     console.log(response.data); // Response data
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the API response.
                 */
                call = (options: Record<string, any> = {}): Promise<{ data: InterfaceDataWrapper; response: Response; } | null> => {
                    return this._apiLink.get(this._resourcePath, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified resource path.**
                 *
                 * This method retrieves only the headers from the specified resource without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - The method delegates the request execution to `ApiLink.head()`.
                 * - The response body is **not** included in the result, only headers are returned.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Sending a HEAD request
                 * apiGet.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiGet.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(this._resourcePath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified resource path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified resource 
                 * without performing an actual data operation.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - The method delegates the request execution to `ApiLink.options()`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Sending an OPTIONS request
                 * apiGet.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiGet.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._resourcePath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a GET request.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string)* - The name of the event to listen for.
                 * - `eventFunc` *(function)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_GET"` - Triggered when a GET request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGet = new hison.link.ApiGet("/users");
                 * 
                 * // Register an event listener for when the request completes
                 * apiGet.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("GET request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiGet.onEventEmit("requestError", (error) => {
                 *     console.error("GET request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(options)`** - Sends a GET request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('GET', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPost` - A class for handling HTTP POST requests within the `hison.link` module.**
             *
             * The `ApiPost` class is responsible for sending HTTP POST requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             *
             * ## **Key Features**
             * - **Executes HTTP POST requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiPost` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a POST request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPost
             * const apiPost = new hison.link.ApiPost("UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a POST request
             * apiPost.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPost.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("POST request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiPost`, providing methods for executing POST requests and managing request events.
             *
             * ## **Typical Use Cases**
             * - **Sending data to a REST API** with structured payloads.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPost: class implements InterfaceApiPost {
                /**
                 * **Creates an instance of `ApiPost`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making POST requests to a specified service command.
                 *
                 * ## **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `serviceCmd`.**
                 *    - If it is missing, an error is thrown (`"Please enter the exact service command."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the POST request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiPost instance without caching
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 *
                 * // Creating an ApiPost instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string, cachingModule: InterfaceCachingModule | null = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
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
                 * - **`hison.setBeforePostRequst((requestData, options) => {})`**
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: InterfaceDataWrapper; response: Response; } | null> => {
                    return this._apiLink.post(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPost.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPost.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPost.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPost.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a POST request.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_POST"` - Triggered when a POST request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPost = new hison.link.ApiPost("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPost.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("POST request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPost.onEventEmit("requestError", (error) => {
                 *     console.error("POST request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('POST', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPut` - A class for handling HTTP PUT requests within the `hison.link` module.**
             *
             * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             *
             * ## **Key Features**
             * - **Executes HTTP PUT requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiPut` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a PUT request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPut
             * const apiPut = new hison.link.ApiPut("UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PUT request
             * apiPut.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPut = new hison.link.ApiPut("UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPut.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PUT request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiPut`, providing methods for executing PUT requests and managing request events.
             *
             * ## **Typical Use Cases**
             * - **Sending data to a REST API** with structured payloads.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPut: class implements InterfaceApiPut {
                /**
                 * **Creates an instance of `ApiPut`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PUT requests to a specified service command.
                 *
                 * ## **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `serviceCmd`.**
                 *    - If it is missing, an error is thrown (`"Please enter the exact service command."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the PUT request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiPut instance without caching
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 *
                 * // Creating an ApiPut instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPut = new hison.link.ApiPut("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string, cachingModule: InterfaceCachingModule | null = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP PUT request to the specified service command.**
                 *
                 * This method sends a PUT request using `ApiLink`, encapsulating request data in a `DataWrapper`
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
                 * - **`hison.setBeforePutRequst((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the PUT request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ## **Event Emission**
                 * - **`"requestStarted_PUT"` Event**
                 *   - This event is emitted **before the PUT request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP PUT request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforePutRequst`)** is checked.
                 *   - The **event `"requestStarted_PUT"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforePutRequst = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_PUT" event
                 * apiPut.onEventEmit("requestStarted_PUT", (requestData, options) => {
                 *     console.log("PUT request started with data:", requestData);
                 * });
                 * 
                 * // Sending a PUT request
                 * apiPut.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: InterfaceDataWrapper; response: Response; } | null> => {
                    return this._apiLink.put(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPut.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPut.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPut.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PUT", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPut.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PUT request.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPut = new hison.link.ApiPut("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPut.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PUT request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPut.onEventEmit("requestError", (error) => {
                 *     console.error("PUT request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PUT', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
             *
             * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             *
             * ## **Key Features**
             * - **Executes HTTP PATCH requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a PATCH request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPatch
             * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PATCH request
             * apiPatch.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPatch = new hison.link.ApiPatch("UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PATCH request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiPatch`, providing methods for executing PATCH requests and managing request events.
             *
             * ## **Typical Use Cases**
             * - **Sending data to a REST API** with structured payloads.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPatch: class implements InterfaceApiPatch {
                /**
                 * **Creates an instance of `ApiPatch`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PATCH requests to a specified service command.
                 *
                 * ## **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `serviceCmd`.**
                 *    - If it is missing, an error is thrown (`"Please enter the exact service command."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the PATCH request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiPatch instance without caching
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 *
                 * // Creating an ApiPatch instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPatch = new hison.link.ApiPatch("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string, cachingModule: InterfaceCachingModule | null = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP PATCH request to the specified service command.**
                 *
                 * This method sends a PATCH request using `ApiLink`, encapsulating request data in a `DataWrapper`
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
                 * - **`hison.setBeforePatchRequst((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the PATCH request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ## **Event Emission**
                 * - **`"requestStarted_PATCH"` Event**
                 *   - This event is emitted **before the PATCH request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP PATCH request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforePatchRequst`)** is checked.
                 *   - The **event `"requestStarted_PATCH"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforePatchRequst = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_PATCH" event
                 * apiPatch.onEventEmit("requestStarted_PATCH", (requestData, options) => {
                 *     console.log("PATCH request started with data:", requestData);
                 * });
                 * 
                 * // Sending a PATCH request
                 * apiPatch.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: InterfaceDataWrapper; response: Response; } | null> => {
                    return this._apiLink.patch(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPatch.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPatch.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPatch.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPatch.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PATCH request.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatch = new hison.link.ApiPatch("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PATCH request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPatch.onEventEmit("requestError", (error) => {
                 *     console.error("PATCH request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
                };
            },
            /**
             * **`ApiDelete` - A class for handling HTTP DELETE requests within the `hison.link` module.**
             *
             * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
             * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
             *
             * ## **Key Features**
             * - **Executes HTTP DELETE requests** using `ApiLink`.
             * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiDelete` requires a `serviceCmd` that specifies the business logic endpoint.
             * - The `call()` method sends a DELETE request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiDelete
             * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a DELETE request
             * apiDelete.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiDelete = new hison.link.ApiDelete("UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("DELETE request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiDelete`, providing methods for executing DELETE requests and managing request events.
             *
             * ## **Typical Use Cases**
             * - **Sending data to a REST API** with structured payloads.
             * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiDelete: class implements InterfaceApiDelete {
                /**
                 * **Creates an instance of `ApiDelete`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making DELETE requests to a specified service command.
                 *
                 * ## **Parameters**
                 * - `serviceCmd` *(string, required)* - The **service command** that determines the target business logic on the server.
                 *   - **Example:** `"UserService.createUser"`
                 *   - If no `serviceCmd` is provided, an error is thrown.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `serviceCmd`.**
                 *    - If it is missing, an error is thrown (`"Please enter the exact service command."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `serviceCmd`.**
                 *    - Defines the service endpoint for the DELETE request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiDelete instance without caching
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 *
                 * // Creating an ApiDelete instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiDelete = new hison.link.ApiDelete("UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_serviceCmd`** *(string)* - Stores the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} serviceCmd - The service command defining the target API action.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `serviceCmd` is not provided.
                 */
                constructor(serviceCmd: string, cachingModule: InterfaceCachingModule | null = null) {
                    if (!serviceCmd) throw new Error('Please enter the exact service command.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                /**
                 * **Executes an HTTP DELETE request to the specified service command.**
                 *
                 * This method sends a DELETE request using `ApiLink`, encapsulating request data in a `DataWrapper`
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
                 * - **`hison.setBeforeDeleteRequst((requestData, options) => {})`**
                 *   - A customizable hook executed **before sending the DELETE request**.
                 *   - If it returns `false`, the request is **prevented from execution**.
                 *   - **Use Case:** Validating request parameters, modifying request data dynamically.
                 *
                 * ## **Event Emission**
                 * - **`"requestStarted_DELETE"` Event**
                 *   - This event is emitted **before the DELETE request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
                 * - If the data is not cached, it makes an HTTP DELETE request to `_serviceCmd`.
                 * - Before executing the request:
                 *   - The **before-request hook (`beforeDeleteRequst`)** is checked.
                 *   - The **event `"requestStarted_DELETE"`** is emitted.
                 * - Once the request is completed, the response is returned and optionally stored in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Customizing the before-request hook to modify data before sending
                 * customOption.link.beforeDeleteRequst = (requestData, options) => {
                 *     requestData.putString("timestamp", Date.now().toString());
                 *     return true;
                 * };
                 * 
                 * // Listening to the "requestStarted_DELETE" event
                 * apiDelete.onEventEmit("requestStarted_DELETE", (requestData, options) => {
                 *     console.log("DELETE request started with data:", requestData);
                 * });
                 * 
                 * // Sending a DELETE request
                 * apiDelete.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: InterfaceDataWrapper; response: Response; } | null> => {
                    return this._apiLink.delete(requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the API controller path.**
                 *
                 * This method retrieves only the headers from the API without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
                 * - The response body is **not** included in the result; only headers are returned.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiDelete.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiDelete.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(customOption.link.controllerPath, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the API controller path.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the API without performing an actual data operation.
                 * It is useful for checking which HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
                 * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiDelete.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiDelete.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(customOption.link.controllerPath, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a DELETE request.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDelete = new hison.link.ApiDelete("UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("DELETE request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiDelete.onEventEmit("requestError", (error) => {
                 *     console.error("DELETE request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
                };
            },
            /**
             * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
             *
             * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ## **Key Features**
             * - **Executes HTTP GET requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined API resource path.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiGetUrl` requires a valid URL.
             * - The `call()` method triggers a GET request to the specified URL.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiGetUrl without caching
             * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
             * 
             * // Sending a GET request
             * apiGetUrl.call().then(response => {
             *     console.log(response.data); // Response data
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
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
             *
             * ## **Typical Use Cases**
             * - **Fetching data from an external API** by specifying a full URL.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiGetUrl: class implements InterfaceApiGetUrl {
                /**
                 * **Creates an instance of `ApiGetUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making GET requests to a specified URL.
                 *
                 * ## **Parameters**
                 * - `url` *(string, required)* - The full URL to which the GET request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url`.**
                 *    - Defines the endpoint for the GET request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiGetUrl instance without caching
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Creating an ApiGetUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the GET request.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _url: string;
                /**
                 * **Executes an HTTP GET request to the specified URL.**
                 *
                 * This method sends a GET request using `ApiLink.getURL()`, optionally applying caching if a `CachingModule` is provided.
                 * It also **emits a request-start event** (`"requestStarted_GET"`) before execution.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Pre-Request Handling**
                 * - **`"requestStarted_GET"` Event**
                 *   - This event is emitted **before the GET request is executed**.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new GET request is executed, and the response may be stored in the cache.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.getURL(this._url, options)`, which:
                 *   - Emits `"requestStarted_GET"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP GET request to `_url`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Listening to the "requestStarted_GET" event
                 * apiGetUrl.onEventEmit("requestStarted_GET", (url, options) => {
                 *     console.log(`GET request started for: ${url}`);
                 * });
                 * 
                 * // Sending a GET request
                 * apiGetUrl.call().then(response => {
                 *     console.log(response.data); // Response data
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
                 * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<{ data: any; response: Response }>} A promise resolving to the API response.
                 */
                call = (options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
                    return this._apiLink.getURL(this._url, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.head(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Sending a HEAD request
                 * apiGetUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiGetUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.head(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Sending an OPTIONS request
                 * apiGetUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiGetUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(options)`** - Sends a GET request to retrieve full response data.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a GET request to a specified URL.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_GET"` - Triggered when a GET request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"GET"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
                 * 
                 * // Register an event listener for when the request completes
                 * apiGetUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("GET request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiGetUrl.onEventEmit("requestError", (error) => {
                 *     console.error("GET request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(options)`** - Sends a GET request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('GET', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPostUrl` - A class for handling HTTP POST requests to a specified URL.**
             *
             * The `ApiPostUrl` class is responsible for sending HTTP POST requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ## **Key Features**
             * - **Executes HTTP POST requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a POST request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPostUrl
             * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
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
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("POST request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiPostUrl`, which provides methods for executing POST requests to a specific URL.
             *
             * ## **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPostUrl: class implements InterfaceApiPostUrl {
                /**
                 * **Creates an instance of `ApiPostUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making POST requests to a specified URL.
                 *
                 * ## **Parameters**
                 * - `url` *(string, required)* - The full URL to which the POST request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the POST request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiPostUrl instance without caching
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiPostUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the POST request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP POST request to the specified URL with an optional service command.**
                 *
                 * This method sends a POST request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
                 * - **`"requestStarted_POST"` Event**
                 *   - This event is emitted **before the POST request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new POST request is executed, and the response may be stored in the cache.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_POST"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP POST request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_POST" event
                 * apiPostUrl.onEventEmit("requestStarted_POST", (serviceCmd, options, requestData) => {
                 *     console.log(`POST request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a POST request
                 * apiPostUrl.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
                    return this._apiLink.postURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPostUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPostUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPostUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "POST", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPostUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a POST request to a specified URL.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_POST"` - Triggered when a POST request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("POST request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPostUrl.onEventEmit("requestError", (error) => {
                 *     console.error("POST request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('POST', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPutUrl` - A class for handling HTTP PUT requests to a specified URL.**
             *
             * The `ApiPutUrl` class is responsible for sending HTTP PUT requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ## **Key Features**
             * - **Executes HTTP PUT requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a PUT request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPutUrl
             * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
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
             * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PUT request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiPutUrl`, which provides methods for executing PUT requests to a specific URL.
             *
             * ## **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPutUrl: class implements InterfaceApiPutUrl {
                /**
                 * **Creates an instance of `ApiPutUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PUT requests to a specified URL.
                 *
                 * ## **Parameters**
                 * - `url` *(string, required)* - The full URL to which the PUT request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the PUT request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiPutUrl instance without caching
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiPutUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the PUT request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP PUT request to the specified URL with an optional service command.**
                 *
                 * This method sends a PUT request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
                 * - **`"requestStarted_PUT"` Event**
                 *   - This event is emitted **before the PUT request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new PUT request is executed, and the response may be stored in the cache.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_PUT"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP PUT request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_PUT" event
                 * apiPutUrl.onEventEmit("requestStarted_PUT", (serviceCmd, options, requestData) => {
                 *     console.log(`PUT request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a PUT request
                 * apiPutUrl.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
                    return this._apiLink.putURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPutUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPutUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPutUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PUT", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPutUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PUT request to a specified URL.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PUT request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPutUrl.onEventEmit("requestError", (error) => {
                 *     console.error("PUT request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PUT', eventName, eventFunc);
                };
            },
            /**
             * **`ApiPatchUrl` - A class for handling HTTP PATCH requests to a specified URL.**
             *
             * The `ApiPatchUrl` class is responsible for sending HTTP PATCH requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ## **Key Features**
             * - **Executes HTTP PATCH requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a PATCH request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiPatchUrl
             * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a PATCH request
             * apiPatchUrl.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("PATCH request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiPatchUrl`, which provides methods for executing PATCH requests to a specific URL.
             *
             * ## **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiPatchUrl: class implements InterfaceApiPatchUrl {
                /**
                 * **Creates an instance of `ApiPatchUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making PATCH requests to a specified URL.
                 *
                 * ## **Parameters**
                 * - `url` *(string, required)* - The full URL to which the PATCH request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the PATCH request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiPatchUrl instance without caching
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiPatchUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the PATCH request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP PATCH request to the specified URL with an optional service command.**
                 *
                 * This method sends a PATCH request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
                 * - **`"requestStarted_PATCH"` Event**
                 *   - This event is emitted **before the PATCH request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new PATCH request is executed, and the response may be stored in the cache.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_PATCH"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP PATCH request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_PATCH" event
                 * apiPatchUrl.onEventEmit("requestStarted_PATCH", (serviceCmd, options, requestData) => {
                 *     console.log(`PATCH request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a PATCH request
                 * apiPatchUrl.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
                    return this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiPatchUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiPatchUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiPatchUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "PATCH", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiPatchUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a PATCH request to a specified URL.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("PATCH request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiPatchUrl.onEventEmit("requestError", (error) => {
                 *     console.error("PATCH request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('PATCH', eventName, eventFunc);
                };
            },
            /**
             * **`ApiDeleteUrl` - A class for handling HTTP DELETE requests to a specified URL.**
             *
             * The `ApiDeleteUrl` class is responsible for sending HTTP DELETE requests to a provided URL.
             * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
             *
             * ## **Key Features**
             * - **Executes HTTP DELETE requests** using `ApiLink`.
             * - **Accepts a direct URL** instead of using a predefined service command.
             * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
             * - **Supports response caching** via an optional `CachingModule`.
             * - **Emits request lifecycle events** using `EventEmitter`.
             * - **Allows event listeners** for monitoring request execution.
             *
             * ## **How It Works**
             * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
             * - The `call()` method sends a DELETE request with the provided request data.
             * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
             * - Event listeners can be attached to monitor the request lifecycle.
             *
             * ## **Example Usage**
             * ```typescript
             * // Creating an instance of ApiDeleteUrl
             * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
             *
             * // Creating request data
             * const requestData = new hison.data.DataWrapper();
             * requestData.putString("username", "Alice");
             * 
             * // Sending a DELETE request
             * apiDeleteUrl.call(requestData).then(response => {
             *     console.log(response.data); // Response data
             * });
             *
             * // Creating an instance with caching
             * const cachingModule = new hison.link.CachingModule(20);
             * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
             *
             * // Handling request events
             * cachedApiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
             *     console.log("DELETE request completed!", data);
             * });
             * ```
             *
             * ## **Internal Components**
             * - **`ApiLink`**: Handles request execution and response processing.
             * - **`EventEmitter`**: Manages event-driven request handling.
             * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
             *
             * ## **Return Value**
             * - This class returns an instance of `ApiDeleteUrl`, which provides methods for executing DELETE requests to a specific URL.
             *
             * ## **Typical Use Cases**
             * - **Sending data to an external API** using a full URL.
             * - **Passing a `serviceCmd` for structured request routing**.
             * - **Using cached responses** to reduce redundant API calls.
             * - **Handling event-driven request monitoring** via `onEventEmit`.
             */
            ApiDeleteUrl: class implements InterfaceApiDeleteUrl {
                /**
                 * **Creates an instance of `ApiDeleteUrl`, initializing API request handling with optional caching.**
                 *
                 * The constructor sets up the **API request configuration** and **event handling mechanisms** 
                 * required for making DELETE requests to a specified URL.
                 *
                 * ## **Parameters**
                 * - `url` *(string, required)* - The full URL to which the DELETE request will be sent.
                 *   - If no `url` is provided, an error is thrown (`"Please enter the request URL."`).
                 * - `serviceCmd` *(optional, string)* - A **service command** that can be used to specify 
                 *   business logic on the server.
                 *   - **Default:** `''` (empty string)
                 *   - If provided, this is included in the request payload for structured routing.
                 * - `cachingModule` *(optional, CachingModule)* - A caching module to store and retrieve API responses.
                 *   - If provided, responses may be retrieved from the cache instead of making a new request.
                 *
                 * ## **Initialization Process**
                 * 1. **Validates the `url`.**
                 *    - If it is missing, an error is thrown (`"Please enter the request URL."`).
                 * 2. **Checks if a valid `CachingModule` is provided.**
                 *    - If caching is enabled, `_cachingModule` is assigned.
                 * 3. **Creates an `EventEmitter` instance.**
                 *    - This allows event-driven request monitoring (e.g., request completed, error occurred).
                 * 4. **Instantiates an `ApiLink` instance.**
                 *    - Handles actual request execution and response processing.
                 * 5. **Stores the `url` and `serviceCmd`.**
                 *    - Defines the endpoint and optional service command for the DELETE request.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * // Creating an ApiDeleteUrl instance without caching
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 *
                 * // Creating an ApiDeleteUrl instance with caching
                 * const cachingModule = new hison.link.CachingModule(20);
                 * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
                 * ```
                 *
                 * ## **Related Properties**
                 * - **`_url`** *(string)* - Stores the URL for the request.
                 * - **`_serviceCmd`** *(string)* - Specifies the service command for request routing.
                 * - **`_cachingModule`** *(CachingModule | null)* - Manages response caching.
                 * - **`_eventEmitter`** *(EventEmitter)* - Handles event-based request monitoring.
                 * - **`_apiLink`** *(ApiLink)* - Executes and processes the API request.
                 *
                 * @param {string} url - The full URL for the DELETE request.
                 * @param {string} [serviceCmd=''] - An optional service command for structured request routing.
                 * @param {CachingModule} [cachingModule=null] - An optional caching module.
                 * @throws {Error} If `url` is not provided.
                 */
                constructor(url: string, serviceCmd: string = '', cachingModule: InterfaceCachingModule | null = null) {
                    if (!url) throw new Error('Please enter the request URL.');
                    if (cachingModule && cachingModule.getIsCachingModule && cachingModule.getIsCachingModule()) this._cachingModule = cachingModule;
                    this._eventEmitter = new EventEmitter();
                    this._apiLink = new ApiLink(this._eventEmitter, this._cachingModule);
                    this._url = url;
                    this._serviceCmd = serviceCmd;
                };
                private _cachingModule: InterfaceCachingModule | null = null;
                private _eventEmitter: EventEmitter;
                private _apiLink: ApiLink;
                private _serviceCmd: string;
                private _url: string;
                /**
                 * **Executes an HTTP DELETE request to the specified URL with an optional service command.**
                 *
                 * This method sends a DELETE request using `ApiLink.postURL()`, encapsulating request data in a `DataWrapper`
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
                 * - **`"requestStarted_DELETE"` Event**
                 *   - This event is emitted **before the DELETE request is executed**.
                 *   - It includes the `serviceCmd`, request options, and request data.
                 *   - Can be used for logging, request tracking, or debugging.
                 *
                 * ## **Caching Mechanism**
                 * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
                 * - If cached data is found, it is returned **without making a new network request**.
                 * - If no cached data exists, a new DELETE request is executed, and the response may be stored in the cache.
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing:
                 *   - `data` *(any)* - The API response data.
                 *   - `response` *(Response)* - The original HTTP response object.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
                 *   - Emits `"requestStarted_DELETE"` before making the request.
                 *   - Checks if the requested data is cached and returns it if available.
                 *   - If not cached, makes an HTTP DELETE request to `_url` with the provided `serviceCmd`.
                 *   - Returns the response and optionally stores it in the cache.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Creating request data
                 * const requestData = new hison.data.DataWrapper();
                 * requestData.putString("username", "Alice");
                 * 
                 * // Listening to the "requestStarted_DELETE" event
                 * apiDeleteUrl.onEventEmit("requestStarted_DELETE", (serviceCmd, options, requestData) => {
                 *     console.log(`DELETE request started for service: ${serviceCmd}`, requestData);
                 * });
                 * 
                 * // Sending a DELETE request
                 * apiDeleteUrl.call(requestData).then(response => {
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
                call = (requestData: any, options: Record<string, any> = {}): Promise<{ data: any; response: Response; } | null> => {
                    return this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options);
                };
                /**
                 * **Sends an HTTP HEAD request to the specified URL.**
                 *
                 * This method retrieves only the headers from the specified URL without downloading the response body.
                 * It is useful for checking metadata such as content type, content length, and caching information.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.headURL(this._url, options)`, which:
                 *   - Sends an HTTP HEAD request to `_url`.
                 *   - Extracts and returns the response headers.
                 *   - Does **not** include the response body.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending a HEAD request
                 * apiDeleteUrl.head().then(headers => {
                 *     console.log(headers["content-type"]); // e.g., "application/json"
                 * });
                 *
                 * // Sending a HEAD request with additional headers
                 * apiDeleteUrl.head({ headers: { "Authorization": "Bearer token" } }).then(headers => {
                 *     console.log(headers);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`options(options)`** - Sends an OPTIONS request to check allowed HTTP methods.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<Record<string, string>>} A promise resolving to an object containing response headers.
                 */
                head = (options: Record<string, any> = {}): Promise<Record<string, string>> => {
                    return this._apiLink.headURL(this._url, options);
                };
                /**
                 * **Sends an HTTP OPTIONS request to the specified URL.**
                 *
                 * This method retrieves the list of allowed HTTP methods for the specified URL 
                 * without performing an actual data operation. It is useful for checking which 
                 * HTTP methods are permitted for a specific endpoint.
                 *
                 * ## **Parameters**
                 * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
                 *   - **Default:** `{}` (empty object)
                 *
                 * ## **Return Value**
                 * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
                 *
                 * ## **Behavior**
                 * - Calls `this._apiLink.options(this._url, options)`, which:
                 *   - Sends an HTTP OPTIONS request to `_url`.
                 *   - Extracts the `Allow` header from the response.
                 *   - Parses and returns the list of permitted HTTP methods.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Sending an OPTIONS request
                 * apiDeleteUrl.options().then(allowedMethods => {
                 *     console.log(allowedMethods); // e.g., ["GET", "DELETE", "OPTIONS"]
                 * });
                 *
                 * // Sending an OPTIONS request with additional headers
                 * apiDeleteUrl.options({ headers: { "Authorization": "Bearer token" } }).then(allowedMethods => {
                 *     console.log(allowedMethods);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request to execute an API operation.
                 * - **`head(options)`** - Sends a HEAD request to retrieve response headers.
                 *
                 * @param {Record<string, any>} [options={}] - Additional request options.
                 * @returns {Promise<string[]>} A promise resolving to an array of allowed HTTP methods.
                 */
                options = (options: Record<string, any> = {}): Promise<string[]> => {
                    return this._apiLink.options(this._url, options);
                };
                /**
                 * **Registers an event listener for API request lifecycle events.**
                 *
                 * This method allows attaching a callback function to be executed when a specified event 
                 * occurs during the execution of a DELETE request to a specified URL.
                 *
                 * ## **Parameters**
                 * - `eventName` *(string, required)* - The name of the event to listen for.
                 * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
                 *
                 * ## **Supported Events**
                 * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
                 * - `"requestCompleted_Response"` - Triggered when the API response is received.
                 * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
                 * - `"requestError"` - Triggered when an error occurs during the request.
                 *
                 * ## **Behavior**
                 * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
                 * - The provided `eventFunc` is executed whenever the specified event is emitted.
                 *
                 * ## **Example Usage**
                 * ```typescript
                 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.createUser");
                 * 
                 * // Register an event listener for when the request completes
                 * apiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
                 *     console.log("DELETE request completed!", data);
                 * });
                 * 
                 * // Register an event listener for request errors
                 * apiDeleteUrl.onEventEmit("requestError", (error) => {
                 *     console.error("DELETE request failed:", error);
                 * });
                 * ```
                 *
                 * ## **Related Methods**
                 * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
                 *
                 * @param {string} eventName - The name of the event to listen for.
                 * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
                 */
                onEventEmit = (eventName: string, eventFunc: (...args: any[]) => void) => {
                    this._apiLink.onEventEmit('DELETE', eventName, eventFunc);
                };
            },
        };
    };
    
    const customOption = new CustomOption();
    const hison = new HisonCore();
    return {
        setDateFormat(str: string) {customOption.utils.dateFormat = str;},
        setTimeFormat(str: string) {customOption.utils.timeFormat = str;},
        setDatetimeFormat(str: string) {customOption.utils.datetimeFormat = str;},
        setYearFormat(str: string) {customOption.utils.yearFormat = str;},
        setMonthFormat(str: string) {customOption.utils.monthFormat = str;},
        setMonthNameFormat(str: string) {customOption.utils.monthNameFormat = str;},
        setYearMonthFormat(str: string) {customOption.utils.yearMonthFormat = str;},
        setDayFormat(str: string) {customOption.utils.dayFormat = str;},
        setDayOfWeekFormat(str: string) {customOption.utils.dayOfWeekFormat = str;},
        setHourFormat(str: string) {customOption.utils.hourFormat = str;},
        setHourMinuteFormat(str: string) {customOption.utils.hourMinuteFormat = str;},
        setMinuteFormat(str: string) {customOption.utils.minuteFormat = str;},
        setSecondFormat(str: string) {customOption.utils.secondFormat = str;},
        setNumberFormat(str: string) {customOption.utils.numberFormat = str;},
        setCharByteLess2047(num: number) {customOption.utils.LESSOREQ_0X7FF_BYTE = num;},
        setCharByteLess65535(num: number) {customOption.utils.LESSOREQ_0XFFFF_BYTE = num;},
        setCharByteGreater65535(num: number) {customOption.utils.GREATER_0XFFFF_BYTE = num;},
        getDateFormat(): string {return customOption.utils.dateFormat;},
        getTimeFormat(): string {return customOption.utils.timeFormat;},
        getDatetimeFormat(): string {return customOption.utils.datetimeFormat;},
        getYearFormat(): string {return customOption.utils.yearFormat;},
        getMonthFormat(): string {return customOption.utils.monthFormat;},
        getMonthNameFormat(): string {return customOption.utils.monthNameFormat;},
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
        getShieldURL(): string {return customOption.shield.shieldURL;},
        getExposeIpList(): string[] {return customOption.shield.exposeIpList;},
        getIsFreeze(): boolean {return customOption.shield.isFreeze;},
        getIsPossibleGoBack(): boolean {return customOption.shield.isPossibleGoBack;},
        getIsPossibleOpenDevTool(): boolean {return customOption.shield.isPossibleOpenDevTool;},
        setConvertValue(func: ConvertValue) {customOption.data.convertValue = func;},
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
        setBeforeGetRequst(func: BeforeGetRequst) {customOption.link.beforeGetRequst = func;},
        setBeforePostRequst(func: BeforePostRequst) {customOption.link.beforePostRequst = func},
        setBeforePutRequst(func: BeforePutRequst) {customOption.link.beforePutRequst = func},
        setBeforePatchRequst(func: BeforePatchRequst) {customOption.link.beforePatchRequst = func},
        setBeforeDeleteRequst(func: BeforeDeleteRequst) {customOption.link.beforeDeleteRequst = func},
        setInterceptApiResult(func: InterceptApiResult) {customOption.link.interceptApiResult = func},
        setInterceptApiError(func: InterceptApiError) {customOption.link.interceptApiError = func},
        utils : {
            isAlpha(str: string): boolean { return hison.utils.isAlpha(str) },
            isAlphaNumber(str: string): boolean { return hison.utils.isAlphaNumber(str) },
            isNumber(str: string): boolean { return hison.utils.isNumber(str) },
            isNumberSymbols(str: string): boolean { return hison.utils.isNumberSymbols(str) },
            isIncludeSymbols(str: string): boolean { return hison.utils.isIncludeSymbols(str) },
            isLowerAlpha(str: string): boolean { return hison.utils.isLowerAlpha(str) },
            isLowerAlphaAndNumber(str: string): boolean { return hison.utils.isLowerAlphaAndNumber(str) },
            isUpperAlpha(str: string): boolean { return hison.utils.isUpperAlpha(str) },
            isUpperAlphaNumber(str: string): boolean { return hison.utils.isUpperAlphaNumber(str) },
            isNumeric(num: any): boolean { return hison.utils.isNumeric(num) },
            isInteger(num: any): boolean { return hison.utils.isInteger(num) },
            isPositiveInteger(num: any): boolean { return hison.utils.isPositiveInteger(num) },
            isNegativeInteger(num: any): boolean { return hison.utils.isNegativeInteger(num) },
            isArray(arr: any): boolean { return hison.utils.isArray(arr) },
            isObject(obj: any): boolean { return hison.utils.isObject(obj) },
            isDate(date: DateObject | string): boolean { return hison.utils.isDate(date) },
            isTime(time: TimeObject | string): boolean { return hison.utils.isTime(time) },
            isDatetime(datetime: DateTimeObject | string): boolean { return hison.utils.isDatetime(datetime) },
            isEmail(str: string): boolean { return hison.utils.isEmail(str) },
            isURL(str: string): boolean { return hison.utils.isURL(str) },
            isValidMask(str: string, mask: string): boolean { return hison.utils.isValidMask(str, mask) },
            getDateObject(date: Date | string): DateObject { return hison.utils.getDateObject(date) },
            getTimeObject(time: Date | string): TimeObject { return hison.utils.getTimeObject(time) },
            getDatetimeObject(datetime: Date | string): DateTimeObject | null { return hison.utils.getDatetimeObject(datetime) },
            addDate(datetime: DateTimeObject | DateObject | string, addValue?: string | number, addType?: string, format?: string): DateTimeObject | string { return hison.utils.addDate(datetime, addValue, addType, format) },
            getDateDiff(datetime1: DateTimeObject | DateObject | string, datetime2: DateTimeObject | DateObject | string, diffType?: string): number { return hison.utils.getDateDiff(datetime1, datetime2, diffType) },
            getMonthName(month: number | string, isFullName?: boolean): string { return hison.utils.getMonthName(month, isFullName) },
            getDateWithFormat(datetime: DateTimeObject | DateObject | string, format?: string): string { return hison.utils.getDateWithFormat(datetime, format) },
            getDayOfWeek(date: DateObject | string, dayType?: string): string { return hison.utils.getDayOfWeek(date, dayType) },
            getLastDay(date: DateObject | string): number { return hison.utils.getLastDay(date) },
            getSysYear(format?: string): string { return hison.utils.getSysYear(format) },
            getSysMonth(format?: string): string { return hison.utils.getSysMonth(format) },
            getSysYearMonth(format?: string): string { return hison.utils.getSysYearMonth(format) },
            getSysDay(format?: string): string { return hison.utils.getSysDay(format) },
            getSysDayOfWeek(format?: string): string { return hison.utils.getSysDayOfWeek(format) },
            getSysHour(format?: string): string { return hison.utils.getSysHour(format) },
            getSysHourMinute(format?: string): string { return hison.utils.getSysHourMinute(format) },
            getSysMinute(format?: string): string { return hison.utils.getSysMinute(format) },
            getSysSecond(format?: string): string { return hison.utils.getSysSecond(format) },
            getSysTime(format?: string): string { return hison.utils.getSysTime(format) },
            getSysDate(format?: string): string { return hison.utils.getSysDate(format) },
            getCeil(num: number, precision?: number): number { return hison.utils.getCeil(num, precision) },
            getFloor(num: number, precision?: number): number { return hison.utils.getFloor(num, precision) },
            getRound(num: number, precision?: number): number { return hison.utils.getRound(num, precision) },
            getTrunc(num: number, precision?: number): number { return hison.utils.getTrunc(num, precision) },
            getByteLength(str: string): number { return hison.utils.getByteLength(str) },
            getCutByteLength(str: string, cutByte: number): string { return hison.utils.getCutByteLength(str, cutByte) },
            getStringLenForm(str: string, length: number): string { return hison.utils.getStringLenForm(str, length) },
            getLpad(str: string, padStr: string, length: number): string { return hison.utils.getLpad(str, padStr, length) },
            getRpad(str: string, padStr: string, length: number): string { return hison.utils.getRpad(str, padStr, length) },
            getTrim(str: string): string { return hison.utils.getTrim(str, ) },
            getReplaceAll(str: string, targetStr: string, replaceStr?: string): string { return hison.utils.getReplaceAll(str, targetStr, replaceStr) },
            getNumberFormat(value: number, format?: string): string { return hison.utils.getNumberFormat(value, format) },
            getRemoveExceptNumbers(str: string): string { return hison.utils.getRemoveExceptNumbers(str) },
            getRemoveNumbers(str: string): string { return hison.utils.getRemoveNumbers(str) },
            getReverse(str: string): string { return hison.utils.getReverse(str) },
            getToBoolean(value: any): boolean { return hison.utils.getToBoolean(value) },
            getToNumber(value: any, impossibleValue?: number): number { return hison.utils.getToNumber(value, impossibleValue) },
            getToFloat(value: any, impossibleValue?: number): number { return hison.utils.getToFloat(value, impossibleValue) },
            getToInteger(value: any, impossibleValue?: number): number { return hison.utils.getToInteger(value, impossibleValue) },
            getToString(str: any, impossibleValue?: string): string { return hison.utils.getToString(str, impossibleValue) },
            nvl(val: any, defaultValue: any): any { return hison.utils.nvl(val, defaultValue) },
            getFileExtension(str: string): string { return hison.utils.getFileExtension(str) },
            getFileName(str: string): string { return hison.utils.getFileName(str) },
            getDecodeBase64(str: string): string { return hison.utils.getDecodeBase64(str) },
            getEncodeBase64(str: string): string { return hison.utils.getEncodeBase64(str) },
            deepCopyObject(object: any, visited?: { source: any, copy: any }[]): any { return hison.utils.deepCopyObject(object, visited) },
        },
        shield : {
            isHison: true,
            excute(hison: Hison) { hison.shield.excute(hison) },
        },
        data: hison.data,
        link: hison.link,
    }
}

export default createHison();
