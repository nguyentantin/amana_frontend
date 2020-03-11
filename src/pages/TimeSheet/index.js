import React from 'react'
import { Table, Card, Button, Form } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'

import { AInput, ARangePicker } from '../../components/FormUI'

class TimeSheet extends React.Component {
  columns() {
    return [
      {
        title: 'User Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Time check-in',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Time check-out',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
    ]
  }

  dataSource() {
    return [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },

    ]
  }

  render() {
    return (
      <Card style={{margin: '100px'}}>
        <Form layout="inline" style={{marginBottom: '30px'}}>
          <Field
            label="Name"
            name="username"
            component={AInput}
            placeholder="Please enter user name"
          />

          <Field
            label="Date"
            name="date"
            component={ARangePicker}
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
        <Table bordered={true} pagination={false} dataSource={this.dataSource()} columns={this.columns()}/>
      </Card>
    )
  }
}

const enhancer = compose(
  reduxForm({
    form: 'SearchTimeSheetForm'
  })
)

export default enhancer(TimeSheet)
