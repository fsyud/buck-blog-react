import React, { FC } from 'react'
import styles from './index.less';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons'

const BackTopCt: FC<{}> = () => {
  return (
    <div className={styles.back_top}>
      <BackTop>
        <VerticalAlignTopOutlined />
        <div className={styles.tops}>
          返回顶部
        </div>
      </BackTop>
    </div>
  )
}

export default BackTopCt;
