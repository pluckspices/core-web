import React, { Component } from "react";
import { Form, Button, Input, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";

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

class CreatePlanter extends Component {
  state = {
    isSubmitting: false,
    buttonName: "Create Planter",
  };

  handleSubmit = (values) => {
    this.setState({ isSubmitting: true, buttonName: "Creating Planter" });
    axios
      .post("http://localhost:4000/planter/create", {
        name: values.name,
        crNumber: values.crNumber,
        phoneNumber: values.phoneNumber,
        address: values.address,
      })
      .then((response) => {
        this.setState({ isSubmitting: false, buttonName: "Create Planter" });
        notification.open({
          message: `${response.data.crNumber}`,
          description: "Planter created sucessfully.",
          icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isSubmitting: false, buttonName: "Create Planter" });
        notification.open({
          message: `ERROR`,
          description: "Unexcepted error occured! Please try again.",
          icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
        });
      });
  };

  render() {
    const { buttonName, isSubmitting } = this.state;
    return (
      <>
        <Form
          {...layout}
          layout="horizontal"
          name="createPlanter"
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input style={{ width: 350 }} placeholder="Name" />
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
  }
}

export default CreatePlanter;
