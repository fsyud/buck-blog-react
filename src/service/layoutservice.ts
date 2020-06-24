import request from '@/utils/request'
import {
  registerParam,
  addTagParam
} from './data.d'

export async function queryUserInfo() {
  return request('/api/currentUser', {
    method: 'GET'
  })
}

// 注册api
export async function queryRegister(params: registerParam) {
  return request('/api/register', {
    method: 'POST',
    data: params
  })
}

// 添加标签api
export async function queryAddTag(params: addTagParam) {
  return request('/api/addTag', {
    method: 'POST',
    data: params
  })
}

// 添加标签api
export async function queryGetTagList() {
  return request('/api/queryTagList', {
    method: 'GET',
  })
}
