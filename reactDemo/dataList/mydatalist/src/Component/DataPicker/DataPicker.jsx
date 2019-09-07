import React, { Component } from 'react';
import { Layout, Menu, Icon, DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class DataPicker extends Component { 
    constructor(props) { 
        super(props)
        this.state = {

        }
    }
    componentWillMount() { 
        console.log('加载日期组件')
    }
    componentDidMount() { 
         console.log('加载完成日期组件')
    }
    render() { 
        return (<div className="antdDatePicker">
            <Layout>
                <Header>
                    <Menu mode="horizontal" style={{lineHeight:'64px'}}  defaultSelectedKeys={['1']}>
                        <Menu.Item key={1}>日期组件1</Menu.Item>
                        <Menu.Item key={2}>日期组件2</Menu.Item>
                        <Menu.Item key={3}>日期组件3</Menu.Item> 
                    </Menu>
                </Header>
                <Layout>
                    <Sider>
                        <Menu  mode="inline">
                            <SubMenu key="sub1"
                                    style={{ height: '100%', borderRight: 0 }}    
                                    title={
                                        <span>
                                            <Icon type="user" />
                                                subnav 1
                                            </span>
                                        }>
                                <Menu.Item>
                                    option1
                                </Menu.Item>
                                <Menu.Item>
                                    option2
                                </Menu.Item>
                                <Menu.Item>
                                    option3
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                         <Menu  mode="inline">
                            <SubMenu key="sub1"
                                    style={{ height: '100%', borderRight: 0 }}    
                                    title={
                                        <span>
                                            <Icon type="user" />
                                                subnav 2
                                            </span>
                                        }>
                                <Menu.Item>
                                    option1
                                </Menu.Item>
                                <Menu.Item>
                                    option2
                                </Menu.Item>
                                <Menu.Item>
                                    option3
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ minHeight: '300px',padding:'5px'}}>
                        <div className="picker">
                            <MonthPicker></MonthPicker>
                            <RangePicker></RangePicker>
                            <WeekPicker></WeekPicker>
                        </div>
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        </div>)
    }
}
export default DataPicker