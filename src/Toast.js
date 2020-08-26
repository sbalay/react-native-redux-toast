import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text, ViewPropTypes as RNViewPropTypes } from 'react-native';

import styles from './Toast.styles';

import { actionCreators as toastActions } from './redux/actions';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

export default class Toast extends Component {
  state = {
    fadeAnimation: new Animated.Value(0),
    shadowOpacity: new Animated.Value(0),
    present: false,
    message: '',
    dismissTimeout: null
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { message, error, duration, warning } = nextProps
    if (message) {
      const dismissTimeout = setTimeout(() => {
        this.props.dispatch(toastActions.hide());
      }, duration);
      clearTimeout(this.state.dismissTimeout);
      this.show(message, { error, warning, dismissTimeout });
    } else {
      this.hide();
    }
  }

  show(message, { error, warning, dismissTimeout }) {
    this.setState(
      {
        present: true,
        fadeAnimation: new Animated.Value(0),
        shadowOpacity: new Animated.Value(0),
        message,
        error,
        warning,
        dismissTimeout
      },
      () => {
        Animated.timing(this.state.fadeAnimation, { toValue: 1, useNativeDriver: true }).start();
        Animated.timing(this.state.shadowOpacity, { toValue: 0.5, useNativeDriver: true }).start();
      }
    );
  }

  hide() {
    Animated.timing(this.state.shadowOpacity, { toValue: 0, useNativeDriver: true }).start();
    Animated.timing(this.state.fadeAnimation, { toValue: 0, useNativeDriver: true }).start(() => {
      this.setState({ present: false, message: null, error: false, warning: false, dismissTimeout: null });
    });
  }

  render() {
    if (!this.state.present) {
      return null;
    }

    const messageStyles = [styles.messageContainer, this.props.containerStyle];
    if (this.state.error) {
      messageStyles.push(styles.error, this.props.errorStyle);
    } else if (this.state.warning) {
      messageStyles.push(styles.warning, this.props.warningStyle);
    }
    return (
      <Animated.View
        style={[
          styles.shadow,
          styles.container,
          this.props.customToastStyle,
          { opacity: this.state.fadeAnimation, shadowOpacity: this.state.shadowOpacity }
        ]}
        pointerEvents='none'
      >
        <View style={messageStyles}>
          {this.props.getMessageComponent(this.state.message, {
            error: this.state.error,
            warning: this.state.warning
          })}
        </View>
      </Animated.View>
    );
  }
}

Toast.defaultProps = {
  getMessageComponent(message) {
    return (
      <Text style={this.messageStyle}>
        {message}
      </Text>
    );
  }
};

Toast.propTypes = {
  containerStyle: ViewPropTypes.style,
  customToastStyle: ViewPropTypes.style,
  message: PropTypes.string,
  messageStyle: Text.propTypes.style, // eslint-disable-line react/no-unused-prop-types
  error: PropTypes.bool,
  errorStyle: ViewPropTypes.style,
  warning: PropTypes.bool,
  warningStyle: ViewPropTypes.style,
  duration: PropTypes.number,
  getMessageComponent: PropTypes.func
};
