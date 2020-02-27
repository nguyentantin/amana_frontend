import React from 'react'
import { Layout, Carousel, Card, Menu } from 'antd'

import './style.scss'
import slide_1 from '../../assets/images/slide_1.jpg'
import slide_2 from '../../assets/images/slide_2.jpg'
import slide_3 from '../../assets/images/slide_3.jpg'
import slide_4 from '../../assets/images/slide_4.jpg'
import logo from '../../assets/images/logo.svg'

const {Header, Content, Footer} = Layout

class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header"
                style={{background: '#fff', padding: 0, boxShadow: '0 4px 4px rgba(0, 21, 41, 0.08)'}}>
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
        </Header>

        <Content style={{padding: '0', marginTop: 20, minHeight: 'calc(100vh - 64px)'}}>
          <div className="content">
            <Carousel autoplay>
              <div>
                <Card
                  hoverable
                  cover={<img alt="example" src={slide_1}/>}
                />
              </div>
              <div>
                <Card
                  hoverable
                  cover={<img alt="example" src={slide_2}/>}
                />
              </div>
              <div>
                <Card
                  hoverable
                  cover={<img alt="example" src={slide_3}/>}
                />
              </div>
              <div>
                <Card
                  hoverable
                  cover={<img alt="example" src={slide_4}/>}
                />
              </div>
            </Carousel>
          </div>
        </Content>

        <Footer style={{textAlign: 'center'}}>Auto Build Application ©2020 Created by SI1 Studio</Footer>
      </Layout>
    )
  }
}

export default HomePage
