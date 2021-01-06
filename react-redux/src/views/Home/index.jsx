import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tree, Checkbox, Table, Divider,Spin } from 'antd';
import store from '../../store/configureStore';
import {myaction,getAsyncData} from 'action/home.js';
import { Link, browserHistory } from 'react-router';
import './index.less';
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

export default function Home(props) {
  const asyncPayload = useSelector(state => state.home.asyncPayload) || [];
  const pending = useSelector(state => state.home.pending) || false;
  const [expandedKeys, onExpand] = useState(['0-0-0', '0-0-1']);
  const [checkStrictly, toggleStrictly] = useState(true);
  const [checkable, selectMore] = useState(false);
  const [autoExpandParent] = useState(true);
  const [checkedKeys, onCheck] = useState([])
  const [selectedKeys, onSelect] = useState([])
  const dispatch = useDispatch();
  const goBack = () => {
    browserHistory.goBack();
  }
  //获取state里面的数据
  const getState = () => {
    console.log(process.env,'process.env...')
    console.log('asyncPayload',asyncPayload);
  }
  //修改state里面的数据
  const changeState = () => {
    getAsyncData()(dispatch)
  }
  //跳转公司详情页
  const goCompanyInfo = () => {
    browserHistory.push('/companyInfo');
  }
  return (
    <div className="App">
      <div className='ml-5'>主页</div>
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
        <Button onClick={goBack} type='primary'>返回</Button><br /><br />
        <Button onClick={changeState} type='primary'>设置state里面的数据</Button><br /><br />
        <Checkbox value={checkable} onChange={() => selectMore(!checkable)}>多机构选择</Checkbox><br /><br />
        <Checkbox value={checkStrictly} onChange={() => toggleStrictly(!checkStrictly)}>包含下级</Checkbox><br />
        <Button onClick={getState}>获取store里面的state</Button><br /><br />
        <Button onClick={goCompanyInfo}>公司详情1</Button><br /><br />
      </Spin>
    </div>
  );
}
