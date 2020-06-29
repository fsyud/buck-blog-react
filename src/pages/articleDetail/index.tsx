import React from 'react';
import {
  Layout, Spin, notification, Avatar, Button
} from 'antd';
import { TagOutlined, GithubOutlined, LikeOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { articleDetailState } from '@/models/articledetailmodels';
import { ConnectProps } from '@/models/connect';
import Comment from '@/components/comments/comment'
import { isMobileOrPc, timestampToTime } from '@/utils/tool/tool';
import { articleDetailist } from '@/models/common.d';
import author from '@/assets/avatar/cat.jpeg';

import styles from './index.less';
import './marked.css';

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
  isPc: boolean;
  leaveWord: string;
}

class ArticleDetail extends React.Component<basicArticleDetailProps, basicArticleDetailState> {
  state: basicArticleDetailState = {
    dataState: false,
    isPc: isMobileOrPc(),
    leaveWord: ''
  };

  componentDidMount() {
    const {
      dispatch,
      location: { query },
    } = this.props;
    const { article_id } = query;
    dispatch({
      type: 'articleDetailSpace/getArticleDetailList',
      payload: {
        id: article_id,
      },
    });
  }

  componentDidUpdate() {
    const { articleDetailList } = this.props;

    const noData =
      Object.keys(articleDetailList).length > 0 &&
      Object.getOwnPropertyNames(articleDetailList.data).length === 0;

    if (noData) {
      notification.info({
        message: articleDetailList.message,
        duration: 2,
      });
    }
  }


  likeArticle() {
    console.log('likeArticle')
  }

  handleChange() {

  }

  handleAddComment() {

  }

  render() {
    const {
      articleDetailList: { data },
    } = this.props;
    const { isPc } = this.state;

    const curData = data && Object.keys(data).length === 0;

    if (!data || curData) return siderSpin;

    const [lWidth] = [isPc ? '100%' : '75%'];

    const articleLeft = (
      <div className={styles.article_left} style={{ width: lWidth }}>
        <div className={styles.l_header}>
          <div className={styles.l_title}>{data.title}</div>
          <div className={styles.l_author}>
            <div className={styles.l_avatar}>
              <Avatar src={author} size={48} />
            </div>
            <div className={styles.l_author_info}>
              <div className={styles.l_name}>
                <span className={styles.l_name_info}>
                  {data.author}
                </span>
                <a
                  href="https://github.com/singleBuck"
                  target="_blank"
                >
                  <GithubOutlined />
                </a>
              </div>
              <div className={styles.l_meta}>
                <div className={styles.l_pyblish_time}>
                  {data.create_time ? timestampToTime(data.create_time, true) : ''}
                </div>
                <div className={styles.l_number}>
                  字数
                  {data.numbers}
                </div>
                <div className={styles.l_views}>
                  阅读
                  {data.meta.views}
                </div>
                <div className={styles.l_comments}>
                  评论
                  {data.meta.comments}
                </div>
                <div className={styles.l_likes}>
                  喜欢
                  {data.meta.likes}
                </div>
              </div>
            </div>
            <div className={styles.l_tags} title="标签">
              {data.tags.length > 0
                ? data.tags.map(s => (
                    <span key={s.id}>
                      <TagOutlined twoToneColor="#52c41a" />
                      {s.name}
                    </span>
                  ))
                : null}
            </div>
            <span className={styles.clearfix} />
          </div>
        </div>
        <div className={styles.l_content}>
          <div
            id="content"
            className="article-detail"
            dangerouslySetInnerHTML={{
              __html: data.content ? data.content : null,
            }}
          />
        </div>
        <div className={styles.heart}>
          <Button
            type="primary"
            size="large"
            onClick={this.likeArticle}
          >
            <LikeOutlined />
            赞
          </Button>
        </div>

        <Comment
          content={this.state.leaveWord}
          handleChange={this.handleChange}
          handleAddComment={this.handleAddComment}
        />
      </div>
    );

    const articleRight = <div className={styles.article_right}>2</div>;

    return (
      <div className={styles.article}>
        {articleLeft}
        {articleRight}
      </div>
    );
  }
}

export default connect(({ articleDetailSpace }: { articleDetailSpace: articleDetailState }) => ({
  articleDetailList: articleDetailSpace.articleDetailList,
}))(ArticleDetail);
