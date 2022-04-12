/*
 * @Author: kevin.he 
 * @Date: 2021-11-16 13:14:19 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-24 19:18:02
 * Desc: 表单设计器-控件库/模板库
 */
import React from 'react';
import WidgetControl from './WidgetControl';
import {basicElements,hightElements,layoutElements,GEECGElements } from '../../config';
const filedTitleStyle={
  fontWeight:'bold',
  margin:'16px 8px 8px 8px'
}
const fields = ['basic','hight', 'layout','GEECG'];
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  renderFiledType(type){
    let obj={
      text:'',
      elements:{}
    }
    switch (type){
      case 'basic': //基础字段
        obj.text='基础字段';
        obj.elements=basicElements
        return obj
      case 'hight': //高级字段
        obj.text='高级字段';
        obj.elements=hightElements
        return obj
      case 'layout'://布局字段
        obj.text='布局字段';
        obj.elements=layoutElements
        return obj
      case 'GEECG'://GEECG字段
        obj.text='GEECG字段';
        obj.elements=GEECGElements
        return obj
    }
  }
  renderFiledContent(type){
    const elementsObj = this.renderFiledType(type);
    return <React.Fragment>
      <div style={{...filedTitleStyle}}>{elementsObj.text}</div>
      <div>
        {
         elementsObj.elements.map((item, i) => {
          return (
            <WidgetControl key={i} text={item.text} {...item} />
          )
        }) 
        }
      </div>
    </React.Fragment>
  }
  render() {
    return (
      <div className='left-control-list'>
        <div className='controls-form'>
          {
            fields.map((item,index)=>{
              return  <div key={index}>{this.renderFiledContent(item)}</div>
            })
          }
        </div>
      </div>
    )
  }
}
