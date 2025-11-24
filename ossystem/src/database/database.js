import * as SQLite from 'expo-sqlite';

let db = null;

export async function getDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('app.db');
  }
  return db;
}

export async function initDatabase() {
  const database = await getDatabase();

  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );
    `);
    console.log("✔ Banco iniciado com sucesso");
    return true;
  } catch (error) {
    console.log("Erro ao criar tabela:", error);
    throw error;
  }
}