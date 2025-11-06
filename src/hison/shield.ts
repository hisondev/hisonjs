import type { Hison } from "./types";
import { customOption } from "./core";

export const getShield = () => {
    return {
        isHison: true,
        execute(hison: Hison) {
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
                    customOption.shield.doDetectDevTool();
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
