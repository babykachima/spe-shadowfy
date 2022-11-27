import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from '../../Common/Components/Header';
import { WebView } from 'react-native-webview';
import { RootRouteProps } from '../../Utils/navigationConfig';
import Loading from '../../Common/Components/Loading';

const Translations: React.FC = () => {
  const route = useRoute<RootRouteProps<'Translations'>>();
  const data = route?.params?.data;
  const navigation = useNavigation();
  const endCodeURL = useMemo(() => {
    if (data) {
      return encodeURI(data);
    }
    return;
  }, [data]);

  return (
    <React.Fragment>
      <Header title="Translation" goBack={navigation.goBack} />
      <WebView
        originWhitelist={['*']}
        startInLoadingState={true}
        source={{ uri: `https://translate.google.com/?sl=en&tl=vi&text=${endCodeURL}&op=translate` }}
        style={styles.webView}
        renderLoading={() => <Loading />}
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
