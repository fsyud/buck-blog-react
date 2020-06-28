import request from '@/utils/request'

import {
  getArticleDetailParam
} from './data.d'

export async function queryArticleDetail(params: getArticleDetailParam) {
  return request('/api/queryArticleDetail', {
    method: 'post',
    data: params
  })
}
