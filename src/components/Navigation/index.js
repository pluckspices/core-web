import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Avatar, Tag } from "antd";
import { TeamOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../store/auth";

import Dashboard from "../Dashboard";
import AuctionManager from "../AuctionPanel/AuctionManager";
import Pooling from "../AuctionPanel/Pooling";
import Planter from "../Members/Planter";
import Dealer from "../Members/Dealer";
import Bidder from "../Members/Bidder";
import Trader from "../Members/Trader";

import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isAuth = AuthStore.getIsAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["dash"]} mode="inline">
          <Menu.Item key="dash" icon={<HomeOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <SubMenu key="auction" icon={<UserOutlined />} title="Auctions">
            <Menu.Item key="auc-man">
              <Link to="auctionmanager">Auction Manager</Link>
            </Menu.Item>
            <Menu.Item key="auc-pool">
              <Link to="auctionpooling">Pooling</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="members" icon={<TeamOutlined />} title="Members">
            <Menu.Item key="planter">
              <Link to="members/planter">Planter</Link>
            </Menu.Item>
            <Menu.Item key="dealer">
              <Link to="members/dealer">Dealer</Link>
            </Menu.Item>
            <Menu.Item key="bidder">
              <Link to="members/bidder">Bidder</Link>
            </Menu.Item>
            <Menu.Item key="trader">
              <Link to="members/trader">Trader</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Tag className="env-tag" color="#87d068">
            {process.env.NODE_ENV}
          </Tag>
          <Avatar className="user-avatar" />
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="auctionmanager" element={<AuctionManager />} />
              <Route path="auctionpooling" element={<Pooling />} />
              <Route path="members/planter" element={<Planter />} />
              <Route path="members/dealer" element={<Dealer />} />
              <Route path="members/bidder" element={<Bidder />} />
              <Route path="members/trader" element={<Trader />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PluckSpices Design ©2020
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
