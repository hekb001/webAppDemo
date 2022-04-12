/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> undo
 */
import React from 'react';
import IconFont from '../../components/IconFont/index';

export default class Undo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeStyle() {
    const {onUndo} = this.props;
    onUndo && onUndo();
  }

  render() {
    let {undoItems, className} = this.props;

    return (
      <button
        className={`control-button ${className || ''}`}
        onClick={this.onChangeStyle.bind(this)}
        title='撤销'
        disabled={undoItems.length===0}
      >
        <IconFont type='undo'/>
      </button>
    )
  }
}
