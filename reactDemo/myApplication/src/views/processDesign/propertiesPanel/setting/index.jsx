import React, { useState, useEffect } from "react";
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

const Setting = (props) => {
  const { form } = props;
  const { getFieldValue, setFieldsValue } = form;
  const [type, setType] = useState("nomarl");


  const bpmnElement = window?.bpmnInstances?.bpmnElement;
  const bpmnElementSource = bpmnElement && bpmnElement.source;
  const bpmnElementSourceRef =
    bpmnElement && bpmnElement.businessObject.sourceRef;

  let attrs = bpmnElement?.businessObject.$attrs;
  let elementBaseInfo =
    bpmnElement && JSON.parse(JSON.stringify(bpmnElement.businessObject));
  elementBaseInfo = { ...elementBaseInfo, ...attrs };

  let config = elementBaseInfo && elementBaseInfo["pm:config"];
  config = config && JSON.parse(config);

  useEffect(() => {
    resetFlowCondition();
  }, []);

  const resetFlowCondition = () => {
    var type = elementBaseInfo && elementBaseInfo["type"];
    setType(type);

    setFieldsValue({
      type: elementBaseInfo?.type || "nomarl",
      body: elementBaseInfo?.conditionExpression?.body,
      variable: config?.update_data?.variable,
      expression: config?.update_data?.expression,
    });
  };

  //流转类型
  const handleChangeType = (flowType, key) => {
    window.bpmnInstances.modeling.updateProperties(bpmnElement, {
      [key]: flowType,
    });
    setType(flowType);

    // 正常条件类
    if (flowType == "condition") {
      let flowConditionRef = window.bpmnInstances.moddle.create(
        "bpmn:FormalExpression"
      );
      window.bpmnInstances.modeling.updateProperties(bpmnElement, {
        conditionExpression: flowConditionRef,
      });
      return;
    }
    // 默认路径
    // if (flowType == "default") {
    //   window.bpmnInstances.modeling.updateProperties(bpmnElement, {
    //     conditionExpression: null,
    //     "pm:config": null,
    //   });
    //   window.bpmnInstances.modeling.updateProperties(bpmnElementSource, {
    //     default: bpmnElement,
    //   });
    //   clearInputValue();
    //   return;
    // }

    // 正常路径，如果来源节点的默认路径是当前连线时，清除父元素的默认路径配置
    if (
      bpmnElementSourceRef.default &&
      bpmnElementSourceRef.default.id === bpmnElement.id
    ) {
      window.bpmnInstances.modeling.updateProperties(bpmnElementSource, {
        default: null,
      });
    }
    window.bpmnInstances.modeling.updateProperties(bpmnElement, {
      conditionExpression: null,
      "pm:config": null,
    });
    clearInputValue();
  };

  //修改表达式
  const updateFlowCondition = (value) => {
    let condition;
    condition = window.bpmnInstances.moddle.create("bpmn:FormalExpression", {
      body: value,
    });

    window.bpmnInstances.modeling.updateProperties(bpmnElement, {
      conditionExpression: condition,
    });
  };

  //更新流程变量
  const handleAttrChange = (key, value) => {
    let atteObj = {};
    let new_config;
    let update_data = config && config["update_data"];
    console.log("config: ", config);

    update_data = Object.assign({}, update_data, { [key]: value });
    new_config = { update_data };
    new_config = JSON.stringify(new_config);
    key = "pm:config";
    atteObj[key] = new_config;

    window.bpmnInstances.modeling.updateProperties(bpmnElement, atteObj);
  };

  const clearInputValue = () => {
    setFieldsValue({
      variable: "",
      expression: "",
      config: null,
      body: "",
    });
  };

  return (
    <div>
      <Form.Item
        label="流转类型"
        name="type"
        rules={[{ required: true, message: "必填项!" }]}
      >
        <Select
          style={{ width: " 100%" }}
          onChange={(value) => handleChangeType(value, "type")}
        >
          <Option value="nomarl">普通流转路径</Option>
          <Option value="condition">条件流转路径</Option>
        </Select>
      </Form.Item>

      {type == "condition" ? (
        <div>
          <Form.Item
            label="表达式"
            name="body"
            // rules={[{ required: true, message: "必填项!" }]}
            extra="输入一个表达式用来描述条件流程"
          >
            <Input onBlur={(e) => updateFlowCondition(e.target.value)} />
          </Form.Item>

          <div>
            <hr />
            <h3>流程变量</h3>
            <p className="tip-text">
              如果表达式适用，则可以创建或者修改这个流程的变量
            </p>
            <Form.Item
              label="变量名称"
              name="variable"
              // rules={[{ required: true, message: "必填项!" }]}
            >
              <Input
                onBlur={(e) => handleAttrChange("variable", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="变量值"
              name="expression"
              // rules={[{ required: true, message: "必填项!" }]}
            >
              <Input
                onBlur={(e) => handleAttrChange("expression", e.target.value)}
              />
            </Form.Item>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Setting;
