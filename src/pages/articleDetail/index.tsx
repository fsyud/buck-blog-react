import React from 'react';
import { Layout, Spin } from 'antd';
import { articleDetailData } from '@/models/common.d';

import styles from './index.less';
const { Sider } = Layout;

// define sider spin
const siderSpin = (
  <Sider className={styles.sider}>
    <Spin />
  </Sider>
);

interface basicArticleDetailProps {
  detailList: Partial<articleDetailData>;
}


class ArticleDetail extends React.Component<basicArticleDetailProps> {
  componentDidMount() {

  }

  render() {
    return siderSpin
  }
}

export default ArticleDetail;
