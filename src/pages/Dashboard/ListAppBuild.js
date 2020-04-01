import React from 'react'
import { List } from 'antd'

import ItemRender from './ItemRender'
import { ScrollContainer } from './styled'
import { SmallTitle } from './styled'

const skeletonData = () => {
  const listData = []
  for(let i = 0; i < 10; i++) {
    listData.push({
      id: i,
      name: `Placeholder name ${i}`,
      description: `Placeholder description ${i}`
    })
  }

  return listData
}

class ListAppBuild extends React.Component{
  render() {
    const { data, loading } = this.props

    return (
      <ScrollContainer>
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

export default ListAppBuild
