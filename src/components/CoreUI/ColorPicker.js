import _ from 'lodash'
import React from 'react'
import { PhotoshopPicker } from 'react-color'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

@observer
class ColorPicker extends React.Component{
  @observable color = undefined

  constructor(props) {
    super(props);
    this.handleAcceptColor = this.handleAcceptColor.bind(this)
    this.handleCancelColor = this.handleCancelColor.bind(this)
  }

  @action changeColor(value = undefined) {
    if (_.isUndefined(value)) {
      this.color = undefined
    } else {
      this.color = value.hex
    }
  }

  handleAcceptColor() {
    const {onAccept} = this.props
    onAccept(this.color)
    this.changeColor()
  }

  handleCancelColor() {
    console.log('clicked cancel button')
    const {onCancel} = this.props
    this.changeColor()
    onCancel()
  }

  render() {
    const {color} = this.props

    return (
      <PhotoshopPicker
        color={this.color || color}
        onChange={(value) => this.changeColor(value)}
        onAccept={() => this.handleAcceptColor()}
        onCancel={() => this.handleCancelColor()}
      />
    )
  }
}

export default ColorPicker
