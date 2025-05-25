import React, { useCallback, useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper"

import { getBackendUri, updateBackendUri } from "../services/storage"

export default function MeetScreen() {
  const [backendUri, setBackendUri] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  const handleUpdate = useCallback(() => {
    if (!backendUri) return

    setLoading(true)
    updateBackendUri(backendUri)
      .then(err => {
        throw err
      })
      .catch(err => {
        console.error(
          "Error while updating the backend-uri: " + (err as Error).message
        )
      })
      .finally(() => setLoading(false))
  }, [backendUri])

  useEffect(() => {
    // Fetch the backend uri from the async storage
    getBackendUri()
      .then(({ backendUri: data, error }) => {
        // If we don't have the data
        if (!data || error) {
          throw error || "Error while fetching backend-uri from async storage"
        }
        // Set the backend uri
        setBackendUri(data)
      })
      .catch(err => {
        console.error("Error while getting backend-uri: " + err)
        setBackendUri("")
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Update the backend URI to continue
      </Text>

      {backendUri !== null ? (
        <>
          <View>
            <TextInput
              placeholder="https://abc.xyz"
              label={"Backend URI"}
              value={backendUri}
              onChangeText={setBackendUri}
            />
          </View>

          <Text variant="bodyMedium" style={styles.subtitle}>
            * Enter the uri for example: 'https://abc.xyz', without ending with
            a slash '/'
          </Text>
          {!isLoading ? (
            <Button
              mode="contained"
              onPress={handleUpdate}
              style={styles.button}
              contentStyle={{ paddingVertical: 6 }}
            >
              Update
            </Button>
          ) : (
            <ActivityIndicator size="small" />
          )}
        </>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    fontFamily: "Inter",
    marginBottom: 12,
    color: "#000",
  },
  subtitle: {
    textAlign: "center",
    color: "#6c6c6c",
    marginBottom: 32,
  },
  button: {
    width: "80%",
    marginHorizontal: "auto",
    borderRadius: 30,
  },
})
