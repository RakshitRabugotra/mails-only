import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AppBarWithSearch from '../components/AppBarWithSearch'
import EmailCard from '../components/EmailCard';

import mailsData from '../data/mails';

export default function InboxScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMails = mailsData.filter(
    mail =>
      mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <AppBarWithSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredMails}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EmailCard mail={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
