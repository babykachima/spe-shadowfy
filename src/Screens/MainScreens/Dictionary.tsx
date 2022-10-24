import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import WebView from 'react-native-webview';
import { Header } from '../../Common/Components/Header';
import { uriDictinary } from '../../Utils';
import { Colors } from '../../Utils/colors';

const Dictionary: React.FC = () => {
  const navigation = useNavigation();

  return (
    <React.Fragment>
      <Header title="Cambridge Dictionary" goBack={navigation.goBack} />
      <WebView
        source={{ uri: uriDictinary }}
        style={styles.webView}
        reload={() => <ActivityIndicator size="small" color={Colors.primaryColor} />}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    height: '100%',
  },
});
export default Dictionary;
