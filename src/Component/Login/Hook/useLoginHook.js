import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../api/login/login'
import { useFetchData } from '../../../Hook/useFetchData';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Input, Button, Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const useLoginHook = () => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [state, setState] = useState({
    isUserApiCalled : false,
    userDetail : {}
  })

  const { isUserApiCalled, userDetail} = state

  const stateUpdateHandler = (updatedState) => {
    setState(prevState => {
      return {
        ...prevState,
        ...updatedState
      }
    })
  }

  const register = Yup.object({
    email: Yup.string().email("Please enter a valid email!!").required("This is required Field!!"),
    Password: Yup.string().min(6, 'Password must be 9 characters or longer').required("This is required Field!!")
  })

  const getAllUsersSuccessHandler = (response) =>{
    console.log('userDetail', userDetail.email)
    console.log('response: ', response);
    console.log('Email: ', response);
    const isValueFound = response.filter(obj => obj.email === userDetail.email && obj.id === Number(userDetail.Password));
    console.log(isValueFound);
    if(isValueFound.length > 0) {
      navigate('/')
    }
  }

  const[getUsers] = useFetchData({
    apiFunction : getAllUsers,
    apiCallFlag : isUserApiCalled,
    apiSuccessCallBack : getAllUsersSuccessHandler
  })

  const loginHandler = (values) => {
    stateUpdateHandler({
      isUserApiCalled : true,
      userDetail : {...values}
    })
  }

  // process.env.REACT_APP_API_KEY
  console.log('process.env.REACT_APP_API_KEY: ', process.env.REACT_APP_API_KEY);

  const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'local-bf2f0.firebaseapp.com',
    projectId: "local-bf2f0",
    storageBucket: "local-bf2f0.appspot.com",
    messagingSenderId: "296153271973",
    appId: "1:296153271973:web:78926cae0c27c0e639474c"
  });

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()

const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    localStorage.setItem("LoginDetails", JSON.stringify(res.additionalUserInfo.profile));
    navigate('/')
  }).catch((error) => {
    console.log('error.message: ', error.message);
  })
}

  return [
    {
      register  
    },
    {
     loginHandler,signInWithGoogle
    }
  ]
}

export default useLoginHook
