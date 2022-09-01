import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, Image, View, StyleSheet, ScrollView } from 'react-native';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { DATA_LESSION } from '../../Common/mockData';
import { ILession } from '../../Types';

interface ISectionProps {
  headerComponent?: any;
}
const Sections: React.FC<ISectionProps> = ({ headerComponent }) => {
  const renderItem = useCallback<ListRenderItem<ILession>>(({ item }) => {
    return (
      <TouchableOpacity style={styles.contain}>
        <View style={styles.img}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <TextCommon title={item.title} containStyles={styles.title} numberOfLines={2} />
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
      ListHeaderComponent={headerComponent}
      keyExtractor={_keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  contain: {
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
  title: {
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

export default Sections;
