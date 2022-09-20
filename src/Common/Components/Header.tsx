import React, { useMemo } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { ic_arrow_back, ic_menu } from '../../Assets';
import TextCommon from './TextCommon';

interface IHeader {
  title: string;
  goBack: () => void;
  rightIcon?: boolean;
}

export const Header: React.FC<IHeader> = ({ title, goBack, rightIcon }) => {
  const renderRightItem = useMemo(() => {
    if (!rightIcon) {
      return <View style={styles.rightItem} />;
    }
    return (
      <TouchableOpacity>
        <Image source={ic_menu} style={styles.img} />
      </TouchableOpacity>
    );
  }, [rightIcon]);
  return (
    <SafeAreaView style={styles.contain}>
      <TouchableOpacity onPress={goBack} style={styles.icon}>
        <Image source={ic_arrow_back} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.contentTitle}>
        <TextCommon title={title} containStyles={styles.title} />
      </View>
      {renderRightItem}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 18,
    height: 18,
  },
  icon: {
    marginLeft: 10,
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
