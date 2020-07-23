import React from "react";
import { Tag } from "antd";
import HoldingStatus from "../../../../../constants/appConstants";

const AuctionStatus = (props) => {
  function setStatus(statusId) {
    let statusTag;
    switch (statusId) {
      case 11:
        statusTag = (
          <Tag color="magenta" key={statusId}>
            {HoldingStatus.UPCOMMING}
          </Tag>
        );
        break;
      case 12:
        statusTag = (
          <Tag color="green" key={statusId}>
            {HoldingStatus.POOLING}
          </Tag>
        );
        break;
      case 13:
        statusTag = (
          <Tag color="red" key={statusId}>
            {HoldingStatus.TRADING}
          </Tag>
        );
        break;
      case 14:
        statusTag = (
          <Tag color="cyan" key={statusId}>
            {HoldingStatus.SETTLEMENT}
          </Tag>
        );
        break;
      case 15:
        statusTag = (
          <Tag color="red" key={statusId}>
            {HoldingStatus.CLOSED}
          </Tag>
        );
        break;

      default:
        statusTag = (
          <Tag color="volcano" key={statusId}>
            {HoldingStatus.UNKNOWN}
          </Tag>
        );
        break;
    }
    return statusTag;
  }

  return <>{setStatus(props.status)}</>;
};

export default AuctionStatus;
