import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

class ServerError extends React.PureComponent {
  render() {
    const {t} = this.props

    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, the server is wrong"
        extra={<Link to='/'><Button type="primary">{t('back_home')}</Button></Link>}
      />
    )
  }
}

export default withTranslation()(ServerError)
