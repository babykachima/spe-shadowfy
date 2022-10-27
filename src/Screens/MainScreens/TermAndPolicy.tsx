import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../Common/Components/Header';
import TextCommon from '../../Common/Components/TextCommon';
import { Colors } from '../../Utils/colors';

const TermAndPolicy: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // Content were not chagne by me, cause of I not map the data return.
  return (
    <SafeAreaView style={styles.contain}>
      <Header title={t('screens.TermAndPolicy')} rightIcon={false} goBack={navigation.goBack} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.lineItem}>
          <TextCommon title={'Terms of Use'} containStyles={styles.question} />
          <TextCommon
            title={
              'By downloading, installing and/or using the SpeShadowfy App (here in after referred to as the “App”), you acknowledge that you have read, understood, accepted and agreed to The following Terms of Use:'
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '1. To use the features of the application you must use a Google account. We integrate account usage with Google, so you do not need to enter gmail information, password. In case you forget your password, we do not support handling if there is a problem in the process of using the app. '
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '2. The app has a dictionary website that we do not control and maintain. We are not responsible for the accuracy or reliability of the information on such websites. The application can remove inappropriate or unavailable websites.'
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '3. The content in the SpeShadowfy app is content compiled and collected from many different sources - helping users learn English. We are not responsible for the content contained in the application.'
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '4. In the application will not contain ads. By downloading and installing app you wont not see any ads in the content of app. If the integrated websites contain advertising information, we are not responsible for these advertisements.'
            }
            containStyles={styles.answer}
          />
        </View>
        <View style={styles.lineItem}>
          <TextCommon title={'Policy and privacy'} containStyles={styles.question} />
          <TextCommon
            title={
              '1.In our application use the user of Google account to log in to use our application. We will not save any user information.'
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '2.Third party websites integrated in the app include: + https://dictionary.cambridge.org/ + https://www.oxfordlearnersdictionaries.com/ + https://translate.google.com/ '
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '3. The login of user information will be saved in device of Storage, user after successful login will not need to log in again. If the user logs out of the app, they will need to sign in again with their Google account'
            }
            containStyles={styles.answer}
          />
          <TextCommon
            title={
              '4. Due to the integration of using Google account login, so users can only change personal information just only "Display name" Other information includes: photo, gmail , phone number phone will cannot be edited in the app.'
            }
            containStyles={styles.answer}
          />
        </View>
        <View style={styles.lineItem}>
          <TextCommon title={'Contact us'} containStyles={styles.question} />
          <TextCommon
            title={'If you have any questions or suggestions. Please contact: nguyenhoangtuan.workvn@gmail.com'}
            containStyles={styles.answer}
          />
          <TextCommon title={'Thank you'} containStyles={styles.answer} />
        </View>
      </ScrollView>
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
  lineItem: {
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: Colors.grayColor,
    fontWeight: '400',
  },
});
export default TermAndPolicy;
