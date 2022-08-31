import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import { IBanner } from '../../Types';

interface IData {
  data: IBanner;
}

const ItemBanner: React.FC<IData> = ({ data }) => {
  return (
    <View style={styles.bannerItem}>
      <Image source={{ uri: data.image }} style={styles.itemImage} resizeMode="cover" />
    </View>
  );
};
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  bannerItem: {
    width: width - 40,
    height: (width * 160) / 375,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 343 / 160,
    borderRadius: 8,
  },
});

export default ItemBanner;
