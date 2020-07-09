import request from '@/utils/request'

import {
  queryArticleParam
} from './data.d'

export async function queryArticleList(params: queryArticleParam) {
  return request('/api/queryArticleList', {
    method: 'GET',
    params
  })
}
