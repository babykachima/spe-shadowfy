import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useGetDataFireStore, useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';

const PracticeShadowing: React.FC = () => {
  const [lessions] = useGetDataFireStore('lessions');
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');
  console.log('lessionsDetail ====>,', lessionsDetail);

  return <View style={styles.contain}>{lessions && <Text>PracticeShadowing </Text>}</View>;
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PracticeShadowing;
