import { Reducer} from 'redux'
import { Effect } from 'dva'
import { queryUserInfo } from '@/service/layoutservice'
import { CurrentUser } from '../components/layout/blogheader/data'

export interface StateType {
  currentUser?: CurrentUser;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchCurrent: Effect
  };
  reducers: {
    saveCurrentUser: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'accountCenter',
  state: {
    currentUser: {}
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryUserInfo);
      yield put({
        type: 'saveCurrentUser',
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
  }
}

export default Model
