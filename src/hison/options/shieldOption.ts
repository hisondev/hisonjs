export const shieldOption = {
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
    /**
     * A custom function that is executed when detecting that developer tools may be opened.
     *
     * This hook allows developers to define specific behaviors when the system detects that 
     * the browser's developer tools are likely active.  
     * 
     * - By default, this function does nothing (`() => {}`).
     * - Developers can customize it using `hison.setDoDetectDevTool(func)`.
     * - Common custom actions include inserting a `debugger;`, showing alerts, or halting program flow.
     *
     * - Default value: `() => {}` (no action)
     * - Used in `shield.excute(hison: Hison)` when attempting to detect devtool access.
     *
     * ---
     * ### Example Usage
     *
     * ```typescript
     * hison.setDoDetectDevTool(() => {
     *   debugger; // Pause execution when devtools are detected
     * });
     * ```
     *
     * ### Notes
     * - This function is triggered during events like `resize`, `mousemove`, `focus`, and `blur` to detect suspicious behavior.
     * - It is up to the developer to define the action taken (e.g., throwing errors, stopping execution, etc.).
     *
     * @remarks
     * This hook offers flexibility without enforcing a specific anti-debugging behavior at the library level.
     * 
     * @see `hison.setDoDetectDevTool(func: () => void)`
     */
    doDetectDevTool: () => {},
};
