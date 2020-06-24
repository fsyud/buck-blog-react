import React, { FC, useEffect, useState } from 'react'
import { Layout, Tag, Spin, Avatar } from 'antd'
import { tagList } from '@/models/common.d'
import { RandomColor } from '@/constant/_common'
import styles from './index.less'
import getApi from '@/utils/tool/api'
import request from 'umi-request'
import { UserOutlined } from '@ant-design/icons'
import sculpture from '@/assets/avatar/cat.jpeg'

const { Sider } = Layout

// define sider spin
const siderSpin = (
  <Sider className={styles.sider}><Spin /></Sider>
)

interface tagBasicProps {
  conf?: string;
}

export const BlogSider: FC<tagBasicProps> = props => {
  const [ tagList, setTagList ] = useState<tagList[]>([])

  useEffect((): void => {
    request(getApi('queryTagList'), { method: 'get' })
      .then(function(response) {
        if(Object.getOwnPropertyNames(response).length !== 0) {
          const {data: {list} } = response
          setTagList(list)
        }
      })
      .catch(function(error) {
        if(error) setTagList([])
      });
  }, []);

  tagList.map(s => {
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
        icon={<UserOutlined />}
      />
      <h4>标签云</h4>
      <div>
        {
          tagList.map(ele => (
            <Tag
              key={ele._id}
              color={ele.color}
            >
              {ele.name}
            </Tag>
          ))
        }
      </div>
    </Sider>
  )
}

export default BlogSider;
