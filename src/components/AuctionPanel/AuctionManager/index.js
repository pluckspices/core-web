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
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Create Auction" key="auct-1">
            <CreateAuction />
          </TabPane>
          <TabPane tab="Auction List" key="auct-2">
            <AuctionList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default AuctionManager;
