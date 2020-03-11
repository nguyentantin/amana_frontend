import styled from 'styled-components'

const ScreenSlide = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  .videoDiv {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .video{
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    width: auto;
    height: auto;
    z-index: -100;
  }
  .messageBox{
    width: 100%;
    height: 580px;
    text-align: center;
    position: relative;
    color: #fff;
    z-index: 2;
    h1 {
      color: #fff;
      font-size: 50px;
      margin-top: 155px;
      text-shadow: 0 0 30px #000;
    }
    p {
      margin: 20px auto 0 auto;
      max-width: 500px;
      text-shadow: 0 0 30px #000;
      font-size: 18px;
    }
    Button {
      margin-top: 41px;
      border-color: #fa8c16;
      background-color: #fa8c16;
      color: #fff;
      width: 320px;
      font-size: 28px;
      line-height: 70px;
      display: inline-block;
      height: auto;
    }
  }
`

export default ScreenSlide
