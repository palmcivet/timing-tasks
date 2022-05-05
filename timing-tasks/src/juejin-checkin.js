#!/usr/bin/env node

const logger = require("../util/logger");
const juejinApi = require("../api/juejin");
const { sendEmail } = require("../util/email");

(async () => {
  try {
    const { sum_point } = await juejinApi.checkIn();
    const { lottery_name, lottery_type } =
      await juejinApi.drawLottery();
    const { dip_value, total_value } = await juejinApi.dipLucky({
      lottery_history_id: "7052109119238438925",
    });

    const message = `获得矿石: ${sum_point}; 抽奖成功: ${lottery_name}; 幸运值: ${dip_value}/${total_value}`;
    logger.info(message);

    if (![1, 2].includes(lottery_type)) {
      sendEmail(`
<h2>抽奖成功</h2>
<span>${new Date().toLocaleString()}</span>
${message.replace(/; /g, /\n/)}`);
    }
  } catch (error) {
    const html = `
<h2>签到失败：掘金</h2>
<span>${new Date().toLocaleString()}</span>

${JSON.stringify(error)}
`;
    sendEmail(html);
    logger.error(`签到失败: ${JSON.stringify(error)}`);
  }
})();
