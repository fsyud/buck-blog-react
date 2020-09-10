import React, { FC } from 'react'
import styles from './index.less';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons'

const BackTopCt: FC<{}> = () => {
  return (
    <div className={styles.back_top}>
      <BackTop>
        <div className={styles.tops}>
          <VerticalAlignTopOutlined />
        </div>
      </BackTop>
    </div>
  )
}

export default BackTopCt;
