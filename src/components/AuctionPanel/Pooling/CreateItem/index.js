import React, { Component } from "react";
import { Form, Button, Input, Select, Steps } from "antd";

import "./index.scss";

const { Step } = Steps;
const { Option } = Select;

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

class CreateItem extends Component {
  state = {
    current: 0,
    isSubmitting: false,
    buttonName: "Create Item",
  };

  steps = [
    {
      title: "Member Selection",
      content: this.poolingMember(),
    },
    {
      title: "Item Pooling",
      content: this.poolingItem(),
    },
    {
      title: "Auction Selection",
      content: this.auctionSelection(),
    },
  ];

  poolingMember() {
    return (
      <>
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
          <Input style={{ width: 350 }} placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="Planter / Dealer"
          name="planterDealer"
          rules={[
            {
              required: true,
              message: "Please select Planter / Dealer!",
            },
          ]}
        >
          <Select style={{ width: 350 }} placeholder="Select Planter / Dealer">
            <Option value="planter">Planter</Option>
            <Option value="dealer">Dealer</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="CRNO/SBL No"
          name="crsbl"
          rules={[
            {
              required: true,
              message: "Please input CRNO/SBL No!",
            },
          ]}
        >
          <Input style={{ width: 350 }} placeholder="CRNO/SBL" />
        </Form.Item>
      </>
    );
  }

  poolingItem() {
    return (
      <>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input Quantity!",
            },
          ]}
        >
          <Input style={{ width: 350 }} addonAfter="K" placeholder="Quantity" />
        </Form.Item>

        <Form.Item
          label="Collection Centre"
          name="collectionCentre"
          rules={[
            {
              required: true,
              message: "Please select Collection Centre!",
            },
          ]}
        >
          <Select style={{ width: 350 }} placeholder="Select Centre">
            <Option value="kattappana">Kattappana</Option>
            <Option value="idukki">Idukki</Option>
            <Option value="nedumkandam">Nedumkandam</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Litre Weight"
          name="litreWeight"
          rules={[
            {
              required: true,
              message: "Please input Litre Weight!",
            },
          ]}
        >
          <Input
            style={{ width: 350 }}
            addonAfter="g"
            placeholder="Litre Weight"
          />
        </Form.Item>
        <Form.Item
          label="Grade"
          name="grade"
          rules={[
            {
              required: true,
              message: "Please select grade!",
            },
          ]}
        >
          <Select style={{ width: 350 }} placeholder="Select Grade">
            <Option value="a">A</Option>
            <Option value="b">B</Option>
            <Option value="c">C</Option>
          </Select>
        </Form.Item>
      </>
    );
  }

  auctionSelection() {
    return (
      <>
        <Form.Item
          label="Auction No"
          name="auctionNo"
          rules={[
            {
              required: true,
              message: "Please select auction no!",
            },
          ]}
        >
          <Select style={{ width: 350 }} placeholder="Select Auction">
            <Option value="ABC2021DM0107S1">ABC2021DM0107S1</Option>
            <Option value="ABC2021DM0107S2">ABC2021DM0107S2</Option>
            <Option value="ABC2021DM1907S1">ABC2021DM1907S1</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Lot Number" name="lotNo">
          <Select
            showSearch
            style={{ width: 350 }}
            placeholder="Select Lot"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
            <Option value="11">11</Option>
            <Option value="12">12</Option>
          </Select>
        </Form.Item>
      </>
    );
  }

  handleSubmit = (values) => {
    console.log("handleSubmit clicked", values);
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { buttonName, current } = this.state;

    return (
      <>
        <Steps current={current}>
          {this.steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <Form
            {...layout}
            layout="horizontal"
            name="createItem"
            onFinish={this.handleSubmit}
          >
            {this.steps[current].content}
            <div className="steps-action">
              {current < this.steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {current === this.steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Form>
        </div>
        {/* <Form
          {...layout}
          layout="horizontal"
          name="createItem"
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
            <Input style={{ width: 350 }} placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Auction No"
            name="auctionNo"
            rules={[
              {
                required: true,
                message: "Please select auction no!",
              },
            ]}
          >
            <Select style={{ width: 350 }} placeholder="Select Auction">
              <Option value="ABC2021DM0107S1">ABC2021DM0107S1</Option>
              <Option value="ABC2021DM0107S2">ABC2021DM0107S2</Option>
              <Option value="ABC2021DM1907S1">ABC2021DM1907S1</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Lot Number" name="lotNo">
            <Select
              showSearch
              style={{ width: 350 }}
              placeholder="Select Lot"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Collection Centre"
            name="collectionCentre"
            rules={[
              {
                required: true,
                message: "Please select Collection Centre!",
              },
            ]}
          >
            <Select style={{ width: 350 }} placeholder="Select Centre">
              <Option value="kattappana">Kattappana</Option>
              <Option value="idukki">Idukki</Option>
              <Option value="nedumkandam">Nedumkandam</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Planter / Dealer"
            name="planterDealer"
            rules={[
              {
                required: true,
                message: "Please select Planter / Dealer!",
              },
            ]}
          >
            <Select
              style={{ width: 350 }}
              placeholder="Select Planter / Dealer"
            >
              <Option value="planter">Planter</Option>
              <Option value="dealer">Dealer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="CRNO/SBL No"
            name="crsbl"
            rules={[
              {
                required: true,
                message: "Please input CRNO/SBL No!",
              },
            ]}
          >
            <Input style={{ width: 350 }} placeholder="CRNO/SBL" />
          </Form.Item>
          <Form.Item
            label="Litre Weight"
            name="litreWeight"
            rules={[
              {
                required: true,
                message: "Please input Litre Weight!",
              },
            ]}
          >
            <Input
              style={{ width: 350 }}
              addonAfter="g"
              placeholder="Litre Weight"
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input Quantity!",
              },
            ]}
          >
            <Input
              style={{ width: 350 }}
              addonAfter="K"
              placeholder="Quantity"
            />
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
        </Form> */}
      </>
    );
  }
}

export default CreateItem;
