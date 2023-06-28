import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getAllComments } from "../../../api/comments/comment";
import { getAllRecommendeVideo } from "../../../api/recommended/recommended";
import { useFetchData } from "../../../Hook/useFetchData";
import { Col } from "antd";
import { Link, useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import moment from 'moment';


const useSingle = () => {
  const videoRef = useRef(null);
  const location = useLocation()
  
  const[state, setState] = useState({
    comments : [],
    recommanded : [],
  })

  const[getComments] =  useFetchData({
    apiFunction : getAllComments, 
    apiCallFlag : true,
    requestBody: {id: location?.state?.id}
  })

  const[getAllRecommandedViedos] =  useFetchData({
    apiFunction : getAllRecommendeVideo, 
    apiCallFlag : true,
    requestBody: {id: location?.state?.snippet?.categoryId}
  })
  const {comments,recommandeds} = state

  useEffect(() => {
    setState(preState => (
      {
        ...preState,
        comments: getComments?.items
      }
      ))
    }, [getComments])

  useEffect(() => {
    setState(preState => (
      {
        ...preState,
        recommandeds: getAllRecommandedViedos?.items
      }
      ))
    }, [getAllRecommandedViedos])

  const TimeCalculator = (publishDate) => {
    const startDate = moment(publishDate);
    const localDateTime = moment.utc(startDate).local();
    const currentDateTime = moment(new Date());
    const duration = moment.duration(currentDateTime.diff(localDateTime));
    
    const yearDifference = currentDateTime.diff(startDate, 'years');
    const monthsDiff = currentDateTime.diff(startDate, 'months');
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();


    const minutesCondition = yearDifference <= 0 && monthsDiff <= 0 && days <= 0 && hours <= 0 && minutes > 0
    const hourscondition = yearDifference <= 0 && days <= 0 && hours > 0
    const daysDIffrence = yearDifference <= 0 && monthsDiff <= 0 && days > 0
    const monthsDIffrence = yearDifference <= 0 && monthsDiff > 0
    const yearDiff = yearDifference > 0
    const justNow = minutes === 0 
    
    switch (true) {
      case minutesCondition:
        return `${minutes} Minute Ago`;
      break;
      case hourscondition:
        return  `${hours} Hour Ago`;
        break;
      case daysDIffrence:
        return `${days} Days Ago`;
        break;
      case monthsDIffrence:
        return `${monthsDiff} Months Ago`;
        break;
      case yearDiff:
        return `${yearDifference} Year Ago`
        break;
      case justNow:
        return `Just Now`
        break
      default:
        console.log('Just Now');
    }
  }

  const viewCount = (views) => {
    if (views < 1000) {
      return views.toString();
    } else if (views < 100000) {
      return (views / 1000).toFixed(2) + 'k';
    } else if (views < 10000000) {
      return (views / 100000).toFixed(2) + 'L';
    } else {
      return (views / 10000000).toFixed(2) + 'M';
    }
  }

  const renderComments = () => {
    return comments?.map(comment => {
      const time = `${comment?.snippet?.topLevelComment?.snippet?.publishedAt}`
      const showTime = TimeCalculator(time)
      return(
        <>
        <Col xs={24} className="comment_details">
          <img src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} />
          <div className="comment">
            <h4>{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName} <span>{showTime}</span></h4>
            <span>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</span>
          </div>
        </Col>
        </>
      )
    })
  }

  const renderRecommandedVideos = () => {
    return recommandeds?.map(recommanded => {
      const views = `${recommanded?.statistics?.viewCount}`
      const time = `${recommanded?.snippet?.publishedAt}`
      const showTime = TimeCalculator(time)
      const showCount = viewCount(views)
      return (
        <Link
        state={{
          ...recommanded,
        }} to={`/video/v=?${recommanded?.id}`}
        className='suggestion'
        >
        <ReactPlayer
          className='react-player'
          light = {recommanded?.snippet?.thumbnails?.high?.url}
          url = {`https://www.youtube.com/watch?v=${recommanded?.id}`}
          playIcon={<span></span>}
          width='200px'
          height='100px'
          muted
          controls={false}      
          config={{ youtube: { playerVars: { disablekb: 1, modestbranding: 1 } } }}
          ref={videoRef}
          >
        </ReactPlayer>
        <div className="suggestion_video_content">
          <h4>{recommanded?.snippet?.title}</h4>
          <div>{recommanded?.snippet?.channelTitle}</div>
          <div className="views_time">
            <span>{`${showCount} Views`}</span>
            <span>{`${showTime}`}</span>
          </div>
        </div>
        </Link>
      )
    })
  }

  return [
    {
    },
    {
      renderComments, renderRecommandedVideos
    }
  ]
}

export default useSingle