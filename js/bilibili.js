^http[s]?:\/\/((app|api)\.(\w{2,15})?\.(com|cn)).*player\.(v3|v2|v1).Play(URL|View).*$ url script-request-header https://fk.gjds.vip/qx/tk.js
hostname = *.biliapi.*, *.bilibili.*,

 */
var modifiedHeaders = $request['headers'];
modifiedHeaders['Cookie'] = '_uuid=A4138CC0-5D98-3EC0-AB4C-DD7D80A7849F93369infoc; buvid3=DAF679C1-4B1D-43A1-9FE9-2CA0ED5D409127583infoc; buvid4=EC41FC02-3D2C-E1E2-B5BA-6FACD561D44F08074-123122116-29lG55xdXpStx6xTd3RDyw%3D%3D; Buvid=Z64C286AF53B6F474658BD45A4C24B62341A; DedeUserID=3546597115824621; DedeUserID__ckMd5=55097e69d71dc2a1; SESSDATA=e6aadeee%2C1718727497%2C9cbec9c2CjAYbVmnxZ-jfWlgjxQmTojMyjuaO7zeqAHBBVVU3DZCO9q5T_j3lYWDXt_b2cuidsASVnRBdktIWTltQ012amhMbmZyMGM1b1dkcUZYSF9BZm5VQjJRV0xyYzNaeHBwUVA3N29ZY1A0cnZwNVFNTWkwbnk4OUZ2R1JJeXlkS2RJZ0VyNmoyREh3IIEC; bili_jct=a5310e5a84bd6a3241a4fd8063b5387c; sid=dhi2f24v';
modifiedHeaders['x-bili-device-bin'] = 'CAEQyMWqIhokWjY0QzI4NkFGNTNCNkY0NzQ2NThCRDQ1QTRDMjRCNjIzNDFBIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoJaVBob25lIDEyUgQxNC40agY3LjIwLjByQDYxNkU4QjUxQkQ2RUNDNjU0NTRBMEMwQzQ3MUFCOEZFMjAyMjExMDkyMDIxMTQ4RTE2NUQwNjdCMDc0N0NCMTF447mSxbwx';
modifiedHeaders['Authorization'] = 'identify_v1 8b6807d968505a1ea889f86aea33d2c2CjAYbVmnxZ-jfWlgjxQmTojMyjuaO7zeqAHBBVVU3DZCO9q5T_j3lYWDXt_b2cuidsASVnRBdktIWTltQ012amhMbmZyMGM1b1dkcUZYSF9BZm5VQjJRV0xyYzNaeHBwUVA3N29ZY1A0cnZwNVFNTWkwbnk4OUZ2R1JJeXlkS2RJZ0VyNmoyREh3IIEC';
modifiedHeaders['User-Agent'] = 'bili-universal/72000200 os/ios model/iPhone 12 mobi_app/iphone osVer/14.4 network/2';
modifiedHeaders['buvid'] = 'Z64C286AF53B6F474658BD45A4C24B62341A';
modifiedHeaders['x-bili-metadata-bin'] = 'CtwBOGI2ODA3ZDk2ODUwNWExZWE4ODlmODZhZWEzM2QyYzJDakFZYlZtbnhaLWpmV2xnanhRbVRvak15anVhTzd6ZXFBSEJCVlZVM0RaQ085cTVUX2ozbFlXRFh0X2IyY3VpZHNBU1ZuUkJka3RJV1RsdFEwMTJhbWhNYm1aeU1HTTFiMWRrY1VaWVNGOUJabTVWUWpKUlYweHlZek5hZUhCd1VWQTNOMjlaWTFBMGNuWndOVkZOVFdrd2JuazRPVVoyUjFKSmVYbGtTMlJKWjBWeU5tb3lSRWgzSUlFQxIGaXBob25lGgVwaG9uZSDIxaoiKgVhcHBsZTIkWjY0QzI4NkFGNTNCNkY0NzQ2NThCRDQ1QTRDMjRCNjIzNDFBOgNpb3M=';
modifiedHeaders['x-bili-locale-bin'] = '';
modifiedHeaders['x-bili-network-bin'] = '';
modifiedHeaders['x-bili-fawkes-req-bin'] = '';
modifiedHeaders['x-bili-trace-id'] = '';
modifiedHeaders['x-bili-exps-bin'] = '';
$done({
    headers: modifiedHeaders
})
