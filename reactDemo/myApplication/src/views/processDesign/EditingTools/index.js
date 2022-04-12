import React, { Component } from "react";
import "./index.less";

class EditingTools extends Component {
  handleOpen = () => {
    this.file.click();
  };

  render() {
    const {
      onOpenFIle,
      onZoomIn,
      onZoomOut,
      onZoomReset,
      onUndo,
      onRedo,
      onSave,
      onDownloadXml,
      onDownloadSvg,
      onPreview,
      onPreviewXml,
    } = this.props;
    return (
      <div className="editingTools">
        <ul className="controlList">
          <li className="control line">
            <input
              ref={(file) => {
                this.file = file;
              }}
              className="openFile"
              type="file"
              onChange={onOpenFIle}
            />
            <button
              type="button"
              title="打开BPMN文件"
              onClick={this.handleOpen}
            >
              <i className="open" />
            </button>
          </li>

          <li className="control">
            <button type="button" title="撤销" onClick={onUndo}>
              <i className="undo" />
            </button>
          </li>
          <li className="control line">
            <button type="button" title="恢复" onClick={onRedo}>
              <i className="redo" />
            </button>
          </li>

          <li className="control">
            <button type="button" title="重置大小" onClick={onZoomReset}>
              <i className="zoom" />
            </button>
          </li>
          <li className="control">
            <button type="button" title="放大" onClick={onZoomIn}>
              <i className="zoomIn" />
            </button>
          </li>
          <li className="control line">
            <button type="button" title="缩小" onClick={onZoomOut}>
              <i className="zoomOut_2" />
            </button>
          </li>

          <li className="control">
            <button type="button" title="下载BPMN文件" onClick={onDownloadXml}>
              <i className="download" />
            </button>
          </li>
          <li className="control">
            <button type="button" title="下载流程图片" onClick={onDownloadSvg}>
              <i className="image" />
            </button>
          </li>
          <li className="control line">
            <button type="button" title="预览xml" onClick={onPreviewXml}>
              <i className="preview" />
            </button>
          </li>
          {/* <li className={styles.control}>
                        <button type="button" title="预览流程图片" onClick={onPreview}>
                            <i className={styles.preview} />
                        </button>
                    </li>
                    <li className={styles.control}>
                        <button type="button" title="查看流程xml" onClick={onPreviewXml}>
                            <i className={styles.preview} />
                        </button>
                    </li> */}

          <li className="control">
            <button type="button" title="保存流程" onClick={onSave}>
              <i className="save" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default EditingTools;
