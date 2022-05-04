const network = require("../util/network");
const config = require("../util/config");

const userURL = "https://api.juejin.cn";
const mimingURL = "https://juejin-game.bytedance.com";

const headers = {
  origin: "https://juejin.cn",
  referer: "https://juejin.cn/",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
};

const user = {
  /**
   * 用户信息
   */
  getUser() {
    return network.get({
      url: `${userURL}/user_api/v1/user/get`,
      headers: {
        cookie: JUEJIN_COOKIE,
        ...headers,
      },
    });
  },
  /**
   * 签到
   */
  checkIn() {
    return network.post({
      url: `${userURL}/growth_api/v1/check_in`,
      headers: {
        cookie: JUEJIN_COOKIE,
        ...headers,
      },
    });
  },
  /**
   * 抽奖
   */
  drawLottery() {
    return network.post({
      url: `${userURL}/growth_api/v1/lottery/draw`,
      headers: {
        cookie: JUEJIN_COOKIE,
        ...headers,
      },
    });
  },
  /**
   * 沾喜气
   */
  dipLucky(params) {
    return network.post({
      url: `${userURL}/growth_api/v1/lottery_lucky/dip_lucky?aid=2608`,
      data: params,
      headers: {
        cookie: JUEJIN_COOKIE,
        ...headers,
      },
    });
  },
};

const miming = {
  /**
   * 开始游戏
   */
  startGame(params, uid, time) {
    return network.post({
      url: `${mimingURL}/game/sea-gold/game/start?uid=${uid}&time=${time}`,
      data: params,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        ...headers,
      },
    });
  },
  /**
   * 获取游戏 info
   */
  getGameInfo(uid, time) {
    return network.get({
      url: `${mimingURL}/game/sea-gold/home/info?uid=${uid}&time=${time}`,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        ...headers,
      },
    });
  },
  /**
   * 结束游戏
   */
  overGame(params, uid, time) {
    return network.post({
      url: `${mimingURL}/game/sea-gold/game/over?uid=${uid}&time=${time}`,
      data: params,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        ...headers,
      },
    });
  },
  /**
   * 换图重来
   */
  freshMap(params, uid, time) {
    return network.post({
      url: `${mimingURL}/game/sea-gold/game/fresh_map?uid=${uid}&time=${time}`,
      data: params,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        ...headers,
      },
    });
  },
  /**
   * 发布指令
   */
  runCommand(params, uid, time, xGameId) {
    return network.post({
      url: `${mimingURL}/game/sea-gold/game/command?uid=${uid}&time=${time}`,
      data: params,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        "Content-Type": "application/json;charset=UTF-8",
        "x-tt-gameid": xGameId,
        ...headers,
      },
    });
  },
  /**
   * 游戏彩蛋
   * */
  touchPico(params, uid, time) {
    return network.post({
      url: `${mimingURL}/game/sea-gold/game/pico?uid=${uid}&time=${time}`,
      data: params,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        "Content-Type": "application/json;charset=UTF-8",
        ...headers,
      },
    });
  },
  /**
   * 获取记录
   */
  getRecord(uid, time) {
    return network.get({
      url: `${mimingURL}/game/sea-gold/user/record?uid=${uid}&time=${time}`,
      headers: {
        authorization: config.JUEJIN_TOKEN,
        ...headers,
      },
    });
  },
};

module.exports = {
  ...user,
  ...miming,
};
