/**
 * Date: 2021年1月19日21:31:47
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件-> 成组的表单
 */
import React from 'react';
import {Button} from '@alifd/next';
import IconFont from '../../../components/IconFont/index';
import RenderField from '../RenderField';

export default class GroupControl extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render(){
    let {value = [], widgets=[], onChange, ...other} = this.props;
    if(value.length === 0){
      value = [{}];
    }
    return (
      <div className='group-control'>
        {
          widgets.length === 0 ? <div className='null-h2'>拖拽</div>: value.map((v, i)=>{
            return (
              <div key={i} className='group-control-item'>
                <div key={i} className='group-control-item-content'>
                  {
                    widgets.map((item, index)=>{
                      return <RenderField key={index} data={item}/>
                    })
                  }
                </div>
                <div key={i} className='group-control-item-options'>
                  <Button text style={{marginRight: 6}}><IconFont type='add-circle' className='green'/></Button>
                  <Button text><IconFont type='delete-circle' className='red'/></Button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
