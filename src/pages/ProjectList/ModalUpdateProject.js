import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import ModalStyle from '../../styles/modal'
import { Col, Form, Select } from 'antd'
import { Field } from 'redux-form'
import { AInput, ASelect, ATextarea } from '../../components/FormUI'
import { maxLength, required } from '../../utils/validations'
import { PLATFORM_TYPE } from '../../config/constants'

class ModalUpdateProject extends React.Component {
  onSubmit(values) {
    console.log(values)
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

    const {Option} = Select

    const UploadButton = (
      <div>
        {this.uploading ? <LoadingOutlined/> : <img src={this.imageUrl} alt="avatar" style={{width: '100%'}}/>}
      </div>
    )

    return (
      <ModalStyle
        visible={visible}
        titile={'Update'}
        okText={'Update'}
        onCancel={() => {}}
        okButtonProps={{form: 'update-project-form', Key: 'submit', htmlType: 'submit'}}
      >
        <Form {...formItemLayout} layout={'vertical'} id={'update-project-form'} onFinish={handleSubmit(this.onSubmit)}>
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
        </Form>
      </ModalStyle>
    )
  }
}
