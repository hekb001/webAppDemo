/*
 * @Author: kevin.he
 * @Date: 2021-11-04 10:13:07
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-11-23 18:18:11
 * 登录页
 */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { CopyrightOutlined } from "@ant-design/icons";
import loginHeaderPng from "assets/images/login-header.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "actions/user";
import { _year } from "utils";
import "./index.less";
const FormItem = Form.Item;
const Login = (props) => {
  const { } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.pending);
  useEffect(() => {
    //获取地址栏，从第三方携带传递过来的参数

  }, []);
  const history = useHistory();
  const [form] = Form.useForm();
  const onSubmit = (body) => {
    login(body, (data) => {
      if (data && data.status) {
        message.success("登录成功！");
        history.push("/processes");
      } else {
        message.error(data && data.msg || '请检查用户名、密码是否正确');
      }
    })(dispatch);
  };
  return (
    <div className="login-bg">
      <div className="login-header">
        <img src={loginHeaderPng} />
        <span>HRSaaS流程引擎管理系统</span>
      </div>
      <div className="login-form">
        <Form
          form={form}
          name='login'
          onFinish={onSubmit}
          style={{ textAlign: "center" }}
        >
          <FormItem
            style={{ marginBottom: 40 }}
            name='username'
            rules={[
              {
                required: true,
                message: '请填写用户名'
              },
            ]}
          >
            <Input placeholder="用户名admin" prefix={<UserOutlined />} />
          </FormItem>
          <FormItem
            style={{ marginBottom: 40 }}
            name='password'
            rules={[
              {
                required: true,
                message: '请填写密码'
              },
            ]}
          >
            <Input type="password" placeholder="密码admin123" prefix={<LockOutlined />} />
          </FormItem>
          <FormItem>
            <Button type="primary" style={{ width: "70%" }} htmlType="submit" loading={loading}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
      <div className="login-footer">
        {" "}
        版权所有
        <CopyrightOutlined />
        2016-{_year}
        深圳市前海欢雀科技有限公司粤ICP备15072594号-1
      </div>
    </div>
  );
};

export default Login;
