/*
 * @Author: kevin.he 
 * @Date: 2022-04-28 15:54:32 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2022-04-28 17:09:04
 * 测试forward的使用
 */
import React, { useEffect, useRef, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import { changeSideBar } from 'action/app';
const InputEl = (props, ref) => {
    return <Input ref={ref} style={{ width: 100 }} />
}
const forward = (props) => {
    const dispatch = useDispatch();
    const ref = useRef();
    useEffect(() => {
        changeSideBar(props)(dispatch)
    })
    const getInputVal = () => {
        console.log(ref.current.state.value, '.....')
    }
    const setInputVal = () => {
        ref.current.focus();
    }
    const Inputfun = forwardRef(InputEl);
    return <div>
        <h2>forwardRef,用来传递ref属性（因为普通的父组件不能向子组件传递ref属性）</h2>
        <h2>useRef适用于hooks函数组件，createRef适用传统的class组件</h2>
        <h2>useRef与forwardRef搭配使用，createRef与React.forwardRef搭配使用</h2>
        <Button onClick={getInputVal}>获取input输入框的值</Button><br />
        <Button onClick={setInputVal}>焦点获取</Button><br />
        <Inputfun ref={ref} />
    </div>
}
export default forward;
