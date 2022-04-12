import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import {
  Table,
  Modal,
  Spin,
  Button,
  Input,
  message,
  DatePicker,
  Form,
  Upload,
  TreeSelect,
  Radio,
  Checkbox,
} from "antd";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import { changeSideBar } from "actions/app";
import { saveProcesses, updateProcesses } from "actions/processDesign";
import {
  PaginationExtraProps,
  UserParams,
  DeepGet,
  getLangWordText,
} from "utils";

const FormItem = Form.Item;

const Add = (props) => {
  const { detailsData, visible } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const loading = useSelector((state) => state.processDesign.loading) || false;
  const processList =
    useSelector((state) => state.processDesign.processList) || [];

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleSumbit = (values) => {
    console.log("values: ", values);
    values.description = "1";
    // values.process_category_id = "2";

    if (detailsData && detailsData.id) {
      values.id = detailsData.id;
      updateProcesses(values, function (item) {
        if (item) {
          message.success("操作成功！");
          if (values.isChecked) {
            //去流程设计图
            history.push("/process-macker/" + item.id);
          } else {
            props.closeModal(1);
          }
        }
      })(dispatch);
    } else {
      saveProcesses(values, function (item) {
        if (item) {
          message.success("创建成功！");
          if (values.isChecked) {
            //去流程设计图
            history.push("/process-macker/" + item.id);
          } else {
            props.closeModal(1);
          }
        }
      })(dispatch);
    }
  };

  return (
    <Modal
      title={detailsData ? "编辑流程" : "新建流程"}
      visible={visible}
      width={600}
      centered
      footer={null}
      onCancel={props.closeModal}
    >
      <Spin spinning={loading}>
        <div className="event_handling">
          <Form
            form={form}
            {...formItemLayout}
            name="create"
            onFinish={handleSumbit}
            initialValues={{
              name: DeepGet(detailsData, ["name"]),
              code: DeepGet(detailsData, ["code"]),
              isChecked: true,
            }}
          >
            <FormItem
              label="流程名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: getLangWordText(
                    "common.FormItem.required",
                    "必填项"
                  ),
                },
              ]}
            >
              <Input />
            </FormItem>
            <FormItem
              label="流程编码"
              name="code"
              rules={[
                {
                  required: true,
                  message: getLangWordText(
                    "common.FormItem.required",
                    "必填项"
                  ),
                },
              ]}
            >
              <Input />
            </FormItem>

            <Form.Item
              name="isChecked"
              valuePropName="checked"
              wrapperCol={{ offset: 4, span: 16 }}
            >
              <Checkbox>添加后自动打开设计</Checkbox>
            </Form.Item>

            <div style={{ height: 15 }}></div>

            <FormItem
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button onClick={props.closeModal}>
                <FormattedMessage id="common.cancel" defaultMessage="取消" />
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="primary" htmlType="submit" loading={loading}>
                <FormattedMessage
                  id="common.submitBtnText"
                  defaultMessage="提交"
                />
              </Button>
            </FormItem>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
};

export default Add;
