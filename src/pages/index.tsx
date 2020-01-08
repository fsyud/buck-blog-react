import React, { Component } from 'react';
import { Result, Icon, Button } from 'antd';

class Users extends Component<{}> {
  render() {
    return (
      <div>
        <Result
          icon={<Icon type="smile" theme="twoTone" />}
          title="Great, we have done all the operations!"
          extra={<Button type="primary">Next</Button>}
        />,
      </div>
    )
  }
}

export default Users
