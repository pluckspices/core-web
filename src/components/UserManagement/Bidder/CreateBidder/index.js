import React, { Component } from "react";
import { Form, Button, Input } from "antd";

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
          name="CreateBidder"
          initialValues={{
            remember: true,
          }}
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
            <Input style={{ width: 300 }} placeholder="Bidder Name" />
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
            <Input style={{ width: 300 }} placeholder="Bidder Code" />
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

export default CreateBidder;
