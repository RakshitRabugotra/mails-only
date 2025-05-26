import React, { useCallback, useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import {
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Snackbar,
  useTheme,
} from "react-native-paper"

import { getBackendUri, updateBackendUri } from "../services/storage"

export default function MeetScreen() {
  const theme = useTheme()

  const [backendUri, setBackendUri] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  // To handle the snackbar
  const [visible, setVisible] = useState(false)
  const [statusText, setStatusText] = useState("")

  const onShowSnackBar = useCallback(() => setVisible(!visible), [visible])

  const onDismissSnackBar = useCallback(() => setVisible(false), [])

  const handleUpdate = useCallback(() => {
    if (!backendUri) return

    setLoading(true)
    updateBackendUri(backendUri)
      .then(({ error }) => {
        if (error !== null) throw error
        setStatusText("Backend URI updated successfully!")
      })
      .catch(err => {
        const msg =
          "Error while updating the backend-uri: " + (err as Error).message
        console.error(msg)
        setStatusText(msg)
      })
      .finally(() => {
        setLoading(false)
        onShowSnackBar()
      })
  }, [backendUri])

  useEffect(() => {
    // Fetch the backend uri from the async storage
    getBackendUri()
      .then(({ backendUri: data, error }) => {
        // If we don't have the data
        if (!data)
          throw new Error("Error while fetching backend-uri from async storage")
        if (error) {
          throw error
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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        variant="titleLarge"
        style={[styles.title, { color: theme.colors.outline }]}
      >
        Update the backend URI to continue
      </Text>

      {backendUri !== null ? (
        <>
          <View style={{ paddingHorizontal: 24 }}>
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

      {/* Snackbar to show the text */}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        wrapperStyle={{
          alignSelf: "center",
        }}
        action={{
          label: "Dismiss",
          onPress: onDismissSnackBar,
        }}
      >
        {statusText}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 24,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    fontFamily: "Inter",
    paddingHorizontal: 24,
    marginBottom: 12,
    color: "#000",
  },
  subtitle: {
    textAlign: "center",
    color: "#6c6c6c",
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  button: {
    width: "80%",
    marginHorizontal: "auto",
    borderRadius: 30,
  },
})
