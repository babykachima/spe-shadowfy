import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import { Header } from '../../Common/Components/Header';
import TextCommon from '../../Common/Components/TextCommon';
import { Colors } from '../../Utils/colors';

const EditProfile: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const navigation = useNavigation();
  const { t } = useTranslation();

  const user = firebase.auth().currentUser;

  const handleChangeText = useCallback((text: string) => {
    setInput(text);
  }, []);
  const handleSubmit = useCallback(async () => {
    try {
      if (input) {
        const update = {
          displayName: input,
        };
        await user?.updateProfile(update);
        Keyboard.dismiss();
        Snackbar.show({
          text: t('messages.change_name_success'),
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      Snackbar.show({
        text: t('messages.failed'),
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }, [input, t, user]);
  return (
    <SafeAreaView style={styles.contain}>
      <Header title={'Edit Profile'} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <View style={styles.header}>
          <TextCommon title={t('forms.edit_name')} containStyles={styles.title} />
        </View>
        <TextInput
          value={input}
          style={styles.textInput}
          onChangeText={handleChangeText}
          placeholder={t('forms.edit_name')}
        />
        <ButtonCustom
          title={t('forms.submit')}
          onPress={handleSubmit}
          containStyles={styles.btnSubmit}
          disabled={!input}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textColor,
  },
  textInput: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  btnSubmit: {
    marginVertical: 20,
  },
});
export default EditProfile;
