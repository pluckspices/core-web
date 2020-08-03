import React, { Component } from "react";
import { Table, Space, Modal, notification } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from 'moment';
import { BASE_URL } from "../../../../constants";

const { Column } = Table;
class BiddersList extends Component {
  state = {
    biddersList: [],
  };
  componentDidMount() {
    this.getBiddersList();
  }

  getBiddersList = () => {
    axios
      .get(BASE_URL + "/member-management/bidders/")
      .then((res) => {
        this.setState({ biddersList: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  actionBidder(record) {
    return (
      <Space size="middle">
        <a onClick={() => this.bedderDeleteConfirm(record)}>Delete</a>
      </Space>
    );
  }

  bedderDeleteConfirm(data) {
    Modal.confirm({
      title: `${data.bidderCode}`,
      icon: <ExclamationCircleOutlined />,
      content: `Do You want to delete Bidder ${data.bidderCode}`,
      okText: "Delete Bidder",
      cancelText: "Cancel",
      onOk: () => this.bidderDelete(data),
    });
  }

  bidderDelete(data) {
    const bidderCode = data.bidderCode;
    axios
      .delete(`${BASE_URL}/member-management/bidder/${bidderCode}`)
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: res.data.bidderCode,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
          this.getBiddersList();
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 404) {
          notification.open({
            message: response.data.bidderCode,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          notification.open({
            message: response.data.bidderCode,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          console.log("unknown error");
        }
      });
  }

  render() {
    const { biddersList } = this.state;
    return (
      <>
        <Table
          rowKey={(biddersList) => biddersList.bidderCode}
          dataSource={biddersList}
        >
          <Column
            title="Bidder Code"
            dataIndex="bidderCode"
            key="bidderCode"
          />
          <Column
            title="Name"
            dataIndex="bidderName"
            key="fullName"
          />
          <Column
            title="Active from"
            dataIndex="createdOn"
            key="createdOn"
            render={(createdOn) => moment(createdOn).format("DD MMM YYYY")}
          />
          <Column
            title="Actions"
            key="action"
            render={(record) => this.actionBidder(record)}
          />
        </Table>
      </>
    );
  }
}

export default BiddersList;
