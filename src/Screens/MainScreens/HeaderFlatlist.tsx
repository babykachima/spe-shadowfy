import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextCommon from '../../Common/Components/TextCommon';
import { Colors } from '../../Utils/colors';

interface IHeaderFlatlist {
  onNavigate: () => void;
}

const HeaderFlatlist: React.FC<IHeaderFlatlist> = ({ onNavigate }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <TextCommon title={t('lessions.recommend')} containStyles={styles.recommend} />
      <TouchableOpacity onPress={onNavigate}>
        <TextCommon title={t('lessions.see_all')} containStyles={styles.seeAll} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default HeaderFlatlist;
