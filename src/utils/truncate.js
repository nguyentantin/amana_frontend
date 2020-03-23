export const truncate = (text = '', stop, clamp) => {
  if (!text) return ''
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
}

export const getFirstCapitalizedLetter = (string) => {
  return string.charAt(0).toUpperCase()
}
