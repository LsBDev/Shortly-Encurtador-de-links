import { db } from "../database/database.connection.js";

export function createShortLinkDB(url, shortLink, user_id) {
  return db.query(`
    INSERT INTO urls (url, short_url, user_id) 
      VALUES ($1, $2, $3) 
      RETURNING id, short_url;`,
    [url, shortLink, user_id]
  )
}