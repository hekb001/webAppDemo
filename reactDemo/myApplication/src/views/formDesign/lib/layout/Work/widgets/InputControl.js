/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->输入框
 */
import React from 'react';
import {Input} from  '@alifd/next';

export default class InputControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { value, onChange, isRows, reg, disabled,selectedItem, ...other } = this.props;
    const Component = isRows ? Input.TextArea: Input;
    
    return (
      <Component
        value={value}
        disabled={disabled}
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
