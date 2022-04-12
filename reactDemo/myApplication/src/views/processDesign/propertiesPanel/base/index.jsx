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

const { TextArea } = Input;
const { Option } = Select;

const Base = (props) => {
  const { form } = props;
  const { getFieldValue, setFieldsValue } = form;
  const [elementBaseInfo, setElementBaseInfo] = useState();
  const dispatch = useDispatch();
  const screensList =
    useSelector((state) => state.processDesign.screensList) || [];
  const screensListOnlyLook =
    useSelector((state) => state.processDesign.screensListOnlyLook) || [];

  const bpmnElement = window?.bpmnInstances?.bpmnElement;
  const elementType = window?.bpmnInstances?.elementType;
  console.log("elementType: ", elementType);

  const ALL = [
    "StartEvent", //开始节点
    "EndEvent", //结束节点
    "SequenceFlow", //流转线
    "ExclusiveGateway", //网关
    "Task", //任务
    "UserTask", //用户任务
    "DataStoreReference", //数据记载
    "DataObjectReference", //文件记载
    "DataOutputAssociation", //虚线
    "Association", //因果关系
    "TextAnnotation", //文本描述
    "Participant", //泳道
  ];
  const SCREENREF = ["Task", "UserTask"];
  const DUIIN = ["Task", "UserTask"];
  const ALLOWINTERSTIAL = ["StartEvent", "Task", "UserTask"];
  const SCREENREF_2 = ["EndEvent"];

  useEffect(() => {
    let attrs = bpmnElement?.businessObject.$attrs;
    let elementBaseInfo =
      bpmnElement && JSON.parse(JSON.stringify(bpmnElement.businessObject));
    elementBaseInfo = { ...elementBaseInfo, ...attrs };
    setElementBaseInfo(elementBaseInfo);
    setFieldsValue({
      id: elementBaseInfo?.id,
      name: elementBaseInfo?.name,
      "pm:screenRef": elementBaseInfo["pm:screenRef"] - 0 || undefined,
      "pm:dueIn": elementBaseInfo["pm:dueIn"],
      "pm:allowInterstitial": elementBaseInfo["pm:allowInterstitial"],
      "pm:interstitialScreenRef":
        elementBaseInfo["pm:interstitialScreenRef"] - 0 || undefined,
    });

    console.log("elementBaseInfo: ", elementBaseInfo);
  }, []);

  const handleAttrChange = (key, value) => {
    const attrObj = Object.create(null);

    attrObj[key] = value;
    //更新属性
    window.bpmnInstances.modeling.updateProperties(bpmnElement, attrObj);
  };

  return (
    <div>
      <Form.Item
        label="节点标识符"
        name="id"
        rules={[{ required: true, message: "必填项!" }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="节点名称"
        name="name"
        rules={[{ required: true, message: "必填项!" }]}
      >
        {/* <Input onBlur={handleInputChange} /> */}
        <Input onBlur={(e) => handleAttrChange("name", e.target.value)} />
      </Form.Item>

      {SCREENREF.indexOf(elementType) != -1 && (
        <Form.Item label="关联表单" name="pm:screenRef">
          <Select
            style={{ width: " 100%" }}
            allowClear
            placeholder="请选择"
            onChange={(value) => handleAttrChange("pm:screenRef", value)}
          >
            {screensList.length > 0
              ? screensList.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                    </Option>
                  );
                })
              : ""}
          </Select>
        </Form.Item>
      )}

      {SCREENREF_2.indexOf(elementType) != -1 && (
        <Form.Item label="表单摘要" name="pm:screenRef">
          <Select
            style={{ width: " 100%" }}
            allowClear
            placeholder="请选择"
            onChange={(value) => handleAttrChange("pm:screenRef", value)}
          >
            {screensListOnlyLook.length > 0
              ? screensListOnlyLook.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                    </Option>
                  );
                })
              : ""}
          </Select>
        </Form.Item>
      )}

      {DUIIN.indexOf(elementType) != -1 && (
        <Form.Item
          label="期限（小时）"
          name="pm:dueIn"
          // rules={[{ required: true, message: "必填项!" }]}
          extra="该任务完成的时间"
        >
          <InputNumber
            min={0}
            onChange={(e) => handleAttrChange("pm:dueIn", e)}
          />
          {/* <span className="ant-form-text">小时</span> */}
        </Form.Item>
      )}

      {ALLOWINTERSTIAL.indexOf(elementType) != -1 && (
        <Form.Item
          name="pm:allowInterstitial"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 16 }}
        >
          <Checkbox
            onChange={(e) =>
              handleAttrChange("pm:allowInterstitial", e.target.checked)
            }
          >
            将下一个分配的任务显示给任务分配者
          </Checkbox>
        </Form.Item>
      )}

      {getFieldValue("pm:allowInterstitial") ? (
        <Form.Item
          name="pm:interstitialScreenRef"
          label="查看表单"
          rules={[{ required: true, message: "必填项!" }]}
        >
          <Select
            style={{ width: " 100%" }}
            allowClear
            placeholder="请选择"
            onChange={(value) =>
              handleAttrChange("pm:interstitialScreenRef", value)
            }
          >
            {screensListOnlyLook.length > 0
              ? screensListOnlyLook.map((item, index) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                    </Option>
                  );
                })
              : ""}
          </Select>
        </Form.Item>
      ) : (
        ""
      )}
    </div>
  );
};

export default Base;
