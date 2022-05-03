/**
 * 暂停，避免快速请求以及频繁请求
 * @param {Number} delay
 */
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

module.exports = {
  sleep,
};
