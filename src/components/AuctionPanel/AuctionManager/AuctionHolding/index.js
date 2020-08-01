import React, { Component } from "react";
import { Table, Tag, Space, Modal, notification } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import HoldingDetails from "./HoldingDetails";
import UpdateAuction from "./UpdateAuction";
import AuctionStatus from "../Shared/AuctionStatus";
import SetSession from "../Shared/AuctionSession";
import { BASE_URL } from "../../../../constants";

const { Column } = Table;

class AuctionHolding extends Component {
  state = {
    auctionHoldings: [],
    holdingData: [],
    visibleHoldingDetails: false,
    visibleEditHolding: false,
  };

  componentDidMount() {
    this.getauctionHoldingData();
  }

  getauctionHoldingData = () => {
    let token = localStorage.getItem("token");
    axios
      .get(BASE_URL + "/auction-management/auctions/holding", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.setState({ auctionHoldings: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderStatusTag = (statusId) => {
    return (
      <Tag key={statusId}>{statusId === 91 ? "Morning" : "Post-Lunch"}</Tag>
    );
  };

  setDate(auctionDate) {
    const date = moment(auctionDate).format("DD MMM YYY");
    return date;
  }

  viewAuction(record) {
    return (
      <Space size="middle">
        {record.statusId !== 11 ? (
          <a onClick={() => this.viewAuctionDetails(record)}>View</a>
        ) : null}
        {record.statusId !== 16 ? (
          <a onClick={() => this.editAuctionDetails(record)}>Update</a>
        ) : null}
        {record.statusId === 11 ? (
          <a onClick={() => this.auctionDeleteConfirm(record)}>Delete</a>
        ) : null}
      </Space>
    );
  }

  auctionDeleteConfirm(data) {
    Modal.confirm({
      title: `${data.auctionId}`,
      icon: <ExclamationCircleOutlined />,
      content: `Do You want to delete Auction ${data.auctionId}`,
      okText: "Delete Auction",
      cancelText: "Cancel",
      onOk: () => this.auctionDelete(data),
    });
  }

  auctionDelete(data) {
    const auctionId = data.auctionId;
    axios
      .delete(
        `${BASE_URL}/auction-management/auction/${auctionId}`
      )
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: res.data.auctionId,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
          this.getauctionHoldingData();
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
  }

  viewAuctionDetails(data) {
    this.setState({
      visibleHoldingDetails: true,
      holdingData: data,
    });
  }

  editAuctionDetails(data) {
    this.setState({
      visibleEditHolding: true,
      holdingData: data,
    });
  }

  viewAuctionClose = () => {
    this.setState({
      visibleHoldingDetails: false,
      holdingData: [],
    });
  };

  editAuctionClose = () => {
    this.setState({
      visibleEditHolding: false,
      holdingData: [],
    });
  };

  render() {
    const {
      auctionHoldings,
      visibleHoldingDetails,
      visibleEditHolding,
      holdingData,
    } = this.state;
    return (
      <>
        <Table
          rowKey={(auctionHoldings) => auctionHoldings.auctionId}
          dataSource={auctionHoldings}
        >
          <Column
            title="Auction Number"
            dataIndex="auctionId"
            key="auctionId"
          />
          <Column
            title="Auction Date"
            dataIndex="auctionDate"
            key="auctionDate"
            render={(auctionDate) => moment(auctionDate).format("DD MMM YYYY")}
          />
          <Column
            title="Session"
            dataIndex="sessionId"
            key="sessionId"
            render={(sessionId) => SetSession(sessionId)}
          />
          <Column
            title="Status"
            dataIndex="statusId"
            key="statusId"
            render={(statusId) => <AuctionStatus status={statusId} />}
          />
          <Column
            title="Actions"
            key="action"
            render={(record) => this.viewAuction(record)}
          />
        </Table>
        {visibleHoldingDetails ? (
          <HoldingDetails
            visible={visibleHoldingDetails}
            onClose={this.viewAuctionClose}
            holdingData={holdingData}
          />
        ) : null}
        {visibleEditHolding ? (
          <UpdateAuction
            visible={visibleEditHolding}
            onClose={this.editAuctionClose}
            holdingData={holdingData}
            refreshHoldings={this.getauctionHoldingData}
          />
        ) : null}
      </>
    );
  }
}

export default AuctionHolding;
