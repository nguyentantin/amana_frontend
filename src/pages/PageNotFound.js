import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'

class PageNotFound extends PureComponent {
  render() {
    return (
      <>
        <Helmet>
          <title>Page Not Found</title>
        </Helmet>
      </>
    )
  }
}

export default PageNotFound
