/**
 * @format
 */

import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"

import { PaperProvider } from "react-native-paper"
import { NavigationContainer } from "@react-navigation/native"

import useTheme from "./src/hooks/use-theme"

export default function Main() {
  const theme = useTheme()

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <App />
      </NavigationContainer>
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main)
