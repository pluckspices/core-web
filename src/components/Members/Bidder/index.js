import React, { Component } from "react";
import { Tabs } from "antd";
import CreateBidder from "./CreateBidder";
import BiddersList from "./BiddersList";

const { TabPane } = Tabs;

class Bidder extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="bidder-add">
          <TabPane tab="Bidder Registration" key="bidder-add">
            <CreateBidder />
          </TabPane>
          <TabPane tab="Registered Bidders" key="bidder-list">
            <BiddersList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Bidder;
