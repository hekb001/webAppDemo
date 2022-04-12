/**
 * Date: 2021年1月26日16:03:16
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区-组件配置-公式计算配置
 */
import React from 'react';
import {Button, Dialog, Select, Input} from '@alifd/next';
import IconFont from '../../components/IconFont';

export default class CalculateSetting extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  
  onClose(){
    this.setState({
      visible: false
    })
  }
  
  onOk(config){
    this.setState({
      visible: false
    });
    this.props.onChange && this.props.onChange(config);
  }
  
  render(){
    return(
      <div className='calculate-setting'>
        <Button text type='primary' onClick={()=>{
          this.setState({
            visible: true
          })
        }}
        >
          <IconFont type='setting'/>
        </Button>
        {
          this.state.visible &&
          <CalculateSettingModal
            schema={this.props.schema}
            selecteditem={this.props.selecteditem}
            value={this.props.value}
            onChange={this.props.onChange}
            onClose={this.onClose.bind(this)}
            onCancel={this.onClose.bind(this)}
            onOk={this.onOk.bind(this)}
          />
        }
      </div>
    )
  }
}

class CalculateSettingModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      config: JSON.parse(JSON.stringify(this.props.value||{}))
    };
  }
  
  onClose() {
    const {onClose} = this.props;
    onClose && onClose();
  }
  
  onCancel() {
    const {onCancel} = this.props;
    onCancel && onCancel();
  }
  
  /**
   * 保存显示格式配置
   */
  onOk() {
    const {onOk} = this.props;
    onOk && onOk(this.state.config)
  }
  
  onChange(config){
    this.setState({ config: config })
  }
  
  /**
   * 添加规则
   */
  onAddRule(){
    let config = this.state.config||{};
    let {items=[]} = config;
    if(!items || (items && items.length==0)) {
      items = [{index: 1, id: null, type: null}];
    }
    items.push({
      type: null,
      id: null,
      index: ((items[items.length-1]||{}).index||0)+1
    });
    
    config.items = items;
    
    this.onChange(config);
  }
  
  onDeleteRule(index){
    let config = this.state.config||{};
    let {items=[]} = config;
    if(!items || (items && items.length==0)) {
      items = [{index: 1, id: null, type: null}];
    }
  
    items.splice(index, 1);
    
    config.items = items;
    
    this.onChange(config);
  }
  
  onChangeIndex(index, value, actionType, record){
    let config = this.state.config||{};
    let {items=[]} = config;
    if(!items || (items && items.length==0)) {
      items = [{index: 1, id: null, type: null}];
    }
    items[index].id = record.value;
    items[index].type = record.type;
    
    config.items = items;
    
    this.onChange(config);
  }
  
  render(){
    let {schema, selecteditem} = this.props;
    let config = this.state.config||{};
    let {items=[], showValue} = config;
    let dataSource = Object.keys(schema).filter(key=>{
      return !['area', 'group'].includes(schema[key].type) && ![schema[key].parent, key].includes(selecteditem.id)
    }).map(key=>{
      let item = schema[key];
      return {
        type: item.type,
        label: `${item.formName}（${item.id}）`,
        value: item.id
      }
    });
    if(!items || (items && items.length==0)) {
      items = [{index: 1, id: null, type: null}];
    }
    
    return (
      <Dialog
        title='公式计算配置'
        visible={true}
        onOk={this.onOk.bind(this)}
        onClose={this.onClose.bind(this)}
        onCancel={this.onCancel.bind(this)}
      >
        <div style={{width: 500, maxHeight: 350, overflow: 'auto'}}>
          {
            items.map((item, index)=>{
              return (
                <div key={index} style={{marginBottom: 10}}>
                  <Input disabled={true} value={`v${item.index}`} style={{width: 120}}/>
                  <Select
                    showSearch={true}
                    dataSource={dataSource}
                    style={{width: 290, marginLeft: 10, marginRight: 10}}
                    value={item.id}
                    onChange={this.onChangeIndex.bind(this, index)}
                  />
                  <Button text onClick={this.onDeleteRule.bind(this, index)}>
                    <IconFont type='delete-circle' className='red'/>
                  </Button>
                  {
                    index===items.length-1 &&
                    <Button text onClick={this.onAddRule.bind(this)} style={{marginLeft: 10}}>
                      <IconFont type='add-circle' className='green'/>
                    </Button>
                  }
                </div>
              )
            })
          }
          <div style={{marginTop: 15}}>
            计算公式
            <Input
              style={{width: 400, marginLeft: 15}}
              value={showValue}
              onChange={(value)=>{
                config['showValue'] = value;
                this.onChange(config);
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }
  
}