import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import './login.scss'
import useLoginHook from './Hook/useLoginHook'
import { Formik } from 'formik'

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
        {({ isSubmitting, handleChange, handleBlur, values, handleSubmit, errors, touched, dirty }) => (
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
            <Input name='email' onChange={handleChange} onBlur={handleBlur} />
            {errors.email && touched.email && <p>{errors.email}</p>}

            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name='Password'
            />
            {errors.Password && touched.Password && <p>{errors.Password}</p>}

            <Button disabled={!dirty || isSubmitting}
            onClick={handleSubmit}
            >Submit</Button>
            <Row className='sign_in_google'>
              <Col xs={24}>
                <Button type="primary" onClick={signInWithGoogle}>Login With Google</Button>
              </Col>
            </Row>
        </Form>
        )} 
      </Formik>
    </div>
  )
}

export default Login
