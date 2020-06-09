import React from 'react';
import {
  Layout,
  Menu,
  Row,
  Col,
  Badge,
  Avatar,
  Dropdown,
  message,
  Button,
  notification
} from 'antd';
import { connect } from 'dva';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import request from 'umi-request';

import BlogMenu from './../blogmenu';
import { CurrentUser } from '@/models/common.d';
import { ConnectProps } from '@/models/connect';
import { StateType } from '@/models/layoutmodel';
import { registerParam } from '@/service/data.d'
import RegisterModal from '@/components/registerModal'
import styles from './index.less';
import logo from '@/assets/icon/buck.png';
import sculpture from '@/assets/avatar/cat.jpeg';

interface HeaderRightProps extends ConnectProps {
  currentUser?: CurrentUser;
  currPath?: string;
}

interface  HeaderRightState{
  visible: boolean;
  action: string;
  loginState: boolean;
}

const { Header } = Layout;

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);

  if( key === '1' ) {
    request('/api/logout', { method: 'post' })
      .then(function(response) {
        notification.info({ message: response.message });
      })
      .catch(function(error) {
        notification.info({ message: error });
      });
  }
};

const defaultLogoDom = (
  <div className={styles.logo}>
    <img src={logo} alt="err" />
  </div>
);

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="0">个人中心</Menu.Item>
    <Menu.Item key="1">退出登陆</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      修改密码
    </Menu.Item>
  </Menu>
);

class BlogHeader extends React.Component<HeaderRightProps, HeaderRightState> {
  constructor(props: HeaderRightProps) {
    super(props)
    this.state = {
      visible: false,
      action: 'register',
      loginState: false
    }
  }

  componentDidMount() { }

  render() {
    const { currentUser = {}, currPath } = this.props;

    const { visible, action, loginState } = this.state

    // 注册
    const userRegisterModal = (e): void => {
      this.setState({visible: true})
      this.setState({action: 'register'})
    };

    // 取消
    const handleCancel = () => {
      this.setState({visible: false})
    }

    // 登录按钮状态
    const LoginElement = (props) => {
      const sta = props.sta
      let ele
      if(sta) {
        ele = (
          <div>
            <Button type="primary" onClick={userRegisterModal}>
              <UserAddOutlined />
              注册
            </Button>
            <Button
              onClick={loginRegisterModal}
            >
              <UserOutlined />
              登录
            </Button>
          </div>
        )
      } else {
        ele = (
          <Dropdown overlay={menu}>
            <a className={styles.dropLink} href="#">
              '用户名'
            </a>
          </Dropdown>
        );
      }
      return ele
    }

    // 提交表单
    const handleSubmit = (val: registerParam, act: string) => {
      const _this = this
      if (act === 'register') {
        request('/api/register', {
          method: 'post',
          data: { ...val },
        })
          .then(function(response) {
            notification.info({ message: response.message });
            if (response.code === 1) {
              return;
            }
            _this.setState({ visible: false });
          })
          .catch(function(error) {
            notification.info({ message: error });
          });
      } else {
        console.log(act)
        request('/api/login', {
          method: 'post',
          data: { ...val },
        })
          .then(function(response) {
            notification.info({ message: response.message });
            if (response.code === 1) {
              return;
            }
            _this.setState({ visible: false });
          })
          .catch(function(error) {
            notification.info({ message: error });
          });
      }
    }

    // 登录
    const loginRegisterModal = () => {
      this.setState({visible: true})
      this.setState({action: 'login'})
    }

    return (
      <div>
        <Header className={styles.header}>
          <Row>
            <Col span={3}>{defaultLogoDom}</Col>
            <Col span={15}>
              <BlogMenu menuSelect={currPath} />
            </Col>
            <Col span={6}>
              <div className={styles.userInfo}>
                <span>
                  <Badge dot>
                    <Avatar src={sculpture} shape="square" />
                  </Badge>
                </span>
                <LoginElement sta = {loginState}/>
              </div>
            </Col>
          </Row>
        </Header>
        <RegisterModal
          visible={visible}
          action={action}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
}

// export default BlogHeader;
export default connect(({ accountCenter }: { accountCenter: StateType }) => ({
  currentUser: accountCenter.currentUser,
}))(BlogHeader);
