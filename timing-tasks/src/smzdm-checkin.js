#!/usr/bin/env node

const logger = require("../util/logger");
const smzdmApi = require("../api/smzdm");
const { sendEmail } = require("../util/email");

// smzdmApi
//   .getUser()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

smzdmApi.checkIn().catch((error) => {
  console.error(error);
  logger.error(`签到失败: ${JSON.stringify(error)}`);
});
