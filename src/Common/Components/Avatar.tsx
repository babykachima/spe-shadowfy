import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ic_avatar } from '../../Assets';

const Avatar = () => {
  console.log('ic_avatar -->', typeof ic_avatar);
  return (
    <View style={styles.contain}>
      <Image source={ic_avatar} resizeMode="cover" style={styles.styleImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {},
  styleImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
export default Avatar;
