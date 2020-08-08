import React, { Component } from "react";
import { Form, Button, Input, notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../constants";

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

class CreateBidder extends Component {
  state = {
    isSubmitting: false,
    buttonName: "Create Bidder",
  };

  handleSubmit = (values) => {
    this.setState({ isSubmitting: true, buttonName: "Creating Bidder" });
    axios
      .post(BASE_URL + "/member-management/bidder", {
        bidderName: values.bidderName,
        bidderCode: values.bidderCode,
      })
      .then((response) => {
        this.setState({ isSubmitting: false, buttonName: "Create Bidder" });
        notification.open({
          message: response.data.bidderCode,
          description: response.data.message,
          icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
        });
      })
      .catch((error) => {
        let response = error.response;
        if (response && response.status === 409) {
          this.setState({ isSubmitting: false, buttonName: "Create Bidder" });
          notification.open({
            message: response.data.details.bidderCode,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          this.setState({ isSubmitting: false, buttonName: "Create Bidder" });
          notification.open({
            message: "ERROR",
            description: response.data.messag,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        }
      });
  };

  render() {
    const { buttonName, isSubmitting } = this.state;
    return (
      <>
        <Form
          {...layout}
          layout="horizontal"
          name="CreateBidder"
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="Bidder Name"
            name="bidderName"
            rules={[
              {
                required: true,
                message: "Please input bidder name!",
              },
            ]}
          >
            <Input style={{ width: 350 }} placeholder="Bidder Name" />
          </Form.Item>
          <Form.Item
            label="Bidder Code"
            name="bidderCode"
            rules={[
              {
                required: true,
                message: "Please input Bidder Code!",
              },
            ]}
          >
            <Input
              style={{ width: 350 }}
              addonBefore="BID"
              placeholder="Bidder Number"
            />
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

export default CreateBidder;
