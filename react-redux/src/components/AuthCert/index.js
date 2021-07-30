/*
 * @Author: kevin.he 
 * @Date: 2021-07-29 19:33:11 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-07-30 10:40:07
 * 路由添加权限
 */

import React, { Component } from 'react';
 const NotFund = ()=>{
     return <div>您没有权限</div>
 }
 const permissionArr=['10','11','12','14'];
export  const UserAuthWrapper = (DecoratedComponent,value) => {
    if(permissionArr.indexOf(value)>=0){
        return DecoratedComponent;
    }else{
        return NotFund
    }
   
}
