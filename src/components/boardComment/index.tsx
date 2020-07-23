import React, { FC, useEffect, useState} from 'react'
import { Input, Button } from 'antd';
import styles from './index.less'

const { TextArea } = Input;

interface basicCommentProps {
  handleAddComment: (content: string) => void;
}

const BoardComment: FC<basicCommentProps> = (props) => {

  const { handleAddComment} = props;

  const [ commentContent, setCommentContent ] = useState<string>('')

  const submitComment = (): void => {
    if(handleAddComment) handleAddComment(commentContent)
  }

  const AreaChange = (e: any): void => {
    setCommentContent(e.target.value)
  }

  return (
    <div className={styles.board_comment}>
      <div>
        <TextArea
          className={styles.textarea}
          value={commentContent}
          onChange={AreaChange}
          placeholder="撰写评论 ..."
          rows={4}
        />

        <div className={`${styles.new_comment} ${styles.write_function_block}`}>
            <Button
              type='primary'
              onClick={submitComment}
            >
              留言
            </Button>
        </div>
      </div>
    </div>
  );
}

export default BoardComment;
