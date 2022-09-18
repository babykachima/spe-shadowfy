import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import { useAppDispatch } from '../../Redux/hooks';
import { logOut } from '../../Redux/Slices/appSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();

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

  return (
    <View style={styles.contain}>
      <TouchableOpacity onPress={handleLogOut}>
        <ButtonCustom title="Đăng xuất" />
      </TouchableOpacity>
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
