import { StackScreenProps } from "@react-navigation/stack"
import moment from "moment"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { View, ScrollView, StyleSheet, TextInput } from "react-native"
import {
  Text,
  Appbar,
  Avatar,
  useTheme,
  IconButton,
  ActivityIndicator,
  Menu,
} from "react-native-paper"
import { RootStackParamList } from "../navigations/RootNavigator"
import { ExtendedMail } from "../types"
import { getMailFromID, updateMailFromID } from "../services"

type Props = StackScreenProps<RootStackParamList, "MailDetail">

const MailDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { mailId } = route.params

  const theme = useTheme()

  // State variable
  const [mail, setMail] = useState<ExtendedMail | null>(null)

  const [isLoading, setLoading] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  // The formatted time from the mail
  const formattedTime = useMemo(
    () => (mail ? moment(mail.timestamp).format("LTS") : ""),
    [mail]
  )

  // Fetch the email to show on the page
  useEffect(() => {
    if (isLoading) return
    // Start fetching the email
    setLoading(true)
    // Get teh single mail
    getMailFromID(mailId)
      .then(({ data, error }) => {
        if (!data || error) {
          console.error("Error while fetching data in MailDetailScreen")
          if (!data)
            throw new Error("Error while fetching data in MailDetailScreen")
          throw error
        }
        // Set the mail
        setMail(data)
      })
      .catch(err =>
        console.error("Error while fetching data in MailDetailScreen: " + err)
      )
      .finally(() => setLoading(false))
  }, [mailId])

  // mark the email as unread
  const handleMarkUnread = useCallback(() => {
    if (!mail || isLoading) return

    setMenuVisible(false)
    updateMailFromID(mail.id, { ...mail, unread: true })
      .then(({ error }) => {
        if (error) throw error
      })
      .catch(err =>
        console.error(
          "error while marking mail as read: " + (err as Error).message
        )
      )
      // Re-route to the home screen
      .finally(() => {
        navigation.push("Drawer")
      })
  }, [mail, isLoading])

  if (isLoading || mail === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <>
      <Appbar.Header mode="center-aligned">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
            alignItems: "flex-end",
          }}
        >
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item onPress={handleMarkUnread} title="Mark as unread" />
            <Menu.Item onPress={() => {}} title="Move to" />
            <Menu.Item onPress={() => {}} title="Report spam" />
          </Menu>
          <Appbar.Action icon="email-outline" onPress={() => {}} />
          <Appbar.Action icon="delete" onPress={() => {}} />
          <Appbar.Action icon="archive" onPress={() => {}} />
        </View>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.subject}>
          {mail.subject}
        </Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Inbox</Text>
        </View>

        <View style={styles.senderRow}>
          <Avatar.Text
            size={40}
            label={mail.sender[0].toUpperCase()}
            style={{ backgroundColor: theme.colors.tertiary }}
          />
          <View style={styles.senderInfo}>
            <Text variant="bodyLarge">{mail.sender}</Text>
            <Text variant="labelMedium" style={{ color: "gray" }}>
              {formattedTime}
            </Text>
          </View>
          <View style={styles.replyIcons}>
            <IconButton icon="reply" size={20} onPress={() => {}} />
            <IconButton icon="dots-vertical" size={20} onPress={() => {}} />
          </View>
        </View>

        <Text style={styles.bodyText}>{mail.body}</Text>
      </ScrollView>

      {/* Bottom input area mock (non-functional) */}
      <View style={styles.replyBar}>
        <TextInput
          style={styles.replyInput}
          placeholder="Reply"
          placeholderTextColor={"#aaa"}
        />
        <IconButton icon="emoticon-outline" size={24} onPress={() => {}} />
      </View>
    </>
  )
}

export default MailDetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  subject: {
    fontWeight: "700",
    marginBottom: 8,
  },
  labelContainer: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#444",
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  senderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  replyIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
  replyBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  replyInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
})
