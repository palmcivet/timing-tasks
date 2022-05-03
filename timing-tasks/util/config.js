const dotEnv = require("dotenv");
const { join } = require("path");

module.exports = dotEnv.config({
  path: join(__dirname, "..", ".env"),
}).parsed;
