import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import { DrawerProvider } from './src/DrawerContext';
import HomeScreen from './screens/HomeScreen';
import AddDrawerScreen from './screens/AddDrawerScreen';
import DrawerScreen from './screens/DrawerScreen';
import AddObjectScreen from './screens/AddObjectScreen';
import EditObjectScreen from './screens/EditObjectScreen';

const Stack = createStackNavigator();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
        if (fgStatus !== 'granted') {
          console.log('Foreground location permission denied');
        }

        const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
        if (bgStatus !== 'granted') {
          console.log('Background location permission denied');
        }
      } catch (error) {
        console.log('Error requesting permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
