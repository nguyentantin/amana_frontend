import _ from 'lodash'

const EMAIL_REGEX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/

const isEmpty = value =>
  typeof value === 'undefined' || value === null || value === '' || _.trim(value) === ''

export const required = value => {
  return isEmpty(value) ? '入力必須です' : undefined
}

export const requiredCustom = (message) => (value) => {
  return isEmpty(value)
    ? message || '入力必須です'
    : undefined
}

export const confirmEmail = (value, values) => {
  return !isEmpty(value) && values.emailConfirm !== values.email
    ? 'メールアドレス（確認用）はメールアドレスと一致していません。'
    : undefined
}

export const minLength = (min, message) => (value, allValues) => {
  return !isEmpty(value) && value.length < min
    ? message || {min} + '% 桁以上を入力してください。'
    : undefined
}

export const maxLength = (max, message) => (value, allValues) => {
  return !isEmpty(value) && value.length > max
    ? message || {max} + '% 桁以下を入力してください。'
    : undefined
}

export const minValue = (min, message) => (value, allValues) => {
  return !isEmpty(value) && value < min
    ? message || {min} + '% より小さい値を入力してください。'
    : undefined
}

export const maxValue = (max, message) => (value, allValues) => {
  return !isEmpty(value) && value > max
    ? message || {max} + '% より大きい値を入力してください。'
    : undefined
}

export const number = (value, allValues) => {
  return isNaN(Number(value))
    ? '数字で入力してください。'
    : undefined
}

export const phoneNumber = (value, allValues) => {
  return (value.length > 11 || value.length < 10)
    ? '電話番号は10-11桁で入力してください。'
    : undefined
}

export const regex = (pattern, message) => (value, allValues) => {
  return !isEmpty(value) && typeof value === 'string' && !pattern.test(value)
    ? message
    : undefined
}

export const email = regex(
  EMAIL_REGEX,
  '有効なメールアドレスを入力してください。'
)

export const choices = (list, message) => (value, allValues) => {
  return !isEmpty(value) && list.indexOf(value) === -1 ? message : undefined
}

export const syncValidationServer = (errorMessage) => {
  let dataError = {}

  Object.keys(errorMessage).map(value => {
    dataError = {...dataError, [value]: errorMessage[value][0]}
    return dataError
  })

  return dataError
}

export const bankingNumber = (value, allValues) => {
  return (value.length !== 7)
    ? '口座番号は7桁で入力してください。'
    : undefined
}

export const password = (value, allValues) => {
  if (value.length < 8 || value.length > 20) {
    return 'パスワードは8-20桁で入力してください。'
  }

  if (!isEmpty(value) && _.isString(value) && !PASSWORD_REGEX.test(value)) {
    return 'パスワードには、英語と数字を使用してください。'
  }

  return undefined
}

const matchPassword = (message) => (value, allValues) => {
  if (value !== allValues.password) {
    return message
  }

  return undefined
}

export const confirmPassword = matchPassword('パスワード(確認用）はパスワードと一致しません。')
export const confirmNewPassword = matchPassword('現在のパスワード、または新しいパスワード/新しいパスワード(確認)が誤っています')

