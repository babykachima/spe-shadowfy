import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState, useProgress } from 'react-native-track-player';
import { Header } from '../../Common/Components/Header';

import { ic_pause, ic_play, ic_translation } from '../../Assets';
import ButtonCustom, { ButtonIconCustom } from '../../Common/Components/ButtonCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';

import IconCustom from '../../Common/Components/IconCustom';
import { PopoverNote } from '../../Common/Components/PopoverCustom';
import { Colors } from '../../Utils/colors';
import { Screens } from '../../Utils/navigationConfig';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const PracticeShadowing: React.FC = () => {
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');
  const { position, duration } = useProgress();
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const setOpenPopover = useCallback(() => {
    setIsOpenPopover(true);
  }, []);
  const setClosePopover = useCallback(() => {
    setIsOpenPopover(false);
  }, []);

  const setupPlayer = useCallback(async () => {
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
      console.log('setupPlayer error ->', error);
    }
  }, [lessionsDetail?.audio, lessionsDetail?.title]);

  useEffect(() => {
    setupPlayer();
    return () => {
      setupPlayer();
    };
  }, [setupPlayer]);

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
  const handleResetTrack = useCallback(async () => {
    await TrackPlayer.seekTo(0);
  }, []);
  const handleSetSpeed = useCallback(async () => {
    await TrackPlayer.setRate(1);
  }, []);

  const convertPosition = useMemo(() => {
    return new Date(position * 1000).toISOString().substr(14, 5);
  }, [position]);

  const convertProgressDuration = useMemo(() => {
    return new Date((duration - position) * 1000).toISOString().substr(14, 5);
  }, [duration, position]);

  const navigateTranslations = useCallback(() => {
    if (lessionsDetail?.description) {
      navigation.navigate(Screens.Translations as never, { data: lessionsDetail.description } as never);
    }
  }, [lessionsDetail?.description, navigation]);
  return (
    <View style={styles.contain}>
      <Header title="Practice Shadowing" goBack={navigation.goBack} onPressPopover={setOpenPopover} rightIcon={true} />
      <ScrollView style={styles.contentDescription}>
        <TextCommon title={lessionsDetail?.title || ''} containStyles={styles.title} numberOfLines={2} />
        <TextCommon title={lessionsDetail?.description || ''} containStyles={styles.textDes} />
        <ButtonIconCustom
          iconUrl={ic_translation}
          title={'Translate'}
          tintColor={Colors.white}
          onPress={navigateTranslations}
          containStyles={styles.buttonIcon}
        />
      </ScrollView>
      <View style={styles.playMusic}>
        <View style={styles.slide}>
          <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            maximumTrackTintColor={Colors.primaryColorLayout}
            minimumTrackTintColor={Colors.primaryColor}
            onSlidingComplete={(value) => handleSlidingComplete(value)}
          />
          <View style={styles.progressContent}>
            <TextCommon title={convertPosition} containStyles={styles.position} />
            <TextCommon title={convertProgressDuration} containStyles={styles.duration} />
          </View>
          <View style={styles.contentButton}>
            <ButtonCustom title={'1x'} onPress={handleSetSpeed} containStyles={styles.button} />
            <View>
              {playBackState === State.Playing ? (
                <TouchableOpacity onPress={pauseTrack}>
                  <IconCustom iconUrl={ic_pause} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={playTrack}>
                  <IconCustom iconUrl={ic_play} />
                </TouchableOpacity>
              )}
            </View>
            <ButtonCustom title="Reset" onPress={handleResetTrack} containStyles={styles.button} />
          </View>
        </View>
      </View>
      {/* Modal */}
      <PopoverNote isVisible={isOpenPopover} onRequestClose={setClosePopover} />
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  playMusic: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.bgModalColor,
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
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
  },
  buttonIcon: {
    borderRadius: 10,
    marginVertical: 20,
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
  // Modal
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  contentModal: {
    width: '60%',
    height: 230,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  headerContentModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 10,
    tintColor: 'red',
  },
  listRates: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRate: {
    fontWeight: '600',
  },
});
export default PracticeShadowing;
