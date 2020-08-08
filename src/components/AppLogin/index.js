import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Row, Layout } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../constants";

const { Footer } = Layout;

import "./index.scss";

const AppLogin = () => {
  const [buttonName, setButtonName] = useState("Login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    document.title = "Login - auction experio";
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
          auctioneerUID: values.auctioneerUID,
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
          localStorage.setItem("auctioneer_uic", response.data.auctioneerUID);
          localStorage.setItem("user_uuid", response.data.userId);
          const remainingMilliSeconds = 30 * 60 * 1000;
          const expiaryDate = new Date(
            new Date().getTime() + remainingMilliSeconds
          );
          localStorage.setItem("expiaryDate", expiaryDate.toISOString());
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
          minHeight: "10vh",
        }}
      >
        <h1>auction experio</h1>
      </Row>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          minHeight: "75vh",
        }}
      >
        <Form name="userLogin" className="form" onFinish={handleSiginin}>
          <Form.Item
            name="userEmail"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "please input your username!",
              },
              {
                type: "email",
                whitespace: true,
                message: "please input valid username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item
            name="auctioneerUID"
            normalize={(input) => input.toUpperCase()}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "please input your UIN!",
              },
              {
                max: 3,
                whitespace: true,
                message: "please valid UIN!",
              },
            ]}
          >
            <Input
              prefix={<KeyOutlined />}
              size="large"
              placeholder="auctioneer UIN"
            />
          </Form.Item>
          <Form.Item
            name="userPassword"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "please input your password!",
              },
              {
                whitespace: true,
                min: 8,
                message: "please input valid password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              size="large"
              type="password"
              placeholder="password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
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
