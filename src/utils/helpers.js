import _ from 'lodash'
import MobileDetect from 'mobile-detect'

export const isMobile = () => {
  const device = new MobileDetect(window.navigator.userAgent)
  return !_.isEmpty(device.phone())
}
