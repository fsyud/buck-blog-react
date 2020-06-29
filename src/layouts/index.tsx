import React from 'react'
import styles from './index.less'
import Link from 'umi/link'
import { Layout, Row, Col, Result, Button } from 'antd'
import BlogHeader from '@/components/layout/blogheader'
import BlogSider from '@/components/layout/blogsider'

const { Footer, Content } = Layout;

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
      <Col span={12} offset={6} className={styles.footer_info}>
        ©2020 ｜ 全栈：singlebuck
      </Col>
    </Row>
  </Footer>
)

export interface BasicLayoutProps {
  location?: any
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  let isShowSlider = false;
  const { pathname } = props.location

  const exceptRouter = [
    'buckCenter', 'articleDetail'
  ]

  isShowSlider = exceptRouter.some(s => s.includes(pathname.slice(1)))

  return (
    <Layout className={styles.layouts}>
      <BlogHeader currPath={pathname} />
      <Layout className={styles.layouts_second}>
        <Col span={ isShowSlider ? 24 : 17 }>
          <Content className={styles.content}>
            {props.children}
          </Content>
        </Col>
        { isShowSlider ? ('') : (<Col span={7}><BlogSider /></Col>) }
      </Layout>
      {defaultFooterDom}
    </Layout>
  )
}

export default BasicLayout
