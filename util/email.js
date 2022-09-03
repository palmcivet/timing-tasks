const nodemailer = require("nodemailer");
const config = require("./config");
const logger = require("./logger");

const transporter = nodemailer.createTransport({
  service: config.EMAIL_SERVICE, // 邮箱服务
  host: config.EMAIL_SERVER, // 邮箱主机
  port: 465,
  secure: true, // 使用 TLS
  secureConnection: true,
  auth: {
    user: config.EMAIL_SENDER, // 发送者邮箱
    pass: config.EMAIL_AUTHKEY, // 邮箱授权码
  },
});

/**
 * 错误模板
 * @param {String} params.taskName
 * @param {Object} params.error
 */
function errorTemplate(params) {
  return `
<style>
  pre {
    background-color: #f8f8f8;
    padding: 10px;
    font-size: 15px;
    overflow-x: auto;
    white-space: pre-wrap;
  }
</style>
<h2>执行失败：${params.taskName}</h2>
<p>执行时间：${new Date().toLocaleString()}</p>
<p>错误原因：</p>
<pre>${
    typeof params.error === "object"
      ? JSON.stringify(params.error)
      : params.error
  }</pre>`;
}

async function sendEmail(content) {
  const html =
    typeof content === "object" ? errorTemplate(content) : content;

  try {
    return
    await transporter.sendMail({
      from: config.EMAIL_SENDER,
      to: config.EMAIL_RECEIVER,
      subject: content.subject || "【通知】签到服务",
      html,
    });
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  sendEmail,
};
