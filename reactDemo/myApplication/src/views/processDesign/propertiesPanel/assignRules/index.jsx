import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Select,
  Button,
  Collapse,
  Checkbox,
  Switch,
  InputNumber,
} from "antd";
import { DeepGet } from "utils";
import { getUsersList } from "actions/processDesign";

const { TextArea } = Input;
const { Option } = Select;

const AssignRules = (props) => {
  const { form, id } = props;
  const { getFieldValue, setFieldsValue } = form;
  const bpmnElement = window?.bpmnInstances?.bpmnElement;
  const [elementBaseInfo, setElementBaseInfo] = useState();
  const [assignedUsers, setAssignedUsers] = useState();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.processDesign.usersList) || [];

  useEffect(() => {
    let attrs = bpmnElement?.businessObject.$attrs;
    let elementBaseInfo =
      bpmnElement && JSON.parse(JSON.stringify(bpmnElement.businessObject));
    elementBaseInfo = { ...elementBaseInfo, ...attrs };
    setElementBaseInfo(elementBaseInfo);

    let assignedUsers =
      elementBaseInfo["pm:assignment"] == "user_group"
        ? elementBaseInfo["pm:assignedUsers"].split(",")
        : elementBaseInfo["pm:assignment"] == "user_by_id"
        ? elementBaseInfo["pm:assignedUsers"] &&
          elementBaseInfo["pm:assignedUsers"].substring(
            elementBaseInfo["pm:assignedUsers"].indexOf("{{") + 2,
            elementBaseInfo["pm:assignedUsers"].indexOf("}}")
          )
        : "";
    setAssignedUsers(assignedUsers);

    setFieldsValue({
      "pm:assignment": elementBaseInfo["pm:assignment"],
      "pm:assignedUsers": assignedUsers,
      "pm:assignmentLock": elementBaseInfo["pm:assignmentLock"],
      "pm:allowReassignment": elementBaseInfo["pm:allowReassignment"],
      "pm:config":
        elementBaseInfo["pm:config"] &&
        JSON.parse(elementBaseInfo["pm:config"]).escalateToManager,
    });
    console.log("AssignRules info: ", elementBaseInfo);

    //获取用户数据
    getUsersList({ page: 1, per_page: 99999 })(dispatch);
  }, []);

  const handleAttrChange = (key, value, label) => {
    const attrObj = Object.create(null);

    if (key == "pm:assignment") {
      if (assignedUsers) {
        if (value == elementBaseInfo["pm:assignment"]) {
          setFieldsValue({ "pm:assignedUsers": assignedUsers });
        } else {
          setFieldsValue({ "pm:assignedUsers": [] });
        }
      } else {
        setFieldsValue({ "pm:assignedUsers": [] });
        attrObj["pm:assignedUsers"] = null;
      }
    }

    if (label && label == "user_by_id") {
      value = "{{" + value + "}}";
    }
    if (label && label == "user_group" && value) {
      value = value.join(",");
    }

    if (key == "pm:config") {
      value = JSON.stringify({ escalateToManager: value });
    }

    attrObj[key] = value;
    //更新属性
    window.bpmnInstances.modeling.updateProperties(bpmnElement, attrObj);
  };

  return (
    <div>
      <Form.Item
        label="指派类型"
        name="pm:assignment"
        rules={[{ required: true, message: "必填项!" }]}
      >
        <Select
          style={{ width: " 100%" }}
          onChange={(value) => handleAttrChange("pm:assignment", value)}
        >
          <Option value="requester">发起者</Option>
          <Option value="user_group">用户</Option>
          <Option value="previous_task_assignee">上一个被分配的人</Option>
          <Option value="user_by_id">指定用户ID</Option>
        </Select>
      </Form.Item>

      {form.getFieldValue("pm:assignment") == "user_by_id" ? (
        <Form.Item name="pm:assignedUsers" label="用户ID">
          <Input
            onBlur={(e) =>
              handleAttrChange("pm:assignedUsers", e.target.value, "user_by_id")
            }
          />
        </Form.Item>
      ) : (
        ""
      )}

      {form.getFieldValue("pm:assignment") == "user_group" ? (
        <Form.Item name="pm:assignedUsers" label="用户">
          <Select
            style={{ width: " 100%" }}
            mode="multiple"
            allowClear
            placeholder="请选择"
            onChange={(value) =>
              handleAttrChange("pm:assignedUsers", value, "user_group")
            }
          >
            {userList.length > 0
              ? userList.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.fullname}
                    </Option>
                  );
                })
              : ""}
          </Select>
        </Form.Item>
      ) : (
        ""
      )}

      <Form.Item
        valuePropName="checked"
        name="pm:assignmentLock"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        label="是否锁定分配给用户"
      >
        <Switch
          onChange={(value) => handleAttrChange("pm:assignmentLock", value)}
        />
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name="pm:allowReassignment"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        label="是否允许再分配"
      >
        <Switch
          onChange={(value) => handleAttrChange("pm:allowReassignment", value)}
        />
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name="pm:config"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        label="是否提升到管理者"
      >
        <Switch onChange={(value) => handleAttrChange("pm:config", value)} />
      </Form.Item>
    </div>
  );
};

export default AssignRules;
