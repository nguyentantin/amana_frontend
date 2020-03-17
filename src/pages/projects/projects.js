import React from 'react'
import { Divider, DatePicker, Select, Avatar, Card, Table, Progress, Icon, Radio, Input, Button, Modal, Form } from 'antd'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Link } from 'react-router-dom'

import { container } from '../../styles/mixins'
import { Flex } from '../../styles/utility'

const Container = styled.div`
  padding-top: 40px;
  ${container.centerBox}
  .ant-table-thead {
    display: none;
  }
`

const StyleAvatar = styled(Avatar)`
  ${space}
`

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyleCard = styled(Card)`
  ${space}
  padding: 12px !important;
  .ant-card-body {
    padding: 0;
  }
`

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    render: text => <Flex flex='flex'><StyleAvatar mr={2} shape="square" size="large" icon="user" /><div><div>Lorem</div>{text}</div></Flex>,
  },
  {
    dataIndex: 'owner',
    key: 'owner',
    render: owner => (
      <span>
        <div>Lorem</div>
        {owner}
      </span>
    ),
  },
  {
    dataIndex: 'daytime',
    key: 'daytime',
    render: daytime => (
      <span>
        <div>Lorem</div>
        {daytime}
      </span>
    ),
  },
  {
    dataIndex: 'progress',
    key: 'progress',
    width: 200,
    render: () => (
      <span>
        <Progress percent={60} />
      </span>
    ),
  },
  {
    key: 'action',
    width: 150,
    render: () => (
      <span>
        <Link to='/'>Lorem</Link>
        <Divider type="vertical" />
        <Link to='/' className="ant-dropdown-link">Lorem <Icon type="down" /></Link>
      </span>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'is simply dummy text of the printing',
    owner: 'dummy',
    daytime: '2020-03-16',
  },
  {
    key: '2',
    name: 'is simply dummy text of the printing',
    owner: ' dummy',
    daytime: '2020-03-16',
  },
  {
    key: '3',
    name: 'is simply dummy text of the printing',
    owner: 'dummy',
    daytime: '2020-03-16',
  },
]

const { Search } = Input

// modal
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const { Option } = Select

const { TextArea } = Input

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="Lorem"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form>
            <Form.Item {...formItemLayout} label="Title">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="DatePicker">
            {getFieldDecorator('date-picker',{
                rules: [{ type: 'object', required: true, message: 'Please select time!' }],
              })(<DatePicker style={{ width: '100%' }} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Gender">
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: 'Please select your gender!' }],
              })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleSelectChange}
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Description">
              {getFieldDecorator('description')(<TextArea rows={4} />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  },
)

class DashboardPage extends React.Component {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleCreate = () => {
    const { form } = this.formRef.props
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    return (
      <Container>
        <StyleCard p={2}>
          <StyleHeader>
            <h2>Lorem</h2>
            <div>
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">Hangzhou</Radio.Button>
                <Radio.Button value="b">Shanghai</Radio.Button>
                <Radio.Button value="c">Beijing</Radio.Button>
              </Radio.Group>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200, marginLeft: '10px' }}
              />
            </div>
          </StyleHeader>
          <Button type="dashed" block onClick={this.showModal}><Icon type="plus" />Open Modal</Button>
          <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
          <Table columns={columns} dataSource={data} />,
        </StyleCard>
      </Container>
    )
  }
}

export default DashboardPage
