import React, { Component } from "react";
import { Tabs } from "antd";
import CreateDealer from "./CreateDealer";

const { TabPane } = Tabs;
class Dealer extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="dealer-list">
          <TabPane tab="Dealer List" key="dealer-list"></TabPane>
          <TabPane tab="Create New" key="dealer-add">
            <CreateDealer />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Dealer;
