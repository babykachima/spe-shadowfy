import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Utils/colors';
import IconCustom from './IconCustom';
import TextCommon from './TextCommon';

interface IButtonProps {
  title: string;
  containStyles?: any;
  styleTitle?: any;
  onPress: () => void;
}

interface IButtonIconProps extends IButtonProps {
  iconUrl: number;
  tintColor?: string;
}

const ButtonCustom: React.FC<IButtonProps> = ({ title, styleTitle, containStyles, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, containStyles]} onPress={onPress}>
      <TextCommon title={title} containStyles={styleTitle} />
    </TouchableOpacity>
  );
};

export const ButtonIconCustom: React.FC<IButtonIconProps> = ({ title, iconUrl, containStyles, onPress, tintColor }) => {
  return (
    <TouchableOpacity style={[styles.buttonIcon, containStyles]} onPress={onPress}>
      <IconCustom iconUrl={iconUrl} size="m" tintColor={tintColor} />
      <TextCommon title={title} containStyles={styles.title} numberOfLines={1} />
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
  buttonIcon: {
    maxWidth: 120,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    color: Colors.white,
  },
});

export default ButtonCustom;
