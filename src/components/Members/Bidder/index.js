import React, { Component } from "react";
import { Tabs } from "antd";
import CreateBidder from "./CreateBidder";

const { TabPane } = Tabs;

class Bidder extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="bidder">
          <TabPane tab="Bidder List" key="bidder-add"></TabPane>
          <TabPane tab="Create New" key="bidder-list">
            <CreateBidder />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Bidder;
