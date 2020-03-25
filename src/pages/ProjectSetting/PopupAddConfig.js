import { Form } from 'antd'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import { AInput } from '../../components/FormUI'
import { required } from '../../utils/validations'
import ModalStyle from '../../styles/modal'

class PopupAddConfig extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  render() {
    const {visible, handleSubmit, onToggle, onSubmit} = this.props

    return (
      <ModalStyle
        visible={visible}
        title="Create Build Config"
        okText="Create"
        onCancel={onToggle}
        okButtonProps={{form: 'add-config-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form layout="vertical" id='add-config-form' onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Project Key"
            name="projectKey"
            component={AInput}
            validate={[required]}
            type="text"
            placeholder="Please enter the project key."
          />
          <Field
            label="TeamCity token"
            name="teamCityToken"
            component={AInput}
            validate={[required]}
            type="text"
            placeholder="Please enter the team city token"
          />

          <Field
            label="Env"
            name="env"
            component={AInput}
            validate={[required]}
            type="text"
            placeholder="Please enter the env"
          />
        </Form>
      </ModalStyle>
    )
  }
}

export default compose(
  reduxForm({
    form: 'AddConfigForm',
  }),
)(PopupAddConfig)
