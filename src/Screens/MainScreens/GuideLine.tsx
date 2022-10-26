import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from '../../Common/Components/Header';
import TextCommon from '../../Common/Components/TextCommon';
import { Colors } from '../../Utils/colors';

const GuideLine: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.contain}>
      <Header title={t('screens.Guide')} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <View style={styles.lineItem}>
          <TextCommon title={t('guide.step_1')} containStyles={styles.question} />
          <TextCommon title={t('guide.guide_1')} containStyles={styles.answer} />
        </View>
        <View style={styles.lineItem}>
          <TextCommon title={t('guide.step_2')} containStyles={styles.question} />
          <TextCommon title={t('guide.guide_2')} containStyles={styles.answer} />
        </View>
        <View style={styles.lineItem}>
          <TextCommon title={t('guide.step_3')} containStyles={styles.question} />
          <TextCommon title={t('guide.guide_3')} containStyles={styles.answer} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 20,
  },
  lineItem: {
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: Colors.grayColor,
    fontWeight: '400',
  },
});
export default GuideLine;
