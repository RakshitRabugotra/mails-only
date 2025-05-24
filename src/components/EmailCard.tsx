import React, { useMemo, useState } from "react"
import { Avatar, Text } from "react-native-paper"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../navigations/RootNavigator"
import { StyleSheet, TextStyle, TouchableOpacity, View } from "react-native"
import { Mail } from "../data/mails"
import useTheme from "../hooks/use-theme"
import { StarStateIcon } from "./icons"

type StackNavigation = StackNavigationProp<RootStackParamList, "MailDetail">

export default function EmailCard({ mail }: { mail: Mail }) {
  // To get the component themes
  const theme = useTheme()
  // To navigate to the mail detail page
  const navigation = useNavigation<StackNavigation>()

  // The State variables
  const [isImportant, setImportant] = useState(Math.random() >= 0.5)

  // The conditional styling of the email by seen or not
  const textStyles = useMemo(
    () =>
      (mail.unread
        ? { fontFamily: "Inter", color: "black", fontWeight: "bold" }
        : { fontFamily: "Inter", color: theme.colors.text }) as TextStyle,
    [mail]
  )

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => console.log("Pressed the container")}
    >
      <Avatar.Text
        size={44}
        label={mail.sender[0].toUpperCase()}
        style={{ backgroundColor: theme.colors.border, marginHorizontal: 13 }}
      />

      <View style={styles.columnContainer}>
        <View style={styles.rowContainer}>
          <Text style={[styles.senderText, textStyles]}>{mail.sender}</Text>
          <Text style={[styles.time, textStyles]}>
            {moment(mail.timestamp).format("MMM D")}
          </Text>
        </View>

        {/* The Subject of the mail */}
        <Text style={[styles.subjectText, textStyles]}>{mail.subject}</Text>

        {/* The preview for the mail */}
        <View style={styles.rowContainer}>
          <Text style={styles.previewText}>{mail.preview}</Text>
          <TouchableOpacity
            hitSlop={5}
            onPress={() => setImportant(prev => !prev)}
          >
            <StarStateIcon
              isActive={isImportant}
              iconProps={{ size: 20 }}
              activeProps={{ color: "#FBBC05" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

    // {/* <List.Item
    //   title={mail.sender}
    //   description={`${mail.subject} - ${mail.preview}`}
    //   right={() => (
    //     <List.Subheader>{moment(mail.timestamp).fromNow()}</List.Subheader>
    //   )}
    //   onPress={() => navigation.navigate("MailDetail", { mail: mail.id })}
    //   style={{ backgroundColor: mail.unread ? "#fff" : "#f1f3f4" }}
    // /> */}
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 11,
    marginVertical: 16,
    display: "flex",
    flexDirection: "row",
  },
  columnContainer: {
    flex: 1,
    marginLeft: 4,
    display: "flex",
  },
  rowContainer: {
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  time: {
    fontSize: 12,
  },
  senderText: {
    fontFamily: "Inter",
    marginTop: -2,
    fontSize: 16,
  },
  subjectText: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  previewText: {
    marginTop: 1.5,
    fontSize: 14,
  },
})
