/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 15:11:31 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-19 15:50:59
 * 导航菜单
 */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import menuList from './menuList';
import _ from "lodash";
import "./index.less";
const { SubMenu } = Menu;

export default (props) => {
    useEffect(() => { }, []);
    const { currentOpenKeys } = props;
    return (
        <Menu theme="dark" mode="inline" openKeys={currentOpenKeys} selectedKeys={currentOpenKeys}>
            {
                menuList.map((item, index) => {
                    if (_.isEmpty(item.children)) {
                        return <Menu.Item key={item.key}>
                            <Link to={item.link}>{item.title}</Link>
                        </Menu.Item>
                    } else {
                        return <SubMenu key={item.key} title={item.title}>
                            {
                                item.children.map((item2, index) => {
                                    return <Menu.Item key={item2.key}>{item2.title}</Menu.Item>
                                })
                            }
                        </SubMenu>
                    }

                })
            }
        </Menu>
    );
};
