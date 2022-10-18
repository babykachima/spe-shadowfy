import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ic_avatar } from '../../Assets';

interface IAvatar {
  photoURL: string | null;
}
const Avatar: React.FC<IAvatar> = ({ photoURL }) => {
  const renderImage = useMemo(() => {
    return photoURL ? { uri: photoURL } : ic_avatar;
  }, [photoURL]);
  return (
    <View style={styles.contain}>
      <Image source={renderImage} resizeMode="cover" style={styles.styleImage} />
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
