import _ from 'lodash'
import React, { Fragment } from 'react'
import { PhotoshopPicker } from 'react-color'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

@observer
class ColorPicker extends React.Component{
  @observable color = undefined

  @action changeColor(value = undefined) {
    if (_.isUndefined(value)) {
      this.color = undefined
    } else {
      this.color = value.hex
    }
  }

  @action handleAcceptColor() {
    const {onAccept} = this.props
    onAccept(this.color)
    this.changeColor()
  }

  @action handleCancelColor() {
    const {onCancel} = this.props
    this.changeColor()
    onCancel()
  }

  render() {
    const {color} = this.props

    return (
      <Fragment>
        <PhotoshopPicker
          color={this.color || color}
          onChange={(value) => this.changeColor(value)}
          onAccept={() => this.handleAcceptColor()}
          onCancel={() => this.handleCancelColor}
        />
      </Fragment>
    )
  }
}

export default ColorPicker
