import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from '../../Common/Components/Header';
import { WebView } from 'react-native-webview';
import { GOOGLE_TRANSLATION } from '../../Utils';

const Translations: React.FC = () => {
  const navigation = useNavigation();

  const javascript = `(function() {
    window.ReactNativeWebView.postMessage(document.getElementsByClassName('#er8xn').value = 'hello');
})();`;
  return (
    <React.Fragment>
      <Header title="Translation" goBack={navigation.goBack} />
      <WebView
        source={{ uri: GOOGLE_TRANSLATION }}
        injectedJavaScriptBeforeContentLoaded={javascript}
        onMessage={(event) => console.log('Event =>', event.nativeEvent.data)}
        style={styles.webView}
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

export default Translations;
