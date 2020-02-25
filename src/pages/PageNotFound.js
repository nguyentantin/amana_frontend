import React, { PureComponent, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from "react-router-dom"

class PageNotFound extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Page Not Found</title>
        </Helmet>

        <div>
          Hello Page Not Found
          <Link to="/projects">Project Link</Link>
        </div>
      </Fragment>
    )
  }
}

export default PageNotFound
