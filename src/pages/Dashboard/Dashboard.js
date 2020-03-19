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
  padding-top: 10px;
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
          <Col span={6}>
            <div>
              <img style={{width: '100%', marginBottom: '20px'}} src="https://via.placeholder.com/250x300.png" alt=""/>
            </div>

            <ListProject data={this.props.projects} />

          </Col>
          <Col span={18}>
            <ListAppBuild data={this.props.appBuilds}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: _.get(state, 'dashboard.projects', []),
    appBuilds: _.get(state, 'dashboard.appBuilds', []),
  }
}

const mapDispatchToProps = { fetchProject, fetchAppBuilds }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'dashboard', reducer}),
  injectSaga({key: 'dashboard', saga}),
)(DashboardPage)
