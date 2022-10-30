import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import ItemLessions from '../../Common/Components/ItemLession';
import { useGetDataFireStore } from '../../Hooks/fetchDataFireStore';
import { ILession } from '../../Types';
import { Screens } from '../../Utils/navigationConfig';
import HeaderFlatlist from './HeaderFlatlist';

interface ISectionProps {
  onMoveScreen: (id: string) => void;
}
const Sections: React.FC<ISectionProps> = ({ onMoveScreen }) => {
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
      <HeaderFlatlist onNavigate={moveListLessions} />
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
});

export default Sections;
