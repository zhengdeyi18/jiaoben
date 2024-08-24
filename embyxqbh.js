/*
@Name：Emby自动保号
手动观看一次，提示获取成功✅|可多账号获取
获取完参数请手动关闭重写
[rewrite_local]
^https:\/\/.+\/emby\/Sessions\/Playing\/Stopped url script-request-body https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/embyxqbh.js

[task_local]
35 22 15,30 * * https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/embyxqbh.js, tag=Emby自动观看, img-url=https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/lige47/emby.png, enabled=true

[MITM]
hostname = -*.fileball.app, *

*/

const isRequest = typeof $request !== 'undefined';
const isSurge = typeof $httpClient !== 'undefined'; 
const isLoon = typeof $loon !== 'undefined'; 
const isQX = typeof $task !== 'undefined'; 

const notify = (title, subtitle, message) => {
    if (isQX) {
        $notify(title, subtitle, message);
    } else if (isSurge || isLoon) {
        $notification.post(title, subtitle, message);
    }
};

const setValueForKey = (value, key) => {
    if (isQX) {
        return $prefs.setValueForKey(value, key);
    } else if (isSurge || isLoon) {
        return $persistentStore.write(value, key);
    }
};

const valueForKey = (key) => {
    if (isQX) {
        return $prefs.valueForKey(key);
    } else if (isSurge || isLoon) {
        return $persistentStore.read(key);
    }
};

const fetch = (options) => {
    if (isQX) {
        return $task.fetch(options);
    } else if (isSurge || isLoon) {
        return new Promise((resolve, reject) => {
            $httpClient.post(options, (error, response, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        statusCode: response.status,
                        headers: response.headers,
                        body: data
                    });
                }
            });
        });
    }
};

const generateKey = (prefix, suffix) => prefix + "_" + suffix;
const requestPrefix = "Emby_request";

if (isRequest) {
    const requestUrl = $request.url;
    const requestHeaders = $request.headers;
    const requestBody = $request.body;
    const embyToken = requestHeaders["X-Emby-Token"];

    if (!embyToken) {
        notify("Emby捕获", "失败❌", "请求头中缺少X-Emby-Token");
        $done({});
    }

    let index = 1;
    while (valueForKey(generateKey(requestPrefix, index + "_url"))) {
        const savedHeaders = JSON.parse(valueForKey(generateKey(requestPrefix, index + "_headers")) || "{}");
        if (savedHeaders["X-Emby-Token"] === embyToken) {
            notify("Emby" + index + "捕获", "已存在✅", "该Emby请求已成功获取请勿重复获取");
            $done({});
        }
        index++;
    }

    const urlKey = generateKey(requestPrefix, index + "_url");
    const headersKey = generateKey(requestPrefix, index + "_headers");
    const bodyKey = generateKey(requestPrefix, index + "_body");

    setValueForKey(requestUrl, urlKey);
    setValueForKey(JSON.stringify(requestHeaders), headersKey);
    if (requestBody) {
        setValueForKey(requestBody, bodyKey);
    }

    notify("Emby" + index + "捕获", "成功✅", "多账号获取完即时关闭重写避免不必要的MITM");
    $done({});
} else {
    async function processRequest(index) {
        try {
            const urlKey = generateKey(requestPrefix, index + "_url");
            const headersKey = generateKey(requestPrefix, index + "_headers");
            const bodyKey = generateKey(requestPrefix, index + "_body");

            const savedUrl = valueForKey(urlKey);
            const savedHeaders = valueForKey(headersKey);
            const savedBody = valueForKey(bodyKey);

            if (!savedUrl || !savedHeaders) throw new Error("未找到保存的URL或请求头");

            const headers = JSON.parse(savedHeaders);
            const response = await fetch({
                url: savedUrl,
                method: "POST",
                headers: headers,
                body: savedBody
            });

            if (response.statusCode === 204) {
                notify("Emby" + index, "播放成功🎉", "状态码204");
            } else {
                notify("Emby" + index, "失败", "状态码: " + response.statusCode);
            }
        } catch (error) {
            notify("Emby" + index, "错误", "错误信息: " + (error.message || error));
        }
    }

    async function processAllRequests() {
        let index = 1;
        while (valueForKey(generateKey(requestPrefix, index + "_url"))) {
            await processRequest(index);
            index++;
        }

        if (index === 1) {
            notify("Emby", "错误", "未找到任何已保存的请求");
        }

        $done();
    }

    processAllRequests();
}
