import React, { useContext } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContext } from '../src/DrawerContext';

export default function HomeScreen({ navigation }) {
  const { drawers } = useContext(DrawerContext);

  const renderDrawer = ({ item }) => (
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Drawer', { drawerId: item.id })}>
      <Text style={styles.drawerName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Drawer" onPress={() => navigation.navigate('AddDrawer')} />
      <FlatList
        data={drawers}
        keyExtractor={(item) => item.id}
        renderItem={renderDrawer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  drawerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
