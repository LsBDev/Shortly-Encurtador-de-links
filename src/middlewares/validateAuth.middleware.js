import { findSessionDB } from "../repositories/auth.repository.js"

export async function validateAuth(req, res, next) {
  const {authorization} = req. headers
  const token = authorization?.replace("Bearer ", "")
  if(!token) return res.sendStatus(401)

  try {
    const session = await findSessionDB(token)
    if(session.rowCount === 0) return res.sendStatus(401)
    res.locals.user_id = session.rows[0].user_id // guardando o id do usuário numa variável local para poder usar em outras funções posteriormente.

    next()
  } catch(err) {
    res.status(500).send(err)
  }
}

// A validação de autenticação é usada em muitas chamadas do banco, para que o usuário tenha mais segurança e possa navegar tranquilamente. Portanto, como é muito usada, e teríamos que autenticar o usuário em várias chamadas do banco, é melhor criar uma função middleware que entra entre a rota e a função que diz o que pegar do banco na requisição