import { Modal, Form, Select, Row } from 'antd'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { AInput, ASelect, ATextarea } from '../../components/FormUI'
import { required, maxLength } from '../../utils/validations'
import { PLATFORM_TYPE } from '../../config/constants'

const { Option } = Select
const maxLengthDescription = maxLength(255)

class ModalCreateProject extends React.Component {
  static propTypes = {
    onCreateProject: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const { onCreateProject } = this.props
    onCreateProject(values)
  }

  render() {
    const {visible, onToggle, handleSubmit} = this.props

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }

    return (
      <Modal
        visible={visible}
        title="Create"
        okText="Create"
        onCancel={onToggle}
        okButtonProps={{form:'create-project-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout="vertical" id='create-project-form' onSubmit={handleSubmit(this.onSubmit)}>
          <Row>
            <Field
              label="Name"
              name="name"
              component={AInput}
              validate={[required]}
              type="text"
              placeholder="Please enter the project name."
            />
            <Field
              label="Platform"
              name="platformType"
              placeholder="Please select platform."
              component={ASelect}
              validate={[required, maxLength(255)]}
            >
              <Option value={PLATFORM_TYPE.IOS}>IOS</Option>
              <Option value={PLATFORM_TYPE.ANDROID}>Android</Option>
              <Option value={PLATFORM_TYPE.WEB}>Web</Option>
            </Field>
            <Field
              label="Description "
              name="description"
              component={ATextarea}
              validate={[required, maxLengthDescription]}
              type="text"
              placeholder="Please enter the project description."
              rows={4}
            />
          </Row>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = () => {
  return {
    initialValues: {
      platformType: PLATFORM_TYPE.IOS
    },
  }
}

export default compose(
  connect(mapStateToProps, {}),
  reduxForm({
    form: 'CreateProjectForm',
  }),
)(ModalCreateProject)
