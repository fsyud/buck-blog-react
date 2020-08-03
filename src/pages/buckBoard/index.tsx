import React, { FC, useEffect, useState } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Alert, Card, message, Pagination } from 'antd';
import { boardText, buckDesc, boardDesc } from '@/constant/_common';
import BoardComment from '@/components/boardComment';
import CommentList from '@/components/comments/list';
import { sessionStorageGet } from '@/utils/tool/tool';
import { warnInfo } from '@/constant/_common';
import styles from './style.less';

import { thirdCommentInfo } from '@/models/common.d';

import { articleState } from '@/models/boardmodel';

interface ListBasicListProps {
  boardSpace: articleState;
  dispatch: Dispatch;
}

export const buckBoard: FC<ListBasicListProps> = props => {
  const {
    dispatch,
    boardSpace: { list, info, listCounts },
  } = props;


  const [userId, setUserId] = useState<string>('');
  const [messageCount, setMessageCount] = useState<number>(0)
  const [curPageNum, setCurPageNum] = useState<number>(1)
  const [curPageSize, setCurPageSize] = useState<number>(10)

  const initList = (num?: number, size?: number): void => {
    dispatch({
      type: 'boardSpace/getMessageList',
      payload: {
        state: 1,
        pageNum: num,
        pageSize: size,
      }
    });
  };

  useEffect(() => {
    initList(curPageNum, curPageSize);

    const UserSession = sessionStorageGet('userInfo');
    setUserId(UserSession ? UserSession['_id'] : '');
  }, []);

  useEffect(() => {
    initList(curPageNum, curPageSize);
  }, [curPageNum, curPageSize]);

  useEffect(() => {
    let count = 0;
    list.forEach(s => {
      count += s.other_comments.length;
    });
    setMessageCount(list.length + count);
  }, [list]);

  useEffect(() => {
    if(Object.keys(info).length > 0) {
      message.info(info.message);
      initList();
    }
  }, [info]);

  const handleAddComment = (content: string): void => {
    if (content.length === 0) {
      message.info(warnInfo.commentNull);
      return;
    }
    const curPam = {
      user_id: userId,
      content,
    };

    dispatch({
      type: 'boardSpace/addStairMessage',
      payload: curPam,
    });
  };

  // 添加三级留言内容
  const SendThirdComment = (val: thirdCommentInfo): void => {
    const toUser = JSON.stringify(val.to_user);

    if (val.content.length === 0) {
      message.info(warnInfo.commentNull);
      return;
    }
    const thirdParam = Object.assign({}, val, {to_user: toUser} )
    dispatch({
      type: 'boardSpace/addOtherMessage',
      payload: thirdParam
    })
  };

  // 分页内容改变
  const onChange = (page: any, pageSize: any) => {
    setCurPageNum(page)
    setCurPageSize(pageSize)
  }

  return (
    <div className={styles.board_message}>
      {boardText.map(el => (
        <Alert key={el.key} message={el.txt} />
      ))}
      <div className={styles.title}>{boardDesc.titleOne}</div>
      <Card bordered={false} style={{ width: 300 }}>
        {buckDesc.map(el => (
          <p key={el.key}>{el.txt}</p>
        ))}
      </Card>
      <div className={styles.title}>{boardDesc.titleTwo}</div>
      <BoardComment handleAddComment={handleAddComment} />
      <CommentList
        list={list}
        commentNumber={messageCount}
        commentInfo={{
          user: userId,
        }}
        message={true}
        thirdCommentSend={SendThirdComment}
      />

      <div className={styles.pagination}>
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          current={curPageNum}
          total={listCounts}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default connect(({ boardSpace }: { boardSpace: articleState }) => ({
  boardSpace,
}))(buckBoard);
