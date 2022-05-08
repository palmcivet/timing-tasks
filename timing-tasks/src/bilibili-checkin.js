#!/usr/bin/env node

const logger = require("../util/logger");
const bilibiliApi = require("../api/bilibili");
const { sendEmail } = require("../util/email");

(async () => {
  try {
    /* 登录签到 */
    const { isLogin } = await bilibiliApi.getUser();

    if (!isLogin) {
      throw Error("COOKIE 已过期");
    }

    /* 直播签到 */
    await bilibiliApi.getLiveCheckIn();

    /* 漫画签到 */
    await bilibiliApi.getComicCheckIn();

    /* 观看视频，并分享 */
    const regionRankList = await bilibiliApi.getRegionRankVideo();

    const { bvid } =
      regionRankList[
        Number.parseInt(Math.random() * regionRankList.length)
      ];
    await bilibiliApi.playVideo(bvid);
    await bilibiliApi.shareVideo(bvid);
  } catch (error) {
    console.error(error);
    logger.error(error);
  }
})();
