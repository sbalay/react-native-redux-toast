import ToastContainer from './src/ToastContainer';
import { actions, actionCreators } from './src/redux/actions';
import reducer from './src/redux/reducer';

export {
  ToastContainer as Toast,
  actions as ToastActions,
  actionCreators as ToastActionsCreators,
  reducer as toastReducer
};
