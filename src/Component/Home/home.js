import React, { useState } from "react"
import CommonLayout from '../../core/common/layout/ThemeLayout/Layout'
import useHome from "./Hook/useHome"
import { Button, Col, Row } from "antd"
import './home.scss'
import './home.scss'

function Home() {
  const[{
    videos,fillterValue
  },
  {
    renderVideos, getAllVideoTitle, allVideos, getAllVideo
  }
] = useHome()
  return (
    <CommonLayout>
      <div className="titles mb-20">
        <div className={`title ${fillterValue === 'all' ? 'active' : ''}`} onClick={getAllVideo}>All</div>
          {
            [...getAllVideoTitle()]?.map(item => <div onClick={() => {
              allVideos(item)}} className={`title ${fillterValue === item ? 'active' : ''}`}>{item}</div>)
          }
      </div>
      <Row gutter={16}>
        {
          renderVideos()
        }
      </Row>
      <h1>Home</h1>
    </CommonLayout>
  )
}

export default Home