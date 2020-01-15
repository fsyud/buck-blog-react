import { Reducer} from 'redux'
import { Effect } from 'dva'
import { queryProjectInfo } from '@/service/projectservice'
import { Project } from './common.d'

export interface ProjectState {
  currentProject?: Partial<Project>;
}

export interface currentProjectModelType {
  namespace: string;
  state: ProjectState;
  effects: {
    fetchCurrentProject: Effect,
  };
  reducers: {
    saveCurrenProject: Reducer<ProjectState>;
  };
}

const Model: currentProjectModelType = {
  namespace: 'projectModelSpace',

  state: {
    currentProject: {}
  },

  effects: {
    *fetchCurrentProject(_, {call, put}) {
      const response = yield call(queryProjectInfo);
      yield put({
        type: 'saveCurrenProject',
        payload: response,
      });
    }
  },
  reducers: {
    saveCurrenProject(state, action) {
      return {
        ...(state as ProjectState),
        currentProject: action.payload || {},
      };
    },
  }
}


export default Model
