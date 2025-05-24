import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Text, Appbar } from "react-native-paper"
import moment from "moment"

// Data
import mailsData from "../data/mails"
import { RootStackParamList } from "../navigations/RootNavigator"
import { StackNavigationProp } from "@react-navigation/stack"

interface MailDetailScreenProps {
  route: RouteProp<RootStackParamList, "MailDetail">
  navigation: StackNavigationProp<RootStackParamList, "MailDetail">
}

export default function MailDetailScreen({
  route,
  navigation,
}: MailDetailScreenProps) {
  const { mailId } = route.params

  const mail = mailsData.find(m => m.id === mailId)

  if (!mail) {
    return (
      <View style={styles.centered}>
        <Text>Email not found.</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Email" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subject}>{mail.subject}</Text>
        <Text style={styles.meta}>
          {mail.sender} •{" "}
          {moment(mail.timestamp).format("MMM D, YYYY • h:mm A")}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.body}>{mail.body}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  subject: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    // whiteSpace: 'pre-line',
  },
})
