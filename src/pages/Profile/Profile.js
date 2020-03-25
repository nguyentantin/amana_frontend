import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Divider, Select } from 'antd'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'

import { AInput, ASelect } from '../../components/FormUI'
import { StyleContainer, StyleCard, StyleLink } from './styled'
import { email, required } from '../../utils/validations'
import { ROLES } from '../../config/constants'
import UserRequest from '../../api/Request/UserRequest'

const { Option } = Select

@observer
class ProfilePage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  @observable profile = {}
  @observable loading = false

  @action fetchProfile() {
    this.loading = true

    UserRequest
      .profile()
      .then((data) => {
        this.profile = data
      })
      .finally(() => {
        this.loading = false
      })
  }

  onSubmit(values) {
    console.log('form', values)
  }

  componentDidMount() {
    this.fetchProfile()
  }

  render() {
    const {handleSubmit, loading} = this.props

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
 
    return (
      <StyleContainer>
        <StyleCard>
            <h2>Profile</h2>
            <Divider />
            <Form {...formItemLayout} onSubmit={handleSubmit(this.onSubmit)}>
              <Field
                label="Name"
                name="name"
                component={AInput}
                type="text"
                placeholder="Please enter name"
                size='large'
                validate={[required, email]}
              />
              <Field
                label="Email"
                name="email"
                component={AInput}
                type="email"
                placeholder="Please enter email"
                size='large'
                validate={[required, email]}
              />
              <Field
                label="Password"
                name="password"
                component={AInput}
                type='password'
                placeholder="Please enter password"
                size='large'
                validate={[required]}
              />
              <Field
                label="New Password"
                name="newPassword"
                component={AInput}
                type='password'
                placeholder="Please enter password"
                size='large'
                validate={[required]}
              />
              <Field
                label="Confirm Password"
                name="confirmPassword"
                component={AInput}
                type='password'
                placeholder="Please enter password"
                size='large'
                validate={[required]}
              />
              <Field
                label="Roles"
                name='roles'
                style={{width: '222px'}}
                component={ASelect}
              >
                <Option value={ROLES.SUPER_ADMIN}>Admin</Option>
                <Option value={ROLES.PROJECT_ADMIN}>Project Admin</Option>
                <Option value={ROLES.PROJECT_MEMBER}>Project Member</Option>
              </Field>
              <StyleLink pl={[0, 45]}>
                <Button
                  style={{width: '300px'}}
                  shape="round"
                  type="primary"
                  size='large'
                  htmlType="submit"
                  loading={loading}
                >
                  Save Changes
                </Button>
              </StyleLink>
            </Form>
          </StyleCard>
      </StyleContainer>
    )
  }
}

const mapStateToProps = () => {
  return {
    initialValues: {
      roles: ROLES.PROJECT_ADMIN
    }
  }
}

export default compose(
  connect(mapStateToProps, {}),
  reduxForm({
    form: 'ProfileForm'
  })
)(ProfilePage)

