#!/usr/bin/env node

const logger = require("../util/logger");
const smzdmApi = require("../api/smzdm");
const { sendEmail } = require("../util/email");

(async () => {
  try {
    await smzdmApi.checkIn();
  } catch (error) {
    const html = `
<h2>签到失败：什么值得买</h2>
<span>${new Date().toLocaleString()}</span>

${JSON.stringify(error)}
`;
    sendEmail(html);
    logger.error(`签到失败: ${JSON.stringify(error)}`);
  }
})();
