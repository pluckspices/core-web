import React, { Component } from "react";
import { Drawer, Descriptions } from "antd";
import moment from "moment";

class TraderDetails extends Component {
  traderData = this.props.traderData;
  drawerTittle() {
    return (
      <>
        <h2>{this.traderData.traderURN}</h2>
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
        <Descriptions title="Trader Info" layout="vertical">
          <Descriptions.Item label="Trader Name">
            {this.traderData.traderName}
          </Descriptions.Item>
          <Descriptions.Item label="Trader URN">
            {this.traderData.traderURN}
          </Descriptions.Item>
          <Descriptions.Item label="Short Name">
            {this.traderData.shortName}
          </Descriptions.Item>
          <Descriptions.Item label="Spices Board Licence">
            {this.traderData.spicesBoardLicence}
          </Descriptions.Item>
          <Descriptions.Item label="Taxpayer Identification">
            {this.traderData.tinNo}
          </Descriptions.Item>
          <Descriptions.Item label="CST">
            {this.traderData.cstNo}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {this.traderData.address}
          </Descriptions.Item>
          <Descriptions.Item label="Active From">
            {moment(this.traderData.createdOn).format("DD MMM YYYY")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    );
  }
}

export default TraderDetails;
