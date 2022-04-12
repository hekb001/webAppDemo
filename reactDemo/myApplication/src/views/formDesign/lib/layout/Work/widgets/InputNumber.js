/*
 * @Author: kevin.he 
 * @Date: 2021-11-18 14:04:21 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-18 17:44:14
 * 计数器
 */
import React from 'react';
import {InputNumber} from  'antd';

export default class InputControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { value, onChange, isRows, reg, ...other } = this.props;
    return (
      <InputNumber
        value={value}
        onChange={(value)=>{
          if (!new RegExp(reg).test(value) && value !== '') {
            return
          }
          onChange && onChange(value)
        }}
        {...other}
      />
    )
  }
}
