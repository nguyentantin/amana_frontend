import { Modal, Form, Select, Row } from 'antd'
import { Field, reduxForm } from 'redux-form'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import injectReducer from '../../store/injectReducer'
import injectSaga from '../../store/injectSaga'
import reducer from './store/reducers'
import saga from './store/sagas'
import { createProject } from './store/actions'
import { AInput, ASelect, ATextarea } from '../../components/FormUI'

const { Option } = Select

class ModalCreateProject extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(value) {
    const { createProject } = this.props
    createProject(value)
  }

  render() {
    const { visible, onCancel, onCreate, handleSubmit } = this.props
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Modal
        visible={visible}
        title="Create"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        okButtonProps={{form:'create-project-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout="vertical" id='create-project-form' onSubmit={handleSubmit(this.onSubmit)}>
          <Row>
            <Field
              label="Name"
              name="name"
              component={AInput}
              type="text"
              placeholder="title"
            />
            <Field
              label="Platform"
              name="platformType"
              component={ASelect}
              defaultValue="ios"
            >
              <Option value="ios">IOS</Option>
              <Option value="android">Android</Option>
            </Field>
            <Field
              label="Description "
              name="description"
              component={ATextarea}
              type="text"
              placeholder="Textarea"
              rows={4}
            />
          </Row>
        </Form>
      </Modal>
    )
  }
}

const mapDispatchToProps = { createProject }

export default compose(
  connect(null, mapDispatchToProps),
  injectReducer({key: 'project', reducer}),
  injectSaga({key: 'project', saga}),
  reduxForm({
    form: 'CreateProjectForm',
  }),
) (ModalCreateProject)
