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

const CreateTrader = () => {
  const [form] = Form.useForm();
  const [buttonName, SetButtonName] = useState("Create Trader");
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    SetButtonName("Creating Trader");
    SetIsSubmitting(true);
    axios
      .post(BASE_URL + "/member-management/trader/", {
        traderName: values.traderName,
        address: values.address,
        tinNo: values.tinNo,
        cstNo: values.cstNo,
        spicesBoardLicence: values.spicesBoardLicence,
        shortName: values.shortName,
      })
      .then((response) => {
        SetButtonName("Create Trader");
        SetIsSubmitting(false);
        form.resetFields();
        notification.open({
          message: `${response.data.traderURN}`,
          description: "Trader created sucessfully.",
          icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
        });
      })
      .catch((error) => {
        SetButtonName("Create Trader");
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
        name="CreateTrader"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Trader Name"
          name="traderName"
          rules={[
            {
              required: true,
              message: "Please input trader name!",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="Trader Name" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <TextArea rows={4} style={{ width: 300 }} placeholder="Address" />
        </Form.Item>
        <Form.Item
          label="Taxpayer No"
          name="tinNo"
          rules={[
            {
              required: true,
              message: "Please input TIN!",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="TIN" />
        </Form.Item>
        <Form.Item
          label="Central Sales Tax"
          name="cstNo"
          rules={[
            {
              required: true,
              message: "Please input CST!",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="CST" />
        </Form.Item>
        <Form.Item
          label="Spices Board Licence"
          name="spicesBoardLicence"
          rules={[
            {
              required: true,
              message: "Please input Spices Board Licence!",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="SBL" />
        </Form.Item>
        <Form.Item
          label="Short Name"
          name="shortName"
          rules={[
            {
              required: true,
              message: "Please input Short Name!",
            },
          ]}
        >
          <Input style={{ width: 300 }} placeholder="Short Name" />
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

export default CreateTrader;
