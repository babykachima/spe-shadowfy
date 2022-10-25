import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Header } from '../../Common/Components/Header';

const GuideLine: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View>
      <Header title={t('screens.Guide')} rightIcon={false} goBack={navigation.goBack} />
    </View>
  );
};
export default GuideLine;
