#!/usr/bin/env node

const logger = require("../util/logger");
const juejinApi = require("../api/juejin");
const { sendEmail } = require("../util/email");

Promise.allSettled([
  juejinApi.checkIn(),
  juejinApi.drawLottery(),
  juejinApi.dipLucky({
    lottery_history_id: "7052109119238438925",
  }),
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
    return;
  }

  const [
    { sum_point },
    { lottery_name, lottery_type },
    { dip_value, total_value },
  ] = resultList.map((result) => result.value);

  const message = `获得矿石: ${sum_point}; 抽奖成功: ${lottery_name}; 幸运值: ${dip_value}/${total_value}`;
  logger.info(message);

  if (![1, 2].includes(lottery_type)) {
    sendEmail(
      `<h2>抽奖成功</h2><span>${new Date().toLocaleString()}</span>${message.replace(
        /; /g,
        /\n/
      )}`
    );
  }
});
