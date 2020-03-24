import React from 'react'
import { Col, Row } from 'antd'
import { compose } from 'redux'
import styled from 'styled-components'

import ListProject from './ListProject'
import ListAppBuild from './ListAppBuild'
import injectReducer from '../../store/injectReducer'
import reducer from './store/reducers'
import injectSaga from '../../store/injectSaga'
import saga from './store/sagas'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchAppBuilds, fetchProject } from './store/actions'
import { container } from '../../styles/mixins'

const Container = styled.div`
  ${container.centerBox}
`

class DashboardPage extends React.Component {
  componentDidMount () {
    const { fetchProject, fetchAppBuilds } = this.props
    fetchProject()
    fetchAppBuilds()
  }

  render() {
    return (
      <Container>
        <Row gutter={20}>
          <Col xs={24} md={6}>

            <ListProject data={this.props.projects} loading={this.props.projectLoading}/>

          </Col>
          <Col xs={24} md={18}>
            <ListAppBuild data={this.props.appBuilds} loading={this.props.appBuildLoading}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: _.get(state, 'dashboard.projects', []),
    projectLoading: _.get(state, 'dashboard.projectLoading', false),
    appBuilds: _.get(state, 'dashboard.appBuilds', []),
    appBuildLoading: _.get(state, 'dashboard.appBuildLoading', false),
  }
}

const mapDispatchToProps = { fetchProject, fetchAppBuilds }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'dashboard', reducer}),
  injectSaga({key: 'dashboard', saga}),
)(DashboardPage)
