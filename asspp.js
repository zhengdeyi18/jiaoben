#!name=ASSPP增强脚本--Eric
#!desc=增加端口同时查询版本号id

[MITM]
hostname =  %APPEND% api.timbrd.com


[Script]
ASSPP = type=http-response,pattern=https://api.timbrd.com/apple/app-version/index.php,requires-body=1,max-size=0,binary-body-mode=0,script-path=https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/asspp.js

let responseBody=$response.body,parsedResponse=JSON.parse(responseBody);console.log("Original response body:",JSON.stringify(parsedResponse,null,2));const idPattern=/id=(\d+)/,matchedId=$request.url.match(idPattern);if(matchedId){const e=matchedId[1],r="https://apis.bilin.eu.org/history/"+e+"?page=1";console.log("ID:",e),console.log("Fetching URL:",r);const o={authority:"apis.bilin.eu.org",accept:"*/*",origin:"https://appstore.bilin.eu.org","accept-encoding":"gzip, deflate, br","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1","accept-language":"zh-CN,zh-Hans;q=0.9",referer:"https://appstore.bilin.eu.org/"};$httpClient.get({url:r,headers:o},function(e,r,o){if(e)console.error("Error fetching data:",e),handleError(parsedResponse);else{let e;console.log("Fetched data from URL1:",o);try{e=JSON.parse(o)}catch(e){return console.error("Error parsing fetched data:",e),void handleError(parsedResponse)}if(e&&e.data){console.log("Fetched data field:",JSON.stringify(e.data,null,2));const r=parsedResponse.concat(e.data),o=Array.from(new Set(r.map(e=>e.external_identifier))).map(e=>r.find(r=>r.external_identifier===e));console.log("Unique merged response body:",JSON.stringify(o,null,2)),$done({body:JSON.stringify(o)})}else console.warn('Fetched data does not contain "data" field'),$done({body:JSON.stringify(parsedResponse)})}})}else console.error("ID not found in the current request URL"),$done({body:JSON.stringify(parsedResponse)});function handleError(e){console.error("An error occurred while fetching additional data"),e.push({error:"An error occurred while fetching additional data"}),$done({body:JSON.stringify(e)})}
