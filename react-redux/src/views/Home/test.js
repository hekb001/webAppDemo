import React, { Component, useState, useEffect, useContext } from 'react';
import { Ctx, CtxStore } from 'store/context';
import { Button} from 'antd'
const useStore = () => {
    return useContext(CtxStore)
}
const useGloabal = () => {
    return useContext(Ctx)
}
export default () => {
    const { name } = useStore();
    const { setState } = useGloabal();
    console.log(name,'name')
    console.log(setState,'setState')
    const modifyState=()=>{
        setState({name:'xxxyyy'})
    }
    return <div>
        <Button onClick={modifyState}>修改state</Button>
    </div>
}