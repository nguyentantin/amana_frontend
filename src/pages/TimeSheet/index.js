import React from 'react'
import { Table, Card, Button, Form, DatePicker } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import moment from 'moment'

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

const VN_DATE_TIME = 'HH:mm:ss DD-MM-YYYY'
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
      },
      {
        title: 'Time check-in',
        dataIndex: 'checkinAt',
        key: 'checkinAt',
        render: text => formatDate(text, VN_DATE_TIME)
      },
      {
        title: 'Time check-out',
        dataIndex: 'checkoutAt',
        key: 'checkoutAt',
        render: text => formatDate(text, VN_DATE_TIME)
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => formatDate(text, VN_DATE)
      },
    ]
  }

  componentDidMount() {
    const initDate = {
      date: moment()
    }

    this.props.initialize(initDate)

    this.fetchTimeSheet({
      date: moment().format(SERVER_DATE)
    })
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
