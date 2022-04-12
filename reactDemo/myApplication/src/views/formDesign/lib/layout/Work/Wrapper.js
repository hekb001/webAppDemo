/**
 * Date: 2021年1月21日16:11:07
 * Author: kevin.he
 * Desc: 表单设计器-工作区域-单位工作区
 */
import React from 'react';
import WrapperDesign from './WrapperDesign';
import WrapperUse from './WrapperUse';
import {useStore} from '../../store/hooks';

export default ({...props})=>{
  const {preview} = useStore();
  return preview ? <WrapperUse {...props}/>: <WrapperDesign {...props}/>
}