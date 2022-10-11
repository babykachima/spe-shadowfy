import { useNavigation, useRoute } from '@react-navigation/native';
import * as diff from 'diff';
import React, { useMemo } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../Common/Components/Header';
import { Colors } from '../../Utils/colors';
import { RootRouteProps } from '../../Utils/navigationConfig';

const CheckVoice: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<'CheckVoice'>>();
  const resultVoiceData = route?.params;

  const compareText = useMemo(() => {
    const groups = diff.diffWords(resultVoiceData.data?.content, resultVoiceData.data?.result);
    const mappedNodes = groups.map((group) => {
      const { value, added, removed } = group;
      let nodeStyles;
      if (added) {
        nodeStyles = styles.warning;
      } else if (removed) {
        nodeStyles = styles.removed;
      } else {
        nodeStyles = styles.added;
      }
      return <Text style={nodeStyles}>{value}</Text>;
    });

    return <Text>{mappedNodes}</Text>;
  }, [resultVoiceData.data?.content, resultVoiceData.data?.result]);

  return (
    <SafeAreaView style={styles.contain}>
      <Header title={'CheckVoice'} rightIcon={false} goBack={navigation.goBack} />
      <View style={styles.content}>
        <View style={styles.group}>
          <ScrollView>
            <Text style={{ fontSize: 16 }}>{resultVoiceData.data?.content}</Text>
          </ScrollView>
        </View>
        <View style={styles.group}>
          <ScrollView>
            <Text style={{ fontSize: 16 }}>{compareText}</Text>
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
    backgroundColor: Colors.primaryColorLayout,
    padding: 10,
    marginBottom: 20,
  },
  added: {
    color: 'green',
    backgroundColor: '#b5efdb',
  },
  removed: {
    color: 'red',
    backgroundColor: '#fec4c0',
  },
  warning: {
    color: 'black',
    backgroundColor: '#F8EC5A',
  },
});

export default CheckVoice;
