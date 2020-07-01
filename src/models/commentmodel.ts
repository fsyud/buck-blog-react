import { Reducer } from 'redux';
import { Effect } from 'dva';
import { addStairComment, addThirdComment } from '@/service/commentservice';
import { stairComment, thirdCommentCallbackMessage } from './common.d';

export interface commentState {
  stairCommentList?: Partial<stairComment>;
  thirdCommentList?: Partial<thirdCommentCallbackMessage>
}

export interface ModelType {
  namespace: string;
  state: commentState;
  effects: {
    addStairComment: Effect;
    addThirdComment: Effect;
  };
  reducers: {
    getStairComment: Reducer<stairComment>;
    getThirdComment: Reducer<thirdCommentCallbackMessage>;
  };
}

const Model: ModelType = {
  namespace: 'commentSpace',
  state: {
    stairCommentList: {},
    thirdCommentList: {}
  },
  effects: {
    *addStairComment({ payload }, { call, put }) {
      const response = yield call(addStairComment, payload);
      yield put({
        type: 'getStairComment',
        payload: response,
      });
    },
    *addThirdComment({ payload }, { call, put }) {
      const response = yield call(addThirdComment, payload);
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
    getThirdComment(state, action) {
      return {
        ...(state as thirdCommentCallbackMessage),
        thirdCommentList: action.payload,
      };
    },
  }
};

export default Model;
