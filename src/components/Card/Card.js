import React from 'react';
import { StyleSheet } from 'react-native';
import View from '../View';

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 10,
  },
});

const Card = ({ children, style, ...rest }) => (
  <View style={[styles.card, style]} shadow {...rest}>
    {children}
  </View>
);

export default Card;
