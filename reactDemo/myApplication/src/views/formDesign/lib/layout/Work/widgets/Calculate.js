/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->公司计算
 */
import React from 'react';
import {Input} from  '@alifd/next';

export default class Calculate extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render(){
    const { value, onChange, isRows, ...other } = this.props;
    const Component = isRows ? Input.TextArea: Input;
    return (
      <Component
        value={value}
        onChange={onChange}
        {...other}
      />
    )
  }
}
