import { db } from "../database/database.connection.js"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { getUserByEmailDB, signUpDB } from "../repositories/auth.repository.js"

//desestruturar as informações do corpo da requisição aqui e passar para cada função de acesso ao DB somente a informação necessária (otimiza o código).

//Função de cadastro

export async function signUp(req, res) {
    const {name, email, password} = req.body

    try {
        //buscar no banco se o email já está cadastrado
        const emailExist = await getUserByEmailDB(email)
        if(emailExist.rowCount !== 0) return res.status(409).send({message: "E-mail já cadastrado!"})

        const hash = bcrypt.hashSync(password, 10)
        //cadastrar na tabela "users"
        await signUpDB(name, email, hash)
        res.sendStatus(201)

    } catch(err) {
        res.send(err.message)
    }
}


//Função de login

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