import React from 'react'
import { Timeline, Spin} from 'antd'
import { connect } from 'dva'
import { TimeLine } from '@/models/common.d'
import { ConnectProps } from '@/models/connect';
import { TimeLineState } from '@/models/timelinemodel'
import styles from './index.less'

export interface HeaderRightProps extends ConnectProps {
  currentLine?: TimeLine;
}

class buckCourse extends React.Component<HeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timelineModelSpace/fetchCurrentTimeLine',
    });
  }

  render() {
    const { currentLine } = this.props

    const { data } = currentLine

    if(!data) return (<div><Spin /></div>)

    const curLineList = data.list

    return (
      <div>
        <Timeline className={styles.timeline}>
          {
            curLineList.map(item => (
              <Timeline.Item
                key={ item._id }
                color={ item.state === 3 ? 'green' : 'blue' }
              >
                <div className={styles.line_content}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <p>
                    <span>
                      { item.start_time }--
                    </span>
                    <span>
                      {' '}
                      { item.end_time }
                    </span>
                  </p>
                </div>
              </Timeline.Item>
            ))
          }
        </Timeline>
      </div>
    )
  }
}

export default connect(({ timelineModelSpace }: { timelineModelSpace: TimeLineState }) => ({
  currentLine: timelineModelSpace.currentLine,
}))(buckCourse);
