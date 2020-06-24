import request from '@/utils/request'

import {
  addArticleParam
} from './data.d'

export async function addArticle(params: addArticleParam) {
  return request('/api/addArticle', {
    method: 'post',
    data: params
  })
}

export async function queryArticleList(params: addArticleParam) {
  return request('/api/queryArticleList', {
    method: 'get',
    data: params
  })
}
