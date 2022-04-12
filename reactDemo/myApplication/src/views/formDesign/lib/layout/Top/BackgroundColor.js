/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 背景颜色
 */
import React from 'react';
import {SketchPicker} from 'react-color';
import {Dropdown} from '@alifd/next';
import Utils from '../../utils/index';

export default class StrokeColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeStyle(color) {
    const rgbaColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    const {selected, styleKey} = this.props;
    if (!selected) {
      this.setState({
        visible: false
      });
      return;
    }
    
    this.setState({
      visible: false
    });
    
    this.props.onChange && this.props.onChange(styleKey, rgbaColor);
  }

  render() {
    let {selectedItem = {}, className, styleKey} = this.props;
    let colorStr = (selectedItem.wrapstyle || {})[styleKey];
    let color;
    if (colorStr) {
      color = Utils.colorRGBtoJson(colorStr);
    }

    return (
      <Dropdown
        visible={this.state.visible}
        triggerType='click'
        trigger={
          <button
            className={`control-button ${className || ''} ${color ? 'active' : ''}`}
            title='背景颜色'
          >
            背景颜色
          </button>
        }
        className={`stroke-color-dropdown`}
        onVisibleChange={(visible) => {
          this.setState({
            visible: visible
          });
        }}
      >
        <SketchPicker
          color={color}
          onChangeComplete={this.onChangeStyle.bind(this)}
        />
      </Dropdown>
    )
  }
}
