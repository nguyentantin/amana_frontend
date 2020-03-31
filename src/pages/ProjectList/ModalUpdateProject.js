import _ from 'lodash'
import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { PhotoshopPicker } from 'react-color'
import { action, observable } from 'mobx'
import { compose } from 'redux'
import { observer } from 'mobx-react'

import ModalStyle from '../../styles/modal'
import { AInput, ATextarea } from '../../components/FormUI'
import { ColorBox, DivFlex } from './styled'
import { ShowIf } from '../../components/Utils'
import { maxLength, required } from '../../utils/validations'

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
  @observable visible = false
  @observable color = undefined
  @observable colorPickerVisible = false

  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleColorPicker = this.toggleColorPicker.bind(this)
    this.handleCancelColorPicker = this.handleCancelColorPicker.bind(this)
  }

  @action toggleVisible() {
    this.visible = !this.visible
  }

  @action toggleColorPicker() {
    this.colorPickerVisible = !this.colorPickerVisible
  }

  @action changeColor(value) {
    this.color = value.hex
  }

  @action closeModal() {
    const {onCloseModal} = this.props

    this.toggleVisible()
    this.color = undefined
    this.colorPickerVisible = false
    setTimeout(() => {onCloseModal()}, 300)
  }

  handleCancelColorPicker() {
    this.color = undefined
    this.toggleColorPicker()
  }

  onSubmit(data) {
    const {onUpdateProject, project} = this.props
    const updateData = _.clone(data)
    if (this.color) {
      updateData.color = this.color
    }

    onUpdateProject(project.id, updateData)
    this.closeModal()
  }

  componentDidMount() {
    this.toggleVisible()
  }

  render() {
    const {handleSubmit, initialValues} = this.props

    return (
      <ModalStyle
        visible={this.visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={() => this.closeModal()}
        okButtonProps={{form: 'update-project-form', key: 'submit', htmlType: 'submit'}}
        width={600}
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

              <DivFlex>
                <Button onClick={this.toggleColorPicker}>Color</Button>
                <ColorBox style={{backgroundColor: this.color ?? initialValues.color}}/>
              </DivFlex>

              <ShowIf condition={this.colorPickerVisible}>
                <PhotoshopPicker
                  color={this.color ?? initialValues.color}
                  onChange={(value) => this.changeColor(value)}
                  onAccept={() => this.toggleColorPicker()}
                  onCancel={() => {this.handleCancelColorPicker()}}
                />
              </ShowIf>
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
