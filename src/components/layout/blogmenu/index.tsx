import React, { useEffect, useState } from 'react'
import { Menu, Spin } from 'antd'
import Link from 'umi/link';
import { CurrNav } from '@/models/common.d'
import { RouteChildrenProps } from 'react-router';
import styles from './index.less'

interface StateType extends RouteChildrenProps {
  NavList?: Partial<CurrNav>;
  menuSelect?: string;
}

const BlogMenu: React.FC<Partial<StateType>> = props => {
  const { NavList, menuSelect} = props
  const { list } = NavList

  const [ defaultKey, setDefaultKey ] = useState<string>('')

  const articleHas = menuSelect.includes('articleDetail')

  // 判断是否包含文章详情路由
  if(!articleHas) {
    const defaultSelect = list
    && list.filter(s => s.router.includes(menuSelect))[0].router

    if(!defaultSelect) return (<div className={styles.Spin}><Spin /></div>)

    useEffect(() => {
      setDefaultKey(defaultSelect)
    }, [props.menuSelect])
  } else {
    useEffect(() => {
      setDefaultKey('')
    }, [props.menuSelect])
  }

  return (
    <Menu
      theme="light"
      mode="horizontal"
      selectedKeys={[defaultKey]}
      style={{ lineHeight: '70px', borderBottom: 'none' }}
    >
      {list &&
        list.map(pam => (
          <Menu.Item key={pam.router}>
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
