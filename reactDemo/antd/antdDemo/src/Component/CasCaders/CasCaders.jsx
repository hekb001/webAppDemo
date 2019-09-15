import React, { Component } from 'react';
import { Cascader } from 'antd';
const options = [
    {
        value: "湖北省",
        label: "湖北省",
        children: [
            {
                value: "鄂州市",
                label: "鄂州市",
                children: [
                    {
                        value: "梁子湖区",
                        label: "梁子湖区",
                        children: [
                            {
                                value: "太和镇",
                                label: "太和镇",
                            },
                            {
                                value: "沼山镇",
                                label: "沼山镇",
                            }
                        ]
                    },
                    {
                        value: "鄂城区",
                        label: "鄂城区",
                    }
                ]
            },
            {
                value: "黄石市",
                label: "黄石市",
            }
        ]
    }
]

class CasCaders extends Component { 
    constructor(props){ 
        super(props)
        this.state = {

        }
    }
    componentWillMount() { 

    }
    render() { 
        
        return (<div className="cascaders">
            <Cascader 
                options={options}
                placeholder="Please select"
            />
        </div>)
    }
    
}
export default CasCaders