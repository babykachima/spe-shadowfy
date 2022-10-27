import auth, { firebase } from '@react-native-firebase/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { ic_avatar, ic_chevron_right } from '../../Assets';

import Avatar from '../../Common/Components/Avatar';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import { Header } from '../../Common/Components/Header';
import IconCustom from '../../Common/Components/IconCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { useAppDispatch } from '../../Redux/hooks';
import { logOut } from '../../Redux/Slices/appSlice';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

interface IItemProfile {
  title: string;
  value: string;
  onPress?: () => void;
}
const ItemProfile: React.FC<IItemProfile> = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.infoItem} onPress={onPress}>
      <TextCommon title={title} containStyles={styles.title} numberOfLines={1} />
      <View style={styles.contentValue}>
        <TextCommon title={value} containStyles={styles.value} numberOfLines={1} />
        <IconCustom iconUrl={ic_chevron_right} containStyles={styles.icon} tintColor={Colors.textColor} />
      </View>
    </TouchableOpacity>
  );
};

const InfoUser: React.FC = () => {
  const navigation = useNavigation();
  const user = firebase.auth().currentUser;
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  console.log('user ==>', user);

  useEffect(() => {
    if (isFocused) {
      firebase.auth().currentUser?.reload();
    }
  }, [isFocused]);

  const handleEditName = useCallback(() => {
    navigation.navigate(Screens.EditProfile as never);
  }, [navigation]);
  const handleEditEmail = useCallback(() => {
    Alert.alert(t('messages.hint'), t('messages.can_not_edit_email'), [{ text: 'OK' }]);
  }, [t]);
  const handleLogOut = useCallback(() => {
    const signOut = async () => {
      try {
        dispatch(logOut());
        await auth().signOut();
        Snackbar.show({
          text: t('messages.logout_success'),
          duration: Snackbar.LENGTH_LONG,
        });
        navigation.navigate(Screens.Welcome as never);
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
  }, [dispatch, navigation, t]);

  return (
    <SafeAreaView style={styles.contain}>
      <Header title={t('screens.Account')} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <View style={styles.contentAvatar}>
          <Avatar photoURL={user?.photoURL || ic_avatar} containStyle={styles.avatar} />
        </View>
        <View style={styles.contentInfo}>
          <ItemProfile title={t('profile.name')} value={user?.displayName || ''} onPress={handleEditName} />
          <View style={styles.line} />
          <ItemProfile title={t('profile.email')} value={user?.email || ''} onPress={handleEditEmail} />
          <View style={styles.line} />
        </View>
      </View>
      <View style={styles.btnContent}>
        <ButtonCustom title={t('app.logout')} onPress={handleLogOut} />
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
    paddingHorizontal: 20,
  },
  contentAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  contentInfo: {},
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  contentValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textColor,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.grayColor,
    maxWidth: 250,
  },
  icon: {
    width: 6.17,
    height: 10,
    marginLeft: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.borderColor,
  },
  avatar: {
    width: 88,
    height: 88,
  },
  editView: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: Colors.textColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 150,
    bottom: 0,
  },
  editIcon: {
    width: 12,
    height: 12,
  },
  btnContent: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default InfoUser;
