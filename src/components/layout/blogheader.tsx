import React, { PureComponent }from 'react'
import { Layout, Menu, Row, Col, Badge, Avatar } from 'antd'
import styles from './blogheader.less'

const { Header } = Layout

import logo from '@/assets/icon/buck.png'

export interface NoticeIconProps {
  avatar?: string
}

// 需定义 class 组件，需要继承 React.Component：
// 我们强烈建议你不要创建自己的组件基类。 在 React 组件中，代码重用的主要方式是组合而不是继承。
export default class BlogHeader extends PureComponent<NoticeIconProps> {
  render () {
    return (
      <Header className={styles.header}>
        <Row>
          <Col span={4}>
            <div className={styles.logo}>
              <img src={logo} alt="err" />
            </div>
          </Col>
          <Col span={14}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '70px',  borderBottom: 'none'}}
            >
              <Menu.Item key="1">文章</Menu.Item>
              <Menu.Item key="2">关于</Menu.Item>
              <Menu.Item key="3">个人</Menu.Item>
            </Menu>
          </Col>
          <Col span={6}>
            <span>
              <Badge dot>
                <Avatar shape="square" icon="user" />
              </Badge>
            </span>
          </Col>
        </Row>
      </Header>
    )
  }
}
