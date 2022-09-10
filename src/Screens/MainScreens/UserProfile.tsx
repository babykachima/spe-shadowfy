import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/Slices/appSlice';
import { EStorage } from '../../Types';
import { storage } from '../../Utils/storage';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogOut = useCallback(async () => {
    try {
      await auth().signOut();
      storage.set(EStorage.TOKEN, '');
    } catch (error) {
      console.log('handleLogOut error:', error);
    } finally {
      dispatch(logOut());
    }
  }, [dispatch]);

  return (
    <View style={styles.contain}>
      <Button title="Logout" onPress={handleLogOut} />
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
