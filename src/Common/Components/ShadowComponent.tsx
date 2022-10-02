import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ic_mic } from '../../Assets';
import { Colors } from '../../Utils/colors';
import ButtonCustom from './ButtonCustom';
import IconCustom from './IconCustom';
import TextCommon from './TextCommon';

interface IShadow {
  value: string;
  loading: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  onTextChange: (text: string) => void;
  clearTextVoice: () => void;
}

const ShadowComponent: React.FC<IShadow> = ({
  value,
  loading,
  startRecording,
  stopRecording,
  onTextChange,
  clearTextVoice,
}) => {
  const renderStatusButton = useMemo(() => {
    return value ? false : true;
  }, [value]);
  return (
    <View style={styles.contain}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          value={value}
          multiline={true}
          placeholder="Let's practice"
          style={styles.textDes}
          onChangeText={(text) => onTextChange(text)}
        />
      </ScrollView>
      <View style={styles.contentBottomButton}>
        <ButtonCustom title="Clear" onPress={clearTextVoice} />
        {loading ? (
          <View style={styles.contentBtnStop}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
            <ButtonCustom title="Stop" containStyles={styles.btnStop} onPress={stopRecording} />
          </View>
        ) : (
          <View style={styles.contentVoice}>
            <TouchableOpacity onPress={startRecording}>
              <IconCustom iconUrl={ic_mic} />
            </TouchableOpacity>
            <TextCommon title="Start Voice" containStyles={styles.textVoice} />
          </View>
        )}
        <ButtonCustom title="Check" onPress={() => console.log('Check value')} disabled={renderStatusButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 0.5,
    backgroundColor: Colors.cardColor,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentBottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentBtnStop: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  btnStop: {
    backgroundColor: Colors.warningColor,
  },
  contentVoice: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  textVoice: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  textDes: {
    fontSize: 17,
  },
});
export default ShadowComponent;
