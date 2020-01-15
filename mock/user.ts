export default {
  'GET /api/currentUser': {
    name: 'singlebuck',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '前端工程师',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '帅气~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '安徽人',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ]
  },
  'GET /api/currentTimeLine': {
    code: 0,
    message: '操作成功',
    data: {
      count: 6,
      list: [
        {
          state: 3,
          _id: '1',
          title: 'React TypeScript 网站',
          content: '利用业余时间用 React + typescript + antd  做了一个 React 版的网站历时差不多 1 个月，之所以那么做，就是想学一下 typescript ，其中踩了不少坑，不过后面都解决了。对于使用 TypeScript : 一时用一时爽，一直用一直爽。',
          start_time: '2019-03-23T00:00:00.000Z',
          end_time: '2019-03-29T00:00:00.000Z'
        },
        {
          state: 2,
          _id: '2',
          title: 'React TypeScript 网站',
          content: '利用业余时间用 React + typescript + antd  做了一个 React 版的网站历时差不多 1 个月，之所以那么做，就是想学一下 typescript ，其中踩了不少坑，不过后面都解决了。对于使用 TypeScript : 一时用一时爽，一直用一直爽。',
          start_time: '2019-03-23T00:00:00.000Z',
          end_time: '2019-03-29T00:00:00.000Z'
        },
        {
          state: 2,
          _id: '3',
          title: '搭建博客平台的想法萌生',
          content: '历时2周构思参考别人的博客，自己技术选型，云服务器购买，域名申请备案。',
          start_time: '2019-03-23T00:00:00.000Z',
          end_time: '2019-03-29T00:00:00.000Z'
        },
        {
          state: 2,
          _id: '4',
          title: '毕业',
          content: '那一年毕业，告别了大学生活，踏往社会的大门',
          start_time: '2019-03-23T00:00:00.000Z',
          end_time: '2019-03-29T00:00:00.000Z'
        },
        {
          state: 2,
          _id: '5',
          title: '母校--新乡学院',
          content: '就读于新乡学院计算机科学与技术专业，挥洒4年光阴，酸甜苦辣。回忆绵长',
          start_time: '2019-03-23T00:00:00.000Z',
          end_time: '2019-03-29T00:00:00.000Z'
        },
        {
          state: 2,
          _id: '6',
          title: '开端',
          content: '第一次接触前端，开启了漫漫长路 ~',
          start_time: '2019-03-23T00:00:00.000Z',
          end_time: '2019-03-29T00:00:00.000Z'
        }
      ]
    }
  }
}
