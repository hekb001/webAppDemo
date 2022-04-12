/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 加粗
 */
import React from 'react';
import IconFont from '../../components/IconFont/index';

export default class Bold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeStyle() {
    const {selectedItem={}, selected, styleKey} = this.props;
    if (!selected) return;
    let style = (selectedItem.wrapstyle || {})[styleKey] === 'bold';
    
    this.props.onChange && this.props.onChange(styleKey, style ? null: 'bold');
  }

  render() {
    let {selectedItem={}, className, styleKey} = this.props;
    let style = (selectedItem.wrapstyle || {})[styleKey] === 'bold';

    return (
      <button
        className={`control-button ${className || ''} ${style ? 'active' : ''}`}
        onClick={this.onChangeStyle.bind(this)}
        title='加粗'
      >
        <IconFont type='bold'/>
      </button>
    )
  }
}
