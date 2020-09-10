import React, { Component } from 'react';
import { Spin } from 'antd';
import styles from '@/layouts/index.less'

class Users extends Component<{}> {
  render() {
    return (
      <div className={styles.noPage}>
        <Spin size="large" />
      </div>
    )
  }
}

export default Users
