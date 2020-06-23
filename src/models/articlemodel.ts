import { Reducer } from 'redux'
import { Effect } from 'dva'
import {
  queryAddTag,
  queryGetTagList
} from '@/service/layoutservice'
import { tagList } from './common.d'

export interface StateType {
  tagList:  articleist[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    addTags: Effect,
    getTagList: Effect
  };
  reducers: {
    getTagList: Reducer<StateType>
  };
}

const Model: ModelType = {
  namespace: 'commonLayoutSpace',
  state: {
    tagList: []
  },
  effects: {
    *addTags({payload}, { call, put }) {
      const response = yield call(queryAddTag, payload);
      console.log(response)
    },
    *getTagList({payload} , { call, put}) {
      const response = yield call(queryGetTagList, payload);
      if(response && response.data) {

        console.log(response.data)

        yield put({
          type: 'getTagList',
          payload: response.data.list || [],
        });
      }
    },
  },
  reducers: {
    getTagList(state, action) {
      return {
        ...state,
        tagList: action.payload,
      };
    },
  }
}

export default Model
