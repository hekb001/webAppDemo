/*
 * @Author: kevin.he 
 * @Date: 2021-11-24 18:20:37 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-25 09:33:28
 * 部门组件 
 */
import React from 'react';
import { ApartmentOutlined } from '@ant-design/icons';
import { Dialog } from '@alifd/next'
export default class Department extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    onClick = () => {
        this.setState({ visible: true })
    }
    render() {
        const { value, onChange, ...other } = this.props;
        const { visible } = this.state;
        return (
            <div>
                <ApartmentOutlined className='text-l cursor primary-color' onClick={this.onClick} />
                <Dialog
                    title='部门组件'
                    visible={visible}
                    onOk={() => {
                        this.setState({
                            visible: false,
                        });
                        // this.props.onChange && this.props.onChange(this.parseStringToItems(this.state.itemsString))
                    }}
                    onClose={() => this.setState({ visible: false })}
                    onCancel={() => this.setState({ visible: false })}
                >
                    <div>111</div>
                </Dialog>
            </div>
        )
    }
}