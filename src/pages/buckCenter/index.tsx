import React, { useEffect } from 'react';
import { Result, Button } from 'antd';

const buckCenter:React.FC<{}> =() => {

  useEffect(() => {}, [])

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

export default buckCenter
