const network = require("../util/network");
const { getCookie } = require("../util/common");
const { BILIBILI_COOKIE } = require("../util/config");

const headers = {
  "content-type": "application/json",
  "referer": "https://www.bilibili.com",
  "connection": "keep-alive",
};

module.exports = {
  /**
   * 用户信息（签到）
   */
  getUser() {
    return network.get({
      url: "https://api.bilibili.com/x/web-interface/nav",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
    });
  },

  /**
   * 直播签到
   */
  getLiveCheckIn() {
    return network.get({
      url: "https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
    });
  },

  /**
   * 漫画签到
   */
  getComicCheckIn() {
    return network.get({
      url: "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
      params: {
        platform: "ios",
      },
    });
  },

  /**
   * 热门视频
   */
  getLatestVideo() {
    return network.get({
      url: "https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
      params: {
        uid: getCookie(BILIBILI_COOKIE, "DedeUserID"),
        type_list: 8,
        from: "",
        platform: "web",
      },
    });
  },

  getRegionRankVideo() {
    const regions = [1, 3, 4, 5, 160, 22, 119];
    const rid =
      regions[Number.parseInt(Math.random() * regions.length)];

    return network.get({
      url: "https://api.bilibili.com/x/web-interface/ranking/region",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
      params: {
        day: 3,
        rid,
      },
    });
  },

  playVideo(vid) {
    return network.post({
      url: "https://api.bilibili.com/x/click-interface/web/heartbeat",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
      params: {
        vid,
        csrf: getCookie(BILIBILI_COOKIE, "bili_jct"),
      },
    });
  },

  shareVideo(vid) {
    return network.post({
      url: "https://api.bilibili.com/x/web-interface/share/add",
      headers: {
        cookie: BILIBILI_COOKIE,
        ...headers,
      },
      params: {
        vid,
        csrf: getCookie(BILIBILI_COOKIE, "bili_jct"),
      },
    });
  },
};
