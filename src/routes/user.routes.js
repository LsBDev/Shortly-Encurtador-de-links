import { Router } from "express"
import { getUser, getUserRanking } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.get("/users/me", getUser)
userRouter.get("/ranking", getUserRanking)

export default userRouter