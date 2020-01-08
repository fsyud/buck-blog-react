import request from '@/utils/request'

export async function queryUserInfo() {
  return request('/api/currentUser', {
    method: 'GET'
  })
}
