import React, { useState, useEffect } from "react";
import { Table, Select } from "antd";
import axios from "axios";
import moment from "moment";

import { BASE_URL } from "../../../../constants";
import "./index.scss";

const { Option } = Select;
const { Column } = Table;

const AuctionPooledList = () => {
  const [openAuctions, SetOpenAuctions] = useState([]);
  const [pooledItems, SetPooledItems] = useState([]);
  const [isTableLoading, SetIsTableLoading] = useState(false);

  useEffect(() => {
    axios
      .get(BASE_URL + "/auction-management/auctions/holding/12")
      .then((res) => {
        SetOpenAuctions(res.data.auctions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSerachDetails = (value) => {
    SetIsTableLoading(true);
    console.log(value);
    const auctionId = value;
    axios
      .get(BASE_URL + `/commodity-management/commodity/search/${auctionId}`)
      .then((res) => {
        console.log(res);
        SetPooledItems(res.data.commodities);
        SetIsTableLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetIsTableLoading(false);
      });
  };

  const tableHeader = () => {
    return (
      <>
        <Select
          style={{ width: 250 }}
          placeholder="Select Auction"
          onChange={handleSerachDetails}
        >
          {openAuctions.map((auction) => (
            <Option key={auction._id} value={auction._id}>
              {auction.auctionId}
            </Option>
          ))}
        </Select>
      </>
    );
  };
  return (
    <Table
      rowKey={(pooledItems) => pooledItems._id}
      dataSource={pooledItems}
      title={() => tableHeader()}
      loading={isTableLoading}
    >
      <Column title="Lot No" dataIndex="lotNo" key="lotNo" />
      <Column title="Quantity" dataIndex="quantity" key="quantity" />
      <Column title="Grade" dataIndex="grade" key="grade" />
      <Column title="Litre Weight" dataIndex="litreWeight" key="litreWeight" />
      <Column
        title="Pooled On"
        dataIndex="pooledOn"
        key="pooledOn"
        render={(pooledOn) => moment(pooledOn).format("DD MMM YYYY")}
      />
      <Column
        title="Collection Centre"
        dataIndex="collectionCentre"
        key="collectionCentre"
      />
      <Column title="Member Details" dataIndex="memberName" key="memberName" />
    </Table>
  );
};

export default AuctionPooledList;
