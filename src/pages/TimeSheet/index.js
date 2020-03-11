import React from 'react'
import { Table, Card, Button, Form } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import moment from 'moment'
import _ from 'lodash'

import { ADatePicker, AInput } from '../../components/FormUI'
import TimeTrackingRequest from '../../api/Request/TimeTrackingRequest'


@observer
class TimeSheet extends React.Component {
  constructor(props) {
    super(props)
    this.fetchTimeSheet = this.fetchTimeSheet.bind(this)
  }

  @observable timeSheetsData = []
  @observable loading = false

  @action
  fetchTimeSheet(form = {}) {
    this.loading = true

    // @TODO: get correct type of date and send date to params
    const params = _.pick(form, ['username'])

    TimeTrackingRequest.all(params)
        .then((data) => {
          this.timeSheetsData = data
          this.loading = false
        })
  }

  columns() {
    return [
      {
        title: 'User Name',
        dataIndex: 'neoUser.username',
        key: 'name',
      },
      {
        title: 'Time check-in',
        dataIndex: 'checkinAt',
        key: 'age',
      },
      {
        title: 'Time check-out',
        dataIndex: 'checkoutAt',
        key: 'address',
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'date',
      },
    ]
  }

  componentDidMount() {
    const initDate = {
      date: moment()
    }
    this.props.initialize(initDate)
    this.fetchTimeSheet({
      date: moment().format('YYYY-MM-DD')
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Card style={{margin: '100px'}}>
        <Form layout="inline" style={{marginBottom: '30px'}} onSubmit={handleSubmit(this.fetchTimeSheet)}>
          <Field
            label="Name"
            name="username"
            component={AInput}
            value="TOAN"
            placeholder="Please enter user name"
          />

          <Field
            label="Date"
            name="date"
            component={ADatePicker}
            placeholder="Working date"
          />

          <Button
            shape="round"
            type="primary"
            htmlType="submit"
            style={{marginTop: '4px'}}
          >
            Search
          </Button>
        </Form>
        <Table
            loading={this.loading}
            bordered={true}
            pagination={false}
            dataSource={this.timeSheetsData}
            columns={this.columns()}
        />
      </Card>
    )
  }
}

const enhancer = compose(
  reduxForm({
    form: 'SearchTimeSheetForm'
  }),
  withRouter,
)

export default enhancer(TimeSheet)
