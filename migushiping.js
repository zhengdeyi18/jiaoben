/*
软件版本：6.2.30
*******************************
[rewrite_local]

# > 咪咕视频
^https?:\/\/(play|dis).*miguvideo.com\/(play|dis)(url|play)\/.*$ url script-response-body https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/%E7%BD%91%E6%98%93%E4%BA%91.js
^https?:\/\/play.miguvideo.com\/playurl\/v1\/play\/playurl\?2Kvivid=true?.*=true$ url script-request-header https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/%E7%BD%91%E6%98%93%E4%BA%91.js
# > 开屏广告
^https://.*miguvideo\.com/request/sdk url reject-200
^https://common-sc\.miguvideo\.com/task/v7/task-list/cmvideo/visitor url reject-200

var modifiedHeaders = $request.headers;
delete modifiedHeaders.userInfo;
delete modifiedHeaders.Cookie;
myInterval(function () {}, 4000);
delete modifiedHeaders.mobile;
delete modifiedHeaders.sign;
delete modifiedHeaders["Phone-Info"];
modifiedHeaders["User-Agent"] = "MiguVideo/6.2.30 (iPhone; iOS 16.2; Scale/3.00)";
modifiedHeaders.userId = "1347425432";
modifiedHeaders.userToken = "nlps1186F42063E36A63E79D";
modifiedHeaders.idfa = "11111111-1234-1234-1234-121718152634";
modifiedHeaders.LEGAO_LOCATION = "";
var usuuu_0x5440d4 = {
  headers: modifiedHeaders
};
$done(usuuu_0x5440d4);
function myInterval(n, t) {
  !function i() {
    setTimeout(function () {
      n();
      i();
    }, t);
  }();
}

[mitm] 
hostname = *.miguvideo.com

*
*
*/
