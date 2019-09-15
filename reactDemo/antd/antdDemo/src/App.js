import React, { Component}from 'react';
import {
  Button, Icon, Row, Col, Layout, Menu, Breadcrumb, Affix,
  Dropdown,Pagination,Steps,AutoComplete,Checkbox,BackTop
} from 'antd';
import {
  Link
} from 'react-router-dom'
import './App.css';
const { Header, Sider, Footer, Content } = Layout;
const { SubMenu } = Menu;
const { Step } = Steps;
const menuData = [{ name: 'list1' }, { name: 'list2' }, { name: 'list3' }, { name: 'list4' }];

class App extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      value: '',
      dataSource: [],
      checked: false,
      company: '明源云面试题',
      datePicker: 'antd日期组件',
      cascaders: "次级联动",
      forms: "表单应用",
      table: '表格',
      drawer:'抽屉'
    }
  }
  componentWillMount() { 
    console.log('组件将要加载')
  }
  componentDidMount() { 
    console.log('组件加载中')
  }
  change(e) { 
    this.setState({
      value:e
    })
  }
  search(searchText) { 
    this.setState({
     dataSource: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]
    })
  }
  showTotal() { 
  
  }
  getMenuArrs() {
    return (
      <Menu>        
        {menuData.map((item, index) => {
          return <Menu.Item key={index}>
            <a href="http://www.alipay.com/">{item.name}</a>
          </Menu.Item>
        })
      }
      </Menu>)
  }
 //勾选/取消勾选
  toggleCheck() { 
    this.setState({
      checked:!this.state.checked
    })
  }  
  //勾选，取消勾选
  changeCheck() { 
     this.setState({
      checked:!this.state.checked
    })
  }
  render() { 
      const rowStyle1 = {
        'color': 'blue',
        'textAlign': 'center'
      }
      const rowStyle2 = {
        'color': '#fff',
        'textAlign': 'center'
      }
      const rowStyle3 = {
        'color': 'black',
        'textAlign': 'center'
      }
      const { value ,dataSource,checked,company,datePicker,cascaders,forms,table,drawer} = this.state;
     return (
       <div className="App">
        <BackTop /> 
        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                </span>
                  }
                >
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: '#fff', padding: 24, minHeight: 880 }}>
                <Button type="danger" size="large" loading>危险</Button>
                <Button type="primary" size="large" >危险</Button>
                <Button size="small" >危险</Button>
                <Button type="default" size="large">危险</Button>
                <br />
                <Icon type="star" />
                <div>
                  <Row gutter={10}>
                    <Col span={8} style={rowStyle1}>
                      <div className="gutter-box">
                        1
                      </div>
                    </Col>
                    <Col span={8} style={rowStyle2}>
                      <div className="gutter-box">
                        1
                      </div>
                    </Col>
                    <Col span={8} style={rowStyle3}>
                      <div className="gutter-box">
                        1
                      </div>
                    </Col>
                  </Row>
                 </div>
                 <br/>  
                <Dropdown overlay={this.getMenuArrs.bind(this)} >
                  <a>鼠标点击我／放在上面试试</a>
                 </Dropdown>
                 <br/>  
                <Pagination
                  showSizeChanger  
                  showQuickJumper
                  defaultCurrent={1}
                  total={500}
                  showTotal={this.showTotal()}
                  page
                 />
                 <br/>  
                <div className="steps">
                  <Steps size="small" current={2}>
                    <Step title="start" discription="this is start" icon={<Icon type="user"/>}/>
                    <Step title="loving" discription="this is loving" icon={<Icon type="loading" />}/>
                    <Step title="end" discription="this is end" icon={<Icon type="solution" />}/>
                  </Steps>
                 </div>
                 <br/>  
                <div className="autoComplete">
                   <AutoComplete
                     value={value}  
                     style={{ width: 200 }}
                     onChange={this.change.bind(this)}
                     onSearch={this.search.bind(this)}
                     dataSource={dataSource}
                     placeholder='输入点什么吧' 
                  />
                 </div>
                <br/> 
                <div className="checkbox">
                   <Checkbox
                     checked={checked}
                     onChange={this.changeCheck.bind(this)}
                   />&nbsp;&nbsp;
                   <Button type="primary" onClick={this.toggleCheck.bind(this)}>
                     {checked?'uncheck':'check'}
                   </Button>
                </div> 
                <br/> 
                <div className="routerLink">
                   <Link to="/treeSelect">
                     <Button type="primary">
                       {company}
                     </Button>
                      &nbsp;&nbsp;
                   </Link>  
                   <Link to="/datapicker">
                     <Button type="Dashed">{datePicker}</Button>
                     &nbsp;&nbsp;    
                   </Link>
                   <Link to="/cascaders">
                       <Button type="primary">{cascaders}</Button>
                      &nbsp;&nbsp;                
                   </Link>
                   <Link to="/forms">
                       <Button type="primary">{forms}</Button>
                      &nbsp;&nbsp;                
                   </Link>
                   <Link to="/table">
                       <Button type="primary">{table}</Button>
                      &nbsp;&nbsp;                
                   </Link>
                    <Link to="/drawer">
                       <Button type="primary">{drawer}</Button>
                      &nbsp;&nbsp;                
                   </Link>
                </div> 
              </div>
             </Content>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
        <Affix offsetBottom={10}>
          <Button type="danger">
            bottom
          </Button>
         </Affix>
         
      </div>
    );
  }
}
export default App;