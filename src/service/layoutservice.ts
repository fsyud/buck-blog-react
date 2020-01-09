import request from '@/utils/request'

export async function queryUserInfo() {
  return request('/api/currentUser', {
    method: 'GET'
  })
}

export async function queryNavList(params: any) {
  return request('/api/navItems', {
    method: 'POST',
    data: params
  })
}
