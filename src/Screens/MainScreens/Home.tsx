import React, { useCallback } from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, ListRenderItem, ScrollView } from 'react-native';
import { dataBanner, IconCategories } from '../../Common/mockData';

import { IBanner, IIconCategories } from '../../Types';
import HeaderFlatlist from './HeaderFlatlist';
import HeaderWelcome from './HeaderWelcome';
import ItemBanner from './ItemBanner';
import ItemIconCategories from './ItemIconCategories';
import Sections from './Sections';

const Banner = () => {
  const _renderItem = useCallback<ListRenderItem<IBanner>>(({ item }) => {
    return <ItemBanner data={item} />;
  }, []);
  const _keyExtractor = (item: IBanner) => {
    return `${item.id}`;
  };
  return (
    <FlatList
      data={dataBanner}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      nestedScrollEnabled={true}
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
    <React.Fragment>
      <FlatList
        data={IconCategories}
        renderItem={renderItem}
        keyExtractor={_keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        nestedScrollEnabled={true}
      />
      <HeaderFlatlist />
    </React.Fragment>
  );
};

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Banner />
      <View style={styles.categoryHeader}>
        <ListCategories />
      </View>
    </React.Fragment>
  );
};
const Home: React.FC = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <HeaderWelcome />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Header />
        <Sections />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  header: {},
  categoryHeader: {
    marginTop: 20,
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default Home;
