/**
 * Date: 2021年1月18日17:18:32
 * Author: kevin.he
 * Desc: 表单设计器-属性配置区-组件配置-隐藏规则
 */
import React from 'react';
import {Button, Dialog, Field, Select, Table, Form, Input, Message} from '@alifd/next';
import IconFont from '../../components/IconFont';

export default class SplicingTextSetting extends React.Component{
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
    const {schema, value, selecteditem, disabled} = this.props;
    const referencePoint = Object.keys(schema).map(key=>{
      const parentType = schema[key].parent?schema[schema[key].parent].type: null;
      const parentLabel = schema[key].parent?schema[schema[key].parent].labeltext: null;
      
      return {
        ...schema[key],
        label: schema[key].formName,
        value: key,
        itemKey: key,
        parentType: parentType,
        parentLabel: parentLabel,
      }
    }).filter(item=>!['group', 'area'].includes(item.type) && item.id !== selecteditem.id);
    
    return (
      <div className='splicing-text-setting'>
        <Button text type='primary' disabled={disabled} onClick={()=>{
          this.setState({
            visible: true
          })
        }}
        >
          <IconFont type='setting'/>
        </Button>
        {
          this.state.visible &&
          <SplicingTextModal
            title='拼接规则配置'
            onOk={this.onOk.bind(this)}
            onClose={this.onClose.bind(this)}
            onCancel={this.onClose.bind(this)}
            referencePoint={referencePoint}
            config={value}
          />
        }
      </div>
    )
  }
}

const Ellipsis = ({trigger, text})=>{
  return (<span className='next-span-text'>{text}</span>)
};

class SplicingTextModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceKey: {
        referencePoint: props.referencePoint||[],
        relationPoint: props.referencePoint||[],
        relationValue: [],
        wrap: [
          {label: '不换行', value: '1'},
          {label: '段前换行', value: '2'},
          {label: '段后换行', value: '3'}
        ]
      },
      config: props.config||{},
      itemKeyToOptions: [],
    };
    this.columns = [
      {
        title: '值',
        dataIndex: 'value',
        width: 100,
        cell: (value, index, record) => {
          return (
            <Ellipsis
              trigger={<span>{value}</span>}
              text={value}
            />
          )
        }
      },
      {
        title: '显示值',
        dataIndex: 'label',
        width: 100,
        cell: (value, index, record) => {
          return (
            <Ellipsis
              trigger={<span>{value}</span>}
              text={value}
            />
          )
        }
      },
      {
        title: '拼接值',
        dataIndex: 'spliceLabel',
        width: 100,
        cell: (value, index, record) => {
          const props = {value, index, record, type: 'input', dataIndex: 'spliceLabel', that: this};
          return this.getTableCell(props);
        }
      },
      {
        title: '拼接前缀',
        dataIndex: 'splicePrefix',
        width: 100,
        cell: (value, index, record) => {
          const props = {value, index, record, type: 'input', dataIndex: 'splicePrefix', that: this};
          return this.getTableCell(props);
        }
      },
      {
        title: '拼接后缀',
        dataIndex: 'spliceSuffix',
        width: 100,
        cell: (value, index, record) => {
          const props = {value, index, record, type: 'input', dataIndex: 'spliceSuffix', that: this};
          return this.getTableCell(props);
        }
      }
    ];
    this.field = new Field(this, {
      onChange: this.onFieldChange.bind(this)
    })
  }
  
  getTableCell({value, index, record, dataIndex, that}){
    return (
      <Input
        value={value}
        className='next-table-cell-edit'
        onChange={that.onChange.bind(this, dataIndex, index, record)}
      />
    )
  }
  
  /**
   * @method 内容改变事件
   */
  onChange(type, index, record, value) {
    const {activeIndex, config} = this.state;
    const {items=[]} = config;
    const itemsRecord = items[activeIndex];
    const initData = itemsRecord.dataSource||[];
    initData[index][type] = value;
    this.setState({
      config: config
    })
  }
  
  onFieldChange(type, value){
    const {activeIndex, dataSourceKey, config={}} = this.state;
    const {items=[]} = config;
    let itemsRecord = items[activeIndex];
  
    if(type === 'referencePoint'){
      let sameItem = items.filter(item=>item.itemKey===value);
      if(sameItem.length > 0){
        Message.warning( '此项点已设置规则！');
      
        return;
      }
      if(itemsRecord){
        let referencePointRecord = (dataSourceKey['referencePoint']||{}).find(item=>item.value===value)||{};
        referencePointRecord = JSON.parse(JSON.stringify(referencePointRecord));
        for(let key in referencePointRecord){
          itemsRecord[key] = referencePointRecord[key];
        }
        itemsRecord['referencePoint'] = referencePointRecord['itemKey'];
      }
    }else{
      itemsRecord[type] = value;
    }
    this.setState({
      items: items,
    })
  }
  
  /**
   * 获取表格数据
   * @returns {*}
   */
  getTableData(){
    const {dataSourceKey, activeIndex, config} = this.state;
    const {items=[]} = config;
    const {referencePoint} = this.field.getValues();
    const itemsRecord = items[activeIndex];
    let referencePointRecord = (dataSourceKey['referencePoint']||{}).find(item=>item.value===referencePoint);
    
    if(!itemsRecord || !referencePointRecord) return null;
    referencePointRecord = JSON.parse(JSON.stringify(referencePointRecord));
    const initData = itemsRecord.dataSource; // 旧数据
    const curData = referencePointRecord.dataSource; // 最新下拉值
    if(!initData || !curData) return null;
    
    let newDataSource = [];
    for(let i=0; i<curData.length; i++){
      let record = initData.find(item=>item.value===curData[i].value)||{};
      newDataSource[i] = Object.assign({spliceLabel: curData[i].label}, curData[i], record)
    }
    
    return newDataSource;
  }
  
  /**
   * 添加配置项
   */
  onAddItems(){
    const config = this.state.config||{};
    const {items=[]} = config;
    
    if(items.filter(item=>item.itemKey === 'null').length > 0){
      return;
    }
    
    let record = {
      wrap: '1',
      itemKey: 'null'
    };
    items.push(record);
    
    config['items'] = items;
    this.setState({
      config: config,
      activeKey: 'null',
      activeIndex: items.length-1
    });
    this.field.reset();
    this.field.setValues(record);
  }
  
  /**
   * 删除配置项
   */
  onRemoveItems(){
    const config = this.state.config||{};
    const {items=[]} = config;
    const values = this.field.getValues();
    let newItems = items;
    if(values.itemKey){
      newItems = items.filter(item=>item.itemKey!==values.itemKey);
    }
    config['items'] = newItems;
    this.setState({
      config: config,
      activeKey: '',
      activeIndex: -1,
    });
    this.field.reset();
  }
  
  /**
   * 点击
   */
  onClick(item, index){
    this.setState({
      activeKey: item.itemKey,
      activeIndex: index,
    });
    this.field.reset();
    this.field.setValues(item)
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
    this.props.onOk && this.props.onOk(this.state.config)
  }
  
  itemRender(item){
    return item.parentLabel && ['group'].includes(item.parentType)?`${item.label}(${item.parentLabel})`: item.label
  }
  
  render() {
    const {isLoading, dataSourceKey, config, activeIndex} = this.state;
    const {items = [], showValue} = config;
    
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 14
      }
    };
    const activeRecord = items[activeIndex];
    const disabled = !activeRecord;
    
    const relationValueData = activeRecord?((dataSourceKey['referencePoint']||{}).find(item=>item.value===activeRecord.relationPoint)||{}).dataSource||[]: [];
    
    const dataSource = this.getTableData();
    
    return (
      <Dialog
        title={'拼接格式'}
        local={{
          onSave: '确定',
          onCancel: '取消'
        }}
        visible={true}
        onOk={this.onOk.bind(this)}
        onCancel={this.onCancel.bind(this)}
        onClose={this.onClose.bind(this)}
        style={{width: 750}}
      >
        <div className='SplicingTextModal' style={{height: 450}}>
          <div className='SplicingTextModal-title'>已添加</div>
          <div className='SplicingTextModal-add-items' style={{minHeight: 70}}>
            {
              items.length>0?
                items.map((item, index)=>{
                  return (
                    <div
                      className={`single-item ${activeIndex === index?'active': ''}`}
                      key={index}
                      onClick={this.onClick.bind(this, item, index)}
                    >
                      「{item.label}」
                    </div>
                  )
                }): <span className='no-data'>无</span>
            }
          </div>
          <div className='SplicingTextModal-item-setting'>
            <div className='setting-form'>
              <Form {...formItemLayout} field={this.field}>
                <Form.Item label='引用项点'>
                  <Select disabled={disabled} name='referencePoint' itemRender={this.itemRender.bind(this)} dataSource={dataSourceKey['referencePoint']} showSearch={true} autoWidth={false}/>
                </Form.Item>
                <Form.Item label='关联项点'>
                  <Select disabled={disabled} name='relationPoint' itemRender={this.itemRender.bind(this)} dataSource={dataSourceKey['referencePoint']} showSearch={true} autoWidth={false} hasClear={true}/>
                </Form.Item>
                <Form.Item label='关联值'>
                  <Select disabled={disabled} name='relationValue' dataSource={relationValueData} showSearch={true} autoWidth={false} hasClear={true}  mode='multiple'/>
                </Form.Item>
                <Form.Item label='换行'>
                  <Select disabled={disabled} name='wrap' dataSource={dataSourceKey['wrap']}/>
                </Form.Item>
                <Form.Item label='前缀'>
                  <Input disabled={disabled} name='prefix'/>
                </Form.Item>
                <Form.Item label='后缀'>
                  <Input disabled={disabled} name='suffix'/>
                </Form.Item>
              </Form>
            </div>
            <div className='setting-buttons'>
              <Button
                type='primary'
                onClick={this.onAddItems.bind(this)}
              >添加</Button>
              <Button
                type='normal'
                onClick={this.onRemoveItems.bind(this)}
              >删除</Button>
            </div>
          </div>
          {
            dataSource?
              <div className='show-value-table' style={{marginBottom: 6, width: '100%', maxHeight: 250, display: 'flex'}}>
                <Table
                  size='small'
                  loading={isLoading}
                  dataSource={dataSource || []}
                  columns={this.columns}
                />
              </div>: null
          }
          <div className='show-value'>
            <Input.TextArea
              style={{width: '100%'}}
              rows={4}
              value={showValue}
              onChange={(value)=>{
                config['showValue'] = value;
                this.setState({
                  config: config
                })
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

