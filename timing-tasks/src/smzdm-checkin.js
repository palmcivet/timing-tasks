#!/usr/bin/env node

/**
 * @deprecated 网站 WAF 策略太严格，难以突破
 */

const logger = require("../util/logger");
const smzdmApi = require("../api/smzdm");
const { sendEmail } = require("../util/email");

smzdmApi.checkIn().catch((error) => {
  sendEmail({
    taskName: "什么值得买",
    error,
  });
  logger.error(`签到失败: ${JSON.stringify(error)}`);
});
