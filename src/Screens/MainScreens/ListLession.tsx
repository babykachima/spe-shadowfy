import React, { useCallback } from 'react';
import { FlatList, Image, ListRenderItem, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { DATA_LESSION, IconCategories } from '../../Common/mockData';
import { IIconCategories, ILession } from '../../Types';

const SlideCategory: React.FC = () => {
  const _renderItem = useCallback<ListRenderItem<IIconCategories>>(({ item }) => {
    return (
      <TouchableOpacity style={styles.itemSlide}>
        <TextCommon title={item.title} containStyles={styles.titleSlide} />
      </TouchableOpacity>
    );
  }, []);
  const _keyExtractor = (item: IIconCategories) => {
    return `${item.id}`;
  };
  return (
    <View>
      <TextCommon title="LIST LESSION" containStyles={styles.title} />
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
  const _renderItem = useCallback<ListRenderItem<ILession>>(({ item }) => {
    return (
      <TouchableOpacity style={styles.containLession} key={item.id}>
        <View style={styles.img}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <TextCommon title={item.title} containStyles={styles.titleLession} numberOfLines={2} />
            <TextCommon title={item.description} containStyles={styles.description} numberOfLines={3} />
          </View>
          <View style={styles.bottomContent}>
            <ButtonCustom title="Borrow it" containStyles={styles.button} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);
  const _keyExtractor = (item: ILession) => {
    return `${item.id}`;
  };
  return (
    <FlatList
      data={DATA_LESSION}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      style={styles.flatlistSlide}
    />
  );
};

const ListLession: React.FC = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <SlideCategory />
      <Lessions />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemSlide: {
    marginRight: 30,
    backgroundColor: '#FECC31',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  titleSlide: {
    fontSize: 15,
  },
  flatlistSlide: {
    marginVertical: 10,
  },
  //
  containLession: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF9F9',
  },
  img: {
    flex: 0.35,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  content: {
    flex: 0.6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  topContent: {},
  bottomContent: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  titleLession: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ACADAD',
  },
  button: {
    marginHorizontal: 10,
  },
});
export default ListLession;
