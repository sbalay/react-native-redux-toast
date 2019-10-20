import React from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { Toast } from 'react-native-redux-toast';

import store from './store';
import App from './App';

export default function main() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <App />
        <Toast messageStyle={{ color: 'white' }} />
      </View>
    </Provider>
  );
}
