import React, { useMemo } from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native';
import { ic_goback, ic_info } from '../../Assets';
import { Colors } from '../../Utils/colors';
import IconCustom from './IconCustom';
import TextCommon from './TextCommon';

interface IHeader {
  title: string;
  goBack: () => void;
  rightIcon?: boolean;
  onPressPopover?: () => void;
}

export const Header: React.FC<IHeader> = ({ title, goBack, onPressPopover, rightIcon }) => {
  const renderRightIcon = useMemo(() => {
    if (!rightIcon) {
      return <View style={styles.rightItem} />;
    }
    return (
      <TouchableOpacity style={styles.iconRight} onPress={onPressPopover}>
        <IconCustom iconUrl={ic_info} size="l" />
      </TouchableOpacity>
    );
  }, [onPressPopover, rightIcon]);
  return (
    <SafeAreaView style={styles.contain}>
      <TouchableOpacity onPress={goBack} style={styles.iconLeft}>
        <IconCustom iconUrl={ic_goback} size="l" />
      </TouchableOpacity>
      <View style={styles.contentTitle}>
        <TextCommon title={title} containStyles={styles.title} />
      </View>
      {renderRightIcon}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  img: {
    width: 20,
    height: 20,
    tintColor: Colors.textColor,
  },
  iconLeft: {
    marginLeft: 2,
    marginBottom: 10,
  },
  iconRight: {
    marginRight: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  contentTitle: {
    marginBottom: 10,
  },
  rightItem: {
    width: 20,
    height: 20,
  },
});
