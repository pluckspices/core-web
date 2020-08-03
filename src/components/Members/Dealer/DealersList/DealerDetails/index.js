import React, { Component } from "react";
import { Drawer, Descriptions, Statistic, Row, Col } from "antd";

class DealerDetails extends Component {
  dealerData = this.props.dealerData;
  drawerTittle() {
    return (
      <>
        <h2>{this.dealerData.dealerURN}</h2>
      </>
    );
  }

  render() {
    return (
      <Drawer
        width={600}
        placement="right"
        closable={true}
        onClose={this.props.onClose}
        visible={this.props.visible}
        title={this.drawerTittle()}
      >
        <Descriptions title="Dealer Info" layout="vertical">
          <Descriptions.Item label="Full Name">
            {this.dealerData.dealerName}
          </Descriptions.Item>
          <Descriptions.Item label="Dealer URN">
            {this.dealerData.dealerURN}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {this.dealerData.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {this.dealerData.address}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    );
  }
}

export default DealerDetails;
