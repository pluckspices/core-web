import React, { Component } from "react";
import { Table, Space, Modal, notification } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import PlanterDetails from "./PlanterDetails";
//import UpdateAuction from "./UpdateAuction";

const { Column } = Table;

class PlantersList extends Component {
  state = {
    plantersList: [],
    planterData: [],
    visiblePlanterDetails: false,
    visibleEditPlanter: false,
  };
  componentDidMount() {
    this.getPlantersList();
  }

  getPlantersList = () => {
    axios
      .get("http://localhost:4000/v1/member-management/planters/")
      .then((res) => {
        this.setState({ plantersList: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  actionPlanter(record) {
    return (
      <Space size="middle">
        <a onClick={() => this.editAuctionDetails(record)}>Update</a>
        <a onClick={() => this.planterDeleteConfirm(record)}>Delete</a>
      </Space>
    );
  }

  planterDeleteConfirm(data) {
    Modal.confirm({
      title: `${data.planterURN}`,
      icon: <ExclamationCircleOutlined />,
      content: `Do You want to delete Planter ${data.planterURN}`,
      okText: "Delete Planter",
      cancelText: "Cancel",
      onOk: () => this.planterDelete(data),
    });
  }

  planterDelete(data) {
    const planterURN = data.planterURN;
    axios
      .delete(
        `http://localhost:4000/v1/member-management/planter/${planterURN}`
      )
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: res.data.planterURN,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
          this.getPlantersList();
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 404) {
          notification.open({
            message: response.data.planterURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          notification.open({
            message: response.data.planterURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          console.log("unknown error");
        }
      });
  }

  viewPlanterDetails(data) {
    this.setState({
      visiblePlanterDetails: true,
      planterData: data,
    });
  }

  viewPlanterDetailsClose = () => {
    this.setState({
      visiblePlanterDetails: false,
      planterData: [],
    });
  };

  planterName = (record) => {
    return `${record.firstName} ${record.lastName}`;
  };

  render() {
    const { plantersList, visiblePlanterDetails, planterData } = this.state;
    return (
      <>
        <Table
          rowKey={(plantersList) => plantersList.planterURN}
          dataSource={plantersList}
        >
          <Column
            title="Planter URN"
            dataIndex="planterURN"
            key="planterURN"
            render={(planterId, record) => (
              <Space>
                <a onClick={() => this.viewPlanterDetails(record)}>
                  {planterId}
                </a>
              </Space>
            )}
          />
          <Column
            title="Name"
            key="fullName"
            render={(record) => this.planterName(record)}
          />
          <Column title="CR Number" dataIndex="crNumber" key="crNumber" />
          <Column
            title="Phone Number"
            dataIndex="phoneNumber"
            key="phoneNumber"
          />
          <Column
            title="Actions"
            key="action"
            render={(record) => this.actionPlanter(record)}
          />
        </Table>
        {visiblePlanterDetails ? (
          <PlanterDetails
            visible={visiblePlanterDetails}
            onClose={this.viewPlanterDetailsClose}
            planterData={planterData}
          />
        ) : null}
        {/* {visibleEditHolding ? (
          <UpdateAuction
            visible={visibleEditHolding}
            onClose={this.editAuctionClose}
            holdingData={holdingData}
            refreshHoldings={this.getauctionHoldingData}
          />
        ) : null} */}
      </>
    );
  }
}

export default PlantersList;
