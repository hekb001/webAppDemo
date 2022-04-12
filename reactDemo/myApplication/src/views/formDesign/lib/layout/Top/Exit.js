/*
 * @Author: kevin.he 
 * @Date: 2021-11-23 09:47:52 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-23 14:00:55
 * 退出
 */
import { CloseOutlined} from '@ant-design/icons';
import React from 'react';
const styleStr = 'inline cursor red'
export default (props)=>{
    const { onExit } = props;
    return (<div className={styleStr} onClick={onExit}>
        <CloseOutlined />退出
        </div>)
}