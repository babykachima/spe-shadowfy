import TrackPlayer, { Event } from 'react-native-track-player';

export const PlaybackService = async function () {
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  } catch (error) {
    console.log('PlaybackService error:', error);
  }

  // ...
};
