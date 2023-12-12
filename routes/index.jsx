import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import useSMS from '../hooks/useSMS';
import AddContact from './addContact';
import Contact from './contact';
import Home from './home';
import Manage from './manage';
import Room from './room';
import Status from './status';

const Stack = createNativeStackNavigator();

export default function Routes() {
  // eslint-disable-next-line operator-linebreak
  const { buttonClickHandler, hasReceiveSMSPermission, hasReadSMSPermission } =
    useSMS();
  useEffect(() => {
    console.log('Starting app...');
    if (hasReceiveSMSPermission && hasReadSMSPermission) {
      buttonClickHandler();
      console.log('Start Read SMS');
    }
    // init();
  }, [buttonClickHandler, hasReceiveSMSPermission, hasReadSMSPermission]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen name="Manage" component={Manage} />
      <Stack.Screen name="AddContact" component={AddContact} />
    </Stack.Navigator>
  );
}
