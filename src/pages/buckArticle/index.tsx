import React, { Component } from 'react';
import { Result, Button } from 'antd';

class buckArticle extends Component<{}> {
  render() {
    return (
      <div>
        <Result
          status="success"
          title="正在开发"
          subTitle="请等待！"
        />,
      </div>
    )
  }
}

export default buckArticle
