import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ic_avatar } from '../../Assets';

const Avatar = () => {
  return (
    <View style={styles.contain}>
      <Image source={ic_avatar} resizeMode="cover" style={styles.styleImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {},
  styleImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
export default Avatar;
