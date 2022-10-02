import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Utils/colors';
import IconCustom from './IconCustom';
import TextCommon from './TextCommon';

interface IButtonProps {
  title: string;
  containStyles?: any;
  styleTitle?: any;
  onPress: () => void;
  disabled?: boolean;
}

interface IButtonIconProps extends IButtonProps {
  iconUrl: number;
  tintColor?: string;
}

const ButtonCustom: React.FC<IButtonProps> = ({ title, containStyles, onPress, disabled }) => {
  const isActiveButton = useMemo(() => {
    return disabled ? styles.btnInActive : styles.btnActive;
  }, [disabled]);
  return (
    <TouchableOpacity style={[styles.button, isActiveButton, containStyles]} onPress={onPress} disabled={disabled}>
      <TextCommon title={title} containStyles={styles.title} />
    </TouchableOpacity>
  );
};

export const ButtonIconCustom: React.FC<IButtonIconProps> = ({
  title,
  iconUrl,
  containStyles,
  onPress,
  tintColor,
  disabled,
}) => {
  return (
    <TouchableOpacity style={[styles.buttonIcon, containStyles]} onPress={onPress} disabled={disabled}>
      <IconCustom iconUrl={iconUrl} size="m" tintColor={tintColor} />
      <TextCommon title={title} containStyles={styles.titleBtnIcon} numberOfLines={1} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: Colors.primaryColor,
  },
  btnInActive: {
    backgroundColor: Colors.primaryColorLayout,
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
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  titleBtnIcon: {
    marginLeft: 10,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ButtonCustom;
