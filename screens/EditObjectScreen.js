import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DrawerContext } from '../src/DrawerContext';

export default function EditObjectScreen({ route, navigation }) {
  const { drawerId, objectId } = route.params;
  const { drawers, updateObject, deleteObject } = useContext(DrawerContext);
  const drawer = drawers.find(d => d.id === drawerId);
  const object = drawer?.objects.find(o => o.id === objectId);

  const [name, setName] = useState(object?.name || '');
  const [quantity, setQuantity] = useState(object?.quantity?.toString() || '');
  const [description, setDescription] = useState(object?.description || '');

  const handleSave = () => {
    if (name.trim() && quantity.trim()) {
      updateObject(drawerId, objectId, name, quantity, description);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please enter name and quantity.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Object',
      'Are you sure you want to delete this object?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => { deleteObject(drawerId, objectId); navigation.goBack(); } },
      ]
    );
  };

  if (!object) return null;

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
      <Button title="Delete" onPress={handleDelete} color="red" />
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
