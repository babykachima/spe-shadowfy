import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { ic_faq, ic_paper, ic_person, ic_translation } from '../../Assets';
import { Header } from '../../Common/Components/Header';

import IconCustom from '../../Common/Components/IconCustom';
import { ModalLanguages } from '../../Common/Components/ModalCustom';
import TextCommon from '../../Common/Components/TextCommon';

import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSetOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const onSetCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

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

  return (
    <View style={styles.contain}>
      <Header title={t('screens.Settings')} goBack={navigation.goBack} />
      <View style={styles.subContent}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.item} onPress={navigateInfoUser}>
            <IconCustom iconUrl={ic_person} size="l" />
            <TextCommon title={t('app.manager_account')} containStyles={styles.textItem} />
          </TouchableOpacity>
          <View style={styles.diveItem} />
          <TouchableOpacity style={styles.item} onPress={onSetOpenModal}>
            <IconCustom iconUrl={ic_translation} size="l" />
            <TextCommon title={t('app.display_language')} containStyles={styles.textItem} />
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
      </View>
      <ModalLanguages visible={openModal} onCloseModal={onSetCloseModal} onChangeLanguage={handleChangeLanguages} />
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContent: {
    marginVertical: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: 20,
    width: '90%',
    height: 265,
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
  avatar: {
    width: 88,
    height: 88,
  },
});
export default Settings;
