import { Reducer} from 'redux'
import { Effect } from 'dva'
import { queryProjectList } from '@/service/projectservice'
import { Project } from './common.d'

export interface ProjectStateType {
  list?: Partial<Project>;
}

export interface currentProjectModelType {
  namespace: string;
  state: ProjectStateType;
  effects: {
    fetchProject: Effect,
  };
  reducers: {
    curProject: Reducer<ProjectStateType>;
  };
}

const Model: currentProjectModelType = {
  namespace: 'projectModel',

  state: {
    list: {}
  },

  effects: {
    *fetchProject(_, {call, put}) {
      const response = yield call(queryProjectList);
      yield put({
        type: 'curProject',
        payload: response,
      });
    }
  },
  reducers: {
    curProject(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  }
}


export default Model
