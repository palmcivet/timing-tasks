#!/usr/bin/env node

const logger = require("../util/logger");
const bilibiliApi = require("../api/bilibili");
const { sendEmail } = require("../util/email");

async function watchVideoAndShare() {
  const regionRankList = await bilibiliApi.getRegionRankVideo();

  const { bvid } =
    regionRankList[
      Number.parseInt(Math.random() * regionRankList.length)
    ];
  await bilibiliApi.playVideo(bvid);
  await bilibiliApi.shareVideo(bvid);
}

/* 登录签到 */
bilibiliApi
  .getUser()
  .then(({ isLogin }) => {
    if (!isLogin) {
      throw Error("COOKIE 已过期");
    }

    Promise.allSettled([
      /* 直播签到 */
      bilibiliApi.getLiveCheckIn(),
      /* 漫画签到 */
      // ============
      // bilibiliApi.getComicCheckIn(),
      // ============
      /* 观看视频，并分享 */
      watchVideoAndShare(),
    ]).then((resultList) => {
      const errorResultList = resultList.filter(
        (result) => result.status !== "fulfilled"
      );

      if (errorResultList.length !== 0) {
        const error = errorResultList
          .map((result) => JSON.stringify(result.reason))
          .join("\n\n");

        sendEmail({
          taskName: "掘金签到",
          error,
        });
        logger.error(error);
      }
    });
  })
  .catch((error) => {
    sendEmail({
      taskName: "哔哩哔哩签到",
      error,
    });
    logger.error(error);
  });
