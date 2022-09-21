import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Snackbar from 'react-native-snackbar';
import TrackPlayer, { Capability, usePlaybackState, useProgress, State } from 'react-native-track-player';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Header } from '../../Common/Components/Header';

import { useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';
import { ic_pause, ic_play } from '../../Assets';
import TextCommon from '../../Common/Components/TextCommon';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const PracticeShadowing: React.FC = () => {
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');
  const { position, duration, buffered } = useProgress();

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        if (!lessionsDetail?.audio) {
          return;
        }
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add([
          {
            id: 'nsTbaEpUysbeU7IeGG5m',
            url: lessionsDetail?.audio || '',
            title: lessionsDetail?.title,
          },
        ]);
      } catch (error) {
        Snackbar.show({
          text: `${error}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    };
    setupPlayer();
    return () => {
      console.log('clean up setup');
      setupPlayer();
    };
  }, [lessionsDetail?.audio, lessionsDetail?.title]);

  const playTrack = useCallback(async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log('error play: ', error);
    }
  }, []);
  const pauseTrack = useCallback(async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.log('error pause: ', error);
    }
  }, []);
  const handleSlidingComplete = useCallback(async (value: number) => {
    await TrackPlayer.seekTo(value);
  }, []);

  const convertPosition = useMemo(() => {
    return new Date(position * 1000).toISOString().substr(14, 5);
  }, [position]);

  const convertProgressDuration = useMemo(() => {
    return new Date((duration - position) * 1000).toISOString().substr(14, 5);
  }, [duration, position]);

  return (
    <View style={styles.contain}>
      <Header title="Practice" goBack={navigation.goBack} />
      <ScrollView style={styles.contentDescription}>
        <TextCommon title={lessionsDetail?.title || ''} containStyles={styles.title} numberOfLines={2} />
        <TextCommon title={lessionsDetail?.description || ''} containStyles={styles.textDes} />
      </ScrollView>
      <View style={styles.playMusic}>
        <View style={styles.slide}>
          <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            onSlidingComplete={(value) => handleSlidingComplete(value)}
          />
          <View style={styles.progressContent}>
            <TextCommon title={convertPosition} containStyles={styles.position} />
            <TextCommon title={convertProgressDuration} containStyles={styles.duration} />
          </View>
          <View style={styles.contentButton}>
            <View>
              <TextCommon title="0.25x" />
            </View>
            <View>
              {playBackState === State.Playing ? (
                <TouchableOpacity onPress={pauseTrack}>
                  <Image source={ic_pause} style={styles.button} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={playTrack}>
                  <Image source={ic_play} style={styles.button} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity>
              <Image source={ic_play} style={styles.button} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  playMusic: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#DCE0ED',
  },
  slide: {
    paddingHorizontal: 20,
  },
  contentDescription: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  textDes: {
    fontSize: 16,
    lineHeight: 30,
  },
  contentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  position: {
    fontSize: 16,
    fontWeight: '500',
  },
  duration: {
    fontSize: 16,
    fontWeight: '500',
  },
});
export default PracticeShadowing;
