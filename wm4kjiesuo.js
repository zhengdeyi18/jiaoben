/***
完美4k解锁VIP

[rewrite_local]
^http://111.229.140.167:8762/apptov5/v1/vod/getVod url script-response-body https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/wm4k.js

[mitm] 
hostname = %APPEND% 111.229.140.167

***/

let responseBody = JSON.parse($response.body);
responseBody.data.vod_play_list.forEach(vodItem => {
  vodItem.urls.forEach(urlItem => {
    urlItem.is_free = true;
    urlItem.try_see = 900000;
  });
});
$done({
  "body": JSON.stringify(response
