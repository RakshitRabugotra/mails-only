/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4"
const tintColorDark = "#fff"

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  primary: {
    100: "#f8ceef",
    200: "#f5c2eb",
    300: "#f3b6e7",
    400: "#f093e3",
    500: "#ed9ddf",
    600: "#ea90db",
  },
  surface: {
    100: "#858585",
    200: "#696969",
    300: "#4e4e4e",
    400: "#353535",
    500: "#1e1e1e",
    600: "#000000",
  },
  tonalSurface: {
    100: "#9b9399",
    200: "#847a82",
    300: "#6d626b",
    400: "#574b54",
    500: "#42353f",
    600: "#2e202b",
  },
}
