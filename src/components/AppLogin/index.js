import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

import "./index.scss";

const AppLogin = () => {
  const [buttonName, setButtonName] = useState("Login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();
  function handleSiginin(values) {
    setButtonName("Logging");
    setIsSubmitting(true);
    axios
      .post(
        "http://localhost:4000/auth/user/login",
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
          navigate("/");
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
    <div className="login">
      <Form name="userLogin" className="form" onFinish={handleSiginin}>
        <Form.Item
          name="userEmail"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="userPassword"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
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
    </div>
  );
};

export default AppLogin;
