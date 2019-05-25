import React, { Component } from 'react'
import './TreeDataList.css';
class TreeDataList extends Component {
    static defaultProps = {
        data: 'props'
    }

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }
    componentWillMount() { 
        console.log('组件加载中');
        let dataList = [
            {
                name: "食物",
                children: [
                    { name: "大米" },
                    { name: "大米1" },
                    { name: "大米2" },
                    { name: "大米3"}
                ]
            },
            {
                name: "水果",
                children: [
                    { name: "苹果" },
                    { name: "香蕉" },
                    { name: "桃子" },
                    { name: "哈密瓜"}
                ]
            }
        ]
        this.setState({
            data:dataList
        })
    }
    foldOrOpenItem(item) { 
        item.fold = !item.fold;
        this.setState({})
    }
    componentDidMount() {
        
    }
    render() {
        let dataList  = this.state.data;
        return (<div className="content">
            {dataList && dataList.length > 0 &&
                dataList.map((item,index) => { 
                return (<ul key={index}>
                    <li>
                        <span>
                            <em className={item.fold ? 'fold' : 'open'} onClick={this.foldOrOpenItem.bind(this,item)}>点击菜单</em>
                            {item.name}
                        </span> 
                        {item.children && item.children.length > 0 &&
                            <ul className="item-children">
                                {
                                 item.children.map((item1,index1) => { 
                                    return (
                                        <li key={index1}>
                                            <span>{item1.name}</span>
                                        </li>)
                                    })
                                }
                            </ul>    
                           
                        }
                    </li>
                </ul>)
                })
            }
        </div>)
    }
}
export default TreeDataList