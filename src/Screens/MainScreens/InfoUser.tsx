import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Header } from '../../Common/Components/Header';

const InfoUser: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header title={'InfoUser'} rightIcon={false} goBack={navigation.goBack} />
    </View>
  );
};
export default InfoUser;
