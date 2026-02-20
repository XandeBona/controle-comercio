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
  `);
}