import { View, StyleSheet } from "react-native"

// Navigation imports
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../../App"

// Geolocation imports
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Custom Components
import ThemedView from "../../themed/view"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

interface Props {
  navigation: HomeScreenNavigationProp
}

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()

  return (
    <ThemedView style={[styles.baseContainer, { marginTop: insets.top }]}>
      <View style={styles.heroContainer}>
        
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    paddingTop: 0,
    padding: 12,
  },
  flexColumnCenter: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heroContainer: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: "20%",
    position: "relative",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  sosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 16,
    position: "absolute",
    inset: 0,
    top: "auto",
    transform: [{ translateY: "50%" }],
    paddingVertical: 8,
    zIndex: 10,
  },
  cardContainer: {
    flexDirection: "row",
    gap: 10,
    paddingBottom: 24,
  },
  cardColumn: {
    flexDirection: "column",
    flex: 1,
    gap: 8,
  },
})
