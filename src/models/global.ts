import { Reducer } from 'redux';

export interface GlobalCommentState {
  stairState: boolean;
  thirdState: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalCommentState;
  reducers: {
    stairAreaState: Reducer<GlobalCommentState>;
    thirdAreaState: Reducer<GlobalCommentState>;
  };
}


const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    stairState: false,
    thirdState: false,
  },

  reducers: {
    stairAreaState(state = { stairState: false, thirdState: true }, { payload }): GlobalCommentState {
      return {
        ...state,
        stairState: payload,
      };
    },
    thirdAreaState(state = { stairState: false, thirdState: true }, { payload }): GlobalCommentState {
      return {
        ...state,
        thirdState: payload,
      };
    },
  }

};

export default GlobalModel;
