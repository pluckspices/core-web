import React from "react";
import { Tag } from "antd";
import { HOLDING_STATUS } from "../../../../../constants";

const AuctionStatus = (props) => {
  function setStatus(statusId) {
    let statusTag;
    switch (statusId) {
      case 11:
        statusTag = (
          <Tag color="magenta" key={statusId}>
            {HOLDING_STATUS.UPCOMMING}
          </Tag>
        );
        break;
      case 12:
        statusTag = (
          <Tag color="green" key={statusId}>
            {HOLDING_STATUS.POOLING}
          </Tag>
        );
        break;
      case 13:
        statusTag = (
          <Tag color="red" key={statusId}>
            {HOLDING_STATUS.TRADING}
          </Tag>
        );
        break;
      case 14:
        statusTag = (
          <Tag color="cyan" key={statusId}>
            {HOLDING_STATUS.SETTLEMENT}
          </Tag>
        );
        break;
      case 15:
        statusTag = (
          <Tag color="red" key={statusId}>
            {HOLDING_STATUS.CLOSED}
          </Tag>
        );
        break;

      default:
        statusTag = (
          <Tag color="volcano" key={statusId}>
            {HOLDING_STATUS.UNKNOWN}
          </Tag>
        );
        break;
    }
    return statusTag;
  }

  return <>{setStatus(props.status)}</>;
};

export default AuctionStatus;
