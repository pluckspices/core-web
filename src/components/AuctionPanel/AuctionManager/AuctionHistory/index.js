import React, { Component } from "react";
import { Table, Space } from "antd";
import axios from "axios";
import moment from "moment";
import AuctionStatus from "../Shared/AuctionStatus";
import SetSession from "../Shared/AuctionSession";

const { Column } = Table;

class AuctionHistory extends Component {
  state = {
    auctionHistory: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/v1/auction-management/auctions/history")
      .then((res) => {
        this.setState({ auctionHistory: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  viewauctionHistory = (auctionId) => {
    console.log("viewauctionHistory", auctionId);
  };

  render() {
    const { auctionHistory } = this.state;
    return (
      <>
        <Table
          rowKey={(auctionHistory) => auctionHistory.auctionId}
          dataSource={auctionHistory}
        >
          <Column
            title="Auction Number"
            dataIndex="auctionId"
            key="auctionId"
            render={(auctionId) => (
              <Space>
                <a onClick={() => this.viewauctionHistory(auctionId)}>
                  {auctionId}
                </a>
              </Space>
            )}
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
        </Table>
      </>
    );
  }
}

export default AuctionHistory;
