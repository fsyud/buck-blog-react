import React from 'react'
import styles from './index.less'
import Link from 'umi/link'
import { Layout, Menu, Row, Col, Result, Button, Badge, Avatar } from 'antd'

const { Header, Footer, Sider, Content } = Layout;

import logo from 'assets/icon/buck.png'
// 全局定义403错误页面
// FC = Functional Component
const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary" key="console">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
)

const BasicLayout: React.FC = props => {
  return (
    <Layout className={styles.layouts}>
      <Header className={styles.header}>
        <Row>
          <Col span={4}>
            <div className={styles.logo}>
              <img src={logo} alt="err" />
            </div>
          </Col>
          <Col span={13}>
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
          <Col span={7}>
            <span>
              <Badge dot>
                <Avatar shape="square" icon="user" />
              </Badge>
            </span>
          </Col>
        </Row>
      </Header>
      <Layout className={styles.layouts_second}>
        <Col span={18}>
          <Content className={styles.content}>{props.children}</Content>
        </Col>
        <Col span={6}>
          <Sider className={styles.sider}>Sider</Sider>
        </Col>
      </Layout>
      <Footer className={styles.footer}>
        <Row>
          <Col span={12} offset={6}>
            col-12 col-offset-6
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

export default BasicLayout
