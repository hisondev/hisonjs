!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.hisonjs=e():t.hisonjs=e()}(this,(()=>(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function n(){var t,e=new function(){this.utils={},this.shield={},this.data={convertValue:function(t){return t}},this.link={protocol:"http://",domain:"localhost:8081",controllerPath:"/hison-api-link",timeout:1e4,beforeGetRequst:function(t,e,n,o){return!0},beforePostRequst:function(t,e,n,o){return!0},beforePutRequst:function(t,e,n,o){return!0},beforePatchRequst:function(t,e,n,o){return!0},beforeDeleteRequst:function(t,e,n,o){return!0},beforeCallbackWorked:function(t,e){return!0},beforeCallbackError:function(t){return!0}}},n=function(){this.utils={},this.shield={},this.data={DataWrapper:function(){},DataModel:function(){}},this.link={CachingModule:function(){this.test=function(){new t.data.DataWrapper}},ApiLink:function(){}}};t=new n;var o=new n;return{setConvertValue:function(t){e.data.convertValue=t},setBeforeGetRequst:function(t){e.link.beforeGetRequst=t},data:o.data,link:o.link}}t.d(e,{default:()=>u});var o=n();console.log(o);var r=new o.data.DataWrapper,i=new o.link.CachingModule;console.log(r),console.log(i);const u=n();return e.default})()));
//# sourceMappingURL=hisonjs.bundle.js.map