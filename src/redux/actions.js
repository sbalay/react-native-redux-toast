export const actions = {
  DISPLAY_ERROR: Symbol('DISPLAY_ERROR'),
  DISPLAY_WARNING: Symbol('DISPLAY_WARNING'),
  DISPLAY_INFO: Symbol('DISPLAY_INFO'),
  HIDE: Symbol('HIDE'),
};

const toastAction = (message, duration, type) => ({
  type,
  payload: {
    message,
    duration
  }
});

export const actionCreators = {
  hide() {
    return {
      type: actions.HIDE,
      payload: {}
    };
  },
  displayError(message, duration = 4000) {
    return toastAction(message, duration, actions.DISPLAY_ERROR);
  },
  displayWarning(message, duration = 4000) {
    return toastAction(message, duration, actions.DISPLAY_WARNING);
  },
  displayInfo(message, duration = 4000) {
    return toastAction(message, duration, actions.DISPLAY_INFO);
  }
};
