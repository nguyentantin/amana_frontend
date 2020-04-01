import React from 'react'
import { Col, Pagination, Row } from 'antd'
import { compose } from 'redux'

import ListProject from './ListProject'
import ListAppBuild from './ListAppBuild'
import injectReducer from '../../store/injectReducer'
import reducer from './store/reducers'
import injectSaga from '../../store/injectSaga'
import saga from './store/sagas'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchAppBuilds, fetchProject } from './store/actions'
import UserInfoCard from './UserInfoCard'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import {
  getAppBuildLoading,
  getAppBuildPagination,
  getAppBuilds,
  getProjectLoading,
  getProjects, showPaginate,
} from './store/selector'
import ShowIf from '../../components/Utils/ShowIf'
import { Flex } from '../../styles/utility'

@observer
class DashboardPage extends React.Component {
  @observable pagination = {
    current: 1,
    pageSize: 10,
    total: 100,
    showTitle: false,
    showSizeChanger: false
  }

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  @action handleChangePage(page, perPage) {
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
      appBuildPagination,
      showPaginate,
    } = this.props

    return (
      <Row gutter={20}>
        <Col xs={24} md={6}>
          <UserInfoCard/>
          <ListProject data={projects} loading={projectLoading}/>
        </Col>
        <Col xs={24} md={18}>
          <ListAppBuild data={appBuilds} loading={appBuildLoading}/>

          <ShowIf condition={showPaginate}>
            <Flex flex={['flex']} justifyContent={['flex-end']}>
              <Pagination
                {...appBuildPagination}
                onChange={this.handleChangePage}
                disabled={appBuildLoading}
                style={{marginLeft: 'auto'}}
              />
            </Flex>
          </ShowIf>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: getProjects(state),
    projectLoading: getProjectLoading(state),
    appBuilds: getAppBuilds(state),
    appBuildLoading: getAppBuildLoading(state),
    appBuildPagination: getAppBuildPagination(state),
    showPaginate: showPaginate(state),
  }
}

const mapDispatchToProps = { fetchProject, fetchAppBuilds }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'dashboard', reducer}),
  injectSaga({key: 'dashboard', saga}),
)(DashboardPage)
