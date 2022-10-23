import React, { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SizeIcon } from '../../Types';
import { Colors } from '../../Utils/colors';

interface IIconCustom {
  iconUrl: number;
  tintColor?: string;
  size?: string;
  containStyles?: any;
}

const IconCustom: React.FC<IIconCustom> = ({ iconUrl, tintColor, size, containStyles }) => {
  const renderCustomSizeIcon = useMemo(() => {
    switch (size) {
      case SizeIcon.S: {
        return styles.styleS;
      }
      case SizeIcon.M: {
        return styles.styleM;
      }
      case SizeIcon.L: {
        return styles.styleL;
      }
      default:
        return;
    }
  }, [size]);

  const renderColorIcon = useMemo(() => {
    return tintColor ? { tintColor: tintColor } : styles.defaultTintColor;
  }, [tintColor]);

  return (
    <View style={styles.contain}>
      {iconUrl && <Image source={iconUrl} style={[renderCustomSizeIcon, renderColorIcon, containStyles]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {},
  styleS: {
    width: 16,
    height: 16,
  },
  styleM: {
    width: 18,
    height: 18,
  },
  styleL: {
    width: 25,
    height: 25,
  },
  defaultTintColor: {
    tintColor: Colors.primaryColor,
  },
});

export default IconCustom;
