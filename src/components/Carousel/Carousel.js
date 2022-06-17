import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from '../Text';
import { PortalContext } from '../Portal';

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    backgroundColor: 'red',
  },
});

export default function Carousel({ elements, gateNameRender }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { teleport } = useContext(PortalContext);

  useEffect(() => {
    const InitialComponent = elements[0].component;
    teleport(gateNameRender, <InitialComponent />);
    return () => setCurrentItemIndex(0);
  }, []);

  const handleChange = (Component, index) => {
    if (currentItemIndex !== index) {
      teleport(gateNameRender, <Component />);
      setCurrentItemIndex(index);
    }
  };

  return (
    <View>
      <FlatList
        data={elements}
        renderItem={({ item, index }) => (
          <Item item={item} key={index} index={index} onChange={handleChange} />
        )}
        keyExtractor={(item) => item.title}
        onEndReachedThreshold
        horizontal
        centerContent
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

function Item({ item, onChange, index }) {
  return (
    <TouchableWithoutFeedback onPress={() => onChange(item.component, index)}>
      <View style={styles.button}>
        <Text>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
