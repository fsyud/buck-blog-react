import React from 'react'
import {
  Layout, Menu, Row, Col, Badge, Avatar, Dropdown, Icon, message
} from 'antd'
import { connect } from 'dva'
import Link from 'umi/link';
import { CurrentUser } from './data.d';
import { ConnectProps } from '@/models/connect';
import { StateType } from '@/models/layoutmodel'

import styles from './index.less'

import logo from '@/assets/icon/buck.png'
import sculpture from '@/assets/avatar/cat.jpeg'

export interface HeaderRightProps extends ConnectProps {
  currentUser?: CurrentUser;
}

const { Header } = Layout

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const defaultLogoDom = (
  <div className={styles.logo}>
    <img src={logo} alt="err" />
  </div>
)

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="0">
      个人中心
    </Menu.Item>
    <Menu.Item key="1">
      退出登陆
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" disabled>
      修改密码
    </Menu.Item>
  </Menu>
)

// 需定义 class 组件，需要继承 React.Component：
// 我们强烈建议你不要创建自己的组件基类。 在 React 组件中，代码重用的主要方式是组合而不是继承。
class BlogHeader extends React.Component<HeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountCenter/fetchCurrent',
    });
  }

  render() {
    const { currentUser = {},} = this.props;
    return (
      <Header className={styles.header}>
        <Row>
          <Col span={4}>
            {defaultLogoDom}
          </Col>
          <Col span={14}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '70px', borderBottom: 'none' }}
            >
              <Menu.Item key="1">
                <Link to={''}>
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key="2">文章</Menu.Item>
              <Menu.Item key="3">关于</Menu.Item>
              <Menu.Item key="4">
                <Link to={'/user'}>
                  个人
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={6}>
            <div className={styles.userInfo}>
              <span>
                <Badge dot>
                  <Avatar src={sculpture} shape="square" icon="user" />
                </Badge>
              </span>
              <Dropdown overlay={menu} >
                <a className={styles.dropLink} href="#">
                  {currentUser.name}<Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
    )
  }
}

// export default BlogHeader;
export default connect(({ accountCenter }: { accountCenter: StateType }) => ({
  currentUser: accountCenter.currentUser,
}))(BlogHeader);
