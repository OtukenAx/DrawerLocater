import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DrawerContext } from '../src/DrawerContext';

export default function AddDrawerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addDrawer } = useContext(DrawerContext);

  const handleSave = () => {
    if (name.trim()) {
      addDrawer({ name, description });
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please enter a drawer name.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Drawer Name"
        value={name}
        onChangeText={setName}
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
