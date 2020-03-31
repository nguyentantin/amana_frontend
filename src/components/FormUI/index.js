import { Input, Radio, Select, Checkbox, DatePicker } from 'antd'
import makeField from './makeField'
import { PhotoshopPicker } from 'react-color'

const RadioGroup = Radio.Group
const {TextArea} = Input
const {RangePicker} = DatePicker

const AInput = makeField(Input)
const ARadioGroup = makeField(RadioGroup)
const ASelect = makeField(Select)
const ACheckbox = makeField(Checkbox)
const ATextarea = makeField(TextArea)
const ARangePicker = makeField(RangePicker)
const ADatePicker = makeField(DatePicker)
const ColorPicker = makeField(PhotoshopPicker)

export {
  AInput,
  ARadioGroup,
  ASelect,
  ACheckbox,
  ATextarea,
  ARangePicker,
  ADatePicker,
  ColorPicker,
}
