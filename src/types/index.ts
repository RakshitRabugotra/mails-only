import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../App"

/**
 * Navigation types
 */
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>

/**
 * Objects in the code
 */

export type Mail = {
  id: string
  sender: string
  subject: string
  preview: string
  timestamp: string
  body: string
  unread: boolean
}

export type ExtendedMail = Mail & {
  selected?: boolean
  important?: boolean
  isInBin?: boolean
}