import useTheme from "./src/hooks/use-theme"

// Import gesture handler
import "./src/utils/gesture-handle/gesture-handle"
import { StatusBar } from "react-native"
import RootNavigator from "./src/navigations/RootNavigator"

const App: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <RootNavigator />
    </>
  )
}

export default App
