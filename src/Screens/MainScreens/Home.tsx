import React, { useCallback } from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, ListRenderItem } from 'react-native';
import { ic_funny, ic_history, ic_nature, ic_news, ic_sport, ic_interseting } from '../../Assets';

import { IBanner, IIconCategories } from '../../Types';
import HeaderWelcome from './HeaderWelcome';
import ItemBanner from './ItemBanner';
import ItemIconCategories from './ItemIconCategories';

const DATA: Array<IBanner> = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1661860859715-d963b4d51268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const IconCategories: Array<IIconCategories> = [
  {
    id: 1,
    title: 'Funny',
    icon: ic_funny,
  },
  {
    id: 2,
    title: 'History',
    icon: ic_history,
  },
  {
    id: 3,
    title: 'Interseting',
    icon: ic_interseting,
  },
  {
    id: 4,
    title: 'Nature',
    icon: ic_nature,
  },
  {
    id: 5,
    title: 'News',
    icon: ic_news,
  },
  {
    id: 6,
    title: 'Sport',
    icon: ic_sport,
  },
];

const Banner = () => {
  const _renderItem = useCallback<ListRenderItem<IBanner>>(({ item }) => {
    return <ItemBanner data={item} />;
  }, []);
  const _keyExtractor = (item: IBanner) => {
    return `${item.id}`;
  };
  return (
    <FlatList
      data={DATA}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    />
  );
};
const ListCategories = () => {
  const renderItem = useCallback<ListRenderItem<IIconCategories>>(({ item }) => {
    return <ItemIconCategories data={item} />;
  }, []);
  const _keyExtractor = (item: IIconCategories) => {
    return `${item.id}`;
  };
  return (
    <FlatList
      data={IconCategories}
      renderItem={renderItem}
      keyExtractor={_keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    />
  );
};

const Home = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <HeaderWelcome />
      </View>
      <View style={styles.banner}>
        <Banner />
      </View>
      <View style={styles.listIconCategories}>
        <ListCategories />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {},
  banner: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  listIconCategories: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default Home;
