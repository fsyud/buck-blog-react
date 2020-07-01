import React, { FC, useEffect, useState} from 'react'
import {Input, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons'
import styles from './index.less';
import { commentsList } from '@/models/common.d';

const { TextArea } = Input;

interface basicCommentAreaProps {
  sendReply: (val: string, item: Partial<commentsList>) => void;
  curItem: Partial<commentsList>
}

const CommentArea: FC<basicCommentAreaProps> = (props) => {

  const { sendReply, curItem} = props;

  const [ curCommentAreaState, setCurCommentAreaState ] = useState<boolean>(false)

  const [ commentContent, setCommentContent ] = useState<string>('');


  // 设置area state
  const commentAreaState = (): void => {
    setCurCommentAreaState(true)
  }

  // 取消
  const commentCancel = (): void => {
    setCurCommentAreaState(false)
  }

  // 回复
  const sendComment = (): void => {
    if(sendReply) sendReply(commentContent, curItem)
  }

  // area change
  const AreaChange = (e): void => {
    setCommentContent(e.target.value)
  }

  const EleCommentReply = (
    <div className={styles.commnet_reply_area}>
      <TextArea
       className={styles.textarea}
       value={commentContent}
       onChange={AreaChange}
       placeholder="撰写评论 ..."
       rows={3}
     />
      <div className={styles.area_btn}>
        <Button
          type='ghost'
          onClick={commentCancel}
        >
          取消
        </Button>
        <Button
          type='primary'
          onClick={sendComment}
        >
          发送
        </Button>
      </div>
    </div>
  )

  return (
    <div className={styles.item_comment}>
      <Button
         type='ghost'
         onClick={commentAreaState}
       >
        <MessageOutlined />
          回复
      </Button>
      {
        curCommentAreaState ?
          EleCommentReply :
          <div></div>
      }
    </div>

  )
}

export default CommentArea;
