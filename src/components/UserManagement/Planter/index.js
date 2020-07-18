import React, { Component } from "react";
import { Tabs } from "antd";
import CreatePlanter from "./CreatePlanter";

const { TabPane } = Tabs;

class Planter extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="planter-list" onChange={this.callback}>
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
