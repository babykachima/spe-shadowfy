import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ButtonIconCustom } from '../../Common/Components/ButtonCustom';

import ItemLessions from '../../Common/Components/ItemLession';
import TextCommon from '../../Common/Components/TextCommon';
import { IconCategories } from '../../Common/mockData';
import { useGetDataFireStore } from '../../Hooks/fetchDataFireStore';

import { IIconCategories, ILession } from '../../Types';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

interface ISlideCategory {
  selectCategory: (category: IIconCategories) => void;
  itemSelected: IIconCategories | undefined;
  onUChecked: () => void;
  isChecked: boolean;
}

const SlideCategory: React.FC<ISlideCategory> = ({ selectCategory, onUChecked, isChecked, itemSelected }) => {
  const { t } = useTranslation();
  const _renderItem = useCallback<ListRenderItem<IIconCategories>>(
    ({ item }) => {
      return (
        <ButtonIconCustom
          title={item.title}
          iconUrl={item.icon}
          onPress={() => selectCategory(item)}
          tintColor={Colors.white}
          containStyles={styles.btnSilde}
          selected={item.id === itemSelected?.id ? true : false}
        />
      );
    },
    [itemSelected?.id, selectCategory]
  );
  const _keyExtractor = (item: IIconCategories) => {
    return `${item.id}`;
  };
  return (
    <View style={styles.containSlide}>
      <View style={styles.header}>
        <TextCommon title={t('screens.ListLession')} containStyles={styles.title} />
        {isChecked && (
          <TouchableOpacity onPress={onUChecked}>
            <TextCommon title={t('lessions.unchecked')} containStyles={styles.unChecked} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={IconCategories}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.flatlistSlide}
      />
    </View>
  );
};

interface ILessions {
  lessions: ILession[] | undefined;
}

const Lessions: React.FC<ILessions> = ({ lessions }) => {
  const navigation = useNavigation();
  const navigateScreen = useCallback(
    (key: string) => {
      return navigation.navigate(Screens.PracticeShadowing as never, { key: key } as never);
    },
    [navigation]
  );
  const _renderItem = useCallback<ListRenderItem<ILession>>(
    ({ item }) => {
      return <ItemLessions item={item} onPress={() => navigateScreen(item.key)} />;
    },
    [navigateScreen]
  );
  const _keyExtractor = (item: ILession) => {
    return `${item.key}`;
  };
  return (
    <FlatList
      data={lessions}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      showsVerticalScrollIndicator={false}
      style={styles.flatlistLessions}
    />
  );
};

const ListLession: React.FC = () => {
  const [lessions] = useGetDataFireStore('lessions');
  const [categorySelected, setCategorySelected] = useState<IIconCategories>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSelectCategory = useCallback((category: IIconCategories) => {
    setCategorySelected(category);
    setIsChecked(true);
  }, []);

  const filterLession = useMemo(() => {
    if (categorySelected) {
      return lessions?.filter((item: ILession) => item.category === categorySelected.value);
    }
    return lessions;
  }, [categorySelected, lessions]);
  const handleUnChecked = useCallback(() => {
    setCategorySelected(undefined);
    setIsChecked(false);
  }, []);
  return (
    <SafeAreaView style={styles.contain}>
      <SlideCategory
        selectCategory={handleSelectCategory}
        onUChecked={handleUnChecked}
        isChecked={isChecked}
        itemSelected={categorySelected}
      />
      <View style={styles.lessions}>
        <Lessions lessions={filterLession} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containSlide: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessions: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  unChecked: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: Colors.primaryColor,
  },
  btnSilde: {
    marginRight: 10,
  },
  flatlistSlide: {
    marginVertical: 20,
    backgroundColor: Colors.white,
  },
  flatlistLessions: {
    backgroundColor: Colors.white,
  },
  content: {
    flex: 0.6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },

  titleSide: {
    color: Colors.white,
    fontSize: 14,
  },
  button: {
    marginHorizontal: 10,
  },
});
export default ListLession;
