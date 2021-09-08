import React, { Component, useState, useEffect } from 'react';
import { Upload, Icon, Button, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Parent from 'components/Parent';
import ParentObj from 'components/ParentObj';
import { changeSideBar } from 'action/app';
export default function CompanyInfo(props) {
  const asyncPayload = useSelector(state => state.home.asyncPayload) || [];
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    changeSideBar(props)(dispatch)
  });
  console.log(asyncPayload, 'asyncPayload...');
  const styleInfo = {
    gutter: [16, 16],
    span: 6
  }
  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList)
  }
  const beforeUpload = (file) => {
    setFileList([...fileList, file])
    return false;
  }
  //点击上传
  const handleUpload = () => {
    const formData = new FormData();
    if (fileList.length) {
      fileList.forEach((file, index) => {
        formData.append('files[]', file);
      });
    }
    console.log('%c' + fileList, 'color:red');
    setUploading(true);
    let xhr = new XMLHttpRequest();
    xhr.open("post", 'http://localhost:8081/api/companyInfo', true);
    xhr.setRequestHeader("processData", "false");
    //上传进度事件
    xhr.upload.addEventListener("progress", function (result) {
      if (result.lengthComputable) {
        //上传进度
        let percent = (result.loaded / result.total * 100).toFixed(2);
      }
    }, false);
    xhr.addEventListener("readystatechange", function () {
      var result = xhr;
      if (result.status != 200) { //error
        console.log('上传失败', result.status, result.statusText, result.response);
      }
      else if (result.readyState == 4) { //finished
        console.log('上传成功', result);
        setUploading(false);
      }
    });
    xhr.send(formData);
  }
  return (
    <div className='ml-5'>
      <Upload
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        fileList={fileList}
      >
        <Button>  Select File </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      <Parent>
        {props.children}
      </Parent>
      <div>
        <ParentObj {...styleInfo}>
          <span>hello</span>
          <span>world</span>
        </ParentObj>
      </div>
    </div>
  );
}
