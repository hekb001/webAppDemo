import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AllRouters from './routes';
import { addLocaleData, IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import appLocaleZh from './lang/zh/index.js';
import appLocaleEn from './lang/en/index.js';
import store from '../src/store/configureStore';
import cookie from 'js-cookie';
import { createBrowserHistory } from 'history';
const myhistory = createBrowserHistory();
let appLocale = appLocaleZh;
let langType = cookie.get('langType');
if (langType && langType == '2') {
    appLocale = appLocaleEn
} else {
    appLocale = appLocaleZh
}
ReactDOM.render(
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages} formats={appLocale.formats} onError={() => ({})}>
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <AllRouters history={myhistory} />
            </Provider>
        </ConfigProvider>
    </IntlProvider>,
    document.getElementById('root')
);
if (module && module.hot) {
    module.hot.accept();
  }
