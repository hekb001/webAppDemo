/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 工具栏
 */
import React from 'react';
import BackgroundColor from './BackgroundColor';
import Bold from './Bold';
import FontColor from './FontColor';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import Italic from './Italic';
import LineThrough from './LineThrough';
import Split from './Split';
import Underline from './Underline';
import Undo from './Undo';
import Redo from './Redo';
import Import from './Import';
import Export from './Export';
import Preview from './Preview';
import Exit from './Exit';
import Save from './Save';
import Reset from './Reset';
import {useStore} from '../../store/hooks';

export default ()=>{
  const {
    selected,
    selectedItem,
    options={},
    onItemSettingChange,
    onImportData,
    onExportData,
    onUndo,
    onRedo,
    undoItems,
    redoItems,
    preview,
    onPreview,
    onExit,
    onSave,
    onRest,
  } = useStore();
  
  const onChange = (type, value)=>{
    let style = selectedItem.wrapstyle||{};
    
    style[type] = value;
    
    onItemSettingChange(selected, 'wrapstyle', style);
  };
  
  const props = {
    selected: selected,
    selectedItem: selectedItem,
    options: options,
    onChange: onChange,
    onImportData,
    onExportData,
    onUndo,
    onRedo,
    undoItems,
    redoItems,
    preview,
    onPreview,
    onExit,
    onSave,
    onRest
  };
  
  return (
    <div className='toolbars'>
      <Import {...props}/>
      <Export {...props}/>
      <Split />
      <Undo {...props}/>
      <Redo {...props}/>
      <Split />
      <FontFamily styleKey='fontFamily' {...props}/>
      <FontSize styleKey='fontSize' {...props}/>
      <FontColor styleKey='color' {...props}/>
      <Bold styleKey='fontWeight' {...props}/>
      <Italic styleKey='fontStyle' {...props}/>
      <Underline styleKey='textDecoration' {...props}/>
      <LineThrough  styleKey='textDecoration' {...props}/>
      <Split/>
      <BackgroundColor styleKey='backgroundColor' {...props}/>
      <Split/>
      <Preview {...props} className='primary-color'/>
      <Split/>
      <Save {...props}/>
      <Split/>
      <Reset {...props}/>
      <Split/>
      <Exit {...props}/>
    </div>
  )
}

