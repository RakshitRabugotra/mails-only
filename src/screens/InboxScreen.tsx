import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import AppBarWithSearch from "../components/AppBarWithSearch"
import EmailCard from "../components/EmailCard"

import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../navigations/RootNavigator"
import { ExtendedMail } from "../types"
import { getPaginatedMails, updateMailFromID } from "../services"
import { ActivityIndicator, Button, Text } from "react-native-paper"

interface InboxScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "Drawer">
}

export default function InboxScreen({ navigation }: InboxScreenProps) {
  // const [searchQuery, setSearchQuery] = useState("")

  // To show loading state
  const [isLoading, setLoading] = useState(false)
  const [showRefresh, setShowRefresh] = useState(false)

  // The list of selected mails
  const [mails, setMails] = useState<ExtendedMail[] | null>(null)
  // To paginate the list
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const onSelect = useCallback((mail: ExtendedMail) => {
    // Check if it already exists
    if (mail?.selected) return
    // Else, mark it selected
    setMails(prev =>
      prev
        ? prev.map(value =>
            value.id === mail.id ? { ...value, selected: true } : value
          )
        : null
    )
  }, [])

  const onDeselect = useCallback((mail: ExtendedMail) => {
    // Check if it deselected, then return
    if (!mail?.selected) return
    // Else, mark it deselected
    setMails(prev =>
      prev
        ? prev.map(value =>
            value.id === mail.id ? { ...value, selected: false } : value
          )
        : null
    )
  }, [])

  // Utility to fetch mails on the go
  const fetchMail = useCallback(
    async (pageNumber: number) => {
      setLoading(true)
      // If we don't have more, then return
      if (!hasMore) return setLoading(false)

      // Fetch mails from the backend
      const { data, error } = await getPaginatedMails(pageNumber)

      if (!data || error) {
        // There was some error in fetching the data
        setShowRefresh(true)
        return setLoading(false)
      }

      // Get the data
      setMails(prev => {
        const existingIds = new Set(prev?.map(m => m.id) || [])
        const newMails = data.data.filter(mail => !existingIds.has(mail.id))
        return prev ? [...prev, ...newMails] : newMails
      })

      setShowRefresh(false)
      // Check if we have more pages
      setHasMore(data.next !== null)
      // Stop the loading
      setLoading(false)
    },
    [hasMore]
  )

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1)
    }
  }, [isLoading, hasMore])

  const refreshMails = useCallback(() => {
    // Empty the mail, reset flags
    setMails(null)
    setHasMore(true)
    setLoading(false)
    setPage(1)
    // If defined, call the callback
    fetchMail(page)
  }, [])

  // When pressed, mark the email as read, and reroute to the detail screen
  const handleEmailPress = useCallback(
    (mail: ExtendedMail) => {
      if (!mail) return
      // Start marking as read
      updateMailFromID(mail.id, { ...mail, unread: false })
        .then(({ error }) => {
          if (error) throw error
          // Update the local instance
          setMails(prev =>
            prev
              ? prev.map(value =>
                  value.id === mail.id ? { ...value, unread: false } : value
                )
              : null
          )
        })
        .catch(err =>
          console.error(
            "error while marking mail as read: " + (err as Error).message
          )
        )
        // Re-route to the detail screen
        .finally(() => navigation.push("MailDetail", { mailId: mail.id }))
    },
    [setMails]
  )

  // Fetch all the mails, in paginated way
  useEffect(() => {
    fetchMail(page)
  }, [page])

  return (
    <View style={styles.container}>
      <AppBarWithSearch />
      {mails === null ? (
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {showRefresh ? (
            <Button
              mode="outlined"
              onPress={refreshMails}
              contentStyle={{ paddingVertical: 6 }}
            >
              Refresh
            </Button>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      ) : (
        <FlatList
          data={mails}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EmailCard
              mail={item}
              onSelect={onSelect}
              onDeselect={onDeselect}
              onPress={handleEmailPress}
            />
          )}
          contentContainerStyle={{ paddingBottom: 200 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshing={mails === null}
          onRefresh={refreshMails}
          ListFooterComponent={
            isLoading ? (
              <View
                style={{
                  padding: 40,
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            isLoading ? null : <Text>You have no mails!</Text>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
