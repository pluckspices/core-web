import React, { Component } from "react";
import { Tabs } from "antd";
import CreateTrader from "./CreateTrader";

const { TabPane } = Tabs;

class Trader extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="planter-list" onChange={this.callback}>
          <TabPane tab="Planter List" key="planter-list"></TabPane>
          <TabPane tab="Create New" key="planter-add">
            <CreateTrader />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Trader;
