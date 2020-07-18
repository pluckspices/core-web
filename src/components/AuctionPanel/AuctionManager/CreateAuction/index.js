import React, { Component } from "react";
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  notification,
  Select,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
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

  onChangeSelect  = (value, name) =>{
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = () => {
    const { auctionDate, auctionSession } = this.state;
    if (auctionDate && auctionSession) {
      this.setState({ isSubmitting: true, buttonName: "Createing Auction" });
      axios
        .post("http://localhost:4000/auctionmanager/create", {
          auctionDate: auctionDate,
          auctionSession: auctionSession,
        })
        .then((response) => {
          console.log(response);
          this.setState({ isSubmitting: false, buttonName: "Create Auction" });
          notification.open({
            message: `${response.data.auctionId}`,
            description: "Auction created sucessfully.",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isSubmitting: false, buttonName: "Create Auction" });
          notification.open({
            message: `ERROR`,
            description: "Unexcepted error occured! Please try again.",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
        });
    }
  };

  render() {
    const { buttonName } = this.state;
    return (
      <>
        <Form
          {...layout}
          layout="horizontal"
          name="createAuction"
          initialValues={{
            remember: true,
          }}
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
              style={{ width: 200 }}
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
              showSearch
              style={{ width: 200 }}
              placeholder="Select Session"
              onChange={(value) =>
                this.onChangeSelect(value, "auctionSession")
              }
            >
              <Option value="1">Morning</Option>
              <Option value="2">Evening</Option>
            </Select>
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

export default CreateAuction;
