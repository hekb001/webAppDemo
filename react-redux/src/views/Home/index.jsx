import React, { Component } from 'react';
import { Button } from 'antd';
import store from '../../store/configureStore';
import myaction from '../../action';
import { Link, browserHistory } from 'react-router';

class Home extends Component {
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
  componentDidMount () {
    store.subscribe(this.listerner.bind(this));
  }
  //跳转公司详情页
  goCompanyInfo=()=>{
    browserHistory.push('/companyInfo');
  }
  render() {
    return (
      <div className="App">
        <div>主页</div>
        <Button onClick={this.goBack} type='primary'>返回</Button><br/><br/>
        <Button onClick={this.changeState} type='primary'>修改state里面的数据</Button><br/><br/>
        <Button onClick={this.getState}>获取store里面的state</Button><br/><br/>
        <Button onClick={this.goCompanyInfo}>公司详情</Button>
      </div>
    );
  }
}

export default Home;