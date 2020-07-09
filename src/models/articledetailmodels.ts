import { Reducer } from 'redux';
import { Effect } from 'dva';
import { queryArticleDetail } from '@/service/articledetailservice';
import { articleDetailist } from './common.d';
import clone from 'lodash/clone';
import markdown from '@/utils/markdown'

export interface articleDetailState {
  articleDetailList: Partial<articleDetailist>;
}

export interface articleDetailInfo {
  articleDetailList: articleDetailist;
}

export interface ModelType {
  namespace: string;
  state: articleDetailState;
  effects: {
    getArticleDetailList: Effect;
  };
  reducers: {
    getArticleDetail: Reducer<articleDetailState>;
  };
}

const Model: ModelType = {
  namespace: 'articleDetailSpace',
  state: {
    articleDetailList: {},
  },
  effects: {
    *getArticleDetailList({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, payload);

      if(response && response.data && response.data.content) {
        let curContent = clone(response.data.content)

        const article = yield markdown.marked(curContent);

        response.data.content = article.content
        response.data.toc = article.toc

        yield put({
          type: 'getArticleDetail',
          payload: response,
        });
      }
    },
  },
  reducers: {
    getArticleDetail(state, action) {
      return {
        ...(state as articleDetailState),
        articleDetailList: action.payload,
      };
    },
  },
};

export default Model;
