(async () => {
  "use strict";

  const API_URL = "https://onz3v.120399.xyz/rrzj";

  // 白名单：命中才处理
  const WHITELIST = [
    "represent/walk/class",
    "represent/them/media",
    "represent/itself/set",
  ];

  // 这些接口直接转发整个 $request（含 headers），其它接口只转发 url + body
  const FULL_REQUEST_LIST = [
    "represent/walk/class",
    "represent/itself/set",
  ];

  // 环境判断：Quantumult X 用 $task，其它（Surge/Loon）用 $httpClient
  const isQuanX = typeof $task !== "undefined";

  // 字符串转 hex
  const toHex = (str) => {
    let out = "";
    for (let i = 0; i < str.length; i++) {
      out += str.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return out;
  };

  // 安全 JSON.parse
  const safeJsonParse = (str) => {
    if (!str || typeof str !== "string") return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  // POST 请求封装
  const post = (opts) =>
    new Promise((resolve, reject) => {
      if (isQuanX) {
        $task.fetch({ ...opts, method: "POST" }).then(
          (res) => resolve(res.body),
          reject,
        );
      } else {
        $httpClient.post(opts, (err, _resp, body) => {
          if (err) reject(err);
          else resolve(body);
        });
      }
    });

  // 从 url 的 query 中取参数
  const getQueryParam = (url, name) => {
    const m = url.match(new RegExp("[?&]" + name + "=([^&#]*)"));
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  };

  let responseBody = $response.body;

  try {
    const reqUrl = $request.url;

    // 1. 白名单校验
    if (!WHITELIST.some((p) => reqUrl.includes(p))) {
      throw `⚠️ ${reqUrl.match(/\/[^\/]+$/)} 不在白名单, 跳过`;
    }

    // 2. 非会员画质（HD / SD）直接跳过
    const quality = getQueryParam(reqUrl, "civilExactly");
    if (quality && /[HS]D/.test(quality)) {
      throw `⚠️ 非会员画质[${quality}] 跳过`;
    }

    // 3. 组装上送 payload
    const useFullRequest = FULL_REQUEST_LIST.some((p) => reqUrl.includes(p));
    const payload = useFullRequest
      ? $request
      : { url: reqUrl, body: responseBody };

    // 4. 调远端解密接口
    const remoteBody = await post({
      url: API_URL,
      headers: {
        "Content-Type": "text/plain",
        "x-modify-url": reqUrl,
      },
      body: toHex(JSON.stringify(payload)),
    });

    // 5. 错误码处理
    const parsed = safeJsonParse(remoteBody);
    if (parsed && parsed.code) {
      throw `⚠️ [${parsed.code}] ${parsed.msg || "请求失败"}`;
    }

    if (remoteBody) responseBody = remoteBody;
  } catch (e) {
    console.log(`‼️脚本执行出现错误:${(e && e.message) || e}`);
  } finally {
    $done({ body: responseBody });
  }
})();
