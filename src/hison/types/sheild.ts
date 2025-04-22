import type { Hison } from "./hison";

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
 * shield.excute(hison);
 *
 * @example
 * // Set a custom action when developer tools are detected
 * hison.setDoDetectDevTool(() => {
 *   debugger;
 * });
 */
export interface Shield {
    /**
     * Checks if the object is Hison.
     */
    isHison: boolean;
    /**
     * Executes security mechanisms for the given `Hison` object to enforce access restrictions and prevent unauthorized modifications.
     *
     * This function applies multiple layers of security, including:
     * - **Object Freezing**: Prevents modification of the `Hison` object.
     * - **Access Control by URL and IP**: Restricts access based on predefined security settings.
     * - **Developer Tool Restrictions**: Prevents unauthorized debugging or tampering, with customizable detection behavior.
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
     * ### Security Features & Execution Flow
     *
     * ### 1. **Validation of `hison` Parameter**
     * - If `hison` is not provided, an error is thrown:  
     *   `"Invalid argument: 'hison' is required."`
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
     *   - **Custom Developer Tool Detection**:  
     *     - If developer tools are detected, the function registered via `hison.setDoDetectDevTool()` is called.
     *     - This allows developers to define a custom reaction, such as forcing a `debugger` breakpoint or halting the application.
     *
     * ---
     * ### Related Methods
     * - `hison.setShieldURL(url: string)` → Restrict allowed URL.
     * - `hison.setExposeIpList(ipList: string[])` → Set allowed IP addresses.
     * - `hison.setIsFreeze(state: boolean)` → Enable/disable object freezing.
     * - `hison.setIsPossibleGoBack(state: boolean)` → Enable/disable back navigation.
     * - `hison.setIsPossibleOpenDevTool(state: boolean)` → Enable/disable developer tool access.
     * - `hison.setDoDetectDevTool(func: () => void)` → Set a custom function to run when developer tools are detected.
     *
     * ---
     * @example
     * // Basic usage to enforce security features
     * hison.shield.excute(hison);
     *
     * @example
     * // Custom behavior when developer tools are opened
     * hison.setDoDetectDevTool(() => {
     *   debugger; // Force a breakpoint
     * });
     * hison.shield.excute(hison);
     */
    excute(hison: Hison): void;
};
