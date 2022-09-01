import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ic_rightdown } from '../../Assets';
import TextCommon from '../../Common/Components/TextCommon';

const HeaderFlatlist: React.FC = () => {
  return (
    <View style={styles.contain}>
      <TextCommon title="RECOMMEND" containStyles={styles.recommend} />
      <TouchableOpacity style={styles.contentRight}>
        <TextCommon title="See all" containStyles={styles.seeAll} />
        <Image source={ic_rightdown} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    borderTopColor: '#ACADAD',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommend: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  seeAll: {
    fontWeight: '600',
    fontSize: 14,
  },
  icon: {
    marginLeft: 5,
    tintColor: '#ACADAD',
    width: 20,
    height: 20,
  },
});
export default HeaderFlatlist;
