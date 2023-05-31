import { Router } from "express"
import { getUserByEmailDB, getUserRanking } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.get("/users/me", getUserByEmailDB)
userRouter.get("/ranking", getUserRanking)

export default userRouter