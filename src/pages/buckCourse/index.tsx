import React, { Component } from 'react';
import { Result, Button } from 'antd';

class buckCourse extends Component<{}> {
  render() {
    return (
      <div>
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              Go Consoles
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />,
      </div>
    )
  }
}

export default buckCourse
