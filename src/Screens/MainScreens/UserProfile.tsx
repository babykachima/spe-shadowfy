import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/Slices/appSlice';
import { EStorage } from '../../Types';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogOut = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('handleLogOut error:', error);
    } finally {
      dispatch(logOut());
    }
  }, [dispatch]);

  return (
    <View style={styles.contain}>
      <Button title={t('Dang xuat')} onPress={handleLogOut} />
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
