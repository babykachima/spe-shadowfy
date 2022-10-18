import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { ic_cancel, ic_faq, ic_paper, ic_person, ic_question, ic_translation, ic_uk, ic_vietnam } from '../../Assets';
import Avatar from '../../Common/Components/Avatar';
import ButtonCustom from '../../Common/Components/ButtonCustom';

import IconCustom from '../../Common/Components/IconCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { useAppDispatch } from '../../Redux/hooks';

import { logOut } from '../../Redux/Slices/appSlice';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

interface IModalLanguages {
  visible: boolean;
  onCloseModal: () => void;
  onChangeLanguage: (value: string | number) => void;
}
interface ILanguage {
  id: number;
  name: string;
  value: string | number;
  icon: number;
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
const ModalLanguages: React.FC<IModalLanguages> = ({ visible, onCloseModal, onChangeLanguage }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.contentModal}>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={onCloseModal}>
              <IconCustom iconUrl={ic_cancel} size="l" tintColor={Colors.warningColor} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.languages}>
            {listLanguage.map((language) => (
              <TouchableOpacity
                style={styles.modalItem}
                key={language.id}
                onPress={() => onChangeLanguage(language.value)}
              >
                <Image source={language.icon} style={styles.iconFlat} />
                <TextCommon title={language.name} containStyles={styles.nameContry} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user: FirebaseAuthTypes.User | null = firebase.auth().currentUser;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSetOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const onSetCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleLogOut = useCallback(() => {
    const signOut = async () => {
      try {
        dispatch(logOut());
        await auth().signOut();
        Snackbar.show({
          text: t('messages.logout_success'),
          duration: Snackbar.LENGTH_LONG,
        });
      } catch (error) {
        Snackbar.show({
          text: t('messages.failed'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    };
    Alert.alert(t('app.signout'), t('messages.confirm_logout'), [
      {
        text: t('forms.cancel'),
        style: 'cancel',
      },
      { text: t('forms.oke'), onPress: signOut },
    ]);
  }, [dispatch, t]);

  const handleChangeLanguages = useCallback(
    (value: string | number) => {
      if (!value) {
        Snackbar.show({
          text: t('messages.failed'),
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      i18n.changeLanguage(String(value));
      setOpenModal(false);
      Snackbar.show({
        text: t('messages.change_language_success'),
        duration: Snackbar.LENGTH_SHORT,
      });
    },
    [i18n, t]
  );

  const navigateFAQ = useCallback(() => {
    navigation.navigate(Screens.FAQ as never);
  }, [navigation]);
  const navigateTermPolicy = useCallback(() => {
    navigation.navigate(Screens.TermAndPolicy as never);
  }, [navigation]);
  const navigateInfoUser = useCallback(() => {
    navigation.navigate(Screens.InfoUser as never);
  }, [navigation]);
  const navigateAboutApp = useCallback(() => {
    navigation.navigate(Screens.AboutApp as never);
  }, [navigation]);

  return (
    <View style={styles.contain}>
      <View style={styles.subContent}>
        <View style={styles.header}>
          <Avatar photoURL={user?.photoURL || null} />
          <View>
            <TextCommon title={user?.displayName || null} numberOfLines={1} containStyles={styles.textName} />
            <TextCommon title={user?.phoneNumber || null} numberOfLines={1} containStyles={styles.textPhoneNumber} />
          </View>
        </View>
        <View style={styles.dive} />
        <View style={styles.content}>
          <TouchableOpacity style={styles.item} onPress={navigateInfoUser}>
            <IconCustom iconUrl={ic_person} size="l" />
            <TextCommon title={t('app.manager_account')} containStyles={styles.textItem} />
          </TouchableOpacity>
          <View style={styles.diveItem} />
          <TouchableOpacity style={styles.item} onPress={navigateAboutApp}>
            <IconCustom iconUrl={ic_question} size="l" />
            <TextCommon title={t('app.about_app')} containStyles={styles.textItem} />
          </TouchableOpacity>
          <View style={styles.diveItem} />
          <TouchableOpacity style={styles.item} onPress={onSetOpenModal}>
            <IconCustom iconUrl={ic_translation} size="l" />
            <TextCommon title={t('app.change_language')} containStyles={styles.textItem} />
          </TouchableOpacity>
          <View style={styles.diveItem} />
          <TouchableOpacity style={styles.item} onPress={navigateFAQ}>
            <IconCustom iconUrl={ic_faq} size="l" />
            <TextCommon title={t('app.faq')} containStyles={styles.textItem} />
          </TouchableOpacity>
          <View style={styles.diveItem} />
          <TouchableOpacity style={styles.item} onPress={navigateTermPolicy}>
            <IconCustom iconUrl={ic_paper} size="l" />
            <TextCommon title={t('app.term_and_policy')} containStyles={styles.textItem} />
          </TouchableOpacity>
        </View>
        <ButtonCustom title={t('app.logout')} onPress={handleLogOut} />
      </View>
      <ModalLanguages visible={openModal} onCloseModal={onSetCloseModal} onChangeLanguage={handleChangeLanguages} />
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContent: {
    marginVertical: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: 20,
    width: '90%',
    height: 320,
    borderRadius: 10,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'pink',
    borderRadius: 10,
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  textPhoneNumber: {
    fontSize: 16,
    textAlign: 'center',
  },
  dive: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
    marginTop: 10,
  },
  diveItem: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
  },
  textItem: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  iconItem: {
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentModal: {
    borderRadius: 20,
    width: 300,
    height: 300,
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
});
export default Settings;
