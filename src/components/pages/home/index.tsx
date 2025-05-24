import { BottomNavigation, Text } from "react-native-paper"

import { CommonActions } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Importing the screens for the stack
import MeetScreen from "../meet-screen"
import HomeScreen from "./home-screen"

// Type definitions
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../../App"
import { MailStateIcon, VideoStateIcon } from "../../icons"
import { StyleSheet, View } from "react-native"

// Define types for the tab navigator and home stack
export type HomeTabParamList = {
  HomeTab: undefined
  Meet: undefined
}

export const HomeTab = createBottomTabNavigator<HomeTabParamList>()

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

interface Props {
  navigation: HomeScreenNavigationProp
}

export default function Home({ navigation }: Props) {
  const unseenMailCount = 5

  return (
    <HomeTab.Navigator
      screenOptions={{
        animation: "shift",
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          labeled={false}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (event.defaultPrevented) {
              preventDefault()
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              })
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({
              focused,
              color,
              size: 24,
            }) || null
          }
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                ? options.title
                : route.name

            return label
          }}
        />
      )}
    >
      <HomeTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWrapper}>
              <MailStateIcon
                isActive={focused}
                iconProps={{ color, size: 26 }}
              />
              {unseenMailCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {unseenMailCount > 99 ? "99+" : unseenMailCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <HomeTab.Screen
        name="Meet"
        component={MeetScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <VideoStateIcon
              isActive={focused}
              iconProps={{ color, size: 26 }}
            />
          ),
        }}
      />
    </HomeTab.Navigator>
  )
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
})
