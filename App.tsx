import { createStackNavigator } from "@react-navigation/stack"
import DrawerNavigator from "./src/navigations/DrawerNavigator"

// Import gesture handler
import "./src/utils/gesture-handle/gesture-handle"
import { StatusBar } from "react-native"
import useTheme from "./src/hooks/use-theme"

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
      <DrawerNavigator />
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
