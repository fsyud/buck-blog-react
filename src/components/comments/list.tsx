import React, { FC, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Avatar } from 'antd';
import { timestampToTime } from '@/utils/tool/tool'
import { commentsList } from '@/models/common.d';
import styles from './index.less';

interface basicCommentListProps {
  list: Partial<commentsList[]>;
  commentNumber: number;
}

const CommentList: FC<basicCommentListProps> = props => {
  useEffect(() => {
    console.log(props.list);
  }, [props.list]);

  return (
    <div className={styles.comment_list}>
      <div className={styles.top_title}>
        <span>{props.commentNumber} 条评论</span>
      </div>
      {props.list.length > 0 ? (
        props.list.map(item => (
          <ReactCSSTransitionGroup
            key={item.id}
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            <div className={styles.item}>
              <div className={styles.item_header}>
                <div className={styles.author}>
                  <div className={styles.avator}>
                    <Avatar size="large" src={item.user.avatar} />
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.name}>
                    {item.user.name}
                    {item.user.type === 0 ? '(作者)' : ''}
                  </div>
                  <div className={styles.time}>
                    {item.create_time ? timestampToTime(item.create_time, true) : ''}
                  </div>
                </div>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CommentList;
