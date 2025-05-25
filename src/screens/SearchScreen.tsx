import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, StyleSheet, TextInput, Animated } from "react-native"
import { IconButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import useTheme from "../hooks/use-theme"
import { ExtendedMail } from "../types"

// To debounce the search
import debounce from "lodash.debounce"

export default function SearchScreen() {
  const navigation = useNavigation()
  const theme = useTheme()

  // State variables
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<ExtendedMail[]>([])
  const [isLoading, setLoading] = useState(false)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) {
        setResults([])
        return
      }

      try {
        setLoading(true)
        // const response = await fetch(`https://your-api.com/search?q=${text}`)
        // const data = await response.json()
        // setResults(data?.results || [])
      } catch (error) {
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
          style={styles.input}
          placeholderTextColor="#888"
        />
      </View>

      {/* Future: Search Results Below */}
    </Animated.View>
  )
}

SearchScreen.sharedElements = () => ["searchBar"]

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
