import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import { getUserByEmailDB, signUpDB } from "./user.controllers.js"
import { createSessionDB } from "../repositories/auth.repository.js"

//desestruturar as informações do corpo da requisição aqui e passar para cada função de acesso ao DB somente a informação necessária (otimiza o código).

//Função de cadastro

export async function signUp(req, res) {
    const {name, email, password} = req.body

    try {
        //buscar no banco se o email já está cadastrado.
        const emailExist = await getUserByEmailDB(email)
        if(emailExist.rowCount !== 0) return res.status(409).send({message: "E-mail já cadastrado!"})

        const hash = bcrypt.hashSync(password, 10)
        //cadastrar na tabela "users".
        await signUpDB(name, email, hash)
        res.sendStatus(201)

    } catch(err) {
        res.send(err.message)
    }
}

//Função de login

export async function signIn(req, res) {
    const {email, password} = req.body

    try {
        const user = await getUserByEmailDB(email)
        if(user.rowCount === 0) return res.status(401).send("Email não cadastrado!")

        //Nessa validação, seria interessante não informar que a "senha" propriamente está incorreta, pois se fosse um hack tentando entrar, pessoa mal intencionada saberia que o email está cadastrado. Talvez pensar em algo que informe menos detalhes sobre o erro, mas que seja informativo para o usuário correto.

        const passwordCorrect = bcrypt.compareSync(password, user.rows[0].password)
        if(!passwordCorrect) return res.status(401).send("Senha incorreta!")

        const token = uuid()
        await createSessionDB(user.rows[0].id, token)
        res.send({token})

    } catch(err) {
        res.send(err.message)
    }
}