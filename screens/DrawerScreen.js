import React, { useContext } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContext } from '../src/DrawerContext';

export default function DrawerScreen({ route, navigation }) {
  const drawerId = route?.params?.drawerId;
  const { drawers } = useContext(DrawerContext);

  if (!drawerId) {
    return (
      <View style={styles.container}>
        <Text>Invalid drawer ID</Text>
      </View>
    );
  }

  const drawer = drawers.find(d => d.id === drawerId);
  const drawerObjects = drawer?.objects ?? [];

  const renderObject = ({ item }) => (
    <TouchableOpacity style={styles.objectItem} onPress={() => navigation.navigate('EditObject', { objectId: item.id })}>
      <Text style={styles.objectName}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  if (!drawer) {
    return (
      <View style={styles.container}>
        <Text>Drawer not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.drawerTitle}>{drawer.name}</Text>
      <Text>{drawer.description}</Text>
      <Button title="Add Object" onPress={() => navigation.navigate('AddObject', { drawerId })} />
      <FlatList
        data={drawerObjects}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  objectItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  objectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
