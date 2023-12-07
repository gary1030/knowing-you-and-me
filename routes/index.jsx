import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Contact from './contact';
import Home from './home';
import Status from './status';
import Room from './room';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
