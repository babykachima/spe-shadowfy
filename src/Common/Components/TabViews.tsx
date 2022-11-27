import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import WebView from 'react-native-webview';
import { Colors } from '../../Utils/colors';

interface ITabView {
  word: string;
}
interface IRoute {
  key: string;
  title: string;
}

enum EKeyRoute {
  OXFORD = 'oxford',
  CAMBRIDGE = 'cambridge',
  IMAGES = 'images',
  TRANSLATE = 'translate',
}

const OxfordRoute: React.FC<ITabView> = ({ word }) => {
  return (
    <WebView
      originWhitelist={['*']}
      style={styles.webView}
      startInLoadingState={true}
      source={{ uri: `https://www.oxfordlearnersdictionaries.com/definition/english/${word}` }}
    />
  );
};

const CambridgeRoute: React.FC<ITabView> = ({ word }) => {
  return (
    <WebView
      originWhitelist={['*']}
      style={styles.webView}
      onAnimatedValueUpdate={true}
      startInLoadingState={true}
      source={{ uri: `https://dictionary.cambridge.org/dictionary/english/${word}` }}
    />
  );
};
const ImagesRoute: React.FC<ITabView> = ({ word }) => {
  return (
    <WebView
      originWhitelist={['*']}
      style={styles.webView}
      startInLoadingState={true}
      source={{
        uri: `https://www.google.com/search?q=${word}&hl=EN&tbm=isch&sxsrf=ALiCzsa7Z1DkZ1-tgAf1R9tFhDzU9F9NUA%3A1666337879712&source=hp&biw=1512&bih=778&ei=V0xSY4_GKP3l2roP5tCx8A0&iflsig=AJiK0e8AAAAAY1JaZ-cve1gW0KcoyVUyc5hbYeOONsWY&ved=0ahUKEwjPzZKr6PD6AhX9slYBHWZoDN4Q4dUDCAc&uact=5&oq=hello&gs_lcp=CgNpbWcQAzIECCMQJzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQ6gIQJzoHCAAQgAQQAzoFCAAQsQM6CAgAELEDEIMBOgsIABCABBCxAxCDAVDtBVjOCmDVDGgBcAB4AIABWIgBoAOSAQE1mAEAoAEBqgELZ3dzLXdpei1pbWewAQo&sclient=img`,
      }}
    />
  );
};

const TranslateRoute: React.FC<ITabView> = ({ word }) => {
  return (
    <WebView
      originWhitelist={['*']}
      style={styles.webView}
      startInLoadingState={true}
      source={{ uri: `https://translate.google.com/?sl=en&tl=vi&text=${encodeURI(word)}&op=translate` }}
    />
  );
};

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    labelStyle={styles.labelStyle}
    indicatorStyle={styles.indicatorStyle}
    style={{ backgroundColor: Colors.primaryColor }}
  />
);

const TabViews: React.FC<ITabView> = ({ word }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState<number>(0);

  const [routes] = React.useState([
    { key: 'oxford', title: 'Oxford' },
    { key: 'cambridge', title: 'Cambridge' },
    { key: 'images', title: 'Images' },
    { key: 'translate', title: 'Translate' },
  ]);
  const renderScene = ({ route }: { route: IRoute }) => {
    switch (route.key) {
      case EKeyRoute.OXFORD:
        return <OxfordRoute word={word} />;
      case EKeyRoute.CAMBRIDGE:
        return <CambridgeRoute word={word} />;
      case EKeyRoute.IMAGES:
        return <ImagesRoute word={word} />;
      case EKeyRoute.TRANSLATE:
        return <TranslateRoute word={word} />;
      default:
        return null;
    }
  };
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  indicatorStyle: {
    backgroundColor: Colors.white,
  },
  webView: {
    width: '100%',
    height: '100%',
  },
});

export default TabViews;
