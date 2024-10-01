[rewrite_local]
#App内
http://111.229.140.167:8762/apptov5/v1/vod/getVod url script-response-body https://raw.githubusercontent.com/zhengdeyi18/jiaoben/refs/heads/main/wm4kjiesuo.js

#投屏
https?:\/\/omts\.tc\.qq\.com\/[^\s]+\.m3u8(\?[^\s]*)? url script-request-header https://raw.githubusercontent.com/zhengdeyi18/jiaoben/refs/heads/main/wm4ktzsenplayer.js

[mitm]
hostname = omts.tc.qq.com, 111.229.140.167:8762
