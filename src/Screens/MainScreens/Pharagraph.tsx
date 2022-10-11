import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Header } from '../../Common/Components/Header';
import PlaySound from '../../Common/Components/PlaySound';
import TextCommon from '../../Common/Components/TextCommon';
import { useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';
import { Colors } from '../../Utils/colors';

import Voice from '@react-native-voice/voice';

import ShadowComponent from '../../Common/Components/ShadowComponent';
import { Screens } from '../../Utils/navigationConfig';

const Pharagraph: React.FC = () => {
  const navigation = useNavigation();
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');
  const [result, setResult] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
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
    console.log('start handler==>>>', e);
  };
  const onSpeechEndHandler = (e: any) => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const onSpeechResultsHandler = (e: any) => {
    let text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
  };

  const startRecording = async () => {
    console.log('run');
    setLoading(true);
    try {
      const check = await Voice.isAvailable();
      console.log('check=>', check);
      if (check) {
        await Voice.start('en-Us');
      }
    } catch (error) {
      console.log('error raised ===>', error);
    }
  };

  const stopRecording = async () => {
    setLoading(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };
  const onHandleTextChange = useCallback((text: string) => {
    setResult(text);
  }, []);
  const onHandleClearTextVoice = useCallback(() => {
    setResult('');
  }, []);

  // Play Track
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

  const handleCheckVoiceResult = useCallback(() => {
    navigation.navigate(Screens.CheckVoice as never, {
      data: {
        result: result,
        content: lessionsDetail?.description,
      },
    });
  }, [navigation, result]);
  return (
    <View style={styles.contain}>
      <Header title={'Pharagraph'} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <TextCommon title="The Giant Kingdom" numberOfLines={2} containStyles={styles.title} />
        <PlaySound playTrack={playTrack} pauseTrack={pauseTrack} handleSlidingComplete={handleSlidingComplete} />
        <ScrollView style={styles.contentShadow} showsVerticalScrollIndicator={false}>
          <TextCommon title={lessionsDetail?.description || ''} containStyles={styles.textDes} />
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
    fontFamily: 'Poppins-Regular',
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
