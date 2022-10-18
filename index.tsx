import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import App from './src/Navigation/AppNavigation';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import ErrorBoundary from 'react-native-error-boundary';
import { PlaybackService } from './src/Services';
import { store } from './src/Redux/store';
import './src/Translations/index';

const Application = () => {
  const handleErrors = (error: Error, stackTrace: string) => {
    console.log('ErrorBoundary:', error, stackTrace);
  };
  return (
    <Provider store={store}>
      <ErrorBoundary onError={handleErrors}>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Application);
TrackPlayer.registerPlaybackService(() => PlaybackService);
