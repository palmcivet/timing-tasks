const network = require("../util/network");
const { SMZDM_COOKIE } = require("../util/config");

const baseURL = "https://zhiyou.smzdm.com";

const headers = {
  "accept":
    "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
  "accept-encoding": "gzip, deflate, br",
  "accept-language":
    "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "host": "zhiyou.smzdm.com",
  "referrer": "https://zhiyou.smzdm.com/user/",
  "sec-fetch-dest": "script",
};

module.exports = {
  /**
   * 用户信息
   */
  getUser() {
    return network.get({
      url: `${baseURL}/user/info/jsonp_get_current`,
      headers: {
        cookie: SMZDM_COOKIE,
        ...headers,
      },
    });
  },
  /**
   * 签到
   */
  checkIn() {
    return network.get({
      url: `${baseURL}/user/checkin/jsonp_checkin?callback=jQuery112409568846254764496_${new Date().getTime()}&_=${new Date().getTime()}`,
      headers: {
        cookie: SMZDM_COOKIE,
        ...headers,
      },
    });
  },
};
