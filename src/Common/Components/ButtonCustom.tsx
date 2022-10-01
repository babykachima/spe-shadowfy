import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Utils/colors';
import TextCommon from './TextCommon';

interface IButtonProps {
  title: string;
  containStyles?: any;
  styleTitle?: any;
  onPress: () => void;
}

const ButtonCustom: React.FC<IButtonProps> = ({ title, styleTitle, containStyles, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, containStyles]} onPress={onPress}>
      <TextCommon title={title} containStyles={styleTitle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonCustom;
