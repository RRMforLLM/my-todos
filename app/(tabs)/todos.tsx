import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { initDatabase } from '@/database/migrations';
import { getTodos, getDones, insertTodo, insertDone, deleteTodo } from '@/database/services';

export default function TabOneScreen() {
  // DECLARATIONS
  const [todos, setTodos] = useState<unknown[] | null>(null);
  const [dones, setDones] = useState<unknown[] | null>(null);
  const [todoSubject, setTodoSubject] = useState('');
  const [todoDetails, setTodoDetails] = useState('');
  const [todoDeadline, setTodoDeadline] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const setup = async() => {
      await initDatabase();
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
      const fetchedDones = await getDones();
      setDones(fetchedDones);
    };
    setup();
  }, []);

  const addTodo = async () => {
    if (!todoSubject.trim() || !todoDetails.trim() || todoDeadline.trim()) return;
    try {
      await insertTodo({
        subject: todoSubject.trim(),
        details: todoDetails.trim(),
        deadline: todoDeadline.trim()
      });
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
      setTodoSubject('');
      setTodoDetails('');
      setTodoDeadline(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const doTodo = async (id: number) => {
    try {
      await insertDone({ todo: id });
    } catch(error) {
      console.error('Error doing todo:', error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo({ id: id });
    } catch(error) {
      console.error('Error deleting todo:', error);
    }
  };

  // CONDITIONAL RENDERING
  if (todos === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  };

  if (todos.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todos</Text>
      </View>
    )
  };

  if (todos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Todos</Text>
      </View>
    )
  };
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
