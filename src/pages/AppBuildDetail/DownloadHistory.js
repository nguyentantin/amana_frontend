import React from 'react'
import { List, Skeleton } from 'antd'
import _ from 'lodash'
import moment from 'moment'

// import { Box } from '../../styles/utility'
import { UserAvatar } from '../../components/CoreUI'

const skeletonData = () => {
  const listData = []
  for (let i = 0; i < 3; i++) {
    listData.push({
      id: i,
      name: `Placeholder name ${i}`,
      description: `Placeholder description ${i}`
    })
  }

  return listData
}

const Title = ({data}) => {
  const username = _.get(data, 'user.name')
  const date = moment(data.createdAt).format('LLL')

  return (
    <div><strong>{username}</strong> download at <strong>{date}</strong></div>
  )
}

class DownloadHistory extends React.PureComponent {
  render() {
    const {histories, loading} = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={loading ? skeletonData() : histories}
        // header={<Box ml={3} fontSize={16}><strong>Total download:</strong> {histories.length} count</Box>}
        renderItem={item => (
          <React.Fragment>
            {
              loading
                ? <Skeleton loading avatar active/>
                : <List.Item>
                  <List.Item.Meta
                    avatar={
                      <UserAvatar
                        size={55}
                        user={item.user}
                        src={_.get(item, 'project.avatar', null)}
                      />}
                    title={<Title data={item}/>}
                    description={moment(item.createdAt).fromNow()}
                  />
                </List.Item>
            }
          </React.Fragment>
        )}
      />
    )
  }
}

export default DownloadHistory
