import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, View } from 'react-native';
import Avatar from '../../Common/Components/Avatar';
import TextCommon from '../../Common/Components/TextCommon';
import { dataBanner } from '../../Common/mockData';
import { IBanner } from '../../Types';
import ItemBanner from './ItemBanner';

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

const HeaderWelcome = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <View style={styles.titleContent}>
          <TextCommon title="Hello,Ethan" containStyles={styles.headerTitle} />
          <TextCommon title={t('app.welcome')} containStyles={styles.titleWelcome} />
        </View>
        <Avatar />
      </View>
      <Banner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContent: {
    flex: 0.8,
  },
  headerTitle: {
    marginVertical: 10,
    fontSize: 18,
    color: '#191919',
  },
  titleWelcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default HeaderWelcome;
