import { customAlphabet } from "nanoid"
import { createShortLinkDB } from "../repositories/link.repository.js"
const nanoid = customAlphabet("123456789abcdef", 10)

export async function shortenLink(req, res) {
  const {url} = req.body
  const {user_id} = res.locals // foi guardado numa variável local (na validação de autenticação)
  const shortLink = nanoid()

  try {
    const result = await createShortLinkDB(url, shortLink, user_id)
    res.status(201).send(result.rows[0])

  } catch(err) {
    res.status(500).send(err)
  }
}

export async function getLink(req, res) {
  res.send("getLink")
}
export async function openLink(req, res) {
  res.send("openLink")
}
export async function deleteLink(req, res) {
  res.send("deleteLink")
}