import en_GB from 'antd/lib/locale-provider/en_GB';
// import react_intl_en from 'react-intl/locale-data/en';
import home from './home';
export default{
    locale: 'en',
    antd: en_GB,
    data: {},
    messages: {
        ...home,
    }
}