import React from 'react';
import { Layout, Spin, notification } from 'antd';
import { connect } from 'dva';
import { articleDetailState } from '@/models/articledetailmodels';
import { ConnectProps } from '@/models/connect';
import { articleDetailist } from '@/models/common.d';

import styles from './index.less';
const { Sider } = Layout;

// define sider spin
const siderSpin = (
  <Sider className={styles.sider}>
    <Spin />
  </Sider>
);

interface basicArticleDetailProps extends ConnectProps {
  articleDetailList: Partial<articleDetailist>;
  location?: any;
}

interface basicArticleDetailState {
  dataState: boolean;
}

class ArticleDetail extends React.Component<basicArticleDetailProps, basicArticleDetailState> {
  state: basicArticleDetailState = {
    dataState: false,
  }

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;
    // console.log(location)
    const { article_id } = query
    dispatch({
      type: 'articleDetailSpace/getArticleDetailList',
      payload: {
        isd: article_id
      }
    });
  }

  componentDidUpdate() {
    const { articleDetailList } = this.props;

    const noData = Object.keys(articleDetailList).length > 0 &&
      Object.getOwnPropertyNames(articleDetailList.data).length === 0

    if (noData) {
      notification.info({
        message: '文章不存在！',
        duration: 2,
      });
    }
  }

  render() {
    const { articleDetailList: { data } } = this.props;

    const curData = data &&  Object.keys(data).length === 0

    const articleMain = (
      <div className={styles.articleMain}>

      </div>
    )

    return (
      <div>
        {
          curData
            ? siderSpin
            : <div>123</div>
        }
      </div>
    );
  }
}

export default connect(({ articleDetailSpace }: { articleDetailSpace: articleDetailState }) => ({
  articleDetailList: articleDetailSpace.articleDetailList,
}))(ArticleDetail);
