import _ from 'lodash'
import React from 'react'
import { Button, Col, Form, message, Row, Upload } from 'antd'
import { Field, reduxForm, change } from 'redux-form'
import { PhotoshopPicker } from 'react-color'
import { action, observable } from 'mobx'
import { compose } from 'redux'
import { observer } from 'mobx-react'

import ModalStyle from '../../styles/modal'
import { AInput, ATextarea } from '../../components/FormUI'
import { ColorBox, DivFlex, StyleAvatar, StyleUpload } from './styled'
import { ShowIf } from '../../components/Utils'
import { fileValidator, maxLength, required } from '../../utils/validations'
import { LoadingOutlined } from '@ant-design/icons'
import StorageRequest from '../../api/Request/StorageRequest'

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
  @observable uploading = false
  @observable fileUrl = undefined

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
        console.log(data)
        dispatch(change('UpdateProjectForm', 's3Key', _.get(data, 'data.storageKey')))
        onSuccess(file)
      })
      .catch(e => {
        file.uploadError = true
        onError(e, _.get(e, 'message', ''), file)
      })
      .finally(() => {
        this.uploading = false
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
    const {handleSubmit, initialValues, project} = this.props
    const imageUrl = this.fileUrl || _.get(project, 'latestAppBuild.s3Url', false)
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
        visible={this.visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={() => this.closeModal()}
        okButtonProps={{form: 'update-project-form', key: 'submit', htmlType: 'submit'}}
        width={600}
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
              <Field
                name="s3Key"
                component={AInput}
                type="hidden"
              />
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
