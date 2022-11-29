import { useNavigation } from '@react-navigation/native';
import i18n from 'i18next';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Popover, { Rect } from 'react-native-popover-view';
import { ic_guide_book, ic_talking, ic_vocab } from '../../Assets';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';
import IconCustom from './IconCustom';
import TextCommon from './TextCommon';

interface IPopoverNote {
  isVisible: boolean;
  keyLession: string;
  onRequestClose: () => void;
}

type TListsNode = {
  id: number;
  name: string;
  key: string;
  icon: number;
};
enum ENodeItem {
  DICTIONARY = 'Dictionary',
  GUIDE_LINE = 'Guide line',
  PRACTICES = 'Practices',
}
const DataChooseNote: Array<TListsNode> = [
  {
    id: 1,
    name: i18n.t('popover.dictionary'),
    key: 'Dictionary',
    icon: ic_vocab,
  },
  {
    id: 2,
    name: i18n.t('popover.guide_line'),
    key: 'Guide line',
    icon: ic_guide_book,
  },
  {
    id: 3,
    name: i18n.t('popover.pharagraph'),
    key: 'Practices',
    icon: ic_talking,
  },
];

export const PopoverNote: React.FC<IPopoverNote> = ({ isVisible, onRequestClose, keyLession }) => {
  const navigation = useNavigation();
  const onHandlePopover = (item: TListsNode) => {
    switch (item.key) {
      case ENodeItem.DICTIONARY: {
        navigation.navigate(Screens.Dictionary as never);
        onRequestClose();
        return;
      }
      case ENodeItem.GUIDE_LINE: {
        navigation.navigate(Screens.GuideLine as never);
        onRequestClose();
        return;
      }
      case ENodeItem.PRACTICES: {
        navigation.navigate(Screens.Pharagraph as never, { key: keyLession } as never);
        onRequestClose();
        return;
      }
      default:
        return;
    }
  };

  return (
    <Popover
      isVisible={isVisible}
      onRequestClose={onRequestClose}
      backgroundStyle={styles.backgroundStyle}
      from={Platform.OS === 'android' ? new Rect(500, 8, 20, 40) : new Rect(500, 35, 20, 40)}
    >
      <View style={styles.contain}>
        {DataChooseNote.map((item) => (
          <TouchableOpacity style={styles.item} key={item.id} onPress={() => onHandlePopover(item)}>
            <IconCustom iconUrl={item.icon} size="m" />
            <TextCommon title={item.name} containStyles={styles.title} />
          </TouchableOpacity>
        ))}
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: 180,
    height: 150,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  backgroundStyle: {
    opacity: 0.2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.textColor,
  },
});
