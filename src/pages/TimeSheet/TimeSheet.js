import React from 'react'
import { Button, Form, DatePicker } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import moment from 'moment'
import _ from 'lodash'

import { AInput } from '../../components/FormUI'
import TimeTrackingRequest from '../../api/Request/TimeTrackingRequest'
import { Page, StyleForm } from './styled'
import TableStyle from '../../styles/tableResponsive'

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
        align: 'center',
        render: (text, record) => {
          return <b>{_.get(record, 'neoUser.username')}</b>
        }
      },
      {
        title: 'Time check-in',
        dataIndex: 'checkinAt',
        align: 'center',
        render: text => <span>{formatDate(text, VN_TIME)}</span>
      },
      {
        title: 'Time check-out',
        dataIndex: 'checkoutAt',
        key: 'checkoutAt',
        align: 'center',
        render: text => <span>{formatDate(text, VN_TIME)}</span>
      },
      {
        title: 'Time to work',
        dataIndex: 'timeWorking',
        key: 'timeWorking',
        align: 'center',
        render: (value, record) => <span>{this.timeToWork(record.checkinAt, record.checkoutAt)}</span>
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        align: 'center',
        render: text => <span>{formatDate(text, VN_DATE)}</span>
      },
    ]
  }

  timeToWork(checkin, checkout) {
    if (checkin && checkout) {
      let timeWorked = 0
      const checkinTime = moment(checkin)
      const checkoutTime = moment(checkout)

      const relaxTimeStart = moment(checkin, 'YYYY-MM-DD').set({hour: 12, minute: 0})

      const relaxTimeEnd = moment(checkin, 'YYYY-MM-DD').set({hour: 13, minute: 0})

      if (checkoutTime < relaxTimeStart) {
        const worked = moment.duration(moment(checkoutTime).diff(checkinTime)).asHours()

        return `${_.round(Number(worked), 1)} hours`
      }

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
      <Page>
        <StyleForm layout="inline" onFinish={handleSubmit(this.onSearch)}>
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
          >
            Search
          </Button>
        </StyleForm>
        <TableStyle
          rowKey='id'
          loading={this.loading}
          bordered={true}
          pagination={false}
          dataSource={this.timeSheetsData}
          columns={this.columns()}
        />
      </Page>
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
