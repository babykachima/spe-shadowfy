import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TouchableOpacity, View, Button } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Avatar from '../../Common/Components/Avatar';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { useAppDispatch } from '../../Redux/hooks';
import { logOut } from '../../Redux/Slices/appSlice';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const handleLogOut = useCallback(() => {
    const signOut = async () => {
      try {
        dispatch(logOut());
        await auth().signOut();
        Snackbar.show({
          text: 'Logout success!',
          duration: Snackbar.LENGTH_LONG,
        });
      } catch (error) {
        console.log('handleLogOut error:', error);
      }
    };

    Alert.alert('SignOut', 'You are make sure logout!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: signOut },
    ]);
  }, [dispatch]);

  const onChangeLanguage = () => {
    console.log('Change language English');
    i18n.changeLanguage('en');
  };

  return (
    <View style={styles.contain}>
      <View style={styles.header}>
        <Avatar />
        <View>
          <TextCommon title="Tuan Nguyen" />
          <TextCommon title="09872832372" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'pink',
    borderRadius: 10,
  },
});
export default Settings;
