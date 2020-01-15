import request from '@/utils/request'

export async function queryProjectInfo() {
  return request('/api/currentProjectList', {
    method: 'GET'
  })
}
