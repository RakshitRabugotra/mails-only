import DrawerNavigator from "./DrawerNavigator"
import MailDetailScreen from "../screens/MailDetailScreen"
import OnboardingScreen from "../screens/OnboardingScreen"
import SearchScreen from "../screens/SearchScreen"
import { createStackNavigator } from "@react-navigation/stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { View } from "react-native"

export type RootStackParamList = {
  Onboarding: undefined
  Drawer: undefined
  SearchMail: undefined
  MailDetail: { mailId: string }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const insets = useSafeAreaInsets()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      screenLayout={({ children }) => (
        <View style={{ marginTop: insets.top, flex: 1 }}>{children}</View>
      )}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="SearchMail"
        component={SearchScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "fade", // prevents pop animation
          cardStyleInterpolator: () => ({
            cardStyle: {
              opacity: 1,
            },
          }),
        }}
      />
      <Stack.Screen name="MailDetail" component={MailDetailScreen} />
    </Stack.Navigator>
  )
}
