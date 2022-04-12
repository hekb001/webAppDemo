/**
 * 主页入口文件
 */
import React from "react";
import ReactDOM from "react-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import Rootrouter from 'routers';
import { Provider } from 'react-redux';
import store from '../src/store/configureStore';
import cookie from 'js-cookie';
import zhCN from 'antd/es/locale/zh_CN';
import appLocaleZh from './lang/zh/index.js';
import appLocaleEn from './lang/en/index.js';
import 'antd/dist/antd.css';
import '@alifd/next/dist/next.css';
if (typeof Object.assign != "function") {
  Object.assign = function (target) {
    "use strict";
    if (target == null) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
let appLocale = appLocaleZh;
//1英文，2中文
let langType = cookie.get('langType');
if (langType && langType == '2') {
  appLocale = appLocaleEn
} else {
  appLocale = appLocaleZh
}
ReactDOM.render(
  <IntlProvider locale={appLocale.locale} messages={appLocale.messages} formats={appLocale.formats} onError={() => ({})}>
    <ConfigProvider locale={zhCN}>
      {/* <ProcessDesign /> */}
      <Provider store={store}>
        <Rootrouter />
      </Provider>
    </ConfigProvider>
  </IntlProvider>,
  document.getElementById("root")
);
