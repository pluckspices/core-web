import React, { Component } from "react";
import { Form, Button, Input } from "antd";

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

  handleSubmit = () => {
    console.log("handleSubmit clicked");
  };

  render() {
    const { buttonName } = this.state;
    return (
      <>
        <Form
          {...layout}
          layout="horizontal"
          name="CreateDealer"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Name!",
              },
            ]}
          >
            <Input  style={{ width: 300 }} placeholder="Name" />
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
            <Input  style={{ width: 300 }} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
          >
            <TextArea rows={4}  style={{ width: 300 }} placeholder="Address" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={false}
              onClick={this.handleSubmit}
            >
              {buttonName}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default CreateDealer;
