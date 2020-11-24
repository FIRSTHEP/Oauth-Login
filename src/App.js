import React, { useEffect, useState } from 'react'
import { Layout, Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { encode } from "base-64"
import Fade from 'react-reveal/Fade';
import UserDetail from './UserDetail.js'
import PandaLogo from './panda.png'
import 'antd/dist/antd.css'

const App = () => {
  const [verify, setVerify] = useState(false)
  const authUser = 'panda-dev-auth-client'
  const authPass = 'ZCuuZzRzyfWEKNL7uQEQhggiGdbrGuMNLCKDKKKvogPfkEgeEokYfnwMFHwcmjKb'
  var jwt = require('jsonwebtoken');

  const { Title } = Typography
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  }

  const logOut = () => {
    localStorage.removeItem('access_token')
  }

  const login = async (values) => {
    const formdata = new FormData()
    const headers = new Headers()
    formdata.append('grant_type', 'password')
    formdata.append('username', values?.username)
    formdata.append('password', values?.password)
    headers.append('Authorization', 'Basic ' + encode(authUser + ":" + authPass))
    fetch(`${process.env.REACT_APP_ENV}`, {
      method: 'POST',
      headers: headers,
      body: formdata
    })
      .then(async (response) => {
        if (response.status === 200) {
          const res_json = await response?.json()
          localStorage.setItem('access_token', res_json.access_token)
          localStorage.setItem('refresh_token', res_json.refresh_token)
          localStorage.setItem('expires', res_json.expires_in)
          localStorage.setItem('cusData', JSON.stringify(res_json))
          setVerify(true)
        } else {
          logOut()
          message.error(`${response.status}${' '}:${' '}ไม่สามารถทำรายการได้`)
        }
      })
      .catch((error) => {
        logOut()
        console.error(error);
      });
  }

  useEffect(() => {
  }, [])

  if (!verify) {
    return (
      <div>
        <Layout style={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#296194', }}>
          <Fade>
            <Card
              style={{
                boxShadow: '0px 5px 6px -1px rgba(0,0,0,0.15)',
                borderRadius: '.85rem',
                textAlign: 'center',
                marginTop: '10rem',
                padding: '1rem',
                height: 'auto',
                width: 400,
              }}
            >
              <div>
                <Title level={2}><img src={PandaLogo} alt={'logo'} style={{ width: 'auto', height: '50px', marginBottom: '1rem' }} /></Title></div>
              <Form
                {...formItemLayout}
                name="login_form"
                onFinish={login}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input
                    placeholder="Username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button block size="large" type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </Form.Item>
              </Form>
            </Card>
          </Fade>
        </Layout>
      </div>
    )
  }
  return (
    <>
      <Fade>
        <UserDetail />
      </Fade>
    </>
  )
}

export default App
