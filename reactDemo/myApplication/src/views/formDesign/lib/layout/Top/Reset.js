/*
 * @Author: kevin.he 
 * @Date: 2021-11-23 09:47:52 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-23 14:03:37
 * 重置
 */
import { ClearOutlined } from '@ant-design/icons';
import React from 'react';
const styleStr = 'inline cursor red'
export default (props)=>{
    const { onRest } = props;
    return (<div className={styleStr} onClick={onRest}>
        <ClearOutlined />重置
        </div>)
}