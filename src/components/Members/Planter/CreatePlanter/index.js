import React, { useState } from "react";
import { Form, Button, Input, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../constants";

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreatePlanter = () => {
  const [form] = Form.useForm();
  const [buttonName, SetButtonName] = useState("Create Planter");
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    const auctioneerUIC = localStorage.getItem("auctioneer_uic");
    SetButtonName("Creating Planter");
    SetIsSubmitting(true);
    axios
      .post(BASE_URL + "/member-management/planter", {
        firstName: values.firstName,
        lastName: values.lastName,
        crNumber: values.crNumber,
        phoneNumber: values.phoneNumber,
        address: values.address,
        auctioneerUIC: auctioneerUIC
      })
      .then((response) => {
        SetButtonName("Create Planter");
        SetIsSubmitting(false);
        form.resetFields();
        notification.open({
          message: `${response.data.planterURN}`,
          description: "Planter created sucessfully.",
          icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
        });
      })
      .catch((error) => {
        SetButtonName("Create Planter");
        SetIsSubmitting(false);
        notification.open({
          message: `ERROR`,
          description: "Unexcepted error occured! Please try again.",
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
      });
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        layout="horizontal"
        name="createPlanter"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input First Name!",
            },
          ]}
        >
          <Input style={{ width: 350 }} placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input Last Name!",
            },
          ]}
        >
          <Input style={{ width: 350 }} placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="CR Number"
          name="crNumber"
          rules={[
            {
              required: true,
              message: "Please input CR Number!",
            },
          ]}
        >
          <Input style={{ width: 350 }} placeholder="CR Number" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input phone no!",
            },
          ]}
        >
          <Input style={{ width: 350 }} placeholder="Phone Number" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <TextArea rows={4} style={{ width: 350 }} placeholder="Address" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {buttonName}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePlanter;
