import { firebase } from '@react-native-firebase/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Avatar from '../../Common/Components/Avatar';
import TextCommon from '../../Common/Components/TextCommon';
import { dataBanner } from '../../Common/mockData';

import { IBanner } from '../../Types';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';
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
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      firebase.auth().currentUser?.reload();
    }
  }, [isFocused]);
  const navigateInfoUser = useCallback(() => {
    navigation.navigate(Screens.InfoUser as never);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.header}>
        <View style={styles.titleContent}>
          <View style={styles.contentName}>
            <TextCommon title={t('app.hello_users')} containStyles={styles.headerTitle} />
            <TextCommon title={user?.displayName || ''} containStyles={styles.userName} numberOfLines={1} />
          </View>
          <TextCommon title={t('app.welcome')} containStyles={styles.titleWelcome} />
        </View>
        <TouchableOpacity onPress={navigateInfoUser}>
          <Avatar photoURL={user?.photoURL || null} />
        </TouchableOpacity>
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    color: Colors.textColor,
  },
  titleWelcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentName: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    // maxWidth: 230,
    flexShrink: 1,
  },
});
export default HeaderWelcome;
