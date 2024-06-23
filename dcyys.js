/*多次元雅思

[rewrite_local] 
^https?:\/\/ielts\.dcyedu\.com\/\/app\/user\/info url script-response-body https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/dcyys.js
[MITM]
hostname = ielts.dcyedu.com
*/
var Rnik = JSON.parse($response.body);
Rnik = {
  "msg": "登录成功",
  "data": {
    "sex": "0",
    "nickName": "ZDY",
    "isMember": true,
    "systemTime": "4092610661000",
    "userId": 95914,
    "avatar": "https://file.dcyedu.com/2024/05/17/03686561_58C2_4196_B6AF_BA763B984904.png"
  },
  "code": 200
};
$done({
  "body": JSON.stringify(Rnik)
});
