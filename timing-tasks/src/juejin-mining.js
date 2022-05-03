#!/usr/bin/env node

const jwt = require("jsonwebtoken");
const juejinApi = require("../api/juejin");
const { sleep } = require("../util/common");
const logger = require("../util/logger");
const config = require("../util/config");

const FIRST_DATA = {
  command: [
    {
      times: 10,
      command: [
        {
          times: 10,
          command: [
            {
              times: 10,
              command: [
                "D",
                "2",
                "R",
                "D",
                "4",
                "D",
                "L",
                "D",
                "6",
                "R",
                "D",
                "R",
              ],
            },
            "U",
            "R",
          ],
        },
        "U",
        "L",
        "L",
      ],
    },
  ],
};
const ROLE_ID = 3;

let juejinUid = "";
let miningGameId = "";
let miningDeepth = 0;

function getXGameId(id) {
  return jwt.sign(
    {
      gameId: id,
      time: +new Date().getTime(),
    },
    "-----BEGIN EC PARAMETERS-----\nBggqhkjOPQMBBw==\n-----END EC PARAMETERS-----\n-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49\nAwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU\nnYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==\n-----END EC PRIVATE KEY-----\n",
    {
      algorithm: "ES256",
      expiresIn: 2592e3,
      header: {
        alg: "ES256",
        typ: "JWT",
      },
    }
  );
}

async function getInfo() {
  const userInfo = await juejinApi.getUser();
  juejinUid = userInfo.user_id;

  const time = new Date().getTime();
  const resInfo = await juejinApi.getGameInfo(juejinUid, time);
  miningDeepth = resInfo.gameInfo ? resInfo.gameInfo.deep : 0;
  miningGameId = resInfo.gameInfo ? resInfo.gameInfo.gameId : 0;

  return resInfo;
}

async function playGame() {
  try {
    // 开始
    const startTime = new Date().getTime();
    const startParams = { roleId: ROLE_ID };
    const startData = await juejinApi.startGame(
      startParams,
      juejinUid,
      startTime
    );
    await sleep(3000);
    miningGameId = startData.gameId;

    // 发起指令
    const commandTime = +new Date().getTime();
    const commandParams = { command: FIRST_DATA.command };
    const xGameId = getXGameId(miningGameId);
    const commandData = await juejinApi.runCommand(
      commandParams,
      juejinUid,
      commandTime,
      xGameId
    );
    miningDeepth = commandData.curPos.y;
    await sleep(3000);

    // 结束
    const overTime = +new Date().getTime();
    const overParams = {
      isButton: 1,
    };
    const overData = await juejinApi.overGame(overParams, juejinUid, overTime);
    await sleep(3000);
    miningDeepth = overData.deep;

    // 更换地图
    const mapTime = +new Date().getTime();
    if (miningDeepth < 500) {
      await sleep(3000);
      await juejinApi.freshMap({}, juejinUid, mapTime);
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    await sleep(3000);
    // 结束
    const overTime = +new Date().getTime();
    const overParams = { isButton: 1 };
    await juejinApi.overGame(overParams, juejinUid, overTime);
  } finally {
    await sleep(3000);
    const { userInfo } = await getInfo();
    const { todayDiamond, todayLimitDiamond } = userInfo;
    if (todayDiamond < todayLimitDiamond) {
      await playGame();
    } else {
      logger.info(`已获取矿石: ${todayDiamond}/${todayLimitDiamond}`);
    }
  }
}

if (!(config.JUEJIN_COOKIE && config.JUEJIN_TOKEN)) {
  // TODO 自动更新 COOKIE
  logger.warn("获取不到 COOKIE 和 TOKEN，请检查设置");
} else {
  getInfo().then(async (userInfo) => {
    const { todayDiamond, todayLimitDiamond } = userInfo;
    if (todayDiamond < todayLimitDiamond) {
      await playGame();
    }
  });
}
