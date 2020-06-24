import { Reducer } from 'redux';
import { Effect } from 'dva';
import { queryArticleList } from '@/service/articleservice';
import { articleList } from './common.d';

export interface articleState {
  articLeist?: Partial<articleList>;
}

export interface ModelType {
  namespace: string;
  state: articleState;
  effects: {
    getArticleList: Effect;
  };
  reducers: {
    getArticle: Reducer<articleState>;
  };
}

const Model: ModelType = {
  namespace: 'articleSpace',
  state: {
    articLeist: {},
  },
  effects: {
    *getArticleList({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      yield put({
        type: 'getArticle',
        payload: response,
      });
    },
  },
  reducers: {
    getArticle(state, action) {
      return {
        ...(state as articleState),
        articLeist: action.payload,
      };
    },
  },
};

export default Model;
