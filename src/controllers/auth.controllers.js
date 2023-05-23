import dayjs from "dayjs"
import { db } from "../database/database.connection.js"
import { v4 as uuid } from "uuid"


export async function signUp(req, res) {
    const {name, email, password, confirmPassword} = req.body
    const dateNow = dayjs().format("DD-MM-YYYY")

    if(password != confirmPassword) return res.status(422).send("As senhas não são iguais!")
    console.log(dateNow)
   

    try {
        const emailExist = await db.query(`
            SELECT * FROM users WHERE email = $1;
        `, [email])
        if(emailExist.rowCount !== 0) return res.status(409).send("E-mail já cadastrado!")

        await db.query(`
            INSERT INTO users (name, email, password, "createdAt") VALUES ($1, $2, $3, $4);
        `, [name, email, password, dateNow])      
        res.sendStatus(201)

    } catch(err) {
        console.log("entrou no catch")
        res.send(err.message)
    }
}

export async function signIn(req, res) {
    const {email, password} = req.body
    const token = uuid()
    const auth = {token: token}

    try {
        const user = await db.query(`
            SELECT id, name, password FROM users WHERE email = $1;
        `, [email])
        if(user.rowCount === 0 || user.rows[0].password != password) return res.sendStatus(401)
        
        await db.query(`
            INSERT INTO 
        `)

    } catch(err) {
        res.send(err.message)
    }
}