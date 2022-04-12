import React from "react";
import { FormattedMessage } from "react-intl";
export const Columns = [
  {
    title: "流程名称",
    dataIndex: "name",
  },
  {
    title: "流程编码",
    dataIndex: "code",
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
    title: "创建时间",
    dataIndex: "created_at",
  },
];
