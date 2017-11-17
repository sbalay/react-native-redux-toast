import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Keyboard, View, Animated, Text } from 'react-native';

import styles from './Toast.styles';

import { actionCreators as toastActions } from './redux/actions';

const DIMENSIONS = Dimensions.get('window');
const positions = {
  BOTTOM: -100
};

export default class Toast extends Component {
  state = {
    fadeAnimation: new Animated.Value(0),
    shadowOpacity: new Animated.Value(0),
    present: false,
    message: '',
    dismissTimeout: null
  };

  componentWillMount() {
    this.keyboardDidChangeFrame = Keyboard.addListener('keyboardDidChangeFrame', ({ endCoordinates }) => {
      this.KEYBOARD_HEIGHT = DIMENSIONS.height - endCoordinates.screenY;
    });
  }

  componentWillReceiveProps({ message, error, duration, warning }) {
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

  componentWillUnmount() {
    this.keyboardDidChangeFrame.remove();
  }

  KEYBOARD_HEIGHT = 0;
  keyboardDidChangeFrame = {};

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
        Animated.timing(this.state.fadeAnimation, { toValue: 1 }).start();
        Animated.timing(this.state.shadowOpacity, { toValue: 0.5 }).start();
      }
    );
  }

  hide() {
    Animated.timing(this.state.shadowOpacity, { toValue: 0 }).start();
    Animated.timing(this.state.fadeAnimation, { toValue: 0 }).start(() => {
      this.setState({ present: false, message: null, error: false, warning: false, dismissTimeout: null });
    });
  }

  render() {
    const { position: offset } = this.props;
    if (!this.state.present) {
      return null;
    }

    const messageStyles = [styles.messageContainer, this.props.containerStyle];
    if (this.state.error) {
      messageStyles.push(styles.error, this.props.errorStyle);
    } else if (this.state.warning) {
      messageStyles.push(styles.warning, this.props.warningStyle);
    }
    let position = {
      top: 0,
      bottom: this.KEYBOARD_HEIGHT
    };
    let alignment = {
      justifyContent: 'center'
    };
    let topOrBottom = 'top';
    if (offset) {
      let value = offset;
      if (offset < 0) {
        topOrBottom = 'bottom';
        value = this.KEYBOARD_HEIGHT - offset;
      }
      position = {
        [topOrBottom]: value
      };
      alignment = {
        justifyContent: 'flex-start'
      };
    }
    return (
      <Animated.View
        style={[
          styles.shadow,
          styles.container,
          position,
          alignment,
          { opacity: this.state.fadeAnimation, shadowOpacity: this.state.shadowOpacity }
        ]}
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
  },
  position: positions.BOTTOM
};

Toast.propTypes = {
  containerStyle: View.propTypes.style,
  message: PropTypes.string,
  messageStyle: Text.propTypes.style, // eslint-disable-line react/no-unused-prop-types
  error: PropTypes.bool,
  errorStyle: View.propTypes.style,
  warning: PropTypes.bool,
  warningStyle: View.propTypes.style,
  duration: PropTypes.number,
  getMessageComponent: PropTypes.func,
  position: PropTypes.number
};
