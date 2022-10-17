import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Header } from '../../Common/Components/Header';

const FAQ: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header title={'FAQ'} rightIcon={false} goBack={navigation.goBack} />
    </View>
  );
};
export default FAQ;
