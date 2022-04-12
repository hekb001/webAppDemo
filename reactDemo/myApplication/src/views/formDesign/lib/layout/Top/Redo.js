/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> redo
 */
import React from 'react';
import IconFont from '../../components/IconFont/index';

export default class Redo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChangeStyle() {
    const {onRedo} = this.props;
    onRedo && onRedo();
  }

  render() {
    let {redoItems, className} = this.props;

    return (
      <button
        className={`control-button ${className || ''}`}
        onClick={this.onChangeStyle.bind(this)}
        title='重做'
        disabled={redoItems.length===0}
      >
        <IconFont type='redo'/>
      </button>
    )
  }
}
