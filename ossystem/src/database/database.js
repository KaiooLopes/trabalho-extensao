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
    // Tabela de usuários
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );
    `);

    // Tabela de ordens de serviço
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS ordens_servico (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        cliente TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pendente',
        data_criacao TEXT NOT NULL,
        data_conclusao TEXT
      );
    `);

    // console.log("✔ Banco iniciado com sucesso");
    return true;
  } catch (error) {
    // console.log("Erro ao criar tabelas:", error);
    throw error;
  }
}