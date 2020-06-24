import indexOf from 'lodash/indexOf';

const basic: string = '/api/';

// queryTagList 获取所有标签

const apiList: Array<string> = ['queryTagList'];

const getApi = (pam: string): string => {
  let api: string = '';
  if (apiList.includes(pam)) {
    api = basic + apiList[indexOf(apiList, pam)];
  }
  return api;
};

export default getApi;
