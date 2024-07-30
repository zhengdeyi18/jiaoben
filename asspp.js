#!name=ASSPP增强脚本--Eric
#!desc=增加端口同时查询版本号id

[MITM]
hostname =  %APPEND% api.timbrd.com


[Script]
ASSPP = type=http-response,pattern=https://api.timbrd.com/apple/app-version/index.php,requires-body=1,max-size=0,binary-body-mode=0,script-path=https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/asspp.js

let _0x4ec59e=$response.body,_0x39a734=JSON.parse(_0x4ec59e);console.log("Original response body:",JSON.stringify(_0x39a734,null,2));const _0x362853=/id=(\d+)/,_0x3d729c=$request.url.match(_0x362853);if(_0x3d729c){const e=_0x3d729c[1],o="https://apis.bilin.eu.org/history/"+e+"?page=1";console.log("ID:",e),console.log("Fetching URL:",o);const r={authority:"apis.bilin.eu.org",accept:"*/*",origin:"https://appstore.bilin.eu.org","accept-encoding":"gzip, deflate, br","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1","accept-language":"zh-CN,zh-Hans;q=0.9",referer:"https://appstore.bilin.eu.org/"};$httpClient.get({url:o,headers:r},(function(e,o,r){if(e)console.error("Error fetching data:",e),_0x139cbf(_0x39a734);else{let e;console.log("Fetched data from URL1:",r);try{e=JSON.parse(r)}catch(e){return console.error("Error parsing fetched data:",e),void _0x139cbf(_0x39a734)}if(e&&e.data){console.log("Fetched data field:",JSON.stringify(e.data,null,2));const o=_0x39a734.concat(e.data),r=Array.from(new Set(o.map((e=>e.external_identifier)))).map((e=>o.find((o=>o.external_identifier===e))));console.log("Unique merged response body:",JSON.stringify(r,null,2)),$done({body:JSON.stringify(r)})}else console.warn('Fetched data does not contain "data" field'),$done({body:JSON.stringify(_0x39a734)})}}))}else console.error("ID not found in the current request URL"),$done({body:JSON.stringify(_0x39a734)});function _0x139cbf(e){console.error("An error occurred while fetching additional data"),e.push({error:"An error occurred while fetching additional data"}),$done({body:JSON.stringify(e)})}
