import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tree, Checkbox, Table, Divider, Spin, Layout, Menu, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { myaction, getAsyncData } from 'action/home';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { changeSideBar } from 'action/app';
import cookie from 'js-cookie';
import {Ctx,CtxStore } from 'store/context';
import { useSet } from 'store/hooks';
import Test from './test';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;
const langType = cookie.get('langType');
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

export function Cat(props) {
  const { x, y } = props.mouse;
  console.log('%c' + x, 'color:green')
  console.log('%c' + y, 'color:green')
  return (<div style={{ position: 'absolute', left: x, top: y }}>kevin</div>)
}
export function Mouse(props) {
  const [clientInfo, setClientInfo] = useState({ x: 0, y: 0 })
  const handleMouseMove = (event) => {
    setClientInfo({
      x: event.clientX,
      y: event.clientY
    })
  }
  return (<div style={{ height: '100vh' }} onMouseMove={(event) => handleMouseMove(event)}>
    {props.render(clientInfo)}
  </div>)
}
export default function Home(props) {
  const asyncPayload = useSelector(state => state.home.asyncPayload) || [];
  const pending = useSelector(state => state.home.pending) || false;
  const [expandedKeys, onExpand] = useState(['0-0-0', '0-0-1']);
  const [checkStrictly, toggleStrictly] = useState(true);
  const [checkable, selectMore] = useState(false);
  const [autoExpandParent] = useState(true);
  const [checkedKeys, onCheck] = useState([])
  const [selectedKeys, onSelect] = useState([])
  const [state, setState] = useSet({
   name:'liliwen'
  });
  const dispatch = useDispatch();
  const goBack = () => {
    props.history.push('/companyInfo');
  }
  //获取state里面的数据
  const getState = () => {
    console.log(process.env, 'process.env...')
    console.log(state,'state....')
    console.log('asyncPayload', asyncPayload);
  }
  //修改state里面的数据
  const changeState = () => {
    getAsyncData()(dispatch)
  }
  //跳转公司详情页
  const goCompanyInfo = () => {
    props.history.push('/companyInfo')
  }
  //切换语言
  const changeLanguage = (type) => {
    cookie.set('langType', type)
    location.reload();
  }
  const goHome = () => {
    props.history.replace('/home')
  }
  useEffect(() => {
    console.log(props, 'props......')
    changeSideBar(props)(dispatch)
  });
  const widthMouse = (Component) => {
    return <Mouse render={(mouse) =>
      <Component mouse={mouse} />
    }>
    </Mouse>
  }
  const setGlobal = {setState}
  const obj={
    name:'kevin'
  }
  return (
    <Ctx.Provider value={setGlobal}>
      <CtxStore.Provider value={obj}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Row>
              <Col span={22}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Link to='/home'>首页</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to='/companyInfo'>公司详情</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to='/progressBar'> 进度条</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to='/customIcon'>自定义图标</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to='/forward'>forward使用</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to='/useDrag'>拖拽</Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={2}>
                <div className='user-info'>
                  <span className='mr-5'>kevin.he</span>
                  <DownOutlined className='user-icon' />
                </div>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: '0 5px' }}>
            <div className="App">
              <div className="App">
                <div>
                  <Button onClick={() => changeLanguage('1')} type='primary' >切换中文</Button>
                  <Button onClick={() => changeLanguage('2')}>切换英文</Button>
                </div>
                <div className='ml-5'>
                  {/* 动态传值 */}
                  <FormattedMessage id='home.item1' values={{ name: langType == '1' ? '何凯兵' : 'kevin' }} />
                </div>
                <div onClick={goHome}>
                  <FormattedMessage id='home.item2' />
                </div>
                {/* <Link to={'/home'}>去home页</Link> */}
                {/* <Mouse render={(mouse) =>
              <Cat mouse={mouse} />
            }>
            </Mouse> */}
                {widthMouse(Cat)}
                <Test/>
              </div>
              <Spin spinning={pending}>
                <Tree
                  checkable={checkable}
                  checkStrictly={checkStrictly}
                  onExpand={(expandedKeys) => { onExpand(expandedKeys) }}
                  draggable
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={(data) => onCheck(data)}
                  checkedKeys={checkedKeys}
                  onSelect={(data) => onSelect(data)}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                >
                </Tree>
                <Button onClick={goBack} type='primary'>公司详情页</Button><br /><br />
                <Button onClick={changeState} type='primary'>设置state里面的数据</Button><br /><br />
                <Checkbox
                  onChange={() => selectMore(!checkable)}>
                  多机构选择
                </Checkbox>
                <br /><br />
                <Checkbox
                  onChange={() => toggleStrictly(!checkStrictly)}>
                  包含下级
                </Checkbox>
                <br />
                <Button onClick={getState}>获取store里面的state</Button><br /><br />
                <Button onClick={goCompanyInfo}>公司详情1</Button><br /><br />
              </Spin>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </CtxStore.Provider>
    </Ctx.Provider>
  );
}
