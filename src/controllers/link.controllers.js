import { customAlphabet } from "nanoid"
import { createShortLinkDB } from "../repositories/link.repository.js"
import { getLinkDB } from "../repositories/user.repository.js"
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
  res.send("openLink")
}
export async function deleteLink(req, res) {
  res.send("deleteLink")
}