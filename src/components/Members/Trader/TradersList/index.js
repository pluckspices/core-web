import React, { Component } from "react";
import { Table, Space, Modal, notification } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../constants";
import TraderDetails from "./TraderDetails";
import UpdateTrader from "./UpdateTrader";

const { Column } = Table;

class TradersList extends Component {
  state = {
    tradersList: [],
    traderData: [],
    visibleTraderDetails: false,
    visibleEditTrader: false,
  };
  componentDidMount() {
    this.getTradersList();
  }

  getTradersList = () => {
    axios
      .get(BASE_URL + "/member-management/traders")
      .then((res) => {
        this.setState({ tradersList: res.data });
      })
      .catch((error) => {
        let response = error.response;
        if (response && response.status === 500) {
          notification.open({
            message: "Sever Error",
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        }
      });
  };

  actionPlanter(record) {
    return (
      <Space size="middle">
        <a onClick={() => this.editTraderDetails(record)}>Update</a>
        <a onClick={() => this.traderDeleteConfirm(record)}>Delete</a>
      </Space>
    );
  }

  traderDeleteConfirm(data) {
    Modal.confirm({
      title: `${data.traderURN}`,
      icon: <ExclamationCircleOutlined />,
      content: `Do You want to delete Trader ${data.traderURN}`,
      okText: "Delete Trader",
      cancelText: "Cancel",
      onOk: () => this.traderDelete(data),
    });
  }

  traderDelete(data) {
    const traderURN = data.traderURN;
    axios
      .delete(`${BASE_URL}/member-management/trader/${traderURN}`)
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: res.data.traderURN,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
          this.getTradersList();
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response && response.status === 404) {
          notification.open({
            message: response.data.traderURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response && response.status === 500) {
          notification.open({
            message: response.data.traderURN,
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
      visibleTraderDetails: true,
      traderData: data,
    });
  }

  viewPlanterDetailsClose = () => {
    this.setState({
      visibleTraderDetails: false,
      traderData: [],
    });
  };

  editTraderDetails(data) {
    this.setState({
      visibleEditTrader: true,
      traderData: data,
    });
  }

  editDealerClose = () => {
    this.setState({
      visibleEditTrader: false,
      traderData: [],
    });
  };

  planterName = (record) => {
    return `${record.firstName} ${record.lastName}`;
  };

  render() {
    const {
      tradersList,
      visibleTraderDetails,
      visibleEditTrader,
      traderData,
    } = this.state;
    return (
      <>
        <Table
          rowKey={(tradersList) => tradersList.traderURN}
          dataSource={tradersList}
        >
          <Column
            title="Trader URN"
            dataIndex="traderURN"
            key="traderURN"
            render={(planterId, record) => (
              <Space>
                <a onClick={() => this.viewPlanterDetails(record)}>
                  {planterId}
                </a>
              </Space>
            )}
          />
          <Column title="Name" dataIndex="traderName" key="fullName" />
          <Column title="Short Name" dataIndex="shortName" key="shortName" />
          <Column
            title="Actions"
            key="action"
            render={(record) => this.actionPlanter(record)}
          />
        </Table>
        {visibleTraderDetails ? (
          <TraderDetails
            visible={visibleTraderDetails}
            onClose={this.viewPlanterDetailsClose}
            traderData={traderData}
          />
        ) : null}
        {visibleEditTrader ? (
          <UpdateTrader
            visible={visibleEditTrader}
            onClose={this.editDealerClose}
            traderData={traderData}
            refreshDate={this.getTradersList}
          />
        ) : null}
      </>
    );
  }
}

export default TradersList;
