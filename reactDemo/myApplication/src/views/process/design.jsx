import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import JCard from "components/JCard";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
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
import { getProcessesDetail, updateProcesses } from "actions/processDesign";
import { Columns } from "./col";
import { PaginationExtraProps, purePrint, getLangWordText } from "utils";
import { PlusOutlined } from "@ant-design/icons";
import ProcessDesign from "../processDesign";

const Design = (props) => {
  const history = useHistory();
  const loading = useSelector((state) => state.processDesign.pending) || false;
  const processDetail =
    useSelector((state) => state.processDesign.processDetail) || [];

  const params = props.match.params;

  const dispatch = useDispatch();

  const getDesignById = () => {
    getProcessesDetail({ id: params.id })(dispatch);
  };
  useEffect(() => {
    changeSideBar(props)(dispatch);
    getDesignById();
  }, []);

  const saveProcessData = (xml) => {
    let value = {
      id: params.id,
      name: processDetail.name,
      description: processDetail.description,
      bpmn: xml,
    };
    updateProcesses(value, (res) => {
      if (res) {
        message.success("操作成功！");
        history.push("/processes");
      }
    })(dispatch);
  };
  
  return (
    <div>
      {processDetail && processDetail.bpmn ? (
        <ProcessDesign
          xml={processDetail && processDetail.bpmn}
          loading={loading}
          saveProcessData={saveProcessData}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spin tip="Loading..."></Spin>
        </div>
      )}
    </div>
  );
};

export default Design;
