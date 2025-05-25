import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import MailDetailScreen from '../screens/MailDetailScreen';
import OnboardingScreen from "../screens/OnboardingScreen"

export type RootStackParamList = {
  Onboarding: undefined
  Drawer: undefined
  MailDetail: { mailId: string }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="MailDetail" component={MailDetailScreen} />
    </Stack.Navigator>
  )
}
