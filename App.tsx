import useTheme from "./src/hooks/use-theme"
import { createStackNavigator } from "@react-navigation/stack"

// Import gesture handler
import "./src/utils/gesture-handle/gesture-handle"
import { StatusBar } from "react-native"
import RootNavigator from "./src/navigations/RootNavigator"

export type RootStackParamList = {
  Home: undefined
  Journey: undefined
  Helpline: undefined
  Emergency: undefined
  Settings: undefined
  Onboarding: undefined
}

export const RootStack = createStackNavigator<RootStackParamList>()

const App: React.FC = () => {
  const theme = useTheme()

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} />
      <RootNavigator />
    </>
    // <RootStack.Navigator initialRouteName="Home">
    //   <RootStack.Screen
    //     name="Home"
    //     component={Home}
    //     options={{ title: "Home", headerShown: false }}
    //   />
    //   <RootStack.Screen
    //     name="Onboarding"
    //     component={OnboardingScreen}
    //     options={{ title: "Onboarding", headerShown: false }}
    //   />
    // </RootStack.Navigator>
  )
}

export default App
