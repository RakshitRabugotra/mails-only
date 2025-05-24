import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import PreventBackPress from "../prevent-back-press"
import Images from "../../constants/Images"
import { RootStackParamList } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

interface Props {
  navigation: HomeScreenNavigationProp
}

export default function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets()

  return (
    <PreventBackPress>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[
          styles.baseContainer,
          {
            position: "relative",
            marginTop: insets.top,
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Heading sub="Welcome To" main="Udaan" />

          <Image
            source={Images.onboardingBackground}
            style={{
              width: 200,
              height: 174,
            }}
          />

          <View style={{ marginBottom: 32, width: "100%" }}>
            <Button
              onPress={() =>
                console.log("button pressed 'onboarding-screen.tsx")
              }
              rippleColor={"white"}
              mode="contained-tonal"
              labelStyle={{ fontSize: 22, fontWeight: "500" }}
              contentStyle={{ paddingVertical: 16 }}
              style={{ marginHorizontal: 12 }}
            >
              Get Started
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PreventBackPress>
  )
}

const Heading = ({ main, sub }: { main: string; sub: string }) => {
  return (
    <View style={styles.headingWrapper}>
      <View style={styles.headingContainer}>
        <Text style={styles.subHeading}>{sub}</Text>
        <Text style={styles.mainHeading}>{main}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 12,
  },
  input: {
    marginVertical: 8,
    marginHorizontal: 12,
  },
  inputContainerMargins: { marginTop: 20 },
  headingWrapper: { marginHorizontal: 12 },
  headingContainer: { flexDirection: "column", marginTop: 20 },
  subHeading: { fontSize: 32, lineHeight: 40 },
  mainHeading: { fontSize: 54, fontWeight: "800", lineHeight: 72 },
})
