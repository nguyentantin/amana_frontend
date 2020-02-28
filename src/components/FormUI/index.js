import makeField from './makeField'
import { Input, Radio, Select, Checkbox, DatePicker } from 'antd'

const RadioGroup = Radio.Group
const {TextArea} = Input
const {RangePicker} = DatePicker

const AInput = makeField(Input)
const ARadioGroup = makeField(RadioGroup)
const ASelect = makeField(Select)
const ACheckbox = makeField(Checkbox)
const ATextarea = makeField(TextArea)
const ARangePicker = makeField(RangePicker)

export {
  AInput,
  ARadioGroup,
  ASelect,
  ACheckbox,
  ATextarea,
  ARangePicker
}
