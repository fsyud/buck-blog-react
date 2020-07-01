import request from '@/utils/request'

import {
  addCommentParam,
  thirdCommentParam
} from './data.d'

export async function addStairComment(params: addCommentParam) {
  return request('/api/addComment', {
    method: 'POST',
    data: params
  })
}

export async function addThirdComment(params: thirdCommentParam) {
  return request('/api/addThirdComment', {
    method: 'POST',
    data: params
  })
}
