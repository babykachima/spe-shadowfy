import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { ic_pause, ic_play } from '../../Assets';
import { Colors } from '../../Utils/colors';
import ButtonCustom from './ButtonCustom';
import IconCustom from './IconCustom';

interface IPlaySound {
  pauseTrack: () => void;
  playTrack: () => void;
  handleSlidingComplete: (value: number) => void;
}

const PlaySound: React.FC<IPlaySound> = ({ pauseTrack, playTrack, handleSlidingComplete }) => {
  const { position, duration } = useProgress();
  const playBackState = usePlaybackState();
  return (
    <View style={styles.contain}>
      <View style={styles.contentPlaySound}>
        {playBackState === State.Playing ? (
          <TouchableOpacity onPress={pauseTrack}>
            <IconCustom iconUrl={ic_pause} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playTrack}>
            <IconCustom iconUrl={ic_play} />
          </TouchableOpacity>
        )}
        <View style={styles.slide}>
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
      <ButtonCustom title="0.34x" onPress={() => console.log('34x')} containStyles={styles.button} />
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
    marginHorizontal: 8,
  },
  contentSlide: {
    width: 250,
    height: 40,
  },
  button: {
    width: 65,
  },
});
export default PlaySound;
