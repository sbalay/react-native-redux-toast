import { actions } from './actions';

const defaultState = {
  message: null,
  error: false,
  warning: false,
  duration: null
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actions.HIDE:
    case actions.DISPLAY_ERROR:
    case actions.DISPLAY_WARNING:
    case actions.DISPLAY_INFO: {
      return {
        message: action.payload.message,
        duration: action.payload.duration,
        error: action.type === actions.DISPLAY_ERROR,
        warning: action.type === actions.DISPLAY_WARNING
      };
    }
    default: {
      return state;
    }
  }
}
