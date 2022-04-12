/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->纯文本组件
 */
import React from 'react';

export default class TextControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { value, ...other } = this.props;
    return (
      <span {...other}>
        {value}
      </span>
    )
  }
}
