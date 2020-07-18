import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import routes from "../../config";
import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["dash"]} mode="inline">
            <Menu.Item key="dash" icon={<HomeOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <SubMenu
              key="auction"
              icon={<UserOutlined />}
              title="Auctions Panel"
            >
              <Menu.Item key="auc-man">
                <Link to="/auctionmanager">Auction Manager</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="users"
              icon={<TeamOutlined />}
              title="Users Management"
            >
              <Menu.Item key="planter">
                <Link to="/users/planter">Planter</Link>
              </Menu.Item>
              <Menu.Item key="dealer">
                <Link to="/users/dealer">Dealer</Link>
              </Menu.Item>
              <Menu.Item key="bidder">
                <Link to="/users/bidder">Bidder</Link>
              </Menu.Item>
              <Menu.Item key="trader">
                <Link to="/users/trader">Trader</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                {routes.map(({ path, exact, Component }) => (
                  <Route
                    key={path}
                    path={path}
                    exact={exact}
                    component={Component}
                  />
                ))}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            PluckSpices Design ©2020
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
