import React, { Component } from "react";
import { Form, DatePicker, Button, notification, Select } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";

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

class CreateAuction extends Component {
  state = {
    isSubmitting: false,
    auctionDate: "",
    auctionSession: "",
    buttonName: "Create Auction",
  };

  onChangeDate = (value, dateString, name) => {
    this.setState({
      [name]: dateString,
    });
  };

  onChangeSelect = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { auctionDate, auctionSession } = this.state;
    this.setState({ isSubmitting: true, buttonName: "Createing Auction" });
    axios
      .post("http://localhost:4000/v1/auction-management/auction/", {
        auctionDate: auctionDate,
        auctionSession: auctionSession,
      })
      .then((response) => {
        this.setState({ isSubmitting: false, buttonName: "Create Auction" });
        notification.open({
          message: `${response.data.auctionId}`,
          description: "Auction created sucessfully.",
          icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
        });
        this.props.changeTab("auction-holding");
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 409) {
          this.setState({ isSubmitting: false, buttonName: "Create Auction" });
          notification.open({
            message: response.data.auctionId,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          this.setState({ isSubmitting: false, buttonName: "Create Auction" });
          notification.open({
            message: "ERROR",
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          this.setState({ isSubmitting: false, buttonName: "Create Auction" });
          notification.open({
            message: "ERROR",
            description: "Unexcepted error occured! Please try again.",
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
          name="createAuction"
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="Auction Date"
            name="auctionDate"
            rules={[
              {
                required: true,
                message: "Please input auction date!",
              },
            ]}
          >
            <DatePicker
              style={{ width: 350 }}
              onChange={(value, dataSting) =>
                this.onChangeDate(value, dataSting, "auctionDate")
              }
            />
          </Form.Item>
          <Form.Item
            label="Auction Session"
            name="auctionSession"
            rules={[
              {
                required: true,
                message: "Please input auction session!",
              },
            ]}
          >
            <Select
              placeholder="Select Session"
              style={{ width: 350 }}
              onChange={(value) => this.onChangeSelect(value, "auctionSession")}
            >
              <Option value="91">Morning</Option>
              <Option value="92">Post-Lunch</Option>
            </Select>
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

export default CreateAuction;
