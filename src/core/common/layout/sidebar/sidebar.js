import Sider from "antd/es/layout/Sider"
import React, { useState } from "react"
import SidebarConstant from "../../../../constant/sidebarConstant"
import { NavLink } from "react-router-dom";
import './sidebar.scss'

function Sidebar() {
  return (
    <Sider
      width={250}
      style={{
        overflow: "auto",
        height: "calc(100vh - 70px)",
        position: "sticky",
        left: "0",
        top: "70px",
        backgroundColor: "#fff"
      }}
    >
      <div className="sidebar_main">
        {
          SidebarConstant && SidebarConstant?.length > 0 && SidebarConstant?.map((item, index) => (
            <NavLink key={index} to={item?.link} 
            className={`side_menu`}>
              {item?.icon}
              <h4 key={index}>{item?.title}</h4>
            </NavLink>
          ))
        }
      </div>
    </Sider>
  )
}

export default Sidebar;