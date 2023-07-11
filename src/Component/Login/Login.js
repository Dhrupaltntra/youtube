import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import './login.scss'
import useLoginHook from './Hook/useLoginHook'
import { Formik } from 'formik'
import { GoogleOutlined } from '@ant-design/icons'

const Login = () => {
  const  [
  {
    register
  },
  {
    loginHandler,signInWithGoogle
  }
] = useLoginHook()

  return (
    <div className='container'>
      <div className='login-form'>
        <h1 className='text-centre'>Login</h1>
        <Formik
          initialValues={{
            email : '',
            Password : ''
          }}
          validationSchema={register}
          onSubmit={
            event => {loginHandler(event)
          }
          
          }
        >
          {({ isSubmitting, handleChange, handleBlur, handleSubmit, errors, touched, dirty,isValid }) => (
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Row>
                <Col xs={24} className='mb-20'>
                  <Input size="large" name='email' onChange={handleChange} onBlur={handleBlur} placeholder='Email' />
                  {errors.email && touched.email && <p className='m-0 error-message'>{errors.email}</p>}
                </Col>
                <Col xs={24} className='mb-20'>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name='Password'
                    placeholder='Password'
                    size="large"
                  />
                  {errors.Password && touched.Password && <p className='m-0 error-message'>{errors.Password}</p>}
                </Col>
                <Col xs={24} className='mb-20'>
                  <Button disabled={!(dirty && isValid)}
                  type='primary'
                  onClick={handleSubmit}
                  className='w-100'
                  size='large'
                  >Login</Button>
                </Col>
                <Col xs={24}>
                  <Button size='large' className='w-100' type="default" onClick={signInWithGoogle}>
                  <GoogleOutlined />
                    Login With Google</Button>
                </Col>
              </Row>
          </Form>
          )} 
        </Formik>
      </div>
    </div>
  )
}

export default Login
