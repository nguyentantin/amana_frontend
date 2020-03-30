import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import ModalStyle from '../../styles/modal'
import { Col, Form, Row, Select } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { AInput, ASelect, ATextarea } from '../../components/FormUI'
import { maxLength, required } from '../../utils/validations'
import { PLATFORM_TYPE } from '../../config/constants'
import { compose } from 'redux'
import ModalCreateProject from './ModalCreateProject'

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
    xs: {
      span: 24
    },
    md: {
      span: 19
    }
  }
}
const {Option} = Select
const maxLengthDescription = maxLength(255)

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
    const {onUpdateProject, project} = this.props
    onUpdateProject(project.id, values, () => {})
  }

  render() {
    const {visible, handleSubmit, project} = this.props

    return (
      <ModalStyle
        visible={visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={this.toggleModal}
        okButtonProps={{form: 'update-project-form', Key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout={'vertical'} id={'update-project-form'} onFinish={handleSubmit(this.onSubmit)}>
          <Row>
            <Col span={24}>
              <Field
                name="storageKey"
                component={AInput}
                type="hidden"
                defaultValue={project.latestAppBuild.s3Url}
              />
              <Field
                label="Name"
                name="name"
                component={AInput}
                validate={[required]}
                type="text"
                placeholder="Please enter the project name."
                defaultValue={project.name}
              />
              <Field
                label="Platform"
                name="platformType"
                placeholder="Please select platform."
                component={ASelect}
                validate={[required, maxLength(255)]}
                defaultValue={project.platformType}
              >
                <Option value={PLATFORM_TYPE.IOS}>IOS</Option>
                <Option value={PLATFORM_TYPE.ANDROID}>Android</Option>
                <Option value={PLATFORM_TYPE.WEB}>Web</Option>
              </Field>
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
)(ModalCreateProject)
