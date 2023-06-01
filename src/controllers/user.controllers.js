import { getLinkByUserDB, getRankingDB, getUserByIdDB } from "../repositories/user.repository.js"

export async function getCurrentUser(req, res) {
  const {user_id} = res.locals

  try {
    const {rows: [user]} = await getUserByIdDB(user_id)
    const {rows: link} = await getLinkByUserDB(user_id)
    res.send({...user, shortenedUrls: [...link]}) // montando o objeto no formato pedido.
    
  } catch(err) {
    res.status(500).send(err.message)
  }
}

export async function getUserRanking(req, res) {
  try {
    const {rows: ranking} = await getRankingDB()
    res.send(ranking)
    
  } catch(err) {
    res.status(500).send(err.message)
  }
}

