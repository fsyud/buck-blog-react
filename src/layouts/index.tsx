import React from 'react'
import styles from './index.less'
import Link from 'umi/link'
import { Layout, Row, Col, Result, Button } from 'antd'
import BlogHeader from '@/components/layout/blogheader'

const { Footer, Sider, Content } = Layout;

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

const defaultFooterDom = (
  <Footer className={styles.footer}>
    <Row>
      <Col span={12} offset={6}>
        @2019 ｜ 全栈：singlebuck
      </Col>
    </Row>
  </Footer>
)

const BasicLayout: React.FC = props => {
  return (
    <Layout className={styles.layouts}>
      <BlogHeader />
      <Layout className={styles.layouts_second}>
        <Col span={17}>
          <Content className={styles.content}>{props.children}</Content>
        </Col>
        <Col span={7}>
          <Sider className={styles.sider}></Sider>
        </Col>
      </Layout>
      {defaultFooterDom}
    </Layout>
  )
}

export default BasicLayout
