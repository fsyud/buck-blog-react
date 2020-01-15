import React from 'react'
import { Layout, Tag, Spin, Avatar } from 'antd'
import { connect } from 'dva'
import { StateType } from '@/models/layoutmodel'
import { RandomColor } from '@/constant/_common'
import styles from './index.less'
import sculpture from '@/assets/avatar/cat.jpeg'

const { Sider } = Layout

// define sider spin
const siderSpin = (
  <Sider className={styles.sider}><Spin /></Sider>
)

const BlogSider: React.FC<Partial<StateType>> = props => {

  const { currentUser } = props
  const { tags } = currentUser

  if(!tags) return siderSpin

  tags.map(s => {
    let curColor = RandomColor[Math.floor(
      Math.random() * (RandomColor.length + 1)
    )]
    s.color = curColor
    return s
  })

  return (
    <Sider className={styles.sider}>
      <Avatar
        className={ styles.avatar_animate }
        src={sculpture}
        size={130}
        icon="user"
      />
      <h4>标签云</h4>
      <div>
        {
          tags.map(ele => (
            <Tag
              key={ele.key}
              color={ele.color}
            >
              {ele.label}
            </Tag>
          ))
        }
      </div>
    </Sider>
  )
}

export default connect(({ accountCenter }: { accountCenter: StateType }) => ({
  currentUser: accountCenter.currentUser,
}))(BlogSider);
