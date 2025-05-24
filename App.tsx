import Home from "./src/components/pages/home" // Tabs

// Importing the empty screens for Community and Chat
// Import gesture handler
import "./src/utils/gesture-handle/gesture-handle"
import { createStackNavigator } from "@react-navigation/stack"
import OnboardingScreen from "./src/components/pages/onboarding-screen"

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
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />
      <RootStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ title: "Onboarding", headerShown: false }}
      />
    </RootStack.Navigator>
  )
}

export default App
