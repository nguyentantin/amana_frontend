import React from 'react'
import { Form, Select } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14}
  }
}

const FieldSelect = ({input, meta, children, hasFeedback, label, layout, ...rest}) => {
  const hasError = meta.touched && meta.invalid
  let layoutInput = {}

  if (!_.isEmpty(layout)) {
    layoutInput = {
      ...formItemLayout,
      ...layout
    }
  }

  return (
    <FormItem
      {...layoutInput}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Select value={input.value} onChange={input.onChange} {...rest}>
        {children}
      </Select>
    </FormItem>
  )
}

export default FieldSelect
