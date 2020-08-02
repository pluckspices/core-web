import React, { Component } from "react";
import { Tabs } from "antd";
import CreateTrader from "./CreateTrader";
import TradersList from "./TradersList";

const { TabPane } = Tabs;

class Trader extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="trader-add">
          <TabPane tab="Create New" key="trader-add">
            <CreateTrader />
          </TabPane>
          <TabPane tab="Trader List" key="trader-list">
            <TradersList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Trader;
