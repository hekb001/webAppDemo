/*
 * @Author: kevin.he 
 * @Date: 2021-11-18 13:27:23 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-12-09 10:30:29
 * 加载左侧字段---图标
 */
import React from 'react';
import { ClockCircleOutlined,CalendarOutlined,CheckOutlined,CheckSquareOutlined,CheckCircleOutlined,FormOutlined,FieldBinaryOutlined,DownSquareOutlined,
    EditOutlined,CloudUploadOutlined,BorderOutlined,TableOutlined,UserAddOutlined,ApartmentOutlined,BranchesOutlined,InstagramOutlined,RightSquareOutlined} from '@ant-design/icons';
export default ({type})=>{
    switch (type){
        case 'text': //纯文本框
            return <EditOutlined/>
        case 'input'://input输入框、单行、多行
            return <FormOutlined/>
        case 'InputNumber'://计数器
            return <FieldBinaryOutlined/>
        case 'radioGroup'://单选框组
            return <CheckCircleOutlined/>
        case 'checkbox'://复选框
            return <CheckOutlined/>
        case 'checkboxGroup'://复选框组
            return <CheckSquareOutlined/>
        case 'select'://下拉框
            return <DownSquareOutlined/>
        case 'datePicker'://日期选择器
            return  <CalendarOutlined/>
        case 'timePicker'://时间选择器
            return  <ClockCircleOutlined/>
        case 'Upload'://时间选择器
            return  <CloudUploadOutlined/>
        case 'area'://时间选择器
            return  <BorderOutlined/>
        case 'cascader'://省市级联动
            return  <RightSquareOutlined/>
        case 'group'://设计子表
            return  <TableOutlined/>
        case 'user'://用户组件
            return  <UserAddOutlined/>
        case 'department'://部门组件
            return  <ApartmentOutlined/>
        case 'dictionary'://表字典
            return  <InstagramOutlined/>
        case 'tree'://下拉树
            return  <BranchesOutlined/>
    }
}
