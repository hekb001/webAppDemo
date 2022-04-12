/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 字体
 */
import React from 'react';
import {Dropdown, Menu} from '@alifd/next';
import IconFont from "../../components/IconFont/index";

export default class FontFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeStyle(fontFamily) {
    const {selected, styleKey} = this.props;
    if (!selected) return;
  
    this.props.onChange && this.props.onChange(styleKey, fontFamily);
  }

  render() {
    let {options, selectedItem={}, className, styleKey} = this.props;
    let currentIndex;
    let fontFamily = (selectedItem.wrapstyle || {})[styleKey];
    for (let index = 0; index < options.fontSizes.length; index++) {
      let item = options.fontSizes[index];
      if (fontFamily === item.size) {
        currentIndex = index;
        break;
      }
    }

    return (
      <Dropdown
        triggerType='click'
        trigger={
          <button
            className={`control-button ${className || ''}`}
            title='字体'
          >
            <IconFont type='font-family'/>
          </button>
        }
        className={`font-family-dropdown`}
      >
        <Menu>
          {options.fontFamilies.map((item, index) => {
            return (
              <Menu.Item
                key={index}
                selected={currentIndex === index}
                onClick={(e) => {
                  this.onChangeStyle(item.family)
                }}
              >
                <span style={{fontFamily: item.family}}>{item.name}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Dropdown>
    )
  }
}
