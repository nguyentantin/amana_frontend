import { Modal, Form, Select, Row, Col } from 'antd'
import { Field, reduxForm } from 'redux-form'
import React from 'react'

import { AInput, ASelect, ATextarea } from '../../components/FormUI'
import { StyleLabel } from './styled'

const { Option } = Select

class ModalCreateProject extends React.Component {
  constructor() {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(value) {
    console.log('value', value)
  }
  render() {
    const { visible, onCancel, onCreate, handleSubmit } = this.props
    return (
      <Modal
        visible={visible}
        title="Lorem"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        okButtonProps={{form:'create-project-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form id='create-project-form' onSubmit={handleSubmit(this.onSubmit)}>
          <Row>
            <Col span={5}>
              <StyleLabel>Title</StyleLabel>
            </Col>
            <Col span={19}>
              <Field
                name="Title"
                component={AInput}
                type="text"
                placeholder="title"
              />
            </Col>
            <Col span={5}>
              <StyleLabel>Title2</StyleLabel>
            </Col>
            <Col span={19}>
              <Field
                name="Title2"
                component={AInput}
                type="text"
                placeholder="title2"
              />
            </Col>
            <Col span={5}>
              <StyleLabel>Select</StyleLabel>
            </Col>
            <Col span={19}>
              <Field
                name="Select"
                component={ASelect}
                defaultValue="male"
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Field>
            </Col>
            <Col span={5}>
              <StyleLabel>Textarea</StyleLabel>
            </Col>
            <Col span={19}>
              <Field
                name="Textarea"
                component={ATextarea}
                type="text"
                placeholder="Textarea"
                rows={4}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'CreateProjectForm'
})(ModalCreateProject)
