import React, { useState } from "react"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import AppBarWithSearch from "../components/AppBarWithSearch"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { DrawerParamList } from "../navigations/DrawerNavigator"

interface MockScreenProps {
  navigation: DrawerNavigationProp<DrawerParamList, "Home">
}

export default function MockScreen({ navigation }: MockScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <AppBarWithSearch />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text variant="titleLarge">Mock Screen</Text>
        <Button
          mode="outlined"
          onPress={() => navigation.jumpTo("Home")}
          style={{ marginVertical: 20 }}
          hitSlop={20}
        >
          Go to home
        </Button>
      </View>
    </View>
  )
}
