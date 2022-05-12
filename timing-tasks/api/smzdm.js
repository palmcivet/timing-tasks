const request = require("request");
const { SMZDM_COOKIE } = require("../util/config");

function randomStr() {
  let len = 17;
  let char = "0123456789";
  let str = "";
  for (i = 0; i < len; i++) {
    str += char.charAt(Math.floor(Math.random() * char.length));
  }
  return str;
}

var hexcase = 0;

function hex_md5(r) {
  return rstr2hex(rstr_md5(str2rstr_utf8(r)));
}
function rstr_md5(r) {
  return binl2rstr(binl_md5(rstr2binl(r), 8 * r.length));
}
function rstr2hex(r) {
  for (
    var t,
      d = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
      n = "",
      _ = 0;
    _ < r.length;
    _++
  )
    (t = r.charCodeAt(_)),
      (n += d.charAt((t >>> 4) & 15) + d.charAt(15 & t));
  return n;
}
function str2rstr_utf8(r) {
  for (var t, d, n = "", _ = -1; ++_ < r.length; )
    (t = r.charCodeAt(_)),
      (d = _ + 1 < r.length ? r.charCodeAt(_ + 1) : 0),
      55296 <= t &&
        t <= 56319 &&
        56320 <= d &&
        d <= 57343 &&
        ((t = 65536 + ((1023 & t) << 10) + (1023 & d)), _++),
      t <= 127
        ? (n += String.fromCharCode(t))
        : t <= 2047
        ? (n += String.fromCharCode(
            192 | ((t >>> 6) & 31),
            128 | (63 & t)
          ))
        : t <= 65535
        ? (n += String.fromCharCode(
            224 | ((t >>> 12) & 15),
            128 | ((t >>> 6) & 63),
            128 | (63 & t)
          ))
        : t <= 2097151 &&
          (n += String.fromCharCode(
            240 | ((t >>> 18) & 7),
            128 | ((t >>> 12) & 63),
            128 | ((t >>> 6) & 63),
            128 | (63 & t)
          ));
  return n;
}
function rstr2binl(r) {
  for (var t = Array(r.length >> 2), d = 0; d < t.length; d++)
    t[d] = 0;
  for (d = 0; d < 8 * r.length; d += 8)
    t[d >> 5] |= (255 & r.charCodeAt(d / 8)) << d % 32;
  return t;
}
function binl2rstr(r) {
  for (var t = "", d = 0; d < 32 * r.length; d += 8)
    t += String.fromCharCode((r[d >> 5] >>> d % 32) & 255);
  return t;
}
function binl_md5(r, t) {
  (r[t >> 5] |= 128 << t % 32), (r[14 + (((t + 64) >>> 9) << 4)] = t);
  for (
    var d = 1732584193,
      n = -271733879,
      _ = -1732584194,
      m = 271733878,
      f = 0;
    f < r.length;
    f += 16
  ) {
    var h = d,
      e = n,
      a = _,
      i = m;
    (d = md5_ff(d, n, _, m, r[f + 0], 7, -680876936)),
      (m = md5_ff(m, d, n, _, r[f + 1], 12, -389564586)),
      (_ = md5_ff(_, m, d, n, r[f + 2], 17, 606105819)),
      (n = md5_ff(n, _, m, d, r[f + 3], 22, -1044525330)),
      (d = md5_ff(d, n, _, m, r[f + 4], 7, -176418897)),
      (m = md5_ff(m, d, n, _, r[f + 5], 12, 1200080426)),
      (_ = md5_ff(_, m, d, n, r[f + 6], 17, -1473231341)),
      (n = md5_ff(n, _, m, d, r[f + 7], 22, -45705983)),
      (d = md5_ff(d, n, _, m, r[f + 8], 7, 1770035416)),
      (m = md5_ff(m, d, n, _, r[f + 9], 12, -1958414417)),
      (_ = md5_ff(_, m, d, n, r[f + 10], 17, -42063)),
      (n = md5_ff(n, _, m, d, r[f + 11], 22, -1990404162)),
      (d = md5_ff(d, n, _, m, r[f + 12], 7, 1804603682)),
      (m = md5_ff(m, d, n, _, r[f + 13], 12, -40341101)),
      (_ = md5_ff(_, m, d, n, r[f + 14], 17, -1502002290)),
      (n = md5_ff(n, _, m, d, r[f + 15], 22, 1236535329)),
      (d = md5_gg(d, n, _, m, r[f + 1], 5, -165796510)),
      (m = md5_gg(m, d, n, _, r[f + 6], 9, -1069501632)),
      (_ = md5_gg(_, m, d, n, r[f + 11], 14, 643717713)),
      (n = md5_gg(n, _, m, d, r[f + 0], 20, -373897302)),
      (d = md5_gg(d, n, _, m, r[f + 5], 5, -701558691)),
      (m = md5_gg(m, d, n, _, r[f + 10], 9, 38016083)),
      (_ = md5_gg(_, m, d, n, r[f + 15], 14, -660478335)),
      (n = md5_gg(n, _, m, d, r[f + 4], 20, -405537848)),
      (d = md5_gg(d, n, _, m, r[f + 9], 5, 568446438)),
      (m = md5_gg(m, d, n, _, r[f + 14], 9, -1019803690)),
      (_ = md5_gg(_, m, d, n, r[f + 3], 14, -187363961)),
      (n = md5_gg(n, _, m, d, r[f + 8], 20, 1163531501)),
      (d = md5_gg(d, n, _, m, r[f + 13], 5, -1444681467)),
      (m = md5_gg(m, d, n, _, r[f + 2], 9, -51403784)),
      (_ = md5_gg(_, m, d, n, r[f + 7], 14, 1735328473)),
      (n = md5_gg(n, _, m, d, r[f + 12], 20, -1926607734)),
      (d = md5_hh(d, n, _, m, r[f + 5], 4, -378558)),
      (m = md5_hh(m, d, n, _, r[f + 8], 11, -2022574463)),
      (_ = md5_hh(_, m, d, n, r[f + 11], 16, 1839030562)),
      (n = md5_hh(n, _, m, d, r[f + 14], 23, -35309556)),
      (d = md5_hh(d, n, _, m, r[f + 1], 4, -1530992060)),
      (m = md5_hh(m, d, n, _, r[f + 4], 11, 1272893353)),
      (_ = md5_hh(_, m, d, n, r[f + 7], 16, -155497632)),
      (n = md5_hh(n, _, m, d, r[f + 10], 23, -1094730640)),
      (d = md5_hh(d, n, _, m, r[f + 13], 4, 681279174)),
      (m = md5_hh(m, d, n, _, r[f + 0], 11, -358537222)),
      (_ = md5_hh(_, m, d, n, r[f + 3], 16, -722521979)),
      (n = md5_hh(n, _, m, d, r[f + 6], 23, 76029189)),
      (d = md5_hh(d, n, _, m, r[f + 9], 4, -640364487)),
      (m = md5_hh(m, d, n, _, r[f + 12], 11, -421815835)),
      (_ = md5_hh(_, m, d, n, r[f + 15], 16, 530742520)),
      (n = md5_hh(n, _, m, d, r[f + 2], 23, -995338651)),
      (d = md5_ii(d, n, _, m, r[f + 0], 6, -198630844)),
      (m = md5_ii(m, d, n, _, r[f + 7], 10, 1126891415)),
      (_ = md5_ii(_, m, d, n, r[f + 14], 15, -1416354905)),
      (n = md5_ii(n, _, m, d, r[f + 5], 21, -57434055)),
      (d = md5_ii(d, n, _, m, r[f + 12], 6, 1700485571)),
      (m = md5_ii(m, d, n, _, r[f + 3], 10, -1894986606)),
      (_ = md5_ii(_, m, d, n, r[f + 10], 15, -1051523)),
      (n = md5_ii(n, _, m, d, r[f + 1], 21, -2054922799)),
      (d = md5_ii(d, n, _, m, r[f + 8], 6, 1873313359)),
      (m = md5_ii(m, d, n, _, r[f + 15], 10, -30611744)),
      (_ = md5_ii(_, m, d, n, r[f + 6], 15, -1560198380)),
      (n = md5_ii(n, _, m, d, r[f + 13], 21, 1309151649)),
      (d = md5_ii(d, n, _, m, r[f + 4], 6, -145523070)),
      (m = md5_ii(m, d, n, _, r[f + 11], 10, -1120210379)),
      (_ = md5_ii(_, m, d, n, r[f + 2], 15, 718787259)),
      (n = md5_ii(n, _, m, d, r[f + 9], 21, -343485551)),
      (d = safe_add(d, h)),
      (n = safe_add(n, e)),
      (_ = safe_add(_, a)),
      (m = safe_add(m, i));
  }
  return Array(d, n, _, m);
}
function md5_cmn(r, t, d, n, _, m) {
  return safe_add(
    bit_rol(safe_add(safe_add(t, r), safe_add(n, m)), _),
    d
  );
}
function md5_ff(r, t, d, n, _, m, f) {
  return md5_cmn((t & d) | (~t & n), r, t, _, m, f);
}
function md5_gg(r, t, d, n, _, m, f) {
  return md5_cmn((t & n) | (d & ~n), r, t, _, m, f);
}
function md5_hh(r, t, d, n, _, m, f) {
  return md5_cmn(t ^ d ^ n, r, t, _, m, f);
}
function md5_ii(r, t, d, n, _, m, f) {
  return md5_cmn(d ^ (t | ~n), r, t, _, m, f);
}
function safe_add(r, t) {
  var d = (65535 & r) + (65535 & t),
    n = (r >> 16) + (t >> 16) + (d >> 16);
  return (n << 16) | (65535 & d);
}
function bit_rol(r, t) {
  return (r << t) | (r >>> (32 - t));
}

function getCheckInBody() {
  let ts = new Date().getTime();
  let token = /sess=([^;]*)/.exec(cookie)[1];
  let sign = hex_md5(
    `f=android&sk=1&time=${ts}&token=${token}&v=10.0&weixin=0&key=apr1$AwP!wRRT$gJ/q.X24poeBInlUJC`
  ).toUpperCase();
  return `touchstone_event=&v=10.0&sign=${sign}&weixin=0&time=${ts}&sk=1&token=${token}&f=android&captcha=`;
}

const headers = {
  "accept":
    "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
  "accept-encoding": "gzip, deflate, br",
  "accept-language":
    "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "host": "zhiyou.smzdm.com",
  "referrer": "https://zhiyou.smzdm.com/user/",
  "sec-fetch-dest": "script",
  "connection": "keep-alive",
  "dnt": "1",
};

module.exports = {
  /**
   * 获取用户信息，新版
   */
  getUserExp() {
    return new Promise((resolve) => {
      request.get(
        {
          url: "https://zhiyou.smzdm.com/user/exp/",
          headers: {
            cookie: SMZDM_COOKIE,
            ...headers,
          },
          body: "",
        },
        (error, resp, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  },

  /**
   * 获取用户信息
   */
  getCurrentInfo() {
    return new Promise((resolve) => {
      request.get(
        {
          url: `https://zhiyou.smzdm.com/user/info/jsonp_get_current?with_avatar_ornament=1&callback=jQuery112406663572451768975_${new Date().getTime()}&_=${new Date().getTime()}`,
          headers: {
            cookie: smzdmCookie,
            ...headers,
          },
        },
        (error, resp, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  },

  /**
   * Web 端签到
   */
  webCheckIn() {
    return new Promise((resolve, reject) => {
      let ts = Date.parse(new Date());
      request.get(
        {
          url: `https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery11240${randomStr()}_${ts}&_=${
            ts + 3
          }`,
          headers: {
            ...headers,
            "cookie": SMZDM_COOKIE,
            "Accept": "*/*",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Host": "zhiyou.smzdm.com",
            "Referer": "https://www.smzdm.com/",
          },
        },
        (error, resp, data) => {
          if (error) {
            reject(error);
          } else {
            let checkin_data = /\((.*)\)/.exec(data);
            if (checkin_data) {
              console.log(checkin_data);
            }
            resolve(data);
          }
        }
      );
    });
  },

  /**
   * App 端签到
   */
  appCheckIn() {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: "https://user-api.smzdm.com/checkin",
          headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": SMZDM_COOKIE,
            "Host": "user-api.smzdm.com",
          },
          body: getCheckInBody(),
        },
        (error, resp, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  },
};
