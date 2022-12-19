import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  onCheckVoice: () => void;
}

const ShadowComponent: React.FC<IShadow> = ({
  value,
  loading,
  startRecording,
  stopRecording,
  onTextChange,
  clearTextVoice,
  onCheckVoice,
}) => {
  const { t } = useTranslation();
  const renderStatusButton = useMemo(() => {
    return value ? false : true;
  }, [value]);
  return (
    <View style={styles.contain}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          value={value}
          multiline={true}
          placeholder={t('forms.practices')}
          style={styles.textDes}
          onChangeText={(text) => onTextChange(text)}
        />
      </ScrollView>
      <View style={styles.contentBottomButton}>
        <ButtonCustom title={t('forms.clear')} onPress={clearTextVoice} />
        {loading ? (
          <View style={styles.contentBtnStop}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
            <ButtonCustom title={t('forms.stop')} containStyles={styles.btnStop} onPress={stopRecording} />
          </View>
        ) : (
          <View style={styles.contentVoice}>
            <TouchableOpacity onPress={startRecording} style={styles.btnStart}>
              <IconCustom iconUrl={ic_mic} />
              <TextCommon title={t('forms.start')} containStyles={styles.textVoice} />
            </TouchableOpacity>
          </View>
        )}
        <ButtonCustom title={t('forms.check')} onPress={onCheckVoice} disabled={renderStatusButton} />
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
  },
  btnStop: {
    backgroundColor: Colors.warningColor,
  },
  contentVoice: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  textVoice: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  textDes: {
    fontSize: 17,
    color: Colors.textColor,
  },
  btnStart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ShadowComponent;
