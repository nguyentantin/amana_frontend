import React from 'react'
import {useParams} from 'react-router-dom'

const withRouterParam = (WrapperComponent) => {
  return (props) => {
    let params = useParams()

    return (
      <WrapperComponent {...props} routerParams={params}/>
    )
  }
}

export default withRouterParam
