import db from '@/database/db';
import { createTables } from '@/database/schema';

export const initDatabase = async () => {
  try {
    await db.withTransactionAsync(async () => {
      for (const query of createTables) {
        try {
          await db.execAsync(query);
          console.log('✅ Table created or already exists');
        } catch (error) {
          console.error('❌ Error creating table:', error);
        }
      }
    });
  } catch (err) {
    console.error('❌ Failed to initialize DB transaction:', err);
  }
};
