import _ from 'lodash'
import MobileDetect from 'mobile-detect'

export const isMobile = () => {
  const device = new MobileDetect(window.navigator.userAgent)
  return !_.isEmpty(device.phone())
}

export const truncate = (text = '', stop, clamp) => {
  if (!text) return ''
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
}

export const getFirstCapitalizedLetter = (string) => {
  return string ? string.charAt(0).toUpperCase(): ''
}
