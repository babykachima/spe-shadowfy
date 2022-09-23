import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Capability, usePlaybackState, useProgress, State } from 'react-native-track-player';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, Modal } from 'react-native';
import { Header } from '../../Common/Components/Header';

import { useGetDetailDataFireStore } from '../../Hooks/fetchDataFireStore';
import { ic_cancel, ic_pause, ic_play } from '../../Assets';
import TextCommon from '../../Common/Components/TextCommon';
import ButtonCustom from '../../Common/Components/ButtonCustom';
import { listRates } from '../../Utils';
import { IRate } from '../../Types';

TrackPlayer.updateOptions({
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [Capability.Play, Capability.Pause],
});
interface IModalPopup {
  visible: boolean;
  onCloseModal: () => void;
  onSelectRateItem: () => void;
}
const ModalPopup: React.FC<IModalPopup> = ({ visible, onCloseModal, onSelectRateItem }) => {
  const selectItemRate = (rate: IRate) => {
    onSelectRateItem(rate);
    onCloseModal();
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modal}>
        <View style={styles.contentModal}>
          <TouchableOpacity style={styles.headerContentModal} onPress={onCloseModal}>
            <Image source={ic_cancel} style={styles.icon} />
          </TouchableOpacity>
          {listRates.map((rate) => (
            <TouchableOpacity style={styles.listRates} key={rate.id} onPress={() => selectItemRate(rate)}>
              <TextCommon title={rate.rate} containStyles={styles.titleRate} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const PracticeShadowing: React.FC = () => {
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const [lessionsDetail] = useGetDetailDataFireStore('lessions', 'nsTbaEpUysbeU7IeGG5m');
  const { position, duration } = useProgress();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [rate, setRate] = useState<IRate>();

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
    setModalVisible(true);
    if (rate?.value) {
      await TrackPlayer.setRate(rate.value);
    }
  }, [rate?.value]);

  const convertPosition = useMemo(() => {
    return new Date(position * 1000).toISOString().substr(14, 5);
  }, [position]);

  const convertProgressDuration = useMemo(() => {
    return new Date((duration - position) * 1000).toISOString().substr(14, 5);
  }, [duration, position]);

  const onHandleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const onSelectRateItem = useCallback((itemRate: IRate) => {
    if (itemRate) {
      setRate(itemRate);
    }
  }, []);

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
            <TouchableOpacity onPress={handleSetSpeed}>
              <ButtonCustom title={rate?.rate || ''} />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={handleResetTrack}>
              <ButtonCustom title="Reset" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Modal */}
      <ModalPopup visible={modalVisible} onCloseModal={onHandleCloseModal} onSelectRateItem={onSelectRateItem} />
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
    alignItems: 'center',
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
