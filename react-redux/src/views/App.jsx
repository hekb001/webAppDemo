import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Breadcrumb, Row, Col, Dropdown } from 'antd'
import { Link, browserHistory } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import '../assets/styles/index.less';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
export default function App(props) {
  const sideBarObj = useSelector(state => state.app.sideBarObj) || {};
  useEffect(() => {
    console.log(sideBarObj, 'sideBarObj......')
  });
  const { children } = props;
  const userMenu = (
    <Menu>
      <Menu.Item>切换语言</Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header className="header">
        <Row>
          <Col span={22}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} selectedKeys={[`${sideBarObj.currentKeyProps}`]}>
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
            <Dropdown overlay={userMenu}>
              <span style={{ marginLeft: 15, marginRight: 15 }}>
                更多
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 5px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>companyInfo</Breadcrumb.Item>
          <Breadcrumb.Item>progressbar</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout className="site-layout-background" >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280,display:'flex' }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}