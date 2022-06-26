import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../../components';
import ArticleItem from './ArticlesItem';
import ArticleMocks from './ArticleMocks.json';
import StickyMenu from './StickyMenu';

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  stickyFooter: {
    backgroundColor: 'white',
    height: 120,
    marginRight: 12,
  },
});

export default function Articles() {
  return (
    <>
      <View style={{ padding: 20 }}>
        <View style={styles.title}>
          <Text variant="h1">Articles</Text>
          <Text variant="button" style={{ fontSize: 15, marginLeft: 10 }}>
            View all
          </Text>
        </View>

        <View style={styles.container}>
          {ArticleMocks.map((item, index) => {
            const key = item.title.trim().toLowerCase() + index;
            return <ArticleItem {...item} index={index} key={key} />;
          })}
        </View>
      </View>

      {/* Sticky Menu fixed spot */}
      <View>
        <View style={[styles.stickyFooter]}>
          <StickyMenu />
        </View>
      </View>
    </>
  );
}
