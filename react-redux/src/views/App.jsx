import React, { Component, useState, useEffect } from 'react';
import { Link, browserHistory } from 'react-router-dom';
import { Button,Layout } from 'antd'
import { FormattedMessage } from 'react-intl';
import cookie from 'js-cookie';
import '../assets/styles/index.less';
const langType = cookie.get('langType');
const { Content, Footer, Sider } = Layout;
export function Cat(props) {
  const { x, y } = props.mouse;
  console.log('%c'+ x,'color:green')
  console.log('%c'+ y,'color:green')
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
  return (<div style={{ height: '100vh' }} onMouseMove={(event)=>handleMouseMove(event)}>
    {props.render(clientInfo)}
  </div>)
}
export default function App(props) {
  const goHome = () => {
    props.history.replace('/home')
  }
  //切换语言
  const changeLanguage = (type) => {
    cookie.set('langType', type)
    location.reload();
  }
  useEffect(() => {
  });
  return (
    <div className="App">
      <div>
        <Button onClick={() => changeLanguage('1')} type='primary' >切换中文</Button>
        <Button onClick={() => changeLanguage('2')}>切换英文</Button>
      </div>
      <div className='ml-5'>
        {/* 动态传值 */}
        <FormattedMessage id='home.item1' values={{ name: langType == '1' ? '何凯兵' : 'kevin' }} />
      </div>
      {/* <div onClick={goHome}>
        <FormattedMessage id='home.item2' />
      </div> */}
      <Link to={'/home'}>去home页</Link>
      {/* <Mouse render={(mouse)=>
        <Cat mouse={mouse}/>
      }>

      </Mouse> */}
    </div>
  );
}