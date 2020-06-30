import request from '@/utils/request'

import {
  addArticleParam
} from './data.d'

export async function queryArticleList(params: addArticleParam) {
  return request('/api/queryArticleList', {
    method: 'get',
    data: params
  })
}
