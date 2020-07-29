import React, { Component } from "react";
import { Table, Tag, Space, Modal, notification } from "antd";
import axios from "axios";

const { Column } = Table;

class PlantersList extends Component {
  state = {
    plantersList: [],
  };
  componentDidMount() {
    this.getPlantersList();
  }

  getPlantersList = () => {
    axios
      .get("http://localhost:4000/planter/list")
      .then((res) => {
        console.log(res);
        this.setState({ plantersList: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  planterName = (record) => {
    return `${record.firstName} ${record.lastName}`;
  };

  render() {
    const { plantersList } = this.state;
    return (
      <>
        <Table
          rowKey={(plantersList) => plantersList.planterURN}
          dataSource={plantersList}
        >
          <Column title="Planter URN" dataIndex="planterURN" key="planterURN" />
          <Column
            title="Name"
            key="fullName"
            render={(record) => this.planterName(record)}
          />
          <Column title="CR Number" dataIndex="crNumber" key="crNumber" />
          <Column
            title="Actions"
            key="action"
            //render={(record) => this.viewAuction(record)}
          />
        </Table>
      </>
    );
  }
}

export default PlantersList;
