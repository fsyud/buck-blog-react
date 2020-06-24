import React from 'react'
import { Menu, Spin } from 'antd'
import Link from 'umi/link';
import { CurrNav } from '@/models/common.d'
import { RouteChildrenProps } from 'react-router';
import styles from './index.less'

interface StateType extends RouteChildrenProps {
  NavList?: Partial<CurrNav>;
  menuSelect?: string
}

const BlogMenu: React.FC<Partial<StateType>> = props => {
  const { NavList, menuSelect} = props
  const { list } = NavList

  const defaultSelect = list
    && list.filter(s => s.router.includes(menuSelect))[0].key

  if(!defaultSelect) return (<div className={styles.Spin}><Spin /></div>)

  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={[defaultSelect]}
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

export default BlogMenu;
