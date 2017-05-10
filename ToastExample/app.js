import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { Toast, ToastActionsCreators } from 'react-native-redux-toast';
import { connect } from 'react-redux';

class ToastScene extends Component {
  displayErrorToast = () => {
    this.props.dispatch(ToastActionsCreators.displayError('Error toast!'));
  };

  displayWarningToast = () => {
    this.props.dispatch(ToastActionsCreators.displayWarning('Warning toast!'));
  };

  displayInfoToast = () => {
    this.props.dispatch(ToastActionsCreators.displayInfo('Info toast!'));
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
        <Button title={'Info Toast!'} onPress={this.displayInfoToast} />
        <Button title={'Warning Toast!'} onPress={this.displayWarningToast} />
        <Button title={'Error Toast!'} onPress={this.displayErrorToast} />
        <Toast messageStyle={{ color: 'white' }} />
      </View>
    );
  }
}

export default connect()(ToastScene);
