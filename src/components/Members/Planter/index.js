import React, { useState } from "react";
import { Tabs, Button } from "antd";
import CreatePlanter from "./CreatePlanter";
import PlantersList from "./PlantersList";

const { TabPane } = Tabs;

const Planter = () => {
  const [activeTab, SetActiveTab] = useState("planter-add");
  const handleTabChange = (activeKey) => {
    SetActiveTab(activeKey);
  };

  return (
    <>
      <Tabs onChange={handleTabChange} defaultActiveKey={activeTab}>
        <TabPane tab="Create New" key="planter-add">
          <CreatePlanter />
        </TabPane>
        <TabPane tab="Planters" key="planter-list">
          {activeTab === "planter-list" && <PlantersList />}
        </TabPane>
      </Tabs>
    </>
  );
};

export default Planter;
