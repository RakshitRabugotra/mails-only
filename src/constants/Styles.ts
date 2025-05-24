import { StyleSheet } from "react-native"

export const colorsPalette = StyleSheet.create({
  bg: {
    color: "#EFF5FF",
  },
  denim: {
    color: "#022959",
  },
  white: {
    color: "#fff",
  },
  skyBlue: {
    color: "#BEE2FD",
  },
  veryLightGrey: {
    color: "#F8F9FF",
  },
  lightGrey: {
    color: "#D6D9E6",
  },
  grey: {
    color: "#9699AA",
  },
  purple: {
    color: "#483EFF",
  },
  red: {
    color: "#EE374A",
  },

  borderColor: {
    color: "#D6D9E6",
  },
})

export const globalStyles = StyleSheet.create({
  stepContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  stepSubContainer: {
    backgroundColor: colorsPalette.white.color,
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 10,
  },
})

export const gStyles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  // Border utilities
  border2: {
    borderColor: "#dddddd33",
    borderWidth: 1,
    borderStyle: "solid",
  },
})
