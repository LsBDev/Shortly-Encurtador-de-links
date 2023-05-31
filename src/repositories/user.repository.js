import { db } from "../database/database.connection.js"

export function getLinkDB(id) {
  return db.query(`
    SELECT id, url, short_url FROM link WHERE id = $1;`,
    [id]
  )
}