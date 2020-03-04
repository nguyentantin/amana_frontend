import React from 'react'
import { Button } from 'antd'

import video1 from '../../assets/video/amana.mp4'
import poster from '../../assets/images/thumb_amana.png'

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
              poster={poster}
            >
              <source src={video1} type="video/mp4"/>
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
