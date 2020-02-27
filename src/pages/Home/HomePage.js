import React from 'react'
import { Button } from 'antd'

import './style.scss'
import video1 from '../../assets/video/video.mp4'
import video2 from '../../assets/video/video.webm'

class HomePage extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="ScreenSlide">
          <div className="videoDiv">
            <video
              className="video"
              autoPlay="autoplay"
              loop="loop"
              muted
              poster="https://deploygate.com/assets/enterprises/video-background-07e40de43c00197372f8ea19959c134e.jpg"
            >
              <source src={video1} type="video/mp4"/>
              <source src={video2} type="video/webm"/>
            </video>
          </div>
          <div className="messageBox">
            <div>
              <h1>Distribute your beta apps instantly</h1>
              <p>DeployGate is the fastest way for iOS and Android developers to share in-development apps with
                others.</p>
              <Button size="large">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
