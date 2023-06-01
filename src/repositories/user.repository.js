import { db } from "../database/database.connection.js"

//Se for necessário fazer duas requisições em uma única função de controle, Só fazer duas funções, cada uma com uma requisição, no mesmo arquivo de repositório.
//retornar diretamente o resultado da query ou guardar em uma variável (depende da situação lá no controle).

export function getUserByEmailDB(email) {
  return db.query(`
    SELECT * FROM users WHERE email = $1;
    `, [email]
  )  
}

// INÍCIO da chamada da função de pegar informação do usuário atual.
  // Foi feita em duas querys, porém poderia ter sido feita em uma só, mas a complexidade aumenta. 

export function getUserByIdDB(id) {
  return db.query(`
    SELECT users.id, users.name, SUM(link.views_count) AS views_count
      FROM users 
      JOIN link ON users.id = link.user_id
      WHERE users.id = $1
      GROUP BY users.id, users.name;
    `, [id]
  )  
}
export function getLinkByUserDB(user_id) {
  return db.query(`
    SELECT id, short_url, url, views_count FROM link WHERE user_id = $1;
    `, [user_id]
  )
}
// FIM da chamada da função de pegar informação do usuário atual


export function signUpDB(name, email, password) {
  return db.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    `, [name, email, password]
  ) 
}