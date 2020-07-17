import React from 'react';
import { Layout, Spin } from 'antd';
import { Link } from 'umi'
import { ConnectProps } from '@/models/connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'dva';
import {
  EyeOutlined, MessageOutlined ,LikeOutlined, FieldTimeOutlined
} from '@ant-design/icons'
import { articleList } from '@/models/common.d';
import { articleInfo } from '@/models/articlemodel'
import { timestampToTime } from '@/utils/tool/tool'
import BackTopCt from '@/components/backTop'
import LazyLoad from 'react-lazy-load'
import styles from './index.less';

const { Sider } = Layout;

interface basicArticleProps extends ConnectProps {
  articleList: articleList;
}

interface basicArticleStatae {
  curlist: Array<[]>;
  tag_id: string;
  tag_name: string;
}

// define sider spin
const siderSpin = (
  <Sider className={styles.sider}>
    <Spin />
  </Sider>
);


class Article extends React.Component<basicArticleProps, basicArticleStatae> {
  state: basicArticleStatae = {
    curlist: [],
    tag_id: '',
    tag_name: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'articleSpace/getArticleList',
      payload: {
        pageSize: '200'
      }
    });
  }

  render() {
    const {
      articleList: { data },
    } = this.props;

    if (!data) return siderSpin;

    const curAricleList = data.list;

    // 渲染文章列表
    const listContent = curAricleList.map((item, index) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <li key={item._id} className={styles.haveImg}>
          <a className={styles.wrapImg} href="/" target="_blank">
            <LazyLoad height={100} width={125} offsetVertical={300}>
              <img
                className="img-blur-done"
                data-src={item.img_url}
                data-has-lazy-src="false"
                src={item.img_url}
                alt="文章封面"
              />
            </LazyLoad>
          </a>
          <div className={styles.content} >
            <h2>
              <Link
                className={styles.title}
                target="_blank"
                to={`/articleDetail?article_id=${item._id}`}
              >
                {item.title}
              </Link>
            </h2>
            <p className={styles.abstract}>{item.desc}</p>
            <div className={styles.meta}>
              <Link
                rel="noopener noreferrer"
                to={`/articleDetail?article_id=${item._id}`}
              >
                <EyeOutlined />
                {item.meta.views}
              </Link>{' '}
              <Link
                target="_blank"
                to={`/articleDetail?article_id=${item._id}`}
              >
                <MessageOutlined />
                {item.meta.comments}
              </Link>{' '}
              <Link
                target="_blank"
                to={`/articleDetail?article_id=${item._id}`}
              >
                <LikeOutlined />
                {item.meta.likes}
              </Link>
              <span className={styles.time}>
                <FieldTimeOutlined />
                {item.create_time
                  ? timestampToTime(item.create_time, true)
                  : ''}
              </span>
            </div>
          </div>
        </li>
        <BackTopCt />
      </ReactCSSTransitionGroup>
    ));

    return (
      <div className={styles.articleMain}>
        {
          <div className="left">
          {this.state.tag_id ? (
            <h3 className="left-title">{this.state.tag_name} 相关的文章：</h3>
          ) : (
            ''
          )}
          <ul className={styles.noteList} id="list">
            {listContent}
          </ul>
        </div>
        }
      </div>
    );
  }
}

export default connect(
  ({ articleSpace }: { articleSpace: articleInfo }) => ({
    articleList: articleSpace.articleList,
  })
)(Article)
