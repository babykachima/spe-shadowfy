import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import TextCommon from '../../Common/Components/TextCommon';
import { IIconCategories } from '../../Types';

interface IDataProps {
  data: IIconCategories;
}

const ItemIconCategories: React.FC<IDataProps> = ({ data }) => {
  return (
    <TouchableOpacity style={styles.contain}>
      <Image source={data.icon} style={styles.image} />
      <TextCommon title={data.title} containStyles={styles.title} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contain: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    marginTop: 10,
    fontSize: 17,
  },
});

export default ItemIconCategories;
