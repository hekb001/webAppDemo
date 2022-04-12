/*
 * @Author: kevin.he 
 * @Date: 2021-11-24 18:20:37 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-24 19:06:12
 * 省市级联动
 */
import React from 'react';
import {CascaderSelect} from  '@alifd/next';
const dataSource = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
]
export default class Cascader extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { value,onChange, ...other } = this.props;
    return (
      <CascaderSelect
        value = {value}
        onChange={onChange}
        dataSource={dataSource}
      />
    )
  }
}