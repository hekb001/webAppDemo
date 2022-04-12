/*
 * @Author: kevin.he
 * @Date: 2021-09-17 16:41:16
 * @Last Modified by: joan.yan
 * @Last Modified time: 2021-11-16 14:19:07
 * 属性面板
 */
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Collapse, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getScreensList, getScreensListOnlyLook } from "actions/processDesign";
import "./index.less";
import Base from "./base";
import Setting from "./setting";
import Documents from "./document";
import AssignRules from "./assignRules";

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const PropertiesPanel = (props) => {
  const { modeler } = props;
  const [bpmnElement, setBpmnElement] = useState(null);
  const [elementId, setElementId] = useState(null);
  const [elementType, setElementType] = useState(null);
  const [elementBusinessObject, setElementBusinessObject] = useState(null);
  const [conditionFormVisible, setConditionFormVisible] = useState(false);
  const [assignRulesVisible, setAssignRulesVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { getFieldValue } = form;

  let elementId_ = null;

  useEffect(() => {
    initData();
    handleModeler();
  }, []);

  const initData = () => {
    getScreensList({
      page: 1,
      per_page: 99999,
      type: "FORM",
      interactive: true,
      status: "active",
      selectList: true,
    })(dispatch);
    getScreensListOnlyLook({
      page: 1,
      per_page: 99999,
      type: "DISPLAY",
      interactive: false,
      status: "active",
      selectList: true,
    })(dispatch);
  };

  const handleModeler = () => {
    let timer;
    // 初始化 modeler 以及其他 moddle
    if (!modeler) {
      // 避免加载时 流程图 并未加载完成
      timer = setTimeout(() => handleModeler(), 10);
      return;
    }
    if (timer) clearTimeout(timer);

    window.bpmnInstances = {
      modeler: modeler,
      modeling: modeler.get("modeling"),
      moddle: modeler.get("moddle"),
      eventBus: modeler.get("eventBus"),
      bpmnFactory: modeler.get("bpmnFactory"),
      elementRegistry: modeler.get("elementRegistry"),
      replace: modeler.get("replace"),
      selection: modeler.get("selection"),
      bpmnElement: null,
    };

    getActiveElement();
  };

  const getActiveElement = () => {
    // 初始第一个选中元素 bpmn:Process
    initFormOnChanged(null);
    modeler.on("import.done", (e) => {
      initFormOnChanged(null);
    });
    // 监听选中的元素
    modeler.on("selection.changed", ({ newSelection }) => {
      initFormOnChanged(newSelection[0] || null);
    });
    //  监听发生改变的元素
    modeler.on("element.changed", ({ element }) => {
      // 保证 修改 "默认流转路径" 类似需要修改多个元素的事件发生的时候，更新表单的元素与原选中元素不一致。
      if (element && element.id === elementId_) {
        initFormOnChanged(element);
      }
    });
  };

  // 初始化数据
  const initFormOnChanged = (element) => {
    let activatedElement = element;
    if (!activatedElement) {
      activatedElement =
        window.bpmnInstances.elementRegistry.find(
          (el) => el.type === "bpmn:Process"
        ) ??
        window.bpmnInstances.elementRegistry.find(
          (el) => el.type === "bpmn:Collaboration"
        );
    }
    if (!activatedElement) return;
    console.log(`
                ----------
                select element changed:
                  id:  ${activatedElement.id}
                  name:  ${activatedElement.businessObject.name}
                  type:  ${activatedElement.businessObject.$type}
                ----------
                `);
    console.log("activatedElement: ", activatedElement);
    console.log("businessObject: ", activatedElement.businessObject);
    window.bpmnInstances.bpmnElement = activatedElement;
    window.bpmnInstances.elementType = activatedElement.type.split(":")[1];

    let type = activatedElement.type.split(":")[1] || "";
    setBpmnElement(activatedElement);
    setElementId(activatedElement.id);
    elementId_ = activatedElement.id;
    setElementType(type);
    setElementBusinessObject(
      JSON.parse(JSON.stringify(activatedElement.businessObject))
    );

    //是否可设置条件表达
    setConditionFormVisible(
      !!(
        type === "SequenceFlow" &&
        activatedElement.source &&
        activatedElement.source.type == "bpmn:ExclusiveGateway"
      )
    );
    //是否可设置指派规则
    const ASSIGNRULES = ["Task", "UserTask"];
    setAssignRulesVisible(ASSIGNRULES.indexOf(type) != -1);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="properties-panel">
      <Form
        name="basic"
        form={form}
        {...formItemLayout}
        key={elementId}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="基础" key="1">
            <Base form={form} />
          </Panel>

          {conditionFormVisible && (
            <Panel header="流转条件" key="2">
              <Setting form={form} />
            </Panel>
          )}

          <Panel header="文档记录" key="3">
            <Documents bpmnElement={bpmnElement} form={form} id={elementId} />
          </Panel>

          {assignRulesVisible && (
            <Panel header="指派规则" key="4">
              <AssignRules form={form} id={elementId} />
            </Panel>
          )}
        </Collapse>
      </Form>
    </div>
  );
};

export default PropertiesPanel;
