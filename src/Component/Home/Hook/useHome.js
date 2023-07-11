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
  const[fillterValue, setFillterValue] = useState('all');
  const [activeCategory, setActiveCategory] = useState(false)

  const [state, setState] = useState({
    videos: [],
    suggestions : [],
    titles : []
  })

  const {videos, suggestions} = state

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

  const getAllVideo = () => {
    setFillterValue('all')
  }

  const handleCategorySelection = (id) =>{
    setActiveCategory(id)
  }

  const getAllVideoTitle = () => new Set(videos?.map(item => item?.snippet?.categoryId))

  const renderVideos = () => {
    let showVideos = fillterValue == 'all' ? videos : videos?.filter(item => item?.snippet?.categoryId == fillterValue)
    console.log('showVideos: ', showVideos);
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
          </Link>
          <div className='suggestion'>
            <img src={item?.snippet?.thumbnails?.high?.url} />
            <div className='suggestion_video_content'>
              <h1>{item?.snippet?.description}</h1>
              <p>{item?.snippet?.channelTitle}</p>
              </div>
          </div>
        </Col>
      )
    })
  }

  return [
    {
      videos,suggestions,activeCategory,fillterValue
    },
    { 
     renderVideos, getAllVideoTitle,allVideos,getAllVideo,handleCategorySelection
    }
  ]
}

export default useHome
