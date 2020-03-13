import React from 'react'
import { Table, Card, Button, Form, DatePicker } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import moment from 'moment'
import _ from 'lodash'

import { AInput } from '../../components/FormUI'
import TimeTrackingRequest from '../../api/Request/TimeTrackingRequest'

const valueToMoment = (value, dateFormat) => {
  if (value === undefined || value === null || value === "") {
    return undefined
  }

  return moment(value, dateFormat)
}

const DatePickerField = ({input, meta, children, hasFeedback, label, layout, ...rest}) => {
  const hasError = meta.touched && meta.invalid

  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <DatePicker
        {...input}
        {...rest}
        value={valueToMoment(input.value, rest.dateFormat)}
      />
    </Form.Item>
  )
}

const VN_TIME = 'HH:mm'
const VN_DATE = 'DD-MM-YYYY'
const SERVER_DATE = 'YYYY-MM-DD'
const formatDate = (time, format) => time ? moment(time).format(format) : ''

@observer
class TimeSheet extends React.Component {
  constructor(props) {
    super(props)
    this.fetchTimeSheet = this.fetchTimeSheet.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  @observable timeSheetsData = []
  @observable loading = false

  @action
  fetchTimeSheet(params = {}) {
    this.loading = true

    TimeTrackingRequest.all(params)
      .then((data) => {
        this.timeSheetsData = data
      })
      .finally(() => {
        this.loading = false
      })
  }

  columns() {
    return [
      {
        title: 'User Name',
        dataIndex: 'neoUser.username',
        key: 'name',
        align: 'center'
      },
      {
        title: 'Time check-in',
        dataIndex: 'checkinAt',
        align: 'center',
        render: text => <b>{formatDate(text, VN_TIME)}</b>
      },
      {
        title: 'Time check-out',
        dataIndex: 'checkoutAt',
        key: 'checkoutAt',
        align: 'center',
        render: text => <b>{formatDate(text, VN_TIME)}</b>
      },
      {
        title: 'Time to work',
        dataIndex: 'timeWorking',
        key: 'timeWorking',
        align: 'center',
        render: (value, record) => <b>{this.timeToWork(record.checkinAt, record.checkoutAt)}</b>
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        align: 'center',
        render: text => <b>{formatDate(text, VN_DATE)}</b>
      },
    ]
  }

  timeToWork(checkin, checkout) {
    if (checkin && checkout) {
      let timeWorked = 0
      const checkinTime = moment(checkin)
      const checkoutTime = moment(checkout)

      const relaxTimeStart = moment(checkin, 'YYYY-MM-DD').set({
        hour: 12,
        minute: 0
      })

      const relaxTimeEnd = moment(checkin, 'YYYY-MM-DD').set({
        hour: 13,
        minute: 0
      })

      if (checkinTime < relaxTimeStart) {
        timeWorked = timeWorked + moment.duration(moment(relaxTimeStart).diff(checkinTime)).asHours()
      }

      if (checkoutTime > relaxTimeEnd) {
        timeWorked = timeWorked + moment.duration(moment(checkoutTime).diff(relaxTimeEnd)).asHours()
      }

      const hoursWorked = _.round(Number(timeWorked), 1)

      return `${hoursWorked} hours`
    }

    return '0 hours'
  }

  componentDidMount() {
    const initDate = {
      date: moment().format(SERVER_DATE)
    }

    this.props.initialize(initDate)

    this.fetchTimeSheet(initDate)
  }

  onSearch(values) {
    this.fetchTimeSheet(values)
  }

  render() {
    const {handleSubmit} = this.props

    return (
      <Card style={{margin: '100px'}}>
        <Form layout="inline" style={{marginBottom: '30px'}} onSubmit={handleSubmit(this.onSearch)}>
          <Field
            label="Name"
            name="username"
            component={AInput}
            placeholder="Please enter user name"
          />

          <Field
            label="Date"
            name="date"
            component={DatePickerField}
            dateFormat="YYYY-MM-DD"
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
          rowKey='id'
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
