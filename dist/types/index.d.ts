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
 * ### Core Modules
 *
 * The `Hison` solution consists of the following primary components:
 *
 * - **hison.utils**: Provides various utility functions for data validation, formatting, and conversion.
 * - **hison.shield**: Implements security measures, including access control and developer tool restrictions.
 * - **hison.data**: Offers structured storage and transformation via `DataWrapper` and `DataModel`.
 * - **hison.link**: Enables promise-based communication and API request handling.
 *
 * ---
 * ### Object Creation and Encapsulation
 * - The `Hison` object is instantiated via the `createHison()` function, encapsulating its implementation within a closure.
 * - This design pattern ensures that internal states remain private while exposing necessary functionalities.
 * - The returned object includes a set of methods that allow developers to interact with `Hison` safely and efficiently.
 *
 * ---
 * ### Customization and Configuration
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
 * ### Security Features
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
 * ### Utility Functions (`hison.utils`)
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
 * ### Data Handling (`hison.data`)
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
 * ### API Communication (`hison.link`)
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
 * ### Summary
 *
 * The `Hison` object provides a robust and flexible framework for managing configurations, security, utilities, structured data, and communication.
 * It is designed to improve development efficiency while offering customization and security controls.
 */
export interface Hison {
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
     * - **`convertValue`**: Defines a function for transforming special values.
     *   - Default: Returns the value unchanged.
     *   - Used in `DataModel._deepCopy()` to handle non-plain objects.
     *
     * ### Example Usage:
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
     * ### Notes:
     * 1. Special values not processed by `convertValue` are stored in the `DataModel` as references.
     *    Changes to the original object will also reflect in the `DataModel`.
     * 2. Ensure the function returns the original value for all cases not explicitly handled.
     *    This prevents unexpected `undefined` values in the `DataModel`.
     *
     * @param func The function used to transform values before they are stored in `DataModel`.
     */
    setConvertValue(func: ConvertValue): void;
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * ### Related Property
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
     * - Default value: `'/hison-websocket-endpoint'`
     * - Example usage: `setWebSocketEndPoint("/ws/data-stream");` (Changes the WebSocket endpoint)
     *
     * ### Related Property
     * - **`webSocketEndPoint`**: Defines the default WebSocket endpoint for API communication.
     *   - Default: `'/hison-websocket-endpoint'`
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
     * ### Related Property
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
     * ### Related Property
     * - **`beforeGetRequst`**: A hook function executed before a `GET` request.
     *   - Default: Returns `true`
     *   - Used in `ApiGet.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
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
     * ### Related Property
     * - **`beforePostRequst`**: A hook function executed before a `POST` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPost.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
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
     * ### Related Property
     * - **`beforePutRequst`**: A hook function executed before a `PUT` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPut.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
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
     * ### Related Property
     * - **`beforePatchRequst`**: A hook function executed before a `PATCH` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPatch.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
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
     * ### Related Property
     * - **`beforeDeleteRequst`**: A hook function executed before a `DELETE` request.
     *   - Default: Returns `true`
     *   - Used in `ApiDelete.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
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
     * ### Related Property
     * - **`interceptApiResult`**: A hook function executed after receiving an API response.
     *   - Default: Returns `true`
     *   - Used in `ApiLink._request()` to determine if the response should be processed.
     *
     * ### Example Usage:
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
     * ### Related Property
     * - **`interceptApiError`**: A hook function executed when an API request encounters an error.
     *   - Default: Returns `true`
     *   - Used in `ApiLink._request()` to determine if the error should be processed.
     *
     * ### Example Usage:
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
    /**
     * Provides a collection of utility functions for validation, formatting, and data manipulation within `Hison`.
     *
     * The `utils` module includes a wide range of helper functions designed to simplify working with strings, numbers,
     * dates, and structured data. Additionally, it integrates with `CustomOption`, allowing developers to customize
     * key configurations such as date formats, numeric precision, and byte encoding rules.
     *
     * ---
     * ### Core Features & Functionality
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
     * ### Integration with `CustomOption`
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
     * ### Related Utility Methods
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
        isAlpha(str: string): boolean;
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
        isAlphaNumber(str: string): boolean;
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
        isNumber(str: string): boolean;
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
        isNumberSymbols(str: string): boolean;
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
        isIncludeSymbols(str: string): boolean;
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
        isLowerAlpha(str: string): boolean;
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
        isLowerAlphaAndNumber(str: string): boolean;
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
        isUpperAlpha(str: string): boolean;
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
        isUpperAlphaNumber(str: string): boolean;
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
        deepCopyObject(object: any, visited?: {
            source: any;
            copy: any;
        }[]): any;
    };
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
     * ### Security Features & Execution Flow
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
     * ### Related Methods
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
     * ### Core Features
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
     * ### Example Usage
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
     * ### Related Functions
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
         * ### Core Features:
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
         * ### Data Integrity & Deep Copying:
         * - Uses `hison.utils.deepCopyObject()` to ensure stored objects are immutable.
         * - Prevents unintended modifications by returning cloned values.
         *
         * ### Example Usage:
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
        DataWrapper: new <T>(keyOrObject?: Record<string, InterfaceDataModel<T> | string> | string, value?: InterfaceDataModel<T> | string) => InterfaceDataWrapper;
        /**
         * The `InterfaceDataModel<T>` interface defines the structure for managing tabular data within the `hisondev` solution.
         * It is designed to store, manipulate, and retrieve data efficiently while ensuring type consistency and validation.
         *
         * ### Generic Type `<T>`
         * - `T` represents the shape of each row in the `DataModel`.
         * - By specifying `T`, developers can enforce type safety for row values.
         * - If no type is provided, `T` defaults to `Record<string, any>`, allowing dynamic structures.
         *
         * ### Core Features:
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
         *   - Enables deep copying of the entire `DataModel<T>`.
         *   - Provides `getSerialized()` to retrieve a JSON string of the model.
         * - **Integration with `DataWrapper`**
         *   - `DataWrapper` is an instance for storing `DataModel<T>`.
         *
         * ### Data Consistency and Validation:
         * - Uses `_deepCopy()` to ensure stored objects are immutable.
         * - Prevents invalid data types using `_getValidRowValue()`.
         * - Ensures uniform column data types to maintain consistency.
         *
         * ### Example Usage:
         * ```typescript
         * interface User {
         *     id: number;
         *     name: string;
         *     age: number;
         * }
         *
         * // Creating a DataModel with a defined type
         * const dataModel: InterfaceDataModel<User> = new hison.data.DataModel<User>([
         *     { id: 1, name: "Alice", age: 25 },
         *     { id: 2, name: "Bob", age: 30 }
         * ]);
         *
         * // Add a new column (TypeScript enforces type constraints)
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
         * ### Related Functions:
         * - `hison.setConvertValue()`: Sets the conversion logic for special values before insertion.
         */
        DataModel: new <T extends Record<string, any> = Record<string, any>>(data?: T[] | T) => InterfaceDataModel<T>;
    };
    /**
     * The `hison.link` object provides core communication modules for interacting with the hisondev platform.
     * It serves as a central hub for API requests, caching, and WebSocket communication.
     *
     * ### Key Components
     * - **`CachingModule`**: Manages API response caching using an LRU (Least Recently Used) strategy.
     * - **`ApiGet`, `ApiPost`, `ApiPut`, `ApiPatch`, `ApiDelete`**: Handle REST API calls by encapsulating request logic.
     * - **`ApiGetUrl`, `ApiPostUrl`, `ApiPutUrl`, `ApiPatchUrl`, `ApiDeleteUrl`**: Similar to the above, but allow direct URL-based requests.
     *
     * These components simplify API integration and provide caching and event-driven request handling.
     *
     * ### How It Works
     * - **API requests are wrapped in `DataWrapper` instances**, which store key-value data.
     * - **The `cmd` property in `DataWrapper` determines the service path**, directing the request to the appropriate business logic on the server.
     * - **`CachingModule` enables response caching**, reducing redundant network calls for frequently accessed resources.
     * - **`EventEmitter` allows developers to listen for request events**, such as completion, errors, or specific triggers.
     *
     * ### Example Usage
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
     * ### Internal Structure
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
        CachingModule: new (cachingLimit?: number) => InterfaceCachingModule;
        /**
         * **`ApiGet` - A class for handling HTTP GET requests within the `hison.link` module.**
         *
         * The `ApiGet` class is responsible for sending HTTP GET requests to a specified API resource.
         * It integrates with `ApiLink` to handle request execution, event emissions, and optional response caching.
         *
         * ### **Key Features**
         * - **Executes HTTP GET requests** using `ApiLink`.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows setting event listeners** for request completion, errors, and other key events.
         *
         * ### **How It Works**
         * - When instantiated, `ApiGet` stores the API resource path and an optional `CachingModule` instance.
         * - The `call()` method triggers a GET request to the specified resource path.
         * - If caching is enabled, previously stored responses may be returned instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-based request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiGet`, which provides methods for executing GET requests and managing request events.
         *
         * ### **Typical Use Cases**
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
         * ### **Key Features**
         * - **Executes HTTP POST requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiPost` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a POST request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiPost`, providing methods for executing POST requests and managing request events.
         *
         * ### **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPost: new (serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPost;
        /**
         * **`ApiPut` - A class for handling HTTP PUT requests within the `hison.link` module.**
         *
         * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ### **Key Features**
         * - **Executes HTTP PUT requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiPut` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a PUT request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiPut`, providing methods for executing PUT requests and managing request events.
         *
         * ### **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPut: new (serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPut;
        /**
         * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
         *
         * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ### **Key Features**
         * - **Executes HTTP PATCH requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a PATCH request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiPatch`, providing methods for executing PATCH requests and managing request events.
         *
         * ### **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiPatch: new (serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiPatch;
        /**
         * **`ApiDelete` - A class for handling HTTP DELETE requests within the `hison.link` module.**
         *
         * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
         * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
         *
         * ### **Key Features**
         * - **Executes HTTP DELETE requests** using `ApiLink`.
         * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiDelete` requires a `serviceCmd` that specifies the business logic endpoint.
         * - The `call()` method sends a DELETE request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiDelete`, providing methods for executing DELETE requests and managing request events.
         *
         * ### **Typical Use Cases**
         * - **Sending data to a REST API** with structured payloads.
         * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiDelete: new (serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiDelete;
        /**
         * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
         *
         * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
         * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
         *
         * ### **Key Features**
         * - **Executes HTTP GET requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined API resource path.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiGetUrl` requires a valid URL.
         * - The `call()` method triggers a GET request to the specified URL.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
         *
         * ### **Typical Use Cases**
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
         * ### **Key Features**
         * - **Executes HTTP POST requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a POST request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiPostUrl`, which provides methods for executing POST requests to a specific URL.
         *
         * ### **Typical Use Cases**
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
         * ### **Key Features**
         * - **Executes HTTP PUT requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a PUT request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiPutUrl`, which provides methods for executing PUT requests to a specific URL.
         *
         * ### **Typical Use Cases**
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
         * ### **Key Features**
         * - **Executes HTTP PATCH requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a PATCH request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiPatchUrl`, which provides methods for executing PATCH requests to a specific URL.
         *
         * ### **Typical Use Cases**
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
         * ### **Key Features**
         * - **Executes HTTP DELETE requests** using `ApiLink`.
         * - **Accepts a direct URL** instead of using a predefined service command.
         * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
         * - **Supports response caching** via an optional `CachingModule`.
         * - **Emits request lifecycle events** using `EventEmitter`.
         * - **Allows event listeners** for monitoring request execution.
         *
         * ### **How It Works**
         * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
         * - The `call()` method sends a DELETE request with the provided request data.
         * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
         * - Event listeners can be attached to monitor the request lifecycle.
         *
         * ### **Example Usage**
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
         * ### **Internal Components**
         * - **`ApiLink`**: Handles request execution and response processing.
         * - **`EventEmitter`**: Manages event-driven request handling.
         * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
         *
         * ### **Return Value**
         * - This class returns an instance of `ApiDeleteUrl`, which provides methods for executing DELETE requests to a specific URL.
         *
         * ### **Typical Use Cases**
         * - **Sending data to an external API** using a full URL.
         * - **Passing a `serviceCmd` for structured request routing**.
         * - **Using cached responses** to reduce redundant API calls.
         * - **Handling event-driven request monitoring** via `onEventEmit`.
         */
        ApiDeleteUrl: new (url: string, serviceCmd?: string, cachingModule?: InterfaceCachingModule) => InterfaceApiDeleteUrl;
    };
}
/**
 * Represents a date structure with year, month, and day properties.
 *
 * - `y`: The year (e.g., `2025`).
 * - `M`: The month (`1-12`).
 * - `d`: The day of the month (`1-31`).
 *
 * All properties can be `null` if no value is set.
 */
export interface DateObject {
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
export interface TimeObject {
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
export interface DateTimeObject extends DateObject, TimeObject {
}
/**
 * Enum representing the full names of the months (`January` to `December`).
 *
 * - Values range from `1` to `12`, corresponding to the month number.
 */
export declare enum MonthFullName {
    January = 1,
    February = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12
}
/**
 * Enum representing the abbreviated names of the months (`Jan` to `Dec`).
 *
 * - Values range from `1` to `12`, corresponding to the month number.
 */
export declare enum MonthShortName {
    Jan = 1,
    Feb = 2,
    Mar = 3,
    Apr = 4,
    May = 5,
    Jun = 6,
    Jul = 7,
    Aug = 8,
    Sep = 9,
    Oct = 10,
    Nov = 11,
    Dec = 12
}
/**
 * Enum representing the full English names of the days of the week (`Sunday` to `Saturday`).
 *
 * - Values range from `0` to `6`, where `0 = Sunday`, `1 = Monday`, ..., `6 = Saturday`.
 */
export declare enum DayOfWeekFullName {
    Sun = 0,
    Mon = 1,
    Tue = 2,
    Wed = 3,
    Thu = 4,
    Fri = 5,
    Sat = 6
}
/**
 * Enum representing the abbreviated English names of the days of the week (`Sun` to `Sat`).
 *
 * - Values range from `0` to `6`, where `0 = Sun`, `1 = Mon`, ..., `6 = Sat`.
 */
export declare enum DayOfWeekShortName {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
/**
 * Enum representing the full Korean names of the days of the week (`일요일` to `토요일`).
 *
 * - Values range from `0` to `6`, where `0 = 일요일`, `1 = 월요일`, ..., `6 = 토요일`.
 */
export declare enum DayOfWeekFullNameKR {
    일 = 0,
    월 = 1,
    화 = 2,
    수 = 3,
    목 = 4,
    금 = 5,
    토 = 6
}
/**
 * Enum representing the abbreviated Korean names of the days of the week (`일` to `토`).
 *
 * - Values range from `0` to `6`, where `0 = 일`, `1 = 월`, ..., `6 = 토`.
 */
export declare enum DayOfWeekShortNameKR {
    일요일 = 0,
    월요일 = 1,
    화요일 = 2,
    수요일 = 3,
    목요일 = 4,
    금요일 = 5,
    토요일 = 6
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
export interface ConvertValue {
    (value: any): any;
}
/**
 * The `DataWrapper` class provides a flexible key-value storage container
 * within the `hisondev` solution. It allows storing various data types,
 * including string value and `DataModel` instances.
 *
 * ### Core Features:
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
 * ### Data Integrity & Deep Copying:
 * - Uses `hison.utils.deepCopyObject()` to ensure stored objects are immutable.
 * - Prevents unintended modifications by returning cloned values.
 *
 * ### Example Usage:
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
export interface InterfaceDataWrapper {
    /**
     * Checks whether the current instance is a `DataWrapper`.
     * This method is primarily used for type verification.
     *
     * ### Returns
     * - **`boolean`**: Returns `true` if the instance is a `DataWrapper`, otherwise `false`.
     *
     * ### Example Usage
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
     * ### Implementation Details
     * - Uses `hison.utils.deepCopyObject()` to recursively copy nested objects and arrays.
     * - Supports cloning `DataModel` instances stored within the `DataWrapper`.
     * - Prevents circular references by tracking previously copied objects.
     * - Ensures that modifications in the cloned instance do not affect the original instance.
     *
     * ### Returns
     * - **`DataWrapper`**: A new `DataWrapper` instance containing a deep copy of the original data.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Clears the internal storage by setting `_data` to an empty object.
     * - Returns the same `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after clearing all stored data.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - If a value is a `DataModel`, it is converted to an array of rows using `getRows()`.
     * - Other values are stored as-is.
     * - The final object is serialized into a JSON string.
     *
     * ### Returns
     * - **`string`**: A JSON string representation of the `DataWrapper` contents.
     *
     * ### Example Usage
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
     * ### Generic Type `<T>`
     * - `T` represents the shape of the `DataModel` rows.
     * - If `T` is not specified, it defaults to `Record<string, any>`, allowing dynamic structures.
     *
     * ### Parameters
     * - `key` **(string)**: The key associated with the value to retrieve.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - If the key exists and contains a `DataModel<T>`, returns a deep copy of the stored `DataModel<T>`.
     * - If the key exists but is a string, returns the stored string value.
     * - If the key does not exist, returns `null`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T> | string | null`**:
     *   - A deep copy of the `DataModel<T>` if stored under the key.
     *   - The string value if a string was stored under the key.
     *   - `null` if the key does not exist.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataWrapper = new hison.data.DataWrapper();
     *
     * // Storing a string value
     * dataWrapper.put("message", "Hello");
     * console.log(dataWrapper.get("message")); // Output: "Hello"
     *
     * // Storing a DataModel with a defined type
     * const userModel = new hison.data.DataModel<User>([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     * dataWrapper.put("users", userModel);
     *
     * // Retrieving with type inference
     * const users = dataWrapper.get<User>("users");
     * console.log(users?.getRowCount()); // Output: 2
     * console.log(users?.getValue(0, "name").toUpperCase()); // Output: "ALICE"
     *
     * // Attempting to retrieve a non-existent key
     * console.log(dataWrapper.get("nonExistentKey")); // Output: null
     * ```
     *
     * @param {string} key The key to retrieve the associated value.
     * @returns {InterfaceDataModel<T> | string | null} A deep copy of the stored value, or `null` if the key is not found.
     */
    get<T = Record<string, any>>(key: string): InterfaceDataModel<T> | string | null;
    /**
     * Retrieves the string value associated with the specified key from the `DataWrapper`.
     * Ensures that the retrieved value is explicitly a string before returning it.
     *
     * ### Parameters
     * - `key` **(string)**: The key associated with the string value to retrieve.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if the value associated with `key` is not a string.
     * - Returns the string value if it exists; otherwise, returns `null`.
     *
     * ### Returns
     * - **`string | null`**: The associated string value, or `null` if the key is not found.
     *
     * ### Example Usage
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
     * Retrieves the `DataModel<T>` instance associated with the specified key from the `DataWrapper`.
     * Ensures that the retrieved value is a valid `DataModel<T>` before returning a cloned copy.
     *
     * ### Generic Type `<T>`
     * - `T` represents the shape of each row in the `DataModel<T>`.
     * - If `T` is not specified, it defaults to `Record<string, any>`, allowing dynamic structures.
     *
     * ### Parameters
     * - `key` **(string)**: The key associated with the `DataModel<T>` instance to retrieve.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if the value associated with `key` is not a valid `DataModel<T>` instance.
     * - Returns a deep-cloned copy of the `DataModel<T>` to maintain data integrity.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: A cloned `DataModel<T>` instance retrieved from the `DataWrapper`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const userModel = new hison.data.DataModel<User>([{ id: 1, name: "Alice" }]);
     * const dataWrapper = new hison.data.DataWrapper();
     * dataWrapper.put("users", userModel);
     *
     * // Retrieving with type inference
     * const clonedDataModel = dataWrapper.getDataModel<User>("users");
     * console.log(clonedDataModel.getRowCount()); // Output: 1
     * console.log(clonedDataModel.getValue(0, "name").toUpperCase()); // Output: "ALICE"
     *
     * // Throws an error: "The data does not contain the specified data-model value."
     * console.log(dataWrapper.getDataModel("nonExistentKey"));
     * ```
     *
     * @param {string} key The key associated with the `DataModel<T>` instance.
     * @returns {InterfaceDataModel<T>} A cloned `DataModel<T>` instance retrieved from the `DataWrapper`.
     * @throws {Error} If the key is not a string or if the stored value is not a valid `DataModel<T>`.
     */
    getDataModel<T = Record<string, any>>(key: string): InterfaceDataModel<T>;
    /**
     * Inserts or updates a key-value pair in the `DataWrapper`.
     * Allows storing primitive values, strings, and `DataModel` instances.
     *
     * ### Parameters
     * - `key` **(string)**: The key under which the value will be stored.
     * - `value` **(any)**: The value to be stored. Can be a string, number, boolean, `DataModel`, or other valid types.
     *
     * ### Behavior
     * - Calls the internal `_put()` method to validate and store the value.
     * - If the key already exists, its value is updated.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the value.
     *
     * ### Example Usage
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
     * ### Parameters
     * - `key` **(string)**: The key under which the value will be stored.
     * - `value` **(string | number | boolean | bigint | symbol | null)**: The value to be stored,
     *   restricted to types that can be converted to a string.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if `value` is not of a valid type.
     * - Calls the internal `_put()` method to store the value.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the value.
     *
     * ### Example Usage
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
     * ### Parameters
     * - `key` **(string)**: The key under which the `DataModel` will be stored.
     * - `value` **(`DataModel`)**: The `DataModel` instance to be stored.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Throws an error if `value` is not a valid `DataModel` instance.
     * - Calls the internal `_put()` method to store the `DataModel`.
     * - Returns the current `DataWrapper` instance for method chaining.
     *
     * ### Returns
     * - **`DataWrapper`**: The current instance after inserting/updating the `DataModel`.
     *
     * ### Example Usage
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
     * @param {InterfaceDataModel<any>} value The `DataModel` instance to store.
     * @returns {InterfaceDataWrapper} The current `DataWrapper` instance after insertion.
     * @throws {Error} If `key` is not a string or `value` is not a valid `DataModel`.
     */
    putDataModel(key: string, value: InterfaceDataModel<any>): InterfaceDataWrapper;
    /**
     * Converts the `DataWrapper` instance into a standard JavaScript object.
     * If the stored values include `DataModel` instances, they are converted into object representations.
     *
     * ### Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - If a value is a `DataModel`, it is converted using `getObject()`.
     * - Other values are returned as-is.
     * - Returns a plain JavaScript object representation of the `DataWrapper`.
     *
     * ### Returns
     * - **`Record<string, any>`**: A plain object containing all stored key-value pairs.
     *
     * ### Example Usage
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
     * ### Parameters
     * - `key` **(string)**: The key to check for existence in the `DataWrapper`.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Uses `hasOwnProperty()` to determine if the key exists in the stored data.
     *
     * ### Returns
     * - **`boolean`**: `true` if the key exists, otherwise `false`.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Determines emptiness by checking if the number of stored keys is `0`.
     *
     * ### Returns
     * - **`boolean`**: `true` if the `DataWrapper` contains no data, otherwise `false`.
     *
     * ### Example Usage
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
     * Removes a key-value pair from the `DataWrapper` if the key exists and returns the removed value.
     *
     * ### Parameters
     * - `key` **(string)**: The key to be removed from the `DataWrapper`.
     *
     * ### Behavior
     * - Throws an error if `key` is not a string.
     * - Checks if the key exists using `hasOwnProperty()`.
     * - If the key exists, retrieves the associated value and deletes the key.
     * - Returns the removed value, which can be either a `DataModel` or a `string`.
     * - If the key does not exist, returns `null`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T> | string | null`**:
     *   - The removed value if the key existed.
     *   - `null` if the key was not found in the `DataWrapper`.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: "25" });
     *
     * console.log(dataWrapper.containsKey("name")); // Output: true
     *
     * const removedValue = dataWrapper.remove("name");
     * console.log(removedValue); // Output: "Alice"
     * console.log(dataWrapper.containsKey("name")); // Output: false
     *
     * const nonExistentValue = dataWrapper.remove("nonExistentKey");
     * console.log(nonExistentValue); // Output: null
     * ```
     *
     * @param {string} key The key to remove from the `DataWrapper`.
     * @returns {InterfaceDataModel<T> | string | null} The removed value if it existed, otherwise `null`.
     * @throws {Error} If `key` is not a string.
     */
    remove<T = Record<string, any>>(key: string): InterfaceDataModel<T> | string | null;
    /**
     * Returns the number of key-value pairs stored in the `DataWrapper`.
     *
     * ### Behavior
     * - Counts the number of keys present in the internal data storage.
     *
     * ### Returns
     * - **`number`**: The total number of stored key-value pairs.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Returns a list of all keys currently stored in the `DataWrapper`.
     * - If the `DataWrapper` is empty, returns an empty array.
     *
     * ### Returns
     * - **`string[]`**: An array containing all stored keys.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Iterates through all key-value pairs in the `DataWrapper`.
     * - Uses `hison.utils.deepCopyObject()` to return deep copies of stored values.
     * - If the `DataWrapper` is empty, returns an empty array.
     *
     * ### Returns
     * - **`any[]`**: An array containing deep copies of all stored values.
     *
     * ### Example Usage
     * ```typescript
     * const dataWrapper = new hison.data.DataWrapper({ name: "Alice", age: 25 });
     * console.log(dataWrapper.values()); // Output: ["Alice", 25]
     *
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * dataWrapper.put("users", dataModel);
     * console.log(dataWrapper.values()); // Output: ["Alice", 25, <cloned DataModel>]
     * ```
     *
     * @returns {InterfaceDataModel<any>[] | string[]} An array of deep-copied values stored in the `DataWrapper`.
     */
    values(): InterfaceDataModel<any>[] | string[];
}
/**
 * The `InterfaceDataModel<T>` interface defines the structure for managing tabular data within the `hisondev` solution.
 * It is designed to store, manipulate, and retrieve data efficiently while ensuring type consistency and validation.
 *
 * ### Generic Type `<T>`
 * - `T` represents the shape of each row in the `DataModel`.
 * - By specifying `T`, developers can enforce type safety for row values.
 * - If no type is provided, `T` defaults to `Record<string, any>`, allowing dynamic structures.
 *
 * ### Core Features:
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
 *   - Enables deep copying of the entire `DataModel<T>`.
 *   - Provides `getSerialized()` to retrieve a JSON string of the model.
 * - **Integration with `DataWrapper`**
 *   - `DataWrapper` is an instance for storing `DataModel<T>`.
 *
 * ### Data Consistency and Validation:
 * - Uses `_deepCopy()` to ensure stored objects are immutable.
 * - Prevents invalid data types using `_getValidRowValue()`.
 * - Ensures uniform column data types to maintain consistency.
 *
 * ### Example Usage:
 * ```typescript
 * interface User {
 *     id: number;
 *     name: string;
 *     age: number;
 * }
 *
 * // Creating a DataModel with a defined type
 * const dataModel: InterfaceDataModel<User> = new hison.data.DataModel<User>([
 *     { id: 1, name: "Alice", age: 25 },
 *     { id: 2, name: "Bob", age: 30 }
 * ]);
 *
 * // Add a new column (TypeScript enforces type constraints)
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
 * ### Related Functions:
 * - `hison.setConvertValue()`: Sets the conversion logic for special values before insertion.
 */
export interface InterfaceDataModel<T extends Record<string, any> = Record<string, any>> {
    /**
     * Checks whether the current instance is a `DataModel`.
     * This method is primarily used for type verification.
     *
     * ### Returns
     * - **`boolean`**: Returns `true` if the instance is a `DataModel`, otherwise `false`.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Uses the internal `_rows` data to initialize a new `DataModel` instance.
     * - Ensures that all row data is duplicated to maintain data integrity.
     *
     * ### Returns
     * - **`DataModel`**: A new `DataModel` instance containing a copy of the original rows.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * const clonedModel = dataModel.clone();
     *
     * console.log(clonedModel.getRowCount()); // Output: 1
     * console.log(clonedModel !== dataModel); // Output: true (Cloned instance is independent)
     * ```
     *
     * @returns {InterfaceDataModel<T>} A new `DataModel` instance with a copy of the stored rows.
     */
    clone(): InterfaceDataModel<T>;
    /**
     * Removes all stored rows and columns from the `DataModel`, resetting it to an empty state.
     *
     * ### Behavior
     * - Clears the `_cols` array, removing all column definitions.
     * - Clears the `_rows` array, removing all stored data.
     * - Returns the same `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`DataModel`**: The current instance after clearing all stored data.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
     * console.log(dataModel.getRowCount()); // Output: 1
     *
     * dataModel.clear();
     * console.log(dataModel.getRowCount()); // Output: 0
     * console.log(dataModel.getColumns());  // Output: []
     * ```
     *
     * @returns {InterfaceDataModel<T>} The current `DataModel` instance after clearing all data.
     */
    clear(): InterfaceDataModel<T>;
    /**
     * Serializes the `DataModel` instance into a JSON string representation.
     * Converts the stored row data into a JSON format for easy storage or transmission.
     *
     * ### Behavior
     * - Uses `JSON.stringify()` to serialize the `_rows` array.
     * - Column definitions (`_cols`) are not included in the serialized output.
     *
     * ### Returns
     * - **`string`**: A JSON string representation of the stored row data.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Returns `true` if `_cols` contains at least one column.
     * - Returns `false` if no columns have been defined.
     *
     * ### Returns
     * - **`boolean`**: `true` if columns are defined, otherwise `false`.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Uses `_deepCopy()` to return a copy of `_cols`, ensuring data integrity.
     * - If no columns are defined, returns an empty array.
     *
     * ### Returns
     * - **`string[]`**: An array of column names.
     *
     * ### Example Usage
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
     * ### Parameters
     * - `column` **(K)**: The column name from which to retrieve values.
     *
     * ### Behavior
     * - Throws an error if `column` is not a valid key in `T`.
     * - Throws an error if the specified column does not exist.
     * - Iterates through all rows and extracts the values of the specified column.
     * - Uses `_deepCopy()` to return deep copies of the values.
     * - The return type is inferred as `T[K][]`, maintaining strong type safety.
     *
     * ### Returns
     * - **`T[K][]`**: An array containing all values from the specified column.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: "U1", age: 25 },
     *     { id: "U2", age: 30 }
     * ]);
     *
     * const ids = dataModel.getColumnValues("id");  // Inferred as string[]
     * console.log(ids); // Output: ["U1", "U2"]
     *
     * const ages = dataModel.getColumnValues("age"); // Inferred as number[]
     * console.log(ages); // Output: [25, 30]
     *
     * // Throws an error: "The column does not exist."
     * // console.log(dataModel.getColumnValues("name"));
     * ```
     *
     * @param {K} column The column name from which to retrieve values.
     * @returns {T[K][]} An array of values from the specified column.
     * @throws {Error} If the column is invalid or does not exist.
     */
    getColumnValues<K extends keyof T>(column: K): T[K][];
    /**
     * Adds a new column to the `DataModel`.
     * Ensures that all existing rows include the new column with a default value of `null`.
     *
     * ### Parameters
     * - `column` **(string)**: The name of the column to be added.
     *
     * ### Behavior
     * - Throws an error if `column` is not a valid string.
     * - Calls `_addCol(column)` to validate and add the column.
     * - Iterates through `_rows` and ensures each row includes the new column, assigning `null` if missing.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically added columns.
     * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
     *
     * ### Returns
     * - **`DataModel`**: The current instance after adding the new column.
     *
     * ### Example Usage
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
     * @returns {InterfaceDataModel<T>} The current `DataModel` instance after adding the column.
     * @throws {Error} If the column is invalid or already exists.
     */
    addColumn(column: string): InterfaceDataModel<T>;
    /**
     * Adds multiple new columns to the `DataModel`.
     * Ensures that all existing rows include the newly added columns with a default value of `null`.
     *
     * ### Parameters
     * - `columns` **(string[])**: An array of column names to be added.
     *
     * ### Behavior
     * - Throws an error if `columns` is not an array.
     * - Iterates through the provided column names and calls `_addCol(column)` to validate and add each column.
     * - Ensures that all existing rows include the new columns, assigning `null` if missing.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically added columns.
     * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
     *
     * ### Returns
     * - **`DataModel`**: The current instance after adding the new columns.
     *
     * ### Example Usage
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
     * @returns {InterfaceDataModel<T>} The current `DataModel` instance after adding the columns.
     * @throws {Error} If `columns` is not an array or contains invalid column names.
     */
    addColumns(columns: string[]): InterfaceDataModel<T>;
    /**
     * Sets the same value for all rows in the specified column.
     * If the column does not exist, it is created before assigning values.
     *
     * Supports type safety when `T` is defined, while allowing dynamic usage when `T = Record<string, any>`.
     *
     * ### Parameters
     * - `column` **(K)**: The name of the column to update, constrained to keys of `T` if defined.
     * - `value` **(`T[K]`)**: The value to be assigned to all rows in the specified column.
     *
     * ### Behavior
     * - Throws an error if `value` is `undefined`.
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - If the column does not exist, `_addCol(column)` is called to add it.
     * - Iterates through all rows and assigns the specified value using `_getValidRowValue()`.
     * - Ensures type consistency when `T` is specified.
     * - Allows any column name when `T = Record<string, any>`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The current `DataModel` instance after setting the column values.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     *     status?: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     *
     * // Set the same value for all rows in the "status" column
     * dataModel.setColumnSameValue("status", "active");
     * console.log(dataModel.getColumnValues("status")); // Output: ["active", "active"]
     *
     * // If the column does not exist, it is created automatically
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "status"]
     *
     * // With default `Record<string, any>`, dynamic columns can be added without strict typing
     * const flexibleModel = new hison.data.DataModel();
     * flexibleModel.setColumnSameValue("newField", 123);
     * ```
     *
     * @param {K} column The name of the column to set the value for.
     * @param {T[K]} value The value to assign to all rows in the column.
     * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after updating the column.
     * @throws {Error} If `value` is `undefined` or if the column name is invalid.
     */
    setColumnSameValue<K extends keyof T>(column: K, value: T[K]): InterfaceDataModel<T>;
    /**
     * Applies a formatting function to all values in the specified column.
     * Ensures type safety when `T` is specified, while maintaining flexibility for dynamic structures.
     *
     * ### Parameters
     * - `column` **(K)**: The name of the column to format, constrained to keys of `T` if defined.
     * - `formatter` **(`DataModelFormatter`)**: A function that transforms each value in the column.
     *
     * ### Behavior
     * - Throws an error if `formatter` is not a valid function.
     * - Validates `column` using `_getValidColValue(column)`.
     * - Throws an error if the column does not exist.
     * - Iterates through all rows and applies `formatter` to each value in the column.
     * - Ensures that the formatted values remain valid using `_getValidRowValue()`.
     * - Allows any string as `column` if `T = Record<string, any>`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The current `DataModel` instance after formatting the column.
     *
     * ### Example Usage
     * ```typescript
     * interface Product {
     *     id: number;
     *     price: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<Product>([
     *     { id: 1, price: 1000 },
     *     { id: 2, price: 2000 }
     * ]);
     *
     * // Format the "price" column by adding a currency symbol
     * dataModel.setColumnSameFormat("price", value => `$${value}`);
     * console.log(dataModel.getColumnValues("price")); // Output: ["$1000", "$2000"]
     *
     * // With default `Record<string, any>`, any column can be formatted dynamically
     * const flexibleModel = new hison.data.DataModel();
     * flexibleModel.setColumnSameFormat("randomColumn", value => `formatted-${value}`);
     * ```
     *
     * @param {K} column The name of the column to format.
     * @param {DataModelFormatter} formatter A function that transforms each value in the column.
     * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after formatting the column.
     * @throws {Error} If `formatter` is not a function or if the column does not exist.
     */
    setColumnSameFormat<K extends keyof T>(column: K, formatter: DataModelFormatter): InterfaceDataModel<T>;
    /**
     * Retrieves a deep copy of the row at the specified index.
     * Ensures that modifications to the returned row do not affect the original data.
     *
     * ### Parameters
     * - `rowIndex` **(number)**: The index of the row to retrieve.
     *
     * ### Behavior
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Uses `_deepCopy()` to return a copy of the row, preventing unintended modifications.
     *
     * ### Returns
     * - **`T`**: A deep copy of the row data as an object.
     *
     * ### Example Usage
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
     * @returns {T} A deep copy of the row data.
     * @throws {Error} If `rowIndex` is out of bounds.
     */
    getRow(rowIndex: number): T;
    /**
     * Retrieves the row at the specified index as a new `DataModel` instance.
     * Converts the row object into a `DataModel` for further structured operations.
     *
     * ### Parameters
     * - `rowIndex` **(number)**: The index of the row to retrieve.
     *
     * ### Behavior
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Initializes a new `DataModel` using the retrieved row data.
     *
     * ### Returns
     * - **`DataModel`**: A new `DataModel` instance containing the specified row.
     *
     * ### Example Usage
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
     * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the row data.
     * @throws {Error} If `rowIndex` is out of bounds.
     */
    getRowAsDataModel(rowIndex: number): InterfaceDataModel<T>;
    /**
     * Adds a new row to the `DataModel<T>` at the specified index or appends it to the end.
     * If no parameters are provided, an empty row is added.
     *
     * ### Generic Type `<T>`
     * - `T` represents the structure of each row in the `DataModel<T>`.
     * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible row structures.
     *
     * ### Parameters
     * - `rowIndexOrRow` **(number | T, optional)**: The index at which to insert the row, or the row data to insert.
     * - `row` **(T, optional)**: The row data to insert (only required when `rowIndexOrRow` is a number).
     *
     * ### Behavior
     * - If **no parameters** are provided, an empty row is appended.
     * - If **only a number is provided**, an empty row is inserted at that index.
     * - If **only an object (`T`) is provided**, it is inserted as a new row at the end.
     * - If **both a number and an object are provided**, the row is inserted at the specified index.
     * - Throws an error if attempting to add a row without first defining columns.
     *
     * ### Returns
     * - **`DataModel<T>`**: The current instance after adding the new row.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>(["id", "name"]);
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
     * // new hison.data.DataModel<User>().addRow();
     * ```
     *
     * @param {number | T} [rowIndexOrRow] The index at which to insert the row, or the row data.
     * @param {T} [row] The row data to insert (only required if `rowIndexOrRow` is a number).
     * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after adding the row.
     * @throws {Error} If columns are not defined or parameters are invalid.
     */
    addRow(rowIndexOrRow?: number | T, row?: T): InterfaceDataModel<T>;
    /**
     * Retrieves a deep copy of a range of rows from the `DataModel`.
     * Ensures that modifications to the returned rows do not affect the original data.
     *
     * ### Generic Type `<T>`
     * - `T` represents the structure of each row in the `DataModel`.
     * - By specifying `T`, developers can enforce type safety when retrieving rows.
     * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible data structures.
     *
     * ### Parameters
     * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
     * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
     *
     * ### Behavior
     * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
     * - If `endRow` is `null`, retrieves rows from `startRow` to the last row.
     * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
     *
     * ### Returns
     * - **`T[]`**: An array of deep-copied row objects, ensuring type safety.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {number | null} [endRow=null] The ending index of the row range (inclusive).
     * @returns {T[]} An array of deep-copied rows, preserving type safety.
     * @throws {Error} If `startRow` or `endRow` is out of bounds.
     */
    getRows(startRow?: number, endRow?: number | null): T[];
    /**
     * Retrieves a range of rows as a new `DataModel` instance.
     * Ensures that the returned `DataModel` contains independent copies of the selected rows.
     *
     * ### Parameters
     * - `startRow` **(number, optional, default = `0`)**: The starting index of the row range.
     * - `endRow` **(number, optional, default = `null`)**: The ending index of the row range (inclusive).
     *
     * ### Behavior
     * - Calls `_getValidRowIndex(startRow)` and `_getValidRowIndex(endRow)` to validate row indices.
     * - If `startRow` is `0` and `endRow` is `null`, returns a clone of the entire `DataModel`.
     * - Uses `_deepCopy()` to ensure the returned rows are independent.
     * - Returns a new `DataModel` containing the selected rows.
     *
     * ### Returns
     * - **`DataModel`**: A new `DataModel` instance containing the selected row range.
     *
     * ### Example Usage
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
     * @param {number | null} [endRow=null] The ending index of the row range (inclusive).
     * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the selected rows.
     * @throws {Error} If `startRow` or `endRow` is out of bounds.
     */
    getRowsAsDataModel(startRow?: number, endRow?: number | null): InterfaceDataModel<T>;
    /**
     * Adds multiple rows to the `DataModel`.
     * Each row is validated and inserted into the existing dataset.
     *
     * ### Generic Type `<T>`
     * - `T` represents the structure of each row in the `DataModel`.
     * - By specifying `T`, developers can enforce type safety for inserted rows.
     * - If no type is provided, `T` defaults to `Record<string, any>`, allowing flexible data structures.
     *
     * ### Parameters
     * - `rows` **(`T[]`)**: An array of row objects to be added.
     *
     * ### Behavior
     * - Calls `_put(rows)` to process and insert the provided rows.
     * - Ensures that column structures are maintained.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The current instance after adding the new rows.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>(["id", "name"]);
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
     * @param {T[]} rows An array of row objects to add.
     * @returns {InterfaceDataModel<T>} The current `DataModel<T>` instance after adding the rows.
     * @throws {Error} If `rows` contain invalid data.
     */
    addRows(rows: T[]): InterfaceDataModel<T>;
    /**
     * Converts the `DataModel` instance into a structured JavaScript object.
     * The returned object includes column definitions, row data, and metadata.
     *
     * ### Behavior
     * - Uses `_deepCopy()` to ensure the returned data is independent of the original `DataModel`.
     * - The returned object contains:
     *   - `cols`: An array of column names (`keyof T`).
     *   - `rows`: An array of row objects (`T[]`).
     *   - `colCount`: The total number of columns.
     *   - `rowCount`: The total number of rows.
     *   - `isDeclare`: A boolean indicating whether columns are explicitly defined.
     *
     * ### Returns
     * - **`{ cols: (keyof T)[], rows: T[], colCount: number, rowCount: number, isDeclare: boolean }`**:
     *   A structured object representing the `DataModel`.
     *
     * ⚠ **Note:** If `T` is explicitly defined, `cols` will reflect only the known keys of `T`.
     * If `T` is the default `Record<string, any>`, `cols` may include dynamically added columns.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @returns {{ cols: (keyof T)[], rows: T[], colCount: number, rowCount: number, isDeclare: boolean }}
     *          A structured object representing the `DataModel` structure.
     */
    getObject(): {
        cols: (keyof T)[];
        rows: T[];
        colCount: number;
        rowCount: number;
        isDeclare: boolean;
    };
    /**
     * Retrieves a deep copy of the value at the specified row index and column name.
     * Ensures type safety when `T` is specified, while maintaining flexibility for dynamic structures.
     *
     * ### Parameters
     * - `rowIndex` **(number)**: The index of the row to retrieve the value from.
     * - `column` **(K)**: The column name, constrained to the keys of `T` if defined.
     *
     * ### Behavior
     * - Validates `column` and `rowIndex` before accessing the value.
     * - Returns a deep copy to prevent unintended modifications.
     * - Allows any string as `column` if `T = Record<string, any>`.
     *
     * ### Returns
     * - **`T[K]`**: A deep copy of the value stored at the specified row and column.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: "U1", age: 25 },
     *     { id: "U2", age: 30 }
     * ]);
     *
     * console.log(dataModel.getValue(0, "age")); // Output: 25 (type: number)
     * console.log(dataModel.getValue(0, "id"));  // Output: "U1" (type: string)
     *
     * // With default `Record<string, any>`, any column can be accessed.
     * const flexibleModel = new hison.data.DataModel();
     * console.log(flexibleModel.getValue(0, "randomColumn")); // No TypeScript error
     * ```
     *
     * @param {number} rowIndex The row index to retrieve the value from.
     * @param {K} column The column name to retrieve the value from.
     * @returns {T[K]} A deep copy of the value stored at the specified row and column.
     * @throws {Error} If `rowIndex` or `column` is invalid.
     */
    getValue<K extends keyof T>(rowIndex: number, column: K): T[K];
    /**
     * Sets a value at the specified row index and column name.
     * Ensures that the value is valid and maintains data integrity.
     *
     * ### Parameters
     * - `rowIndex` **(number)**: The index of the row where the value should be set.
     * - `column` **(K)**: The name of the column where the value should be stored.
     * - `value` **(T[K])**: The value to be assigned, ensuring type safety.
     *
     * ### Behavior
     * - Throws an error if `value` is `undefined`.
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Calls `_getValidRowValue(rowIndex, column, value)` to ensure the value is properly formatted.
     * - Updates the value at the specified row and column.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ### Type Safety
     * - Uses `<K extends keyof T>` to ensure that `column` is a valid key of `T`.
     * - The `value` type is inferred as `T[K]`, preventing type mismatches.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The current instance after updating the value.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {K} column The column name where the value should be stored.
     * @param {T[K]} value The value to assign, ensuring type safety.
     * @returns {InterfaceDataModel<T>} The current `DataModel` instance after updating the value.
     * @throws {Error} If `value` is `undefined` or if `rowIndex` or `column` is invalid.
     */
    setValue<K extends keyof T>(rowIndex: number, column: K, value: T[K]): InterfaceDataModel<T>;
    /**
     * Removes a column from the `DataModel`, deleting its values from all rows.
     * Ensures that the column exists before attempting removal.
     *
     * ### Parameters
     * - `column` **(K)**: The name of the column to remove, ensuring type safety.
     *
     * ### Behavior
     * - Calls `_getValidColValue(column)` to validate the column name.
     * - Throws an error if the specified column does not exist.
     * - Iterates through all rows and removes the specified column.
     * - Updates `_cols` to exclude the removed column.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically removed columns.
     * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
     *
     * ### Type Safety
     * - Uses `<K extends keyof T>` to ensure that `column` is a valid key of `T`.
     * - Prevents attempts to remove a column that does not exist in the defined type.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The current instance after removing the column.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     *   age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {K} column The name of the column to remove, ensuring type safety.
     * @returns {InterfaceDataModel<T>} The current `DataModel` instance after removing the column.
     * @throws {Error} If `column` is invalid or does not exist.
     */
    removeColumn<K extends keyof T>(column: K): InterfaceDataModel<T>;
    /**
     * Removes multiple columns from the `DataModel`, deleting their values from all rows.
     * Ensures that each specified column exists before attempting removal.
     *
     * ### Parameters
     * - `columns` **(K[])**: An array of column names to remove, ensuring type safety.
     *
     * ### Behavior
     * - Uses `<K extends keyof T>` to enforce that `columns` contain only valid keys of `T`.
     * - Iterates through the `columns` array and calls `removeColumn(column)` for each entry.
     * - If any column does not exist, `removeColumn` will throw an error.
     * - Returns the current `DataModel` instance for method chaining.
     *
     * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically removed columns.
     * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The current instance after removing the specified columns.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     *   age: number;
     *   city: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {K[]} columns An array of column names to remove, ensuring type safety.
     * @returns {InterfaceDataModel<T>} The current `DataModel` instance after removing the columns.
     * @throws {Error} If any column does not exist.
     */
    removeColumns<K extends keyof T>(columns: K[]): InterfaceDataModel<T>;
    /**
     * Removes a row from the `DataModel` at the specified index and returns the removed row.
     * Ensures that the row index is valid before removal.
     *
     * ### Parameters
     * - `rowIndex` **(number, optional, default = `0`)**: The index of the row to remove.
     *
     * ### Behavior
     * - Uses `<T>` to ensure that the returned row matches the structure of `T`.
     * - Calls `_getValidRowIndex(rowIndex)` to validate the row index.
     * - Uses `splice()` to remove the row from `_rows` and returns the removed row.
     *
     * ### Returns
     * - **`T`**: The removed row object, ensuring type safety based on `T`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @returns {T} The removed row object, with type safety enforced.
     * @throws {Error} If `rowIndex` is out of bounds.
     */
    removeRow(rowIndex?: number): T;
    /**
     * Retrieves the total number of columns in the `DataModel`.
     *
     * ### Behavior
     * - Returns the length of the `_cols` array, which represents the column definitions.
     *
     * ### Returns
     * - **`number`**: The total number of columns in the `DataModel`.
     *
     * ### Example Usage
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
     * ### Behavior
     * - Returns the length of the `_rows` array, which represents the stored data rows.
     *
     * ### Returns
     * - **`number`**: The total number of rows in the `DataModel`.
     *
     * ### Example Usage
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
     * Uses `<K extends keyof T>` to ensure type safety when checking column names.
     *
     * ### Parameters
     * - `column` **(K)**: The column name to check, constrained to keys of `T`.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to valid keys of `T`.
     * - Calls `_hasColumn(column)` to determine if the column exists.
     * - Returns `true` if the column is found in `_cols`, otherwise `false`.
     *
     * ### Returns
     * - **`boolean`**: `true` if the column exists, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>(["id", "name"]);
     *
     * console.log(dataModel.hasColumn("name")); // Output: true
     * console.log(dataModel.hasColumn("age"));  // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
     * ```
     *
     * @param {K} column The column name to check, constrained to keys of `T`.
     * @returns {boolean} `true` if the column exists, otherwise `false`.
     */
    hasColumn<K extends keyof T>(column: K): boolean;
    /**
     * Restricts the `DataModel` to only the specified columns by removing all other columns.
     * Uses `<K extends keyof T>` to enforce type safety when specifying valid columns.
     *
     * ### Parameters
     * - `columns` **(K[])**: An array of column names to retain, constrained to keys of `T`.
     *
     * ### Behavior
     * - Ensures type safety by allowing only existing keys of `T` as valid columns.
     * - Identifies and removes columns that are **not** included in the provided `columns` list.
     * - Calls `removeColumns()` to eliminate those columns from the dataset.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ⚠ **Note:** If `T` is explicitly defined, TypeScript does not recognize dynamically removed columns.
     * To modify columns dynamically, use `DataModel` with its default type `Record<string, any>`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The modified `DataModel` instance with only the specified columns retained.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     *   age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: 1, name: "Alice", age: 25 },
     *     { id: 2, name: "Bob", age: 30 }
     * ]);
     *
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     *
     * // Keep only "id" and "name" columns
     * dataModel.setValidColumns(["id", "name"]);
     * console.log(dataModel.getColumns()); // Output: ["id", "name"]
     *
     * // TypeScript Error: Argument of type '"salary"' is not assignable to parameter of type '"id" | "name" | "age"'.
     * // dataModel.setValidColumns(["id", "salary"]);
     * ```
     *
     * @param {K[]} columns An array of column names to retain, constrained to keys of `T`.
     * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with only the specified columns retained.
     */
    setValidColumns<K extends keyof T>(columns: K[]): InterfaceDataModel<T>;
    /**
     * Checks whether a specified column contains only non-null values.
     * Uses `<K extends keyof T>` to ensure type safety when specifying the column.
     *
     * ### Parameters
     * - `column` **(K)**: The name of the column to check, constrained to keys of `T`.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to existing keys of `T`.
     * - Calls `_getNullColumnFirstRowIndex(column)` to find the first occurrence of a `null` value in the column.
     * - If no `null` values are found, returns `true`; otherwise, returns `false`.
     *
     * ### Returns
     * - **`boolean`**: `true` if the column has no `null` values, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string | null;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: null },
     *     { id: 3, name: "Charlie" }
     * ]);
     *
     * console.log(dataModel.isNotNullColumn("id"));   // Output: true
     * console.log(dataModel.isNotNullColumn("name")); // Output: false
     *
     * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
     * // console.log(dataModel.isNotNullColumn("age"));
     * ```
     *
     * @param {K} column The column name to check, constrained to keys of `T`.
     * @returns {boolean} `true` if the column has no `null` values, otherwise `false`.
     * @throws {Error} If `column` does not exist.
     */
    isNotNullColumn<K extends keyof T>(column: K): boolean;
    /**
     * Finds and returns the first row where the specified column contains a `null` value.
     * Uses `<K extends keyof T>` to enforce type safety on the column name.
     *
     * ### Parameters
     * - `column` **(K)**: The column name to check, constrained to keys of `T`.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to existing keys of `T`.
     * - Calls `_getNullColumnFirstRowIndex(column)` to locate the first occurrence of a `null` value.
     * - If no `null` values are found, returns `null`.
     * - If a `null` value is found, retrieves and returns the corresponding row using `getRow()`.
     *
     * ### Returns
     * - **`T | null`**: The first row where the column has a `null` value, or `null` if none exist.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string | null;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     *
     * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
     * // console.log(dataModel.findFirstRowNullColumn("age"));
     * ```
     *
     * @param {K} column The column name to check for `null` values.
     * @returns {T | null} The first row where the column has a `null` value, or `null` if none exist.
     * @throws {Error} If `column` does not exist.
     */
    findFirstRowNullColumn<K extends keyof T>(column: K): T | null;
    /**
     * Checks whether a specified column contains only unique values (i.e., no duplicate values).
     * Uses `<K extends keyof T>` to enforce type safety on the column name.
     *
     * ### Parameters
     * - `column` **(K)**: The column name to check, constrained to keys of `T`.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to existing keys of `T`.
     * - Calls `_getDuplColumnFirstRowIndex(column)` to find the first occurrence of a duplicate value in the column.
     * - If no duplicates are found, returns `true`; otherwise, returns `false`.
     *
     * ### Returns
     * - **`boolean`**: `true` if the column has no duplicate values, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" },
     *     { id: 3, name: "Alice" }
     * ]);
     *
     * console.log(dataModel.isNotDuplColumn("id")); // Output: true
     * console.log(dataModel.isNotDuplColumn("name")); // Output: false
     *
     * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
     * // console.log(dataModel.isNotDuplColumn("age"));
     * ```
     *
     * @param {K} column The column name to check for duplicate values.
     * @returns {boolean} `true` if the column has no duplicate values, otherwise `false`.
     * @throws {Error} If `column` does not exist.
     */
    isNotDuplColumn<K extends keyof T>(column: K): boolean;
    /**
     * Finds and returns the first row where the specified column contains a duplicate value.
     * Uses `<K extends keyof T>` to ensure that the column exists in `T`, enforcing type safety.
     *
     * ### Parameters
     * - `column` **(K)**: The column name to check for duplicate values, constrained to keys of `T`.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to existing keys of `T`.
     * - Calls `_getDuplColumnFirstRowIndex(column)` to locate the first occurrence of a duplicate value.
     * - If no duplicate values are found, returns `null`.
     * - If a duplicate value is found, retrieves and returns the corresponding row using `getRow()`.
     *
     * ### Returns
     * - **`T | null`**: The first row where the column has a duplicate value, or `null` if no duplicates exist.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     *
     * // TypeScript Error: Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
     * // console.log(dataModel.findFirstRowDuplColumn("age"));
     * ```
     *
     * @param {K} column The column name to check for duplicate values.
     * @returns {T | null} The first row where the column has a duplicate value, or `null` if none exist.
     * @throws {Error} If `column` does not exist.
     */
    findFirstRowDuplColumn<K extends keyof T>(column: K): T | null;
    /**
     * Checks whether all values in the specified column satisfy a given validation function.
     * Uses `<K extends keyof T>` to ensure type safety for column selection.
     *
     * ### Parameters
     * - `column` **(K)**: The column name to validate, constrained to keys of `T`.
     * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to existing keys of `T`.
     * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to check for invalid values.
     * - If no invalid values are found, returns `true`; otherwise, returns `false`.
     *
     * ### Returns
     * - **`boolean`**: `true` if all values in the column are valid, otherwise `false`.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: 1, age: 25 },
     *     { id: 2, age: 30 },
     *     { id: 3, age: "invalid" as any }
     * ]);
     *
     * // Check if all values in "age" column are valid numbers
     * console.log(dataModel.isValidValue("age", value => typeof value === "number"));
     * // Output: false
     *
     * console.log(dataModel.isValidValue("id", value => typeof value === "number"));
     * // Output: true
     *
     * // TypeScript Error: Argument of type '"name"' is not assignable to parameter of type '"id" | "age"'.
     * // console.log(dataModel.isValidValue("name", value => typeof value === "string"));
     * ```
     *
     * @param {K} column The column name to validate.
     * @param {DataModelValidator} validator A function that checks if a value is valid.
     * @returns {boolean} `true` if all values in the column are valid, otherwise `false`.
     * @throws {Error} If `column` does not exist or `validator` is not a function.
     */
    isValidValue<K extends keyof T>(column: K, vaildator: DataModelValidator): boolean;
    /**
     * Finds and returns the first row where the specified column contains an invalid value based on a given validation function.
     * Uses `<K extends keyof T>` to ensure type safety for column selection.
     *
     * ### Parameters
     * - `column` **(K)**: The column name to validate, constrained to keys of `T`.
     * - `validator` **(`DataModelValidator`)**: A function that takes a value as input and returns `true` if the value is valid.
     *
     * ### Behavior
     * - Ensures type safety by restricting `column` to existing keys of `T`.
     * - Calls `_getInValidColumnFirstRowIndex(column, validator)` to locate the first occurrence of an invalid value in the column.
     * - If no invalid values are found, returns `null`.
     * - If an invalid value is found, retrieves and returns the corresponding row using `getRow()`.
     *
     * ### Returns
     * - **`T | null`**: The first row where the column has an invalid value, or `null` if all values are valid.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *   id: number;
     *   age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
     *     { id: 1, age: 25 },
     *     { id: 2, age: "invalid" as any },
     *     { id: 3, age: 30 }
     * ]);
     *
     * // Find the first row where "age" contains a non-numeric value
     * console.log(dataModel.findFirstRowInvalidValue("age", value => typeof value === "number"));
     * // Output: { id: 2, age: "invalid" }
     *
     * console.log(dataModel.findFirstRowInvalidValue("id", value => typeof value === "number"));
     * // Output: null (all values in "id" are valid)
     *
     * // TypeScript Error: Argument of type '"name"' is not assignable to parameter of type '"id" | "age"'.
     * // console.log(dataModel.findFirstRowInvalidValue("name", value => typeof value === "string"));
     * ```
     *
     * @param {K} column The column name to validate.
     * @param {DataModelValidator} validator A function that checks if a value is valid.
     * @returns {T | null} The first row with an invalid value, or `null` if all values are valid.
     * @throws {Error} If `column` does not exist or `validator` is not a function.
     */
    findFirstRowInvalidValue<K extends keyof T>(column: K, vaildator: DataModelValidator): T | null;
    /**
     * Searches for rows that match a given condition and returns their indexes.
     * Allows both positive and negative filtering based on the `isNegative` flag.
     *
     * ### Parameters
     * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
     * - `isNegative` **(`boolean`, optional, default = `false`)**: If `true`, returns indexes of rows that **do not** match the condition.
     *
     * ### Behavior
     * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
     * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
     * - Iterates through `_rows` to check if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, adds matching row indexes to the result.
     * - If `isNegative` is `true`, adds **non-matching** row indexes to the result.
     *
     * ### Type Safety
     * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
     * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
     *
     * ### Returns
     * - **`number[]`**: An array of indexes of rows that match (or do not match) the condition.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {Record<K, T[K]>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, returns indexes of rows that do **not** match the condition.
     * @returns {number[]} An array of indexes of rows that match or do not match the condition.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchRowIndexes<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): number[];
    /**
     * Searches for rows that match a given condition and returns them as an array.
     * Allows both positive and negative filtering based on the `isNegative` flag.
     *
     * ### Parameters
     * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
     * - `isNegative` **(`boolean`, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
     *
     * ### Behavior
     * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
     * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, adds matching rows to the result.
     * - If `isNegative` is `true`, adds **non-matching** rows to the result.
     * - Returns a deep copy of the matched rows to ensure immutability.
     *
     * ### Type Safety
     * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
     * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
     *
     * ### Returns
     * - **`T[]`**: An array of deep-copied rows that match (or do not match) the condition.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {Record<K, T[K]>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
     * @returns {T[]} An array of deep-copied rows that match or do not match the condition.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchRows<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): T[];
    /**
     * Searches for rows that match a given condition and returns them as a new `DataModel` instance.
     * Allows both positive and negative filtering based on the `isNegative` flag.
     *
     * ### Parameters
     * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
     * - `isNegative` **(`boolean`, optional, default = `false`)**: If `true`, returns rows that **do not** match the condition.
     *
     * ### Behavior
     * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
     * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - If `isNegative` is `false`, adds matching rows to the result.
     * - If `isNegative` is `true`, adds **non-matching** rows to the result.
     * - Returns a new `DataModel<T>` containing the filtered rows.
     *
     * ### Type Safety
     * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
     * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: A new `DataModel<T>` instance containing the matched rows.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {Record<K, T[K]>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, returns rows that do **not** match the condition.
     * @returns {InterfaceDataModel<T>} A new `DataModel<T>` instance containing the matched rows.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchRowsAsDataModel<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): InterfaceDataModel<T>;
    /**
     * Searches for rows that match a given condition and **modifies** the original `DataModel`
     * by removing matched or unmatched rows. Unlike `searchRowsAsDataModel`, this method directly
     * updates the existing dataset instead of returning a new instance.
     *
     * ### Parameters
     * - `condition` **(`Record<K, T[K]>`)**: An object representing the key-value conditions to match.
     * - `isNegative` **(`boolean`, optional, default = `false`)**:
     *   - If `false` (default), removes rows that **do not** match the condition.
     *   - If `true`, removes rows that **do** match the condition.
     *
     * ### Behavior
     * - Ensures `condition` is a valid object using `_checkOriginObject(condition)`.
     * - Validates `isNegative` as a boolean using `_checkBoolean(isNegative)`.
     * - Iterates through `_rows`, checking if each row meets the condition.
     * - Uses `JSON.stringify()` for deep comparison of values.
     * - Removes rows based on the `isNegative` flag:
     *   - If `false`, keeps only matching rows.
     *   - If `true`, removes matching rows.
     * - Returns the modified `DataModel<T>` instance for method chaining.
     *
     * ### Type Safety
     * - The generic type `<K extends keyof T>` ensures that `condition` keys must exist in `T`.
     * - `T[K]` enforces that values in `condition` match the expected type of the corresponding column.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance after removing specified rows.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {Record<K, T[K]>} condition The key-value condition to match.
     * @param {boolean} [isNegative=false] If `true`, removes rows that **match** the condition; otherwise, removes rows that **do not** match the condition.
     * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance after removing specified rows.
     * @throws {Error} If `condition` is not a valid object or `isNegative` is not a boolean.
     */
    searchAndModify<K extends keyof T>(condition: Record<K, T[K]>, isNegative?: boolean): InterfaceDataModel<T>;
    /**
     * Filters rows in the `DataModel` based on a custom filtering function and returns their indexes.
     * Allows for efficiently identifying row positions that match a given condition.
     *
     * ### Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
     *
     * ### Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Collects the indexes of rows that satisfy the filter condition.
     *
     * ### Returns
     * - **`number[]`**: An array of indexes of rows that match the filter condition.
     *
     * ### Example Usage
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
     * ### Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
     *
     * ### Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Uses `_deepCopy()` to ensure the returned rows are independent copies.
     * - Returns an array of matching rows.
     *
     * ### Returns
     * - **`T[]`**: An array of deep-copied rows that match the filter condition.
     *
     * ### Example Usage
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
     * @returns {T[]} An array of deep-copied rows that match the filter condition.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterRows(filter: DataModelFillter): T[];
    /**
     * Filters rows in the `DataModel` based on a custom filtering function and returns a new `DataModel` containing the matched rows.
     * Allows for extracting a subset of the dataset while preserving the structured format.
     *
     * ### Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be included.
     *
     * ### Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Collects rows that satisfy the filter condition.
     * - Returns a new `DataModel` instance containing the filtered rows.
     *
     * ### Returns
     * - **`DataModel`**: A new `DataModel` instance containing the filtered rows.
     *
     * ### Example Usage
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
     * @returns {InterfaceDataModel<T>} A new `DataModel` instance containing the filtered rows.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterRowsAsDataModel(filter: DataModelFillter): InterfaceDataModel<T>;
    /**
     * Filters rows in the `DataModel` based on a custom filtering function and **modifies** the original `DataModel` by removing unmatched rows.
     * This method directly updates the existing dataset instead of returning a new instance.
     *
     * ### Parameters
     * - `filter` **(`DataModelFillter`)**: A function that takes a row as input and returns `true` if the row should be retained.
     *
     * ### Behavior
     * - Calls `_checkValidFunction(filter)` to ensure `filter` is a valid function.
     * - Iterates through `_rows`, applying the filter function to each row.
     * - Removes rows that do **not** satisfy the filter condition.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`DataModel`**: The modified `DataModel` instance with only the filtered rows.
     *
     * ### Example Usage
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
     * @returns {InterfaceDataModel<T>} The modified `DataModel` instance after removing unmatched rows.
     * @throws {Error} If `filter` is not a valid function.
     */
    filterAndModify(filter: DataModelFillter): InterfaceDataModel<T>;
    /**
     * Reorders the columns in the `DataModel` based on the specified order.
     * Ensures that all existing columns are included, maintaining the defined structure.
     *
     * ### Parameters
     * - `columns` **(`K[]`)**: An array of column names in the desired order.
     *
     * ### Behavior
     * - Calls `_checkArray(columns)` to validate the input as an array.
     * - Ensures that each column in `columns` exists in the `DataModel` using `_checkColumn(column)`.
     * - Constructs a new column order by placing unspecified columns at the end.
     * - Updates `_cols` with the new column order.
     * - Returns the modified `DataModel<T>` instance for method chaining.
     *
     * ### Type Safety
     * - Uses `<K extends keyof T>` to ensure that `columns` only contain valid keys of `T`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance with reordered columns.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     *     age: number;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>(["id", "name", "age"]);
     *
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     *
     * // Change column order
     * dataModel.setColumnSorting(["age", "name"]);
     * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
     * ```
     *
     * @param {K[]} columns An array of column names in the desired order.
     * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance with reordered columns.
     * @throws {Error} If `columns` is not an array or contains invalid column names.
     */
    setColumnSorting<K extends keyof T>(columns: K[]): InterfaceDataModel<T>;
    /**
     * Sorts the columns of the `DataModel` in ascending (A-Z) order.
     * The sorting is applied alphabetically based on column names.
     *
     * ### Behavior
     * - Calls the native `Array.sort()` method on `_cols` to rearrange columns in ascending order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`DataModel`**: The modified `DataModel` instance with columns sorted in ascending order.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
     *
     * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
     *
     * dataModel.sortColumnAscending();
     * console.log(dataModel.getColumns()); // Output: ["age", "id", "name"]
     * ```
     *
     * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with columns sorted in ascending order.
     */
    sortColumnAscending(): InterfaceDataModel<T>;
    /**
     * Sorts the columns of the `DataModel` in descending (Z-A) order.
     * The sorting is applied alphabetically based on column names.
     *
     * ### Behavior
     * - Calls the native `Array.sort()` method on `_cols` with a custom comparator to sort columns in descending order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`DataModel`**: The modified `DataModel` instance with columns sorted in descending order.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["name", "id", "age"]);
     *
     * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
     *
     * dataModel.sortColumnDescending();
     * console.log(dataModel.getColumns()); // Output: ["name", "id", "age"]
     * ```
     *
     * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with columns sorted in descending order.
     */
    sortColumnDescending(): InterfaceDataModel<T>;
    /**
     * Reverses the order of columns in the `DataModel`.
     * The column order is flipped without sorting alphabetically.
     *
     * ### Behavior
     * - Calls the native `Array.reverse()` method on `_cols` to reverse the column order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`DataModel`**: The modified `DataModel` instance with reversed column order.
     *
     * ### Example Usage
     * ```typescript
     * const dataModel = new hison.data.DataModel(["id", "name", "age"]);
     *
     * console.log(dataModel.getColumns()); // Output: ["id", "name", "age"]
     *
     * dataModel.sortColumnReverse();
     * console.log(dataModel.getColumns()); // Output: ["age", "name", "id"]
     * ```
     *
     * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with reversed column order.
     */
    sortColumnReverse(): InterfaceDataModel<T>;
    /**
     * Sorts the rows of the `DataModel` in ascending order based on the specified column.
     * Optionally supports integer-based sorting for numerical values.
     *
     * ### Parameters
     * - `column` **(`K`)**: The column name to sort by.
     * - `isIntegerOrder` **(`boolean`, optional, default = `false`)**: If `true`, treats values as integers for sorting.
     *
     * ### Behavior
     * - Validates `column` using `_getValidColValue(column)`.
     * - Ensures `column` exists in the `DataModel` with `_checkColumn(column)`.
     * - Validates `isIntegerOrder` using `_checkBoolean(isIntegerOrder)`.
     * - Uses `Array.sort()` to sort rows in ascending order.
     * - Places `null` values at the end of the sorted list.
     * - Converts object values to JSON strings for sorting consistency.
     * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
     * - Throws an error if a non-numeric value is encountered in integer sorting mode.
     *
     * ### Type Safety
     * - Uses `<K extends keyof T>` to ensure `column` is a valid key of `T`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance with rows sorted in ascending order.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {K} column The column name to sort by.
     * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
     * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance with rows sorted in ascending order.
     * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
     */
    sortRowAscending<K extends keyof T>(column: K, isIntegerOrder?: boolean): InterfaceDataModel<T>;
    /**
     * Sorts the rows of the `DataModel` in descending order based on the specified column.
     * Optionally supports integer-based sorting for numerical values.
     *
     * ### Parameters
     * - `column` **(`K`)**: The column name to sort by.
     * - `isIntegerOrder` **(`boolean`, optional, default = `false`)**: If `true`, treats values as integers for sorting.
     *
     * ### Behavior
     * - Validates `column` using `_getValidColValue(column)`.
     * - Ensures `column` exists in the `DataModel` with `_checkColumn(column)`.
     * - Validates `isIntegerOrder` using `_checkBoolean(isIntegerOrder)`.
     * - Uses `Array.sort()` to sort rows in descending order.
     * - Places `null` values at the beginning of the sorted list.
     * - Converts object values to JSON strings for sorting consistency.
     * - If `isIntegerOrder` is `true`, parses values as integers before sorting.
     * - Throws an error if a non-numeric value is encountered in integer sorting mode.
     *
     * ### Type Safety
     * - Uses `<K extends keyof T>` to ensure `column` is a valid key of `T`.
     *
     * ### Returns
     * - **`InterfaceDataModel<T>`**: The modified `DataModel<T>` instance with rows sorted in descending order.
     *
     * ### Example Usage
     * ```typescript
     * interface User {
     *     id: number;
     *     name: string;
     * }
     *
     * const dataModel = new hison.data.DataModel<User>([
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
     * @param {K} column The column name to sort by.
     * @param {boolean} [isIntegerOrder=false] If `true`, treats values as integers for sorting.
     * @returns {InterfaceDataModel<T>} The modified `DataModel<T>` instance with rows sorted in descending order.
     * @throws {Error} If `column` is invalid or contains non-numeric values in integer mode.
     */
    sortRowDescending<K extends keyof T>(column: K, isIntegerOrder?: boolean): InterfaceDataModel<T>;
    /**
     * Reverses the order of rows in the `DataModel`.
     * This method flips the row order without sorting by a specific column.
     *
     * ### Behavior
     * - Calls the native `Array.reverse()` method on `_rows` to reverse the row order.
     * - Returns the modified `DataModel` instance for method chaining.
     *
     * ### Returns
     * - **`DataModel`**: The modified `DataModel` instance with reversed row order.
     *
     * ### Example Usage
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
     * @returns {InterfaceDataModel<T>} The modified `DataModel` instance with reversed row order.
     */
    sortRowReverse(): InterfaceDataModel<T>;
}
/**
 * Defines a function signature for formatting values in a `DataModel` column.
 *
 * - This function takes a value as input and returns a transformed version of it.
 * - Used in `DataModel.setColumnSameFormat()` to apply consistent formatting across a column.
 *
 * ### Example Usage
 * ```typescript
 * const formatCurrency: DataModelFormatter = (value) => `$${value.toFixed(2)}`;
 * console.log(formatCurrency(1000)); // "$1000.00"
 * ```
 *
 * @callback DataModelFormatter
 * @param value The original value from the `DataModel` column.
 * @returns The formatted value.
 */
export interface DataModelFormatter {
    (value: any): any;
}
/**
 * Defines a function signature for validating values in a `DataModel` column.
 *
 * - This function takes a value as input and returns a boolean indicating validity.
 * - Used in `DataModel.isValidValue()` to check if all column values meet the validation criteria.
 *
 * ### Example Usage
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
export interface DataModelValidator {
    (value: any): boolean;
}
/**
 * Defines a function signature for filtering rows in a `DataModel`.
 *
 * - This function takes a row (as an object) and returns `true` if it should be included.
 * - Used in `DataModel.filterRowIndexes()` to filter row indexes based on the given condition.
 *
 * ### Example Usage
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
export interface DataModelFillter {
    (row: Record<string, any>): boolean;
}
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
    get<T = any>(key: string): Promise<{
        data: T;
        response: Response;
    }> | null;
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
    put(key: string, value: Promise<{
        data: any;
        response: Response;
    }>): void;
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
    remove<T = any>(key: string): Promise<{
        data: T;
        response: Response;
    }> | null;
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
    getAll<T = any>(): Record<string, Promise<{
        data: T;
        response: Response;
    }>>;
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
}
/**
 * **`ApiGet<T>` - A generic class for handling HTTP GET requests within the `hison.link` module.**
 *
 * The `ApiGet<T>` class is responsible for sending HTTP GET requests to a specified API resource.
 * It allows defining a **custom response type** using the generic parameter `T`, providing strong typing for API responses.
 *
 * ### **Key Features**
 * - **Executes HTTP GET requests** using `ApiLink`.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows defining the expected response type** via the generic parameter `T` (default: `InterfaceDataWrapper`).
 *
 * ### **How It Works**
 * - When instantiated, `ApiGet<T>` stores the API resource path and an optional `CachingModule` instance.
 * - The `call()` method triggers a GET request and returns a `Promise<{ data: T; response: Response } | null>`.
 * - If caching is enabled, previously stored responses may be returned instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Default usage (response type: InterfaceDataWrapper)
 * const apiGet = new hison.link.ApiGet("/users");
 * apiGet.call().then(response => {
 *     console.log(response?.data); // Type: InterfaceDataWrapper
 * });
 *
 * // Specifying a custom response type (User[])
 * interface User {
 *     id: number;
 *     name: string;
 * }
 * const apiGetUsers = new hison.link.ApiGet<User[]>("/users");
 * apiGetUsers.call().then(response => {
 *     console.log(response?.data); // Type: User[]
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiGet = new hison.link.ApiGet<User[]>("/users", cachingModule);
 *
 * // Handling request events
 * cachedApiGet.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("GET request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-based request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiGet<T>`, which provides methods for executing GET requests and managing request events.
 *
 * ### **Typical Use Cases**
 * - **Fetching data from a REST API** with strong type support.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (default: `InterfaceDataWrapper`).
 */
export interface InterfaceApiGet<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP GET request to the specified resource path.**
     *
     * This method sends a GET request using `ApiLink`, optionally applying caching if a `CachingModule` is provided.
     * It **invokes a pre-request hook** (`hison.setBeforeGetRequest`) and **emits a request-start event**
     * (`"requestStarted_GET"`) before execution.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or query parameters.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforeGetRequest((resourcePath, options) => {})`**
     *   - A customizable hook executed **before sending the GET request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters or implementing conditional request logic.
     *
     * ### **Event Emission**
     * - **`"requestStarted_GET"` Event**
     *   - This event is emitted **before the GET request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, **typed according to the generic parameter `T`**.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP GET request to `_resourcePath`.
     * - Before executing the request:
     *   - The **before-request hook (`beforeGetRequest`)** is checked.
     *   - The **event `"requestStarted_GET"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Default usage (response type: InterfaceDataWrapper)
     * const apiGet = new hison.link.ApiGet("/users");
     * apiGet.call().then(response => {
     *     console.log(response?.data); // Type: InterfaceDataWrapper
     * });
     *
     * // Specifying a custom response type (User[])
     * interface User {
     *     id: number;
     *     name: string;
     * }
     * const apiGetUsers = new hison.link.ApiGet<User[]>("/users");
     * apiGetUsers.call().then(response => {
     *     console.log(response?.data); // Type: User[]
     * });
     *
     * // Handling request events
     * apiGetUsers.onEventEmit("requestCompleted_Data", (data, response) => {
     *     console.log("GET request completed!", data);
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response } | null>} A promise resolving to the API response.
     */
    call(options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
     * **Sends an HTTP HEAD request to the specified resource path.**
     *
     * This method retrieves only the headers from the specified resource without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ### **Behavior**
     * - The method delegates the request execution to `ApiLink.head()`.
     * - The response body is **not** included in the result, only headers are returned.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - The method delegates the request execution to `ApiLink.options()`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `eventName` *(string)* - The name of the event to listen for.
     * - `eventFunc` *(function)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_GET"` - Triggered when a GET request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
     * - **`call(options)`** - Sends a GET request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiPost<T>` - A class for handling HTTP POST requests within the `hison.link` module.**
 *
 * The `ApiPost<T>` class is responsible for sending HTTP POST requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 * The response type can be customized using the generic parameter `T`, with a default type of `InterfaceDataWrapper`.
 *
 * ### **Key Features**
 * - **Executes HTTP POST requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`**, ensuring structured payloads with a `cmd` field for service routing.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** to monitor request execution.
 * - **Flexible response typing** via **`T`**, allowing the user to define the expected response data structure.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPost<T>` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a POST request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPost (default response type: InterfaceDataWrapper)
 * const apiPost = new hison.link.ApiPost("UserService.createUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 *
 * // Sending a POST request
 * apiPost.call(requestData).then(response => {
 *     console.log(response.data); // Type: InterfaceDataWrapper
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPost = new hison.link.ApiPost("UserService.createUser", cachingModule);
 *
 * // Specifying a custom response type
 * interface CreateUserResponse {
 *     userId: number;
 *     username: string;
 * }
 * const apiPostTyped = new hison.link.ApiPost<CreateUserResponse>("UserService.createUser");
 *
 * apiPostTyped.call(requestData).then(response => {
 *     console.log(response.data.userId); // Type: number
 *     console.log(response.data.username); // Type: string
 * });
 *
 * // Handling request events
 * cachedApiPost.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("POST request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPost<T>`, which provides methods for executing POST requests and managing request events.
 * - The response type **defaults to `InterfaceDataWrapper`** but can be customized by specifying a different type `T`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export interface InterfaceApiPost<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP POST request to the specified service command.**
     *
     * This method sends a POST request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(T | InterfaceDataWrapper, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object matching `T`, it is automatically processed as JSON.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforePostRequst((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the POST request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_POST"` Event**
     *   - This event is emitted **before the POST request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP POST request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePostRequst`)** is checked.
     *   - The **event `"requestStarted_POST"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Defining a custom response type
     * interface CreateUserResponse {
     *     userId: number;
     *     username: string;
     * }
     *
     * // Creating an instance of ApiPost with a custom response type
     * const apiPost = new hison.link.ApiPost<CreateUserResponse>("UserService.createUser");
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
     *     console.log(response.data.userId); // Type: number
     *     console.log(response.data.username); // Type: string
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
     * @param {T | InterfaceDataWrapper} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_POST"` - Triggered when a POST request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiPut<T>` - A class for handling HTTP PUT requests within the `hison.link` module.**
 *
 * The `ApiPut` class is responsible for sending HTTP PUT requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ### **Key Features**
 * - **Executes HTTP PUT requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types (`T`)** to enable type-safe API responses.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPut<T>` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a PUT request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Defining a custom response type
 * interface UpdateUserResponse {
 *     success: boolean;
 *     updatedUserId: number;
 * }
 *
 * // Creating an instance of ApiPut with a custom response type
 * const apiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 *
 * // Sending a PUT request
 * apiPut.call(requestData).then(response => {
 *     console.log(response.data.success); // Type: boolean
 *     console.log(response.data.updatedUserId); // Type: number
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPut.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PUT request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPut<T>`, providing methods for executing PUT requests and managing request events.
 * - The `T` type parameter allows users to define the expected response structure.
 *
 * ### **Typical Use Cases**
 * - **Sending data to a REST API** with structured payloads.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export interface InterfaceApiPut<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP PUT request to the specified service command with a generic response type.**
     *
     * This method sends a PUT request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforePutRequest((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the PUT request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_PUT"` Event**
     *   - This event is emitted **before the PUT request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, strongly typed based on the generic `T`.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP PUT request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePutRequest`)** is checked.
     *   - The **event `"requestStarted_PUT"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Defining a custom response type
     * interface UpdateUserResponse {
     *     success: boolean;
     *     updatedUserId: number;
     * }
     *
     * // Creating an instance of ApiPut with a custom response type
     * const apiPut = new hison.link.ApiPut<UpdateUserResponse>("UserService.updateUser");
     *
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     *
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforePutRequest = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     *
     * // Listening to the "requestStarted_PUT" event
     * apiPut.onEventEmit("requestStarted_PUT", (requestData, options) => {
     *     console.log("PUT request started with data:", requestData);
     * });
     *
     * // Sending a PUT request with a typed response
     * apiPut.call(requestData).then(response => {
     *     console.log(response.data.success); // Type: boolean
     *     console.log(response.data.updatedUserId); // Type: number
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiPatch` - A class for handling HTTP PATCH requests within the `hison.link` module.**
 *
 * The `ApiPatch` class is responsible for sending HTTP PATCH requests to a specified service command.
 * It supports **strongly typed responses** using generics (`T`), allowing precise response data handling.
 *
 * ### **Key Features**
 * - **Executes HTTP PATCH requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Utilizes generics (`T`)** to enable type-safe response handling.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPatch` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call<T>()` method sends a PATCH request and expects a response of type `T`.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Defining a custom response type
 * interface UpdateUserResponse {
 *     success: boolean;
 *     updatedFields: string[];
 * }
 *
 * // Creating an instance of ApiPatch with a custom response type
 * const apiPatch = new hison.link.ApiPatch<UpdateUserResponse>("UserService.updateUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 *
 * // Sending a PATCH request with a typed response
 * apiPatch.call(requestData).then(response => {
 *     console.log(response.data.success); // Type: boolean
 *     console.log(response.data.updatedFields); // Type: string[]
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPatch = new hison.link.ApiPatch("UserService.updateUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPatch.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PATCH request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPatch<T>`, providing methods for executing PATCH requests and managing request events.
 *
 * ### **Typical Use Cases**
 * - **Applying partial updates** to a REST API.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export interface InterfaceApiPatch<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP PATCH request to the specified service command.**
     *
     * This method sends a PATCH request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions. The response type is determined by
     * the **generic type `T`**, allowing for precise response handling.
     *
     * ### **Parameters**
     * - `requestData` *(T, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforePatchRequest((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the PATCH request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_PATCH"` Event**
     *   - This event is emitted **before the PATCH request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, strongly typed based on the generic type.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP PATCH request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforePatchRequest`)** is checked.
     *   - The **event `"requestStarted_PATCH"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Define a response type
     * interface UpdateUserResponse {
     *     success: boolean;
     *     updatedFields: string[];
     * }
     *
     * // Creating an ApiPatch instance with a typed response
     * const apiPatch = new hison.link.ApiPatch<UpdateUserResponse>("UserService.updateUser");
     *
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("username", "Alice");
     *
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforePatchRequest = (requestData, options) => {
     *     requestData.putString("timestamp", Date.now().toString());
     *     return true;
     * };
     *
     * // Listening to the "requestStarted_PATCH" event
     * apiPatch.onEventEmit("requestStarted_PATCH", (requestData, options) => {
     *     console.log("PATCH request started with data:", requestData);
     * });
     *
     * // Sending a PATCH request with a typed response
     * apiPatch.call(requestData).then(response => {
     *     console.log(response.data.success); // Type: boolean
     *     console.log(response.data.updatedFields); // Type: string[]
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
     * @param {T} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response }>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
     * **Sends an HTTP HEAD request to the API controller path.**
     *
     * This method retrieves only the headers from the API without downloading the response body.
     * It is useful for checking metadata such as content type, content length, and caching information.
     *
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
     * - The response body is **not** included in the result; only headers are returned.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Return Value**
     * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
     *
     * ### **Behavior**
     * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
     * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
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
     * ### **Parameters**
     * - `eventName` *(string, required)* - The name of the event to listen for.
     * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
     *
     * ### **Supported Events**
     * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
     * - `"requestCompleted_Response"` - Triggered when the API response is received.
     * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
     * - `"requestError"` - Triggered when an error occurs during the request.
     *
     * ### **Behavior**
     * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
     * - The provided `eventFunc` is executed whenever the specified event is emitted.
     *
     * ### **Example Usage**
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
     * ### **Related Methods**
     * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
     *
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
     */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiDelete<T>` - A class for handling HTTP DELETE requests within the `hison.link` module.**
 *
 * The `ApiDelete` class is responsible for sending HTTP DELETE requests to a specified service command.
 * It integrates with `ApiLink` to execute requests, emit events, and optionally utilize caching.
 *
 * ### **Key Features**
 * - **Executes HTTP DELETE requests** using `ApiLink`.
 * - **Encapsulates request data in `DataWrapper`** with a `cmd` field that directs the request to the appropriate service.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types (`T`)**, allowing for **strongly typed responses**.
 *
 * ### **How It Works**
 * - When instantiated, `ApiDelete<T>` requires a `serviceCmd` that specifies the business logic endpoint.
 * - The `call()` method sends a DELETE request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 * - The **generic type `T` defines the response data structure**, ensuring **type safety**.
 *
 * ### **Example Usage**
 * ```typescript
 * // Define a response type
 * interface DeleteUserResponse {
 *     success: boolean;
 *     deletedId: string;
 * }
 *
 * // Creating an instance of ApiDelete with a typed response
 * const apiDelete = new hison.link.ApiDelete<DeleteUserResponse>("UserService.deleteUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("userId", "12345");
 *
 * // Sending a DELETE request
 * apiDelete.call(requestData).then(response => {
 *     console.log(response.data.success); // Type: boolean
 *     console.log(response.data.deletedId); // Type: string
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiDelete = new hison.link.ApiDelete("UserService.deleteUser", cachingModule);
 *
 * // Handling request events
 * cachedApiDelete.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("DELETE request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiDelete<T>`, providing methods for executing DELETE requests and managing request events.
 *
 * ### **Typical Use Cases**
 * - **Deleting data from a REST API** in a structured and type-safe way.
 * - **Using `DataWrapper` to encapsulate request parameters** for standardized processing.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * @template T - The expected response data type (defaults to `InterfaceDataWrapper`).
 */
export interface InterfaceApiDelete<T = InterfaceDataWrapper> {
    /**
     * **Executes an HTTP DELETE request to the specified service command.**
     *
     * This method sends a DELETE request using `ApiLink`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`hison.setBeforeDeleteRequest((requestData, options) => {})`**
     *   - A customizable hook executed **before sending the DELETE request**.
     *   - If it returns `false`, the request is **prevented from execution**.
     *   - **Use Case:** Validating request parameters, modifying request data dynamically.
     *
     * ### **Event Emission**
     * - **`"requestStarted_DELETE"` Event**
     *   - This event is emitted **before the DELETE request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(`T`)* - The API response data, **strongly typed based on `T`**.
     *   - `response` *(Response)* - The original HTTP response object.
     *
     * ### **Behavior**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If the data is not cached, it makes an HTTP DELETE request to `_serviceCmd`.
     * - Before executing the request:
     *   - The **before-request hook (`beforeDeleteRequest`)** is checked.
     *   - The **event `"requestStarted_DELETE"`** is emitted.
     * - Once the request is completed, the response is returned and optionally stored in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * interface DeleteUserResponse {
     *     success: boolean;
     *     deletedId: string;
     * }
     *
     * const apiDelete = new hison.link.ApiDelete<DeleteUserResponse>("UserService.deleteUser");
     *
     * // Creating request data
     * const requestData = new hison.data.DataWrapper();
     * requestData.putString("userId", "12345");
     *
     * // Customizing the before-request hook to modify data before sending
     * customOption.link.beforeDeleteRequest = (requestData, options) => {
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
     *     console.log(response.data.success); // Type: boolean
     *     console.log(response.data.deletedId); // Type: string
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response } | null>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
    * **Sends an HTTP HEAD request to the API controller path.**
    *
    * This method retrieves only the headers from the API without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Delegates the request execution to `ApiLink.head()`, targeting `customOption.controllerPath`.
    * - The response body is **not** included in the result; only headers are returned.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Delegates the request execution to `ApiLink.options()`, targeting `customOption.controllerPath`.
    * - The response includes the `Allow` header, which specifies the permitted HTTP methods.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiGetUrl` - A class for handling HTTP GET requests to a specified URL.**
 *
 * The `ApiGetUrl` class is responsible for sending HTTP GET requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP GET requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined API resource path.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types (`T`)** with a default value of `any` to accommodate diverse API responses.
 *
 * ### **How It Works**
 * - When instantiated, `ApiGetUrl` requires a valid URL.
 * - The `call()` method triggers a GET request to the specified URL.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 * - The response data type can be explicitly defined using `T` (default: `any`).
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiGetUrl without caching
 * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
 *
 * // Sending a GET request
 * apiGetUrl.call().then(response => {
 *     console.log(response.data); // Response data (any type by default)
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
 *
 * // Defining a specific response type using generics
 * interface UserResponse {
 *     id: number;
 *     name: string;
 *     email: string;
 * }
 * const typedApiGetUrl = new hison.link.ApiGetUrl<UserResponse>("https://api.example.com/user/1");
 *
 * typedApiGetUrl.call().then(response => {
 *     console.log(response.data.name); // `name` is inferred as a string
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiGetUrl`, which provides methods for executing GET requests to a specific URL.
 * - The response type is determined by the generic parameter `T` (default: `any`).
 *
 * ### **Typical Use Cases**
 * - **Fetching data from an external API** by specifying a full URL.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 * - **Explicitly defining the response structure** using TypeScript generics.
 */
export interface InterfaceApiGetUrl<T = any> {
    /**
     * **Executes an HTTP GET request to the specified URL.**
     *
     * This method sends a GET request using `ApiLink.getURL()`, optionally applying caching if a `CachingModule` is provided.
     * It also **emits a request-start event** (`"requestStarted_GET"`) before execution.
     *
     * ### **Parameters**
     * - `options` *(optional, `Record<string, any>`)* - Additional request options such as headers or query parameters.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **Event Emission: `"requestStarted_GET"`**
     *   - This event is emitted **before the GET request is executed**.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new GET request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - **`data: T`** - The API response data, where `T` is a generic type (default: `any`).
     *   - **`response: Response`** - The original HTTP response object.
     *   - Returns `null` if the request fails or is prevented by an event hook.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.getURL(this._url, options)`, which:
     *   - Emits `"requestStarted_GET"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP GET request to `_url`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiGetUrl = new hison.link.ApiGetUrl("https://api.example.com/users");
     *
     * // Listening to the "requestStarted_GET" event
     * apiGetUrl.onEventEmit("requestStarted_GET", (url, options) => {
     *     console.log(`GET request started for: ${url}`);
     * });
     *
     * // Sending a GET request with inferred response type (`any` by default)
     * apiGetUrl.call().then(response => {
     *     console.log(response.data); // Response data
     * });
     *
     * // Defining a specific response type
     * interface User {
     *     id: number;
     *     name: string;
     *     email: string;
     * }
     * const typedApiGetUrl = new hison.link.ApiGetUrl<User>("https://api.example.com/user/1");
     *
     * typedApiGetUrl.call().then(response => {
     *     console.log(response.data.name); // `name` is inferred as a string
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response } | null>} A promise resolving to the API response.
     */
    call(options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Calls `this._apiLink.head(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_GET"` - Triggered when a GET request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"GET"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
    * - **`call(options)`** - Sends a GET request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiPostUrl` - A class for handling HTTP POST requests to a specified URL.**
 *
 * The `ApiPostUrl` class is responsible for sending HTTP POST requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP POST requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports an optional `serviceCmd` parameter**, allowing structured routing on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Uses a generic type `T` (default: `any`)** to specify the expected response data format.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPostUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a POST request with the provided request data.
 * - If caching is enabled, previously stored responses may be returned instead of making a new request.
 * - Event listeners can be attached to track request execution and completion.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPostUrl for a direct POST request
 * const apiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users");
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
 * // Creating an instance with a service command for structured routing
 * const apiPostUrlWithCmd = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser");
 *
 * // Sending a POST request with service command
 * apiPostUrlWithCmd.call(requestData).then(response => {
 *     console.log(response.data);
 * });
 *
 * // Creating an instance with caching enabled
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPostUrl = new hison.link.ApiPostUrl("https://api.example.com/users", "UserService.createUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPostUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("POST request completed!", data);
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - This class returns an instance of `ApiPostUrl`, providing methods for executing POST requests to a specific URL.
 * - The response data type is determined by `T`, with a default of `any`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface UserResponse {
 *     id: number;
 *     name: string;
 *     email: string;
 * }
 *
 * const typedApiPostUrl = new hison.link.ApiPostUrl<UserResponse>("https://api.example.com/users");
 *
 * typedApiPostUrl.call(requestData).then(response => {
 *     console.log(response.data.name); // `name` is inferred as a string
 * });
 * ```
 */
export interface InterfaceApiPostUrl<T = any> {
    /**
     * **Executes an HTTP POST request to the specified URL with an optional service command.**
     *
     * This method sends a POST request using `ApiLink.postURL()`, encapsulating request data and invoking
     * necessary pre-request hooks and event emissions. The response type is determined by the generic `T` (default: `any`).
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`"requestStarted_POST"` Event**
     *   - This event is emitted **before the POST request is executed**.
     *   - It includes the `serviceCmd`, request options, and request data.
     *   - Useful for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is provided, it checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new POST request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.postURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_POST"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP POST request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * // Creating an instance of ApiPostUrl with a service command
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
     * ### **Type-Safe Example**
     * ```typescript
     * interface UserResponse {
     *     id: number;
     *     name: string;
     *     email: string;
     * }
     *
     * const apiPostUrl = new hison.link.ApiPostUrl<UserResponse>("https://api.example.com/users");
     *
     * apiPostUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data.name); // `name` is inferred as a string
     *     }
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response; } | null>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "POST", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_POST"` - Triggered when a POST request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"POST"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a POST request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiPutUrl` - A class for handling HTTP PUT requests to a specified URL.**
 *
 * The `ApiPutUrl` class is responsible for sending HTTP PUT requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 * This class supports a generic type `T`, allowing users to define the expected response type.
 *
 * ### **Key Features**
 * - **Executes HTTP PUT requests** using `ApiLink.putURL()`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Provides type safety for response data** using a generic `T` (default: `any`).
 *
 * ### **How It Works**
 * - When instantiated, `ApiPutUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a PUT request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPutUrl
 * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser");
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
 * const cachedApiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPutUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PUT request completed!", data);
 * });
 * ```
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface UpdateUserResponse {
 *     success: boolean;
 *     message: string;
 * }
 *
 * const apiPutUrl = new hison.link.ApiPutUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
 *
 * apiPutUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data.message); // `message` is inferred as a string
 *     }
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - A `Promise` resolving to an object containing:
 *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
 *   - `response` *(Response)* - The original HTTP response object.
 * - If an error occurs, it returns `null`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
export interface InterfaceApiPutUrl<T = any> {
    /**
     * **Executes an HTTP PUT request to the specified URL with an optional service command.**
     *
     * This method sends a PUT request using `ApiLink.putURL()`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers, timeout settings, etc.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`"requestStarted_PUT"` Event**
     *   - This event is emitted **before the PUT request is executed**.
     *   - Includes the `serviceCmd`, request options, and request data.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, it first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new PUT request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.putURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_PUT"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP PUT request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPutUrl = new hison.link.ApiPutUrl("https://api.example.com/users", "UserService.updateUser");
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
     *     if (response) {
     *         console.log(response.data); // Response data
     *     }
     * });
     * ```
     *
     * ### **Type-Safe Example**
     * ```typescript
     * interface UpdateUserResponse {
     *     success: boolean;
     *     message: string;
     * }
     *
     * const apiPutUrl = new hison.link.ApiPutUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
     *
     * apiPutUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data.message); // `message` is inferred as a string
     *     }
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response } | null>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PUT", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_PUT"` - Triggered when a PUT request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PUT"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a PUT request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiPatchUrl` - A class for handling HTTP PATCH requests to a specified URL.**
 *
 * The `ApiPatchUrl` class is responsible for sending HTTP PATCH requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP PATCH requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 *
 * ### **How It Works**
 * - When instantiated, `ApiPatchUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a PATCH request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Return Value**
 * - A `Promise` resolving to an object containing:
 *   - `data` *(T)* - The API response data (typed based on the provided generic `T`, default: `any`).
 *   - `response` *(Response)* - The original HTTP response object.
 * - If an error occurs, it returns `null`.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiPatchUrl
 * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 *
 * // Sending a PATCH request
 * apiPatchUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data); // Response data
 *     }
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser", cachingModule);
 *
 * // Handling request events
 * cachedApiPatchUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("PATCH request completed!", data);
 * });
 * ```
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface UpdateUserResponse {
 *     success: boolean;
 *     message: string;
 * }
 *
 * const apiPatchUrl = new hison.link.ApiPatchUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
 *
 * apiPatchUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data.message); // `message` is inferred as a string
 *     }
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
export interface InterfaceApiPatchUrl<T = any> {
    /**
     * **Executes an HTTP PATCH request to the specified URL with an optional service command.**
     *
     * This method sends a PATCH request using `ApiLink.patchURL()`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, Record<string, any>)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`"requestStarted_PATCH"` Event**
     *   - This event is emitted **before the PATCH request is executed**.
     *   - It includes the `serviceCmd`, request options, and request data.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new PATCH request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - A `Promise` resolving to an object containing:
     *   - `data` *(T)* - The API response data, typed based on the provided generic `T` (default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.patchURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_PATCH"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP PATCH request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiPatchUrl = new hison.link.ApiPatchUrl("https://api.example.com/users", "UserService.updateUser");
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
     *     if (response) {
     *         console.log(response.data); // Response data
     *     }
     * });
     * ```
     *
     * ### **Type-Safe Example**
     * ```typescript
     * interface UpdateUserResponse {
     *     success: boolean;
     *     message: string;
     * }
     *
     * const apiPatchUrl = new hison.link.ApiPatchUrl<UpdateUserResponse>("https://api.example.com/users", "UserService.updateUser");
     *
     * apiPatchUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data.message); // `message` is inferred as a string
     *     }
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response; } | null>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "PATCH", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_PATCH"` - Triggered when a PATCH request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"PATCH"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a PATCH request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * **`ApiDeleteUrl` - A class for handling HTTP DELETE requests to a specified URL.**
 *
 * The `ApiDeleteUrl` class is responsible for sending HTTP DELETE requests to a provided URL.
 * It integrates with `ApiLink` to execute the request, handle events, and optionally cache responses.
 *
 * ### **Key Features**
 * - **Executes HTTP DELETE requests** using `ApiLink`.
 * - **Accepts a direct URL** instead of using a predefined service command.
 * - **Supports passing a `serviceCmd` parameter**, which can be used to specify business logic on the server.
 * - **Supports response caching** via an optional `CachingModule`.
 * - **Emits request lifecycle events** using `EventEmitter`.
 * - **Allows event listeners** for monitoring request execution.
 * - **Supports generic response types** for type-safe API responses.
 *
 * ### **How It Works**
 * - When instantiated, `ApiDeleteUrl` requires a valid URL and an optional `serviceCmd`.
 * - The `call()` method sends a DELETE request with the provided request data.
 * - If caching is enabled, responses may be retrieved from the cache instead of making a new request.
 * - Event listeners can be attached to monitor the request lifecycle.
 *
 * ### **Example Usage**
 * ```typescript
 * // Creating an instance of ApiDeleteUrl
 * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser");
 *
 * // Creating request data
 * const requestData = new hison.data.DataWrapper();
 * requestData.putString("username", "Alice");
 *
 * // Sending a DELETE request
 * apiDeleteUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data); // Response data
 *     }
 * });
 *
 * // Creating an instance with caching
 * const cachingModule = new hison.link.CachingModule(20);
 * const cachedApiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser", cachingModule);
 *
 * // Handling request events
 * cachedApiDeleteUrl.onEventEmit("requestCompleted_Data", (data, response) => {
 *     console.log("DELETE request completed!", data);
 * });
 * ```
 *
 * ### **Type-Safe Example**
 * ```typescript
 * interface DeleteResponse {
 *     success: boolean;
 *     message: string;
 * }
 *
 * const apiDeleteUrl = new hison.link.ApiDeleteUrl<DeleteResponse>("https://api.example.com/users", "UserService.deleteUser");
 *
 * apiDeleteUrl.call(requestData).then(response => {
 *     if (response) {
 *         console.log(response.data.message); // `message` is inferred as a string
 *     }
 * });
 * ```
 *
 * ### **Internal Components**
 * - **`ApiLink`**: Handles request execution and response processing.
 * - **`EventEmitter`**: Manages event-driven request handling.
 * - **`CachingModule` (optional)**: Stores and retrieves cached API responses.
 *
 * ### **Return Value**
 * - **A `Promise` resolving to an object with the following properties:**
 *   - `data` *(T)* - The API response data, where `T` is the specified generic type (default: `any`).
 *   - `response` *(Response)* - The original HTTP response object.
 * - If an error occurs, it returns `null`.
 *
 * ### **Typical Use Cases**
 * - **Sending data to an external API** using a full URL.
 * - **Passing a `serviceCmd` for structured request routing**.
 * - **Using cached responses** to reduce redundant API calls.
 * - **Handling event-driven request monitoring** via `onEventEmit`.
 */
export interface InterfaceApiDeleteUrl<T = any> {
    /**
     * **Executes an HTTP DELETE request to the specified URL with an optional service command.**
     *
     * This method sends a DELETE request using `ApiLink.deleteURL()`, encapsulating request data in a `DataWrapper`
     * and invoking necessary pre-request hooks and event emissions.
     *
     * ### **Parameters**
     * - `requestData` *(any, required)* - The data to be sent in the request.
     *   - If it is a `DataWrapper`, it is sent as-is.
     *   - If it is a standard object, it is converted to a JSON payload.
     * - `options` *(optional, `Record<string, any>`)* - Additional request options such as headers or timeout settings.
     *   - **Default:** `{}` (empty object)
     *
     * ### **Pre-Request Handling**
     * - **`"requestStarted_DELETE"` Event**
     *   - This event is emitted **before the DELETE request is executed**.
     *   - It includes the `serviceCmd`, request options, and request data.
     *   - Can be used for logging, request tracking, or debugging.
     *
     * ### **Caching Mechanism**
     * - If a `CachingModule` is used, the method first checks if the requested data is available in the cache.
     * - If cached data is found, it is returned **without making a new network request**.
     * - If no cached data exists, a new DELETE request is executed, and the response may be stored in the cache.
     *
     * ### **Return Value**
     * - **A `Promise` resolving to an object with the following properties:**
     *   - `data` *(T)* - The API response data, where `T` is the specified generic type (default: `any`).
     *   - `response` *(Response)* - The original HTTP response object.
     * - If an error occurs, it returns `null`.
     *
     * ### **Behavior**
     * - Calls `this._apiLink.deleteURL(this._url, requestData, this._serviceCmd, options)`, which:
     *   - Emits `"requestStarted_DELETE"` before making the request.
     *   - Checks if the requested data is cached and returns it if available.
     *   - If not cached, makes an HTTP DELETE request to `_url` with the provided `serviceCmd`.
     *   - Returns the response and optionally stores it in the cache.
     *
     * ### **Example Usage**
     * ```typescript
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl("https://api.example.com/users", "UserService.deleteUser");
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
     *     if (response) {
     *         console.log(response.data); // Response data
     *     }
     * });
     * ```
     *
     * ### **Type-Safe Example**
     * ```typescript
     * interface DeleteResponse {
     *     success: boolean;
     *     message: string;
     * }
     *
     * const apiDeleteUrl = new hison.link.ApiDeleteUrl<DeleteResponse>("https://api.example.com/users", "UserService.deleteUser");
     *
     * apiDeleteUrl.call(requestData).then(response => {
     *     if (response) {
     *         console.log(response.data.message); // `message` is inferred as a string
     *     }
     * });
     * ```
     *
     * ### **Related Methods**
     * - **`head(options)`** - Sends an HTTP HEAD request for metadata retrieval.
     * - **`options(options)`** - Sends an HTTP OPTIONS request to retrieve allowed methods.
     *
     * @param {any} requestData - The data to be sent in the request.
     * @param {Record<string, any>} [options={}] - Additional request options.
     * @returns {Promise<{ data: T; response: Response; } | null>} A promise resolving to the API response.
     */
    call(requestData: any, options?: Record<string, any>): Promise<{
        data: T;
        response: Response;
    } | null>;
    /**
    * **Sends an HTTP HEAD request to the specified URL.**
    *
    * This method retrieves only the headers from the specified URL without downloading the response body.
    * It is useful for checking metadata such as content type, content length, and caching information.
    *
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an object containing HTTP headers as key-value pairs.
    *
    * ### **Behavior**
    * - Calls `this._apiLink.headURL(this._url, options)`, which:
    *   - Sends an HTTP HEAD request to `_url`.
    *   - Extracts and returns the response headers.
    *   - Does **not** include the response body.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `options` *(optional, Record<string, any>)* - Additional request options such as headers.
    *   - **Default:** `{}` (empty object)
    *
    * ### **Return Value**
    * - A `Promise` resolving to an array of allowed HTTP methods (e.g., `["GET", "DELETE", "OPTIONS"]`).
    *
    * ### **Behavior**
    * - Calls `this._apiLink.options(this._url, options)`, which:
    *   - Sends an HTTP OPTIONS request to `_url`.
    *   - Extracts the `Allow` header from the response.
    *   - Parses and returns the list of permitted HTTP methods.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
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
    * ### **Parameters**
    * - `eventName` *(string, required)* - The name of the event to listen for.
    * - `eventFunc` *(function, required)* - The callback function to be executed when the event occurs.
    *
    * ### **Supported Events**
    * - `"requestStarted_DELETE"` - Triggered when a DELETE request begins.
    * - `"requestCompleted_Response"` - Triggered when the API response is received.
    * - `"requestCompleted_Data"` - Triggered when response data is successfully processed.
    * - `"requestError"` - Triggered when an error occurs during the request.
    *
    * ### **Behavior**
    * - Delegates the event registration to `ApiLink.onEventEmit()`, specifying `"DELETE"` as the method type.
    * - The provided `eventFunc` is executed whenever the specified event is emitted.
    *
    * ### **Example Usage**
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
    * ### **Related Methods**
    * - **`call(requestData, options)`** - Sends a DELETE request, triggering events during execution.
    *
    * @param {string} eventName - The name of the event to listen for.
    * @param {(...args: any[]) => void} eventFunc - The callback function to be executed when the event occurs.
    */
    onEventEmit(eventName: string, eventFunc: (...args: any[]) => void): void;
}
/**
 * Defines a function type for handling API GET requests before they are sent.
 * This allows developers to modify request options or cancel the request.
 *
 * ### Parameters
 * - `resourcePath` *(optional, string)*: The API endpoint URL for the GET request.
 * - `options` *(optional, Record<string, any>)*: Additional request options, such as headers or timeout settings.
 *
 * ### Return Value
 * - Returns `false` to prevent the GET request from being executed.
 * - Returns `void` or `true` to proceed with the request.
 *
 * ### Example Usage
 * ```typescript
 * hison.setBeforeGetRequst((resourcePath, options) => {
 *     console.log("Preparing GET request to:", resourcePath);
 *     options.headers = { Authorization: "Bearer token" };
 *     return true;
 * });
 * ```
 */
export interface BeforeGetRequst {
    (resourcePath?: string, options?: Record<string, any>): boolean | void;
}
/**
 * Defines a function type for handling API POST requests before they are sent.
 * This allows modifying request data, headers, or preventing the request.
 *
 * ### Parameters
 * - `requestDw` *(optional, any)*: The request payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ### Return Value
 * - Returns `false` to cancel the POST request.
 * - Returns `void` or `true` to proceed with the request.
 *
 * ### Example Usage
 * ```typescript
 * hison.setBeforePostRequst((requestDw, options) => {
 *     requestDw.putString("timestamp", Date.now().toString());
 *     return true;
 * });
 * ```
 */
export interface BeforePostRequst {
    (requestDw?: any, options?: Record<string, any>): boolean | void;
}
/**
 * Defines a function type for handling API PUT requests before they are sent.
 * Similar to `BeforePostRequst`, this allows modifying request payload or settings.
 *
 * ### Parameters
 * - `requestDw` *(optional, any)*: The request payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ### Return Value
 * - Returns `false` to cancel the PUT request.
 * - Returns `void` or `true` to proceed.
 *
 * ### Example Usage
 * ```typescript
 * hison.setBeforePutRequst((requestDw, options) => {
 *     requestDw.putString("modified", "true");
 * });
 * ```
 */
export interface BeforePutRequst {
    (requestDw?: any, options?: Record<string, any>): boolean | void;
}
/**
 * Defines a function type for handling API PATCH requests before they are sent.
 * This allows modifying partial update data before execution.
 *
 * ### Parameters
 * - `requestDw` *(optional, any)*: The request payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ### Return Value
 * - Returns `false` to cancel the PATCH request.
 * - Returns `void` or `true` to proceed.
 *
 * ### Example Usage
 * ```typescript
 * hison.setBeforePatchRequst((requestDw, options) => {
 *     requestDw.putString("lastUpdated", new Date().toISOString());
 * });
 * ```
 */
export interface BeforePatchRequst {
    (requestDw?: any, options?: Record<string, any>): boolean | void;
}
/**
 * Defines a function type for handling API DELETE requests before they are sent.
 * This allows validating or modifying delete operations before execution.
 *
 * ### Parameters
 * - `requestDw` *(optional, any)*: The request payload.
 * - `options` *(optional, Record<string, any>)*: Additional request options.
 *
 * ### Return Value
 * - Returns `false` to cancel the DELETE request.
 * - Returns `void` or `true` to proceed.
 *
 * ### Example Usage
 * ```typescript
 * hison.setBeforeDeleteRequst((requestDw, options) => {
 *     if (!requestDw.hasKey("id")) return false;
 * });
 * ```
 */
export interface BeforeDeleteRequst {
    (requestDw?: any, options?: Record<string, any>): boolean | void;
}
/**
 * Defines a function type for intercepting API response results.
 * This allows modifying API responses before they are returned to the caller.
 *
 * ### Parameters
 * - `result` *(DataWrapper | undefined)*: The API response data wrapped in `DataWrapper`.
 * - `response` *(Response)*: The original HTTP response object.
 *
 * ### Return Value
 * - Returns `false` to prevent the response from being processed further.
 * - Returns `void` or `true` to allow normal response handling.
 *
 * ### Example Usage
 * ```typescript
 * hison.setInterceptApiResult((result, response) => {
 *     console.log("Received API result:", result);
 *     return true;
 * });
 * ```
 */
export interface InterceptApiResult {
    (result: any | undefined, response: Response): boolean | void;
}
/**
 * Defines a function type for handling API errors before they are propagated.
 * This allows logging or modifying error responses before they are thrown.
 *
 * ### Parameters
 * - `error` *(any)*: The error object thrown by the API request.
 *
 * ### Return Value
 * - Returns `false` to suppress the error.
 * - Returns `void` or `true` to propagate the error as normal.
 *
 * ### Example Usage
 * ```typescript
 * hison.setInterceptApiError((error) => {
 *     console.error("API error occurred:", error);
 * });
 * ```
 */
export interface InterceptApiError {
    (error: any): boolean | void;
}
