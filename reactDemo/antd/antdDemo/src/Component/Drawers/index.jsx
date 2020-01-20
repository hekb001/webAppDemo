import React from 'react';
import { Button, Drawer, Radio ,notification,Popconfirm,message} from 'antd';
const RadioGroup = Radio.Group;

class Drawers extends React.Component { 
    constructor(props) { 
        super(props)
        this.state = {
            showDrawer: false,
            placement:'right'
        }
    }
    showDrawer = () => { 
        this.setState({
             showDrawer:true
        })
    }
    closeDrawer = () => { 
         this.setState({
             showDrawer:false
        })
    }
    radioChange = (e) => { 
        this.setState({
            placement:e.target.value
        })
    }
    showNotification = (type) => { 
        notification[type]({
            message: 'notification title',
            description:'this is the description of notification'
        })
    }
    render() { 
        const { showDrawer ,placement} = this.state;
        return (<div>
            <RadioGroup
                defaultValue={placement}
                onChange={this.radioChange}
            >
                <Radio value="top">top</Radio>
                <Radio value="left">left</Radio>
                <Radio value="right">right</Radio>
                <Radio value="bottom">bottom</Radio>

            </RadioGroup>
            <br />
             <br />
            <Button onClick={this.showDrawer}>
                open
            </Button>
            <br />
            <br />
            <Button type="primary" onClick={()=>this.showNotification('success')}>
                message notification
            </Button>
             <br />
             <br />
             <Popconfirm
                title="are you sure delete?"
                okText="ok"
                cancelText="cancel"
                onConfirm={confirm}
                onCancel={cancel}
            >
                <Button>delete</Button>
            </Popconfirm>
            <Drawer
                title="basic drawer"
                visible={showDrawer}
                placement={placement}
                onClose={this.closeDrawer}
            >
                <p>somethings</p>
                <p>somethings</p>
                <p>somethings</p>
            </Drawer>
        </div>)
    }
}
function cancel() {
    message.error('click no')
}
function confirm() { 
    message.success('click yes')
}
export default Drawers