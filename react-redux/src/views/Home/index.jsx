import React, { Component } from 'react';
import { Button, Tree,Checkbox } from 'antd';
import store from '../../store/configureStore';
import myaction from '../../action';
import { Link, browserHistory } from 'react-router';
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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      checkable:false,
      checkStrictly:true,
    }
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
  render() {
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
      </div>
    );
  }
}

export default Home;