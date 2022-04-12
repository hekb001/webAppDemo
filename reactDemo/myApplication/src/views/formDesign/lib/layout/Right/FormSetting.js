/**
 * Date: 2021年1月18日17:18:32
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区-表单配置
 */
import React from 'react';
import {formSetting} from '../../config';
import {useStore} from '../../store/hooks';
import typeToComponent from './typeToComponent';

export default ()=>{
  const {frProps = {}, onFrPropsChange} = useStore();
  
  const onChange = (type, value)=>{
    frProps[type] = value;
    onFrPropsChange(frProps);
  };
  
  return (
    <div className='setting-main'>
      {
        formSetting.map((item, index)=>{
          const Component = typeToComponent[item.type];
          const {label, ...other} = item;
          return (
            <div key={index} className='setting-item'>
              <div className='setting-item-label'>{label}</div>
              <div className='setting-item-content'>
                {Component &&
                <Component
                  {...other}
                  value={frProps[item.key]}
                  onChange={(value)=>{
                    onChange(item.key, value)
                  }}
                />}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}