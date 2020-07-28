import request from '@/utils/request'

import {
  addMessageParam,
  thirdMessageParam
} from './data.d'

export async function queryMessageList(state: any) {
  return request('/api/queryMessageList', {
    method: 'GET',
    params: state
  })
}

export async function addMessage(params: addMessageParam) {
  return request('/api/addMessage', {
    method: 'POST',
    data: params
  })
}

export async function addThirdMessage(params: thirdMessageParam) {
  return request('/api/addThirdMessage', {
    method: 'POST',
    data: params
  })
}
