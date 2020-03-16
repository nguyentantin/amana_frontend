import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import ScreenSlide from './ScreenSlide'
import video1 from '../../assets/video/amana.mp4'
import poster from '../../assets/images/thumb_amana.png'

class HomePage extends React.Component {
  render() {
    return (
      <div className="content">
        <ScreenSlide>
          <div className="videoDiv">
            <video
              className="video"
              autoPlay="autoplay"
              loop="loop"
              muted
              poster={poster}
            >
              <source src={video1} type="video/mp4"/>
            </video>
          </div>
          <div className="messageBox">
            <div>
              <h1>Distribute your beta apps instantly</h1>
              <p>Build Automation is the fastest way for iOS and Android developers to share in-development apps with
                others.</p>
              <Link className="ant-btn ant-btn-lg" to='/sign-in'>Get Started</Link>
            </div>
          </div>
        </ScreenSlide>
      </div>
    )
  }
}

export default HomePage
