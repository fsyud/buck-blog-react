import { Reducer } from 'redux';
import { Effect } from 'dva';
import { queryMessageList } from '@/service/boardservice';
import { boardListItem, boardInfo} from './common.d';

export interface articleState {
  list: boardListItem[];
  info: Partial<boardInfo>;
}

export interface ModelType {
  namespace: string;
  state: articleState;
  effects: {
    getMessageList: Effect;
  };
  reducers: {
    getMeeage: Reducer<articleState>;
    Info: Reducer<articleState>;
  };
}

const Model: ModelType = {
  namespace: 'boardSpace',
  state: {
    list: [],
    info: {}
  },
  effects: {
    *getMessageList({ payload }, { call, put }) {
      const response = yield call(queryMessageList, payload);
      if(response && response.data) {
        yield put({
          type: 'getMeeage',
          payload: response.data.list || [],
        });
      }
    },
  },
  reducers: {
    getMeeage(state = { list: [], info: {} } , action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    Info(state = { list: [], info: {} }, action) {
      return {
        ...state,
        info: action.payload,
      };
    },
  },
};

export default Model;
