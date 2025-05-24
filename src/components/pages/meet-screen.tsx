import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { Colors } from "../../constants/Colors"

export default function MeetScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}></View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  chatContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  message: {
    padding: 10,
    paddingVertical: 4,
    flexDirection: "row",
    marginVertical: 4,
    overflow: "hidden",
    maxWidth: "60%",
    minWidth: "25%",
    elevation: 0,
  },
  messageContent: {
    elevation: 0,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.tonalSurface[300],
  },
  messageText: {
    color: "white",
    // paddingBottom: 14
  },
  messageTime: {
    color: "#d3d3d3",
    fontSize: 12,
    verticalAlign: "bottom",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
  },
})
