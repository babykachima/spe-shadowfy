import Slider from '@react-native-community/slider';
import React, { useMemo } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { ic_pause, ic_play } from '../../Assets';
import { Colors } from '../../Utils/colors';
import ButtonCustom from './ButtonCustom';
import IconCustom from './IconCustom';

interface IPlaySound {
  rate: string;
  pauseTrack: () => void;
  playTrack: () => void;
  handleSlidingComplete: (value: number) => void;
  openModal: () => void;
}

const PlaySound: React.FC<IPlaySound> = ({ rate, pauseTrack, playTrack, handleSlidingComplete, openModal }) => {
  const { position, duration } = useProgress();
  const playBackState = usePlaybackState();

  const styleSlice = useMemo(() => {
    return Platform.OS !== 'android' ? styles.slide : undefined;
  }, []);
  const renderPauseBtn = useMemo(() => {
    return playBackState === State.Playing ? (
      <TouchableOpacity onPress={pauseTrack}>
        <IconCustom iconUrl={ic_pause} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={playTrack}>
        <IconCustom iconUrl={ic_play} />
      </TouchableOpacity>
    );
  }, [pauseTrack, playBackState, playTrack]);

  return (
    <View style={styles.contain}>
      <View style={styles.contentPlaySound}>
        {renderPauseBtn}
        <View style={styleSlice}>
          <Slider
            style={styles.contentSlide}
            value={position}
            minimumValue={0}
            maximumValue={duration}
            maximumTrackTintColor={Colors.primaryColorLayout}
            minimumTrackTintColor={Colors.primaryColor}
            onSlidingComplete={(value) => handleSlidingComplete(value)}
          />
        </View>
      </View>
      <ButtonCustom title={rate} onPress={openModal} containStyles={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    backgroundColor: Colors.cardColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 5,
  },
  contentPlaySound: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slide: {
    marginHorizontal: 5,
  },
  contentSlide: {
    width: 240,
    height: 40,
  },
  button: {
    flexShrink: 1,
  },
});
export default PlaySound;
