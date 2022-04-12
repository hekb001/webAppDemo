/*
 * @Author: kevin.he 
 * @Date: 2021-11-23 09:59:25 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-23 10:31:37
 * 保存
 */

import { FileDoneOutlined } from '@ant-design/icons';
import React from 'react';
const styleStr = 'inline cursor primary-color'
export default (props) => {
    const { onSave } = props;
    return (<div className={styleStr} onClick={onSave}>
        <FileDoneOutlined />保存
    </div>)
}