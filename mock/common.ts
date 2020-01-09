export default {
  'POST /api/navItems': {
    types: '1',
    state: true,
    list: [
      {
        article: '首页',
        router: '',
        key: '1'
      },
      {
        article: '文章',
        router: '/buckArticle',
        key: '2'
      },
      {
        article: '项目',
        router: '/buckItem',
        key: '3'
      },
      {
        article: '历程',
        router: '/buckCourse',
        key: '4'
      },
      {
        article: '留言',
        router: '/buckBoard',
        key: '5'
      },
      {
        article: '个人',
        router: '/buckCenter',
        key: '6'
      }
    ]
  }
}
