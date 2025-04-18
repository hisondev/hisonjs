import { Hison } from "./hison";

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
export interface Shield {
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
