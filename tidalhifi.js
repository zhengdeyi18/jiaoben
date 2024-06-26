/******************************
脚本功能：TIDAL解锁HiFi Plus
*******************************
[rewrite_local]
# > TIDAL解锁HiFi Plus
^https?:\/\/api\.tidal\.com\/v1\/users\/\d+\/subscription.+ url script-response-body https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/tidalhifi.js
^https?:\/\/api\.tidal\.com\/v1\/tracks/\d+\/playbackinfopostpaywall.+ url script-analyze-echo-response https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/tidalhifi.js

[mitm] 
hostname = api.tidal.com
*******************************/

$done({
    body: JSON.stringify({
        "status": "ACTIVE",
        "canGetTrial": false,
        "startDate": "2019-09-28T09:09:09.000+0000",
        "subscription": {
            "type": "PREMIUM_PLUS",
            "offlineGracePeriod": 999999
        },
        "premiumAccess": true,
        "paymentType": "ADYEN_CREDIT_CARD",
        "paymentOverdue": false,
        "highestSoundQuality": "HI_RES",
        "validUntil": "2999-09-28T09:09:09.000+0000"
    })
});
