import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("comercio.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL,
      ativo INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vendas (
    id TEXT PRIMARY KEY NOT NULL,
    data TEXT NOT NULL,
    total REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS itens_venda (
    id TEXT PRIMARY KEY NOT NULL,
    venda_id TEXT NOT NULL,
    produto_id TEXT NOT NULL,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    preco_unitario REAL NOT NULL
  );
  `);
}