import React, { FC, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { registerParam } from '@/service/data.d'
import styles from './index.less'

const FormItem = Form.Item;
const { TextArea } = Input;

// 定义父级元素的传值类型
interface OperationModalProps {
  visible: boolean;
  action: string;
  onSubmit: (values: registerParam, action: string) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const RegisterModal: FC<OperationModalProps> = (props) => {
  // eslint-disable-next-line
  const [ form ] = Form.useForm()

  const { visible, onCancel, onSubmit, action } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const modalFooter ={
    okText: action ===  'register' ? '注册' : '登录',
    cancelText: '取消',
    onOk: handleSubmit,
    onCancel
  };

  // 验证完成 确定
  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as registerParam, action);
    }
  };

  // 邮箱格式验证
  const emailRules = [
    { required: true, message: '请输入邮箱！' },
    {
      pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      message: '请输入正确的邮箱格式！',
    },
  ];

  // 用户名
  const UserNameItem = (props, config) => {
    const act = props.act
    if(act === 'register') {
      return (
        <FormItem
          name="name"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
      )
    } else return <div></div>
  }

  // 手机号
  const UserPhoneItem = (props) => {
    const act = props.act
    if(act === 'register') {
      return (
        <FormItem
          name="phone"
          label="手机号"
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
      )
    } else return <div></div>
  }

  // 简介
  const UserIntroduceItem = (props) => {
    const act = props.act
    if(act === 'register') {
      return (
        <FormItem
          name="introduce"
          label="个人简介"
          rules={[{ message: '请输入至少五个字符的个人简介！', min: 5 },]}
        >
          <TextArea rows={4} placeholder="请输入个人简介" />
        </FormItem>
      )
    } else return <div></div>
  }

  const getModalContent = () => {
    return (
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        <FormItem
          name="email"
          label="邮箱"
          rules={emailRules}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <UserNameItem act={action}/>
        <FormItem
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <UserPhoneItem act={action}/>
        <UserIntroduceItem act={action}/>
      </Form>
    )
  }

  return (
    <Modal
      getContainer={false}
      forceRender
      title={action === 'register' ? '注册' : '登录'}
      className={styles.standardListForm}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
}

export default RegisterModal;
