import zh_CH from 'antd/lib/locale-provider/zh_CN';
// import react_intl_zh from 'react-intl/locale-data/zh';
import home from './home';
export default{
    locale: 'zh',
    antd: zh_CH,
    data: {},
    messages: {
        ...home,
    }
}