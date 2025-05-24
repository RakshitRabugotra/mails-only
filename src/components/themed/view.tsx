import { View, ViewProps } from "react-native"
import { useTheme } from "react-native-paper"

export default function ThemedView({ style, ...props }: ViewProps) {
  const theme = useTheme()

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
    />
  )
}
