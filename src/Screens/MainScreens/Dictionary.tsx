import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import WebView from 'react-native-webview';
import { Header } from '../../Common/Components/Header';
import { useAppDispatch } from '../../Redux/hooks';
import { setLoading } from '../../Redux/Slices/appSlice';
import { uriDictinary } from '../../Utils';

const Dictionary: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onLoadStart = useCallback(() => {
    dispatch(setLoading(true));
  }, [dispatch]);
  const onLoadEnd = useCallback(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header title="Cambridge Dictionary" goBack={navigation.goBack} />
      <WebView source={{ uri: uriDictinary }} style={styles.webView} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} />
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
