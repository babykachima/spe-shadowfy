import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../../Utils/colors';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primaryColor} size="large" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Loading;
