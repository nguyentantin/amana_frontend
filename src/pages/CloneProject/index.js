import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectReducer, injectSaga } from '../../store'
import { fetchExternalMembers } from '../../store/modules/project/actions'
import { fetchRoles } from '../../store/modules/role/actions'
import projectSaga from '../../store/modules/project/sagas'
import roleSaga from '../../store/modules/role/sagas'
import roleReducer from '../../store/modules/role/reducers'
import projectReducer from '../../store/modules/project/reducers'
import { externalMembers } from '../../store/modules/project/selectors'
import { roles } from '../../store/modules/role/selectors'

class CloneProject extends React.Component {
  constructor(props) {
    super(props)
    console.log('props', props)
  }

  render() {
    return (
      <div>
        <button onClick={this.props.resetProjectState}>Change</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  externalMembers: externalMembers(state),
  roles: roles(state)
})

const mapDispatchToProps = {
  fetchExternalMembers,
  fetchRoles,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'project', reducer: projectReducer}),
  injectSaga({key: 'project', saga: projectSaga}),
  injectReducer({ key: 'role', reducer: roleReducer }),
  injectSaga({ key: 'role', saga: roleSaga })
)(CloneProject)
