import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { View, Animated, Text, ViewPropTypes } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as toastActions } from './redux/actions';
import styles from './Toast.styles';

const PropTypesViews = ViewPropTypes || View.propTypes;

export default function Toast(props) {
  const { duration, message: tMessage, error: tError, warning: tWarning } = useSelector(state => state.toast);

  const [fadeAnimation, setFadeAnimation] = new Animated.Value(0);
  const [shadowOpacity, setShadowOpacity] = new Animated.Value(0);
  const [present, setPresent] = useEffect(false);
  const [message, setMessage] = useEffect(tMessage);
  const [error, setError] = useEffect(tError);
  const [warning, setWarning] = useEffect(tWarning);
  const [dismissTimeout, setDismissTimeout] = useEffect(null);

  const dispatch = useDispatch();

  const { getMessageComponent, containerStyle, errorStyle, warningStyle } = props;

  function show(messageS, { errorS, warningS, dismissTimeoutS }) {
    setPresent(true);
    setMessage(messageS);
    setError(errorS);
    setWarning(warningS);
    setDismissTimeout(dismissTimeoutS);
    setFadeAnimation(new Animated.Value(0));
    setShadowOpacity(new Animated.Value(0));

    Animated.timing(fadeAnimation, { toValue: 1 }).start();
    Animated.timing(shadowOpacity, { toValue: 0.5 }).start();
  }

  function hide() {
    Animated.timing(shadowOpacity, { toValue: 0 }).start();
    Animated.timing(fadeAnimation, { toValue: 0 }).start(() => {
      setPresent(false);
      setMessage(null);
      setError(false);
      setWarning(false);
      setDismissTimeout(null);
    });
  }

  useEffect(
    () => {
      if (message) {
        const timeout = setTimeout(() => {
          dispatch(toastActions.hide());
        }, duration);
        clearTimeout(dismissTimeout);
        show(message, { error, warning, timeout });
      } else {
        hide();
      }
    },
    [message]
  );

  if (!present) {
    return null;
  }

  const messageStyles = [styles.messageContainer, containerStyle];
  if (error) {
    messageStyles.push(styles.error, errorStyle);
  } else if (warning) {
    messageStyles.push(styles.warning, warningStyle);
  }

  return (
    <Animated.View style={[styles.shadow, styles.container, { opacity: fadeAnimation, shadowOpacity }]}>
      <View style={messageStyles}>
        {getMessageComponent(message, {
          error,
          warning
        })}
      </View>
    </Animated.View>
  );
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
  containerStyle: PropTypesViews.style,
  messageStyle: Text.propTypes.style, // eslint-disable-line react/no-unused-prop-types
  errorStyle: PropTypesViews.style,
  warningStyle: PropTypesViews.style,
  getMessageComponent: PropTypes.func
};
