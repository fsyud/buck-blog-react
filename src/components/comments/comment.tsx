import React, { FC, useEffect, useState} from 'react'
import { Avatar, Input, Button } from 'antd';
import { GlobalCommentState } from '@/models/global'
import { ConnectProps } from '@/models/connect';
import { connect } from 'dva';
import styles from './index.less'

const { TextArea } = Input;

interface basicCommentProps extends ConnectProps{
  handleAddComment: (content: string) => void;
  stairState?: boolean;
}

interface UserInfo {
  avatar: string;
  name: string;
  _id: string;
}

const Comment: FC<basicCommentProps> = (props) => {

  const { handleAddComment} = props;

  const [ curUserInfo, setCurUserInfo] = useState<Partial<UserInfo>>({})
  const [ commentContent, setCommentContent ] = useState<string>('')

  useEffect(() => {
    if (window.sessionStorage.userInfo) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      setCurUserInfo(userInfo)
    }
  }, [])


  useEffect(() => {
    if(props.stairState) setCommentContent('')

    props.dispatch({
      type: 'global/stairAreaState',
      payload: false
    })

  }, [props.stairState])

  const submitComment = (): void => {
    if(handleAddComment) handleAddComment(commentContent)
  }

  const AreaChange = (e: any): void => {
    setCommentContent(e.target.value)
  }

  return (
    <div className={styles.comment}>
      <div>
        <Avatar
          className={styles.author_logo}
          size={50}
          src={curUserInfo ? curUserInfo.avatar : ''}
        />
        {
          curUserInfo && curUserInfo.name ? (
            <div className={styles.cur_author}>
              {`@${curUserInfo.name}`}
            </div>
          ) : (<div></div>)
        }
        <TextArea
          className={styles.textarea}
          value={commentContent}
          onChange={AreaChange}
          placeholder="撰写评论 ..."
          rows={4}
        />

        <div className={`${styles.new_comment} ${styles.write_function_block}`}>
            <Button
              type='ghost'
            >
              取消
            </Button>
            <Button
              type='primary'
              onClick={submitComment}
            >
              发送
            </Button>
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({
    global
  }: {
    global: GlobalCommentState
  }) => ({
  stairState: global.stairState,
})
)(Comment);
