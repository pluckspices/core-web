import React, { useState, useEffect } from "react";
import { Routes, Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Tag, Dropdown, Modal } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  ReconciliationOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import GuardedRoute from "../../utils/GuardedRoute";

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
  console.log("Navigation called");
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      autoLogout();
    }, 30  * 60 * 1000);
  }, []);

  let navigate = useNavigate();

  function onCollapse(collapsed) {
    setCollapsed(collapsed);
  }

  const logout = () => {
    Modal.confirm({
      title: "Do you want to Logout?",
      onOk() {
        localStorage.clear();
        navigate("/login");
      },
      okText: "Logout",
      cancelText: "Cancel",
    });
  };

  const autoLogout = () => {
    Modal.info({
      title: "Auto Logout",
      content: (
        <div>
          <p>Please login to continue</p>
        </div>
      ),
      onOk() {
        localStorage.clear();
        navigate("/login");
      },
    });
  };

  const menu = (
    <Menu style={{ width: 150 }}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const sideMargin = collapsed ? 80 : 200;
  const headerWidth = collapsed ? "95%" : "85%";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["dash"]} mode="inline">
          <Menu.Item key="dash" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <SubMenu key="auction" icon={<ToolOutlined />} title="Services">
            <Menu.Item key="auc-man">
              <Link to="auctionmanager">Auctions</Link>
            </Menu.Item>
            <Menu.Item key="auc-pool">
              <Link to="auctionpooling">Commodity</Link>
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
          <SubMenu
            key="system"
            icon={<SettingOutlined />}
            title="System"
          ></SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: sideMargin }}>
        <Header
          className="site-layout-background"
          style={{ position: "fixed", zIndex: 1, width: headerWidth }}
        >
          <Tag className="env-tag" color="#87d068">
            {process.env.NODE_ENV}
          </Tag>
          <Dropdown overlay={menu} placement="bottomRight">
            <Avatar className="user-avatar" />
          </Dropdown>
        </Header>
        <Content style={{ padding: "0 30px", marginTop: 90 }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <GuardedRoute path="/" element={<Dashboard />} />
              <GuardedRoute
                path="auctionmanager"
                element={<AuctionManager />}
              />
              <GuardedRoute path="auctionpooling" element={<Pooling />} />
              <GuardedRoute path="members/planter" element={<Planter />} />
              <GuardedRoute path="members/dealer" element={<Dealer />} />
              <GuardedRoute path="members/bidder" element={<Bidder />} />
              <GuardedRoute path="members/trader" element={<Trader />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          nithin.antony Designs ©2020
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navigation;
