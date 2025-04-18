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
};
