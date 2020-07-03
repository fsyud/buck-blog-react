import { Reducer } from 'redux';
import { Effect } from 'dva';
import { addStairComment, addThirdComment } from '@/service/commentservice';
import { stairComment, thirdComment } from './common.d';

export interface commentState {
  stairCommentList: Partial<stairComment>;
  thirdCommentList: Partial<thirdComment>;
}

export interface commentInfo {
  stairCommentList: stairComment;
  thirdCommentList: thirdComment;
}

export interface GlobalCommentState extends commentState{
  stairState: boolean;
  thirdState: boolean;
}

export interface ModelType {
  namespace: string;
  state: GlobalCommentState;
  effects: {
    addStairComment: Effect;
    addThirdComment: Effect;
  };
  reducers: {
    getStairComment: Reducer<stairComment>;
    getThirdComment: Reducer<thirdComment>;
  };
}

const Model: ModelType = {
  namespace: 'commentSpace',
  state: {
    stairCommentList: {},
    thirdCommentList: {},
    stairState: false,
    thirdState: false
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
        type: 'getThirdComment',
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
        ...(state as thirdComment),
        thirdCommentList: action.payload,
      };
    },
  }
};

export default Model;
