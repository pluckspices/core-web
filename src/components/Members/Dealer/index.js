import React, { Component } from "react";
import { Tabs } from "antd";
import CreateDealer from "./CreateDealer";
import DealersList from "./DealersList";

const { TabPane } = Tabs;

class Dealer extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="dealer-add">
          <TabPane tab="Create New" key="dealer-add">
            <CreateDealer />
          </TabPane>
          <TabPane tab="Dealer List" key="dealer-list">
            <DealersList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Dealer;
