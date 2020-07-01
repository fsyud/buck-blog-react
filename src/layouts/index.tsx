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
        <a href="" target="_blank">
          皖ICP备20000463号-1
        </a>
      </Col>
    </Row>
  </Footer>
)

export interface BasicLayoutProps {
  location?: any;
  history?: any;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  let isShowSlider = false;
  const { history } = props
  const { pathname } = props.location

  // 路由重定向
  if(pathname === '/') history.push('/buckHome')

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
