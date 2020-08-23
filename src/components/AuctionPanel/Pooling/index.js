import React, { Component } from "react";
import { Tabs } from "antd";
import CreateItem from "./CreateItem";
import AuctionPooledList from "./AuctionPooledList";
import StockPooledList from "./StockPooledList";


const { TabPane } = Tabs;

class Pooling extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <>
        <Tabs defaultActiveKey="pooling-add" onChange={this.callback}>
          <TabPane tab="New Pool" key="pooling-add">
            <CreateItem />
          </TabPane>
          <TabPane tab="Pooled for Auction" key="pooling-list-auction">
            <AuctionPooledList />
          </TabPane>
          <TabPane tab="Pooled in Stocks" key="pooling-list-stock">
          <StockPooledList />
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default Pooling;
