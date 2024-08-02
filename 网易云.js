#!name=网易云音乐
#!desc=解锁

[Rewrite]
^https?:\/\/interface\d?\.music\.163\.com\/e?api\/vip\/cashier\/tspopup\/get - reject-200

[Script]
http-response ^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(mine\/collect\/header\/info|v\d\/user\/detail\/\d+|vipnewcenter\/app\/resource\/newaccountpage|music-vip-membership\/client\/vip\/info|batch|playlist\/privilege|search\/complex\/page|v\d\/(discovery\/recommend\/songs|playlist\/detail)) script-path=https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/wyy.js, requires-body=true, binary-body-mode=true, timeout=60, tag=网易云重写

http-request ^https?:\/\/interface\d?\.music\.163\.com\/e?api\/(song\/enhance\/player\/url\/v\d|vipauth\/app\/auth\/query) script-path=https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/wyy.js, requires-body=true, timeout=60, tag=网易云转发

[MITM]
hostname = interface*.music.163.com
