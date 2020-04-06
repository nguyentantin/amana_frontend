import React from 'react'
import { Col, Row } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'

import ListAppBuild from './ListAppBuild'
import ListProject from './ListProject'
import UserInfoCard from './UserInfoCard'
import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from './store/reducers'
import saga from './store/sagas'
import { fetchAppBuilds, fetchProject } from './store/actions'
import {
  getAppBuildLoading,
  getAppBuilds,
  getProjectLoading,
  getProjects,
} from './store/selector'

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage(page, perPage) {
    const {fetchAppBuilds} = this.props
    fetchAppBuilds({ page, perPage})
  }

  componentDidMount () {
    const { fetchProject, fetchAppBuilds } = this.props
    fetchProject()
    fetchAppBuilds()
  }

  render() {
    const {
      projects,
      projectLoading,
      appBuilds,
      appBuildLoading,
    } = this.props

    return (
      <Row gutter={20}>
        <Col xs={24} md={6}>
          <UserInfoCard/>
          <ListProject data={projects} loading={projectLoading}/>
        </Col>
        <Col xs={24} md={18}>
          <ListAppBuild data={appBuilds} loading={appBuildLoading}/>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
    projects: getProjects(state),
    projectLoading: getProjectLoading(state),
    appBuilds: getAppBuilds(state),
    appBuildLoading: getAppBuildLoading(state),
})

const mapDispatchToProps = { fetchProject, fetchAppBuilds }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'dashboard', reducer}),
  injectSaga({key: 'dashboard', saga}),
)(DashboardPage)
