import React, { Component } from 'react';
import { Button, Tree,Checkbox,Table,Divider } from 'antd';
import store from '../../store/configureStore';
import myaction from '../../action';
import { Link, browserHistory } from 'react-router';
import './index.less';
import watermark from 'components/Watermark';
const { TreeNode } = Tree;
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};
const _columns=[
  '','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''
]
const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '姓名',
    dataIndex: 'age',
    render(){
      return <div  className='split-div'>
        <div>18</div>
        <Divider style={{margin:0}}/>
        <div>18</div>
      </div>
    }
  },
   {
    title: '工号000001',
    dataIndex: 'age1',
    render(){
      return <div className='split-div'>
        <div>18</div>
        <Divider style={{margin:0}}/>
        <div>18</div>
      </div>
    }
  },
  {
    title: '1',
    dataIndex: 'phone',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '2',
    dataIndex: 'phone1',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '3',
    dataIndex: 'phone2',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '4',
    dataIndex: 'phone3',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '5',
    dataIndex: 'phone4',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '6',
    dataIndex: 'phone5',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '7',
    dataIndex: 'phone6',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '8',
    dataIndex: 'phone7',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '9',
    dataIndex: 'phone8',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '10',
    dataIndex: 'phone9',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '11',
    dataIndex: 'phone10',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '12',
    dataIndex: 'phone11',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '13',
    dataIndex: 'phone12',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '14',
    dataIndex: 'phone13',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '15',
    dataIndex: 'phone14',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '16',
    dataIndex: 'phone15',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '17',
    dataIndex: 'phone16',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '18',
    dataIndex: 'phone17', 
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '19',
    dataIndex: 'phone18',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '20',
    dataIndex: 'phone19',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '21',
    dataIndex: 'phone20',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '22',
    dataIndex: 'phone21',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '23',
    dataIndex: 'phone22',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '24',
    dataIndex: 'phone23',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '25',
    dataIndex: 'phone24',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '26',
    dataIndex: 'phone25',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '27',
    dataIndex: 'phone26',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '28',
    dataIndex: 'phone27',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '28',
    dataIndex: 'phone28',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '30',
    dataIndex: 'phone29',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '31',
    dataIndex: 'phone30',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '实际出勤小时',
    dataIndex: 'file1',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '实际出勤天',
    dataIndex: 'file2',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '计时',
    children: [
      {
        key: 121,
        name: 'Jimmy Brown',
        title: '正常小时',
        dataIndex: 'tel1',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
      {
        key: 122,
        name: 'Jimmy Brown',
        title: '平时加班',
        dataIndex: 'tel2',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
      {
        key: 123,
        name: 'Jimmy Brown',
        title: '周末加班',
        dataIndex: 'tel3',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
      {
        key: 124,
        name: 'Jimmy Brown',
        title: '节假日加班',
        dataIndex: 'tel4',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
    ],
    render: (text, row, index) => {
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 4,
        },
      };
    },
  },

  {
    title: '计件/月薪',
    children: [
      {
        key: 121,
        name: 'Jimmy Brown',
        title: '正常小时',
        dataIndex: 'file3',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
      {
        key: 122,
        name: 'Jimmy Brown',
        title: '平时加班',
        dataIndex: 'file4',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
      {
        key: 123,
        name: 'Jimmy Brown',
        title: '周末加班',
        dataIndex: 'file5',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
      {
        key: 124,
        name: 'Jimmy Brown',
        title: '节假日加班',
        dataIndex: 'file6',
        render(){
          return <div className='split-div'>
            <div>18</div>
            <Divider style={{margin:0}}/>
            <div>18</div>
          </div>
        }
      },
    ],
    render: (text, row, index) => {
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 4,
        },
      };
    },
  },
  {
    title: '提前下班',
    dataIndex: 'file7',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '事假',
    dataIndex: 'file8',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '年假',
    dataIndex: 'file9',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '法定假',
    dataIndex: 'file10',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '迟到/早退次数',
    dataIndex: 'file11',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '迟到/早退分钟',
    dataIndex: 'file12',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '漏打卡次数',
    dataIndex: 'file13',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '备注',
    dataIndex: 'address',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
  {
    title: '签名',
    dataIndex: 'address1',
    render(row){
      return <div  className='split-div'>
       <div>{row}</div>
      </div>
    }
  },
];

const data = [
  {
    key: '1',
    name: '1',
    age: 32,
    age1:'22',
    tel1: '0571-22098909',
    tel2: '0571-22098909',
    tel3: '0571-22098909',
    tel4: '0571-22098909',
    phone: 22,
    phone1: 22,
    phone2: 22,
    phone3: 22,
    phone4: 22,
    phone5: 22,
    phone6: 22,
    phone7: 22,
    phone8: 22,
    phone9: 22,
    phone10: 22,
    phone11: 22,
    phone12: 22,
    phone13: 22,
    phone14: 22,
    phone15: 22,
    phone16: 22,
    phone17: 22,
    phone18: 22,
    phone19: 22,
    phone20: 22,
    phone21: 22,
    phone22: 22,
    phone23: 22,
    phone24: 22,
    phone25: 22,
    phone26: 22,
    phone27: 22,
    phone28: 22,
    phone29: 22,
    phone30: 22,
    phone31: 22,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '2',
    tel1: '0571-22098909',
    tel2: '0571-22098909',
    tel3: '0571-22098909',
    tel4: '0571-22098909',
    phone: 22,
    phone1: 22,
    phone2: 22,
    phone3: 22,
    phone4: 22,
    phone5: 22,
    phone6: 22,
    phone7: 22,
    phone8: 22,
    phone9: 22,
    phone10: 22,
    phone11: 22,
    phone12: 22,
    phone13: 22,
    phone14: 22,
    phone15: 22,
    phone16: 22,
    phone17: 22,
    phone18: 22,
    phone19: 22,
    phone20: 22,
    phone21: 22,
    phone22: 22,
    phone23: 22,
    phone24: 22,
    phone25: 22,
    phone26: 22,
    phone27: 22,
    phone28: 22,
    phone29: 22,
    phone30: 22,
    phone31: 22,
    age: 42,
    age1:'22',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: '3',
    age: 32,
    age1:'22',
    tel1: '0571-22098909',
    tel2: '0571-22098909',
    tel3: '0571-22098909',
    tel4: '0571-22098909',
    phone: 22,
    phone1: 22,
    phone2: 22,
    phone3: 22,
    phone4: 22,
    phone5: 22,
    phone6: 22,
    phone7: 22,
    phone8: 22,
    phone9: 22,
    phone10: 22,
    phone11: 22,
    phone12: 22,
    phone13: 22,
    phone14: 22,
    phone15: 22,
    phone16: 22,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: '4',
    age: 18,
    age1:'22',
    tel1: '0571-22098909',
    tel2: '0571-22098909',
    tel3: '0571-22098909',
    tel4: '0571-22098909',
    phone: 22,
    phone1: 22,
    phone2: 22,
    phone3: 22,
    phone4: 22,
    phone5: 22,
    phone6: 22,
    phone7: 22,
    phone8: 22,
    phone9: 22,
    phone10: 22,
    phone11: 22,
    phone12: 22,
    phone13: 22,
    phone14: 22,
    phone15: 22,
    phone16: 22,
    phone17: 22,
    phone18: 22,
    phone19: 22,
    phone20: 22,
    phone21: 22,
    phone22: 22,
    phone23: 22,
    phone24: 22,
    phone25: 22,
    phone26: 22,
    phone27: 22,
    phone28: 22,
    phone29: 22,
    phone30: 22,
    phone31: 22,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: '5',
    age: 18,
    age1:'22',
    tel1: '0571-22098909',
    tel2: '0571-22098909',
    tel3: '0571-22098909',
    tel4: '0571-22098909',
    phone: 22,
    phone1: 22,
    phone2: 22,
    phone3: 22,
    phone4: 22,
    phone5: 22,
    phone6: 22,
    phone7: 22,
    phone8: 22,
    phone9: 22,
    phone10: 22,
    phone11: 22,
    phone12: 22,
    phone13: 22,
    phone14: 22,
    phone15: 22,
    phone16: 22,
    phone17: 22,
    phone18: 22,
    phone19: 22,
    phone20: 22,
    phone21: 22,
    phone22: 22,
    phone23: 22,
    phone24: 22,
    phone25: 22,
    phone26: 22,
    phone27: 22,
    phone28: 22,
    phone29: 22,
    phone30: 22,
    phone31: 22,
    address: 'Dublin No. 2 Lake Park',
  },
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      url:'',
      checkable:false,
      checkStrictly:true,
    }
  }
  purePrint(id, cb) {
    // 获取要打印的dom id
    if(typeof id === 'undefined'){
      console.error('缺少必须的参数 id');
      return false;
    }
    const printContent = document.getElementById(id);
    if(!printContent){
      console.error('缺少需要打印的页面节点，请检查传入的id');
      return false;
    }
    // 检查是否存在 id 为printFrame的元素
    let printFrame = document.getElementById('printFrame');
    // 如果存在，清空内容，为了后面添加打印内容做准备
    if(printFrame){
      printFrame.contentDocument.body.innerHTML = '';
    }else{
      // 如果不存在，添加一个id 为printFrame 的 iframe
      printFrame = document.createElement('IFRAME');
      printFrame.id = 'printFrame';
      printFrame.style="visibility: visible;width:0;height:0;position: absolute;top:0;left:0";
      printFrame.className="printFrame";
      document.body.appendChild(printFrame);
    }
    // 构造打印内容的html, 包括innerHTML,style,className
    const content = document.createElement('DIV');
    content.innerHTML = printContent.innerHTML;
    content.style = printContent.style;
    content.className = printContent.className;
    // 添加当前窗口的样式信息到 printFrame，保证样式一致
    const headStyle = document.head.innerHTML;
    printFrame.contentDocument.head.innerHTML = headStyle;
    // printFrame.contentDocument.body.style = "background: #fff";
    printFrame.onload = function(){
      console.log('ruok????')
    }
    printFrame.contentDocument.body.appendChild(content);
    setTimeout(() => {
        printFrame.contentWindow.print();
        document.getElementById('waterImg').style.visibility = 'hidden';
    }, 500);
  }
  goBack = () => {
    browserHistory.goBack();
  }
  //获取state里面的数据
  getState = () => {
    console.log('inintState', store.getState())
  }
  //修改state里面的数据
  changeState = () => {
    store.dispatch(myaction)
  }
  //监听redux中store发生改变事件
  listerner() {
    let newState = store.getState();
    this.setState(newState);
    console.log('changeState', store.getState())
  }
  //组件加载时，订阅监听事件
  componentDidMount() {
    console.log(process.env,'process.env');
    store.subscribe(this.listerner.bind(this));
  }
  //跳转公司详情页
  goCompanyInfo = () => {
    browserHistory.push('/companyInfo');
  }
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });
    selectMore=()=>{
      this.setState({checkable:!this.state.checkable})
    }
    toggleStrictly=()=>{
      this.setState({checkStrictly:!this.state.checkStrictly})
    }
    print=()=>{
      watermark({ content: 'Open Components',
      container: document.getElementById('print-table')
      },
      (url)=>{
        this.setState({url})
        setTimeout(()=>{
          document.getElementById('waterImg').style.visibility = 'visible';
          this.purePrint('print-table')
        },500)
      });
    }
  render() {
    const { url } = this.state;
    return (
      <div className="App">
        <div>主页1</div>
        <Button onClick={this.goBack} type='primary'>返回</Button><br /><br />
        <Button onClick={this.changeState} type='primary'>修改state里面的数据</Button><br /><br />
        <Button onClick={this.getState}>获取store里面的state</Button><br /><br />
        <Button onClick={this.goCompanyInfo}>公司详情1</Button><br /><br />
        <Checkbox value={this.state.checkable} onChange={this.selectMore}>多机构选择</Checkbox><br /><br />
        <Checkbox value={this.state.checkStrictly} onChange={this.toggleStrictly}>包含下级</Checkbox><br />
        <Tree
          checkable={this.state.checkable}
          checkStrictly={this.state.checkStrictly}
          onExpand={this.onExpand}
          draggable
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
        <div>
          <Button onClick={this.print}>打印</Button>
        </div>
        <div className='print-table' id = 'print-table'>
          <div className='waterImg' id = 'waterImg'>
            {
              _columns.map((item,index)=>{
                return <img src={url} key={index}/>
              })
            }
          </div>
          <h2 style={{textAlign:'center'}}>宏迅达科技有限公司</h2>
          <Table columns={columns} dataSource={data} bordered pagination={false} style={{ border:'1xp solid #000'}}/>
        </div>
      </div>
    );
  }
}

export default Home;