import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ItemLessions from '../../Common/Components/ItemLession';
import TextCommon from '../../Common/Components/TextCommon';

import { DATA_LESSION } from '../../Common/mockData';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

interface ISectionProps {
  onMoveScreen: () => void;
}
const Sections: React.FC<ISectionProps> = ({ onMoveScreen }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const moveListLessions = useCallback(() => {
    navigation.navigate(Screens.ListLession as never);
  }, [navigation]);
  return (
    <View>
      <View style={styles.header}>
        <TextCommon title={t('lessions.recommend')} containStyles={styles.recommend} />
        <TouchableOpacity onPress={moveListLessions}>
          <TextCommon title={t('lessions.see_all')} containStyles={styles.seeAll} />
        </TouchableOpacity>
      </View>
      {DATA_LESSION.map((item) => (
        <React.Fragment key={item.id}>
          <ItemLessions item={item} onPress={onMoveScreen} />
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
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
