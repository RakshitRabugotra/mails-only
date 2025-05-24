import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import MailDetailScreen from '../screens/MailDetailScreen';


export type RootStackParamList = {
  Drawer: undefined
  MailDetail: { mailId: string }
}

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="MailDetail" component={MailDetailScreen} />
    </Stack.Navigator>
  );
}
