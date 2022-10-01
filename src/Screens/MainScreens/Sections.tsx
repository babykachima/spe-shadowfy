import React from 'react';
import { View } from 'react-native';

import ItemLessions from '../../Common/Components/ItemLession';

import { DATA_LESSION } from '../../Common/mockData';

interface ISectionProps {
  onMoveScreen: () => void;
}
const Sections: React.FC<ISectionProps> = ({ onMoveScreen }) => {
  return (
    <View>
      {DATA_LESSION.map((item) => (
        <ItemLessions item={item} onPress={onMoveScreen} />
      ))}
    </View>
  );
};

export default Sections;
