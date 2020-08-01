import React, { Component } from "react";
import { Drawer, Descriptions, Statistic, Row, Col } from "antd";

class PlanterDetails extends Component {
  planterData = this.props.planterData;
  drawerTittle() {
    return (
      <>
        <h2>{this.planterData.planterURN}</h2>
      </>
    );
  }

  planterName() {
    return `${this.planterData.firstName} ${this.planterData.lastName}`;
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
        <Descriptions title="Planter Info" layout="vertical">
          <Descriptions.Item label="Full Name">
            {this.planterName()}
          </Descriptions.Item>
          <Descriptions.Item label="Planter URN">
            {this.planterData.planterURN}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {this.planterData.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="CR Number">
            {this.planterData.crNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {this.planterData.address}
          </Descriptions.Item>
        </Descriptions>
        <h3>Planter Statistic</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Auctions Participated " value={10} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Avg Price"
              prefix={"₹"}
              value={1200.67}
              valueStyle={{ color: "#3f8600" }}
            />
          </Col>
        </Row>
      </Drawer>
    );
  }
}

export default PlanterDetails;
