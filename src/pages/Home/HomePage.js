import React from 'react'
import { Layout, Button , Menu } from 'antd'

import './style.scss'
import video1 from '../../assets/video/video.mp4'
import video2 from '../../assets/video/video.mp4'
import logo from '../../assets/images/logo.svg'

const {Header, Content, Footer} = Layout

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="container flex-center">
            <span className="logo">
              <img src={logo} alt=""/>
              <span>Auto Build</span>
            </span>
            <div>
              <Menu mode="horizontal" style={{lineHeight: '64px'}}>
                <Menu.Item>Features</Menu.Item>
                <Menu.Item>Developer Tools</Menu.Item>
                <Menu.Item>Support</Menu.Item>
                <Menu.Item>SignIn</Menu.Item>
                <Menu.Item>SignUp</Menu.Item>
              </Menu>
            </div>
          </div>
        </Header>

        <Content style={{padding: '0', marginTop: 66, minHeight: 'calc(100vh + 135px)'}}>
          <div className="content">
            <div className="ScreenSlide">
              <div className="videoDiv">
                <video preload="preload" className="video" autoPlay="autoplay" loop="loop"
                  poster="https://deploygate.com/assets/enterprises/video-background-07e40de43c00197372f8ea19959c134e.jpg"
                >
                  <source src={video1} type="video/mp4"></source>
                  <source src={video2} type="video/webm"></source>
                </video>
              </div>
              <div className="messageBox">
                <div>
                  <h1>Distribute your beta apps instantly</h1>
                  <p>DeployGate is the fastest way for iOS and Android developers to share in-development apps with others.</p>
                  <Button size="large">Get Started</Button>
                </div>
              </div>
            </div>
          </div>
        </Content>

        <Footer className='footer'>Auto Build Application ©2020 Created by SI1 Studio</Footer>
      </Layout>
    )
  }
}

export default HomePage
