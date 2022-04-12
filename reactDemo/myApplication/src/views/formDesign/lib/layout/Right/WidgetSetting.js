/**
 * Date: 2021年1月18日17:18:32
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区-组件配置
 */
import React from 'react';
import {useStore} from '../../store/hooks';
import {typeToSetting} from '../../config';
import typeToComponent from './typeToComponent';

export default ()=>{
  const {selected, selectedItem, frProps={}, onItemSettingChange, formData, schema} = useStore();
  const settings = selectedItem?typeToSetting[selectedItem.type]: [];
  const onChange = (type, value)=>{
    onItemSettingChange(selected, type, value);
  };
  const disabled = selected === '#';
  return (
    <div className='setting-main'>
      {
        settings.map((item, index)=>{
          const Component = typeToComponent[item.type];
          const {label, text, ...other} = item;
          let showValue = '';
          if(item.key === 'value'){ //纯文本
            showValue = formData[selected]
          }
          //如果是多行文本，显示行数
          if(selectedItem.isRows  && item.key == 'rows'){
            item.disabled = false
          }
           //如果是多行文本，显示行数
           if(!selectedItem.isRows && item.key == 'rows'){
            item.disabled = true
          }
          return (
            <div key={index} className='setting-item'>
              <div className='setting-item-label'>{label}</div>
              <div className='setting-item-content'>
                {Component &&
                <Component
                  {...other}
                  label={text}
                  placeholder={item.placeholder}
                  schema={schema.schema}
                  selecteditem={selectedItem}
                  checked={selectedItem[item.key]}
                  value={selectedItem[item.key]||showValue}
                  onChange={(value)=>{
                    onChange(item.key, value)
                  }}
                  disabled={item.disabled || disabled}
                />}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}