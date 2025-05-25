import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons"
import type { ComponentProps } from "react"

type MaterialDesignIconProps = ComponentProps<typeof MaterialDesignIcons>

// Type definitions for the factory function
type IconName = MaterialDesignIconProps["name"]
type MaterialIconProps = Omit<MaterialDesignIconProps, "name">

/**
 * The Material Design Icon factory
 * @param name The name of the icon to get from material icon
 * @returns
 */
const MaterialIcon =
  (name: IconName, _props?: MaterialIconProps) =>
  (props: MaterialIconProps | undefined = _props) =>
    <MaterialDesignIcons size={26} {...props} name={name} />

/**
 * Icons with active and inactive state
 */
const MaterialStateIcon =
  (activeName: IconName, inactiveName: IconName) =>
  ({
    isActive = false,
    ...rest
  }: {
    isActive: boolean
    iconProps?: MaterialIconProps
    activeProps?: MaterialIconProps
    inactiveProps?: MaterialIconProps
  }) => {
    const activeIconProps = { ...rest?.iconProps, ...rest?.activeProps }
    const inactiveIconProps = { ...rest?.iconProps, ...rest?.inactiveProps }

    return isActive ? (
      <MaterialDesignIcons {...activeIconProps} name={activeName} />
    ) : (
      <MaterialDesignIcons {...inactiveIconProps} name={inactiveName} />
    )
  }

/**
 * The icons to be used in the code
 */
export const HomeIcon = MaterialIcon("home")
export const ChevronDownIcon = MaterialIcon("chevron-down")
export const ReplyIcon = MaterialIcon("reply")
export const ForwardIcon = MaterialIcon("forward")
export const PaperclipIcon = MaterialIcon("paperclip")

// Stateful icons
export const MailStateIcon = MaterialStateIcon("email", "email-outline")
export const VideoStateIcon = MaterialStateIcon("video", "video-outline")
export const StarStateIcon = MaterialStateIcon("star", "star-outline")


