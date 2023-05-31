import { db } from "../database/database.connection.js"

export function signUpDB(body) {
  const {name, email, password, confirmPassword} = body
  const result = db.query(``)
  
  return result
}