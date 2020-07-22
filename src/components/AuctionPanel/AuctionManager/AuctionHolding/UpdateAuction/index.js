import React, { Component } from "react";
import { Form, DatePicker, Button, notification, Select, Drawer } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import AuctionStatus from "../../Shared/AuctionStatus";

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

class UpdateAuction extends Component {
  holdingData = this.props.holdingData;
  state = {
    isSubmitting: false,
    auctionId: this.holdingData.auctionId,
    auctionDate: this.holdingData.auctionDate,
    auctionSession: this.holdingData.sessionId,
    auctionStatus: this.holdingData.statusId,
    statusOption: [],
    buttonName: "Update Auction",
  };

  componentDidMount() {
    this.setState({ statusOption: this.setAuctionStatus() });
  }

  setAuctionStatus() {
    const { auctionStatus } = this.state;
    let status = [];
    switch (auctionStatus) {
      case 11:
        status = [
          {
            statusId: 12,
            statusName: "Pooling",
          },
        ];
        break;
      case 12:
        status = [
          {
            statusId: 13,
            statusName: "Trading",
          },
        ];
        break;
      case 13:
        status = [
          {
            statusId: 14,
            statusName: "Settlement",
          },
        ];
        break;
      case 14:
        status = [
          {
            statusId: 15,
            statusName: "Closed",
          },
        ];
        break;
      default:
        break;
    }
    return status;
  }

  drawerTittle() {
    return (
      <>
        <h2>{this.holdingData.auctionId}</h2>
        <AuctionStatus status={this.holdingData.statusId} />
      </>
    );
  }

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

  setSession = (sessionId) => {
    let sessionName;
    switch (sessionId) {
      case 91:
        sessionName = "Morning";
        break;
      case 92:
        sessionName = "Post-Lunch";
        break;
      default:
        sessionName = "Unknown";
        break;
    }
    return sessionName;
  };

  setStatus = (sessionId) => {
    let statusName;
    switch (sessionId) {
      case 11:
        statusName = "Upcoming";
        break;
      case 12:
        statusName = "Pooling";
        break;
      case 13:
        statusName = "Trading";
        break;
      case 14:
        statusName = "Settlement";
        break;
      case 15:
        statusName = "Closed";
        break;
      default:
        statusName = "Unknown";
        break;
    }
    return statusName;
  };

  handleSubmit = () => {
    const { auctionId, auctionDate, auctionSession, auctionStatus } = this.state;
    axios
      .put("http://localhost:4000/auctionmanager/update-auction", {
          auctionId: auctionId,
          auctionDate: moment(auctionDate).format("YYYY-MM-DD"),
          auctionSession: auctionSession,
          auctionStatus: auctionStatus
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.refreshHoldings();
          this.props.onClose();
          notification.open({
            message: res.data.auctionId,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 404) {
          notification.open({
            message: response.data.auctionId,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          notification.open({
            message: response.data.auctionId,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          console.log("unknown error");
        }
      });
  };

  render() {
    const {
      buttonName,
      isSubmitting,
      auctionSession,
      auctionStatus,
      auctionDate,
      statusOption,
    } = this.state;
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
              initialValue={moment(auctionDate, "YYYY-MM-DD")}
            >
              <DatePicker
                initialValues={"2015-01-01"}
                style={{ width: 350 }}
                disabled={auctionStatus > 12}
                onChange={(value, dataSting) =>
                  this.onChangeDate(value, dataSting, "auctionDate")
                }
              />
            </Form.Item>
            <Form.Item
              label="Auction Session"
              name="auctionSession"
              initialValue={this.setSession(auctionSession)}
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
                disabled={auctionStatus > 12}
                onChange={(value) =>
                  this.onChangeSelect(value, "auctionSession")
                }
              >
                <Option value="91">Morning</Option>
                <Option value="92">Post-Lunch</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Auction Status"
              name="auctionStatus"
              initialValue={this.setStatus(auctionStatus)}
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
                onChange={(value) =>
                  this.onChangeSelect(value, "auctionStatus")
                }
              >
                {statusOption.map((option) => (
                  <Option key={option.statusId} value={option.statusId}>{option.statusName}</Option>
                ))}
              </Select>
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

export default UpdateAuction;
