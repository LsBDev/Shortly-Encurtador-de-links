import { db } from "../database/database.connection.js"

//Se for necessário fazer duas requisições em uma única função de controle, Só fazer duas funções, cada uma com uma requisição, no mesmo arquivo de repositório.
//retornar diretamente o resultado da query ou guardar em uma variável (depende da situação lá no controle).

export function getUserByEmailDB(email) {
  return db.query(`
    SELECT * FROM users WHERE email = $1;
    `, [email]
  )  
}

export function signUpDB(name, email, password) {
  return db.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    `, [name, email, password]
  ) 
}


export async function getUserRanking(req, res) {
  res.send("getUserRanking")
}

