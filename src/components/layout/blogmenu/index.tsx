import React from 'react'
import { Menu } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link';
import { StateType } from '@/models/layoutmodel'

const BlogMenu: React.FC<Partial<StateType>> = props => {
  const { currNav } = props
  const { list } = currNav
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '70px', borderBottom: 'none' }}
    >
      {list &&
        list.map(pam => (
          <Menu.Item key={pam.key}>
            <Link to={pam.router}>
              {pam.article}
            </Link>
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

export default connect(({ accountCenter }: { accountCenter: StateType }) => ({
  currNav: accountCenter.currNav,
}))(BlogMenu);
