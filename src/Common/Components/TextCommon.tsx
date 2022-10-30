import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../Utils/colors';

interface ITextProps {
  title: string | null | number;
  containStyles?: any;
  numberOfLines?: number;
  onPress?: () => void;
}

const TextCommon: React.FC<ITextProps> = ({ title, containStyles, numberOfLines, onPress }) => {
  return (
    <View style={styles.contain}>
      <Text style={[styles.styleText, containStyles]} numberOfLines={numberOfLines} selectable={true} onPress={onPress}>
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
  },
});
export default TextCommon;
