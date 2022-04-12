/*
 * @Author: kevin.he 
 * @Date: 2021-11-22 13:54:47 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-23 15:42:33
 * 表单设计-列表页-新增、编辑、复制、删除
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import JCard from "components/JCard";
import { AuthButton, AuthText } from 'components/AuthCert';
import { changeSideBar } from "actions/app";
import { getFormDesignList, saveFormDesign, delFormDesign } from "actions/formDesign";
import { getLangWordText, ServerNotification, PaginationExtraProps, DeepGet } from 'utils';
import { formColumns } from './col';
import _ from 'lodash';
let searchObj = {
  filter: "",
  page: 1,
  per_page: 10,
  status: "",
};
const classStr = 'mr-10 primary-color inline cursor';
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 12
  }
}
const FormDesignList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [visible, addForm] = useState(false);
  const [curItem, setItemData] = useState({});
  const list = useSelector((state) => state.formDesign.formDesignList);
  const loading = useSelector((state) => state.formDesign.pending);
  const [pagination, setPagination] = useState(
    Object.assign({}, PaginationExtraProps, {
      page: 1,
      total: 0,
      per_page: 10,
    })
  );
  useEffect(() => {
    changeSideBar(props)(dispatch);
    refreshList()
  }, [])
  //新建
  const add = () => {
    addForm(true)
    setItemData({})
    form.setFieldsValue({
      title: '',
      description: ''
    })
  }
  //编辑
  const edit = (row) => {
    addForm(true)
    setItemData(row)
    form.setFieldsValue({
      title: row.title,
      description: row.description
    })
  }
  //设计
  const design = (row) => {
    history.push(`/form-design/${row.id}`)
  }
  //复制
  const copy = (row) => {

  }
  //删除
  const del = (row) => {
    delFormDesign({ screens_id: row.id }, (res, error) => {
      if (!error && !_.isEmpty(res)) {
        ServerNotification(res.msg, false);
        refreshList();
      }
    })(dispatch)
  }
  //加载表格列
  const getCol = () => {
    return formColumns.concat([
      {
        title: '操作',
        render(item, row) {
          return <div>
            <AuthText onClick={() => edit(row)} className={classStr}>编辑</AuthText>
            <AuthText onClick={() => design(row)} className={classStr}>设计</AuthText>
            <AuthText onClick={() => copy(row)} className={classStr}>复制</AuthText>
            <Popconfirm
              placement="top"
              title="确认删除"
              onConfirm={() => del(row)}
            >
              <AuthText className={classStr} style={{ color: 'red' }}>删除</AuthText>
            </Popconfirm>
          </div>
        }
      }
    ])
  }
  //刷新列表
  const refreshList = () => {
    getFormDesignList(searchObj, (res, error) => {
      setPagination(
        Object.assign({}, pagination, {
          total: res.meta.total,
        })
      );
    })(dispatch)
  }
  // 表格分页
  const handleChangePage = (pagination, filters, sorter) => {
    searchObj.page = pagination.current;
    searchObj.per_page = pagination.per_page;
    setPagination(searchObj);
    refreshList();
  };
  //新建、编辑表单提交
  const handleSubmit = (values) => {
    let params = _.assign({ "type": "FORM", "config": [] }, values);
    if (_.isEmpty(curItem)) {
      params = _.assign(params, { screen_category_id: '1' }) //新增
    } else {
      params = _.assign(params, { screen_category_id: curItem.id })//编辑
    }
    saveFormDesign(params, (res, error) => {
      if (!error) {
        ServerNotification(res.msg, false)
        addForm(false);
        refreshList();
      }
    })(dispatch)
  }
  return (
    <JCard>
      <div className='mb-10'>
        <AuthButton type='primary' onClick={() => add()}>新建表单</AuthButton>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        columns={getCol()}
        dataSource={list}
        onChange={handleChangePage}
        pagination={pagination}
      />
      {visible &&
        <Modal
          visible={visible}
          title={_.isEmpty(curItem) ? '新建表单' : '编辑表单'}
          width={600}
          onCancel={() => {
            setItemData({})
            addForm(false)
          }}
          destroyOnClose={true}
          footer={[]}
        >
          <Form
            form={form}
            name='formDesignAdd'
            {...formItemLayout}
            onFinish={handleSubmit}
            initialValues={{
              title: DeepGet(curItem, ["title"]),
              description: DeepGet(curItem, ["description"]),
            }}
          >
            <FormItem
              label="表单名称"
              name="title"
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
              label="表单描述"
              name="description"
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
              {...formItemLayout}
              style={{ textAlign: 'right' }}
            >
              <Button onClick={() => {
                addForm(false)
                setItemData({})
              }}>
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
        </Modal>
      }
    </JCard>
  )
}
export default FormDesignList