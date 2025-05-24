import { usePreventRemove } from "@react-navigation/native"
import { PropsWithChildren, useEffect } from "react"
import { Alert, BackHandler } from "react-native"

export default function PreventBackPress({
  allowOnConfirm = false,
  children,
}: PropsWithChildren<{ allowOnConfirm?: boolean }>) {
  usePreventRemove(true, () => {
    if (allowOnConfirm) {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "Cancel",
            onPress: () => {
              // Do nothing
            },
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      )
      return true
    }
    return false
  })

  return children
}
