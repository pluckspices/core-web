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

class CreateTrader extends Component {
  state = {
    isSubmitting: false,
    buttonName: "Create Trader",
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
          name="CreateTrader"
          initialValues={{
            remember: true,
          }}
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
            label="Registration NO(TIN)"
            name="regTin"
            rules={[
              {
                required: true,
                message: "Please input TIN no!",
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
                message: "Please input CST no!",
              },
            ]}
          >
            <Input style={{ width: 300 }} placeholder="CST" />
          </Form.Item>
          <Form.Item
            label="Spices Board Licence"
            name="spicesBL"
            rules={[
              {
                required: true,
                message: "Please input SBL no!",
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

export default CreateTrader;
