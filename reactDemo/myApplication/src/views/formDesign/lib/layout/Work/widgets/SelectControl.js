/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->下拉框
 */
import React from 'react';
import {Select} from '@alifd/next';

export default class SelectControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { value, dataSource, ... other } = this.props;
    return (
      <Select
        showSearch={true}
        value={value}
        dataSource={dataSource}
        {...other}
      />
    )
  }
}
