import { db } from "../database/database.connection.js";

export function createShortLinkDB(url, shortLink, user_id) {
  return db.query(`
    INSERT INTO link (url, short_url, user_id) 
      VALUES ($1, $2, $3) 
      RETURNING id, short_url;`,
    [url, shortLink, user_id]
  )
}

export function getLinkDB(id) {
  return db.query(`
    SELECT id, url, short_url FROM link WHERE id = $1;`,
    [id]
  )
}

export function getLinkUserDB(id) {
  return db.query(`
    SELECT user_id FROM link WHERE id = $1;`,
    [id]
  )
}

export function openLinkDB(shortUrl) {
  return db.query(`
  SELECT url FROM link WHERE short_url = $1
  `, [shortUrl])
}


//função que incrementa o contador de visualização.
export function addViewsDB(shortUrl) {
  return db.query(`
    UPDATE link SET views_count = views_count + 1 WHERE short_url = $1;`,
    [shortUrl]
  )
}

export function deleteLinkDB(id) {
  return db.query(`
    DELETE FROM link WHERE id = $1;`,
    [id]
  )

}