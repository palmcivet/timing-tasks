#!/usr/bin/env node

const logger = require("../util/logger");
const smzdmApi = require("../api/smzdm");
const { sendEmail } = require("../util/email");

smzdmApi.checkIn().catch((error) => {
  console.error(error);
  logger.error(`签到失败: ${JSON.stringify(error)}`);
});
