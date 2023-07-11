import { Header } from "antd/es/layout/layout";
import React from "react"
import './header.scss'
import {
  MenuOutlined, NotificationFilled, PlusCircleOutlined
} from "@ant-design/icons";
import CustomInput from "../../input/input";

function CustomHeader() {
  return (
    <Header className="header">
        <div className="left header-section">
          <MenuOutlined style={{ fontSize: '22px' }} />
          <div className="ml-20 logo">
            <img
              height={35}
            src="/youtube.png" />
          </div>
        </div>
        <div xs={8} className="center header-section">
          <CustomInput placeholder="Search.." size='large' />
        </div>
        <div xs={8} className="right header-section">
          <div className="mr-20">
            <PlusCircleOutlined />
          </div>
          <div>
            <NotificationFilled />
          </div>
        </div>
    </Header>
  )
}

export default CustomHeader;