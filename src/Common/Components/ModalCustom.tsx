import React from 'react';
import { Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ic_cancel, ic_uk, ic_vietnam } from '../../Assets';
import { ILanguage, IRate } from '../../Types';
import { Colors } from '../../Utils/colors';
import IconCustom from './IconCustom';
import TabViews from './TabViews';
import TextCommon from './TextCommon';

interface IModalCustom {
  word: string;
  isVisible: boolean;
  onRequestClose: () => void;
}

const ModalCustom: React.FC<IModalCustom> = ({ isVisible, onRequestClose, word }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onRequestClose} style={styles.header}>
            <IconCustom iconUrl={ic_cancel} tintColor={Colors.primaryColor} size="l" />
          </TouchableOpacity>
          <TabViews word={word} />
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
      <Pressable style={styles.modal} onPress={onCloseModal}>
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
      </Pressable>
    </Modal>
  );
};

interface IModalLanguages {
  visible: boolean;
  onCloseModal: () => void;
  onChangeLanguage: (value: string) => void;
}

const listLanguage: ILanguage[] = [
  {
    id: 1,
    name: 'Tiếng Việt',
    value: 'vi',
    icon: ic_vietnam,
  },
  {
    id: 2,
    name: 'English',
    value: 'en',
    icon: ic_uk,
  },
];
export const ModalLanguages: React.FC<IModalLanguages> = ({ visible, onCloseModal, onChangeLanguage }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <Pressable style={styles.centeredView} onPress={onCloseModal}>
        <View style={styles.contentModalLanguage}>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={onCloseModal}>
              <IconCustom iconUrl={ic_cancel} size="l" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.languages}>
            {listLanguage.map((language) => (
              <React.Fragment key={language.id}>
                <TouchableOpacity style={styles.modalItem} onPress={() => onChangeLanguage(String(language.value))}>
                  <Image source={language.icon} style={styles.iconFlat} />
                  <TextCommon title={language.name} containStyles={styles.nameContry} />
                </TouchableOpacity>
                <View style={styles.diveItem} />
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      </Pressable>
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
  //modal language
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  contentModalLanguage: {
    borderRadius: 20,
    width: 300,
    height: 200,
    backgroundColor: Colors.white,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
  },
  languages: {
    padding: 10,
    marginLeft: 30,
  },
  iconFlat: {
    width: 50,
    height: 50,
  },
  nameContry: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  diveItem: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
  },
});

export default ModalCustom;
