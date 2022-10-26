import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from 'react-native';

import ItemLessions from '../../Common/Components/ItemLession';
import TextCommon from '../../Common/Components/TextCommon';

import { useGetDataFireStore } from '../../Hooks/fetchDataFireStore';
import { ILession } from '../../Types';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

interface ISectionProps {
  onMoveScreen: (id: string) => void;
}
const Sections: React.FC<ISectionProps> = ({ onMoveScreen }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const moveListLessions = useCallback(() => {
    navigation.navigate(Screens.ListLession as never);
  }, [navigation]);

  const [lessions] = useGetDataFireStore('lessions');

  const _renderItem = useCallback<ListRenderItem<ILession>>(
    ({ item }) => {
      return <ItemLessions item={item} onPress={() => onMoveScreen(item.key)} />;
    },
    [onMoveScreen]
  );
  const _keyExtractor = (item: ILession) => {
    return `${item.key}`;
  };

  return (
    <View style={styles.contain}>
      <View style={styles.header}>
        <TextCommon title={t('lessions.recommend')} containStyles={styles.recommend} />
        <TouchableOpacity onPress={moveListLessions}>
          <TextCommon title={t('lessions.see_all')} containStyles={styles.seeAll} />
        </TouchableOpacity>
      </View>
      <View style={styles.lessions}>
        <FlatList
          data={lessions}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  lessions: {
    height: '100%',
  },
  flatlist: {
    flex: 1,
    marginBottom: 40,
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommend: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textColor,
  },
  seeAll: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: Colors.grayColor,
  },
});

export default Sections;
