/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 13:59:35 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-19 15:49:57
 * 可设置权限的antd主题元素
 */
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { splitObject } from 'utils';
import _ from 'lodash';
const permissonArr = ['x', 'x2'];
function isInAuthArr(auth, ComposedComponent) {
    if (permissonArr.indexOf(auth) >= 0 || _.isEmpty(auth)) {
        return ComposedComponent
    } else {
        return null
    }
}
const AuthButton = (props) => {
    const [auth, otherObj] = splitObject(props, ['auth']);
    const Element = <Button {...otherObj}>
        {props.children}
    </Button>
    return isInAuthArr(props.auth, Element);
}
const AuthText = (props) => {
    const [auth, otherObj] = splitObject(props, ['auth']);
    const Element = <div {...otherObj}>
        {props.children}
    </div>
    return isInAuthArr(props.auth, Element);
}
export { AuthButton, AuthText }
