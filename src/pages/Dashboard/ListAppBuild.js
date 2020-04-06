import React from 'react'
import { List } from 'antd'
import { compose } from 'redux'
import { connect } from 'react-redux'

import ItemRender from './ItemRender'
import injectReducer from '../../store/injectReducer'
import reducer from './store/reducers'
import injectSaga from '../../store/injectSaga'
import saga from './store/sagas'
import { ScrollContainer } from './styled'
import { SmallTitle } from './styled'
import { fetchMoreAppBuilds } from './store/actions'
import {
  getAppBuildLoading,
  getAppBuildLoadMoreLoading,
  getAppBuildPagination,
  hasPaginate
} from './store/selector'

const skeletonData = () => {
  const listData = []
  for(let i = 0; i < 6; i++) {
    listData.push({
      id: i,
      name: `Placeholder name ${i}`,
      description: `Placeholder description ${i}`
    })
  }

  return listData
}

class ListAppBuild extends React.Component{
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(event) {
    const el = event.target
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const offsetHeight = el.offsetHeight
    const { hasPaginate, pagination, fetchMoreAppBuilds, loadMoreLoading } = this.props

    if (!loadMoreLoading && hasPaginate && scrollHeight === (scrollTop + offsetHeight)) {
      fetchMoreAppBuilds({ page: pagination.current + 1})
    }
  }

  render() {
    const { data, loading } = this.props

    return (
      <ScrollContainer height={[600, 760]} onScroll={this.handleScroll}>
        <h2>Timeline <SmallTitle>Recent builds</SmallTitle></h2>
        <List
          itemLayout="horizontal"
          dataSource={loading ? skeletonData() : data}
          renderItem={item => <ItemRender loading={loading} item={item}/>}
        />
      </ScrollContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: getAppBuildLoading(state),
  loadMoreLoading: getAppBuildLoadMoreLoading(state),
  pagination: getAppBuildPagination(state),
  hasPaginate: hasPaginate(state)
})

const mapDispatchToProps = { fetchMoreAppBuilds }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectReducer({key: 'dashboard', reducer}),
  injectSaga({key: 'dashboard', saga}),
)(ListAppBuild)
