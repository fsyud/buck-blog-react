import { Reducer } from 'redux';
import { Effect } from 'dva';
import { addStairComment } from '@/service/commentservice';
import { stairComment } from './common.d';

export interface commentState {
  stairCommentList?: Partial<stairComment>;
}

export interface ModelType {
  namespace: string;
  state: commentState;
  effects: {
    addStairComment: Effect;
  };
  reducers: {
    getStairComment: Reducer<stairComment>;
  };
}

const Model: ModelType = {
  namespace: 'commentSpace',
  state: {
    stairCommentList: {},
  },
  effects: {
    *addStairComment({ payload }, { call, put }) {
      const response = yield call(addStairComment, payload);
      yield put({
        type: 'getStairComment',
        payload: response,
      });
    },
  },
  reducers: {
    getStairComment(state, action) {
      return {
        ...(state as stairComment),
        stairCommentList: action.payload,
      };
    },
  },
};

export default Model;
