import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, View } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';

export default function ToastScene() {
  const dispatch = useDispatch();

  function displayErrorToast() {
    dispatch(ToastActionsCreators.displayError('Error toast!'));
  }

  function displayWarningToast() {
    dispatch(ToastActionsCreators.displayWarning('Warning toast!'));
  }

  function displayInfoToast() {
    dispatch(ToastActionsCreators.displayInfo('Info toast!'));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      }}
    >
      <Button title={'Info Toast!'} onPress={displayInfoToast} />
      <Button title={'Warning Toast!'} onPress={displayWarningToast} />
      <Button title={'Error Toast!'} onPress={displayErrorToast} />
    </View>
  );
}
