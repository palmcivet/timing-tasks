#!/usr/bin/env node

const logger = require("../util/logger");
const music163Api = require("../api/music163");
const { sendEmail } = require("../util/email");

music163Api.checkIn().catch((error) => {
  sendEmail({
    taskName: "网易云音乐",
    error,
  });
  logger.error(error);
});
