const network = require("../util/network");
const { SMZDM_COOKIE } = require("../util/config");

const baseURL = "https://zhiyou.smzdm.com";

const headers = {
  accept: "*/*",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "zh-CN,zh;q=0.9",
  connection: "keep-alive",
  host: "zhiyou.smzdm.com",
  referer: "https://www.smzdm.com/",
  "sec-fetch-dest": "script",
  "sec-fetch-mode": "no-cors",
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
      url: `${baseURL}/user/checkin/jsonp_checkin`,
      headers: {
        cookie: SMZDM_COOKIE,
        ...headers,
      },
    });
  },
};
