import Immutable from 'seamless-immutable';

const defaultState = {
  message: null,
  error: false,
  warning: false,
  duration: null
};

export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.HIDE:
    case actions.DISPLAY_ERROR:
    case actions.DISPLAY_WARNING:
    case actions.DISPLAY_INFO: {
      return state.merge(
        {
          message: action.payload.message,
          duration: action.payload.duration,
          error: action.type === actions.DISPLAY_ERROR,
          warning: action.type === actions.DISPLAY_WARNING
        },
        { deep: true }
      );
    }
    default: {
      return state;
    }
  }
}
