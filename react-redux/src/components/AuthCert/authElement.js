/*
 * @Author: kevin.he 
 * @Date: 2021-07-30 10:40:28 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-07-30 10:40:50
 * 元素添加权限
 */

import React, { useEffect } from 'react';
import { Button } from 'antd';
import { splitObj } from 'utils';
const permissonArr = ['11', '12'];
function isInAuthArr(auth, ComposedComponent) {
    if (permissonArr.indexOf(auth) >= 0) {
        return ComposedComponent
    } else {
        return null
    }
}
const AuthButton = (props) => {
    const [auth, otherObj] = splitObj(props, ['auth']);
    const Element = <Button {...otherObj}>
        {props.children}
    </Button>
    return isInAuthArr(props.auth, Element);
}
export { AuthButton }