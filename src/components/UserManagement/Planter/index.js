import React, { Component } from "react";
import { Tabs } from "antd";
import CreatePlanter from "./CreatePlanter";

const { TabPane } = Tabs;

class Planter extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="planter-list">
          <TabPane tab="Planter List" key="planter-list"></TabPane>
          <TabPane tab="Create New" key="planter-add">
            <CreatePlanter />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Planter;
