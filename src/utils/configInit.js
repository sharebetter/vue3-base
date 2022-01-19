/*
 * @Date: 2020-12-02 16:09:01
 * @Description: 环境设置
 */
import { encode } from "@utils/base64";
import { getItem, setItem } from "@utils/localUtil";
import { getUrlQuery } from "@utils/tools";

/**
 * @APPID : 公众号APPID
 * @REDIRECT : 微信回调地址
 * @BASE : 域名 baseUrl
 * @RESOURCE_URL : 资源请求路径
 * @OTHER_URL : 其它请求路径 如：短信
 */

/**
 * @description: 生产环境
 */
const PRODUCTION_CONFIG = {
  APPID: "wx27d40c8111f9af87",
  REDIRECT: "https://authapi.jjshebao.com/v20/wechat/redirectUrl",
  BASE: "http://rr.ylzhr.com/",
  RESOURCE_URL: "https://resourceapi.jjshebao.com/v20",
  OTHER_URL: "https://otherapi.jjshebao.com/v20",
};

/**
 * @description: 开发环境
 */
const DEVELOPMENT_CONFIG = {
  APPID: "wxc33c8effaa001fe3",
  REDIRECT: "http://test-authapi.jjshebao.com/v20/wechat/redirectUrl",
  BASE: "http://rr-test.jjshebao.com/",
  RESOURCE_URL: "http://test-resourceapi.jjshebao.com/v20",
  OTHER_URL: "http://test-otherapi.jjshebao.com/v20",
};

/**
 * @description: 授权地址
 */
export function authUrl() {
  return {
    // 微信授权地址
    URL_WX: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${window.APPID}&redirect_uri=${window.REDIRECT}/${window.APPID}?redirectUrl=${window.REDIRECT_URL_BASE64}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
  };
}

/**
 * @description: 环境配置
 */
export function envConfig() {
  // 考虑兼容链接来自小程序跳转
  const correctUrl = decodeURIComponent(location.href);

  let url = "";
  if (correctUrl.indexOf("uid=") > -1) {
    url = correctUrl.split("uid=")[0];
  } else {
    url = correctUrl;
  }

  window.REDIRECT_URL_BASE64 = encode(url);

  //通过链接地址自动设置环境
  const CONFIG =
    correctUrl.indexOf("rr.ylzhr.com") > -1 ||
    correctUrl.indexOf("rr.jjshebao.com") > -1
      ? PRODUCTION_CONFIG
      : DEVELOPMENT_CONFIG;

  window.REDIRECT = CONFIG.REDIRECT;

  //根据渠道appId 设置APPID，默认是87的
  if (correctUrl.indexOf("familyId=") > -1) {
    const familyId = getUrlQuery("familyId");
    window.APPID = familyId;
  } else {
    window.APPID = CONFIG.APPID;
  }

  window.BASE = CONFIG.BASE;
  window.RESOURCE_URL = CONFIG.RESOURCE_URL;
  window.OTHER_URL = CONFIG.OTHER_URL;
}

/**
 * @description 微信授权
 */

export function getWxAuth() {
  const rrUid = getItem("rr_uid");
  const correctUrl = decodeURIComponent(location.href);
  if (correctUrl.indexOf("uid=") > -1) {
    //@TODO 授权回调

    //设置uid
    const uid = getUrlQuery("uid");
    setItem("rr_uid", uid);

    //重置url并且不reload
    const hash = window.location.hash;
    const params = hash.split("?");
    if (params[1]) {
      const vars = params[1].split("&");
      const newVars = [];
      if (vars.length) {
        vars.map((item) => {
          if (item.indexOf("uid") < 0 && item.indexOf("timestamp") < 0) {
            newVars.push(item);
          }
        });
      }
      const c = newVars.join("&");
      setTimeout(() => {
        window.location.hash = c ? params[0] + "?" + c : params[0];
      }, 500);
    }
  } else if (!rrUid) {
    //@TODO 未授权
    location.href = authUrl().URL_WX;
  }
}
