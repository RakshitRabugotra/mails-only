import React, { useEffect, useMemo, useRef, useState } from "react"
import { Avatar, Text } from "react-native-paper"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../navigations/RootNavigator"
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native"
import { Mail } from "../data/mails"
import useTheme from "../hooks/use-theme"
import { StarStateIcon } from "./icons"

type StackNavigation = StackNavigationProp<RootStackParamList, "MailDetail">

export interface EmailCardProps {
  mail: Mail
  isSelected?: boolean
  onSelect: (mail: Mail) => void
  onDeselect: (mail: Mail) => void
  onPress: (mail: Mail) => void
}

export default function EmailCard({
  mail,
  isSelected = true,
  onSelect,
  onDeselect,
  onPress,
}: EmailCardProps) {
  // To get the component themes
  const theme = useTheme()
  // To navigate to the mail detail page
  const navigation = useNavigation<StackNavigation>()
  // The State variables
  const [isImportant, setImportant] = useState(Math.random() >= 0.5)

  // The conditional styling of the email by seen or not
  const textStyles = useMemo(
    () =>
      (mail.unread
        ? { fontFamily: "Inter", color: "black", fontWeight: "bold" }
        : { fontFamily: "Inter", color: theme.colors.text }) as TextStyle,
    [mail]
  )

  // To Animate the background color on change
  const animation = useRef(new Animated.Value(isSelected ? 1 : 0)).current
  const rotation = useRef(new Animated.Value(isSelected ? 1 : 0)).current

  // The anim values interpolated
  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.background, theme.colors.primaryContainer],
  })

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  const backInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  })

  useEffect(() => {
    // To animate the background color
    Animated.timing(animation, {
      toValue: isSelected ? 1 : 0,
      duration: 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start()

    // To animate the rotation of the  icon
    Animated.timing(rotation, {
      toValue: isSelected ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start()
  }, [isSelected])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={() => (isSelected ? onDeselect(mail) : onSelect(mail))}
        onPress={() => onPress(mail)}
        activeOpacity={0.5}
      >
        <Animated.View style={[styles.touchable, { backgroundColor }]}>
          <Pressable
            hitSlop={15}
            onPress={() => (isSelected ? onDeselect(mail) : onSelect(mail))}
          >
            <FlippableAvatar
              isSelected={isSelected}
              label={mail.sender[0].toUpperCase()}
              frontInterpolate={frontInterpolate}
              backInterpolate={backInterpolate}
              textBackground={theme.colors.border}
            />
          </Pressable>

          <View style={styles.columnContainer}>
            <View style={styles.rowContainer}>
              <Text style={[styles.senderText, textStyles]}>{mail.sender}</Text>
              <Text style={[styles.time, textStyles]}>
                {moment(mail.timestamp).format("MMM D")}
              </Text>
            </View>

            {/* The Subject of the mail */}
            <Text style={[styles.subjectText, textStyles]}>{mail.subject}</Text>

            {/* The preview for the mail */}
            <View style={styles.rowContainer}>
              <Text style={styles.previewText}>{mail.preview}</Text>
              <TouchableOpacity
                hitSlop={5}
                onPress={() => setImportant(prev => !prev)}
              >
                <StarStateIcon
                  isActive={isImportant}
                  iconProps={{ size: 20 }}
                  activeProps={{ color: "#FBBC05" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

const FlippableAvatar = ({
  isSelected,
  label,
  frontInterpolate,
  backInterpolate,
  textBackground,
}: {
  isSelected: boolean
  frontInterpolate: Animated.AnimatedInterpolation<string | number>
  backInterpolate: Animated.AnimatedInterpolation<string | number>
  label: string
  textBackground: string
}) => {
  return (
    <View style={{ width: 44, height: 44, marginRight: 10 }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
          borderRadius: 22,
          backfaceVisibility: "hidden",
          transform: [{ rotateY: frontInterpolate }, { perspective: 1000 }],
        }}
      >
        {isSelected ? (
          <Avatar.Icon size={44} icon="check" />
        ) : (
          <Avatar.Text
            size={44}
            label={label}
            style={{ backgroundColor: textBackground }}
          />
        )}
      </Animated.View>

      {/* Back face with the check icon */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          overflow: "hidden",
          borderRadius: 22,
          backfaceVisibility: "hidden",
          transform: [{ rotateY: backInterpolate }, { perspective: 1000 }],
        }}
      >
        <Avatar.Icon size={44} icon="check" />
      </Animated.View>
    </View>
  )
}
// {/* <Avatar.Text
//            size={44}
//            label={mail.sender[0].toUpperCase()}
//            style={{ backgroundColor: theme.colors.border, marginRight: 10 }}
//          /> */}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  touchable: {
    flex: 1,
    padding: 12,
    marginVertical: 2,
    display: "flex",
    flexDirection: "row",
    borderRadius: 18,
  },
  columnContainer: {
    flex: 1,
    marginLeft: 4,
    display: "flex",
  },
  rowContainer: {
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  time: {
    fontSize: 12,
  },
  senderText: {
    fontFamily: "Inter",
    marginTop: -2,
    fontSize: 17,
  },
  subjectText: {
    fontFamily: "Inter",
    fontSize: 15,
  },
  previewText: {
    marginTop: 1.5,
    fontSize: 14,
  },
})
