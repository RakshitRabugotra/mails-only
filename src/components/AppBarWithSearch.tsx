import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Avatar, IconButton } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { DrawerActions } from "@react-navigation/native"
import useTheme from "../hooks/use-theme"

interface AppBarWithSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function AppBarWithSearch({
  searchQuery,
  setSearchQuery,
}: AppBarWithSearchProps) {
  const navigation = useNavigation()
  const theme = useTheme();

  return (
    <View style={[styles.header, {backgroundColor: theme.colors.primaryContainer}]}>
      <IconButton
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search in emails"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          placeholderTextColor={'#000'}
          // inputStyle={{ fontSize: 14, minHeight: 0 }}
        />
      </View>
      <Avatar.Image
        size={32}
        source={{
          uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000",
        }}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 25
  },
  searchContainer: {
    flex: 1,
  },
  searchbar: {
    height: 55,
    color: 'black',
    fontSize: 15,
    backgroundColor: 'transparent',
    borderRadius: 20
  },
})
