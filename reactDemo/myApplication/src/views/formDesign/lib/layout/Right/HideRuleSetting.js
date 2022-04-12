/**
 * Date: 2021年1月18日17:18:32
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区-组件配置-隐藏规则
 */
import React from 'react';
import {Button, Dialog, Checkbox, Select, Input, Dropdown, Menu} from '@alifd/next';
import IconFont from '../../components/IconFont';

export default class HideRuleSetting extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
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
      <div className='hide-rule'>
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
          <HideRuleSettingModal
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

class HideRuleSettingModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: JSON.parse(JSON.stringify(props.value||[]))
    };
    this.typeDataSource = [
      {label: '包含任一', value: '1'},
      {label: '包含全部', value: '2'},
      {label: '完全相等', value: '3'}
    ];
  }
  
  onClose(){
    const {onClose} = this.props;
    onClose && onClose();
  }
  
  onCancel(){
    const {onCancel} = this.props;
    onCancel && onCancel();
  }
  
  onOk(){
    const {onOk} = this.props;
    onOk && onOk(this.state.value);
  }
  
  onChange(value){
    this.setState({
      value: value,
      searchText: '',
      visible: false
    })
  }
  
  /**
   * 添加规则
   */
  onAddRule(data){
    let value = this.state.value||[];
    
    value.push({
      type: data.type,
      relation: data.id,
      noValueHide: false,
      useshowtype: false,
      userHideType: false,
      showtype: '1',
      hideType: '1',
      showValue: null,
      hideValue: null,
    });
    
    this.onChange(value)
  }
  
  onDeleteRule(index){
    let value = this.state.value||[];
    
    value.splice(index, 1);
  
    this.onChange(value)
  }
  
  valueChange(index, type, value1){
    let value = this.state.value||[];
    
    value[index][type] = value1;
    
    this.onChange(value)
  }
  
  render(){
    let {schema, selecteditem} = this.props;
    let value = this.state.value||[];
    let schemaList = Object.keys(schema).filter(key=>{
      let label = `${schema[key].formName}（${schema[key].id}）`;
      return label.indexOf(this.state.searchText||'')>-1 && ![selecteditem.id, ...value.map(item=>item.relation)].includes(key) && schema[key].type!=='area' && schema[key].parent!==selecteditem.id
    });
    
    return(
      <Dialog
        title='显隐规则配置'
        visible={true}
        onOk={this.onOk.bind(this)}
        onClose={this.onClose.bind(this)}
        onCancel={this.onClose.bind(this)}
      >
        <div style={{width: 500, height: 400}}>
          <Dropdown
            trigger={<Button type='primary' style={{marginBottom: 10}}>添加控制项</Button>}
            visible={this.state.visible}
            onVisibleChange={(visible)=>this.setState({visible})}
          >
            <div style={{width: 500}}>
              <Input
                value={this.state.searchText}
                onChange={(value)=>this.setState({searchText: value})}
                style={{width: '100%'}}
              />
              <div style={{width: '100%', maxHeight: 350, overflow: 'auto'}}>
                <Menu>
                  {
                    schemaList.map(key=>{
                      return (
                        <Menu.Item key={key} onClick={this.onAddRule.bind(this, schema[key])}>
                          {schema[key].formName}（{schema[key].id}）
                        </Menu.Item>
                      )
                    })
                  }
                </Menu>
              </div>
            </div>
          </Dropdown>
          <div style={{height: 350, overflow: 'auto'}}>
            {
              value.map((item, index)=>{
                const curItem = schema[item.relation];
                const Component = curItem.dataSource?Select: Input;
                return (
                  <div className='hide-rule-item' key={index}>
                    <div className='hide-rule-item-title'>
                      {curItem.labeltext}（{item.relation}）
                      <Button text style={{float: 'right', marginTop: 3}} onClick={this.onDeleteRule.bind(this, index)}><IconFont type='delete'/></Button>
                    </div>
                    <div className='hide-rule-item-content'>
                      <div className='hide-rule-item-single'>
                        <Checkbox
                          checked={item.noValueHide}
                          onChange={this.valueChange.bind(this, index, 'noValueHide')}
                        >无值时隐藏</Checkbox>
                      </div>
                      <div className='hide-rule-item-single'>
                        <Checkbox
                          style={{marginRight: 4}}
                          checked={item.useshowtype}
                          onChange={this.valueChange.bind(this, index, 'useshowtype')}
                        />
                        <Select
                          style={{marginRight: 10, width: 110}}
                          dataSource={this.typeDataSource}
                          value={item.showtype}
                          onChange={this.valueChange.bind(this, index, 'showtype')}
                        />
                        以下值显示
                        <Component
                          multiple
                          showSearch
                          style={{width: 260, marginLeft: 6}}
                          dataSource={curItem.dataSource}
                          value={item.showValue}
                          onChange={this.valueChange.bind(this, index, 'showValue')}
                        />
                      </div>
                      <div className='hide-rule-item-single'>
                        <Checkbox
                          style={{marginRight: 4}}
                          checked={item.useHideType}
                          onChange={this.valueChange.bind(this, index, 'useHideType')}
                        />
                        <Select
                          style={{marginRight: 10, width: 110}}
                          dataSource={this.typeDataSource}
                          value={item.hideType}
                          onChange={this.valueChange.bind(this, index, 'hideType')}
                        />
                        以下值隐藏
                        <Component
                          multiple
                          showSearch
                          style={{width: 260, marginLeft: 6}}
                          dataSource={curItem.dataSource}
                          value={item.hideValue}
                          onChange={this.valueChange.bind(this, index, 'hideValue')}
                        />
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Dialog>
    )
  }
}