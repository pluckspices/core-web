import React, { Component } from "react";
import { Card, Col, Row } from "antd";
class Dahboard extends Component {
  render() {
    return (
      <>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Card title">
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title">
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title">
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title">
              Card content
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Dahboard;
