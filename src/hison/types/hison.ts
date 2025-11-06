import { DateFormat, DateTimeFormat, DayFormat, DayOfWeekFormat, HourFormat, HourMinuteFormat, MinuteFormat, MonthFormat, SecondFormat, TimeFormat, YearFormat, YearMonthFormat } from "../enums";
import type { Data, InterfaceDataWrapper } from "./data";
import type { Link } from "./link";
import type { Shield } from "./sheild";
import type { Utils } from "./utils";

export interface HisonCore {
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
    utils: Utils;
    /**
     * Enforces security policies on the given `Hison` instance, including access restrictions and object immutability.
     *
     * This function applies multiple layers of security to protect the `Hison` instance and enforce security policies:
     * - **Object Freezing**: Prevents modification of the `Hison` object.
     * - **Access Control by URL and IP**: Restricts access based on predefined security settings.
     * - **Developer Tool Restrictions**: Detects and prevents unauthorized debugging or tampering.
     * - **Back Navigation Prevention**: Blocks browser back navigation if enabled.
     * - **Custom Developer Tool Detection**: Executes user-defined actions when developer mode is detected.
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
     *
     * ### 2. **Object Freezing (`isFreeze`)**
     * - If `customOption.shield.isFreeze` is `true`, the `Hison` object is **deeply frozen**.
     * - Uses the `deepFreeze()` function to recursively apply `Object.freeze()`, preventing modifications.
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
     * ### 7. **Custom Developer Tool Detection (`doDetectDevTool`)**
     * - A user-defined function can be set using `hison.setDoDetectDevTool(func)`.
     * - This function is called when developer tools are suspected to be open (e.g., via window resize, focus, performance timing anomalies).
     * - Typical usage includes inserting a `debugger` statement or forcibly stopping the application.
     * - If no function is set, detection attempts will proceed without custom actions.
     *
     * ---
     * ### Related Methods
     * - `hison.setShieldURL(url: string)` → Sets the URL restriction for access control.
     * - `hison.setExposeIpList(ipList: string[])` → Defines a whitelist of allowed IP addresses.
     * - `hison.setIsFreeze(state: boolean)` → Enables or disables object freezing.
     * - `hison.setIsPossibleGoBack(state: boolean)` → Enables or disables back navigation prevention.
     * - `hison.setIsPossibleOpenDevTool(state: boolean)` → Enables or disables developer tool restrictions.
     * - `hison.setDoDetectDevTool(func: () => void)` → Sets a custom function to execute when developer tools are detected.
     *
     * @example
     * // Execute security features for the Hison instance
     * shield.execute(hison);
     *
     * @example
     * // Set a custom action when developer tools are detected
     * hison.setDoDetectDevTool(() => {
     *   debugger;
     * });
     */
    shield: Shield;
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
    data: Data;
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
    link: Link;
}

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
export interface Hison extends HisonCore{
    //option utils
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
    setDateFormat(str: keyof typeof DateFormat): void;
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
    setTimeFormat(str: keyof typeof TimeFormat): void;
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
    setDatetimeFormat(str: keyof typeof DateTimeFormat): void;
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
    setYearFormat(str: keyof typeof YearFormat): void;
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
    setMonthFormat(str: keyof typeof MonthFormat): void;
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
    setYearMonthFormat(str: keyof typeof YearMonthFormat): void;
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
    setDayFormat(str: keyof typeof DayFormat): void;
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
    setDayOfWeekFormat(str: keyof typeof DayOfWeekFormat): void;
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
    setHourFormat(str: keyof typeof HourFormat): void;
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
    setHourMinuteFormat(str: keyof typeof HourMinuteFormat): void;
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
    setMinuteFormat(str: keyof typeof MinuteFormat): void;
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
    setSecondFormat(str: keyof typeof SecondFormat): void;
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
     * ### Related Property
     * - **`shieldURL`**: Defines the security enforcement URL.
     *   - Default: `""`
     *   - Used in `shield.execute(hison: Hison)` to validate URL access.
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
     *   - Used in `shield.execute(hison: Hison)` to verify access permissions.
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
     *   - Used in `shield.execute(hison: Hison)`, where `deepFreeze(hison)` is applied.
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
     * Sets a custom function to be executed when developer tools are detected.
     *
     * This method allows developers to define the behavior when the browser's developer mode is detected.
     * It provides flexibility to insert breakpoints (`debugger`), show alerts, or block execution dynamically.
     *
     * - Default behavior: No action (`() => {}`).
     * - If a function is set via this method, it will be triggered during developer tool detection attempts.
     *
     * ---
     * ### Usage Example
     *
     * ```typescript
     * // Set a function that triggers a debugger breakpoint when devtools are detected
     * hison.setDoDetectDevTool(() => {
     *   debugger;
     * });
     * ```
     *
     * ### Notes
     * - This function will be called when suspicious activities such as window resizing, focus/blur, or abnormal delays are detected.
     * - It allows runtime anti-debugging behavior to be customizable instead of being hardcoded in the library.
     * - If not set, no action will be taken even if developer tools are detected.
     *
     * ---
     * @param func A function to execute when developer mode access is suspected.
     *
     * @see `customOption.shield.doDetectDevTool`
     */
    setDoDetectDevTool(func: (() => void)): void;
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
    setConvertValue(func: (value: any) => any): void;

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
     * This method updates the `beforeGetRequest` property in `customOption`, 
     * allowing developers to intercept or modify `GET` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `GET` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforeGetRequest`**: A hook function executed before a `GET` request.
     *   - Default: Returns `true`
     *   - Used in `ApiGet.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforeGetRequest((resourcePath, options) => {
     *     console.log("GET request intercepted:", resourcePath);
     *     return resourcePath.startsWith("/secure/") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `GET` request. Returning `false` cancels the request.
     */
    setBeforeGetRequest(func: (resourcePath?: string, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `POST` request.
     *
     * This method updates the `beforePostRequest` property in `customOption`, 
     * allowing developers to intercept or modify `POST` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `POST` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforePostRequest`**: A hook function executed before a `POST` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPost.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforePostRequest((requestDw, options) => {
     *     console.log("POST request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("secureData") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `POST` request. Returning `false` cancels the request.
     */
    setBeforePostRequest(func: <T = InterfaceDataWrapper>(requestData?: any, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `PUT` request.
     *
     * This method updates the `beforePutRequest` property in `customOption`, 
     * allowing developers to intercept or modify `PUT` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `PUT` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforePutRequest`**: A hook function executed before a `PUT` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPut.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforePutRequest((requestDw, options) => {
     *     console.log("PUT request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("readOnly") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `PUT` request. Returning `false` cancels the request.
     */
    setBeforePutRequest(func: <T = InterfaceDataWrapper>(requestData?: any, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `PATCH` request.
     *
     * This method updates the `beforePatchRequest` property in `customOption`, 
     * allowing developers to intercept or modify `PATCH` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `PATCH` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforePatchRequest`**: A hook function executed before a `PATCH` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPatch.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforePatchRequest((requestDw, options) => {
     *     console.log("PATCH request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("lockedField") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `PATCH` request. Returning `false` cancels the request.
     */
    setBeforePatchRequest(func: <T = InterfaceDataWrapper>(requestData?: any, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `DELETE` request.
     *
     * This method updates the `beforeDeleteRequest` property in `customOption`, 
     * allowing developers to intercept or modify `DELETE` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `DELETE` requests.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforeDeleteRequest`**: A hook function executed before a `DELETE` request.
     *   - Default: Returns `true`
     *   - Used in `ApiDelete.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforeDeleteRequest((requestDw, options) => {
     *     console.log("DELETE request intercepted:", requestDw);
     *     return requestDw.hasOwnProperty("protected") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `DELETE` request. Returning `false` cancels the request.
     */
    setBeforeDeleteRequest(func: <T = InterfaceDataWrapper>(requestData?: any, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `GET` request.
     *
     * This method updates the `afterGetRequest` property in `customOption`, 
     * allowing developers to post-process `GET` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `GET` requests.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterGetRequest`**: A hook function executed after a `GET` request.
     *   - Default: Returns `true`
     *   - Used in `ApiGet.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterGetRequest(({ data, response }) => {
     *     console.log("GET response intercepted:", data);
     *     return data.status !== "error";
     * });
     * ```
     *
     * @param func A function to execute after a `GET` request. Returning `false` nullifies the response.
     */
    setAfterGetRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `POST` request.
     *
     * This method updates the `afterPostRequest` property in `customOption`, 
     * allowing developers to post-process `POST` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `POST` requests.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterPostRequest`**: A hook function executed after a `POST` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPost.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterPostRequest(({ data, response }) => {
     *     console.log("POST response intercepted:", data);
     *     return data.success === true;
     * });
     * ```
     *
     * @param func A function to execute after a `POST` request. Returning `false` nullifies the response.
     */
    setAfterPostRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `PUT` request.
     *
     * This method updates the `afterPutRequest` property in `customOption`, 
     * allowing developers to post-process `PUT` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `PUT` requests.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterPutRequest`**: A hook function executed after a `PUT` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPut.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterPutRequest(({ data, response }) => {
     *     console.log("PUT response intercepted:", data);
     *     return data.updated === true;
     * });
     * ```
     *
     * @param func A function to execute after a `PUT` request. Returning `false` nullifies the response.
     */
    setAfterPutRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `PATCH` request.
     *
     * This method updates the `afterPatchRequest` property in `customOption`, 
     * allowing developers to post-process `PATCH` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `PATCH` requests.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterPatchRequest`**: A hook function executed after a `PATCH` request.
     *   - Default: Returns `true`
     *   - Used in `ApiPatch.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterPatchRequest(({ data, response }) => {
     *     console.log("PATCH response intercepted:", data);
     *     return data.patched === true;
     * });
     * ```
     *
     * @param func A function to execute after a `PATCH` request. Returning `false` nullifies the response.
     */
    setAfterPatchRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `DELETE` request.
     *
     * This method updates the `afterDeleteRequest` property in `customOption`, 
     * allowing developers to post-process `DELETE` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `DELETE` requests.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterDeleteRequest`**: A hook function executed after a `DELETE` request.
     *   - Default: Returns `true`
     *   - Used in `ApiDelete.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterDeleteRequest(({ data, response }) => {
     *     console.log("DELETE response intercepted:", data);
     *     return data.deleted === true;
     * });
     * ```
     *
     * @param func A function to execute after a `DELETE` request. Returning `false` nullifies the response.
     */
    setAfterDeleteRequest(func: <T = InterfaceDataWrapper>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `GET` request to a specified URL.
     *
     * This method updates the `beforeGetUrlRequest` property in `customOption`, 
     * allowing developers to intercept or modify `GET` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `GET` requests made via `ApiGetUrl`.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforeGetUrlRequest`**: A hook function executed before a `GET` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiGetUrl.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforeGetUrlRequest((url, options) => {
     *     console.log("GET URL request intercepted:", url);
     *     return url?.includes("restricted") ? false : true;
     * });
     * ```
     *
     * @param func A function to execute before a `GET` request. Returning `false` cancels the request.
     */
    setBeforeGetUrlRequest(func: (url?: string, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `POST` request to a specified URL.
     *
     * This method updates the `beforePostUrlRequest` property in `customOption`, 
     * allowing developers to intercept or modify `POST` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `POST` requests made via `ApiPostUrl`.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforePostUrlRequest`**: A hook function executed before a `POST` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiPostUrl.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforePostUrlRequest((url, requestData, options) => {
     *     console.log("POST URL request intercepted:", url, requestData);
     *     return requestData && requestData.isValid ? true : false;
     * });
     * ```
     *
     * @param func A function to execute before a `POST` request. Returning `false` cancels the request.
     */
    setBeforePostUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `PUT` request to a specified URL.
     *
     * This method updates the `beforePutUrlRequest` property in `customOption`, 
     * allowing developers to intercept or modify `PUT` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `PUT` requests made via `ApiPutUrl`.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforePutUrlRequest`**: A hook function executed before a `PUT` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiPutUrl.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforePutUrlRequest((url, requestData, options) => {
     *     console.log("PUT URL request intercepted:", url, requestData);
     *     return options?.allowUpdate ? true : false;
     * });
     * ```
     *
     * @param func A function to execute before a `PUT` request. Returning `false` cancels the request.
     */
    setBeforePutUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `PATCH` request to a specified URL.
     *
     * This method updates the `beforePatchUrlRequest` property in `customOption`, 
     * allowing developers to intercept or modify `PATCH` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `PATCH` requests made via `ApiPatchUrl`.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforePatchUrlRequest`**: A hook function executed before a `PATCH` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiPatchUrl.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforePatchUrlRequest((url, requestData, options) => {
     *     console.log("PATCH URL request intercepted:", url, requestData);
     *     return requestData?.isPatchable ? true : false;
     * });
     * ```
     *
     * @param func A function to execute before a `PATCH` request. Returning `false` cancels the request.
     */
    setBeforePatchUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes before making a `DELETE` request to a specified URL.
     *
     * This method updates the `beforeDeleteUrlRequest` property in `customOption`, 
     * allowing developers to intercept or modify `DELETE` requests before they are sent.
     *
     * - If the function returns `false`, the request will be canceled.
     * - The new function will be applied globally to all `DELETE` requests made via `ApiDeleteUrl`.
     * - Default behavior: Returns `true`, allowing the request to proceed.
     *
     * ### Related Property
     * - **`beforeDeleteUrlRequest`**: A hook function executed before a `DELETE` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiDeleteUrl.call()` to determine if a request should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setBeforeDeleteUrlRequest((url, requestData, options) => {
     *     console.log("DELETE URL request intercepted:", url, requestData);
     *     return options?.confirmDelete ? true : false;
     * });
     * ```
     *
     * @param func A function to execute before a `DELETE` request. Returning `false` cancels the request.
     */
    setBeforeDeleteUrlRequest(func: <T = any>(url?: string, requestData?: T, options?: Record<string, any>) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `GET` request to a specified URL.
     *
     * This method updates the `afterGetUrlRequest` property in `customOption`, 
     * allowing developers to post-process `GET` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `GET` requests made via `ApiGetUrl`.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterGetUrlRequest`**: A hook function executed after a `GET` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiGetUrl.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterGetUrlRequest(({ data, response }) => {
     *     console.log("GET URL response intercepted:", data);
     *     return data.status !== "error";
     * });
     * ```
     *
     * @param func A function to execute after a `GET` request. Returning `false` nullifies the response.
     */
    setAfterGetUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `POST` request to a specified URL.
     *
     * This method updates the `afterPostUrlRequest` property in `customOption`, 
     * allowing developers to post-process `POST` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `POST` requests made via `ApiPostUrl`.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterPostUrlRequest`**: A hook function executed after a `POST` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiPostUrl.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterPostUrlRequest(({ data, response }) => {
     *     console.log("POST URL response intercepted:", data);
     *     return data.success === true;
     * });
     * ```
     *
     * @param func A function to execute after a `POST` request. Returning `false` nullifies the response.
     */
    setAfterPostUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `PUT` request to a specified URL.
     *
     * This method updates the `afterPutUrlRequest` property in `customOption`, 
     * allowing developers to post-process `PUT` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `PUT` requests made via `ApiPutUrl`.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterPutUrlRequest`**: A hook function executed after a `PUT` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiPutUrl.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterPutUrlRequest(({ data, response }) => {
     *     console.log("PUT URL response intercepted:", data);
     *     return data.updated === true;
     * });
     * ```
     *
     * @param func A function to execute after a `PUT` request. Returning `false` nullifies the response.
     */
    setAfterPutUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `PATCH` request to a specified URL.
     *
     * This method updates the `afterPatchUrlRequest` property in `customOption`, 
     * allowing developers to post-process `PATCH` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `PATCH` requests made via `ApiPatchUrl`.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterPatchUrlRequest`**: A hook function executed after a `PATCH` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiPatchUrl.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterPatchUrlRequest(({ data, response }) => {
     *     console.log("PATCH URL response intercepted:", data);
     *     return data.patched === true;
     * });
     * ```
     *
     * @param func A function to execute after a `PATCH` request. Returning `false` nullifies the response.
     */
    setAfterPatchUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void): void;
    /**
     * Sets the hook function that executes after completing a `DELETE` request to a specified URL.
     *
     * This method updates the `afterDeleteUrlRequest` property in `customOption`, 
     * allowing developers to post-process `DELETE` request responses.
     *
     * - If the function returns `false`, the response will be nullified.
     * - The new function will be applied globally to all `DELETE` requests made via `ApiDeleteUrl`.
     * - Default behavior: Returns `true`, allowing the response to proceed.
     *
     * ### Related Property
     * - **`afterDeleteUrlRequest`**: A hook function executed after a `DELETE` request to a URL.
     *   - Default: Returns `true`
     *   - Used in `ApiDeleteUrl.call()` to determine if a response should proceed.
     *
     * ### Example Usage:
     * ```typescript
     * setAfterDeleteUrlRequest(({ data, response }) => {
     *     console.log("DELETE URL response intercepted:", data);
     *     return data.deleted === true;
     * });
     * ```
     *
     * @param func A function to execute after a `DELETE` request. Returning `false` nullifies the response.
     */
    setAfterDeleteUrlRequest(func: <T = any>(responseData?: { data: T; response: Response }) => boolean | void): void
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
    setInterceptApiResult(func: (result: any | undefined, response: Response) => boolean | void): void;
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
    setInterceptApiError(func: (error: any) => boolean | void): void;
}
