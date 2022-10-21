import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Header } from '../../Common/Components/Header';

const AboutApp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header title={'AboutApp'} rightIcon={false} goBack={navigation.goBack} />
    </View>
  );
};
export default AboutApp;
