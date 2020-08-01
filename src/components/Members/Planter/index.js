import React, { Component } from "react";
import { Tabs } from "antd";
import CreatePlanter from "./CreatePlanter";
import PlantersList from "./PlantersList";

const { TabPane } = Tabs;

class Planter extends Component {
  render() {
    return (
      <>
        <Tabs defaultActiveKey="planter-add">
          <TabPane tab="Create New" key="planter-add">
            <CreatePlanter />
          </TabPane>
          <TabPane tab="Planters" key="planter-list">
            <PlantersList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Planter;
