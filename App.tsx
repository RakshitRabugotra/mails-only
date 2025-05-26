import { SafeAreaProvider } from "react-native-safe-area-context"
import { NativeModules, Platform, StatusBar } from "react-native"
import useTheme from "./src/hooks/use-theme"

// Import gesture handler
import "./src/utils/gesture-handle/gesture-handle"

// Custom components
import RootNavigator from "./src/navigations/RootNavigator"
import { useEffect } from "react"
import { rgbaToAndroidHex } from "./src/utils/color"

const App: React.FC = () => {
  const theme = useTheme()

  useEffect(() => {
    if (Platform.OS === "android") {
      const hexColor = rgbaToAndroidHex(theme.colors.card)
      NativeModules.NavigationBar?.setColor(hexColor)
    }
  }, [theme])

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={theme.colors.background} />
      <RootNavigator />
    </SafeAreaProvider>
  )
}

export default App
