import { Reducer } from 'redux';
import { Effect } from 'dva';
import {
  queryMessageList,
  addMessage,
  addThirdMessage
} from '@/service/boardservice';
import { commentsList, boardInfo} from './common.d';

export interface articleState {
  list: commentsList[];
  info: Partial<boardInfo>;
  listCounts: number;
}

export interface ModelType {
  namespace: string;
  state: articleState;
  effects: {
    getMessageList: Effect;
    addStairMessage: Effect;
    addOtherMessage: Effect;
  };
  reducers: {
    getMeeage: Reducer<articleState>;
    Info: Reducer<articleState>;
    counts: Reducer<articleState>;
  };
}

const Model: ModelType = {
  namespace: 'boardSpace',
  state: {
    list: [],
    info: {},
    listCounts: 0
  },
  effects: {
    *getMessageList({ payload }, { call, put }) {
      const response = yield call(queryMessageList, payload);
      if(response && response.data) {
        yield put({
          type: 'getMeeage',
          payload: response.data.list || [],
        });

        yield put({
          type: 'counts',
          payload: response.data.count || 0,
        });
      }
    },
    *addStairMessage({ payload }, { call, put }) {
      const response = yield call(addMessage, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    },
    *addOtherMessage({ payload }, { call, put }) {
      const response = yield call(addThirdMessage, payload);
      yield put({
        type: 'Info',
        payload: response,
      });
    }
  },
  reducers: {
    getMeeage(state = { listCounts: 0, list: [], info: {} } , action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    Info(state = { listCounts: 0, list: [], info: {} }, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
    counts(state = { listCounts: 0, list: [], info: {} }, action) {
      return {
        ...state,
        listCounts: action.payload,
      };
    },
  },
};

export default Model;
