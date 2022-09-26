import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TouchableOpacity, View, Button } from 'react-native';
import Snackbar from 'react-native-snackbar';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import { useAppDispatch } from '../../Redux/hooks';
import { logOut } from '../../Redux/Slices/appSlice';

const UserProfile: React.FC = () => {
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
      <TouchableOpacity onPress={handleLogOut}>
        <ButtonCustom title={t('app.logout')} />
      </TouchableOpacity>
      <Button title="Change language" color="#841584" onPress={onChangeLanguage} />
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'pink',
    borderRadius: 10,
  },
});
export default UserProfile;
