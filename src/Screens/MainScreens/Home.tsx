import React, { useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import TextCommon from '../../Common/Components/TextCommon';
import HeaderWelcome from './HeaderWelcome';
import ItemLessionSlide from './ItemLessonSlide';

interface ILesstion {
  id: number | string;
  title: string;
  image: string;
}
const DATA: Array<ILesstion> = [
  {
    id: 1,
    title: 'To be Marketeers Professial!',
    image:
      'https://images.unsplash.com/photo-1661855615580-d60196fa422a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 2,
    title: 'To be Design Professial!',
    image:
      'https://images.unsplash.com/photo-1661855615580-d60196fa422a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
];

const HotLession = () => {
  const _renderItem = useCallback((item: ILesstion) => {
    return (
      <TouchableOpacity>
        <ImageBackground source={{ uri: item.image }} resizeMode="cover">
          <View>
            <TextCommon title={item.title} />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);
  const _keyExtractor = (item: ILesstion) => {
    return `${item.id}`;
  };
  return <FlatList data={DATA} renderItem={_renderItem} keyExtractor={_keyExtractor} />;
};

const Home = () => {
  return (
    <SafeAreaView style={styles.contain}>
      <HeaderWelcome />
      <HotLession />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
});

export default Home;
