import React, { Component } from "react";
import { Tabs } from "antd";
import CreateDealer from "./CreateDealer";

const { TabPane } = Tabs;
class Dealer extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="dealer-list" onChange={this.callback}>
          <TabPane tab="Planter List" key="dealer-list"></TabPane>
          <TabPane tab="Create New" key="dealer-add">
            <CreateDealer />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Dealer;
