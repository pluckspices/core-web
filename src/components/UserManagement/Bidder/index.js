import React, { Component } from "react";
import { Tabs } from "antd";
import CreateBidder from "./CreateBidder";

const { TabPane } = Tabs;

class Bidder extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="bidder" onChange={this.callback}>
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
