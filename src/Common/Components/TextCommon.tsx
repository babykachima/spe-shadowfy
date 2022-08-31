import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface ITextProps {
  title: string;
  containStyles?: any;
}

const TextCommon: React.FC<ITextProps> = ({ title, containStyles }) => {
  return (
    <View style={styles.contain}>
      <Text style={[styles.styleText, containStyles]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {},
  styleText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
});
export default TextCommon;
