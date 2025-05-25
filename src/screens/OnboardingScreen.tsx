import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Text, Button, useTheme } from "react-native-paper"
import { RootStackParamList } from "../navigations/RootNavigator"
import Images from "../constants/Images"

type NavigationProp = StackNavigationProp<RootStackParamList, "Onboarding">

export default function OnboardingScreen({
  navigation,
}: {
  navigation: NavigationProp
}) {
  const theme = useTheme()

  const handleContinue = () => {
    navigation.navigate("Drawer")
  }

  return (
    <View style={styles.container}>
      <Image
        source={Images.onboardingBackground} // Ensure your image matches this path
        style={styles.image}
        resizeMode="contain"
      />
      <Text variant="titleLarge" style={styles.title}>
        Effortless emailing made lightning-fast
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Experience lightning-fast email delivery with a simple, user-friendly
        service designed for effortless communication.
      </Text>
      <Button
        mode="contained"
        onPress={handleContinue}
        style={styles.button}
        contentStyle={{ paddingVertical: 6 }}
        textColor="#fff"
        buttonColor={theme.colors.primary}
      >
        Continue
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "90%",
    height: 250,
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    fontFamily: "Inter",
    marginBottom: 12,
    color: "#000",
  },
  subtitle: {
    textAlign: "center",
    color: "#6c6c6c",
    marginBottom: 32,
  },
  button: {
    width: "80%",
    backgroundColor: '#FF4F5A',
    borderRadius: 30,
  },
})
