import React, { useEffect } from 'react';
import { Col, Card } from 'antd';
import sculpture from '@/assets/avatar/cat.png';
import { userinfo } from '@/constant/_common'
import styles from './index.less'



const buckCenter:React.FC<{}> =() => {

  useEffect(() => {}, [])

  return (
    <div className={styles.center_user}>
      <Col lg={7} md={24}>
        <Card bordered={true} style={{ marginBottom: 24 }}>
          <div>
            <div className={styles.avatarHolder}>
              <img alt="" src={sculpture} />
              <div className={styles.name}>{userinfo.name}</div>
              <div>{userinfo.signature}</div>
            </div>
          </div>
        </Card>
      </Col>
      <Col lg={17} md={24}></Col>
    </div>
  );
}

export default buckCenter
