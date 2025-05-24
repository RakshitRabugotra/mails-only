import React from 'react';
import { List } from 'react-native-paper';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/RootNavigator';

type StackNavigation = StackNavigationProp<RootStackParamList, 'MailDetail'>

export default function EmailCard({ mail }: { mail: any }) {
  const navigation = useNavigation<StackNavigation>();

  return (
    <List.Item
      title={mail.sender}
      description={`${mail.subject} - ${mail.preview}`}
      right={() => <List.Subheader>{moment(mail.timestamp).fromNow()}</List.Subheader>}
      onPress={() => navigation.navigate('MailDetail', { mail: mail.id })}
      style={{ backgroundColor: mail.unread ? '#fff' : '#f1f3f4' }}
    />
  );
}
