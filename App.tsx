import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import useTheme from "./src/hooks/use-theme"

// Import gesture handler
import "./src/utils/gesture-handle/gesture-handle"

// Custom components
import RootNavigator from "./src/navigations/RootNavigator"

const App: React.FC = () => {
  const theme = useTheme()

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={theme.colors.background} />
      <RootNavigator />
    </SafeAreaProvider>
  )
}

export default App
