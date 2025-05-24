import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonActions } from "@react-navigation/native"
import { BottomNavigation, Text } from "react-native-paper"

// Importing the screens for the tabs
import InboxScreen from "../screens/InboxScreen"
import MeetScreen from "../screens/MeetScreen"

// Type definitions
import { PropsWithChildren } from "react"

// Icons
import { MailStateIcon, VideoStateIcon } from "../components/icons"

// Define types for the tab navigator and home stack
export type HomeTabParamList = {
  Inbox: undefined
  Meet: undefined
}

export const HomeTab = createBottomTabNavigator<HomeTabParamList>()

export default function TabNavigator() {
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
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWithBadge count={unseenMailCount}>
              <MailStateIcon
                isActive={focused}
                iconProps={{ color, size: 26 }}
              />
            </IconWithBadge>
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

const IconWithBadge = ({
  count,
  children,
}: PropsWithChildren<{ count: number }>) => (
  <View style={styles.iconWrapper}>
    {children}
    {count > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
      </View>
    )}
  </View>
)

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
