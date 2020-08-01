import React, { Component } from "react";
import { Form, Button, Input, notification, Drawer } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
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

class UpdatePlanter extends Component {
  planterData = this.props.planterData;
  state = {
    isSubmitting: false,
    buttonName: "Update Planter",
  };

  drawerTittle() {
    return (
      <>
        <h2>{this.planterData.planterURN}</h2>
      </>
    );
  }

  handleSubmit = (values) => {
    let planterURN = this.planterData.planterURN;
    axios
      .put(`${BASE_URL}/member-management/planter/${planterURN}`, {
        firstName: values.firstName,
        lastName: values.lastName,
        crNumber: values.crNumber,
        phoneNumber: values.phoneNumber,
        address: values.address,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.refreshDate();
          this.props.onClose();
          notification.open({
            message: res.data.planterURN,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 404) {
          notification.open({
            message: response.data.planterURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          notification.open({
            message: response.data.planterURN,
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
            name="createPlanter"
            onFinish={this.handleSubmit}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              initialValue={this.planterData.firstName}
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
              initialValue={this.planterData.lastName}
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
              initialValue={this.planterData.crNumber}
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
              initialValue={this.planterData.phoneNumber}
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
              initialValue={this.planterData.address}
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

export default UpdatePlanter;
