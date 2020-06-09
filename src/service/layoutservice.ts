import request from '@/utils/request'
import { registerParam } from './data.d'

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

export async function queryRegister(params: registerParam) {
  return request('/api/register', {
    method: 'POST',
    data: params
  })
}
