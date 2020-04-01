import _ from 'lodash'
import React from 'react'
import { Button, Col, Form, message, Row, Select, Upload } from 'antd'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { LoadingOutlined } from '@ant-design/icons'
import { action, observable } from 'mobx'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { observer } from 'mobx-react'

import ModalStyle from '../../styles/modal'
import StorageRequest from '../../api/Request/StorageRequest'
import { AInput, ATextarea, FieldSelect } from '../../components/FormUI'
import { Box, Flex } from '../../styles/utility'
import { ColorPicker } from '../../components/CoreUI'
import { PLATFORM_TYPE } from '../../config/constants'
import { ShowIf } from '../../components/Utils'
import { StyleAvatar, StyleUpload } from './styled'
import { fileValidator, maxLength, required } from '../../utils/validations'

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
const {Option} = Select
const maxLengthDescription = maxLength(255)

@observer
class ModalUpdateProject extends React.Component {
  @observable visible = false
  @observable colorPickerVisible = false
  @observable uploading = false
  @observable fileUrl = undefined

  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleColorPicker = this.toggleColorPicker.bind(this)
    this.handleAcceptColor = this.handleAcceptColor.bind(this)
  }

  @action toggleVisible() {
    this.visible = !this.visible
  }

  @action toggleColorPicker() {
    this.colorPickerVisible = !this.colorPickerVisible
  }

  @action closeModal() {
    const {onCloseModal} = this.props

    this.toggleVisible()
    this.colorPickerVisible = false
    setTimeout(() => {onCloseModal()}, 300)
  }

  @action beforeUpload(file) {
    const validator = fileValidator(file)

    if (!validator.isValid) {
      message.error(validator.message)

      return false
    }

    return true
  }

  @action handleUpload({file, onSuccess, onError, onProgress}) {
    const {dispatch} = this.props
    let formData = new FormData()
    formData.append('file', file)

    StorageRequest
      .uploadFile(formData, file, onProgress)
      .then(data => {
        dispatch(change('UpdateProjectForm', 's3Key', _.get(data, 'data.storageKey')))
        onSuccess(file)
      })
      .catch(e => {
        file.uploadError = true
        onError(e, _.get(e, 'message', ''), file)
      })
  }

  @action getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  @action handleChangeUploadFile(info) {
    if (info.file.status === 'uploading') {
      this.uploading = true
      return
    }

    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, fileUrl => {
        this.fileUrl = fileUrl
        this.uploading = false
      })
    }
  }

  handleAcceptColor(color) {
    const {dispatch} = this.props
    dispatch(change('UpdateProjectForm', 'color', color))
    this.toggleColorPicker()
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
    const {handleSubmit, project, color} = this.props
    const imageUrl = this.fileUrl || _.get(project, 'avatar', false)
    const Avatar = () => (
      <span>
        {imageUrl
          ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/>
          : <StyleAvatar
            mr={2}
            shape="square"
            size="large"
            name={project.name}
            style={{backgroundColor: project.color}}
          />
        }
      </span>
    )

    const UploadButton = (
      <div>
        {this.uploading
          ? <LoadingOutlined/>
          : <Avatar/>
        }
      </div>
    )

    return (
      <ModalStyle
        width={600}
        visible={this.visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={() => this.closeModal()}
        okButtonProps={{
          form: 'update-project-form',
          key: 'submit',
          htmlType: 'submit',
          disabled: this.uploading || this.colorPickerVisible
        }}
      >
        <Form {...formItemLayout} layout='vertical' id='update-project-form' onFinish={handleSubmit(this.onSubmit)}>
          <Row>
            <StyleUpload display='flex' justifyContent='center' width='100%'>
              <Upload
                accept='image/*'
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file) => this.beforeUpload(file)}
                customRequest={(props) => this.handleUpload(props)}
                onChange={(props) => this.handleChangeUploadFile(props)}
              >
                {UploadButton}
              </Upload>
            </StyleUpload>

            <Col span={24}>
              <div style={{display: 'none'}}>
                <Field
                  name="s3Key"
                  component={AInput}
                  type="hidden"
                />
                <Field
                  name="color"
                  component={AInput}
                  type="hidden"
                />
              </div>
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
                component={FieldSelect}
                validate={[required]}
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
              />

              <Flex flex={['flex']} alignItems={['center']}>
                <Button disabled={this.colorPickerVisible} onClick={() => this.toggleColorPicker()}>Color</Button>
                <Box width={20} height={20} ml={10} style={{backgroundColor: color}}/>
              </Flex>

              <ShowIf condition={this.colorPickerVisible}>
                <ColorPicker
                  color={color}
                  onAccept={(color) => this.handleAcceptColor(color)}
                  onCancel={() => this.toggleColorPicker()}
                />
              </ShowIf>
            </Col>
          </Row>
        </Form>
      </ModalStyle>
    )
  }
}

const selector = formValueSelector('UpdateProjectForm')

const mapStateToProps = state => ({
    color: selector(state, 'color')
})

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'UpdateProjectForm'
  })
)(ModalUpdateProject)
