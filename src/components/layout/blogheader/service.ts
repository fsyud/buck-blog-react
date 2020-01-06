import request from '@/utils/request'
import { ListItemData } from './data.d'

export async function queryUserInfo(params: ListItemData) {
  return request('/api/currentUser', {
    params
  })
}
