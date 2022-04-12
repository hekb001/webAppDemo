/**
 * Date: 2021年1月20日17:21:14
 * Author: kevin.he
 * Desc: 颜色选择
 */
import React from 'react';
import {SketchPicker} from 'react-color';
import {Dropdown} from '@alifd/next';
import Utils from '../../utils/index';

export default class SketchPickerField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChangeStyle(color) {
    const rgbaColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    this.setState({
      visible: false
    });
    
    this.props.onChange && this.props.onChange(rgbaColor);
  }
  
  render() {
    let {value: colorStr} = this.props;
    let color;
    if (colorStr) {
      color = Utils.colorRGBtoJson(colorStr);
    }
    
    return (
      <Dropdown
        visible={this.state.visible}
        triggerType='click'
        trigger={
         <div className='SketchPickerField' style={{borderColor: colorStr}}/>
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
