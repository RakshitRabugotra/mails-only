import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import AppBarWithSearch from "../components/AppBarWithSearch"
import EmailCard from "../components/EmailCard"

import mailsData, { Mail } from "../data/mails"

export default function InboxScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState("")
  // The list of selected mails
  const [selectedMail, setSelectedMail] = useState<string[]>([])

  const filteredMails = useMemo(
    () =>
      mailsData.filter(
        mail =>
          mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mail.preview.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [mailsData]
  )

  const onSelect = useCallback((mail: Mail) => {
    // Check if it already exists
    if (selectedMail.includes(mail.id)) return
    setSelectedMail(prev => [...prev, mail.id])
  }, [])

  const onDeselect = useCallback((mail: Mail) => {
    setSelectedMail(prev => prev.filter(item => item !== mail.id))
  }, [])

  return (
    <View style={styles.container}>
      <AppBarWithSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FlatList
        data={filteredMails}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EmailCard
            mail={item}
            isSelected={selectedMail.includes(item.id)}
            onSelect={onSelect}
            onDeselect={onDeselect}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
