import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/Navigation/AppNavigation';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import ErrorBoundary from 'react-native-error-boundary';
import { PlaybackService } from './src/Services';

const Application = () => {
  const handleErrors = (error: Error, stackTrace: string) => {
    console.log('ErrorBoundary:', error, stackTrace);
  };
  return (
    <ErrorBoundary onError={handleErrors}>
      <App />
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent(appName, () => Application);
TrackPlayer.registerPlaybackService(() => PlaybackService);
