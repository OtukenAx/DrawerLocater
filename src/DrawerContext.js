import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [drawers, setDrawers] = useState([]);

  useEffect(() => {
    loadDrawers();
  }, []);

  const loadDrawers = async () => {
    try {
      const storedDrawers = await AsyncStorage.getItem('drawers');
      if (storedDrawers) {
        setDrawers(JSON.parse(storedDrawers));
      }
    } catch (error) {
      console.error('Error loading drawers:', error);
    }
  };

  const saveDrawers = async (newDrawers) => {
    try {
      await AsyncStorage.setItem('drawers', JSON.stringify(newDrawers));
      setDrawers(newDrawers);
    } catch (error) {
      console.error('Error saving drawers:', error);
    }
  };

  const addDrawer = (name, description) => {
    const newDrawer = {
      id: `${Date.now()}-${Math.random()}`,
      name,
      description,
      objects: [],
    };
    const newDrawers = [...drawers, newDrawer];
    saveDrawers(newDrawers);
  };

  const deleteDrawer = (id) => {
    const newDrawers = drawers.filter(drawer => drawer.id !== id);
    saveDrawers(newDrawers);
  };

  const addObject = (drawerId, name, quantity, description) => {
    const newDrawers = drawers.map(drawer => {
      if (drawer.id === drawerId) {
        const newObject = {
          id: Date.now().toString(),
          name,
          quantity: parseInt(quantity),
          description,
        };
        return { ...drawer, objects: [...drawer.objects, newObject] };
      }
      return drawer;
    });
    saveDrawers(newDrawers);
  };

  const deleteObject = (drawerId, objectId) => {
    const newDrawers = drawers.map(drawer => {
      if (drawer.id === drawerId) {
        return { ...drawer, objects: drawer.objects.filter(obj => obj.id !== objectId) };
      }
      return drawer;
    });
    saveDrawers(newDrawers);
  };

  const updateObject = (drawerId, objectId, name, quantity, description) => {
    const newDrawers = drawers.map(drawer => {
      if (drawer.id === drawerId) {
        const updatedObjects = drawer.objects.map(obj => {
          if (obj.id === objectId) {
            return { ...obj, name, quantity: parseInt(quantity), description };
          }
          return obj;
        });
        return { ...drawer, objects: updatedObjects };
      }
      return drawer;
    });
    saveDrawers(newDrawers);
  };

  return (
    <DrawerContext.Provider value={{
      drawers,
      addDrawer,
      deleteDrawer,
      addObject,
      deleteObject,
      updateObject,
    }}>
      {children}
    </DrawerContext.Provider>
  );
};
