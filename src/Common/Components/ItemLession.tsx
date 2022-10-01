import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../Utils/colors';
import ButtonCustom from './ButtonCustom';
import TextCommon from './TextCommon';

interface IItemLessions {
  item: any;
  onPress: () => void;
}

const ItemLessions: React.FC<IItemLessions> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.contain} key={item.id}>
      <View style={styles.img}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <TextCommon title={item.title} containStyles={styles.title} numberOfLines={2} />
          <TextCommon title={item.description} containStyles={styles.description} numberOfLines={3} />
        </View>
        <View style={styles.button}>
          <ButtonCustom title="Borrow it" onPress={onPress} styleTitle={styles.titleButton} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.cardColor,
  },
  img: {
    flex: 0.35,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  content: {
    flex: 0.6,
    marginTop: 5,
    justifyContent: 'space-around',
  },
  topContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
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
    color: Colors.borderColor,
  },
  button: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 10,
  },

  titleButton: {
    color: Colors.white,
  },
});
export default ItemLessions;
