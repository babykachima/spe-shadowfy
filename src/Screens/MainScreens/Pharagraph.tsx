import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Header } from '../../Common/Components/Header';
import PlaySound from '../../Common/Components/PlaySound';
import TextCommon from '../../Common/Components/TextCommon';
import { useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';
import { Colors } from '../../Utils/colors';

import Voice from '@react-native-voice/voice';

import { ModalRate } from '../../Common/Components/ModalCustom';
import ShadowComponent from '../../Common/Components/ShadowComponent';
import { IRate } from '../../Types';
import { RootRouteProps, Screens } from '../../Utils/navigationConfig';

import { useTranslation } from 'react-i18next';

TrackPlayer.setupPlayer();

const Pharagraph: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const route = useRoute<RootRouteProps<'Pharagraph'>>();
  const keyLession = route?.params?.key;
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', keyLession);
  const [result, setResult] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [isOpenModalRate, setIsOpenModalRate] = useState<boolean>(false);
  const [itemRate, setItemRate] = useState<string>('1x');
  const isFocused = useIsFocused();

  //Recording
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechStartHandler = (e: any) => {
    console.log('onSpeechStartHandler:', e);
  };
  const onSpeechEndHandler = (e: any) => {
    setLoading(false);
    console.log('onSpeechEndHandler:', e);
  };

  const onSpeechResultsHandler = (e: any) => {
    let text = e.value[0];
    setResult(text);
    console.log('onSpeechResultsHandler:', e);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      const check = await Voice.isAvailable();
      if (check) {
        await Voice.start('en-Us');
      }
    } catch (error) {
      console.log('startRecording error:', error);
    }
  };

  const stopRecording = async () => {
    setLoading(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log('stopRecording error:', error);
    }
  };
  const onHandleTextChange = useCallback((text: string) => {
    setResult(text);
  }, []);
  const onHandleClearTextVoice = useCallback(() => {
    setResult('');
  }, []);

  // Play Track
  const pauseTemporary = useCallback(async () => {
    await TrackPlayer.reset();
  }, []);
  const handleSpeed = useCallback(async () => {
    await TrackPlayer.setRate(1);
  }, []);
  const setupPlayer = useCallback(async () => {
    try {
      if (!lessionsDetail?.audio) {
        return;
      }
      await TrackPlayer.add([
        {
          id: keyLession,
          url: lessionsDetail?.audio || '',
          title: lessionsDetail?.title,
        },
      ]);
    } catch (error) {
      console.log('setupPlayer error:', error);
    }
  }, [keyLession, lessionsDetail?.audio, lessionsDetail?.title]);

  useEffect(() => {
    setupPlayer();
    return () => {
      pauseTemporary();
    };
  }, [pauseTemporary, setupPlayer]);
  //when focus screen will be initial value
  useEffect(() => {
    if (isFocused) {
      setupPlayer();
      handleSpeed();
      setItemRate('1x');
    }
  }, [handleSpeed, isFocused, setupPlayer]);

  const playTrack = useCallback(async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log('playTrack error: ', error);
    }
  }, []);
  const pauseTrack = useCallback(async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.log('pauseTrack error: ', error);
    }
  }, []);

  const handleSlidingComplete = useCallback(async (value: number) => {
    await TrackPlayer.seekTo(value);
  }, []);

  const handleCheckVoiceResult = useCallback(() => {
    navigation.navigate(
      Screens.CheckVoice as never,
      {
        data: {
          result: result,
          content: lessionsDetail?.content,
        },
      } as never
    );
    stopRecording();
    pauseTrack();
  }, [lessionsDetail?.content, navigation, pauseTrack, result]);
  // Modal rate
  const setOpenModalRate = useCallback(() => {
    setIsOpenModalRate(true);
  }, []);
  const setCloseModalRate = useCallback(() => {
    setIsOpenModalRate(false);
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

  return (
    <View style={styles.contain}>
      <Header title={t('screens.Pharagraph')} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <TextCommon title={lessionsDetail?.title || ''} numberOfLines={2} containStyles={styles.title} />
        <PlaySound
          playTrack={playTrack}
          pauseTrack={pauseTrack}
          handleSlidingComplete={handleSlidingComplete}
          openModal={setOpenModalRate}
          rate={itemRate}
        />
        <ScrollView style={styles.contentShadow} showsVerticalScrollIndicator={false}>
          <TextCommon title={lessionsDetail?.content || ''} containStyles={styles.textDes} />
        </ScrollView>
      </View>

      <ShadowComponent
        value={result}
        loading={isLoading}
        startRecording={startRecording}
        stopRecording={stopRecording}
        onTextChange={onHandleTextChange}
        clearTextVoice={onHandleClearTextVoice}
        onCheckVoice={handleCheckVoiceResult}
      />
      <ModalRate visible={isOpenModalRate} onCloseModal={setCloseModalRate} onSelectRateItem={handleSetSpeed} />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 0.6,
    marginHorizontal: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textColor,
    marginBottom: 10,
  },
  contentShadow: {
    marginVertical: 10,
  },
  textDes: {
    fontSize: 16,
    lineHeight: 30,
  },
});
export default Pharagraph;
