import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

class PageNotFound extends React.PureComponent {
  render() {
    const {t} = this.props
    return (
      <Result
        status="404"
        title="404"
        subTitle={t('sorry_page_you_visited_does_not_exist')}
        extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
      />
    )
  }
}

export default withTranslation()(PageNotFound)
