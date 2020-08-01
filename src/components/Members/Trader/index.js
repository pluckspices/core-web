import React, { Component } from "react";
import { Tabs } from "antd";
import CreateTrader from "./CreateTrader";

const { TabPane } = Tabs;

class Trader extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="trader-list">
          <TabPane tab="Trader List" key="trader-list"></TabPane>
          <TabPane tab="Create New" key="trader-add">
            <CreateTrader />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Trader;
