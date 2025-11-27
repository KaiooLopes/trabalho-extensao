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
    // Arquivo de Inicialização do Banco de Dados (onde você está criando a tabela)

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS ordens_servico (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        cliente TEXT NOT NULL,
        valor REAL, 
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

export async function resetDatabase() {
  const database = await getDatabase();

  try {
    console.log("Iniciando reset do banco de dados...");

    // 1. Apagar todas as tabelas (DROP TABLE)
    await database.execAsync(`
      DROP TABLE IF EXISTS ordens_servico;
      DROP TABLE IF EXISTS usuarios;
    `);

    console.log("Tabelas apagadas com sucesso.");

    // 2. Recriar as tabelas chamando a função initDatabase
    await initDatabase();

    console.log("Banco de dados resetado e recriado com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro durante o reset do banco de dados:", error);
    throw error;
  }
}