import { Col, Form, message, Row, Select, Upload } from 'antd'
import { change, Field, reduxForm } from 'redux-form'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons'
import _ from 'lodash'

import { AInput, ASelect, ATextarea } from '../../components/FormUI'
import { maxLength, required } from '../../utils/validations'
import { PLATFORM_TYPE } from '../../config/constants'
import StorageRequest from '../../api/Request/StorageRequest'
import ModalStyle from '../../styles/modal'
import { StyleUpload } from './styled'

const {Option} = Select
const maxLengthDescription = maxLength(255)

@observer
class ModalCreateProject extends React.Component {
  static propTypes = {
    onCreateProject: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  @observable uploading = false
  @observable imageUrl = ''

  @action resetLogo = () => this.imageUrl = ''

  @action beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isGIF = file.type === 'image/gif'
    const isLt2MB = file.size / 1024 / 1024 < 2

    if (!isJPG && !isPNG && !isGIF) {
      message.error('You can only upload JPEG/PNG file!')

      return false
    }

    if (!isLt2MB) {
      message.error('Image must smaller than 2MB!')

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
      .then((data) => {
        dispatch(change('CreateProjectForm', 'storageKey', _.get(data, 'data.storageKey')))
        onSuccess(file)
      })
      .catch((error) => {
        file.uploadError = true
        onError(error, _.get(error, 'message', ''), file)
      })
  }

  @action getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  @action handleChangeUploadFile = (info) => {
    if (info.file.status === 'uploading') {
      this.uploading = true
      return
    }

    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.imageUrl = imageUrl
        this.uploading = false
      })
    }
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const {onCreateProject} = this.props
    onCreateProject(values, () => {
      this.resetLogo()
    })
  }

  toggleModal() {
    const {onToggle} = this.props

    onToggle()
    this.resetLogo()
  }

  render() {
    const {visible, handleSubmit} = this.props

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

    const UploadButton = (
      <div>
        {this.uploading ? <LoadingOutlined/> : <img src={this.imageUrl} alt="avatar" style={{width: '100%'}}/>}
      </div>
    )

    return (
      <ModalStyle
        visible={visible}
        title="Create"
        okText="Create"
        onCancel={() => this.toggleModal()}
        okButtonProps={{form: 'create-project-form', key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout="vertical" id='create-project-form' onFinish={handleSubmit(this.onSubmit)}>
          <Row>
            <StyleUpload display='flex' justifyContent='center'>
              <Upload
                accept='image/*'
                name="logo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={(file) => this.beforeUpload(file)}
                customRequest={(props) => this.handleUpload(props)}
                onChange={(props) => this.handleChangeUploadFile(props)}
                imageUrl={this.imageUrl}
              >
                {!this.imageUrl ? (
                  <div>
                    <CloudUploadOutlined style={{fontSize: 48}}/>
                    <div style={{fontSize: 11}}>
                      Logo formats: JPEG, PNG (max size 2MB)
                    </div>
                  </div>
                ) : UploadButton}
              </Upload>
            </StyleUpload>

            <Col span={24}>
              <Field
                name="storageKey"
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
            </Col>
          </Row>
        </Form>
      </ModalStyle>
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
