import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CopyrightOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import { _year } from "utils";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.less";
import SiderBar from './siderBar';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const App = (props) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const sideBarObj = useSelector((state) => state.app.sideBarObj);
  console.log(sideBarObj, 'sideBarObj.....')
  useEffect(() => { }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{ padding: "10px 0", textAlign: "center" }}
        >
          <img src="//mila-static.oss-cn-shenzhen.aliyuncs.com/saas/pic/que360_logo.png" />
        </div>
        <SiderBar {...sideBarObj} />
      </Sider>
      <Layout className="site-layout">
        <Header className="header" style={{ padding: 0 }}>
          <div className="header_right">
            <UserOutlined />&nbsp;&nbsp;
            Admin
          </div>
        </Header>
        <Content
          style={{
            minWidth: 988,
            minHeight: "100vh",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ minHeight: "100vh" }}>{children}</div>

          <Footer style={{ textAlign: "center" }}>
            版权所有
            <CopyrightOutlined /> 2016-{_year}
            深圳市前海欢雀科技有限公司粤ICP备15072594号-1
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
