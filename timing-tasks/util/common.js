/**
 * 暂停，避免快速请求以及频繁请求
 * @param {Number} delay
 */
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function getCookie(cookie, field) {
  const res = cookie.split(";");
  const [tstr] = res.filter((f) => f.indexOf(field) != -1);
  const [_, jct] = tstr.split("=");
  return jct;
}

module.exports = {
  sleep,
  getCookie,
};
