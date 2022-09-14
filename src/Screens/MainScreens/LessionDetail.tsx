import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TextCommon from '../../Common/Components/TextCommon';

const LessionDetail: React.FC = () => {
  return (
    <View style={styles.contain}>
      <View>
        <TextCommon title="Title of text" />
      </View>
      <ScrollView horizontal={false}>
        <TextCommon title="Helloe" />
      </ScrollView>
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
export default LessionDetail;
