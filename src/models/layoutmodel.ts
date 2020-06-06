import { Reducer} from 'redux'
import { Effect } from 'dva'
import { queryUserInfo, queryNavList } from '@/service/layoutservice'
import { CurrentUser, CurrNav } from './common.d'

export interface StateType {
  currentUser?: CurrentUser;
  currNav?: CurrNav;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCurrent: Effect,
    fetchNavList: Effect
  };
  reducers: {
    saveCurrentUser: Reducer<StateType>;
    getCurrNavs: Reducer<StateType>
  };
}

const Model: ModelType = {
  namespace: 'accountCenter',
  state: {
    currentUser: {},
    currNav: {}
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryUserInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchNavList({ payload }, { call, put}) {
      const response = yield call(queryNavList , payload);
      yield put({
        type: 'getCurrNavs',
        payload: response,
      });
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...(state as StateType),
        currentUser: action.payload || {},
      };
    },
    getCurrNavs(state, action) {
      return {
        ...(state as StateType),
        currNav: action.payload || {},
      };
    },
  }
}

export default Model
