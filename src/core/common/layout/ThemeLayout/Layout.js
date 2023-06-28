import { Layout } from "antd";
import React from "react";
import Sidebar from "../sidebar/sidebar";
import CustomHeader from "../header/header";
import './Layout.scss'

function AppLayout({ children }) {
  const { Content } = Layout;

  return (
    <Layout>
      <CustomHeader />
      <Layout className="sidebar_content">
        <Sidebar />
        <Layout className="site-layout">
          <Content className="site-background">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout;