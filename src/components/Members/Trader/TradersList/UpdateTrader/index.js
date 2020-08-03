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

class UpdatePlanter extends Component {
  traderData = this.props.traderData;
  state = {
    isSubmitting: false,
    buttonName: "Update Trader",
  };

  drawerTittle() {
    return (
      <>
        <h2>{this.traderData.traderURN}</h2>
      </>
    );
  }

  handleSubmit = (values) => {
    let traderURN = this.traderData.traderURN;
    axios
      .put(`${BASE_URL}/member-management/trader/${traderURN}`, {
        traderName: values.traderName,
        address: values.address,
        tinNo: values.tinNo,
        cstNo: values.cstNo,
        spicesBoardLicence: values.spicesBoardLicence,
        shortName: values.shortName,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.refreshDate();
          this.props.onClose();
          notification.open({
            message: res.data.traderURN,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
        }
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 404) {
          notification.open({
            message: response.data.traderURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response && response.status === 500) {
          notification.open({
            message: response.data.traderURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          notification.open({
            message: "ERROR",
            description: "Unexpected Error!",
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
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
              label="Trader Name"
              initialValue={this.traderData.traderName}
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
            <Form.Item
              label="Address"
              initialValue={this.traderData.address}
              name="address"
            >
              <TextArea rows={4} style={{ width: 300 }} placeholder="Address" />
            </Form.Item>
            <Form.Item
              label="Taxpayer No"
              initialValue={this.traderData.tinNo}
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
              initialValue={this.traderData.cstNo}
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
              initialValue={this.traderData.spicesBoardLicence}
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
              initialValue={this.traderData.shortName}
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
        </Drawer>
      </>
    );
  }
}

export default UpdatePlanter;
