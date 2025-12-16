import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerProvider } from './src/DrawerContext';
import HomeScreen from './screens/HomeScreen';
import AddDrawerScreen from './screens/AddDrawerScreen';
import DrawerScreen from './screens/DrawerScreen';
import AddObjectScreen from './screens/AddObjectScreen';
import EditObjectScreen from './screens/EditObjectScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DrawerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Drawer Inventory' }} />
          <Stack.Screen name="AddDrawer" component={AddDrawerScreen} options={{ title: 'Add Drawer' }} />
          <Stack.Screen name="Drawer" component={DrawerScreen} options={{ title: 'Drawer' }} />
          <Stack.Screen name="AddObject" component={AddObjectScreen} options={{ title: 'Add Object' }} />
          <Stack.Screen name="EditObject" component={EditObjectScreen} options={{ title: 'Edit Object' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DrawerProvider>
  );
}
