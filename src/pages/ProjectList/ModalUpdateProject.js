import React from 'react'
import ModalStyle from '../../styles/modal'
import { Col, Form, Row } from 'antd'
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
  @observable visible = false;

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  @action toggleVisible() {
    this.visible = !this.visible
  }

  closeModal() {
    const {onCloseModal} = this.props
    this.toggleVisible()
    setTimeout(() => {onCloseModal()}, 300)
  }

  onSubmit(data) {
    const {onUpdateProject, project} = this.props
    onUpdateProject(project.id, data)
    this.closeModal()
  }

  componentDidMount() {
    this.toggleVisible()
  }

  render() {
    const {handleSubmit} = this.props

    return (
      <ModalStyle
        visible={this.visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={() => this.closeModal()}
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
              />
              <Field
                label="Description"
                name="description"
                component={ATextarea}
                validate={[required, maxLengthDescription]}
                type="text"
                placeholder="Please enter the project description."
                rows={4}
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
