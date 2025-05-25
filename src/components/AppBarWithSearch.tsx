import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Avatar, IconButton, Text } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { DrawerActions } from "@react-navigation/native"
import useTheme from "../hooks/use-theme"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../navigations/RootNavigator"
import { SharedElement } from "react-navigation-shared-element"
import Images from "../constants/Images"

export default function AppBarWithSearch() {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "SearchMail">>()
  const theme = useTheme()

  const goToSearch = () => {
    navigation.navigate("SearchMail") // You must define this screen in your navigator
  }

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
      <IconButton
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <SharedElement id="searchBar" style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchContainer} onPress={goToSearch}>
          <Text style={styles.searchPlaceholder}>Search in emails</Text>
        </TouchableOpacity>
      </SharedElement>

      <Avatar.Image
        size={32}
        source={{
          uri: Images.placeholderAvatar,
        }}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 25,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
  },
  searchbar: {
    height: 55,
    color: "black",
    fontSize: 15,
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: "#666",
  },
})
