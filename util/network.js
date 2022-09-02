const axios = require("axios");

const defaultConfig = {
  data: {},
  params: {},
  headers: {
    "pragma": "no-cache",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua":
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "sec-fetch-site": "same-site",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  },
};

function service(options) {
  const config = {
    ...defaultConfig,
    ...options,
  };

  return new Promise((resolve, reject) =>
    axios(config)
      .then((res) => {
        // 大多数接口返回 { data: {}, code: 0 }
        const data = res.data || {};
        console.log(res);
        if (data.err_no === 0 || data.code === 0) {
          resolve(data.data);
        } else {
          reject(data);
        }
      })
      .catch((error) => {
        reject(error);
      })
  );
}

module.exports = {
  get: (args) => service({ ...args, method: "GET" }),
  post: (args) => service({ ...args, method: "POST" }),
};
