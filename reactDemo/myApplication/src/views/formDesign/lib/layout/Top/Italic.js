/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 斜体
 */
import React from 'react';
import IconFont from "../../components/IconFont/index";

export default class Italic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeStyle() {
    const {selectedItem={}, selected, styleKey} = this.props;
    if (!selected) return;
    let style = (selectedItem.wrapstyle || {})[styleKey] === 'italic';
  
    this.props.onChange && this.props.onChange(styleKey, style? null: 'italic');
  }

  render() {
    let {selectedItem={}, className, styleKey} = this.props;
    let style = (selectedItem.wrapstyle || {})[styleKey] === 'italic';

    return (
      <button
        className={`control-button ${className || ''} ${style ? 'active' : ''}`}
        onClick={this.onChangeStyle.bind(this)}
        title='斜体'
      >
        <IconFont type='italic'/>
      </button>
    )
  }
}
