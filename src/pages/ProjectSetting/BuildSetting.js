import React from 'react'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import { Collapse, Card, Form, Button, Icon, message } from 'antd'
import _ from 'lodash'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { Field, reduxForm, initialize, reset, getFormValues } from 'redux-form'

import ProjectRequest from '../../api/Request/ProjectRequest'
import { Box } from '../../styles/utility'
import { AInput } from '../../components/FormUI'
import { required } from '../../utils/validations'
import PopupAddConfig from './PopupAddConfig'
import { connect } from 'react-redux'

const { Panel } = Collapse

@observer
class BuildSetting extends React.PureComponent {
  @observable loading = false
  @observable settings = []
  @observable visibleModel = false
  @observable updating = false

  @action onToggleModal() {
    this.visibleModel = !this.visibleModel
  }

  @action onCreateConfig(values) {
    const {match: {params}, dispatch} = this.props

    message.loading({content: 'Processing...', key: 'create_config'})

    ProjectRequest
      .createBuildConfig(params.projectId, values)
      .then((data) => {
        message.success({content: 'Create build config successfully!', key: 'create_config', duration: 2})
        this.onToggleModal()
        this.fetchSettings()
        dispatch(reset('AddConfigForm'))
      })
  }

  @action fetchSettings() {
    const {match: {params}} = this.props
    this.loading = true

    ProjectRequest
      .buildConfigs(params.projectId)
      .then((data) => {
        this.settings = data.data

        this.initFormValue(this.settings)
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action initFormValue(configs) {
    const {dispatch} = this.props

    const formValues = {}
    _.map(toJS(configs), (config, index) => {
      _.map(_.keys(config.jsonValue), (key) => {
        const formKey = `${config.projectKey}_${key}`
        formValues[formKey] = config.jsonValue[key]
      })
    })

    dispatch(initialize('BuildSettingForm', formValues))
  }

  @action onUpdateConfig(projectKey) {
    this.updating = true
    const {match: {params}, formValues} = this.props
    const data = {
      projectKey
    }

    _.mapKeys(formValues, (value, key) => {
      if (_.includes(key, projectKey)) {
        const fieldName = _.replace(key, `${projectKey}_`, '')

        data[fieldName] = value
      }
    })

    ProjectRequest
      .updateBuildConfig(params.projectId, data)
      .then((data) => {
        this.fetchSettings()
      })
      .finally(() => {
        this.updating = false
      })
  }

  constructor(props) {
    super(props);

    this.onCreateConfig = this.onCreateConfig.bind(this)
    this.onToggleModal = this.onToggleModal.bind(this)
    this.onUpdateConfig = this.onUpdateConfig.bind(this)
  }

  componentDidMount() {
    this.fetchSettings()
  }

  render() {
    return (
      <Box>
        <Card loading={this.loading}>

          <Box mb={3}>
            <Button
              type="dashed"
              block
              onClick={this.onToggleModal}
            >
              <Icon type="plus"/>Add Config
            </Button>

            <PopupAddConfig onSubmit={this.onCreateConfig} visible={this.visibleModel} onToggle={this.onToggleModal}/>
          </Box>

          <Form layout='vertical'>
            <Collapse accordion>
              {
                _.map((toJS(this.settings)), (setting) => {
                  return (
                    <Panel header={setting.projectKey} key={setting.id}>

                      <Box m={20}>
                        {
                          _.map(_.keys(setting.jsonValue), (key, index) => {
                            return (
                              <Field
                                key={index}
                                label={key}
                                name={`${setting.projectKey}_${key}`}
                                component={AInput}
                                value={setting.jsonValue[key]}
                                placeholder={key}
                                validate={[required]}
                              />
                            )
                          })
                        }

                        <Button type='primary' loading={this.updating} onClick={() => this.onUpdateConfig(setting.projectKey)}>Save</Button>
                      </Box>
                    </Panel>
                  )
                })
              }
            </Collapse>
          </Form>

        </Card>
      </Box>
    )
  }
}

const mapStateToProp = (state) => {
  return {
    formValues: getFormValues('BuildSettingForm')(state)
  }
}

const enhancer = compose(
  connect(mapStateToProp, {}),
  withRouter,
  reduxForm({
    form: 'BuildSettingForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    updateUnregisteredFields: true
  })
)

export default enhancer(BuildSetting)
