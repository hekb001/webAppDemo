/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 字体颜色
 */
import React from 'react';
import {SketchPicker} from 'react-color';
import {Dropdown} from '@alifd/next';
import IconFont from "../../components/IconFont/index";
import Utils from '../../utils/index';

export default class FontColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeComplete(color) {
    let rgbaColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
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
        triggerType='click'
        visible={this.state.visible}
        trigger={
          <button
            className={`control-button ${className || ''}`}
            title='字体颜色'
          >
            <IconFont type='font-color'/>
          </button>
        }
        className={`font-color-dropdown`}
        onVisibleChange={(visible) => {
          this.setState({
            visible: visible
          });
        }}
      >
        <SketchPicker
          color={color}
          onChangeComplete={this.handleChangeComplete.bind(this)}
        />
      </Dropdown>
    )
  }
}
