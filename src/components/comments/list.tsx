import React, { FC, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Avatar } from 'antd';
import { timestampToTime } from '@/utils/tool/tool'
import { UserOutlined } from '@ant-design/icons'
import { commentsList, thirdCommentInfo} from '@/models/common.d';
import CommentArea from '@/components/commentArea'
import styles from './index.less';

interface basicCommentListProps {
  list: Partial<commentsList[]>;
  commentNumber: number;
  commentInfo: {
    article: string,
    user: string
  };
  thirdCommentSend: (val: thirdCommentInfo) => void;
}

const CommentList: FC<basicCommentListProps> = props => {
  const {list, commentNumber, commentInfo, thirdCommentSend} = props;

  useEffect(() => {
    // console.log(props.list);
    // console.log(props.commentInfo);
  }, [props.list]);

  const sendReply = (val: string, item: Partial<commentsList>): void => {
    console.log(item)
    const thirdPam = {
      user_id: commentInfo.user,
      article_id: commentInfo.article,
      comment_id: item._id,
      content: val,
      to_user: {
        user_id: item.user.user_id,
        avatar: item.user.avatar,
        name: item.user.name,
        type: item.user.type
      }
    }
    if(thirdCommentSend) {
      thirdCommentSend(thirdPam as thirdCommentInfo)
    }
  }

  return (
    <div className={styles.comment_list}>
      <div className={styles.top_title}>
        <span>{commentNumber} 条评论</span>
      </div>
      {list.length > 0 ? (
        list.map(item => (
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
                    <Avatar
                      size={45}
                      src={item.user.avatar}
                      icon={<UserOutlined/>}
                    />
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
              <div className={styles.comment_detail}>
                {item.content}
              </div>
              <CommentArea
                sendReply={sendReply}
                curItem={item}
              />
              {item.other_comments.map(el => (
                <div key={el._id} className={styles.item_other}>
                  <div className={styles.item_header}>
                    <div className={styles.author}>
                      <div className={styles.avator}>
                        <Avatar
                          size={45}
                          src={el.user.avatar}
                          icon={<UserOutlined/>}
                        />
                      </div>
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>
                        {el.user.name}
                        {el.user.type === 0 ? '(作者)' : ''}
                      </div>
                      <div className={styles.time}>
                        {el.create_time
                          ? timestampToTime(el.create_time, true)
                          : ''}
                      </div>
                    </div>
                  </div>
                  <div className={styles.comment_detail}>
                    {'@' + el.to_user.name}
                    {el.to_user.type === 0 ? '(作者)' : ''}：{el.content}
                  </div>
                  <CommentArea
                    sendReply={sendReply}
                    curItem={item}
                  />
                </div>
              ))}
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
