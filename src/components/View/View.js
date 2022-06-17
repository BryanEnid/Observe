import React from 'react';
import { View } from 'react-native';

export default function ViewContainer(props) {
  const { children, shadow, style, ...rest } = props;
  return (
    <View
      style={[
        shadow && {
          backgroundColor: 'white',
          shadowColor: '#ccc',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
