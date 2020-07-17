import request from '@/utils/request'

import {
  queryBoardParam
} from './data.d'

export async function queryMessageList(params: queryBoardParam) {
  return request('/api/queryMessageList', {
    method: 'GET',
    params
  })
}
