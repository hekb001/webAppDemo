import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import JCard from "components/JCard";
import { FormattedMessage } from "react-intl";
import {
  Table,
  Modal,
  Spin,
  Button,
  Input,
  message,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
import { changeSideBar } from "actions/app";
import {
  getProcessList,
  deletaProcesses,
  releaseProcesses,
  copyProcesses,
  clearProcessDetails
} from "actions/processDesign";
import { Columns } from "./col";
import { PaginationExtraProps, purePrint, getLangWordText } from "utils";
import { PlusOutlined } from "@ant-design/icons";
import CreateP from "./add";

let searchObj = {
  filter: "",
  page: 1,
  per_page: 10,
  status: "",
};

const Process = (props) => {
  const loading = useSelector((state) => state.processDesign.pending) || false;
  const processList =
    useSelector((state) => state.processDesign.processList) || [];

  const [visible, setVisible] = useState(false);
  const [detailsData, setDetailsData] = useState();
  const [pagination, setPagination] = useState(
    Object.assign({}, PaginationExtraProps, {
      page: 1,
      total: 0,
      per_page: 10,
    })
  );
  const dispatch = useDispatch();

  const refreshList = () => {
    console.log("searchObj: ", searchObj);
    getProcessList(searchObj, (res, err = false) => {
      if (!err) {
        setPagination(
          Object.assign({}, pagination, {
            total: res.meta.total,
          })
        );
      }
    })(dispatch);
  };
  useEffect(() => {
    changeSideBar(props)(dispatch);
    //清空详情数据（主要是bpmn有缓存）
    clearProcessDetails()(dispatch);
    refreshList();
  }, []);

  // 表格分页
  const handleChangePage = (pagination, filters, sorter) => {
    console.log("pagination, filters, sorter: ", pagination, filters, sorter);
    const newPagination = Object.assign({}, pagination);
    searchObj.page = pagination.current;
    searchObj.per_page = pagination.per_page;
    searchObj.status =
      filters && filters.is_released && filters.is_released.join(",");
    setPagination(newPagination);
    refreshList();
  };

  const columns = Columns.concat({
    title: <FormattedMessage id="common.operation" defaultMessage="操作" />,
    width: 300,
    key: "operation",
    render: (value, record) => (
      <div>
        <a style={{ paddingRight: 10 }} onClick={() => openModal(record)}>
          编辑
        </a>
        <a style={{ paddingRight: 10 }} href={"/process-macker/" + record.id}>
          设计
        </a>
        {record.is_released == "0" ? (
          <a style={{ paddingRight: 10 }} onClick={() => onRelease(record)}>
            发布
          </a>
        ) : (
          ""
        )}

        <a style={{ paddingRight: 10 }} onClick={() => onCopy(record)}>
          复制
        </a>

        <Popconfirm
          placement="top"
          title="确认删除"
          onConfirm={() => onDelete(record)}
        >
          <a
            href="javascript:void(0)"
            style={{ paddingRight: 10 }}
            style={{ color: "red" }}
          >
            删除
          </a>
        </Popconfirm>
      </div>
    ),
  });

  const onRelease = (data) => {
    releaseProcesses({ id: data.id }, (res) => {
      if (res) {
        message.info("操作成功！");
        searchObj.page = 1;
        refreshList();
      }
    })(dispatch);
  };

  const onCopy = (data) => {
    copyProcesses({ id: data.id }, (res) => {
      if (res) {
        message.info("操作成功！");
        searchObj.page = 1;
        refreshList();
      }
    })(dispatch);
  };

  const onDelete = (data) => {
    deletaProcesses({ id: data.id }, (res) => {
      if (res) {
        message.info("操作成功！");
        searchObj.page = 1;
        refreshList();
      }
    })(dispatch);
  };
  const openModal = (record) => {
    setDetailsData(record);
    setVisible(true);
  };

  const closeModal = (i) => {
    if (i == 1) {
      refreshList();
    }
    setVisible(false);
  };

  return (
    <JCard>
      <div style={{ paddingBottom: 10 }}>
        <Button type="primary" onClick={openModal}>
          新建流程
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={processList}
        loading={loading}
        pagination={pagination}
        onChange={handleChangePage}
      />
      {visible && (
        <CreateP
          visible={visible}
          closeModal={closeModal}
          detailsData={detailsData}
        />
      )}
    </JCard>
  );
};

export default Process;
