import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, StyleSheet, TextInput, Animated, FlatList } from "react-native"
import { ActivityIndicator, IconButton, Text } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import useTheme from "../hooks/use-theme"
import { ExtendedMail } from "../types"

// To debounce the search
import debounce from "lodash.debounce"
import {
  searchMailsFromText,
  SearchResults,
  updateMailFromID,
} from "../services"
import EmailCard from "../components/EmailCard"
import { RootStackParamList } from "../navigations/RootNavigator"
import { StackNavigationProp } from "@react-navigation/stack"

interface SearchScreenProps {
  navigation: StackNavigationProp<RootStackParamList, "SearchMail">
}

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const theme = useTheme()

  // State variables
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResults | null>(null)
  const [isLoading, setLoading] = useState(false)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) {
        setResults(null)
        return
      }

      try {
        setLoading(true)
        const { data, error } = await searchMailsFromText(text)
        if (error) throw error
        if (!data) throw new Error("Couldn't get data in SearchScreen")
        // Else, set the result
        setResults(data)
      } catch (error) {
        // The results shouldn't be empty
        console.error("Search error:", error)
      } finally {
        setLoading(false)
      }
    }, 500),
    []
  )

  const handleChange = useCallback(
    (text: string) => {
      setSearchQuery(text)
      debouncedSearch(text)
    },
    [setSearchQuery, debouncedSearch]
  )

  const onSelect = useCallback((mail: ExtendedMail) => {
    // Check if it already exists
    if (mail?.selected || !results) return
    // Else, mark it selected
    setResults(prev =>
      prev
        ? {
            total: prev.total,
            data: prev.data.map(value =>
              value.id === mail.id ? { ...value, selected: true } : value
            ),
          }
        : null
    )
  }, [])

  const onDeselect = useCallback((mail: ExtendedMail) => {
    // Check if it deselected, then return
    if (!mail?.selected || !results) return
    // Else, mark it selected
    setResults(prev =>
      prev
        ? {
            total: prev.total,
            data: prev.data.map(value =>
              value.id === mail.id ? { ...value, selected: false } : value
            ),
          }
        : null
    )
  }, [])

  // When pressed, mark the email as read, and reroute to the detail screen
  const handleEmailPress = useCallback(
    (mail: ExtendedMail) => {
      if (!mail) return
      // Start marking as read
      if (mail.unread) {
        updateMailFromID(mail.id, { unread: false })
          .then(({ error }) => {
            if (error) throw error
            // Update the local instance
            setResults(prev =>
              prev
                ? {
                    total: prev.total,
                    data: prev.data.map(value =>
                      value.id === mail.id ? { ...value, unread: false } : value
                    ),
                  }
                : null
            )
          })
          .catch(err =>
            console.error(
              "error while marking mail as read: " + (err as Error).message
            )
          )
      }
      // Re-route to the detail screen
      navigation.push("MailDetail", { mailId: mail.id })
    },
    [setResults]
  )

  // Animation variables
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <>
      <Animated.View style={(styles.container, { opacity: fadeAnim })}>
        <View
          style={[
            styles.searchBarContainer,
            { backgroundColor: theme.colors.card },
          ]}
        >
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <TextInput
            autoFocus
            placeholder="Search in emails"
            value={searchQuery}
            onChangeText={handleChange}
            style={[styles.input, { color: theme.colors.text }]}
            placeholderTextColor="#888"
          />
        </View>
      </Animated.View>
      {isLoading ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 200 }}
          data={results?.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <EmailCard
              mail={item}
              onSelect={onSelect}
              onDeselect={onDeselect}
              onPress={handleEmailPress}
            />
          )}
          ListEmptyComponent={
            isLoading || !results || results.total !== 0 ? null : (
              <View style={styles.flexCenter}>
                <Text>No match found!</Text>
              </View>
            )
          }
        />
      )}
    </>
  )
}

SearchScreen.sharedElements = () => ["searchBar"]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCenter: {
    padding: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    marginLeft: -3,
    fontSize: 15,
    color: "#000",
  },
})
