import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function MailDetailScreen({ route, navigation }: any) {
  const { mail } = route.params;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={mail.subject} />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <Text style={styles.sender}>{mail.sender}</Text>
        <Text>{mail.body}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  sender: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
});
