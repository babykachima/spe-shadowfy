import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import TrackPlayer, { Capability } from 'react-native-track-player';

type TTrack = {
  id: number;
  url: string;
  title: string;
};

const trackList: Array<TTrack> = [
  {
    id: 1,
    url: require('../../Assets/sounds/hello.mp3'),
    title: 'Play with me',
  },
];
TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});

const HomeScreen = () => {
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  //  Track player
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(trackList);
    } catch (error) {
      console.log('setUpTrackPlayer error=>', error);
    }
  };
  //
  useEffect(() => {
    setUpTrackPlayer();
  }, []);

  //
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

  console.log('get =>', Voice.getSpeechRecognitionServices());

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
  const playTrack = async () => {
    try {
      console.log('play;p');
      await TrackPlayer.play();
    } catch (error) {
      console.log('error play: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Speech Recoginition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="your text"
            style={{ flex: 1 }}
            onChangeText={(text) => setResult(text)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 24,
            backgroundColor: 'red',
            padding: 8,
            borderRadius: 4,
          }}
          onPress={stopRecording}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={playTrack}>
            <Text style={styles.text}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => TrackPlayer.pause()}>
            <Text style={styles.text}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Play</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 3,
    justifyContent: 'center',
    width: 100,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 10,
  },
});

export default HomeScreen;
