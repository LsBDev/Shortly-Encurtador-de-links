import { customAlphabet } from "nanoid"
import { addViewsDB, createShortLinkDB, deleteLinkDB, getLinkDB, getLinkUserDB, openLinkDB } from "../repositories/link.repository.js"
const nanoid = customAlphabet('123456789abcdef', 10)

export async function shortenLink(req, res) {
  const {link} = req.body
  const {user_id} = res.locals // foi guardado numa variável local (na validação de autenticação)
  const shortLink = nanoid()

  try {
    const result = await createShortLinkDB(link, shortLink, user_id)
    res.status(201).send(result.rows[0])

  } catch(err) {
    res.status(500).send(err.message)
  }
}

export async function getLink(req, res) {
  const {id} = req.params

  try {
    const result = await getLinkDB(id)
    if(result.rowCount === 0) return res.status(404).send({message: "URL não existe!"})
    res.status(200).send(result.rows[0])

  } catch(err) {
    res.status(500).send(err)
  }
}


export async function openLink(req, res) {
  const {shortUrl} = req.params
  // const {short_url} = req.params
  try {
    const result = await openLinkDB(shortUrl)
    if(result.rowCount === 0) return res.status(404).send({message: "URL não existe!"})
    
    await addViewsDB(shortUrl)
    res.redirect(result.rows[0].url)

  } catch(err) {
    res.status(500).send(err.message)
  }
}


export async function deleteLink(req, res) {
  const {id} = req.params
  const {user_id} = res.locals
  try {
    const result = await getLinkUserDB(id)
    if(result.rowCount === 0) return res.status(404).send({message: "URL não existe!"})
    if(result.rows[0].user_id !== user_id) return res.status(401).send({message: "Usuário inválido para deletar este link!"})

    await deleteLinkDB(id)
    res.sendStatus(204)
    
  } catch(err) {
    res.status(500).send(err.message)
  }
}