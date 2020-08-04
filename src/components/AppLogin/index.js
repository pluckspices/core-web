import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Row, Layout } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AuthStore from "../../store/auth";
import { BASE_URL } from "../../constants";

const { Header, Content, Footer, Sider } = Layout;

import "./index.scss";

const AppLogin = () => {
  const [buttonName, setButtonName] = useState("Login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    document.title = "Login - onenext";
  });
  let navigate = useNavigate();
  function handleSiginin(values) {
    setButtonName("Logging");
    setIsSubmitting(true);
    axios
      .post(
        BASE_URL + "/user-management/owned/login",
        {
          userEmail: values.userEmail,
          userPassword: values.userPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          const remainingMilliSeconds = 60 * 60 * 1000;
          const expiaryDate = new Date(
            new Date().getTime() + remainingMilliSeconds
          );
          localStorage.setItem("expiaryDate", expiaryDate.toISOString());
          AuthStore.setIsAuth(true);
          navigate("/coreapp");
        }
      })
      .catch((error) => {
        setButtonName("Login");
        setIsSubmitting(false);
        let response = error.response;
        console.log(response);
        if (
          response.status === 401 ||
          response.status === 500 ||
          response.status === 422
        ) {
          notification.open({
            message: `LOGIN ERROR`,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          notification.open({
            message: `LOGIN ERROR`,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        }
      });
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)`,
      }}
    >
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          minHeight: "85vh",
        }}
      >
        <Form name="userLogin" className="form" onFinish={handleSiginin}>
          <Form.Item
            name="userEmail"
            rules={[
              {
                required: true,
                message: "please input your username!",
              },
            ]}
          >
            <Input
              type="email"
              prefix={<UserOutlined />}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item
            name="ownerCode"
            rules={[
              {
                required: true,
                message: "please input your agency code!",
              },
            ]}
          >
            <Input prefix={<TeamOutlined />} placeholder="agency code" />
          </Form.Item>
          <Form.Item
            name="userPassword"
            rules={[
              {
                required: true,
                message: "please input your password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={isSubmitting}
            >
              {buttonName}
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <Footer style={{ textAlign: "center" }}>
        nithin.antony Designs ©2020
      </Footer>
    </Layout>
  );
};

export default AppLogin;
