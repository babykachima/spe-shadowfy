import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../Common/Components/Header';

import { useGetDataFireStore, useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';

const PracticeShadowing: React.FC = () => {
  const navigation = useNavigation();
  const [lessions] = useGetDataFireStore('lessions');
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');

  return (
    <View style={styles.contain}>
      <Header title="Practice Shadowing" goBack={navigation.goBack} />
      {lessions && <Text>PracticeShadowing </Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
});
export default PracticeShadowing;
