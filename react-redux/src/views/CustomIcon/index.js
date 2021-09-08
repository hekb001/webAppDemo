/*
 * @Author: kevin.he 
 * @Date: 2021-08-25 10:17:38 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-09-08 17:12:39
 */
import React, { Component, useState, useEffect } from 'react';
import { Divider, Skeleton, List, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { changeSideBar } from 'action/app';
import Svg from 'components/Icon/Svg';
let timer = null;
const data = [
    {
        title: '1.字体图标引用',
        description: () => <React.Fragment>
            <div>
                第一步：拷贝项目下面生成的font-face
            </div>
            <div>
                第二步：定义使用iconfont的样式
            </div>
            <div>
                第三步：挑选相应图标并获取字体编码，应用于页面
            </div>
            <i class="iconfont">&#x33;</i>
        </React.Fragment>
    },
    {
        title: '2.font-class引用',
        description: () => <React.Fragment>
            <div>
                第一步：拷贝项目下面生成的fontclass代码
            </div>
            <div>
                第二步：挑选相应图标并获取类名，应用于页面
            </div>
            <i class="iconfont icon-jiahao"></i>
        </React.Fragment>
    },
    {
        title: '3.symbol 引用',
        description: () => <React.Fragment>
            <div>
                第一步：拷贝项目下面生成的symbol代码：
            </div>
            <div>
                第二步：加入通用css代码（引入一次就行）：
            </div>
            <div>
                第三步：挑选相应图标并获取类名，应用于页面
            </div>
            <Svg svgName='menjinshezhi' style={{ width: 18, height: 18 }} />
        </React.Fragment>
    },
];
export default function CustomIcon(props) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        changeSideBar(props)(dispatch)
        timer = setTimeout(() => {
            if (timer) {
                window.clearTimeout(timer)
            }
            setLoading(false)
        }, 1000)
    })
    return <div>
        <Skeleton loading={loading} active avatar>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={item.title}
                            description={item.description()}
                        />
                    </List.Item>
                )}
            />
        </Skeleton>
    </div>
}