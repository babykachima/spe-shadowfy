import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import { ic_cancel } from '../../Assets';
import { IRate } from '../../Types';
import { Colors } from '../../Utils/colors';
import IconCustom from './IconCustom';
import TextCommon from './TextCommon';

interface IModalCustom {
  word: string;
  isVisible: boolean;
  onRequestClose: () => void;
}

interface ISlide {
  id: number;
  name: string;
}
enum EDictionary {
  CAMBRIGE = 'Cambrige Dictionary',
  OXFORD = 'Oxford Dictionary',
  EN_VN = 'Anh- Việt',
  GOOGLE_IMAGE = 'Google Image',
  GOOGLE_TRANSLATE = 'Google Translate',
}

const dataDictionary: Array<ISlide> = [
  {
    id: 1,
    name: 'Cambrige',
  },
  {
    id: 2,
    name: 'Oxford',
  },
  {
    id: 3,
    name: 'Anh- Việt',
  },
  {
    id: 4,
    name: 'Google Translate',
  },
  {
    id: 5,
    name: 'Google Image',
  },
];

interface ISlideDictionary {
  setSelected: (item: ISlide) => void;
}

const SlideDictionary: React.FC<ISlideDictionary> = ({ setSelected }) => {
  const handleSelection = useCallback(
    (item: ISlide) => {
      setSelected(item);
    },
    [setSelected]
  );

  const _renderItem = useCallback<ListRenderItem<ISlide>>(
    ({ item }) => {
      return (
        <TouchableOpacity style={styles.line} onPress={() => handleSelection(item)}>
          <View style={styles.lineItem}>
            <TextCommon title={item.name} containStyles={styles.lineText} />
          </View>
        </TouchableOpacity>
      );
    },
    [handleSelection]
  );
  const _keyExtractor = useCallback((item: ISlide) => {
    return `${item.id}`;
  }, []);
  return (
    <View>
      <FlatList
        data={dataDictionary}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatlist}
      />
    </View>
  );
};

const ModalCustom: React.FC<IModalCustom> = ({ isVisible, onRequestClose, word }) => {
  const [itemSelected, setItemSelected] = useState({
    id: 1,
    name: 'Cambrige Dictionary',
  });
  const refWebview = useRef(null);

  const renderURI = useMemo(() => {
    switch (itemSelected.name) {
      case EDictionary.CAMBRIGE: {
        return `https://dictionary.cambridge.org/dictionary/english/${word}`;
      }
      case EDictionary.OXFORD: {
        return `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`;
      }
      case EDictionary.EN_VN: {
        return `https://dictionary.cambridge.org/vi/dictionary/english-vietnamese/${word}`;
      }
      case EDictionary.GOOGLE_TRANSLATE: {
        return `https://translate.google.com/?sl=en&tl=vi&text=${encodeURI(word)}&op=translate`;
      }
      case EDictionary.GOOGLE_IMAGE: {
        return `https://www.google.com/search?q=${word}&hl=EN&tbm=isch&sxsrf=ALiCzsa7Z1DkZ1-tgAf1R9tFhDzU9F9NUA%3A1666337879712&source=hp&biw=1512&bih=778&ei=V0xSY4_GKP3l2roP5tCx8A0&iflsig=AJiK0e8AAAAAY1JaZ-cve1gW0KcoyVUyc5hbYeOONsWY&ved=0ahUKEwjPzZKr6PD6AhX9slYBHWZoDN4Q4dUDCAc&uact=5&oq=hello&gs_lcp=CgNpbWcQAzIECCMQJzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQ6gIQJzoHCAAQgAQQAzoFCAAQsQM6CAgAELEDEIMBOgsIABCABBCxAxCDAVDtBVjOCmDVDGgBcAB4AIABWIgBoAOSAQE1mAEAoAEBqgELZ3dzLXdpei1pbWewAQo&sclient=img`;
      }
      default:
        return '';
    }
  }, [itemSelected.name, word]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onRequestClose} style={styles.header}>
            <IconCustom iconUrl={ic_cancel} tintColor={Colors.primaryColor} size="l" />
          </TouchableOpacity>
          <SlideDictionary setSelected={setItemSelected} />
          <WebView
            ref={refWebview}
            originWhitelist={['*']}
            source={{ uri: renderURI }}
            style={styles.webView}
            reload={() => <ActivityIndicator size="small" color={Colors.primaryColor} />}
          />
        </View>
      </View>
    </Modal>
  );
};

interface IModalPopupRate {
  visible: boolean;
  onCloseModal: () => void;
  onSelectRateItem: (rate: IRate) => void;
}
const listRates: Array<IRate> = [
  {
    id: 1,
    rate: '0.5x',
    value: 0.5,
  },
  {
    id: 2,
    rate: '0.75x',
    value: 0.75,
  },
  {
    id: 3,
    rate: '1x',
    value: 1,
  },
  {
    id: 4,
    rate: '1.5x',
    value: 1.5,
  },
];

export const ModalRate: React.FC<IModalPopupRate> = ({ visible, onCloseModal, onSelectRateItem }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modal}>
        <View style={styles.contentModal}>
          <TouchableOpacity style={styles.headerContentModal} onPress={onCloseModal}>
            <IconCustom iconUrl={ic_cancel} size="l" tintColor={Colors.primaryColor} />
          </TouchableOpacity>
          {listRates.map((rate) => (
            <TouchableOpacity style={styles.listRates} key={rate.id} onPress={() => onSelectRateItem(rate)}>
              <TextCommon title={rate.rate} containStyles={styles.titleRate} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.bgModalColor,
    height: height - 100,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  flatlist: {
    height: 45,
  },
  line: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: Colors.primaryColor,
  },
  lineItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineText: {
    marginHorizontal: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  webView: {
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  // Modal Rate
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  contentModal: {
    width: '60%',
    height: 230,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  headerContentModal: {
    margin: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 10,
    tintColor: 'red',
  },
  listRates: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRate: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ModalCustom;
