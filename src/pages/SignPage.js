import React from 'react'
import { compose } from "redux"
import injectReducer from '../store/injectReducer'
import injectSaga from '../store/injectSaga'
import reducer from '../store/modules/auth/reducers'
import saga from '../store/modules/auth/sagas'

const key = 'auth'

class SignPage extends React.PureComponent {
  render() {
    return (
      <div>
        SignPage
      </div>
    )
  }
}

export default compose(
  injectReducer({key: 'auth', reducer}),
  injectSaga({key, saga})
)(SignPage)

