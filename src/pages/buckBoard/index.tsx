import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch } from 'redux';
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';

import styles from './style.less'

const fieldLabels = {
  email: '邮箱',
  phone: '手机',
  name: '名字',
  content: '内容'
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

interface FormBoardFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

class buckBoard extends Component<FormBoardFormProps> {
  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        console.log(error)
      }
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Card title="留言板" className={styles.board} bordered={false}>
        <Form hideRequiredMark className={styles.loginForm}>
          <Form.Item { ...formItemLayout } label={fieldLabels.email}>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '邮箱不能为空' }],
            })(<Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入邮箱名称" />
            )}
          </Form.Item>
          <Form.Item { ...formItemLayout } label={fieldLabels.phone}>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '手机号不能为空' }],
            })(<Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入手机号" />
            )}
          </Form.Item>
          <Form.Item { ...formItemLayout } label={fieldLabels.name}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '名字不能为空' }],
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入名字" />
            )}
          </Form.Item>
          <Form.Item { ...formItemLayout } label={fieldLabels.content}>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '内容不能为空' }],
            })(<Input
              prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入内容" />
            )}
            <Button type="primary" onClick={this.validate} loading={submitting}>
                提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create<FormBoardFormProps>()(buckBoard);
