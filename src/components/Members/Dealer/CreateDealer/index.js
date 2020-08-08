import React, { Component } from "react";
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

class CreateDealer extends Component {
  state = {
    isSubmitting: false,
    buttonName: "Create Dealer",
  };

  handleSubmit = (values) => {
    this.setState({ isSubmitting: true, buttonName: "Creating Dealer" });
    let auctioneerUIC = localStorage.getItem("auctioneer_uic");
    axios
      .post(BASE_URL+ "/member-management/dealer", {
        dealerName: values.dealerName,
        phoneNumber: values.phoneNumber,
        address: values.address,
        auctioneerUIC: auctioneerUIC
      })
      .then((response) => {
        console.log(response);
        this.setState({ isSubmitting: false, buttonName: "Create Dealer" });
        notification.open({
          message: `${response.data.dealerURN}`,
          description: "Dealer created sucessfully.",
          icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
        });
      })
      .catch((error) => {
        this.setState({ isSubmitting: false, buttonName: "Create Dealer" });
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
          name="CreateDealer"
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="Name"
            name="dealerName"
            rules={[
              {
                required: true,
                message: "Please input Name!",
              },
            ]}
          >
            <Input style={{ width: 300 }} placeholder="Name" />
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
            <Input style={{ width: 300 }} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <TextArea rows={4} style={{ width: 300 }} placeholder="Address" />
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

export default CreateDealer;
