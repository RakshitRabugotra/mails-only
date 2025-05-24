import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import moment from 'moment';

export default function MailItem({ mail, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Text style={[styles.sender, mail.unread && styles.unread]}>{mail.sender}</Text>
        <Text style={styles.subject}>{mail.subject}</Text>
        <Text>{mail.preview}</Text>
      </View>
      <Text>{moment(mail.timestamp).fromNow()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  sender: { fontWeight: 'bold' },
  subject: { color: '#333' },
  unread: { fontWeight: 'bold', color: 'blue' },
});
