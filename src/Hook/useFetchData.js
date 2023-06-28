import { useEffect, useState } from "react";
import axois from "axios";

const useFetchData = ({apiFunction, apiCallFlag, apiSuccessCallBack, apiErrorCallBack,requestBody}) => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    if (apiCallFlag)
    axois.get(apiFunction(requestBody))
      .then(response => {
        if(response.status === 200){
          setData(response.data)
          apiSuccessCallBack && apiSuccessCallBack(response.data)
        }else{
          apiErrorCallBack && apiErrorCallBack(response)
        }
      }).catch(
        error => {
          apiErrorCallBack && apiErrorCallBack(error)
        }
      )
  }, [apiCallFlag]);
  

  return [
    data
  ]

}

export { useFetchData };