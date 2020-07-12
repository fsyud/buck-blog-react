import React, { Component } from 'react';
import {
  Layout, Spin, notification, Avatar, Button, message
} from 'antd';
import isEqual from 'lodash/isEqual'
import { TagOutlined, GithubOutlined, LikeOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import clone from 'lodash/clone';
import { articleDetailInfo } from '@/models/articledetailmodels';
import { commentInfo } from '@/models/commentmodel'
import { ConnectProps } from '@/models/connect';
import { GlobalCommentState } from '@/models/global'
import Comment from '@/components/comments/comment'
import CommentList from '@/components/comments/list'
import { commentsList } from '@/models/common.d'
import { warnInfo } from '@/constant/_common'
import { isMobileOrPc, timestampToTime, sessionStorageGet } from '@/utils/tool/tool';
import './marked.css'

import {
  articleDetailist,
  stairComment,
  thirdCommentInfo,
  thirdComment,
} from '@/models/common.d';
import author from '@/assets/avatar/cat.png';

import styles from './index.less';
import './marked.css';

const { Sider } = Layout;

// define sider spin
const siderSpin = (
  <Sider className={styles.siderSpin}>
    <Spin size="large" />
  </Sider>
);

interface basicArticleDetailProps extends ConnectProps {
  articleDetailList: Partial<articleDetailist>;
  stairCommentList: Partial<stairComment>;
  thirdCommentList: Partial<thirdComment>;
  location?: any;
  stairState: boolean;
  thirdState: boolean;
}

interface basicArticleDetailState {
  dataState: boolean;
  isPc: boolean;
  isStair: boolean;
  isThird: boolean;
  articleState: string;
  StairComState: commentsList[];
  toc: string;
  tocStyle: any;
}

class ArticleDetail extends Component<basicArticleDetailProps, basicArticleDetailState> {
  state: basicArticleDetailState = {
    dataState: false,
    isPc: isMobileOrPc(),
    StairComState: [],
    isStair: false,
    isThird: false,
    articleState: '',
    toc: '',
    tocStyle: ''
  };

  refresh() {
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

  componentDidMount() {
    this.refresh()
    document.addEventListener('scroll', () => {
      // const curScrollTop = document.documentElement.scrollTop
      //   this.setState({
      //     tocStyle: curScrollTop < 100 ? 100 :  curScrollTop
      //   })

      // throttle(() => {
      //   console.log('aa')
      // }, 200)
    });
  }

  componentWillReceiveProps(nextProps: any) {
    const [
      sta_stair, sta_third
    ]  =  [
      isEqual(this.props.stairCommentList, nextProps.stairCommentList),
      isEqual(this.props.thirdCommentList, nextProps.thirdCommentList)
    ];

    if(sta_stair && sta_third) return

    if(!sta_stair) {
      notification.info({
        message: nextProps.stairCommentList.message,
        duration: 0.8,
      });

      this.refresh()

      this.props.dispatch({
        type: 'global/stairAreaState',
        payload: true
      });
    }

    if(!sta_third) {
      notification.info({
        message: nextProps.thirdCommentList.message,
        duration: 0.8,
      });
      this.refresh()
      this.props.dispatch({
        type: 'global/thirdAreaState',
        payload: true
      });
    }
  }

  componentDidUpdate() {
    const { articleDetailList } = this.props;

    const noData =
      Object.keys(articleDetailList).length > 0 &&
      Object.getOwnPropertyNames(articleDetailList.data).length === 0;

    // 文章未渲染 notification
    if (noData) {
      notification.info({
        message: articleDetailList.message,
        duration: 1,
      });
    }
  }

  likeArticle() {
    console.log('likeArticle')
  }

  render() {
    const {
      articleDetailList: { data },
      dispatch,
      location: { query },
    } = this.props;
    const { isPc } = this.state;

    const curData = data && Object.keys(data).length === 0;

    if (!data || curData) return siderSpin;

    this.state.articleState = clone(data.content);

    this.state.StairComState = clone(data.comments);

    this.state.toc = clone(data.toc);

    const UserSession = sessionStorageGet('userInfo');
    const user_id = UserSession ? UserSession['_id'] : '';

    // 添加一级留言内容
    const handleAddComment = (content: string): void => {
      const { article_id } = query;
      const curPam = {
        user_id: user_id,
        article_id,
        content,
      }

      if (content.length === 0) {
        notification.warn({
          message: warnInfo.commentNull,
          duration: 0.8,
        })
        return
      }

      if(!UserSession) {
        message.info(warnInfo.login)
        return;
      }

      const stairPam = UserSession
        ? Object.assign({},clone(curPam), {hasUserInfo: true})
        : curPam

        dispatch({
          type: 'commentSpace/addStairComment',
          payload: stairPam
        })
    }

    // 添加三级留言内容
    const SendThirdComment = (val: thirdCommentInfo): void => {
      const toUser = JSON.stringify(val.to_user)

      if (val.content.length === 0) {
        notification.warn({
          message: warnInfo.commentNull,
          duration: 0.8,
        })
        return
      }

      const thirdParam = UserSession
        ? Object.assign({},val, {to_user: toUser}, {hasUserInfo: true})
        : Object.assign({}, val, {to_user: toUser} )

      dispatch({
        type: 'commentSpace/addThirdComment',
        payload: thirdParam
      })

      if(!UserSession) {
        message.info(warnInfo.login)
        return;
      }
    }

    // 定义布局宽度
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
                    <div key={s.id} className={styles.l_tag_info}>
                      <TagOutlined twoToneColor="#52c41a" />
                      {s.name}
                    </div>
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
              __html: this.state.articleState,
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
          handleAddComment={handleAddComment}
        />
        <CommentList
          list={this.state.StairComState}
          commentNumber={data.meta.comments}
          commentInfo={{
            article: query.article_id,
            user: user_id
          }}
          thirdCommentSend={SendThirdComment}
        />
      </div>
    );
    const articleRight = (
      <div className={styles.article_right}>
      {!isMobileOrPc()? (
        <div
          className={styles.toc_index}
          dangerouslySetInnerHTML={{
            __html: this.state.toc
          }}
        />
      ) : (
        <div></div>
      )}
      </div>
    )

    return (
      <div className={styles.article}>
        {articleLeft}
        {articleRight}
      </div>
    );
  }
}

export default connect(
  ({
    articleDetailSpace,
    commentSpace,
    global
  }: {
    articleDetailSpace: articleDetailInfo,
    commentSpace: commentInfo
    global: GlobalCommentState
  }) => ({
  articleDetailList: articleDetailSpace.articleDetailList,
  stairCommentList: commentSpace.stairCommentList,
  thirdCommentList: commentSpace.thirdCommentList,
  stairState: global.stairState,
  thirdState: global.thirdState
})
)(ArticleDetail);
