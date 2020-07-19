import React, { Component } from "react";
import { Tabs } from "antd";
import CreateItem from "./CreateItem";

const { TabPane } = Tabs;

class Pooling extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="pooling-add" onChange={this.callback}>
          <TabPane tab="Create Item" key="pooling-add">
            <CreateItem />
          </TabPane>
          <TabPane tab="Pooled Item List" key="pooling-list"></TabPane>
        </Tabs>
      </>
    );
  }
}

export default Pooling;
