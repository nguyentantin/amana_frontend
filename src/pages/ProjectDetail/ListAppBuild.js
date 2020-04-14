import React from 'react'
import { List } from 'antd'
import { inject, observer } from 'mobx-react'

import ItemRender from './ItemRender'
import { ScrollContainer } from '../Dashboard/styled'

@inject('store')
@observer
class ListAppBuild extends React.PureComponent{
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(event) {
    const el = event.target
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const offsetHeight = el.offsetHeight
    const { hasMoreAppBuilds, getMoreAppBuildsLoading } = this.props.store

    if (!getMoreAppBuildsLoading && hasMoreAppBuilds && scrollHeight === (scrollTop + offsetHeight)) {
      this.props.store.getMoreAppBuilds()
    }
  }

  render() {
    const { project, data } = this.props

    return (
      <ScrollContainer height={[600, 760]} onScroll={this.handleScroll}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => <ItemRender appBuild={item} project={project}/>}
        />
      </ScrollContainer>
    )
  }
}

export default ListAppBuild
