import { AnyAction, Reducer } from 'redux'
import { ListItemData } from './data.d'
import { EffectsCommandMap } from 'dva'
import { queryUserInfo } from './service'

export interface StateType {
  list: ListItemData[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'blogheader',
  state: {
    list: []
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUserInfo);
      yield put({
        type: 'queryList',
        payload: response,
      });
    }
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  }
}

export default Model
