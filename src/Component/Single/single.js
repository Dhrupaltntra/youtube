import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Empty, Row } from "antd";
import { CaretRightOutlined, DislikeOutlined, LikeOutlined, PauseOutlined } from "@ant-design/icons";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import CommonLayout from '../../core/common/layout/ThemeLayout/Layout'
import './single.scss'
import ReactPlayer from "react-player";
import useSingle from "./Hook/useSingle";
import TextArea from "antd/es/input/TextArea";
import ButtonGroup from "antd/es/button/button-group";

function SingleVideo() {
  const navigate = useNavigate()
  const videoRef = useRef(null);
  const location = useLocation()
  const videoData = location.state
  const [isPlaying, setIsPlaying ] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [isEmpty, setIsEmpty] = useState('')
  const [commentsList, setCommentsList] = useState([])

  const [
    {
      videoLike,
      videoDisLike
    },{
      likeVideo,
      disLikeVideo,
      renderComments,
      renderRecommandedVideos
    }
  ] = useSingle()

  const rewindHandler = () => {
    videoRef.current.seekTo(videoRef.current.getCurrentTime() == 0);
  };

    const handleChange = (e) => {
      setIsEmpty(e.target.value)
    }

    const addContenet = () => {
      setCommentsList(arr => [...arr, {
        name : 'Dhrupal',
        comment : isEmpty
      }])
      setIsEmpty('')
    }
    
    const removeComment = () => {
      setIsEmpty('')
      setIsComment(false)
    }

    const userDetail = JSON.parse(localStorage.getItem('LoginDetails'));

    return (
    <CommonLayout>
      <Row gutter={40} className="youtube_single">
        <Col lg={18} className="left_section">
          <ReactPlayer 
            playing={true}
            ref={videoRef}
            controls={true}
            width={'100%'}
            height={'500px'}
            url={`https://www.youtube.com/watch?v=${videoData?.id}`}
            
          />
          <div>
            <LikeOutlined onClick={likeVideo} style={{ fontSize: '32px', color: '#08c' }} />
            {videoLike}
          </div>
          <div>
            <DislikeOutlined onClick={disLikeVideo} style={{ fontSize: '32px', marginLeft: '20px', color: '#08c' }} />
            {videoDisLike}
          </div>
          <div onClick={rewindHandler}>Start</div>

          <div className="comment mt-20">
            <TextArea placeholder="Add Comment" 
            onFocus={() => {
              console.log('userDetail: ', userDetail)
              if(!userDetail?.name) return navigate('/login')
              setIsComment(true)}}
            onChange={handleChange}
            // defaultValue={isEmpty}
            value={isEmpty}
            />

            {isComment &&
              <Row justify="end">
                <ButtonGroup className="mt-20 button_grou">
                  <Button className="mr-20" onClick={removeComment}>Cancel</Button>
                  <Button disabled={!isEmpty} onClick={addContenet}>Comment</Button>
                </ButtonGroup>
              </Row>
          }
          {commentsList.map( e =>
          <>
            <div>{ e.name }</div>
            <div>{ e.comment }</div>
          </>
          )}
          <Row className="comments_section">
          {
            renderComments()
          }
          </Row>
              
          </div>
        </Col>
        <Col lg={6} className="right_section">
          <div className="suggestions">
            {
              renderRecommandedVideos()
            }
          </div>
        </Col>
      </Row>
    </CommonLayout>
  )
}
 export default SingleVideo