/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 预览
 */
import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChangeStyle() {
    const {onPreview} = this.props;
    onPreview && onPreview();
  }
  
  render() {
    let {preview, className} = this.props;
    let title = preview ? '退出预览' : '预览';
    return (
      <button
        className={`control-button ${className || ''}`}
        onClick={this.onChangeStyle.bind(this)}
        title={title}
      >
        <EyeOutlined />{title}
      </button>
    )
  }
}
