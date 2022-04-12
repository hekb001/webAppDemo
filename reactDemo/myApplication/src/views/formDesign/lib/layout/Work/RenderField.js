/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器-单个表单
 */
import React from 'react';
import {Balloon} from '@alifd/next';
import IconFont from '../../components/IconFont';
import typeToWidget from './widgets';
import {useStore} from '../../store/hooks';

const RenderField = ({ data, labelStyle, fieldStyle, valueData, onChangeValue })=>{
  const Widget = typeToWidget[data.type];
  
  if(!Widget) return null;
  
  const {onChange, formData} = useStore();
  
  const onChangeHandle = (value)=>{
    if(onChangeValue){
      onChangeValue && onChangeValue(data.id, value);
    }else{
      formData[data.id] = value;
      onChange && onChange(formData);
    }
  };
  return (
    <div className='render-field' style={fieldStyle}>
      {
        data.type!=='text' && !(data.islabelnullwidth && [null, '', undefined].includes(data.labeltext)) &&
        <div
          className='render-field-label'
          style={labelStyle}
        >
          {data.labeltext}
          {data.description && <Balloon.Tooltip trigger={<IconFont type='info' className='label-description'/>}>{data.description}</Balloon.Tooltip>}
        </div>
      }
      <div className='render-field-content'>
        <Widget
          {...data}
          value={valueData?valueData[data.id]:formData[data.id]}
          onChange={onChangeHandle}
          // formData={formData}
        />
      </div>
    </div>
  )
};

export default RenderField;
