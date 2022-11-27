import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ic_placeholder } from '../../Assets';
import { ILession } from '../../Types';
import { Colors } from '../../Utils/colors';
import ButtonCustom from './ButtonCustom';
import TextCommon from './TextCommon';

interface IItemLessions {
  item: ILession;
  onPress: () => void;
}

const ItemLessions: React.FC<IItemLessions> = ({ item, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.contain} key={item.key} onPress={onPress}>
      <View style={styles.img}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" defaultSource={ic_placeholder} />
      </View>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <TextCommon title={item.title} containStyles={styles.title} numberOfLines={2} />
          <TextCommon title={item.content} containStyles={styles.contentDes} numberOfLines={2} />
        </View>
        <View style={styles.button}>
          <ButtonCustom title={t('lessions.study_now')} onPress={onPress} styleTitle={styles.titleButton} />
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
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    flex: 0.63,
    marginTop: 5,
    justifyContent: 'space-between',
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
    fontSize: 18,
  },
  contentDes: {
    marginTop: 10,
    marginRight: 5,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.borderColor,
  },
  button: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },

  titleButton: {
    color: Colors.white,
  },
});
export default ItemLessions;
