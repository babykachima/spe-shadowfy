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
  iconUrl: string | number;
  tintColor?: string;
  selected?: boolean;
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
  selected,
}) => {
  const selectedStyles = useMemo(() => {
    if (selected) {
      return {
        buttonContain: styles.buttonIconSelected,
        titleIconBtn: styles.titleBtnIconSelected,
        tintColors: Colors.primaryColor,
      };
    } else {
      return {
        buttonContain: styles.buttonIcon,
        titleIconBtn: styles.titleBtnIcon,
        tintColors: tintColor,
      };
    }
  }, [selected, tintColor]);
  return (
    <TouchableOpacity style={[selectedStyles.buttonContain, containStyles]} onPress={onPress} disabled={disabled}>
      <IconCustom iconUrl={iconUrl} size="m" tintColor={selectedStyles.tintColors} />
      <TextCommon title={title} containStyles={selectedStyles.titleIconBtn} numberOfLines={1} />
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIconSelected: {
    maxWidth: 120,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  titleBtnIcon: {
    marginLeft: 5,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  titleBtnIconSelected: {
    marginLeft: 5,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ButtonCustom;
