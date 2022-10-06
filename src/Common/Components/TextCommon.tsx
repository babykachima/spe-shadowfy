import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../Utils/colors';

interface ITextProps {
  title: string;
  containStyles?: any;
  numberOfLines?: number;
}

const TextCommon: React.FC<ITextProps> = ({ title, containStyles, numberOfLines }) => {
  return (
    <View style={styles.contain}>
      <Text style={[styles.styleText, containStyles]} numberOfLines={numberOfLines} selectable={true}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {},
  styleText: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: 'Poppins-Regular',
  },
});
export default TextCommon;
