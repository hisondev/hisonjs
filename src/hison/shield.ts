import type { Hison } from "./types";
import { customOption } from "./core";

export const getShield = () => {
    return {
        isHison: true,
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
         * ### Security Features & Execution Flow
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
         * ### Related Methods
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
    }
}
