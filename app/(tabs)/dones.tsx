import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { initDatabase } from '@/database/migrations';
import { getDones, deleteDone, deleteTodo } from '@/database/services';

export default function TabTwoScreen() {
  const [dones, setDones] = useState<unknown[] | null>(null);
  
  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedDones = await getDones();
      setDones(fetchedDones);
    };
    setup();
  }, []);

  const removeDone = async (id: number) => {
    try {
      await deleteDone({ id: id });
    } catch(error) {
      console.error('Error undoing done:', error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo({ id: id });
    } catch(error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/dones.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
