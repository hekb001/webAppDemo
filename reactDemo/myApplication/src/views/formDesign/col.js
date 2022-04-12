/*
 * @Author: kevin.he 
 * @Date: 2021-11-19 13:38:22 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-19 15:51:04
 * 表单设计器-表格列
 */
import React from "react";
export const formColumns = [
    {
        title: '表单名称',
        dataIndex: "title",
    },
    {
        title: '表单描述',
        dataIndex: "description",
    },
    {
        title: "发布状态",
        dataIndex: "is_released",
        render(item) {
            if (item == "1") {
                return "已发布";
            } else {
                return "未发布";
            }
        },
        filters: [
            { text: "已发布", value: "1" },
            { text: "未发布", value: "0" },
        ],
    },
    {
        dataIndex: "created_at",
        title: '创建时间'
    }
]
