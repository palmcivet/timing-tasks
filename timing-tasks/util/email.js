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

async function sendEmail(content) {
  let html = content;
  if (typeof content === "object") {
    html = `
<h2>签到失败：${content.taskName}</h2>
<span>${new Date().toLocaleString()}</span>
`;
  }

  try {
    await transporter.sendMail({
      from: config.EMAIL_SENDER,
      to: config.EMAIL_RECEIVER,
      subject: "【通知】签到服务",
      html,
    });
  } catch (error) {
    logger.error(`邮件发送失败: ${error}`);
  }
}

module.exports = {
  sendEmail,
};
