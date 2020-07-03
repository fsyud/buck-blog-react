import React from 'react';
import {
  Layout,
  Menu,
  Row,
  Col,
  Badge,
  Avatar,
  Dropdown,
  Button,
  notification
} from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { GithubOutlined, MailOutlined } from '@ant-design/icons'

import BlogMenu from './../blogmenu';
import { NavList } from '@/constant/_common'
import { ConnectProps } from '@/models/connect';
import { registerParam } from '@/service/data.d'
import { sessionStorageSet, sessionStorageRemove } from '@/utils/tool/tool'
import RegisterModal from '@/components/registerModal'
import styles from './index.less';
import logo from '@/assets/icon/buck.png';
import sculpture from '@/assets/avatar/cat.jpeg';
import { async } from 'q';

interface HeaderRightProps extends ConnectProps {
  currPath?: string;
  Refresh: (pam: boolean) => void;
}

interface HeaderRightState{
  visible: boolean;
  action: string;
  loginState: boolean;
  curUser: string;
}

const { Header } = Layout;

const defaultLogoDom = (
  <div className={styles.logo}>
    <img src={logo} alt="err" />
  </div>
);

class BlogHeader extends React.Component<HeaderRightProps, HeaderRightState> {
  constructor(props: HeaderRightProps) {
    super(props);
    this.state = {
      visible: false,
      action: 'register',
      loginState: false,
      curUser: '',
    }
  }

  componentDidMount() {
    const curUserInfo = window.sessionStorage.userInfo
    if (curUserInfo) {
      const curInfo = JSON.parse(curUserInfo)
      this.setState({ curUser: curInfo.name })
      this.setState({ loginState: true })
    }
  }

  render() {
    const { currPath, Refresh} = this.props;
    const { visible, action, loginState, curUser } = this.state;


    // 登出
    const onClick = ({ key }: any) => {
      const _this = this;
      if (key === '1') {
        request('/api/logout', { method: 'post' })
          .then(function(response) {
            notification.info({
              message: response.message,
              duration: 1
            });
            _this.setState({ loginState: false });
            sessionStorageRemove('userInfo')
            if(Refresh) Refresh(true)
          })
          .catch(function(error) {
            notification.info({ message: error });
          });
      }
    }

    const menu = (
      <Menu onClick={onClick}>
        <Menu.Item key="0">个人中心</Menu.Item>
        <Menu.Item key="1">退出登陆</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" disabled>
          修改密码
        </Menu.Item>
      </Menu>
    )

    // 注册
    const userRegisterModal = (e: any): void => {
      this.setState({ visible: true });
      this.setState({ action: 'register' });
    }

    // 取消
    const handleCancel = () => {
      this.setState({ visible: false });
    }

    // 登录按钮状态
    const LoginElement = (props: any) => {
      let ele;
      if (props.sta) {
        ele = (
          <div className={styles.userInfolist}>
            <div className={styles.incon_list}>
              <GithubOutlined style={{fontSize: '23px', marginTop: '22px'}} />
              <MailOutlined style={{fontSize: '23px', marginTop: '22px'}} />
            </div>
            <Badge dot>
              <Avatar src={sculpture} shape="square" />
            </Badge>
            <Dropdown overlay={menu}>
              <a className={styles.dropLink} href="#">
                {curUser}
              </a>
            </Dropdown>
          </div>
        );
      } else {
        ele = (
          <div className={styles.button}>
            <Button type="primary" onClick={userRegisterModal}>
              <UserAddOutlined />
              注册
            </Button>
            <Button onClick={loginRegisterModal}>
              <UserOutlined />
              登录
            </Button>
          </div>
        );
      }
      return ele;
    }

    // 提交表单
    const handleSubmit = (val: registerParam, act: string) => {
      const _this = this;
      if (act === 'register') {
        request('/api/register', {
          method: 'post',
          data: { ...val },
        })
          .then(res => {
            notification.info({
              message: res.message,
              duration: 1
            });
            if (res.code === 1) return;
            _this.setState({ visible: false });
          })
          .catch(function(error) {
            notification.info({
              message: error,
              duration: 0.5
            });
          });
      } else {
        request('/api/login', {
          method: 'post',
          data: { ...val },
        })
          .then(res => {
            notification.info({
              message: res.message,
              duration: 1
            });
            if (res.code === 1) return;
            _this.setState({ visible: false });
            _this.setState({ loginState: true });
            _this.setState({ curUser: res.data.name });
            let userInfo = {
              _id: res.data._id,
              name: res.data.name,
              avatar: res.data.avatar,
            };
            sessionStorageSet('userInfo', userInfo);

            if (Refresh) {
              setTimeout(() => {
                Refresh(true);
              }, 1000);
            }
          })
          .catch(function(error) {
            notification.info({
              message: error,
              duration: 0.5
            });
          });
      }
    }

    // 登录
    const loginRegisterModal = () => {
      this.setState({ visible: true });
      this.setState({ action: 'login' });
    }

    return (
      <div>
        <Header className={styles.header}>
          <Row>
            <Col span={3}>{defaultLogoDom}</Col>
            <Col span={15}>
              <BlogMenu NavList={NavList} menuSelect={currPath} />
            </Col>
            <Col span={6}>
              <div className={styles.userInfo}>
                <LoginElement sta={loginState} />
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
export default BlogHeader;
