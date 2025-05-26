/**
 * @format
 */

import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"

import { PaperProvider } from "react-native-paper"
import { NavigationContainer } from "@react-navigation/native"
import { MailProvider } from "./src/context/MailContext"

// Custom hooks
import useTheme from "./src/hooks/use-theme"

export default function Main() {
  const theme = useTheme()

  return (
    <PaperProvider theme={theme}>
      <MailProvider>
        <NavigationContainer theme={theme}>
          <App />
        </NavigationContainer>
      </MailProvider>
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
