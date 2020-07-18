import React, { Component } from "react";
import { Tabs } from "antd";
import CreateAuction from "./CreateAuction";
import AuctionList from "./AuctionList";

const { TabPane } = Tabs;

class AuctionManager extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="auction-add" onChange={this.callback}>
          <TabPane tab="Create Auction" key="auction-add">
            <CreateAuction />
          </TabPane>
          <TabPane tab="Auction List" key="auction-list">
            <AuctionList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default AuctionManager;
