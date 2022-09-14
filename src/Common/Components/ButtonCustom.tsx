import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextCommon from './TextCommon';

interface IButtonProps {
  title: string;
  containStyles?: any;
}

const ButtonCustom: React.FC<IButtonProps> = ({ title, containStyles }) => {
  return (
    <View style={[styles.button, containStyles]}>
      <TextCommon title={title} containStyles={title} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FECC31',
    padding: 10,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ButtonCustom;
