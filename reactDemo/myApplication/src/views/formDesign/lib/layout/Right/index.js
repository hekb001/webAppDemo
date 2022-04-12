/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区
 */
import './index.less';
import React from 'react';
import {Tab} from '@alifd/next';
import FormSetting from './FormSetting';
import WidgetSetting from './WidgetSetting';

export default class Index extends React.Component{
  render() {
    return(
      <div className='setting-config'>
        <Tab>
          <Tab.Item key='1' title='组件配置'>
            <WidgetSetting />
          </Tab.Item>
          <Tab.Item key='2' title='表单配置'>
            <FormSetting />
          </Tab.Item>
        </Tab>
      </div>
    )
  }
}
