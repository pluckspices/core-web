import React, { Component } from "react";
import { Table, Space, Modal, notification } from "antd";
import {
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../../constants";
import DealerDetails from "./DealerDetails";
import UpdateDealer from "./UpdateDealer";

const { Column } = Table;

class DealersList extends Component {
  state = {
    dealersList: [],
    dealerData: [],
    visibleDealerDetails: false,
    visibleEditDealer: false,
  };
  componentDidMount() {
    this.getDealersList();
  }

  getDealersList = () => {
    axios
      .get(BASE_URL + "/member-management/dealers")
      .then((res) => {
        this.setState({ dealersList: res.data.dealers });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  actionPlanter(record) {
    return (
      <Space size="middle">
        <a onClick={() => this.editDealerDetails(record)}>Update</a>
        <a onClick={() => this.dealerDeleteConfirm(record)}>Delete</a>
      </Space>
    );
  }

  dealerDeleteConfirm(data) {
    Modal.confirm({
      title: `${data.dealerURN}`,
      icon: <ExclamationCircleOutlined />,
      content: `Do You want to delete Dealer ${data.dealerURN}`,
      okText: "Delete Dealer",
      cancelText: "Cancel",
      onOk: () => this.dealerDelete(data),
    });
  }

  dealerDelete(data) {
    const dealerURN = data.dealerURN;
    axios
      .delete(`${BASE_URL}/member-management/dealer/${dealerURN}`)
      .then((res) => {
        if (res.status === 200) {
          notification.open({
            message: res.data.dealerURN,
            description: res.data.message,
            icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
          });
          this.getDealersList();
        }
      })
      .catch((error) => {
        let response = error.response;
        if (response.status === 404) {
          notification.open({
            message: response.data.dealerURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else if (response.status === 500) {
          notification.open({
            message: response.data.dealerURN,
            description: response.data.message,
            icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
          });
        } else {
          console.log("unknown error");
        }
      });
  }

  viewDealerDetails(data) {
    this.setState({
      visibleDealerDetails: true,
      dealerData: data,
    });
  }

  viewDealerDetailsClose = () => {
    this.setState({
      visibleDealerDetails: false,
      dealerData: [],
    });
  };

  editDealerDetails(data) {
    this.setState({
      visibleEditDealer: true,
      dealerData: data,
    });
  }

  editDealerClose = () => {
    this.setState({
      visibleEditDealer: false,
      dealerData: [],
    });
  };

  planterName = (record) => {
    return `${record.firstName} ${record.lastName}`;
  };

  render() {
    const {
      dealersList,
      visibleDealerDetails,
      visibleEditDealer,
      dealerData,
    } = this.state;
    return (
      <>
        <Table
          rowKey={(dealersList) => dealersList.dealerURN}
          dataSource={dealersList}
        >
          <Column
            title="Dealer URN"
            dataIndex="dealerURN"
            key="dealerURN"
            render={(dealerURN, record) => (
              <Space>
                <a onClick={() => this.viewDealerDetails(record)}>
                  {dealerURN}
                </a>
              </Space>
            )}
          />
          <Column title="Name" dataIndex="dealerName" key="fullName" />
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
        {visibleDealerDetails ? (
          <DealerDetails
            visible={visibleDealerDetails}
            onClose={this.viewDealerDetailsClose}
            dealerData={dealerData}
          />
        ) : null}
        {visibleEditDealer ? (
          <UpdateDealer
            visible={visibleEditDealer}
            onClose={this.editDealerClose}
            dealerData={dealerData}
            refreshDate={this.getDealersList}
          />
        ) : null}
      </>
    );
  }
}

export default DealersList;
