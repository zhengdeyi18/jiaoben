/*
 * 音熊陪练
 * 只测试surge
[rewrite_local]

^http:\/\/(java|php)-api\.super-yx\.com url script-request-header https://raw.githubusercontent.com/zhengdeyi18/jiaoben/main/音熊陪练.js


[mitm]
hostname = *.super-yx.com

*/

function QQQO() {
  return [
    "OＯ0$", "SfkjgsttjgiaFOVmAiPk.rMcHoQmr.DvqI7VwURY==", "jCklW6/cT3m", 
    "W7P3tJ3cR8ktWOC", "qSo9WO9DW6JdMcpcLZvkW7S7tG", "W7rnWPFcMCk+", 
    "W5JcSmooW41Swg0", "zmoceMO", "FSkSiCo5WR8CDG", "W4ymW6NcT8oCWRbdBCo8WRnnW4/dIW", 
    "W6qsW5uXvmoiiG", "W4NcJg8nWQKzWOHWzrL7nwC", "oCk7kCoBWOu/tXv7BG", 
    "CmoyWOhdRGieqmoCD8kKk8kE", "tColW5Cznq", "zmkpW43dVYFcNmoI", 
    "DSotWRldV8kyW47cSaSjWOn1WRC", "dSk5aCohWP4", "y8oaWPLNoW", 
    "W7BcSmki", "W7WHeL3dLG", "WQiEW5hdPCoNE3T6", "WRv3W4joWOxdUCoNzdXBWRldOW", 
    "WPCcWQH/WRq", "o8oxz8kqzG", "WPRdLd9c", "W6SMhmkwpMZdVdBcSWpcRq", 
    "W6XZAmkI", "WQ3cRCkeW74jW5ZcLX7dNxVdJdNcLW", "rConW6BdUCoDwwXLqsnO", 
    "W5BdT8oxWQbQ", "W57dJJjFWQ0", "W4ybW6JcT8ow", "ggH0kruoW6xcTdeve8k1mG", 
    "DmklW7zlwa", "ge/cU0tdI8kCW4BcJciHW70", "gmkYW7eKCSoAWQTKW43cI8kf", 
    "W5BcS8oxW7DAC0y", "W71cWPtdPCoFrxbEWOy", "jmomgcvCrua", 
    "WQddPJSimGNcGmkUffldVgW", "WPntW7m0W5zDza", "FCkKW6tcKvz+vG", 
    "DCoIWPNcIgZdGSoqBGq", "omkQomofWPaVFq", "wSoporr/", "tJ4ojmotWPadk8obvSovWPldLW"
  ];
}

let url = $request.url,
  body = $request.body;
const currentHour = new Date().getHours();
let newUid;
if (currentHour >= 0 && currentHour < 6) newUid = "00001";
else if (currentHour >= 6 && currentHour < 12) newUid = "00002";
else if (currentHour >= 12 && currentHour < 18) newUid = "00003";
else newUid = "00004";

url && (url = url.replace(/(uid=\d{5}|\/\d{5}(?=\/|$))/, match => {
  return match.includes("uid=") ? "uid=" + newUid : "/" + newUid;
}));
body && (body = body.replace(/&uid=\d{5}/, "&uid=" + newUid));

$done({
  url: url,
  body: body
});
