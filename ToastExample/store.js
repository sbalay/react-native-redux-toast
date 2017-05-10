import { createStore, combineReducers } from 'redux';
import { toastReducer as toast } from 'react-native-redux-toast';

const reducers = combineReducers({
  toast
});

export default createStore(reducers);
