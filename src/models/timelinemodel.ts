import { Reducer} from 'redux'
import { Effect } from 'dva'
import { queryTimeLineInfo } from '@/service/timelineservice'
import { TimeLine } from './common.d'

export interface TimeLineState {
  currentLine?: Partial<TimeLine>;
}

export interface ModelType {
  namespace: string;
  state: TimeLineState;
  effects: {
    fetchCurrentTimeLine: Effect,
  };
  reducers: {
    saveCurrenTimeLine: Reducer<TimeLineState>;
  };
}

const Model: ModelType = {
  namespace: 'timelineModelSpace',

  state: {
    currentLine: {}
  },

  effects: {
    *fetchCurrentTimeLine(_, {call, put}) {
      const response = yield call(queryTimeLineInfo);
      yield put({
        type: 'saveCurrenTimeLine',
        payload: response,
      });
    }
  },
  reducers: {
    saveCurrenTimeLine(state, action) {
      return {
        ...(state as TimeLineState),
        currentLine: action.payload || {},
      };
    },
  }
}


export default Model
