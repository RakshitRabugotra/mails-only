import { GeolocationResponse } from "@react-native-community/geolocation"
import { UserData } from "../utils/sos"

export const PREFERENCES = {
  QUICK_SHARE_VIA_WHATSAPP: true,
  CONFIRM_ACTIONS: {
    CALL: true,
  },

  // Debug fields
  DEFAULT_USER: {
    name: "Rakshit Rabugotra",
    email: "rakshit.rabugotra360@gmail.com",
    emergency: ["+91-9569764949", "+91-9569764949", "+91-9569764949"],
  } as UserData,
}

export const PREFAB = {
  SHARE_LOCATION: {
    default: (location: GeolocationResponse) =>
      `HELP!! Check out my location: https://www.google.com/maps/search/?api=1&query=${location.coords.latitude},${location.coords.longitude}`,
    whatsapp: (name: string, location: GeolocationResponse) =>
      `🚨 SOS Alert 🚨\nHi, I am ${name}. I need immediate assistance. Please check my current location:\nGoogle Maps: https://www.google.co.in/maps/@${location.coords.latitude},${location.coords.longitude},12z Coordinates:\nLatitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`,
  },
}
