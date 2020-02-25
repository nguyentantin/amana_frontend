import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

import { ShowIf } from '../Utils'
import * as Styled from './styled'

const customStyles = {
  content: {
    background: 'rgb(255, 255, 255)',
    borderRadius: '4px',
    bottom: 'auto',
    border: '1px solid rgb(204, 204, 204)',
    left: '50%',
    outline: 'none',
    overflow: 'visible',
    padding: '30px',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -75%)',
    right: 'auto',
  },
  overlay: {
    backgroundColor: 'rgb(51, 51, 51, .5)',
    overflow: 'auto',
  },
}

export default @inject('appStore')
@observer
class BaseModal extends Component {
  static propTypes = {
    appStore: PropTypes.oneOfType([PropTypes.object]),
    className: PropTypes.string,
    placement: PropTypes.string,
  }

  static defaultProps = {
    appStore: {},
    className: '',
    placement: '',
  }

  closeModal = () => {
    const {appStore} = this.props
    appStore.closeModal()
    document.body.style.overflow = 'auto'
  }

  setBodyOverFlow = () => {
    document.body.style.overflow = 'hidden'
  }

  render() {
    const {appStore, className} = this.props

    return (
      <Styled.Modal
        isOpen={appStore.modal.show}
        style={customStyles}
        closeTimeoutMS={200}
        onRequestClose={this.closeModal}
        onAfterOpen={this.setBodyOverFlow}
        className={className}
        {...appStore.modal.customProps}
      >
        <ShowIf condition={!appStore.modal.customProps.hideClose}>
          <button
            type="button"
            onClick={this.closeModal}
            className="ReactModal__Close"
          >
            <span>&#10005;</span>
          </button>
        </ShowIf>
        {appStore.modal.body && React.cloneElement(appStore.modal.body, {
          closeModal: this.closeModal,
          ...appStore.modal.componentProps,
        })}
      </Styled.Modal>
    )
  }
}
