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

const Documents = (props) => {
  const { bpmnElement, id, form } = props;
  const { getFieldValue, setFieldsValue } = form;
  var businessObject = bpmnElement && bpmnElement.businessObject;
  const [documentation, setDocumentation] = useState("");

  useEffect(() => {
    if (id && id.length) {
      const documentations = businessObject && businessObject.documentation;
      setDocumentation(
        documentations && documentations.length ? documentations[0].text : ""
      );
      setFieldsValue({
        documentation:
          documentations && documentations.length ? documentations[0].text : "",
      });
    } else {
      setDocumentation("");
      setFieldsValue({ documentations: "" });
    }
  }, []);

  const handleAttrChange = (value) => {
    (bpmnElement && bpmnElement.id === id) ||
      (bpmnElement = window.bpmnInstances.elementRegistry.get(id));
    const Documentation = window.bpmnInstances.bpmnFactory.create(
      "bpmn:Documentation",
      { text: value }
    );
    window.bpmnInstances.modeling.updateProperties(bpmnElement, {
      documentation: [Documentation],
    });
  };
  return (
    <div>
      <Form.Item
        label="说明"
        name="documentation"
      >
        <TextArea rows={3} onChange={(e) => handleAttrChange(e.target.value)} />
      </Form.Item>
    </div>
  );
};

export default Documents;
