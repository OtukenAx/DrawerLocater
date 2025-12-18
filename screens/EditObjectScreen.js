import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DrawerContext } from '../src/DrawerContext';

export default function EditObjectScreen({ route, navigation }) {
  const { objectId } = route.params;
  const { drawers, updateObject } = useContext(DrawerContext);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const object = drawers.flatMap(drawer => drawer.objects).find(obj => obj.id === objectId);
    if (object) {
      setName(object.name);
      setQuantity(object.quantity.toString());
      setDescription(object.description);
    }
  }, [drawers, objectId]);

  const handleSave = () => {
    if (name.trim() && quantity.trim()) {
      const drawer = drawers.find(d => d.objects.some(obj => obj.id === objectId));
      if (drawer) {
        updateObject(drawer.id, objectId, name, quantity, description);
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Drawer not found.');
      }
    } else {
      Alert.alert('Error', 'Please enter name and quantity.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Object Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});
