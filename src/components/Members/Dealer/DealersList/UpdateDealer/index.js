import React, { Component } from "react";
import { Form, Button, Input, notification, Drawer } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../../constants";

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

class UpdateDealer extends Component {
  dealerData = this.props.dealerData;
  state = {
    isSubmitting: false,
    buttonName: "Update Dealer",
  };

  drawerTittle() {
    return (
      <>
        <h2>{this.dealerData.dealerURN}</h2>
      </>
    );
  }

  handleSubmit = (values) => {
    let dealerURN = this.dealerData.dealerURN;
    axios
      .put(`${BASE_URL}/member-management/dealer/${dealerURN}`, {
        dealerName: values.dealerName,
        phoneNumber: values.phoneNumber,
        address: values.address,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.refreshDate();
          this.props.onClose();
          notification.open({
            message: res.data.dealerURN,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 404) {
          notification.open({
            message: response.data.dealerURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          notification.open({
            message: response.data.dealerURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          console.log("unknown error");
        }
      });
  };

  render() {
    const { buttonName, isSubmitting } = this.state;
    return (
      <>
        <Drawer
          width={600}
          placement="right"
          closable={true}
          onClose={this.props.onClose}
          visible={this.props.visible}
          title={this.drawerTittle()}
        >
          <Form
            {...layout}
            layout="horizontal"
            name="updateDealer"
            onFinish={this.handleSubmit}
          >
            <Form.Item
              label="Name"
              name="dealerName"
              initialValue={this.dealerData.dealerName}
              rules={[
                {
                  required: true,
                  message: "Please input Dealer Name!",
                },
              ]}
            >
              <Input style={{ width: 350 }} placeholder="Dealer Name" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              initialValue={this.dealerData.phoneNumber}
              rules={[
                {
                  required: true,
                  message: "Please input phone no!",
                },
              ]}
            >
              <Input style={{ width: 350 }} placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              initialValue={this.dealerData.address}
            >
              <TextArea rows={4} style={{ width: 350 }} placeholder="Address" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {buttonName}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default UpdateDealer;
