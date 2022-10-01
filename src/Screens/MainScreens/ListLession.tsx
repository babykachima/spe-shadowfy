import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, View } from 'react-native';
import { ButtonIconCustom } from '../../Common/Components/ButtonCustom';

import ItemLessions from '../../Common/Components/ItemLession';
import TextCommon from '../../Common/Components/TextCommon';
import { DATA_LESSION, IconCategories } from '../../Common/mockData';
import { IIconCategories, ILession } from '../../Types';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

const SlideCategory: React.FC = () => {
  const _renderItem = useCallback<ListRenderItem<IIconCategories>>(({ item }) => {
    return (
      <ButtonIconCustom
        title={item.title}
        iconUrl={item.icon}
        onPress={() => console.log('select button icon')}
        tintColor={Colors.white}
        containStyles={styles.btnSilde}
      />
    );
  }, []);
  const _keyExtractor = (item: IIconCategories) => {
    return `${item.id}`;
  };
  return (
    <View style={styles.containSlide}>
      <TextCommon title="List lessions" containStyles={styles.title} />
      <FlatList
        data={IconCategories}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.flatlistSlide}
      />
    </View>
  );
};

const Lessions = () => {
  const navigation = useNavigation();
  const navigateScreen = useCallback(() => {
    navigation.navigate(Screens.PracticeShadowing as never);
  }, [navigation]);
  const _renderItem = useCallback<ListRenderItem<ILession>>(
    ({ item }) => {
      return <ItemLessions item={item} onPress={navigateScreen} />;
    },
    [navigateScreen]
  );
  const _keyExtractor = (item: ILession) => {
    return `${item.id}`;
  };
  return (
    <FlatList
      data={DATA_LESSION}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      showsVerticalScrollIndicator={false}
      style={styles.flatlistLessions}
    />
  );
};

const ListLession: React.FC = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <SlideCategory />
      <View style={styles.lessions}>
        <Lessions />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containSlide: {
    marginHorizontal: 20,
  },
  lessions: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  btnSilde: {
    marginRight: 10,
  },
  flatlistSlide: {
    marginVertical: 20,
    backgroundColor: Colors.white,
  },
  flatlistLessions: {
    backgroundColor: Colors.white,
  },
  content: {
    flex: 0.6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },

  titleSide: {
    color: Colors.white,
    fontSize: 14,
  },
  button: {
    marginHorizontal: 10,
  },
});
export default ListLession;
