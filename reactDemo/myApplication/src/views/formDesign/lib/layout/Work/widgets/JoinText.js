/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->拼接文本
 */
import React from 'react';
import {Input} from  '@alifd/next';

export default class JoinText extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render(){
    const {onChange, isRows, ...other } = this.props;
    const Component = isRows ? Input.TextArea: Input;
    
    return (
      <Component
        {...other}
        onChange={onChange}
      />
    )
  }
}
