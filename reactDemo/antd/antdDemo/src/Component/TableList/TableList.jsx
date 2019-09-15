import React, { Component } from 'react';
import { Spin, Table, Card, Tabs, Select ,Icon,Row,Col,Avatar,Tooltip,Tag,Input} from 'antd';
const { TabPane } = Tabs;
const { Meta } = Card;
const { Option } = Select;
const options = [];
const columns = [
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "密码",
        dataIndex: "password",
        key: "password"
    },
    {
        title: "邮箱",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "地址",
        dataIndex: "address",
        key: "address",
    }
];
const dataSource = [
    {
        key: '1',
        userName: '何凯兵1',
        password: "199110",
        email: '15018513561@163.com',
        address:'民乐翠园'
    },
    {
        key: '2',
        userName: 'liliwen',
        password: "073520",
        email: '15018513561@163.com',
        address:'民乐翠园'
    }

]
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => { 
            console.log(`selectedRows:${JSON.stringify(selectedRows)},selectedRowKeys:${selectedRowKeys}`)
    },
    getCheckboxProps: record => ({ 
        disabled: record.userName === "liliwen",
        userName:record.userName
    })
}
let timer;

class TableList extends Component { 
    constructor(props){ 
        super(props)
        this.state = {
            loading: true,
            tags: ['tag1','tag2ddwqeqweqweqw','tag3'],
            inputVisible: false,
            inputValue:''
        }
    }
    componentWillMount() { 
        this.getOptionsData()
    }
    getOptionsData() { 
        for (let i = 0; i < 10; i++) { 
            if (i < 9) { 
                options.push(<Option key={i.toString()}>{i}</Option>)
            }
        }
    }
    //删除标签
    closeTag(tag) { 

    }
    //添加标签
    showInput=()=> { 
        this.setState({inputVisible:true})
    }
    //失去焦点&键盘某个键位被按下释放
    handleInputConfirm = () => { 
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) { 
            tags = [...tags, inputValue];
        }
        this.setState({
            tags: tags,
            inputVisible: false,
            inputValue:''
        })
    }
    //输入框值发生改变时
    handleInputChange = (e) => { 
        console.log(e.target.value, 'e')
        this.setState({inputValue:e.target.value})
    }
    componentDidMount() { 
        timer = setTimeout(() => { 
            if (timer) { 
                window.clearTimeout(timer)
            }
            this.setState({
                loading:false
            })
        },1000)
    }
    render() { 
        const { loading ,tags,inputValue,inputVisible,cloumns,data} = this.state;
        return (<div className="table">
            <Spin spinning={loading}>
                 <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1">
                        <Row gutter={16}>
                            <Col span={8}>
                                 <Card
                                    title="select"
                                    extra={<Icon type="user"/>}
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '80%' }}
                                        placeHolder="please select"
                                        defaultValue={['1','2']}
                                    >
                                        {options}
                                    </Select>
                                </Card>    
                            </Col>
                            <Col span={8}>
                                <Card title="avatar">    
                                    <Meta    
                                        title="avatar"
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        description="this is description"
                                    />
                                </Card>    
                            </Col>
                            <Col span={8}>
                                 <Card
                                    title="Tag"
                                    extra={<Icon type="user"/>}
                                >
                                    {tags.map((tag,index) => { 
                                        const isTooLong = tag && tag.length > 6;
                                        const tagElem =
                                            (<Tag key={index}
                                                closable={index !== 0}
                                                onClose={this.closeTag.bind(this,tag)}
                                            >
                                                {isTooLong ? `${tag.slice(0, 6)}...` : tag}
                                            </Tag>);
                                        return isTooLong ?
                                            (<Tooltip key={index} title={tag}>
                                                {tagElem}
                                            </Tooltip>) :
                                            (tagElem)
                                        
                                    })}
                                    {inputVisible &&
                                        <Input
                                        type="text"
                                        size="small"
                                        style={{ width: '78px' }}
                                        onBlur={this.handleInputConfirm}
                                        onChange={this.handleInputChange}
                                        onPressEnter={this.handleInputConfirm}
                                        />
                                    }
                                    {!inputVisible &&
                                        <Tag onClick={this.showInput}>
                                             <Icon type="plus"/>new Tag
                                        </Tag>  
                                    }
                                </Card>    
                            </Col>
                        </Row>
                       
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        <Table columns={columns} dataSource={dataSource} rowSelection={rowSelection}/>
                    </TabPane> 
                    <TabPane tab="Tab 3" key="3">tab3</TabPane>  
                </Tabs>
           </Spin>     
        </div>)
    }
    
}
export default TableList