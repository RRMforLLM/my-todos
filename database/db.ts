import { openDatabaseAsync } from 'expo-sqlite';

const db = openDatabaseAsync('app.db');

export default db;
