import request from '@/utils/request'

export async function queryProjectList() {
  return request('/api/queryProjectList', {
    method: 'GET'
  })
}
