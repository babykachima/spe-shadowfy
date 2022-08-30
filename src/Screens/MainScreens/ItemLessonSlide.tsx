import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import TextCommon from '../../Common/Components/TextCommon';

interface IData {
  data: any;
}

const ItemLessionSlide: React.FC<IData> = ({ data }) => {
  const { item } = data;
  return (
    <TouchableOpacity>
      <ImageBackground source={{ uri: item.image }} resizeMode="cover">
        <View>
          <TextCommon title={item.title} />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ItemLessionSlide;
