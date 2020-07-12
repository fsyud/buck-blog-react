import React from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'dva'
import { Project } from '@/models/common.d'
import { ProjectStateType } from '@/models/projectmodel'
import { ConnectProps } from '@/models/connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './index.less'
import { timestampToTime } from '@/utils/tool/tool'

const { Meta } = Card;

export interface ProjectProps extends ConnectProps {
  lsit: Partial<Project>;
}

class buckItem extends React.Component<ProjectProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectModel/fetchProject',
    });
  }

  render() {
    const { list: {data} } = this.props;

    if(!data) return (<div className={styles.Spin}><Spin /></div>)

    const curProjectList = data.list

    return (
      <div className={styles.project}>
        {
          curProjectList.map(item => (
            <ReactCSSTransitionGroup
              key={item._id}
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={1000}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img alt={item.title} src={item.img} />}
                >
                  <Meta title={item.title} description={item.content} />
                  <span>
                    {timestampToTime(item.start_time)}
                    --
                    {timestampToTime(item.end_time)}
                  </span>
                </Card>
              </a>
            </ReactCSSTransitionGroup>
          ))
        }
      </div>
    )
  }
}

export default connect(({ projectModel }: { projectModel: ProjectStateType }) => ({
  list: projectModel.list
}))(buckItem);

