/**
 * Date: 2021年1月20日20:30:09
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 导出
 */
import React from 'react';

export default class Export extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChangeStyle() {
    const {onExportData} = this.props;
    onExportData && onExportData();
  }
  
  render() {
    let {className} = this.props;
    
    return (
      <button
        className={`control-button ${className || ''}`}
        onClick={this.onChangeStyle.bind(this)}
        title='导出'
      >
        导出
      </button>
    )
  }
}
