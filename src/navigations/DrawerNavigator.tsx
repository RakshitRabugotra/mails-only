import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import MockScreen from '../screens/MockScreens';
import PreventBackPress from "../components/prevent-back-press"

export type DrawerParamList = {
  Home: undefined
  Snoozed: undefined
  Sent: undefined
  Drafts: undefined
}

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <PreventBackPress allowOnConfirm>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Home" component={TabNavigator} />
        <Drawer.Screen name="Snoozed" component={MockScreen} />
        <Drawer.Screen name="Sent" component={MockScreen} />
        <Drawer.Screen name="Drafts" component={MockScreen} />
      </Drawer.Navigator>
    </PreventBackPress>
  )
}
