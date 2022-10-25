import { firebase } from '@react-native-firebase/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ic_avatar, ic_chevron_right, ic_edit } from '../../Assets';

import Avatar from '../../Common/Components/Avatar';
import { Header } from '../../Common/Components/Header';
import IconCustom from '../../Common/Components/IconCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

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
  const [image, setImage] = useState<string | null>(user?.photoURL || ic_avatar);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      firebase.auth().currentUser?.reload();
    }
  }, [isFocused]);

  const handleEditName = useCallback(() => {
    navigation.navigate(Screens.EditProfile as never);
  }, [navigation]);
  const handleEditPhone = useCallback(() => {
    Alert.alert(t('messages.hint'), t('messages.can_not_edit_phone'), [{ text: 'OK' }]);
  }, [t]);
  const handleEditEmail = useCallback(() => {
    Alert.alert(t('messages.hint'), t('messages.can_not_edit_email'), [{ text: 'OK' }]);
  }, [t]);

  const handleSelectImage = useCallback(() => {
    const defaultOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: false,
    };
    launchImageLibrary(defaultOptions, (response: ImagePickerResponse) => {
      if (!response.didCancel) {
        const uri = response.assets?.map((asset) => asset.uri);
        const fileSize = response.assets?.map((asset) => asset.fileSize);
        const sideMode = fileSize ?? 0 / 1024 / 1024;
        if (sideMode > 25) {
          Alert.alert(t('messages.hint'), t('messages.verify_img'), [{ text: 'OK' }]);
          return;
        }
        if (uri) {
          user?.updateProfile({ photoURL: uri[0] });
          setImage(uri[0] || ic_avatar);
          Snackbar.show({
            text: t('messages.change_img_success'),
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      }
    });
  }, [t, user]);
  return (
    <SafeAreaView style={styles.contain}>
      <Header title={'Account'} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <TouchableOpacity style={styles.contentAvatar} onPress={handleSelectImage}>
          <Avatar photoURL={image} containStyle={styles.avatar} />
          <View style={styles.editView}>
            <IconCustom iconUrl={ic_edit} size="s" tintColor={Colors.white} containStyles={styles.editIcon} />
          </View>
        </TouchableOpacity>
        <View style={styles.contentInfo}>
          <ItemProfile title={t('profile.name')} value={user?.displayName || ''} onPress={handleEditName} />
          <View style={styles.line} />
          <ItemProfile title={t('profile.phone')} value={user?.phoneNumber || 'no phone'} onPress={handleEditPhone} />
          <View style={styles.line} />
          <ItemProfile title={t('profile.email')} value={user?.email || ''} onPress={handleEditEmail} />
          <View style={styles.line} />
        </View>
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
});
export default InfoUser;
