import React, { Component } from "react";
import { Tabs } from "antd";
import CreateAuction from "./CreateAuction";
import AuctionHolding from "./AuctionHolding";
import AuctionHistory from "./AuctionHistory";

const { TabPane } = Tabs;

class AuctionManager extends Component {
  state = {
    activeTab: "auction-add",
  };

  handleTabChange = (activeKey) => {
    this.setState({ activeTab: activeKey });
  };

  changeTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <>
        <Tabs activeKey={activeTab} onChange={this.handleTabChange}>
          <TabPane tab="Create Auction" key="auction-add">
            {activeTab === "auction-add" && (
              <CreateAuction changeTab={this.changeTab} />
            )}
          </TabPane>
          <TabPane tab="Auction Holding" key="auction-holding">
            {activeTab === "auction-holding" && <AuctionHolding />}
          </TabPane>
          <TabPane tab="Auction History" key="auction-history">
            {activeTab === "auction-history" && <AuctionHistory />}
          </TabPane>
        </Tabs>
      </>
    );
  }
}

export default AuctionManager;
