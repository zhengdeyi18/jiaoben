#!name=网易云音乐
#!desc=解锁会员音频、音质
#!icon=https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d3/77/da/d377dac9-b69e-5b7c-e7cb-b761f96decec/AppIcon-1x_U007emarketing-0-6-0-0-85-220-0.png/144x144.png
#!homepage = https://github.com/Yuheng0101/X/tree/main/Scripts/NeteaseCloudMusic

[Rewrite]
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/vip\/cashier\/tspopup\/get - reject-200

[Script]
http-response ^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(v\d\/user\/detail\/\d+|vipnewcenter\/app\/resource\/newaccountpage|music-vip-membership\/client\/vip\/info|batch|playlist\/privilege|search\/complex\/page|v\d\/(discovery\/recommend\/songs|playlist\/detail)) script-path=https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/wyy.js, requires-body=true, binary-body-mode=true, timeout=60, tag=网易云重写

http-request ^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(song\/enhance\/player\/url\/v\d|vipauth\/app\/auth\/query) script-path=https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/wyy.js, requires-body=true, timeout=60, tag=网易云转发

[MITM]
hostname = interface*.music.163.com
