import React, { useState } from "react";
import {
  Form,
  Button,
  Select,
  Steps,
  Spin,
  notification,
  InputNumber,
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";
import axios from "axios";

import { BASE_URL } from "../../../../constants";

import "./index.scss";

const { Step } = Steps;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const poolingMember = () => {
  const [membertypeId, SetMembertypeId] = useState(0);
  const [fetching, SetFetching] = useState(false);
  const [data, SetData] = useState([]);

  const handleMembertypeChange = (value) => {
    SetMembertypeId(value);
    SetData([]);
  };

  const fetchMember = debounce((value) => {
    SetFetching(true);
    let membertype = membertypeId;
    switch (membertype) {
      case 21:
        axios
          .get(`${BASE_URL}/member-management/planters/${value}`)
          .then((res) => {
            let planters = res.data.planters;
            let data = [];
            planters.forEach((planter) => {
              let planterObj = {
                text: `${planter.planterURN} (${planter.firstName} ${planter.lastName})`,
                value: planter._id,
              };
              data.push(planterObj);
            });
            SetData(data);
            SetFetching(false);
          })
          .catch((err) => {
            SetFetching(false);
          });
        break;
      case 22:
        axios
          .get(`${BASE_URL}/member-management/dealers/${value}`)
          .then((res) => {
            let dealers = res.data.dealers;
            let data = [];
            dealers.forEach((dealer) => {
              let dealerObj = {
                text: `${dealer.dealerURN} (${dealer.dealerName})`,
                value: dealer._id,
              };
              data.push(dealerObj);
            });
            SetData(data);
            SetFetching(false);
          })
          .catch((err) => {
            SetFetching(false);
          });
        break;
      default:
        SetFetching(false);
        break;
    }
  }, 800);

  return (
    <>
      <Form.Item
        label="Member Type"
        name="memberType"
        rules={[
          {
            required: true,
            message: "Please select member!",
          },
        ]}
      >
        <Select
          style={{ width: 350 }}
          placeholder="Select member type"
          onChange={handleMembertypeChange}
        >
          <Option value={21}>Planter</Option>
          <Option value={22}>Dealer</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Member"
        name="memberId"
        rules={[
          {
            required: true,
            message: "Member URN is required!",
          },
        ]}
      >
        <Select
          showSearch
          labelInValue
          placeholder="Search for a member"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          showArrow={false}
          onSearch={fetchMember}
          disabled={membertypeId === 0}
          style={{ width: 350 }}
        >
          {data.map((d) => (
            <Option key={d.value} value={d.value}>
              {d.text}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

const poolingItem = () => {
  return (
    <>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Please input Quantity!",
          },
        ]}
      >
        <InputNumber
          min={0}
          style={{ width: 350 }}
          addonAfter="K"
          placeholder="Quantity"
        />
      </Form.Item>
      <Form.Item
        label="Collection Centre"
        name="collectionCentre"
        rules={[
          {
            required: true,
            message: "Please select Collection Centre!",
          },
        ]}
      >
        <Select style={{ width: 350 }} placeholder="Select Centre">
          <Option value="kattappana">Kattappana</Option>
          <Option value="idukki">Idukki</Option>
          <Option value="nedumkandam">Nedumkandam</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Litre Weight"
        name="litreWeight"
        rules={[
          {
            required: true,
            message: "Please input Litre Weight!",
          },
        ]}
      >
        <InputNumber
          min={0}
          style={{ width: 350 }}
          addonAfter="g"
          placeholder="Litre Weight"
        />
      </Form.Item>
      <Form.Item
        label="Grade"
        name="grade"
        rules={[
          {
            required: true,
            message: "Please select grade!",
          },
        ]}
      >
        <Select style={{ width: 350 }} placeholder="Select Grade">
          <Option value="a">A</Option>
          <Option value="b">B</Option>
          <Option value="c">C</Option>
        </Select>
      </Form.Item>
    </>
  );
};

const auctionSelection = () => {
  const [poolCategory, SetPoolCategory] = useState(0);
  const [openAuctions, SetOpenAuctions] = useState([]);
  const [openLots, SetOpenLots] = useState([]);

  const handlePoolCategoryChange = (value) => {
    SetPoolCategory(value);
    if (value === 27) {
      axios
        .get(BASE_URL + "/auction-management/auctions/holding/12")
        .then((res) => {
          SetOpenAuctions(res.data.auctions);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      SetOpenAuctions([]);
    }
  };

  const handleOpenAuctionChange = (value) => {
    openAuctions.filter((auction) => {
      if (auction._id === value) {
        SetOpenLots(auction.unoccupiedLots);
      }
    });
  };

  return (
    <>
      <Form.Item
        label="Auction / Stock"
        name="poolCategory"
        rules={[
          {
            required: true,
            message: "please select pooling category!",
          },
        ]}
      >
        <Select
          style={{ width: 350 }}
          placeholder="Auction / Stock"
          onChange={handlePoolCategoryChange}
        >
          <Option value={26}>Stock</Option>
          <Option value={27}>Auction</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Auction No"
        name="auctionNo"
        rules={[
          {
            required: poolCategory === 27 ? true : false,
            message: "please select auction no!",
          },
        ]}
      >
        <Select
          style={{ width: 350 }}
          placeholder="Select Auction"
          onChange={handleOpenAuctionChange}
          disabled={poolCategory === 0 || poolCategory === 26}
        >
          {openAuctions.map((auction) => (
            <Option key={auction._id} value={auction._id}>
              {auction.auctionId}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Lot Number"
        name="lotNo"
        rules={[
          {
            required: poolCategory === 27 ? true : false,
            message: "please select lot no!",
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 350 }}
          placeholder="Select Lot"
          optionFilterProp="children"
          filterOption={(input) => input}
          disabled={poolCategory === 0 || poolCategory === 26}
        >
          {openLots.map((lot) => (
            <Option key={lot} value={lot}>
              {lot}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

const CreateItem = () => {
  const [current, SetCurrent] = useState(0);
  const [isSubmitting, SetIsSubmitting] = useState(false);
  const [buttonName, SetButtonName] = useState("Create Pool");
  const [memberData, SetMemberData] = useState([]);
  const [itemData, SetItemData] = useState([]);
  const [auctionData, SetAuctionData] = useState([]);
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Member Selection",
      content: poolingMember(),
    },
    {
      title: "Item Pooling",
      content: poolingItem(),
    },
    {
      title: "Auction/Stock",
      content: auctionSelection(),
    },
  ];

  const handleSubmit = (values) => {
    switch (current) {
      case 0:
        SetMemberData(values);
        break;
      case 1:
        SetItemData(values);
        break;
      default:
        break;
    }
    if (current < steps.length - 1) {
      next();
    } else {
      SetIsSubmitting(true);
      SetButtonName("Creating Pool");
      let memberPicked = memberData;
      let itemDetails = itemData;
      let poolPicked = values;
      let data;
      if (poolPicked.poolCategory === 27) {
        data = {
          memberId: memberPicked.memberId.value,
          poolCategory: poolPicked.poolCategory,
          auctionId: poolPicked.auctionNo,
          lotNo: poolPicked.lotNo,
          quantity: itemDetails.quantity,
          collectionCentre: itemDetails.collectionCentre,
          grade: itemDetails.grade,
          litreWeight: itemDetails.litreWeight,
        };
      } else {
        data = {
          memberId: memberPicked.memberId.value,
          poolCategory: poolPicked.poolCategory,
          quantity: itemDetails.quantity,
          collectionCentre: itemDetails.collectionCentre,
          grade: itemDetails.grade,
          litreWeight: itemDetails.litreWeight,
        };
      }

      axios
        .post(BASE_URL + "/commodity-management/commodity", { data })
        .then((response) => {
          if (response.status === 201) {
            notification.open({
              message: `TEST`,
              description: response.data.message,
              icon: <CheckCircleOutlined style={{ color: "#a0d911" }} />,
            });
            form.resetFields();
            SetIsSubmitting(false);
            SetButtonName("Create Pool");
            SetCurrent(0);
          }
        })
        .catch((error) => {
          let response = error.response;
          SetIsSubmitting(false);
          SetButtonName("Create Pool");
          SetCurrent(0);
          if (response && response.status === 409) {
            notification.open({
              message: `Lot ${response.data.details.lotNo}`,
              description: response.data.message,
              icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
            });
          } else if (response && response.status === 500) {
            notification.open({
              message: "ERROR",
              description: response.data.message,
              icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
            });
          } else {
            notification.open({
              message: "ERROR",
              description: "Unexcepted error occured! Please try again.",
              icon: <CloseCircleOutlined style={{ color: "#f5222d" }} />,
            });
          }
        });
    }
  };

  const next = () => {
    const currentIndex = current + 1;
    SetCurrent(currentIndex);
  };

  const prev = () => {
    const currentIndex = current - 1;
    SetCurrent(currentIndex);
  };
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        <Form
          {...layout}
          form={form}
          layout="horizontal"
          name="pooling"
          onFinish={handleSubmit}
        >
          {steps[current].content}
          <div className="steps-action">
            <Form.Item>
              {current < steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  {buttonName}
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: "0 8px" }} onClick={prev}>
                  Previous
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateItem;
