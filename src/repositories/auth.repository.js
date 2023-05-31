import { db } from "../database/database.connection.js";

//Função de inserção de um usuário na tabela de sessões.

export function createSessionDB(user_id, token) {
  return db.query(`
    INSERT INTO session (user_id, token)  VALUES ($1, $2);`,
    [user_id, token]
  )
}