import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';

import ButtonCustom from '../../Common/Components/ButtonCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { DATA_LESSION } from '../../Common/mockData';

interface ISectionProps {
  headerComponent?: any;
  onPress: () => void;
}
const Sections: React.FC<ISectionProps> = ({ onPress }) => {
  return (
    <React.Fragment>
      {DATA_LESSION.map((item) => {
        return (
          <TouchableOpacity style={styles.contain} key={item.id}>
            <View style={styles.img}>
              <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.content}>
              <View style={styles.topContent}>
                <TextCommon title={item.title} containStyles={styles.title} numberOfLines={2} />
                <TextCommon title={item.description} containStyles={styles.description} numberOfLines={3} />
              </View>
              <TouchableOpacity style={styles.bottomContent} onPress={onPress}>
                <ButtonCustom title="Borrow it" containStyles={styles.button} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFF9F9',
  },
  img: {
    flex: 0.35,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  content: {
    flex: 0.6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  topContent: {},
  bottomContent: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ACADAD',
  },
  button: {
    marginHorizontal: 10,
  },
});

export default Sections;
