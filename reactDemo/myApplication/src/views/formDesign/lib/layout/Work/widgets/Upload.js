/**
 * Date: 2019-06-07 23:49:16
 * Author: kevin.he
 * Desc: 表单设计器 -> 表单组件->下拉框
 */
import React from 'react';
import { Upload, Button } from 'antd';
import config from 'config';

export default class SelectControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    }
  }
  handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };
  render() {
    const { uploadAdress } = this.props;
    const { fileList } = this.state;
    const _props = {
      action: uploadAdress,
      onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload
        {..._props}
        fileList={fileList}
      >
        <Button type='primary'>上传附件 </Button>
      </Upload>
    )
  }
}
