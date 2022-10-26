import { useNavigation, useRoute } from '@react-navigation/native';
import * as diff from 'diff';

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../Common/Components/Header';
import { regexCharacters } from '../../Utils';
import { Colors } from '../../Utils/colors';
import { RootRouteProps } from '../../Utils/navigationConfig';

const CheckVoice: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<'CheckVoice'>>();
  const resultVoiceData = route?.params;
  const { t } = useTranslation();

  const formatVoiceData = useMemo(() => {
    if (resultVoiceData.data?.content) {
      return String(resultVoiceData.data.content).replace(regexCharacters, '').toLowerCase();
    }
    return;
  }, [resultVoiceData.data?.content]);

  const compareText = useMemo(() => {
    const groups = diff.diffWords(formatVoiceData || '', resultVoiceData.data?.result.toLowerCase());
    const mappedNodes = groups.map((group, index) => {
      const { value, added, removed } = group;
      let nodeStyles;
      if (added) {
        nodeStyles = styles.warning;
      } else if (removed) {
        nodeStyles = styles.removed;
      } else {
        nodeStyles = styles.added;
      }
      return (
        <Text style={nodeStyles} key={index}>
          {value}
        </Text>
      );
    });

    return <Text>{mappedNodes}</Text>;
  }, [formatVoiceData, resultVoiceData.data?.result]);

  return (
    <SafeAreaView style={styles.contain}>
      <Header title={t('screens.CheckVoice')} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <View style={styles.group}>
          <ScrollView>
            <Text style={styles.text}>{resultVoiceData.data?.content}</Text>
          </ScrollView>
        </View>
        <View style={styles.group}>
          <ScrollView>
            <Text style={styles.text}>{compareText}</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  group: {
    width: '100%',
    flex: 0.5,
    borderRadius: 10,
    backgroundColor: Colors.cardColor,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },

  added: {
    color: Colors.greenColor,
  },
  removed: {
    color: Colors.redColor,
  },
  warning: {
    color: Colors.textColor,
    backgroundColor: Colors.yellowColor,
  },
});

export default CheckVoice;
