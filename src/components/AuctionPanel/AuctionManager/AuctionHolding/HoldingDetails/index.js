import React, { Component } from "react";
import { Drawer } from "antd";
import AuctionStatus from "../../Shared/AuctionStatus";

class HoldingDetails extends Component {
  drawerTittle() {
    return (
      <>
        <h2>{this.props.holdingData.auctionId}</h2>
        <AuctionStatus status={this.props.holdingData.statusId} />
      </>
    );
  }

  render() {
    return (
      <>
        <Drawer
          width={600}
          placement="right"
          closable={true}
          onClose={this.props.onClose}
          visible={this.props.visible}
          title={this.drawerTittle()}
        ></Drawer>
      </>
    );
  }
}

export default HoldingDetails;
