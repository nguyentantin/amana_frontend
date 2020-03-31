import React from 'react'
import ModalStyle from '../../styles/modal'
import { Col, Form, Input, Row } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { AInput, ATextarea } from '../../components/FormUI'
import { maxLength, required } from '../../utils/validations'
import { compose } from 'redux'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    md: {
      span: 5
    }
  },
  wrapperCol: {
    span: 24
  }
}
const maxLengthDescription = maxLength(255)

@observer
class ModalUpdateProject extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  toggleModal() {
    const {onToggle} = this.props
    onToggle()
  }

  onSubmit(values) {
    console.log(values)
    this.toggleModal()
  }

  render() {
    const {visible, handleSubmit, project} = this.props

    return (
      <ModalStyle
        visible={visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={this.props.onToggle}
        okButtonProps={{form: 'update-project-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout='vertical' id='update-project-form' onFinish={handleSubmit(this.onSubmit)}>
          <Row>
            <Col span={24}>
              <Field
                label="Name"
                name="name"
                component={AInput}
                validate={[required]}
                type="text"
                placeholder="Please enter the project name."
                defaultValue={'hey we can\' leave here until 5pm'}
              />
              <Field
                label="Description"
                name="description"
                component={ATextarea}
                validate={[required, maxLengthDescription]}
                type="text"
                placeholder="Please enter the project description."
                rows={4}
                defaultValue={project.description}
              />
            </Col>
          </Row>
        </Form>
      </ModalStyle>
    )
  }
}

export default compose(
  reduxForm({
    form: 'UpdateProjectForm'
  })
)(ModalUpdateProject)
