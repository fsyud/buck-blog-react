import request from '@/utils/request'

export async function queryTimeLineInfo() {
  return request('/api/currentTimeLine', {
    method: 'GET'
  })
}
