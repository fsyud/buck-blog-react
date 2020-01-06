import React, { PureComponent }from 'react'
import {
  Layout, Menu, Row, Col, Badge, Avatar, Dropdown, Icon, message
} from 'antd'
import { connect } from 'dva'
import { Dispatch } from 'redux'
import styles from './index.less'
import logo from '@/assets/icon/buck.png'
import sculpture from '@/assets/avatar/cat.jpeg'


const { Header } = Layout

export interface BlogHeaderDataItems {
  avatar?: string;
  dispatch: Dispatch<any>;
}

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
class BlogHeader extends PureComponent<BlogHeaderDataItems> {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: 'blogheader/fetch'
    })

    console.log('dispatch')
  }

  render () {
    console.log(this.props)
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
              style={{ lineHeight: '70px',  borderBottom: 'none'}}
            >
              <Menu.Item key="1">文章</Menu.Item>
              <Menu.Item key="2">关于</Menu.Item>
              <Menu.Item key="3">个人</Menu.Item>
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
                  个人中心<Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
    )
  }
}

// export default Products;
export default connect(({ blogheader }: { blogheader: any }) => ({
  blogheader,
}))(BlogHeader);
