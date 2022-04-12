/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏 -> 字体大小
 */
import React from 'react';
import {Dropdown, Menu} from '@alifd/next';
import IconFont from "../../components/IconFont/index"

export default class FontSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeStyle(fontSize) {
    const {selected, styleKey} = this.props;
    if (!selected) return;
  
    this.props.onChange && this.props.onChange(styleKey, fontSize);
  }

  render() {
    let {options, selectedItem={}, className, styleKey} = this.props;
    let currentIndex;
    let fontSize = (selectedItem.wrapstyle || {})[styleKey];
    for (let index = 0; index < options.fontSizes.length; index++) {
      let item = options.fontSizes[index];
      if (fontSize === item.size) {
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
            title='字体大小'
          >
            <IconFont type='font-size'/>
          </button>
        }
        className={`font-size-dropdown`}
      >
        <Menu>
          {options.fontSizes.map((item, index) => {
            return (
              <Menu.Item
                key={index}
                selected={currentIndex === index}
                onClick={(e) => {
                  this.onChangeStyle(item.size)
                }}
              >
                <span style={{fontSize: 12}}>{item.name}</span>
              </Menu.Item>
            )
          })}
        </Menu>
      </Dropdown>
    )
  }
}
