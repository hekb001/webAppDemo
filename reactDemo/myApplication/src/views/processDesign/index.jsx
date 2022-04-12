/* bpmn test  */

import React from "react";
import { notification, Modal, Spin } from "antd";
import BpmData from "./BpmData";
import BpmnModeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
import CustomContextPad from "./customContextPad";
import Highlight from "react-highlight";
import "highlight.js/styles/atom-one-dark.css";
// 翻译方法
import customTranslate from "./translate/customTranslate.js";
import translationsCN from "./translate/zh.js";

import PropertiesPanel from "./propertiesPanel";
import EditingTools from "./EditingTools";
import DefaultEmptyXML from "./defaultEmpty";
import "./index.less";
// BpmnModeler.prototype._modules = [].concat(BpmnModeler.prototype._modules, [
//   CustomContextPad,
// ]);

class ProcessDesign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpmnModeler: null,
      currentXml: null, //预览xml
      isVisible: false,
      scale: 1,
    };
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    let that = this;
    this.bpmnModeler = new BpmnModeler({
      container: "#canvas",
      height: "100vh",
      additionalModules: this.additionalModules(),
      //添加控制板
      propertiesPanel: {
        parent: ".properties-panel",
      },
    });
    const { xml } = this.props;

    this.addModelerListener();
    this.addEventBusListener();
    this.createNewDiagram(xml);
  }

  additionalModules() {
    const Modules = [];
    //自定义 ContextPad
    Modules.push(CustomContextPad);

    // 翻译模块
    const TranslateModule = {
      translate: ["value", customTranslate(translationsCN)],
    };
    Modules.push(TranslateModule);

    return Modules;
  }

  addModelerListener() {
    // 监听 modeler
    const bpmnjs = this.bpmnModeler;
    const that = this;
    // 'shape.removed', 'connect.end', 'connect.move'
    const events = ["shape.added", "shape.move.end", "shape.removed"];
    events.forEach(function (event) {
      that.bpmnModeler.on(event, (e) => {
        var elementRegistry = bpmnjs.get("elementRegistry");
        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
        // console.log(shape)
        if (event === "shape.added") {
          console.log("新增了shape");
        } else if (event === "shape.move.end") {
          console.log("移动了shape");
        } else if (event === "shape.removed") {
          console.log("删除了shape");
        }
      });
    });
  }

  addEventBusListener() {
    // 监听 element
    let that = this;
    const eventBus = this.bpmnModeler.get("eventBus");
    const eventTypes = ["element.click", "element.changed"];
    eventTypes.forEach(function (eventType) {
      eventBus.on(eventType, function (e) {
        if (!e || e.element.type == "bpmn:Process") return;
        if (eventType === "element.changed") {
          that.elementChanged(eventType, e);
        } else if (eventType === "element.click") {
          console.log("点击了element");
        }
      });
    });
  }

  elementChanged(eventType, e) {
    var shape = this.getShape(e.element.id);
    if (!shape) {
      // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
      console.log("无效的shape");
      // 由于上面已经用 shape.removed 检测了shape的删除, 因此这里只判断是否是线
      if (shape && this.isSequenceFlow(shape.type)) {
        console.log("删除了线");
      }
    }
    if (shape && !this.isInvalid(shape.type)) {
      if (this.isSequenceFlow(shape.type)) {
        console.log("改变了线");
      }
    }
  }

  getShape(id) {
    var elementRegistry = this.bpmnModeler.get("elementRegistry");
    return elementRegistry.get(id);
  }
  isInvalid(param) {
    // 判断是否是无效的值
    return param === null || param === undefined || param === "";
  }
  isSequenceFlow(type) {
    // 判断是否是线
    return type === "bpmn:SequenceFlow";
  }

  // 调整左侧工具栏排版
  adjustPalette() {
    try {
      // 获取 bpmn 设计器实例
      const canvas = this.containerRef.current;
      const djsPalette = canvas.children[0].children[1].children[4];
      const djsPalStyle = {
        width: "130px",
        padding: "5px",
        background: "white",
        left: "20px",
        borderRadius: 0,
      };
      for (var key in djsPalStyle) {
        djsPalette.style[key] = djsPalStyle[key];
      }
      const palette = djsPalette.children[0];
      const allGroups = palette.children;
      allGroups[0].style["display"] = "none"; //隐藏'tools'

      // 修改控件样式
      for (var gKey in allGroups) {
        const group = allGroups[gKey];
        for (var cKey in group.children) {
          const control = group.children[cKey];
          const controlStyle = {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            padding: "5px",
          };
          if (
            control.className &&
            control.dataset &&
            control.className.indexOf("entry") !== -1
          ) {
            const controlProps = new BpmData().getControl(
              control.dataset.action
            );
            control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;' title=${controlProps["title"]}>${controlProps["title"]}</div>`;
            for (var csKey in controlStyle) {
              control.style[csKey] = controlStyle[csKey];
            }
          }
        }
      }
      allGroups[1].children[1].style["display"] = "none"; //隐藏'中间'
      allGroups[3].children[1].style["display"] = "none"; //隐藏'子流程'
      allGroups[7].style["display"] = "none"; //隐藏'分组'
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.bpmnModeler.destroy();
  }

  // 导入 xml 文件
  handleOpenFile = (e) => {
    const that = this;
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      let data = "";
      reader.readAsText(file);
      reader.onload = function (event) {
        data = event.target.result;
        that.createNewDiagram(data);
      };
    }
  };

  // 前进
  handleRedo = () => {
    this.bpmnModeler.get("commandStack").redo();
  };

  // 后退
  handleUndo = () => {
    this.bpmnModeler.get("commandStack").undo();
  };

  // 下载 SVG 格式
  handleDownloadSvg = () => {
    this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
      this.download("svg", data);
    });
  };

  // 下载 XML 格式
  handleDownloadXml = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, data) => {
      this.download("xml", data);
    });
  };

  /**
   * 下载xml/svg
   *  @param  type  类型  svg / xml
   *  @param  data  数据
   *  @param  name  文件名称
   */
  download = (type, data, name) => {
    let dataTrack = "";
    const a = document.createElement("a");

    switch (type) {
      case "xml":
        dataTrack = "bpmn";
        break;
      case "svg":
        dataTrack = "svg";
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;

    a.setAttribute(
      "href",
      `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
    );
    a.setAttribute("target", "_blank");
    a.setAttribute("dataTrack", `diagram:download-${dataTrack}`);
    a.setAttribute("download", name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 流程图放大缩小
  handleZoom = (radio) => {
    console.log("radio---------: ", radio);
    const newScale = !radio
      ? 1.0 // 不输入radio则还原
      : this.state.scale + radio <= 0.2 // 最小缩小倍数
      ? 0.2
      : this.state.scale + radio;

    this.bpmnModeler.get("canvas").zoom(newScale);
    this.setState({
      scale: newScale,
    });
  };

  // 预览XML
  async handlePreviewXml() {
    let that = this;
    try {
      let { err, xml } = await this.bpmnModeler.saveXML({ format: true });
      that.setState({ isVisible: true, currentXml: xml });
      console.log(err);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
  }

  //提交
  handleSave = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      this.props.saveProcessData(xml);
    });
  };

  /* 创建新的流程图 */
  async createNewDiagram(xml) {
    // 将字符串转换成图显示出来
    let that = this;
    let newId = this.processId || `Process_${new Date().getTime()}`;
    let newName = this.processName || `业务流程_${new Date().getTime()}`;
    let xmlString = xml || DefaultEmptyXML(newId, newName);
    try {
      let { warnings } = await this.bpmnModeler.importXML(xmlString);
      if (warnings && warnings.length) {
        warnings.forEach((warn) => console.warn("警告:", warn));
      }
      that.adjustPalette();
      that.setState({ bpmnModeler: that.bpmnModeler });
    } catch (e) {
      console.error(`[Process Designer Warn]: ${e.message || e}`);
    }
  }

  render() {
    const { bpmnModeler } = this.state;
    const { loading } = this.props;
    return (
      <div className="bpmn-containers">
        <Spin spinning={loading}>
          {/* bpmn容器 */}
          <div id="canvas" ref={this.containerRef} className="container"></div>
          {/* 属性栏 */}
          {bpmnModeler && <PropertiesPanel modeler={bpmnModeler} />}
          {/* 工具栏 */}
          <EditingTools
            onOpenFIle={this.handleOpenFile}
            onSave={this.handleSave}
            onUndo={this.handleUndo}
            onRedo={this.handleRedo}
            onDownloadSvg={this.handleDownloadSvg}
            onDownloadXml={this.handleDownloadXml}
            onZoomIn={() => this.handleZoom(0.1)}
            onZoomOut={() => this.handleZoom(-0.1)}
            onZoomReset={() => this.handleZoom()}
            // onPreview={this.handlePreview}
            onPreviewXml={() => this.handlePreviewXml()}
          />

          {/* 预览xml  */}
          <Modal
            title="预览"
            width={1000}
            visible={this.state.isVisible}
            footer={null}
            onCancel={() => this.setState({ isVisible: false })}
          >
            <Highlight>{this.state.currentXml}</Highlight>
          </Modal>
        </Spin>
      </div>
    );
  }
}

export default ProcessDesign;
