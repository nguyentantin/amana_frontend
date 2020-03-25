import React from 'react'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import { Collapse, Card, Form, Button, Icon, message } from 'antd'
import _ from 'lodash'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { Field, reduxForm, initialize } from 'redux-form'

import ProjectRequest from '../../api/Request/ProjectRequest'
import { Box } from '../../styles/utility'
import { AInput } from '../../components/FormUI'
import { required } from '../../utils/validations'
import PopupAddConfig from './PopupAddConfig'

const { Panel } = Collapse

@observer
class BuildSetting extends React.PureComponent {
  @observable loading = false
  @observable settings = []

  @observable visibleModel = false

  @action onToggleModal() {
    this.visibleModel = !this.visibleModel
  }

  @action onCreateConfig(values) {
    const {match: {params}} = this.props

    message.loading({content: 'Processing...', key: 'create_config'})

    ProjectRequest
      .createBuildConfig(params.projectId, values)
      .then((data) => {
        message.success({content: 'Create build config successfully!', key: 'create_config', duration: 2})
        this.onToggleModal()
        this.fetchSettings()
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

  constructor(props) {
    super(props);

    this.onCreateConfig = this.onCreateConfig.bind(this)
    this.onToggleModal = this.onToggleModal.bind(this)
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

                        <Button type='primary'>Save</Button>
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

const enhancer = compose(
  withRouter,
  reduxForm({
    form: 'BuildSettingForm',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    updateUnregisteredFields: true
  })
)

export default enhancer(BuildSetting)
