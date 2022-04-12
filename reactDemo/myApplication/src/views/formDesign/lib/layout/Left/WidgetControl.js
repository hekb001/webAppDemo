/*
 * @Author: kevin.he 
 * @Date: 2021-11-16 13:14:19 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-24 19:18:46
 *  Desc: 表单设计器-控件库/模板库-可拖拽的
 */
import React from 'react';
import {useDrag} from 'react-dnd';
import Utils from '../../utils';
import {addItemFun} from '../../store/utils';
import {useStore, useGlobal} from '../../store/hooks';
import RenderIcon from './RenderIcon';
export default ({text, type, schema})=>{
  const [{isDragging}, dragRef] = useDrag({
    item: {
      type: 'box',
      dragItem: {
        id: `${type}_${Utils.getUuid(6)}`,
        ...schema,
      },
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
  const setGlobal = useGlobal();
  const {selected, onFlattenChange, data, schema: schemaData} = useStore();
  
  const handleElementClick = ()=>{
    const [newFlatten, newId, newItem] = addItemFun({schemaData, selected, item: {id: `${type}_${Utils.getUuid(6)}`, ...schema}, data});
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId, selectedItem: newItem});
  };
  return (
    <div ref={dragRef} style={{display:'inline-block',width:'50%'}}>
      <WidgetUI text={text} onClick={handleElementClick} type={type}/>
    </div>
  )
}

const WidgetUI = ({ onClick, text,type }) => {
  return (
    <div className='controls-form-item' onClick={onClick}>
      <span className='controls-form-item-inner' >
          <span className='primary-color'>{RenderIcon({type:type})}</span>
          <span style={{marginLeft:5}}>{text}</span>
        </span>
    </div>
  );
};