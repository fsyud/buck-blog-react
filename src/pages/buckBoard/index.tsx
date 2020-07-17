import React, { FC, useEffect } from 'react';
import { connect } from 'dva'
import { Dispatch } from 'redux';
import { Alert, Card } from 'antd'
import { boardText, buckDesc, boardDesc} from '@/constant/_common'
import BoardComment from '@/components/boardComment'
import styles from './style.less'

import { articleState } from '@/models/boardmodel';



interface ListBasicListProps {
  boardSpace: articleState;
  dispatch: Dispatch;
}

export const buckBoard: FC<ListBasicListProps> = (props) => {
  const {
    dispatch,
    boardSpace: { list }
  } = props;


  const initList = (): void => {
    dispatch({
      type: 'boardSpace/getMessageList',
    });
  }

  useEffect(() => {
    initList()

    console.log(list)
  }, [])

  const handleAddComment = (val: string): void => {

  }

  return(
    <div className={styles.board_message}>
      {
        boardText.map(el => (
          <Alert key={el.key} message={el.txt} />
        ))
      }
      <div className={styles.title}>{boardDesc.titleOne}</div>
      <Card bordered={false} style={{ width: 300 }}>
        {
          buckDesc.map(el => (
            <p key={el.key}>{el.txt}</p>
          ))
        }
      </Card>
      <div className={styles.title}>{boardDesc.titleTwo}</div>
      <div className={styles.board_count}>
        {list.length}条评论
      </div>
      <BoardComment
        handleAddComment={handleAddComment}
      />

    </div>
  )
}

export default connect(
  ({
    boardSpace,
  }: {
    boardSpace: articleState;
  }) => ({
    boardSpace,
  }),
)(buckBoard);
