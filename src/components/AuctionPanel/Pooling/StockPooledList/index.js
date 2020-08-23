import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import moment from "moment";

import { BASE_URL } from "../../../../constants";

const { Column } = Table;

const StockPooledList = () => {
  const [stockItems, SetStockItems] = useState([]);
  const [isTableLoading, SetIsTableLoading] = useState(false);

  useEffect(() => {
    SetIsTableLoading(true);
    axios
      .get(BASE_URL + "/commodity-management/commodity/stock")
      .then((res) => {
        console.log(res);
        SetStockItems(res.data.commodities);
        SetIsTableLoading(false);
      })
      .catch((error) => {
        SetIsTableLoading(false);
        console.log(error);
      });
  }, []);

  const handleSerachDetails = (value) => {
    SetIsTableLoading(true);
    console.log(value);
    const auctionId = value;
    axios
      .get(BASE_URL + `/commodity-management/commodity/${auctionId}`)
      .then((res) => {
        console.log(res);
        SetStockItems(res);
        SetIsTableLoading(false);
      })
      .catch((error) => {
        console.log(error);
        SetIsTableLoading(false);
      });
  };

  return (
    <Table
      rowKey={(stockItems) => stockItems._id}
      dataSource={stockItems}
      loading={isTableLoading}
    >
      <Column title="Member Details" dataIndex="memberName" key="memberName" />
      <Column
        title="Pooled On"
        dataIndex="pooledOn"
        key="pooledOn"
        render={(pooledOn) => moment(pooledOn).format("DD MMM YYYY")}
      />
      <Column title="Quantity" dataIndex="quantity" key="quantity" />
      <Column title="Grade" dataIndex="grade" key="grade" />
      <Column title="Litre Weight" dataIndex="litreWeight" key="litreWeight" />
      <Column
        title="Collection Centre"
        dataIndex="collectionCentre"
        key="collectionCentre"
      />
    </Table>
  );
};

export default StockPooledList;
