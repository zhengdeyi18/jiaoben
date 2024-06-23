function Env(t,e){class r{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let r=this.get;"POST"===e&&(r=this.post);const n=new Promise(((e,n)=>{r.call(this,t,((t,r,o)=>{t?n(t):e(r)}))}));return t.timeout?((t,e=1e3)=>Promise.race([t,new Promise(((t,r)=>{setTimeout((()=>{r(new Error("请求超时"))}),e)}))]))(n,t.timeout):n}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new r(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...r){try{return JSON.stringify(t,...r)}catch{return e}}getjson(t,e){let r=e;if(this.getdata(t))try{r=JSON.parse(this.getdata(t))}catch{}return r}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,r,n)=>e(n)))}))}runScript(t,e){return new Promise((r=>{let n=this.getdata("@chavy_boxjs_userCfgs.httpapi");n=n?n.replace(/\n/g,"").trim():n;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[s,a]=n.split("@"),i={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":s,Accept:"*/*"},policy:"DIRECT",timeout:o};this.post(i,((t,e,n)=>r(n)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),r=this.fs.existsSync(t),n=!r&&this.fs.existsSync(e);if(!r&&!n)return{};{const n=r?t:e;try{return JSON.parse(this.fs.readFileSync(n))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),r=this.fs.existsSync(t),n=!r&&this.fs.existsSync(e),o=JSON.stringify(this.data);r?this.fs.writeFileSync(t,o):n?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,r){const n=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of n)if(o=Object(o)[t],void 0===o)return r;return o}lodash_set(t,e,r){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,r,n)=>Object(t[r])===t[r]?t[r]:t[r]=Math.abs(e[n+1])>>0==+e[n+1]?[]:{}),t)[e[e.length-1]]=r),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,r,n]=/^@(.*?)\.(.*?)$/.exec(t),o=r?this.getval(r):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,n,""):e}catch(t){e=""}}return e}setdata(t,e){let r=!1;if(/^@/.test(e)){const[,n,o]=/^@(.*?)\.(.*?)$/.exec(e),s=this.getval(n),a=n?"null"===s?null:s||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),r=this.setval(JSON.stringify(e),n)}catch(e){const s={};this.lodash_set(s,o,t),r=this.setval(JSON.stringify(s),n)}}else r=this.setval(t,e);return r}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,r,n)=>{!t&&r&&(r.body=n,r.statusCode=r.status?r.status:r.statusCode,r.status=r.statusCode),e(t,r,n)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:r,statusCode:n,headers:o,body:s,bodyBytes:a}=t;e(null,{status:r,statusCode:n,headers:o,body:s,bodyBytes:a},s,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let r=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const r=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();r&&this.ckjar.setCookieSync(r,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:n,statusCode:o,headers:s,rawBody:a}=t,i=r.decode(a,this.encoding);e(null,{status:n,statusCode:o,headers:s,rawBody:a,body:i},i)}),(t=>{const{message:n,response:o}=t;e(n,o,o&&r.decode(o.rawBody,this.encoding))}))}}post(t,e=(()=>{})){const r=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[r](t,((t,r,n)=>{!t&&r&&(r.body=n,r.statusCode=r.status?r.status:r.statusCode,r.status=r.statusCode),e(t,r,n)}));break;case"Quantumult X":t.method=r,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:r,statusCode:n,headers:o,body:s,bodyBytes:a}=t;e(null,{status:r,statusCode:n,headers:o,body:s,bodyBytes:a},s,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let n=require("iconv-lite");this.initGotEnv(t);const{url:o,...s}=t;this.got[r](o,s).then((t=>{const{statusCode:r,statusCode:o,headers:s,rawBody:a}=t,i=n.decode(a,this.encoding);e(null,{status:r,statusCode:o,headers:s,rawBody:a,body:i},i)}),(t=>{const{message:r,response:o}=t;e(r,o,o&&n.decode(o.rawBody,this.encoding))}))}}time(t,e=null){const r=e?new Date(e):new Date;let n={"M+":r.getMonth()+1,"d+":r.getDate(),"H+":r.getHours(),"m+":r.getMinutes(),"s+":r.getSeconds(),"q+":Math.floor((r.getMonth()+3)/3),S:r.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(r.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in n)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?n[e]:("00"+n[e]).substr((""+n[e]).length)));return t}queryStr(t){let e="";for(const r in t){let n=t[r];null!=n&&""!==n&&("object"==typeof n&&(n=JSON.stringify(n)),e+=`${r}=${n}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,r="",n="",o={}){const s=t=>{const{$open:e,$copy:r,$media:n,$mediaMime:o}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{const s={};let a=t.openUrl||t.url||t["open-url"]||e;a&&Object.assign(s,{action:"open-url",url:a});let i=t["update-pasteboard"]||t.updatePasteboard||r;if(i&&Object.assign(s,{action:"clipboard",text:i}),n){let t,e,r;if(n.startsWith("http"))t=n;else if(n.startsWith("data:")){const[t]=n.split(";"),[,o]=n.split(",");e=o,r=t.replace("data:","")}else e=n,r=(t=>{const e={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var r in e)if(0===t.indexOf(r))return e[r];return null})(n);Object.assign(s,{"media-url":t,"media-base64":e,"media-base64-mime":o??r})}return Object.assign(s,{"auto-dismiss":t["auto-dismiss"],sound:t.sound}),s}case"Loon":{const r={};let o=t.openUrl||t.url||t["open-url"]||e;o&&Object.assign(r,{openUrl:o});let s=t.mediaUrl||t["media-url"];return n?.startsWith("http")&&(s=n),s&&Object.assign(r,{mediaUrl:s}),console.log(JSON.stringify(r)),r}case"Quantumult X":{const o={};let s=t["open-url"]||t.url||t.openUrl||e;s&&Object.assign(o,{"open-url":s});let a=t["media-url"]||t.mediaUrl;n?.startsWith("http")&&(a=n),a&&Object.assign(o,{"media-url":a});let i=t["update-pasteboard"]||t.updatePasteboard||r;return i&&Object.assign(o,{"update-pasteboard":i}),console.log(JSON.stringify(o)),o}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,r,n,s(o));break;case"Quantumult X":$notify(e,r,n,s(o));case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),r&&t.push(r),n&&t.push(n),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.debug}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.info}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.warn}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.error}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.map((t=>t??String(t))).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e,void 0!==t.message?t.message:t,t.stack)}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}(()=>{function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(){"use strict";e=function(){return n};var r,n={},o=Object.prototype,s=o.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",h=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function d(t,e,r,n){var o=e&&e.prototype instanceof b?e:b,s=Object.create(o.prototype),i=new q(n||[]);return a(s,"_invoke",{value:$(t,r,i)}),s}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=d;var f="suspendedStart",g="suspendedYield",y="executing",v="completed",m={};function b(){}function w(){}function S(){}var k={};l(k,c,(function(){return this}));var j=Object.getPrototypeOf,x=j&&j(j(M([])));x&&x!==o&&s.call(x,c)&&(k=x);var E=S.prototype=b.prototype=Object.create(k);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function O(e,r){function n(o,a,i,c){var u=p(e[o],e,a);if("throw"!==u.type){var h=u.arg,l=h.value;return l&&"object"==t(l)&&s.call(l,"__await")?r.resolve(l.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):r.resolve(l).then((function(t){h.value=t,i(h)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}var o;a(this,"_invoke",{value:function(t,e){function s(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(s,s):s()}})}function $(t,e,n){var o=f;return function(s,a){if(o===y)throw Error("Generator is already running");if(o===v){if("throw"===s)throw a;return{value:r,done:!0}}for(n.method=s,n.arg=a;;){var i=n.delegate;if(i){var c=N(i,n);if(c){if(c===m)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===f)throw o=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var u=p(t,e,n);if("normal"===u.type){if(o=n.done?v:g,u.arg===m)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=v,n.method="throw",n.arg=u.arg)}}}function N(t,e){var n=e.method,o=t.iterator[n];if(o===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=r,N(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var s=p(o,t.iterator,e.arg);if("throw"===s.type)return e.method="throw",e.arg=s.arg,e.delegate=null,m;var a=s.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,m):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,m)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function q(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function M(e){if(e||""===e){var n=e[c];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function t(){for(;++o<e.length;)if(s.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=r,t.done=!0,t};return a.next=a}}throw new TypeError(t(e)+" is not iterable")}return w.prototype=S,a(E,"constructor",{value:S,configurable:!0}),a(S,"constructor",{value:w,configurable:!0}),w.displayName=l(S,h,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,S):(t.__proto__=S,l(t,h,"GeneratorFunction")),t.prototype=Object.create(E),t},n.awrap=function(t){return{__await:t}},L(O.prototype),l(O.prototype,u,(function(){return this})),n.AsyncIterator=O,n.async=function(t,e,r,o,s){void 0===s&&(s=Promise);var a=new O(d(t,e,r,o),s);return n.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(E),l(E,h,"Generator"),l(E,c,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=M,q.prototype={constructor:q,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&s.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return i.type="throw",i.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=s.call(a,"catchLoc"),u=s.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&s.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:M(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),m}},n}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,s,a,i=[],c=!0,u=!1;try{if(s=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=s.call(r)).done)&&(i.push(n.value),i.length!==e);c=!0);}catch(t){u=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(u)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e,r,n,o,s,a){try{var i=t[s](a),c=i.value}catch(t){return void r(t)}i.done?e(c):Promise.resolve(c).then(n,o)}function s(t){return function(){var e=this,r=arguments;return new Promise((function(n,s){var a=t.apply(e,r);function i(t){o(a,n,s,i,c,"next",t)}function c(t){o(a,n,s,i,c,"throw",t)}i(void 0)}))}}var a=new Env("阵风指南"),i="1.0.1",c="https://raw.githubusercontent.com/Yuheng0101/X/main/Scripts/zfzn.js",u=new URL(c).hostname;function h(){return l.apply(this,arguments)}function l(){return l=s(e().mark((function t(){var r,n;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=$request.method.toLowerCase(),n={url:$request.url,headers:$request.headers},"post"==r&&Object.assign(n,{body:$request.body}),t.next=5,a.http[r](n);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)}))),l.apply(this,arguments)}function d(t){return JSON.parse(atob(t.split("").reverse().join("")))}function p(e){return"object"===t(e)&&(e=JSON.stringify(e)),btoa(e.split("").map((function(t){var e=t.charCodeAt(0);return e>127?"\\u"+e.toString(16).padStart(4,"0"):t})).join("")).split("").reverse().join("")}function f(){var t="abcdefghijklmnopqrstuvwxyz",e="0123456789",r=t+e,n=Math.floor(8*Math.random())+3,o=t[Math.floor(Math.random()*t.length)];o+=e[Math.floor(Math.random()*e.length)],o+=t[Math.floor(Math.random()*t.length)];for(var s=3;s<n;s++)o+=r[Math.floor(Math.random()*r.length)];if(o=o.split("").sort((function(){return Math.random()-.5})).join(""),!t.includes(o[0]))for(var a=1;a<o.length;a++)if(t.includes(o[a])){var i=[o[a],o[0]];o[0]=i[0],o[a]=i[1];break}return"o"+o}function g(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:9,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r="",n=0;n<t;n++)r+=e.charAt(Math.floor(Math.random()*e.length));return"ab"+r}function y(){return v.apply(this,arguments)}function v(){return v=s(e().mark((function t(){var r,n,o,s,i,c,u,h,l;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new URL($request.url),n=r.origin,o=r.host,s=g(20),i={url:"".concat(n,"/java/user/register"),timeout:3e3,headers:{"Accept-Encoding":"gzip, deflate, br","Content-Type":"multipart/form-data; boundary=----WebKitFormBoundaryEH8gKqiPIlA40vqX",Origin:n,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 abab/".concat(s),Cookie:"device=".concat(s),Host:o,"Accept-Language":"zh-CN,zh-Hans;q=0.9",Accept:"*/*"},body:'------WebKitFormBoundaryEH8gKqiPIlA40vqX\nContent-Disposition: form-data; name="username"\n\n'.concat(f(),'\n------WebKitFormBoundaryEH8gKqiPIlA40vqX\nContent-Disposition: form-data; name="password"\n\nonlypwd123\n------WebKitFormBoundaryEH8gKqiPIlA40vqX\nContent-Disposition: form-data; name="repassword"\n\nonlypwd123\n------WebKitFormBoundaryEH8gKqiPIlA40vqX--')},t.prev=3,t.next=6,a.http.post(i);case 6:if(c=t.sent,u=c.body,1!==(null==(h=d(u))?void 0:h.code)){t.next=16;break}return a.debug("注册成功: ".concat(h.data.username,", TOKEN: ").concat(h.data.token)),l=h.data.token,a.setjson({token:l,count:3},"zfzn_token"),t.abrupt("return",{token:l,count:3});case 16:return t.abrupt("return",Promise.reject("注册失败(:".concat(h.message)));case 17:t.next=22;break;case 19:return t.prev=19,t.t0=t.catch(3),t.abrupt("return",Promise.reject("注册失败了(, ".concat(t.t0)));case 22:case"end":return t.stop()}}),t,null,[[3,19]])}))),v.apply(this,arguments)}function m(t){return b.apply(this,arguments)}function b(){return b=s(e().mark((function t(r){var n;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,function(){var t=s(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a.http.get({url:r,timeout:2e3});case 3:return o=t.sent,s=o.body,i=null===(n=s.match(/@\s*version\s*([\d.]+)/))||void 0===n?void 0:n[1],t.abrupt("return",i);case 9:return t.prev=9,t.t0=t.catch(0),t.abrupt("return",(a.error("获取版本失败: ".concat(t.t0)),""));case 12:case"end":return t.stop()}}),t,null,[[0,9]]);var n,o,s,i})));return function(){return t.apply(this,arguments)}}()();case 2:if(n=t.sent){t.next=5;break}throw new Error("版本获取失败");case 5:if(!n||i===n){t.next=7;break}throw a.msg(a.name,"滴滴滴, 老司机新版本来袭！","当前版本: ".concat(n,"，最新版本: ").concat(i,"\n快点我更新🚗"),{$open:r}),new Error("版本不匹配");case 7:case"end":return t.stop()}}),t)}))),b.apply(this,arguments)}function w(t){return S.apply(this,arguments)}function S(){return S=s(e().mark((function t(r){var n,o,i,c=arguments;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=c.length>1&&void 0!==c[1]?c[1]:"",o="".concat(r,"_").concat(a.time("yyyyMM"),"_notified"),i=function(){var t=s(e().mark((function t(){var n,s,i,c;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=["本脚本仅用于技术学习，禁止非法使用。","不得将本脚本用于任何商业或违法用途，违者后果自负。","在中国大陆地区，严禁传播本脚本。","开发者不对脚本的滥用承担任何责任。","违规使用导致的后果由使用者自行承担。","如有违反相关法规，将立即删除本脚本。","使用者若违反声明规定，将自动视为放弃使用权。","本声明的最终解释权归开发者所有。"],"https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/notice.json",t.prev=2,t.next=5,a.http.get({url:"https://cdn.jsdelivr.net/gh/Yuheng0101/X@main/Utils/notice.json",timeout:2e3});case 5:s=t.sent,i=s.body,n=a.toObj(i),a.debug("获取远程声明成功"),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(2),a.debug("获取远程声明失败, 使用本地声明");case 13:return a.setdata("true",o),c=a.time("yyyyMM",new Date((new Date).setMonth((new Date).getMonth()-1))),t.abrupt("return",(a.setdata(null,"".concat(r,"_").concat(c,"_notified")),n.join("\n")));case 16:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(){return t.apply(this,arguments)}}(),"true"!=a.getdata(o)){t.next=6;break}a.debug("本月已通知过，本次不再通知"),t.next=13;break;case 6:return t.t0=a,t.t1=a.name,t.next=10,i();case 10:t.t2=t.sent,t.t3={$open:"https://t.me/yqc_123/",$media:n},t.t0.msg.call(t.t0,t.t1,"脚本声明",t.t2,t.t3);case 13:case"end":return t.stop()}}),t)}))),S.apply(this,arguments)}a.logLevel=u.match(/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/)?"debug":"info",s(e().mark((function t(){var n,o,s,i,u,l,f,g,v,b,S,k,j,x,E,L,O;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(c);case 2:return t.next=4,w("zfzn");case 4:if(!$request.url.match(/show\/\d+$/)){t.next=55;break}if(n={status:a.isQuanX()?"HTTP/1.1 200 OK":200,headers:{"Content-Type":"text/html; charset=utf-8;"},body:""},t.prev=6,s=a.getjson("zfzn_token",null)){t.next=12;break}return t.next=11,y();case 11:s=t.sent;case 12:if(!((null===(o=s)||void 0===o?void 0:o.count)<=0)){t.next=16;break}return t.next=15,y();case 15:s=t.sent;case 16:return i=Object.fromEntries(Object.entries($request.headers).map((function(t){var e=r(t,2),n=e[0],o=e[1];return[n.toLowerCase(),o]}))),a.debug($request.body),u=$request.body.replace(/(name="token"\s*\r?\n\s*\r?\n)([A-Z0-9]{32})/,"$1".concat(s.token)),a.debug(u),l={url:$request.url,headers:{Cookie:i.cookie,"User-Agent":i["user-agent"],"Content-Type":i["content-type"],"Accept-Encoding":"gzip, deflate, br",Origin:i.origin,Host:i.host,"Accept-Language":"zh-CN,zh-Hans;q=0.9",Accept:"*/*"},body:u},a.debug(JSON.stringify(l,null,2)),t.next=24,a.http.post(l);case 24:f=t.sent,g=f.body,s.count--,a.setjson(s,"zfzn_token"),v=d(g),a.debug(a.toStr(v)),v.data.popup=null,v.data.banner=[],v.data.vip=1,v.data.today_max="测试使用",v.data.today_left="免费分享",v.data.fullvideo=!0,n.body=p(v),t.next=52;break;case 39:return t.prev=39,t.t0=t.catch(6),a.error(t.t0),t.next=44,h();case 44:b=t.sent,S=b.body,(k=d(S)).data.popup=null,k.data.banner=[],k.data.today_max="刷新重试",k.data.today_left="解锁失败",n.body=p(k);case 52:return t.prev=52,a.done(a.isQuanX()?n:{response:n}),t.finish(52);case 55:j=$response.body,$response.body.match(/idata=/)&&(x=$response.body.match(/idata=\'(.*?)\'/)[1],(E=d(x)).data.banner=[],L=p(E),j=j.replace(/idata='.*?'/g,"idata='".concat(L,"'"))),O=d(j),a.debug(JSON.stringify(O,null,2)),$request.url.match(/index\/game$/)&&(O.data.game=[]),$request.url.match(/user\/my/)&&(O.data.vip=1,O.data.svip=1,O.data.today_max=999,O.data.today_left=999),j=p(O),a.done({body:j});case 63:case"end":return t.stop()}}),t,null,[[6,39,52,55]])})))().catch((function(t){return a.logErr(t)})).finally((function(){return $done({})}))})();
