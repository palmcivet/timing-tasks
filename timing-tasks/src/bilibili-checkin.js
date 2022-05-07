#!/usr/bin/env node

const logger = require("../util/logger");
const bilibiliApi = require("../api/bilibili");
const { sendEmail } = require("../util/email");

async function userCheckIn(params) {
  const { data } = await bilibiliApi.getUser();
  const { isLogin } = data;

  if (!isLogin) {
    throw Error("COOKIE 已过期");
  }
}

async function liveCheckIn() {
  try {
    await bilibiliApi.getLiveCheckIn();
  } catch (error) {
    logger.error(error);
  }
}

async function comicCheckIn() {
  try {
    await bilibiliApi.getComicCheckIn();
  } catch (error) {
    logger.error(error);
  }
}

async function watchVideo() {
  try {
    const followVideoList = await bilibiliApi.getLatestVideo();
    const regionRankList = await bilibiliApi.getRegionRankVideo();

    const vid =
      regionRankList[
        Number.parseInt(Math.random() * rankList.length)
      ];
    await this.videoHeartBeat(vid);
    await this.videoShare(vid);
  } catch (error) {}
}

Promise.all([
  userCheckIn,
  liveCheckIn,
  comicCheckIn,
  watchVideo,
]).catch((error) => {
  logger.error(error);
});
