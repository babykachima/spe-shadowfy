import Slider from '@react-native-community/slider';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { Capability, State, usePlaybackState, useProgress } from 'react-native-track-player';
import { Header } from '../../Common/Components/Header';

import { ic_pause, ic_play, ic_translation } from '../../Assets';
import ButtonCustom, { ButtonIconCustom } from '../../Common/Components/ButtonCustom';
import TextCommon from '../../Common/Components/TextCommon';
import { useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';

import { useTranslation } from 'react-i18next';
import IconCustom from '../../Common/Components/IconCustom';
import { PopoverNote } from '../../Common/Components/PopoverCustom';
import { Colors } from '../../Utils/colors';
import { RootRouteProps, Screens } from '../../Utils/navigationConfig';
import ModalCustom, { ModalRate } from '../../Common/Components/ModalCustom';
import { IRate } from '../../Types';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});
TrackPlayer.setupPlayer();

const PracticeShadowing: React.FC = () => {
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const route = useRoute<RootRouteProps<'PracticeShadowing'>>();
  const keyLession = route?.params?.key;
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', keyLession);
  const { position, duration } = useProgress();
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenModalDictionary, setIsOpenModalDictionary] = useState<boolean>(false);
  const [isOpenModalRate, setIsOpenModalRate] = useState<boolean>(false);
  const [textSelected, setTextSelected] = useState<string>('');
  const paragraph = lessionsDetail?.content.split(' ');
  const [itemRate, setItemRate] = useState<string>('1x');

  const { t } = useTranslation();

  const setOpenPopover = useCallback(() => {
    setIsOpenPopover(true);
  }, []);
  const setClosePopover = useCallback(() => {
    setIsOpenPopover(false);
  }, []);
  //  modal dictionary
  const setOpenModalDictionary = useCallback(() => {
    setIsOpenModalDictionary(true);
  }, []);
  const setCloseModalDictionary = useCallback(() => {
    setIsOpenModalDictionary(false);
  }, []);
  // Modal rate
  const setOpenModalRate = useCallback(() => {
    setIsOpenModalRate(true);
  }, []);
  const setCloseModalRate = useCallback(() => {
    setIsOpenModalRate(false);
  }, []);

  const setupPlayer = useCallback(async () => {
    try {
      if (!lessionsDetail?.audio) {
        return;
      }
      await TrackPlayer.add([
        {
          id: lessionsDetail?.key,
          url: lessionsDetail?.audio || '',
          title: lessionsDetail?.title,
        },
      ]);
    } catch (error) {
      console.log('setupPlayer error ->', error);
    }
  }, [lessionsDetail?.audio, lessionsDetail?.title, lessionsDetail?.key]);
  const pauseTemporary = useCallback(async () => {
    await TrackPlayer.reset();
  }, []);

  useEffect(() => {
    setupPlayer();
    return () => {
      pauseTemporary();
    };
  }, [setupPlayer, pauseTemporary]);

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
  const handleSetSpeed = useCallback(
    async (rate: IRate) => {
      if (rate.value) {
        await TrackPlayer.setRate(rate.value);
        setItemRate(rate.rate);
        setCloseModalRate();
      }
    },
    [setCloseModalRate]
  );

  const convertPosition = useMemo(() => {
    return new Date(position * 1000).toISOString().substr(14, 5);
  }, [position]);

  const convertProgressDuration = useMemo(() => {
    return new Date((duration - position) * 1000).toISOString().substr(14, 5);
  }, [duration, position]);

  const navigateTranslations = useCallback(() => {
    if (lessionsDetail?.content) {
      navigation.navigate(Screens.Translations as never, { data: lessionsDetail.content } as never);
    }
  }, [lessionsDetail?.content, navigation]);

  const handleTextInParagraph = useCallback(
    (text: string) => {
      if (text) {
        setTextSelected(text);
        setOpenModalDictionary();
      }
    },
    [setOpenModalDictionary]
  );

  return (
    <View style={styles.contain}>
      <Header
        title={t('screens.PracticeShadowing')}
        goBack={navigation.goBack}
        onPressPopover={setOpenPopover}
        rightIcon={true}
      />
      <ScrollView style={styles.contentDescription}>
        <TextCommon title={lessionsDetail?.title || ''} containStyles={styles.title} numberOfLines={2} />
        <View style={styles.textContent}>
          {paragraph &&
            paragraph.map((text, index) => (
              <TextCommon
                key={index}
                containStyles={styles.textDes}
                onPress={() => handleTextInParagraph(text)}
                title={text}
              />
            ))}
        </View>
        <ButtonIconCustom
          iconUrl={ic_translation}
          title={t('app.translate')}
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
            <ButtonCustom title={itemRate} onPress={setOpenModalRate} containStyles={styles.button} />
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
      <PopoverNote isVisible={isOpenPopover} onRequestClose={setClosePopover} keyLession={keyLession} />
      <ModalCustom isVisible={isOpenModalDictionary} onRequestClose={setCloseModalDictionary} word={textSelected} />
      <ModalRate visible={isOpenModalRate} onCloseModal={setCloseModalRate} onSelectRateItem={handleSetSpeed} />
    </View>
  );
};
const { width } = Dimensions.get('screen');
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
  textContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: width,
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  textDes: {
    marginRight: 5,
    fontSize: 16.5,
    lineHeight: 30,
  },
  contentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
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
  selected: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },
});
export default PracticeShadowing;
