const axios = require('axios');

// 生成随机deviceId
function generateRandomDeviceId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }).toUpperCase();
}

// 新的API的URL和头部信息
let url_login = 'https://api.mastur.xyz/client/user/firstDeviceLogin';
let headers_login = {
  'system-version': '16.3',
  'Accept': '*/*',
  'version': '1.1.25',
  'Authorization': '',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN',
  'platform': '1',
  'Content-Type': 'application/json',
  'User-Agent': 'FlashX VPN',
  'Connection': 'keep-alive'
};

// 生成随机deviceId
let random_device_id = generateRandomDeviceId();

// 请求体
let payload_login = {
  "deviceId": random_device_id,
  "deviceType": "1",
  "deviceInfo": "iPhone 13"
};

// 发送请求并获取token
axios.post(url_login, payload_login, { headers: headers_login })
  .then(resp_login => {
    let token = resp_login.data.token;

    // 第二个API的URL和头部信息
    let url_config = 'https://api.mastur.xyz/client/home/getConfigYaml?adblock=true&website=false';
    let headers_config = {
      'accept': '*/*',
      'platform': '*/*',
      'system-version': '15.6',
      'version': '1.1.24',
      'user-agent': 'BackgroundShortcutRunner/1355.1 CFNetwork/1404.0.5 Darwin/22.3.0',
      'accept-language': 'zh-CN',
      'authorization': token,
      'accept-encoding': 'gzip, deflate, br'
    };

    // 使用token发送请求
    return axios.get(url_config, { headers: headers_config });
  })
  .then(resp_config => {
    // 使用正则表达式查找密码
    let passwordMatch = resp_config.data.match(/password: (\S+)/);
    if (passwordMatch && passwordMatch.length > 1) {
      // 找到第一个password值
      let password = passwordMatch[1];
      console.log(password); // 输出密码
    } else {
      console.log('No password found in the response data.');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
    process.exit(1);
  });
