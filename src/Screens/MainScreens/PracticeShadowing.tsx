import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PracticeShadowing: React.FC = () => {
  return (
    <View style={styles.contain}>
      <Text>PracticeShadowing </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PracticeShadowing;
