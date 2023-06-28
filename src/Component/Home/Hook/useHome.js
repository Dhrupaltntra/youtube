import React, { useEffect, useRef, useState } from 'react'
import { getAllVideos } from '../../../api/home/home'
import { useFetchData } from '../../../Hook/useFetchData'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Col } from 'antd'
import ReactPlayer from 'react-player'

const useHome = () => {
  const videoRef = useRef(null);
  const {userId} = useParams()
  const[getVideos] = useFetchData({
    apiFunction : getAllVideos, 
    apiCallFlag : true
  })

  const[activeIndex, setActiveIndex] = useState();
  const[fillterValue, setFillterValue] = useState(null);

  const [state, setState] = useState({
    videos: [],
    suggestions : [],
    titles : []
  })

  const {videos, suggestions, titles} = state

  const onMouseHover = (index, key) => {
    key ? setActiveIndex(index) : setActiveIndex(null);
  }
  
  useEffect(() => {
    setState(preState => (
      {
        ...preState,
        videos: getVideos?.items
      }
      ))
    }, [getVideos, userId])
    
    const allVideos = (value) => {
      setFillterValue(value)
    }
    console.log('getVideos: ', getVideos);

  const getAllVideo = () => {
    setFillterValue(null)
  }

  const getAllVideoTitle = () => new Set(videos?.map(item => item?.snippet?.categoryId))

  const renderVideos = () => {
    let showVideos = fillterValue == null ? videos : videos?.filter(item => item?.snippet?.categoryId == fillterValue)
    return showVideos?.map((item, index) => {
      let image_url = activeIndex !== index ? item?.snippet?.thumbnails?.high?.url : undefined;
      return(
        <Col key={index} xs={24} md={8} xxl={6} className="video_section">
          
          <Link
          state={{
            ...item,
          }} to={`video/v=?${item?.id}`}
          className='video_content'
          onMouseEnter={() => onMouseHover(index, 1)}
          onMouseLeave={() => onMouseHover(index)}
          >
           
          <ReactPlayer
            light = {image_url}
            url = {`https://www.youtube.com/watch?v=${item?.id}`}
            playing={activeIndex === index}
            playIcon={<span></span>}
            width='100%'
            height='auto'
            muted
            controls={false}
            style={{ pointerEvents: 'none' }}            
            config={{ youtube: { playerVars: { disablekb: 1, modestbranding: 1 } } }}
            ref={videoRef}
          >
          </ReactPlayer>
          <h1>{item.title}</h1>
          </Link>
        </Col>
      )
    })
  }

  return [
    {
      videos,suggestions
    },
    { 
     renderVideos, getAllVideoTitle,allVideos,getAllVideo
    }
  ]
}

export default useHome
