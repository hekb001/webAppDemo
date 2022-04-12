/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->复选框
 */
import React from 'react';
import {Checkbox} from  '@alifd/next';

export default class CheckboxGroupControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { value, dataSource, ...other } = this.props;
    return (
      <Checkbox.Group
        value={value}
        dataSource={dataSource}
        {...other}
      />
    )
  }
}
