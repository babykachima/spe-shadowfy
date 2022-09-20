import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability } from 'react-native-track-player';
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
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const navigation = useNavigation();
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');
  console.log('lessionsDetail?.audio ==>', lessionsDetail?.audio);
  const setupPlayer = useCallback(async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([
        {
          id: 'nsTbaEpUysbeU7IeGG5m',
          url: 'https://firebasestorage.googleapis.com/v0/b/spe-shadowfy.appspot.com/o/news%2FPrague%20protests%2FPrague%20Protests%20%E2%80%93%20Level%201.mp3?alt=media&token=f4c4a024-ad8a-4d6c-9980-002a82aaf093',
          title: lessionsDetail?.title,
        },
      ]);
    } catch (error) {
      console.log('eerr ==>', error);
    }
  }, [lessionsDetail?.title]);

  useEffect(() => {
    setupPlayer();
    return () => {
      setupPlayer();
    };
  }, [setupPlayer]);

  const playTrack = useCallback(async () => {
    try {
      await TrackPlayer.play();
      setIsPlay(true);
    } catch (error) {
      console.log('error play: ', error);
    }
  }, []);
  const pauseTrack = useCallback(async () => {
    try {
      await TrackPlayer.pause();
      setIsPlay(false);
    } catch (error) {
      console.log('error pause: ', error);
    }
  }, []);
  //

  return (
    <View style={styles.contain}>
      <Header title="Practice" goBack={navigation.goBack} />
      <ScrollView style={styles.contentDescription}>
        <TextCommon title={lessionsDetail?.title || ''} containStyles={styles.title} numberOfLines={2} />
        <TextCommon title={lessionsDetail?.description || ''} containStyles={styles.textDes} />
      </ScrollView>
      <View style={styles.playMusic}>
        <View style={styles.slide}>
          <Slider />
          <View style={styles.contentButton}>
            <View>
              <TextCommon title="0.25x" />
            </View>
            <View>
              {isPlay ? (
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
  },
  playMusic: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#c3c3c3',
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
});
export default PracticeShadowing;
