import { Router } from "express"
import { validateAuth } from "../middlewares/validateAuth.middleware.js"
import { getCurrentUser, getUserRanking } from "../controllers/user.controllers.js"

const userRouter = Router()

userRouter.get("/users/me", validateAuth, getCurrentUser)
userRouter.get("/ranking", getUserRanking)

export default userRouter