#!/usr/bin/env node

const logger = require("../util/logger");
const smzdmApi = require("../api/smzdm");
const { sendEmail } = require("../util/email");

smzdmApi
  .webCheckIn()
  .then((res) => {})
  .catch((error) => {
    sendEmail({
      taskName: "什么值得买",
      error,
    });
    logger.error(error);
  });
