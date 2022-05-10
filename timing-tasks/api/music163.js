const crypto = require("crypto");
const qs = require("querystring");
const network = require("../util/network");
const { getCookie } = require("../util/common");
const { NETEASE_COOKIE } = require("../util/config");

const baseURL = "https://music.163.com";

const headers = {
  "content-type": "application/x-www-form-urlencoded",
  "referer": "https://music.163.com/discover",
  "accept": "*/*",
};

function aes(raw, key) {
  const cipher = crypto.createCipheriv(
    "aes-128-cbc",
    key,
    "0102030405060708"
  );
  return (
    cipher.update(raw, "utf8", "base64") + cipher.final("base64")
  );
}

function rsa(raw) {
  const puk = [
    "-----BEGIN RSA PUBLIC KEY-----",
    "MIGJAoGBAOC1CfYlnfhkLbw1ZikBR33yJnfsFStf9orOYVu3tyUVKzqxeodq6opa",
    "p20uQXYp7E7jQfVhNfzPaVKAEE4DEuy9qSVXyThwEUr2ydBcT38MNoW3pGvuJVky",
    "V1zOELQk2BPP5IddPoIEe5fd71J0HVRrjiidxpNbPs4EYtsKIrjnAgMBAAE=",
    "-----END RSA PUBLIC KEY-----",
  ].join("\n");

  return crypto
    .publicEncrypt(
      {
        key: puk,
        padding: crypto.constants.RSA_NO_PADDING,
      },
      raw
    )
    .toString("hex");
}

module.exports = {
  /**
   * 签到
   */
  checkIn() {
    const token = getCookie(NETEASE_COOKIE, "__csrf");
    const payload = JSON.stringify({ type: 0 });
    const salt = "2VRpcLApaHXPa8Rj";

    return network.post({
      url: `${baseURL}/weapi/point/dailyTask?csrf_token=${token}`,
      headers: {
        cookie: NETEASE_COOKIE,
        ...headers,
      },
      data: qs.stringify({
        params: aes(aes(payload, "0CoJUm6Qyw8W8jud"), salt),
        encSecKey: rsa(
          Buffer.from("jR8aPXHapALcpRV2".padStart(128, "\0"))
        ),
      }),
    });
  },
  /**
   */
  getPlayList() {
    const token = getCookie(NETEASE_COOKIE, "__csrf");
    const payload = JSON.stringify({ csrf_token: token });
    const salt = "2VRpcLApaHXPa8Rj";

    return network.post({
      url: `${baseURL}/weapi/v1/discovery/recommend/resource?csrf_token=${token}`,
      headers: {
        cookie: NETEASE_COOKIE,
        ...headers,
      },
      data: qs.stringify({
        params: aes(aes(payload, "0CoJUm6Qyw8W8jud"), salt),
        encSecKey: rsa(
          Buffer.from("jR8aPXHapALcpRV2".padStart(128, "\0"))
        ),
      }),
    });
  },
};
