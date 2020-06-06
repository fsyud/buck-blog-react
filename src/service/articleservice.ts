import request from '@/utils/request'

export async function queryArticleInfo() {
  return request('/api/currentArticleList', {
    method: 'GET'
  })
}
